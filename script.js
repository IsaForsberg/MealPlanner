
// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
const MEAL_TYPES = [
  { id: 'frukost', label: 'Frukost' },
  { id: 'lunch',   label: 'Lunch' },
  { id: 'middag',  label: 'Middag' },
  { id: 'snack',   label: 'Snack' },
];
 
const BASE_RECIPES = [
  // Frukost
  { id:'b1',  name:'Havregrynsgröt med bär',               cat:'frukost',  custom:false, kcal:400 },
  { id:'b2',  name:'Äggröra & fullkornsrostat',            cat:'frukost',  custom:false, kcal:450 },
  { id:'b3',  name:'Yoghurt med granola & honung',         cat:'frukost',  custom:false, kcal:450 },
  { id:'b4',  name:'Avocadotoast',                         cat:'frukost',  custom:false, kcal:380 },
  { id:'b5',  name:'Pannkakor med lönnsirap',              cat:'frukost',  custom:false, kcal:550 },
  { id:'b6',  name:'Overnight oats',                       cat:'frukost',  custom:false, kcal:420 },
  { id:'b7',  name:'Ägg Benedict',                         cat:'frukost',  custom:false, kcal:550 },
  { id:'b8',  name:'Tonfiskröra på rostat bröd',           cat:'frukost',  custom:false, kcal:450 },
  { id:'b9',  name:'Surdegs bagels med gravad lax',        cat:'frukost',  custom:false, kcal:550 },
  { id:'b10', name:'Surdegsbröd med ost och salami',       cat:'frukost',  custom:false, kcal:500 },
  // Lunch
  { id:'l1',  name:'Chicken Caesar sallad',                cat:'lunch',    custom:false, kcal:650 },
  { id:'l2',  name:'Köttfärssoppa',                        cat:'lunch',    custom:false, kcal:500 },
  { id:'l3',  name:'Matlåda pasta med köttfärsås',         cat:'lunch',    custom:false, kcal:750 },
  { id:'l4',  name:'BLT-smörgås',                          cat:'lunch',    custom:false, kcal:600 },
  { id:'l5',  name:'Kycklingwrap',                         cat:'lunch',    custom:false, kcal:600 },
  { id:'l6',  name:'Matlåda korvstråganoff',               cat:'lunch',    custom:false, kcal:750 },
  { id:'l7',  name:'Matlåda köttbullar och potatis',       cat:'lunch',    custom:false, kcal:750 },
  { id:'l8',  name:'Matlåda köttbullar och makaroner',     cat:'lunch',    custom:false, kcal:800 },
  { id:'l9',  name:'Tonfiskröra wrap',                     cat:'lunch',    custom:false, kcal:550 },
  { id:'l10', name:'Tonfiskröra på rostat bröd',           cat:'lunch',    custom:false, kcal:500 },
  { id:'l11', name:'Hamburgare',                           cat:'lunch',    custom:false, kcal:850 },
  { id:'l12', name:'Matlåda blodpudding och bacon',        cat:'lunch',    custom:false, kcal:800 },
  { id:'l13', name:'Matlåda Tacopaj',                      cat:'lunch',    custom:false, kcal:800 },
  { id:'l14', name:'Sweetchili pastasallad',               cat:'lunch',    custom:false, kcal:700 },
  { id:'l15', name:'Tacosallad',                           cat:'lunch',    custom:false, kcal:650 },
  { id:'l16', name:'Våfflor sylt och grädde',              cat:'lunch',    custom:false, kcal:700 },
  { id:'l17', name:'Pannkakor sylt och grädde',            cat:'lunch',    custom:false, kcal:700 },
  // Middag
  { id:'m1',  name:'Spagetti bolognese',                   cat:'middag',   custom:false, kcal:800 },
  { id:'m2',  name:'Lax med citronsmör & potatis',         cat:'middag',   custom:false, kcal:750 },
  { id:'m3',  name:'Tacos med nötfärs',                    cat:'middag',   custom:false, kcal:850 },
  { id:'m4',  name:'Kycklinggryta med kokosmjölk',         cat:'middag',   custom:false, kcal:800 },
  { id:'m5',  name:'Lasagne',                              cat:'middag',   custom:false, kcal:850 },
  { id:'m6',  name:'Biff med bearnaise & pommes',          cat:'middag',   custom:false, kcal:950 },
  { id:'m7',  name:'Thairöra med räkor',                   cat:'middag',   custom:false, kcal:700 },
  { id:'m8',  name:'Ugnsbakad kyckling & klyftpotatis',    cat:'middag',   custom:false, kcal:750 },
  { id:'m9',  name:'Pasta primavera',                      cat:'middag',   custom:false, kcal:750 },
  { id:'m10', name:'Fiskgratäng',                          cat:'middag',   custom:false, kcal:700 },
  { id:'m11', name:'Rödvinsbräserad oxfile',               cat:'middag',   custom:false, kcal:900 },
  { id:'m12', name:'Risotto med svamp',                    cat:'middag',   custom:false, kcal:800 },
  { id:'m13', name:'Birria tacos',                         cat:'middag',   custom:false, kcal:900 },
  { id:'m14', name:'Tacopaj',                              cat:'middag',   custom:false, kcal:850 },
  { id:'m15', name:'Paella',                               cat:'middag',   custom:false, kcal:800 },
  { id:'m16', name:'Pasta carbonara',                      cat:'middag',   custom:false, kcal:900 },
  { id:'m17', name:'Salsiccia pasta',                      cat:'middag',   custom:false, kcal:900 },
  { id:'m18', name:'Rött kött med vitlöksmör',             cat:'middag',   custom:false, kcal:950 },
  { id:'m19', name:'Scharkbricka',                         cat:'middag',   custom:false, kcal:900 },
  { id:'m20', name:'Hamburgare',                           cat:'middag',   custom:false, kcal:900 },
  { id:'m21', name:'Revbenspjäll',                         cat:'middag',   custom:false, kcal:1000 },
  // Snack
  { id:'s1',  name:'Äpple med jordnötssmör',               cat:'snack',    custom:false, kcal:250 },
  { id:'s2',  name:'Fruktsallad',                          cat:'snack',    custom:false, kcal:200 },
  { id:'s3',  name:'Nötblandning & torkad frukt',          cat:'snack',    custom:false, kcal:300 },
  { id:'s4',  name:'Kex med ost och salami',               cat:'snack',    custom:false, kcal:350 },
  { id:'s5',  name:'Grekisk yoghurt med bär',              cat:'snack',    custom:false, kcal:250 },
  { id:'s6',  name:'Turkisk yoghurt med proteinpulver',    cat:'snack',    custom:false, kcal:300 },
  { id:'s7',  name:'ProPud chokladpudding med fryst mango och grädde', cat:'snack', custom:false, kcal:350 },
  { id:'s8',  name:'Chokladdoppad frukt',                  cat:'snack',    custom:false, kcal:300 },
  { id:'s9',  name:'Bananbröd',                            cat:'snack',    custom:false, kcal:300 },
  // Smoothie
  { id:'sm1', name:'Grön smoothie (spenat, banan, ingefära)', cat:'smoothie', custom:false, kcal:250 },
  { id:'sm2', name:'Bärsmoothie med proteinpulver',        cat:'smoothie', custom:false, kcal:350 },
  { id:'sm3', name:'Mango & passionsfrukt smoothie',       cat:'smoothie', custom:false, kcal:300 },
  { id:'sm4', name:'Jordgubb & yoghurtsmoothie',           cat:'smoothie', custom:false, kcal:280 },
];
 
// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
let currentWeekOffset = 0;
let currentView = 'week';
let selectedDay = null;
let currentCatFilter = 'alla';
let modalContext = null; // {dayKey, mealType}
 
function getRecipes() {
  const stored = localStorage.getItem('recipes');
  const custom = stored ? JSON.parse(stored) : [];
  return [...BASE_RECIPES, ...custom];
}
 
function getCustomRecipes() {
  const stored = localStorage.getItem('recipes');
  return stored ? JSON.parse(stored) : [];
}
 
function saveCustomRecipes(arr) {
  localStorage.setItem('recipes', JSON.stringify(arr));
}
 
function getPlan() {
  const stored = localStorage.getItem('meal_plan');
  return stored ? JSON.parse(stored) : {};
}
 
function savePlan(plan) {
  localStorage.setItem('meal_plan', JSON.stringify(plan));
}
 
// ──────────────────────────────────────────────
// DATE HELPERS
// ──────────────────────────────────────────────
function getWeekDates(offset = 0) {
  const now = new Date();
  const day = now.getDay(); // 0=sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7);
  monday.setHours(0,0,0,0);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}
 
function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}
 
function dayKey(d) {
  return d.toISOString().split('T')[0];
}
 
function isToday(d) {
  const t = new Date(); t.setHours(0,0,0,0);
  return d.getTime() === t.getTime();
}
 
const SV_DAYS = ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'];
const SV_DAYS_FULL = ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'];
const SV_MONTHS = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec'];
 
// ──────────────────────────────────────────────
// VIEWS
// ──────────────────────────────────────────────
function showView(view) {
  currentView = view;
  document.getElementById('week-view').style.display = view === 'week' ? 'block' : 'none';
  document.getElementById('day-view').style.display = view === 'day' ? 'block' : 'none';
  document.getElementById('recipe-bank').style.display = view === 'bank' ? 'block' : 'none';
 
  document.getElementById('nav-week').classList.toggle('active', view === 'week' || view === 'day');
  document.getElementById('nav-bank').classList.toggle('active', view === 'bank');
 
  if (view === 'week') renderWeek();
  if (view === 'bank') renderBank();
}
 
// ──────────────────────────────────────────────
// WEEK VIEW
// ──────────────────────────────────────────────
function changeWeek(dir) {
  currentWeekOffset += dir;
  renderWeek();
}
 
function goToCurrentWeek() {
  currentWeekOffset = 0;
  renderWeek();
}
 
function renderWeek() {
  const days = getWeekDates(currentWeekOffset);
  const wn = getWeekNumber(days[0]);
  const start = `${days[0].getDate()} ${SV_MONTHS[days[0].getMonth()]}`;
  const end = `${days[6].getDate()} ${SV_MONTHS[days[6].getMonth()]} ${days[6].getFullYear()}`;
  document.getElementById('week-label').textContent = `Vecka ${wn}`;
  document.getElementById('week-range').textContent = `${start} – ${end}`;
 
  const plan = getPlan();
  const grid = document.getElementById('week-grid');
  grid.innerHTML = '';
 
  days.forEach(d => {
    const key = dayKey(d);
    const col = document.createElement('div');
    col.className = 'day-col fade-in';
 
    const hdr = document.createElement('div');
    hdr.className = 'day-col-header' + (isToday(d) ? ' today' : '');
    hdr.innerHTML = `<div class="day-name">${SV_DAYS[d.getDay()]}</div><div class="day-num">${d.getDate()}</div>`;
    hdr.onclick = () => openDayView(d);
    col.appendChild(hdr);
 
    const meals = document.createElement('div');
    meals.className = 'day-meals';
 
    let dayKcal = 0;
    MEAL_TYPES.forEach(mt => {
      const mealId = plan[key] && plan[key][mt.id];
      const recipe = mealId ? getRecipes().find(r => r.id === mealId) : null;
      if (recipe && recipe.kcal) dayKcal += recipe.kcal;
      const slot = document.createElement('div');
      slot.className = 'meal-slot';
      slot.innerHTML = `<div class="meal-label">${mt.label}</div>`;
 
      const chip = document.createElement('div');
      chip.className = 'meal-chip' + (recipe ? '' : ' empty');
      if (recipe) {
        const kcalStr = recipe.kcal ? `<span class="chip-kcal">${recipe.kcal}</span>` : '';
        chip.innerHTML = `<span class="cat-dot cat-${recipe.cat}"></span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${recipe.name}</span>${kcalStr}<span class="remove-btn" title="Ta bort">✕</span>`;
        chip.querySelector('.remove-btn').onclick = (e) => {
          e.stopPropagation();
          removeMeal(key, mt.id);
        };
        chip.onclick = () => openPickModal(key, mt.id, mt.label);
      } else {
        chip.textContent = '+ Lägg till';
        chip.onclick = () => openPickModal(key, mt.id, mt.label);
      }
      slot.appendChild(chip);
      meals.appendChild(slot);
    });
 
    // Dagssumma kcal
    const totalEl = document.createElement('div');
    totalEl.className = 'day-kcal-total' + (dayKcal === 0 ? ' empty' : '');
    totalEl.textContent = dayKcal > 0 ? `${dayKcal} kcal` : '—';
    meals.appendChild(totalEl);
 
    col.appendChild(meals);
    grid.appendChild(col);
  });
}
 
// ──────────────────────────────────────────────
// DAY VIEW
// ──────────────────────────────────────────────
function openDayView(d) {
  selectedDay = d;
  document.getElementById('dv-weekday').textContent = SV_DAYS_FULL[d.getDay()];
  document.getElementById('dv-date').textContent = `${d.getDate()} ${SV_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  renderDayView();
  showView('day');
}
 
function renderDayView() {
  const d = selectedDay;
  const key = dayKey(d);
  const plan = getPlan();
  const container = document.getElementById('day-view-meals');
  container.innerHTML = '';
 
  // Beräkna dagssumma
  const allRecipes = getRecipes();
  let totalKcal = 0;
  MEAL_TYPES.forEach(mt => {
    const mealId = plan[key] && plan[key][mt.id];
    const recipe = mealId ? allRecipes.find(r => r.id === mealId) : null;
    if (recipe && recipe.kcal) totalKcal += recipe.kcal;
  });
 
  // Kcal-sammanfattning överst
  const summary = document.createElement('div');
  summary.className = 'dv-kcal-summary fade-in';
  summary.innerHTML = `
    <div class="dv-kcal-label">Totalt idag</div>
    <div class="dv-kcal-value">${totalKcal > 0 ? totalKcal : '—'}<span>${totalKcal > 0 ? 'kcal' : ''}</span></div>
  `;
  container.appendChild(summary);
 
  MEAL_TYPES.forEach(mt => {
    const mealId = plan[key] && plan[key][mt.id];
    const recipe = mealId ? allRecipes.find(r => r.id === mealId) : null;
 
    const card = document.createElement('div');
    card.className = 'day-meal-card fade-in';
 
    const kcalLine = recipe && recipe.kcal
      ? `<div class="day-meal-kcal">${recipe.kcal} kcal</div>`
      : '';
 
    card.innerHTML = `
      <div class="day-meal-card-header">
        <div class="cat-badge cat-${mt.id}"></div>
        <div class="day-meal-card-title">${mt.label}</div>
      </div>
      <div class="day-meal-name ${recipe ? '' : 'empty'}">${recipe ? recipe.name : 'Ingen maträtt vald'}</div>
      ${kcalLine}
      <div class="day-meal-actions">
        <button class="btn-action primary" onclick="openPickModal('${key}','${mt.id}','${mt.label}')">
          ${recipe ? 'Byt maträtt' : '+ Välj maträtt'}
        </button>
        ${recipe ? `<button class="btn-action danger" onclick="removeMealAndRefresh('${key}','${mt.id}')">Ta bort</button>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}
 
function removeMealAndRefresh(key, mealType) {
  removeMeal(key, mealType);
  renderDayView();
}
 
// ──────────────────────────────────────────────
// MODAL
// ──────────────────────────────────────────────
function openPickModal(dayKey, mealType, mealLabel) {
  modalContext = { dayKey, mealType };
  document.getElementById('modal-title').textContent = mealLabel;
 
  const catForType = mealType === 'frukost' ? ['frukost','smoothie'] :
                     mealType === 'lunch'   ? ['lunch','snack'] :
                     mealType === 'middag'  ? ['middag'] :
                                             ['snack','smoothie','frukost','lunch','middag'];
 
  const recipes = getRecipes().filter(r => catForType.includes(r.cat));
  document.getElementById('modal-sub').textContent = `${recipes.length} maträtter – välj en`;
 
  const list = document.getElementById('modal-list');
  list.innerHTML = '';
  recipes.forEach(r => {
    const li = document.createElement('li');
    const kcalBadge = r.kcal ? `<span class="kcal-pill" style="margin-left:auto">${r.kcal} kcal</span>` : '';
    li.innerHTML = `<span class="cat-dot cat-${r.cat}"></span><span style="flex:1">${r.name}</span>${kcalBadge}`;
    li.onclick = () => pickMeal(r.id);
    list.appendChild(li);
  });
 
  document.getElementById('pick-modal').classList.add('open');
}
 
function closeModal() {
  document.getElementById('pick-modal').classList.remove('open');
  modalContext = null;
}
 
function pickMeal(recipeId) {
  if (!modalContext) return;
  const plan = getPlan();
  if (!plan[modalContext.dayKey]) plan[modalContext.dayKey] = {};
  plan[modalContext.dayKey][modalContext.mealType] = recipeId;
  savePlan(plan);
  closeModal();
  if (currentView === 'week') renderWeek();
  if (currentView === 'day') renderDayView();
}
 
function removeMeal(key, mealType) {
  const plan = getPlan();
  if (plan[key]) {
    delete plan[key][mealType];
    savePlan(plan);
  }
  if (currentView === 'week') renderWeek();
}
 
// Close modal on overlay click
document.getElementById('pick-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
 
// ──────────────────────────────────────────────
// RECIPE BANK
// ──────────────────────────────────────────────
function filterCat(cat, btn) {
  currentCatFilter = cat;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderBank();
}
 
function renderBank() {
  const all = getRecipes();
  const filtered = currentCatFilter === 'alla' ? all : all.filter(r => r.cat === currentCatFilter);
  const grid = document.getElementById('recipe-grid');
  grid.innerHTML = '';
 
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Inga maträtter i den här kategorin</div>';
    return;
  }
 
  filtered.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card fade-in';
    const kcalPill = r.kcal ? `<span class="kcal-pill">${r.kcal} kcal</span>` : '';
    card.innerHTML = `
      <div class="recipe-card-cat"><span class="cat-dot cat-${r.cat}"></span>${r.cat.charAt(0).toUpperCase()+r.cat.slice(1)}</div>
      <div class="recipe-card-name">${r.name}</div>
      <div class="recipe-card-footer">
        ${kcalPill}
        ${r.custom ? `<div class="recipe-card-custom">Eget tillägg</div>` : '<div></div>'}
      </div>
      ${r.custom ? `<button class="recipe-delete" onclick="deleteCustomRecipe('${r.id}')" title="Ta bort">✕</button>` : ''}
    `;
    grid.appendChild(card);
  });
}
 
function addCustomRecipe() {
  const name = document.getElementById('new-recipe-name').value.trim();
  const cat  = document.getElementById('new-recipe-cat').value;
  const kcalVal = parseInt(document.getElementById('new-recipe-kcal').value);
  const kcal = isNaN(kcalVal) ? null : kcalVal;
  if (!name) return;
 
  const custom = getCustomRecipes();
  const newRecipe = {
    id: 'c' + Date.now(),
    name, cat, kcal, custom: true
  };
  custom.push(newRecipe);
  saveCustomRecipes(custom);
  document.getElementById('new-recipe-name').value = '';
  document.getElementById('new-recipe-kcal').value = '';
  renderBank();
}
 
function deleteCustomRecipe(id) {
  const custom = getCustomRecipes().filter(r => r.id !== id);
  saveCustomRecipes(custom);
  // Also remove from plan if used
  const plan = getPlan();
  Object.keys(plan).forEach(dk => {
    Object.keys(plan[dk]).forEach(mt => {
      if (plan[dk][mt] === id) delete plan[dk][mt];
    });
  });
  savePlan(plan);
  renderBank();
}
 
// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────


// --- PWA: Registrera service worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .catch(err => console.log('Service worker registration failed:', err));
  });
}
renderWeek();