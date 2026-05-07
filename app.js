// ─── SPORT COLOR MAP (for jersey number backgrounds) ────────────
const SPORT_BG_COLORS = {
  'football':     { bg: '#7c3aed', text: '#ffffff' },
  'flag football':{ bg: '#7c3aed', text: '#ffffff' },
  'basketball':   { bg: '#ea580c', text: '#ffffff' },
  'baseball':     { bg: '#0284c7', text: '#ffffff' },
  'softball':     { bg: '#db2777', text: '#ffffff' },
  'soccer':       { bg: '#16a34a', text: '#ffffff' },
  'lacrosse':     { bg: '#0891b2', text: '#ffffff' },
  'hockey':       { bg: '#475569', text: '#ffffff' },
  'volleyball':   { bg: '#d97706', text: '#ffffff' },
  'wrestling':    { bg: '#dc2626', text: '#ffffff' },
  'track':        { bg: '#65a30d', text: '#ffffff' },
  'swimming':     { bg: '#06b6d4', text: '#ffffff' },
  'tennis':       { bg: '#ca8a04', text: '#ffffff' },
  'golf':         { bg: '#15803d', text: '#ffffff' },
  'bowling':      { bg: '#6366f1', text: '#ffffff' },
  'field hockey': { bg: '#be185d', text: '#ffffff' },
};

function getSportColors(sport) {
  const key = (sport || '').toLowerCase().trim();
  return SPORT_BG_COLORS[key] || { bg: '#374151', text: '#ffffff' };
}

// ─── STATE ──────────────────────────────────────────────────────
let ALL_PLAYERS = [];
let currentResults = [];

// ─── INIT ────────────────────────────────────────────────────────
async function init() {
  try {
    const res = await fetch('players.json');
    ALL_PLAYERS = await res.json();
  } catch (e) {
    console.error('Could not load players.json:', e);
    ALL_PLAYERS = [];
  }

  populateFilters();
  populateBrowseTable(ALL_PLAYERS);
  updateTotalCount();

  // Live search on name input
  document.getElementById('filter-name').addEventListener('input', runSearch);
  document.getElementById('filter-number').addEventListener('keydown', e => {
    if (e.key === 'Enter') runSearch();
  });
}

// ─── TOTAL COUNT ─────────────────────────────────────────────────
function updateTotalCount() {
  const el = document.getElementById('total-count');
  if (el) el.textContent = `${ALL_PLAYERS.length} players in database`;
}

// ─── POPULATE FILTER DROPDOWNS ───────────────────────────────────
function populateFilters() {
  const schools  = [...new Set(ALL_PLAYERS.map(p => p.school))].sort();
  const sports   = [...new Set(ALL_PLAYERS.map(p => p.sport))].sort();
  const genders  = [...new Set(ALL_PLAYERS.map(p => p.gender).filter(Boolean))].sort();

  const schoolSel = document.getElementById('filter-school');
  const sportSel  = document.getElementById('filter-sport');
  const genderSel = document.getElementById('filter-gender');

  schools.forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = s;
    schoolSel.appendChild(o);
  });

  sports.forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = s;
    sportSel.appendChild(o);
  });

  if (genderSel) {
    genders.forEach(g => {
      const o = document.createElement('option');
      o.value = g; o.textContent = g;
      genderSel.appendChild(o);
    });
  }
}

// ─── SEARCH / FILTER ─────────────────────────────────────────────
function runSearch() {
  const school = document.getElementById('filter-school').value.trim().toLowerCase();
  const sport  = document.getElementById('filter-sport').value.trim().toLowerCase();
  const level  = document.getElementById('filter-level').value.trim().toLowerCase();
  const number = document.getElementById('filter-number').value.trim();
  const name   = document.getElementById('filter-name').value.trim().toLowerCase();
  const gender = (document.getElementById('filter-gender')?.value || '').trim().toLowerCase();

  currentResults = ALL_PLAYERS.filter(p => {
    if (school && p.school.toLowerCase() !== school) return false;
    if (sport  && p.sport.toLowerCase()  !== sport)  return false;
    if (level  && p.level.toLowerCase()  !== level)  return false;
    if (number && p.number !== number)                return false;
    if (name   && !p.name.toLowerCase().includes(name)) return false;
    if (gender && (p.gender || '').toLowerCase() !== gender) return false;
    return true;
  });

  renderCards(currentResults);
  updateResultsCount(currentResults.length);
}

function clearSearch() {
  document.getElementById('filter-school').value = '';
  document.getElementById('filter-sport').value  = '';
  document.getElementById('filter-level').value  = '';
  document.getElementById('filter-number').value = '';
  document.getElementById('filter-name').value   = '';
  if (document.getElementById('filter-gender')) document.getElementById('filter-gender').value = '';
  currentResults = ALL_PLAYERS;
  renderCards(ALL_PLAYERS);
  updateResultsCount(null);
}

function updateResultsCount(n) {
  const el = document.getElementById('results-count');
  if (n === null) { el.innerHTML = ''; return; }
  el.innerHTML = `Found <span>${n}</span> player${n !== 1 ? 's' : ''}`;
}

// ─── RENDER CARDS ────────────────────────────────────────────────
function renderCards(players) {
  const grid  = document.getElementById('player-grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';

  if (players.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  players.forEach((p, i) => {
    const colors = getSportColors(p.sport);
    const card = document.createElement('div');
    card.className = 'player-card';
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <div class="card-top">
        <div class="card-number" style="background:${colors.bg};color:${colors.text}">${p.number}</div>
        <div class="card-info">
          <div class="card-name">${p.name}</div>
          <div class="card-position">${p.position || '—'}</div>
          <div class="card-tags">
            ${p.sport   ? `<span class="tag tag-sport">${p.sport}</span>` : ''}
            ${p.gender  ? `<span class="tag tag-gender-${(p.gender||'').toLowerCase()}">${p.gender}</span>` : ''}
            ${p.level   ? `<span class="tag ${levelClass(p.level)}">${p.level}</span>` : ''}
            ${p.school  ? `<span class="tag tag-school">${shortSchool(p.school)}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-notes">${p.notes || 'No notes'}</div>
        <div class="card-grade">${p.grade ? 'Gr. ' + p.grade : ''}</div>
      </div>
    `;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
}

function levelClass(level) {
  if (level === 'VAR') return 'tag-level-var';
  if (level === 'JV')  return 'tag-level-jv';
  if (level === 'FR')  return 'tag-level-fr';
  if (level === 'MS')  return 'tag-level-ms';
  return 'tag-school';
}

function shortSchool(school) {
  return school.replace('Williamsville ', 'Will. ');
}

// ─── POPULATE BROWSE TABLE ───────────────────────────────────────
function populateBrowseTable(players) {
  const tbody = document.getElementById('browse-tbody');
  const count = document.getElementById('browse-count');
  tbody.innerHTML = '';
  count.textContent = `${players.length} players`;

  [...players].sort((a, b) => {
    const na = isNaN(a.number) ? 9999 : Number(a.number);
    const nb = isNaN(b.number) ? 9999 : Number(b.number);
    return na - nb;
  }).forEach(p => {
    const colors = getSportColors(p.sport);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="tbl-number" style="color:${colors.bg}">${p.number}</td>
      <td class="tbl-name">${p.name}</td>
      <td>${p.school}</td>
      <td>${p.sport}</td>
      <td>${p.gender || '—'}</td>
      <td><span class="tag ${levelClass(p.level)}">${p.level}</span></td>
      <td>${p.position || '—'}</td>
      <td>${p.grade ? 'Gr. ' + p.grade : '—'}</td>
    `;
    tr.addEventListener('click', () => openModal(p));
    tbody.appendChild(tr);
  });
}

// ─── MODAL ───────────────────────────────────────────────────────
function openModal(p) {
  const colors = getSportColors(p.sport);

  // Accent bar matches sport color
  const bar = document.querySelector('.modal-accent-bar');
  if (bar) bar.style.background = colors.bg;

  document.getElementById('modal-number').textContent = '#' + p.number;
  document.getElementById('modal-number').style.color = colors.bg;
  document.getElementById('modal-name').textContent   = p.name;
  document.getElementById('modal-pos').textContent    = p.position || '';

  // Tags
  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = `
    ${p.sport  ? `<span class="tag tag-sport">${p.sport}</span>` : ''}
    ${p.gender ? `<span class="tag tag-gender-${(p.gender||'').toLowerCase()}">${p.gender}</span>` : ''}
    ${p.level  ? `<span class="tag ${levelClass(p.level)}">${p.level}</span>` : ''}
    ${p.school ? `<span class="tag tag-school">${p.school}</span>` : ''}
    ${p.year   ? `<span class="tag tag-school">${p.year}</span>` : ''}
  `;

  // Stats grid
  const stats = [
    ['Jersey',  '#' + p.number],
    ['School',  p.school || '—'],
    ['Sport',   p.sport  || '—'],
    ['Gender',  p.gender || '—'],
    ['Level',   p.level  || '—'],
    ['Grade',   p.grade  ? 'Grade ' + p.grade : '—'],
  ];

  const gridEl = document.getElementById('modal-grid');
  gridEl.innerHTML = stats.map(([label, val]) => `
    <div class="modal-stat">
      <div class="modal-stat-label">${label}</div>
      <div class="modal-stat-val">${val}</div>
    </div>
  `).join('');

  // Notes
  const notesEl     = document.getElementById('modal-notes');
  const notesTextEl = document.getElementById('modal-notes-text');
  if (p.notes) {
    notesEl.style.display = 'block';
    notesTextEl.textContent = p.notes;
  } else {
    notesEl.style.display = 'none';
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalDirect();
});

// ─── SCROLL HELPER ───────────────────────────────────────────────
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// ─── START ───────────────────────────────────────────────────────
init();