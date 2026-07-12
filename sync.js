// ===== SUPABASE SYNC CONFIG =====
const SUPABASE_URL = 'https://demqxivapuucmbqnauvf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbXF4aXZhcHV1Y21icW5hdXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MzgzNjksImV4cCI6MjA5OTQxNDM2OX0.SOCqlLRHQRYix7DdhneOlcV5TQwICZCBsxeYeFUInlM';

const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let syncPushTimer = null;

// ===== SYNC IDENTITY (ชื่อ+PIN เก็บไว้เครื่องนี้) =====
function getSyncIdentity() {
  const raw = localStorage.getItem('engstudy_sync_id');
  return raw ? JSON.parse(raw) : null;
}
function setSyncIdentity(name, pin) {
  localStorage.setItem('engstudy_sync_id', JSON.stringify({ name, pin }));
}
function clearSyncIdentity() {
  localStorage.removeItem('engstudy_sync_id');
}

// ===== PUSH: ส่ง progress ขึ้น Supabase (หน่วงเวลากันยิงถี่) =====
function syncPush() {
  const id = getSyncIdentity();
  if (!id) return;
  clearTimeout(syncPushTimer);
  syncPushTimer = setTimeout(async () => {
    try {
      await sbClient.rpc('save_progress', {
        p_name: id.name, p_pin: id.pin, p_state: STATE, p_words: WORDS,
      });
    } catch (e) { console.warn('Sync push failed', e); }
  }, 2000);
}

// ===== PULL: ดึง progress กลับจาก Supabase =====
async function syncPull(name, pin) {
  const { data, error } = await sbClient.rpc('get_progress', { p_name: name, p_pin: pin });
  if (error) throw new Error(error.message);
  if (!data || !data.length) throw new Error(t('sync_not_found'));
  const row = data[0];
  if (row.state) Object.assign(STATE, row.state);
  if (row.words) row.words.forEach(sw => {
    const idx = WORDS.findIndex(w => w.word === sw.word);
    if (idx !== -1) Object.assign(WORDS[idx], sw);
  });
  localStorage.setItem('engstudy_state', JSON.stringify(STATE));
  localStorage.setItem('engstudy_words', JSON.stringify(WORDS));
}

// ===== UI ACTIONS =====
async function setupSyncNew() {
  const name = prompt(t('sync_ask_name'));
  if (!name) return;
  const pin = prompt(t('sync_ask_pin'));
  if (!pin) return;
  setSyncIdentity(name.trim(), pin.trim());
  try {
    await sbClient.rpc('save_progress', { p_name: name.trim(), p_pin: pin.trim(), p_state: STATE, p_words: WORDS });
    alert(t('sync_setup_success'));
    renderSettings();
  } catch (e) { alert(t('sync_error') + ': ' + e.message); }
}

async function setupSyncExisting() {
  const name = prompt(t('sync_ask_name'));
  if (!name) return;
  const pin = prompt(t('sync_ask_pin'));
  if (!pin) return;
  try {
    await syncPull(name.trim(), pin.trim());
    setSyncIdentity(name.trim(), pin.trim());
    alert(t('sync_restore_success'));
    renderHome(); renderSettings();
  } catch (e) { alert(t('sync_error') + ': ' + e.message); }
}

function unlinkSync() {
  if (!confirm(t('sync_unlink_confirm'))) return;
  clearSyncIdentity();
  renderSettings();
}