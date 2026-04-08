
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
  { id:'b1', name:'Havregrynsgröt med bär', cat:'frukost', custom:false },
  { id:'b2', name:'Äggröra & fullkornsrostat', cat:'frukost', custom:false },
  { id:'b3', name:'Yoghurt med granola & honung', cat:'frukost', custom:false },
  { id:'b4', name:'Avocadotoast', cat:'frukost', custom:false },
  { id:'b5', name:'Pannkakor med lönnsirap', cat:'frukost', custom:false },
  { id:'b6', name:'Overnight oats', cat:'frukost', custom:false },
  { id:'b7', name:'Ägg Benedict', cat:'frukost', custom:false },
  // Lunch
  { id:'l1', name:'Chicken Caesar sallad', cat:'lunch', custom:false },
  { id:'l2', name:'Köttfärssoppa', cat:'lunch', custom:false },
  { id:'l3', name:'Matlåda med bulgur & grönsaker', cat:'lunch', custom:false },
  { id:'l4', name:'BLT-smörgås', cat:'lunch', custom:false },
  { id:'l5', name:'Linssoppa med bröd', cat:'lunch', custom:false },
  { id:'l6', name:'Nicoise sallad', cat:'lunch', custom:false },
  { id:'l7', name:'Quinoabowl med falafel', cat:'lunch', custom:false },
  { id:'l8', name:'Wraps med kyckling & hummus', cat:'lunch', custom:false },
  // Middag
  { id:'m1', name:'Spagetti bolognese', cat:'middag', custom:false },
  { id:'m2', name:'Lax med citronsmör & ris', cat:'middag', custom:false },
  { id:'m3', name:'Tacos med nötfärs', cat:'middag', custom:false },
  { id:'m4', name:'Kycklinggryta med kokosmjölk', cat:'middag', custom:false },
  { id:'m5', name:'Vegetarisk lasagne', cat:'middag', custom:false },
  { id:'m6', name:'Biff med bearnaise & pommes', cat:'middag', custom:false },
  { id:'m7', name:'Thairöra med räkor', cat:'middag', custom:false },
  { id:'m8', name:'Ugnsbakad kyckling & rotfrukter', cat:'middag', custom:false },
  { id:'m9', name:'Pasta primavera', cat:'middag', custom:false },
  { id:'m10',name:'Fiskgratäng', cat:'middag', custom:false },
  { id:'m11',name:'Rödvinsbräserad oxfile', cat:'middag', custom:false },
  { id:'m12',name:'Risotto med svamp', cat:'middag', custom:false },
  // Snack
  { id:'s1', name:'Äpple med jordnötssmör', cat:'snack', custom:false },
  { id:'s2', name:'Hummus & grönsaker', cat:'snack', custom:false },
  { id:'s3', name:'Nötblandning & torkad frukt', cat:'snack', custom:false },
  { id:'s4', name:'Rismjölskex med ost', cat:'snack', custom:false },
  { id:'s5', name:'Skyr med bär', cat:'snack', custom:false },
  // Smoothie
  { id:'sm1', name:'Grön smoothie (spenat, banan, ingefära)', cat:'smoothie', custom:false },
  { id:'sm2', name:'Bärsmoothie med proteinpulver', cat:'smoothie', custom:false },
  { id:'sm3', name:'Mango & passionsfrukt smoothie', cat:'smoothie', custom:false },
  { id:'sm4', name:'Jordgubb & yoghurtsmoothie', cat:'smoothie', custom:false },
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

    MEAL_TYPES.forEach(mt => {
      const mealId = plan[key] && plan[key][mt.id];
      const recipe = mealId ? getRecipes().find(r => r.id === mealId) : null;
      const slot = document.createElement('div');
      slot.className = 'meal-slot';
      slot.innerHTML = `<div class="meal-label">${mt.label}</div>`;

      const chip = document.createElement('div');
      chip.className = 'meal-chip' + (recipe ? '' : ' empty');
      if (recipe) {
        chip.innerHTML = `<span class="cat-dot cat-${recipe.cat}"></span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${recipe.name}</span><span class="remove-btn" title="Ta bort">✕</span>`;
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

  MEAL_TYPES.forEach(mt => {
    const mealId = plan[key] && plan[key][mt.id];
    const recipe = mealId ? getRecipes().find(r => r.id === mealId) : null;

    const card = document.createElement('div');
    card.className = 'day-meal-card fade-in';

    card.innerHTML = `
      <div class="day-meal-card-header">
        <div class="cat-badge cat-${mt.id}"></div>
        <div class="day-meal-card-title">${mt.label}</div>
      </div>
      <div class="day-meal-name ${recipe ? '' : 'empty'}">${recipe ? recipe.name : 'Ingen maträtt vald'}</div>
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
    li.innerHTML = `<span class="cat-dot cat-${r.cat}"></span>${r.name}`;
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
    card.innerHTML = `
      <div class="recipe-card-cat"><span class="cat-dot cat-${r.cat}"></span>${r.cat.charAt(0).toUpperCase()+r.cat.slice(1)}</div>
      <div class="recipe-card-name">${r.name}</div>
      ${r.custom ? `<div class="recipe-card-custom">Eget tillägg</div>
        <button class="recipe-delete" onclick="deleteCustomRecipe('${r.id}')" title="Ta bort">✕</button>` : ''}
    `;
    grid.appendChild(card);
  });
}

function addCustomRecipe() {
  const name = document.getElementById('new-recipe-name').value.trim();
  const cat  = document.getElementById('new-recipe-cat').value;
  if (!name) return;

  const custom = getCustomRecipes();
  const newRecipe = {
    id: 'c' + Date.now(),
    name, cat, custom: true
  };
  custom.push(newRecipe);
  saveCustomRecipes(custom);
  document.getElementById('new-recipe-name').value = '';
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
renderWeek();
