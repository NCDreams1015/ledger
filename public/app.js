/* ---------- helpers ---------- */
const uid = () => Math.random().toString(36).slice(2, 10);
const peso = (n) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 })
    .format(Number.isFinite(n) ? n : 0);
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- seed data ---------- */
const DEFAULT_MATERIALS = [
  { id: 'a4paper', name: 'A4 Bond Paper', category: 'consumable', price: 785, numPackages: 1, unitsPerPackage1: 5, unitsPerPackage2: 500, unitsLabel1: 'reams', unitsLabel2: 'sheets per ream', baseUnit: 'sheet', stock: 2500 },
  { id: 'photopaper', name: 'Glossy Photo Paper A4', category: 'consumable', price: 98, numPackages: 1, unitsPerPackage1: 20, unitsPerPackage2: 1, unitsLabel1: 'sheets per pack', unitsLabel2: '', baseUnit: 'sheet', stock: 20 },
  { id: 'laminate', name: 'Cold Laminating Film A4', category: 'consumable', price: 208, numPackages: 2, unitsPerPackage1: 20, unitsPerPackage2: 1, unitsLabel1: 'sheets per pack', unitsLabel2: '', baseUnit: 'sheet', stock: 20 },
  { id: 'stickerpaper', name: 'Sticker Paper A4', category: 'consumable', price: 86, numPackages: 2, unitsPerPackage1: 20, unitsPerPackage2: 1, unitsLabel1: 'sheets per pack', unitsLabel2: '', baseUnit: 'sheet', stock: 40 },
  { id: 'softchipboard', name: 'Soft Chipboard', category: 'consumable', price: 16, numPackages: 1, unitsPerPackage1: 9, unitsPerPackage2: 1, unitsLabel1: 'A4-size pieces per board', unitsLabel2: '', baseUnit: 'A4-size piece', stock: 9 },
  { id: 'hardchipboard', name: 'Hard Chipboard', category: 'consumable', price: 266, numPackages: 1, unitsPerPackage1: 25, unitsPerPackage2: 1, unitsLabel1: 'A4-size pieces per pack', unitsLabel2: '', baseUnit: 'A4-size piece', stock: 25 },
  { id: 'wire', name: 'Metal Binding Wire', category: 'consumable', price: 395, numPackages: 1, unitsPerPackage1: 100, unitsPerPackage2: 1, unitsLabel1: 'pieces per pack', unitsLabel2: '', baseUnit: 'piece (per notebook)', stock: 100 },
  { id: 'staples', name: 'Staples', category: 'consumable', price: 88, numPackages: 1, unitsPerPackage1: 1000, unitsPerPackage2: 1, unitsLabel1: 'staples per box', unitsLabel2: '', baseUnit: 'staple', stock: 1000 },
  { id: 'transglue', name: 'Transparent Glue (notepad binding)', category: 'consumable', price: 160, numPackages: 1, unitsPerPackage1: 500, unitsPerPackage2: 1, unitsLabel1: 'ml per bottle', unitsLabel2: '', baseUnit: 'ml', stock: 500 },
  { id: 'redglue', name: 'Red Glue (padpaper binding)', category: 'consumable', price: 99, numPackages: 1, unitsPerPackage1: 250, unitsPerPackage2: 1, unitsLabel1: 'ml per bottle', unitsLabel2: '', baseUnit: 'ml', stock: 250 },
  { id: 'stapler', name: 'Long Arm Stapler', category: 'equipment', price: 301, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, unitsLabel1: '', unitsLabel2: '', baseUnit: 'unit' },
  { id: 'ruler', name: '5-in-1 DIY Ruler', category: 'equipment', price: 199, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, unitsLabel1: '', unitsLabel2: '', baseUnit: 'unit' },
  { id: 'wirebinder', name: 'Officom Wire Binding Machine W12M', category: 'equipment', price: 2121, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, unitsLabel1: '', unitsLabel2: '', baseUnit: 'unit' },
  { id: 'cutter', name: 'Paper Cutter', category: 'equipment', price: 375, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, unitsLabel1: '', unitsLabel2: '', baseUnit: 'unit' },
  { id: 'gluebrush', name: 'Glue Brush', category: 'equipment', price: 19, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, unitsLabel1: '', unitsLabel2: '', baseUnit: 'unit' },
];

const DEFAULT_SETTINGS = {
  electricityRate: 7, printerWatt: 18, blackIpm: 9.1, colorIpm: 5,
  blackBottlePrice: 350, blackYield: 6000, colorBottlePrice: 400, colorYield: 7700,
  colorHeavyMultiplier: 4,
  markup: 50,
  startingCapital: null,
};

const DEFAULT_PRODUCTS = {
  wired: { sheets: 60, coverType: 'photo' },
  stapled: { sheets: 60 },
  notepadA6: { sheets: 60, chipboardOn: false },
  notepadA7: { sheets: 60, chipboardOn: false },
  padpaper: { sheets: 60, chipboardOn: false },
  tracing: { sheets: 50 },
};

const DEFAULT_SALES = [
  { id: uid(), product: 'padpaper', sheets: 80, qty: 3, priceEach: 20, buyer: 'Customer', note: '', status: 'sold', date: '2026-08-01', bundleProduct: '', bundleSheets: 0, bundleQty: 0 },
  { id: uid(), product: 'wired', sheets: 80, qty: 1, priceEach: 45, buyer: 'Customer', note: 'Type not confirmed as wired vs stapled — edit if needed', status: 'sold', date: '2026-08-01', bundleProduct: '', bundleSheets: 0, bundleQty: 0 },
  { id: uid(), product: 'stapled', sheets: 60, qty: 1, priceEach: 45, buyer: 'Customer', note: 'Type not confirmed as wired vs stapled — edit if needed', status: 'sold', date: '2026-08-01', bundleProduct: '', bundleSheets: 0, bundleQty: 0 },
  { id: uid(), product: 'wired', sheets: 80, qty: 1, priceEach: 0, buyer: 'Noel (self)', note: 'Gift, not sold', status: 'gift', date: '2026-08-01', bundleProduct: '', bundleSheets: 0, bundleQty: 0 },
  { id: uid(), product: 'stapled', sheets: 80, qty: 1, priceEach: 0, buyer: 'Mother-in-law', note: 'Gift, not sold', status: 'gift', date: '2026-08-01', bundleProduct: '', bundleSheets: 0, bundleQty: 0 },
];

const DEFAULT_FINISHED_STOCK = [];

const RECIPES = {
  wired: {
    label: 'Wired Notebook', size: 'A5', hasChipboard: false, hasCoverType: true,
    linesFn: (cfg) => {
      const sheets = cfg.sheets || 60;
      const lines = [{ materialId: 'a4paper', qty: Math.ceil(sheets / 2) }];
      if (cfg.coverType === 'hard') {
        lines.push({ materialId: 'hardchipboard', qty: 1 }, { materialId: 'stickerpaper', qty: 2 }, { materialId: 'laminate', qty: 1 });
      } else {
        lines.push({ materialId: 'photopaper', qty: 1 }, { materialId: 'laminate', qty: 1 });
      }
      lines.push({ materialId: 'wire', qty: 1 });
      return lines;
    },
    inkBlackFn: (cfg) => Math.ceil((cfg.sheets || 60) / 2) * 2,
    inkColorLightFn: () => 0,
    inkColorHeavyFn: () => 2,
  },
  stapled: {
    label: 'Stapled Notebook', size: 'A5', hasChipboard: false,
    linesFn: (cfg) => {
      const sheets = cfg.sheets || 60;
      return [
        { materialId: 'a4paper', qty: Math.ceil(sheets / 2) },
        { materialId: 'photopaper', qty: 1 },
        { materialId: 'laminate', qty: 1 },
        { materialId: 'staples', qty: 2 },
      ];
    },
    inkBlackFn: (cfg) => Math.ceil((cfg.sheets || 60) / 2) * 2,
    inkColorLightFn: () => 0,
    inkColorHeavyFn: () => 2,
  },
  notepadA6: {
    label: 'Notepad', size: 'A6', hasChipboard: true,
    linesFn: (cfg) => {
      const sheets = cfg.sheets || 60;
      const lines = [{ materialId: 'a4paper', qty: Math.ceil(sheets / 4) }, { materialId: 'transglue', qty: 5 }];
      if (cfg.chipboardOn) lines.push({ materialId: 'softchipboard', qty: 0.25 });
      return lines;
    },
    inkBlackFn: () => 0,
    inkColorLightFn: (cfg) => Math.ceil((cfg.sheets || 60) / 4),
    inkColorHeavyFn: () => 0,
  },
  notepadA7: {
    label: 'Notepad', size: 'A7', hasChipboard: true,
    linesFn: (cfg) => {
      const sheets = cfg.sheets || 60;
      const lines = [{ materialId: 'a4paper', qty: Math.ceil(sheets / 8) }, { materialId: 'transglue', qty: 5 }];
      if (cfg.chipboardOn) lines.push({ materialId: 'softchipboard', qty: 0.125 });
      return lines;
    },
    inkBlackFn: () => 0,
    inkColorLightFn: (cfg) => Math.ceil((cfg.sheets || 60) / 8),
    inkColorHeavyFn: () => 0,
  },
  padpaper: {
    label: 'PadPaper (Grade 1-3)', size: 'A5', hasChipboard: true,
    linesFn: (cfg) => {
      const sheets = cfg.sheets || 60;
      const lines = [{ materialId: 'a4paper', qty: Math.ceil(sheets / 2) }, { materialId: 'redglue', qty: 5 }];
      if (cfg.chipboardOn) lines.push({ materialId: 'softchipboard', qty: 0.5 });
      return lines;
    },
    inkBlackFn: () => 0,
    inkColorLightFn: (cfg) => Math.ceil((cfg.sheets || 60) / 2) * 2,
    inkColorHeavyFn: () => 0,
  },
  tracing: {
    label: 'Tracing Notebook', size: 'A5', hasChipboard: false,
    linesFn: (cfg) => {
      const sheets = cfg.sheets || 50;
      return [
        { materialId: 'a4paper', qty: Math.ceil(sheets / 2) },
        { materialId: 'photopaper', qty: 1 },
        { materialId: 'laminate', qty: 1 },
        { materialId: 'wire', qty: 1 },
      ];
    },
    inkBlackFn: (cfg) => Math.ceil((cfg.sheets || 50) / 2) * 2,
    inkColorLightFn: () => 0,
    inkColorHeavyFn: () => 2,
  },
};
const PRODUCT_ORDER = ['wired', 'stapled', 'notepadA6', 'notepadA7', 'padpaper', 'tracing'];

/* ---------- calc functions ---------- */
function totalBaseUnits(mat) { return (mat.numPackages || 0) * (mat.unitsPerPackage1 || 1) * (mat.unitsPerPackage2 || 1); }
function costPerBaseUnit(mat) { const total = totalBaseUnits(mat); return total > 0 ? mat.price / total : 0; }

function computeProduct(productKey, config, materials, settings) {
  const recipe = RECIPES[productKey];
  const matById = Object.fromEntries(materials.map((m) => [m.id, m]));
  const breakdown = [];
  let materialCost = 0;

  recipe.linesFn(config).forEach((line) => {
    const mat = matById[line.materialId];
    if (!mat) {
      breakdown.push({ name: `Missing material (${line.materialId}) — add it on the Materials tab`, qty: line.qty, unit: '', costPerBase: 0, cost: 0, needsPrice: true });
      return;
    }
    const cpb = costPerBaseUnit(mat);
    const cost = line.qty * cpb;
    materialCost += cost;
    breakdown.push({ name: mat.name, qty: line.qty, unit: mat.baseUnit, costPerBase: cpb, cost, needsPrice: !!mat.needsPrice && !mat.price });
  });

  const blackSides = recipe.inkBlackFn(config);
  const colorLightSides = recipe.inkColorLightFn ? recipe.inkColorLightFn(config) : 0;
  const colorHeavySides = recipe.inkColorHeavyFn ? recipe.inkColorHeavyFn(config) : 0;
  const costPerBlack = settings.blackYield > 0 ? settings.blackBottlePrice / settings.blackYield : 0;
  const costPerColorLight = settings.colorYield > 0 ? settings.colorBottlePrice / settings.colorYield : 0;
  const costPerColorHeavy = costPerColorLight * (settings.colorHeavyMultiplier || 1);
  const inkCost = blackSides * costPerBlack + colorLightSides * costPerColorLight + colorHeavySides * costPerColorHeavy;

  const blackSec = settings.blackIpm > 0 ? 60 / settings.blackIpm : 0;
  const colorSec = settings.colorIpm > 0 ? 60 / settings.colorIpm : 0;
  const colorSidesTotal = colorLightSides + colorHeavySides;
  const kwh = ((blackSides * blackSec + colorSidesTotal * colorSec) / 3600) * (settings.printerWatt / 1000);
  const elecCost = kwh * settings.electricityRate;

  const totalCost = materialCost + inkCost + elecCost;
  const suggestedPrice = totalCost * (1 + settings.markup / 100);

  return { breakdown, materialCost, inkCost, elecCost, totalCost, suggestedPrice, blackSides, colorLightSides, colorHeavySides };
}

/* ---------- state ---------- */
const state = {
  tab: 'dashboard',
  loading: true,
  loadError: false,
  materials: DEFAULT_MATERIALS,
  products: DEFAULT_PRODUCTS,
  sales: DEFAULT_SALES,
  finishedStock: DEFAULT_FINISHED_STOCK,
  settings: DEFAULT_SETTINGS,
  plannerQty: {},
  batchQty: {},
  mixQty: {},
  showAddMaterial: false,
  newMaterial: { name: '', category: 'consumable', price: 0, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, baseUnit: 'piece' },
};

/* ---------- persistence (Supabase via /api/data) ---------- */
async function apiGet(key, fallback) {
  try {
    const r = await fetch(`/api/data?key=${encodeURIComponent(key)}`);
    if (!r.ok) return fallback;
    const j = await r.json();
    return j.value != null ? j.value : fallback;
  } catch (e) { return fallback; }
}
const debounceTimers = {};
function apiSet(key, value, delay) {
  clearTimeout(debounceTimers[key]);
  debounceTimers[key] = setTimeout(() => {
    fetch('/api/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value }) }).catch(() => {});
  }, delay == null ? 500 : delay);
}

async function loadAll() {
  try {
    const [m, p, s, st, fs] = await Promise.all([
      apiGet('materials', DEFAULT_MATERIALS),
      apiGet('products-config', DEFAULT_PRODUCTS),
      apiGet('sales-log', DEFAULT_SALES),
      apiGet('settings', DEFAULT_SETTINGS),
      apiGet('finished-stock', DEFAULT_FINISHED_STOCK),
    ]);

    // Self-heal: if the code now knows about materials/products/settings this
    // saved data predates, add them in rather than silently dropping recipe
    // lines that reference them.
    let mergedMaterials = m;
    const existingMatIds = new Set(m.map((x) => x.id));
    const missingMats = DEFAULT_MATERIALS.filter((dm) => !existingMatIds.has(dm.id));
    if (missingMats.length) {
      mergedMaterials = [...m, ...missingMats];
      apiSet('materials', mergedMaterials, 0);
    }

    let mergedProducts = { ...p };
    let productsChanged = false;
    Object.keys(DEFAULT_PRODUCTS).forEach((key) => {
      if (!mergedProducts[key]) {
        mergedProducts[key] = DEFAULT_PRODUCTS[key];
        productsChanged = true;
      } else {
        Object.keys(DEFAULT_PRODUCTS[key]).forEach((field) => {
          if (mergedProducts[key][field] === undefined) {
            mergedProducts[key] = { ...mergedProducts[key], [field]: DEFAULT_PRODUCTS[key][field] };
            productsChanged = true;
          }
        });
      }
    });
    if (productsChanged) apiSet('products-config', mergedProducts, 0);

    let mergedSettings = { ...st };
    let settingsChanged = false;
    Object.keys(DEFAULT_SETTINGS).forEach((field) => {
      if (mergedSettings[field] === undefined) {
        mergedSettings[field] = DEFAULT_SETTINGS[field];
        settingsChanged = true;
      }
    });
    if (mergedSettings.startingCapital === null || mergedSettings.startingCapital === undefined) {
      mergedSettings.startingCapital = mergedMaterials.reduce((a, mm) => a + (Number(mm.price) || 0), 0);
      settingsChanged = true;
    }
    if (settingsChanged) apiSet('settings', mergedSettings, 0);

    state.materials = mergedMaterials; state.products = mergedProducts; state.sales = s; state.settings = mergedSettings; state.finishedStock = fs;
  } catch (e) {
    state.loadError = true;
  }
  state.loading = false;
  render();
}

/* ---------- mutation helpers ---------- */
function updateMaterials(next, immediate) { state.materials = next; apiSet('materials', next, immediate ? 0 : 500); }
function updateProducts(next, immediate) { state.products = next; apiSet('products-config', next, immediate ? 0 : 500); }
function updateSales(next, immediate) { state.sales = next; apiSet('sales-log', next, immediate ? 0 : 500); }
function updateFinishedStock(next, immediate) { state.finishedStock = next; apiSet('finished-stock', next, immediate ? 0 : 500); }
function updateSettings(next, immediate) { state.settings = next; apiSet('settings', next, immediate ? 0 : 500); }

function stockPatch(id, field, value) { updateFinishedStock(state.finishedStock.map((f) => (f.id === id ? { ...f, [field]: value } : f))); }
function stockRemove(id) { updateFinishedStock(state.finishedStock.filter((f) => f.id !== id), true); render(); }
function stockAdd() {
  updateFinishedStock([...state.finishedStock, { id: uid(), product: 'wired', sheets: 60, variant: '', qty: 0 }], true);
  render();
}

function matPatch(id, field, value) { updateMaterials(state.materials.map((m) => (m.id === id ? { ...m, [field]: value } : m))); }
function matRemove(id) { updateMaterials(state.materials.filter((m) => m.id !== id), true); render(); }
function prodPatch(key, field, value) { updateProducts({ ...state.products, [key]: { ...state.products[key], [field]: value } }); }
function salePatch(id, field, value) { updateSales(state.sales.map((s) => (s.id === id ? { ...s, [field]: value } : s))); }
function saleAdd() {
  updateSales([...state.sales, { id: uid(), product: 'wired', sheets: 60, qty: 1, priceEach: 0, buyer: '', note: '', status: 'sold', date: new Date().toISOString().slice(0, 10), bundleProduct: '', bundleSheets: 0, bundleQty: 0 }], true);
  render();
}
function saleRemove(id) { updateSales(state.sales.filter((s) => s.id !== id), true); render(); }
function settingsPatch(field, value) { updateSettings({ ...state.settings, [field]: value }); }

function switchTab(tab) { state.tab = tab; render(); }

function openAddMaterial(defaultCategory) { state.showAddMaterial = true; state.newMaterial = { name: '', category: defaultCategory || 'consumable', price: 0, numPackages: 1, unitsPerPackage1: 1, unitsPerPackage2: 1, baseUnit: 'piece' }; render(); }
function closeAddMaterial() { state.showAddMaterial = false; render(); }
function newMatPatch(field, value) { state.newMaterial[field] = value; }
function submitAddMaterial() {
  if (!state.newMaterial.name || !state.newMaterial.name.trim()) return;
  updateMaterials([...state.materials, { ...state.newMaterial, id: uid() }], true);
  state.showAddMaterial = false;
  render();
}

function resetAll() {
  if (!window.confirm('Reset materials and settings back to the starting defaults? This cannot be undone.')) return;
  const freshCapital = DEFAULT_MATERIALS.reduce((a, m) => a + (Number(m.price) || 0), 0);
  updateSettings({ ...DEFAULT_SETTINGS, startingCapital: freshCapital }, true);
  updateMaterials(DEFAULT_MATERIALS, true);
  render();
}

/* ---------- focus preservation across full re-renders ---------- */
function withFocusPreserved(fn) {
  const active = document.activeElement;
  const id = active && active.id;
  let selStart, selEnd;
  if (active && 'selectionStart' in active) { try { selStart = active.selectionStart; selEnd = active.selectionEnd; } catch (e) {} }
  fn();
  if (id) {
    const el = document.getElementById(id);
    if (el) {
      el.focus();
      if (selStart != null && el.setSelectionRange) { try { el.setSelectionRange(selStart, selEnd); } catch (e) {} }
    }
  }
}

/* ---------- derived / computed ---------- */
function isExcludedSale(s) { return s.gift || s.status === 'gift' || s.status === 'pending'; }
function getComputed() {
  const productComputed = {};
  PRODUCT_ORDER.forEach((k) => { productComputed[k] = computeProduct(k, state.products[k] || DEFAULT_PRODUCTS[k], state.materials, state.settings); });
  const currentMaterialsValue = state.materials.reduce((a, m) => a + (Number(m.price) || 0), 0);
  const startingCapital = Number.isFinite(state.settings.startingCapital) ? state.settings.startingCapital : currentMaterialsValue;
  const totalRevenue = state.sales.reduce((a, s) => a + (isExcludedSale(s) ? 0 : (Number(s.qty) || 0) * (Number(s.priceEach) || 0)), 0);
  const totalUnitsSold = state.sales.reduce((a, s) => a + (isExcludedSale(s) ? 0 : Number(s.qty) || 0), 0);
  const remaining = Math.max(0, startingCapital - totalRevenue);
  const recoveredPct = startingCapital > 0 ? clamp((totalRevenue / startingCapital) * 100, 0, 100) : 0;
  const missingPrices = state.materials.filter((m) => m.needsPrice && (!m.price || m.price === 0));
  return { productComputed, startingCapital, currentMaterialsValue, totalRevenue, totalUnitsSold, remaining, recoveredPct, missingPrices };
}

/* ---------- small render helpers ---------- */
function numField(id, value, onchange, opts) {
  opts = opts || {};
  const suffix = opts.suffix ? `<span class="numfield-suffix">${esc(opts.suffix)}</span>` : '';
  const min = opts.min != null ? `min="${opts.min}"` : '';
  return `<div class="numfield"><input id="${id}" type="number" step="any" ${min} value="${Number.isFinite(value) ? value : 0}" oninput="withFocusPreserved(()=>{${onchange}})" />${suffix}</div>`;
}

/* ---------- tab bar ---------- */
function renderTabs() {
  const tabs = [
    ['dashboard', 'Dashboard'],
    ['materials', 'Materials'],
    ['products', 'Products'],
    ['planner', 'Planner'],
    ['inventory', 'Inventory'],
    ['sales', 'Sales Log'],
    ['settings', 'Settings'],
  ];
  document.getElementById('tabs').innerHTML = tabs.map(([key, label]) =>
    `<button class="tabbtn ${state.tab === key ? 'active' : ''}" onclick="switchTab('${key}')">${label}</button>`
  ).join('');
}

function renderBanner() {
  document.getElementById('banner').innerHTML = state.loadError
    ? `<div class="banner-warn">Could not load saved data — showing defaults. Check your Supabase connection.</div>`
    : '';
}

/* ---------- Dashboard ---------- */
function renderDashboard() {
  const c = getComputed();
  const recentSales = state.sales.slice(-5).reverse();
  const netPosition = c.totalRevenue - c.currentMaterialsValue;
  return `
  <div class="stack">
    <section class="card ruled">
      <div class="section-title">Starting investment — have we earned it back?</div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">A fixed milestone, set once. Restocking materials doesn't move this number — once you cross it, you've permanently recovered what you first put in.</p>
      <div class="progress-track"><div class="progress-fill" style="width:${c.recoveredPct}%"></div></div>
      <div class="progress-labels">
        <span>${peso(c.totalRevenue)} recovered</span>
        <span>${c.recoveredPct.toFixed(1)}%</span>
        <span>${peso(c.startingCapital)} target</span>
      </div>
      <div class="stat-grid" style="margin-top:18px">
        <div class="stat-card"><div class="stat-label">Starting capital target</div><div class="stat-value">${peso(c.startingCapital)}</div><div class="stat-sub">fixed — edit in Settings if this needs correcting</div></div>
        <div class="stat-card"><div class="stat-label">Revenue so far</div><div class="stat-value">${peso(c.totalRevenue)}</div><div class="stat-sub">${c.totalUnitsSold} unit(s) sold, gifts excluded</div></div>
        <div class="stat-card"><div class="stat-label">Still to recover</div><div class="stat-value" style="${c.remaining > 0 ? 'color:var(--margin-red)' : ''}">${peso(c.remaining)}</div><div class="stat-sub">${c.remaining === 0 ? "You've broken even" : 'until break-even'}</div></div>
      </div>
    </section>

    <section class="card">
      <div class="section-title">Net position — are we ahead or behind, right now?</div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">This one moves with every restock. It's total revenue minus <em>everything</em> you've ever spent on materials and equipment to date — so it stays honest if stock goes unsold or unused, unlike the fixed milestone above.</p>
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-label">Total spent to date</div><div class="stat-value">${peso(c.currentMaterialsValue)}</div><div class="stat-sub">materials + equipment, live</div></div>
        <div class="stat-card"><div class="stat-label">Total revenue</div><div class="stat-value">${peso(c.totalRevenue)}</div><div class="stat-sub">gifts &amp; pending excluded</div></div>
        <div class="stat-card"><div class="stat-label">${netPosition >= 0 ? 'Net profit so far' : 'Net still behind'}</div><div class="stat-value" style="${netPosition < 0 ? 'color:var(--margin-red)' : ''}">${peso(Math.abs(netPosition))}</div><div class="stat-sub">${netPosition >= 0 ? "you've taken in more than you've spent, all-time" : 'spent more than earned so far, all-time'}</div></div>
      </div>
    </section>

    ${c.missingPrices.length ? `
    <section class="card warn-card">
      <div class="section-title" style="color:var(--margin-red)">Materials still need a price</div>
      <p class="muted">These are placeholders (₱0) so the calculator doesn't stop working, but your cost and break-even numbers are underestimated until you fill them in on the Materials tab:</p>
      <ul class="plain-list">${c.missingPrices.map((m) => `<li>${esc(m.name)}</li>`).join('')}</ul>
    </section>` : ''}

    <section class="card">
      <div class="section-title">Cost &amp; suggested price per unit</div>
      <div class="product-cost-grid">
        ${PRODUCT_ORDER.map((k) => {
          const r = RECIPES[k]; const pc = c.productComputed[k]; const cfg = state.products[k] || {};
          return `<div class="mini-card">
            <div class="mini-card-head"><span>${r.label}</span><span class="tag">${r.size} · ${cfg.sheets} sheets</span></div>
            <div class="mini-row"><span>Cost to make</span><span class="mono">${peso(pc.totalCost)}</span></div>
            <div class="mini-row"><span>Suggested price</span><span class="mono strong">${peso(pc.suggestedPrice)}</span></div>
          </div>`;
        }).join('')}
      </div>
    </section>

    <section class="card">
      <div class="section-title">Recent sales</div>
      ${recentSales.length === 0 ? '<p class="muted">No sales logged yet.</p>' : `
      <table class="table"><thead><tr><th>Date</th><th>Product</th><th>Qty</th><th>Each</th><th>Total</th><th></th></tr></thead>
      <tbody>
        ${recentSales.map((s) => {
          const excluded = isExcludedSale(s);
          const statusLabel = s.status === 'pending' ? 'pending' : (s.status === 'gift' || s.gift) ? 'gift' : null;
          return `<tr>
          <td>${esc(s.date)}</td>
          <td>${RECIPES[s.product] ? esc(RECIPES[s.product].label) : ''} <span class="muted">(${s.sheets} sh.)</span>${s.bundleProduct && RECIPES[s.bundleProduct] ? `<span class="muted"> + free ${esc(RECIPES[s.bundleProduct].label)}</span>` : ''}</td>
          <td>${s.qty}</td>
          <td>${peso(s.priceEach)}</td>
          <td class="mono">${peso(excluded ? 0 : s.qty * s.priceEach)}</td>
          <td>${statusLabel ? `<span class="tag ${statusLabel === 'gift' ? 'gift' : 'pending'}">${statusLabel}</span>` : ''}</td>
        </tr>`;
        }).join('')}
      </tbody></table>`}
    </section>
  </div>`;
}

/* ---------- Materials tab ---------- */
function materialRow(m, simple) {
  const cpb = costPerBaseUnit(m);
  const flagged = m.needsPrice && !m.price;
  return `<tr class="${flagged ? 'row-flag' : ''}">
    <td>
      <input id="mat-name-${m.id}" class="text-input" value="${esc(m.name)}" oninput="withFocusPreserved(()=>matPatch('${m.id}','name', this.value))" />
      ${flagged ? '<div class="flag-note">needs price</div>' : ''}
    </td>
    <td>${numField(`mat-price-${m.id}`, m.price, `matPatch('${m.id}','price', parseFloat(this.value)||0)`, { suffix: '₱' })}</td>
    ${simple ? '' : `<td>${numField(`mat-pkg-${m.id}`, m.numPackages, `matPatch('${m.id}','numPackages', parseFloat(this.value)||0)`, { min: 0 })}</td>`}
    ${simple ? '' : `<td>${numField(`mat-u1-${m.id}`, m.unitsPerPackage1, `matPatch('${m.id}','unitsPerPackage1', parseFloat(this.value)||0)`, { min: 0 })}</td>`}
    ${simple ? '' : `<td>${numField(`mat-u2-${m.id}`, m.unitsPerPackage2, `matPatch('${m.id}','unitsPerPackage2', parseFloat(this.value)||0)`, { min: 0 })}</td>`}
    ${simple ? '' : `<td><input id="mat-unit-${m.id}" class="text-input narrow" value="${esc(m.baseUnit)}" oninput="withFocusPreserved(()=>matPatch('${m.id}','baseUnit', this.value))" /></td>`}
    ${simple ? '' : `<td class="mono">${peso(cpb)}</td>`}
    <td><button class="icon-btn danger" onclick="matRemove('${m.id}')" title="Delete">✕</button></td>
  </tr>`;
}

function renderMaterialsTab() {
  const equipment = state.materials.filter((m) => m.category === 'equipment');
  const consumables = state.materials.filter((m) => m.category === 'consumable');
  return `
  <div class="stack">
    <section class="card">
      <div class="section-title-row">
        <div class="section-title">Consumable materials</div>
        <button class="btn-primary" onclick="openAddMaterial('consumable')">+ Add material</button>
      </div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">Enter what you paid and how the pack breaks down (e.g. 1 box → 5 reams → 500 sheets). Cost per base unit is calculated for you.</p>
      <table class="table editable">
        <thead><tr><th>Name</th><th>Price paid</th><th>Packages</th><th>Units/pack</th><th>Sub-units</th><th>Base unit</th><th>Cost / base unit</th><th></th></tr></thead>
        <tbody>${consumables.map((m) => materialRow(m, false)).join('')}</tbody>
      </table>
    </section>

    <section class="card">
      <div class="section-title-row">
        <div class="section-title">Equipment (one-time, not consumed per unit)</div>
        <button class="btn-primary" onclick="openAddMaterial('equipment')">+ Add equipment</button>
      </div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">Still counts toward your total capital to recover, but doesn't get used up per notebook. When you buy something new down the road, add it here.</p>
      <table class="table editable">
        <thead><tr><th>Name</th><th>Price paid</th><th></th></tr></thead>
        <tbody>${equipment.map((m) => materialRow(m, true)).join('')}</tbody>
      </table>
    </section>

    ${state.showAddMaterial ? renderAddMaterialModal() : ''}
  </div>`;
}

function renderAddMaterialModal() {
  const f = state.newMaterial;
  return `
  <div class="modal-backdrop" onclick="if(event.target===this) closeAddMaterial()">
    <div class="modal" onclick="event.stopPropagation()">
      <div class="section-title">Add a material</div>
      <div class="form-grid">
        <label>Name<input class="text-input" value="${esc(f.name)}" oninput="newMatPatch('name', this.value)" placeholder="e.g. Ballpen ink" /></label>
        <label>Category
          <select class="text-input" onchange="newMatPatch('category', this.value)">
            <option value="consumable" ${f.category === 'consumable' ? 'selected' : ''}>Consumable</option>
            <option value="equipment" ${f.category === 'equipment' ? 'selected' : ''}>Equipment</option>
          </select>
        </label>
        <label>Price paid${numField('newmat-price', f.price, "newMatPatch('price', parseFloat(this.value)||0)", { suffix: '₱' })}</label>
        <label>Packages${numField('newmat-pkg', f.numPackages, "newMatPatch('numPackages', parseFloat(this.value)||0)")}</label>
        <label>Units per package${numField('newmat-u1', f.unitsPerPackage1, "newMatPatch('unitsPerPackage1', parseFloat(this.value)||0)")}</label>
        <label>Sub-units (optional)${numField('newmat-u2', f.unitsPerPackage2, "newMatPatch('unitsPerPackage2', parseFloat(this.value)||0)")}</label>
        <label>Base unit name<input class="text-input" value="${esc(f.baseUnit)}" oninput="newMatPatch('baseUnit', this.value)" placeholder="sheet, ml, piece..." /></label>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost" onclick="closeAddMaterial()">Cancel</button>
        <button class="btn-primary" onclick="submitAddMaterial()">Add material</button>
      </div>
    </div>
  </div>`;
}

/* ---------- Products tab ---------- */
function renderProductsTab() {
  const c = getComputed();
  return `<div class="stack">${PRODUCT_ORDER.map((key) => {
    const recipe = RECIPES[key]; const cfg = state.products[key] || {}; const pc = c.productComputed[key];
    return `<section class="card ruled">
      <div class="section-title-row">
        <div class="section-title">${recipe.label} <span class="tag">${recipe.size}</span></div>
        <div class="sheet-toggle">
          ${[60, 80].map((n) => `<button class="chip ${cfg.sheets === n ? 'chip-active' : ''}" onclick="prodPatch('${key}','sheets', ${n})">${n} sheets</button>`).join('')}
          ${numField(`prod-sheets-${key}`, cfg.sheets, `prodPatch('${key}','sheets', Math.max(1, Math.round(parseFloat(this.value)||1)))`, { suffix: 'custom' })}
        </div>
      </div>
      ${recipe.hasCoverType ? `<label class="checkbox-row" style="gap:10px">Cover type:
        <div class="sheet-toggle">
          <button class="chip ${(!cfg.coverType || cfg.coverType === 'photo') ? 'chip-active' : ''}" onclick="prodPatch('${key}','coverType','photo')">Photo paper cover</button>
          <button class="chip ${cfg.coverType === 'hard' ? 'chip-active' : ''}" onclick="prodPatch('${key}','coverType','hard')">Hard cover</button>
        </div>
      </label>` : ''}
      ${recipe.hasChipboard ? `<label class="checkbox-row"><input type="checkbox" ${cfg.chipboardOn ? 'checked' : ''} onchange="prodPatch('${key}','chipboardOn', this.checked)" /> Include chipboard backing</label>` : ''}
      <table class="table" style="margin-top:10px">
        <thead><tr><th>Material</th><th>Qty used</th><th>Cost</th></tr></thead>
        <tbody>
          ${pc.breakdown.map((b) => `<tr class="${b.needsPrice ? 'row-flag' : ''}"><td>${esc(b.name)}${b.needsPrice ? '<span class="flag-note"> needs price</span>' : ''}</td><td>${b.qty} ${esc(b.unit)}</td><td class="mono">${peso(b.cost)}</td></tr>`).join('')}
          <tr><td>Ink (black ${pc.blackSides} pg, light color ${pc.colorLightSides} pg, heavy color ${pc.colorHeavySides} pg)</td><td>—</td><td class="mono">${peso(pc.inkCost)}</td></tr>
          <tr><td>Electricity</td><td>—</td><td class="mono">${peso(pc.elecCost)}</td></tr>
        </tbody>
      </table>
      <div class="cost-summary">
        <div><span class="muted">Total cost to make</span><div class="mono strong">${peso(pc.totalCost)}</div></div>
        <div><span class="muted">Markup (${state.settings.markup}%)</span><div class="mono">+${peso(pc.suggestedPrice - pc.totalCost)}</div></div>
        <div><span class="muted">Suggested selling price</span><div class="mono strong big">${peso(pc.suggestedPrice)}</div></div>
      </div>
    </section>`;
  }).join('')}</div>`;
}

/* ---------- Planner tab ---------- */
function maxProducible(key) {
  const recipe = RECIPES[key]; const cfg = state.products[key] || {};
  const matById = Object.fromEntries(state.materials.map((m) => [m.id, m]));
  let max = Infinity, bottleneck = null, bottleneckStock = 0, bottleneckUnit = '', bottleneckQtyPer = 0;
  recipe.linesFn(cfg).forEach((line) => {
    const mat = matById[line.materialId]; if (!mat) return;
    const qtyPer = line.qty;
    const stock = Number(mat.stock) || 0;
    const possible = qtyPer > 0 ? Math.floor(stock / qtyPer) : Infinity;
    if (possible < max) { max = possible; bottleneck = mat.name; bottleneckStock = stock; bottleneckUnit = mat.baseUnit; bottleneckQtyPer = qtyPer; }
  });
  return { max: max === Infinity ? 0 : max, bottleneck, bottleneckStock, bottleneckUnit, bottleneckQtyPer };
}

function batchUsageFor(batchQty) {
  const totals = {};
  PRODUCT_ORDER.forEach((key) => {
    const want = Number(batchQty[key]) || 0;
    if (want <= 0) return;
    const recipe = RECIPES[key]; const cfg = state.products[key] || {};
    recipe.linesFn(cfg).forEach((line) => {
      totals[line.materialId] = (totals[line.materialId] || 0) + line.qty * want;
    });
  });
  return totals;
}

function plannerWant(key, value) { state.plannerQty[key] = Math.max(0, Math.round(value)); render(); }
function matStockPatch(id, value) { updateMaterials(state.materials.map((m) => (m.id === id ? { ...m, stock: value } : m))); }
function batchWant(key, value) { state.batchQty[key] = Math.max(0, Math.round(value)); render(); }
function mixWant(key, value) { state.mixQty[key] = Math.max(0, Math.round(value)); render(); }

function renderPlannerTab() {
  const matById = Object.fromEntries(state.materials.map((m) => [m.id, m]));
  const consumables = state.materials.filter((m) => m.category === 'consumable');
  const c = getComputed();
  const remaining = c.remaining;

  const profitPerUnit = (key) => c.productComputed[key].suggestedPrice - c.productComputed[key].totalCost;

  let mixUnits = null;
  const profitPerCycle = PRODUCT_ORDER.reduce((a, k) => a + (Number(state.mixQty[k]) || 0) * profitPerUnit(k), 0);
  const anyMix = Object.values(state.mixQty).some((v) => Number(v) > 0);
  if (anyMix && profitPerCycle > 0 && remaining > 0) {
    const cyclesNeeded = remaining / profitPerCycle;
    const perProduct = {};
    PRODUCT_ORDER.forEach((k) => { perProduct[k] = Math.ceil((Number(state.mixQty[k]) || 0) * cyclesNeeded); });
    mixUnits = { perProduct };
  }

  let mixMaterialUsage = [];
  if (mixUnits) {
    const totals = {};
    PRODUCT_ORDER.forEach((key) => {
      const want = mixUnits.perProduct[key] || 0;
      if (want <= 0) return;
      const recipe = RECIPES[key]; const cfg = state.products[key] || {};
      recipe.linesFn(cfg).forEach((line) => {
        totals[line.materialId] = (totals[line.materialId] || 0) + line.qty * want;
      });
    });
    mixMaterialUsage = Object.entries(totals).map(([materialId, needed]) => {
      const mat = matById[materialId]; if (!mat) return null;
      const stock = Number(mat.stock) || 0;
      const shortfall = Math.max(0, needed - stock);
      const perPackage = (mat.unitsPerPackage1 || 1) * (mat.unitsPerPackage2 || 1);
      const costPerPackage = mat.numPackages > 0 ? mat.price / mat.numPackages : 0;
      const packagesToBuy = shortfall > 0 && perPackage > 0 ? Math.ceil(shortfall / perPackage) : 0;
      const costToBuy = packagesToBuy * costPerPackage;
      return { id: materialId, name: mat.name, unit: mat.baseUnit, shortfall, packagesToBuy, costToBuy };
    }).filter(Boolean);
  }

  const breakEvenSection = `
    <section class="card ruled">
      <div class="section-title">How many do you need to sell to break even?</div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">
        ${remaining > 0
          ? `You still need to recover ${peso(remaining)}. Here's roughly how many units that takes, based on each product's profit margin (selling price minus cost to make).`
          : "You've already broken even — anything sold from here is profit."}
      </p>
      <div class="product-cost-grid">
        ${PRODUCT_ORDER.map((key) => {
          const pu = profitPerUnit(key);
          const unitsNeeded = pu > 0 && remaining > 0 ? Math.ceil(remaining / pu) : 0;
          return `<div class="mini-card">
            <div class="mini-card-head"><span>${RECIPES[key].label}</span><span class="tag">${RECIPES[key].size}</span></div>
            <div class="mini-row"><span>Profit per unit</span><span class="mono">${peso(pu)}</span></div>
            ${remaining <= 0 ? '<div class="ok-note">Already covered</div>'
              : pu <= 0 ? '<div class="flag-note">No profit at current markup — raise the price on the Products tab first.</div>'
              : `<div class="mini-row"><span>If only this product</span><span class="mono strong">${unitsNeeded} unit(s)</span></div>`}
          </div>`;
        }).join('')}
      </div>
      ${remaining > 0 ? `
        <div class="section-title" style="margin-top:18px;font-size:14px">Or a mix of products</div>
        <p class="muted small" style="margin-top:-6px;margin-bottom:10px">Set the ratio you'd realistically sell together (e.g. for every 1 wired notebook, 2 padpapers) — it scales that mix up until it covers what's left.</p>
        <div class="planner-grid">
          ${PRODUCT_ORDER.map((key) => `<div class="mini-card">
            <div class="mini-card-head"><span>${RECIPES[key].label}</span><span class="tag">${RECIPES[key].size}</span></div>
            <div class="planner-input"><span class="muted small">Ratio</span>${numField(`mix-${key}`, Number(state.mixQty[key]) || 0, `mixWant('${key}', parseFloat(this.value)||0)`, { min: 0 })}</div>
          </div>`).join('')}
        </div>
        ${mixUnits ? `
          <table class="table" style="margin-top:14px">
            <thead><tr><th>Product</th><th>Units needed</th><th>Revenue</th></tr></thead>
            <tbody>
              ${PRODUCT_ORDER.filter((k) => mixUnits.perProduct[k] > 0).map((k) => `<tr>
                <td>${RECIPES[k].label} (${RECIPES[k].size})</td>
                <td class="mono">${mixUnits.perProduct[k]}</td>
                <td class="mono">${peso(mixUnits.perProduct[k] * c.productComputed[k].suggestedPrice)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <div class="cost-summary">
            <div><span class="muted">Total units to sell</span><div class="mono strong big">${Object.values(mixUnits.perProduct).reduce((a, b) => a + b, 0)}</div></div>
          </div>
          ${mixMaterialUsage.some((r) => r.shortfall > 0) ? `
            <div class="section-title" style="margin-top:16px;font-size:14px">Materials you'll need to restock along the way</div>
            <table class="table">
              <thead><tr><th>Material</th><th>Short by</th><th>Buy</th><th>Cost</th></tr></thead>
              <tbody>
                ${mixMaterialUsage.filter((r) => r.shortfall > 0).map((r) => `<tr class="row-flag">
                  <td>${esc(r.name)}</td>
                  <td class="mono">${Math.round(r.shortfall * 100) / 100} ${esc(r.unit)}</td>
                  <td>${r.packagesToBuy} pack(s)</td>
                  <td class="mono">${peso(r.costToBuy)}</td>
                </tr>`).join('')}
              </tbody>
            </table>
            <p class="muted small">This restocking cost isn't added on top of the break-even target above — it's already baked into each product's cost per unit. This table just tells you what to actually go buy to reach that volume.</p>
          ` : ''}
        ` : (anyMix ? `<p class="flag-note" style="margin-top:10px">This mix does not turn a profit at current prices — check your markup on the Products tab.</p>` : '')}
      ` : ''}
    </section>`;

  const finishedByProduct = {};
  (state.finishedStock || []).forEach((f) => { finishedByProduct[f.product] = (finishedByProduct[f.product] || 0) + (Number(f.qty) || 0); });

  const singleCards = PRODUCT_ORDER.map((key) => {
    const { max, bottleneck, bottleneckStock, bottleneckUnit, bottleneckQtyPer } = maxProducible(key);
    const wantQty = state.plannerQty[key] || 0;
    const shortfall = Math.max(0, wantQty - max);
    return `<div class="mini-card">
      <div class="mini-card-head"><span>${RECIPES[key].label}</span><span class="tag">${RECIPES[key].size}</span></div>
      ${finishedByProduct[key] > 0 ? `<div class="mini-row"><span>Already made, ready to sell</span><span class="mono strong" style="color:var(--success)">${finishedByProduct[key]}</span></div>` : ''}
      <div class="mini-row"><span>Can still make from stock</span><span class="mono strong">${max} unit(s)</span></div>
      ${bottleneck ? `<div class="muted small">limited by: ${esc(bottleneck)} — ${bottleneckStock} ${esc(bottleneckUnit)} on hand, ${bottleneckQtyPer} needed per unit</div>` : ''}
      <div class="planner-input"><span class="muted small">I want to make</span>${numField(`plan-${key}`, wantQty, `plannerWant('${key}', parseFloat(this.value)||0)`, { min: 0 })}</div>
      ${wantQty > 0 && shortfall > 0 ? `<div class="flag-note" style="margin-top:6px">Short by ${shortfall} unit(s) worth of ${esc(bottleneck || 'materials')} — buy more before starting.</div>` : ''}
      ${wantQty > 0 && shortfall === 0 ? `<div class="ok-note" style="margin-top:6px">You have enough on hand to make all ${wantQty}.</div>` : ''}
    </div>`;
  }).join('');

  const batchUsage = batchUsageFor(state.batchQty);
  const anyBatchQty = Object.values(state.batchQty).some((v) => Number(v) > 0);
  const batchRows = Object.entries(batchUsage).map(([materialId, needed]) => {
    const mat = matById[materialId]; if (!mat) return null;
    const stock = Number(mat.stock) || 0;
    const shortfall = Math.max(0, needed - stock);
    const perPackage = (mat.unitsPerPackage1 || 1) * (mat.unitsPerPackage2 || 1);
    const costPerPackage = mat.numPackages > 0 ? mat.price / mat.numPackages : 0;
    const packagesToBuy = shortfall > 0 && perPackage > 0 ? Math.ceil(shortfall / perPackage) : 0;
    const costToBuy = packagesToBuy * costPerPackage;
    return { id: materialId, name: mat.name, unit: mat.baseUnit, needed, stock, shortfall, packagesToBuy, costToBuy, needsPrice: mat.needsPrice && !mat.price };
  }).filter(Boolean);
  const totalShort = batchRows.filter((r) => r.shortfall > 0);
  const totalCostToBuy = batchRows.reduce((a, r) => a + r.costToBuy, 0);

  let leftoverHtml = '';
  if (anyBatchQty && totalShort.length === 0) {
    const remainingStock = {};
    state.materials.forEach((m) => { remainingStock[m.id] = Math.max(0, (Number(m.stock) || 0) - (batchUsage[m.id] || 0)); });
    const leftover = PRODUCT_ORDER.map((key) => {
      const recipe = RECIPES[key]; const cfg = state.products[key] || {};
      let max = Infinity, bottleneck = null, bottleneckRemaining = 0, bottleneckUnit = '', bottleneckQtyPer = 0;
      recipe.linesFn(cfg).forEach((line) => {
        const mat = matById[line.materialId]; if (!mat) return;
        const qtyPer = line.qty;
        const remaining = remainingStock[mat.id] || 0;
        const possible = qtyPer > 0 ? Math.floor(remaining / qtyPer) : Infinity;
        if (possible < max) { max = possible; bottleneck = mat.name; bottleneckRemaining = remaining; bottleneckUnit = mat.baseUnit; bottleneckQtyPer = qtyPer; }
      });
      return { key, label: RECIPES[key].label, size: RECIPES[key].size, max: max === Infinity ? 0 : max, bottleneck, bottleneckRemaining, bottleneckUnit, bottleneckQtyPer, alreadyInBatch: (Number(state.batchQty[key]) || 0) > 0 };
    });
    leftoverHtml = `
      <div class="section-title" style="margin-top:18px;font-size:14px">With what's left over after this batch</div>
      <p class="muted small" style="margin-top:-6px;margin-bottom:10px">This is the "transfer" you're asking about — stock not used by the batch above, reallocated to each product on its own.</p>
      <div class="planner-grid">
        ${leftover.map((r) => `<div class="mini-card">
          <div class="mini-card-head"><span>${r.label}</span><span class="tag">${r.size}</span></div>
          <div class="mini-row"><span>${r.alreadyInBatch ? 'Could still add' : 'Could additionally make'}</span><span class="mono strong">${r.max} unit(s)</span></div>
          ${r.bottleneck && r.max > 0 ? `<div class="muted small">next limit: ${esc(r.bottleneck)} — ${r.bottleneckRemaining} ${esc(r.bottleneckUnit)} left, ${r.bottleneckQtyPer} needed per unit</div>` : ''}
          ${r.bottleneck && r.max === 0 ? `<div class="flag-note">blocked by: ${esc(r.bottleneck)} — only ${r.bottleneckRemaining} ${esc(r.bottleneckUnit)} left, needs ${r.bottleneckQtyPer} per unit</div>` : ''}
        </div>`).join('')}
      </div>`;
  }

  return `<div class="stack">
    ${breakEvenSection}
    <section class="card">
      <div class="section-title">Materials on hand</div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">Set how much of each material you currently have (in base units). Update this as you use materials up — the planner below uses these numbers.</p>
      <table class="table editable">
        <thead><tr><th>Material</th><th>Stock on hand</th><th>Base unit</th></tr></thead>
        <tbody>${consumables.map((m) => `<tr><td>${esc(m.name)}</td><td>${numField(`stock-${m.id}`, Number(m.stock) || 0, `matStockPatch('${m.id}', parseFloat(this.value)||0)`, { min: 0 })}</td><td class="muted">${esc(m.baseUnit)}</td></tr>`).join('')}</tbody>
      </table>
    </section>

    <section class="card ruled">
      <div class="section-title">What can you make right now?</div>
      <div class="planner-grid">${singleCards}</div>
    </section>

    <section class="card ruled">
      <div class="section-title">Plan a mixed batch</div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">Set how many of each product you actually plan to make together, and this adds up what that really costs you in materials — since they all draw from the same stock.</p>
      <div class="planner-grid">
        ${PRODUCT_ORDER.map((key) => `<div class="mini-card">
          <div class="mini-card-head"><span>${RECIPES[key].label}</span><span class="tag">${RECIPES[key].size}</span></div>
          <div class="planner-input"><span class="muted small">Make</span>${numField(`batch-${key}`, Number(state.batchQty[key]) || 0, `batchWant('${key}', parseFloat(this.value)||0)`, { min: 0 })}</div>
        </div>`).join('')}
      </div>
      ${anyBatchQty ? `
        <table class="table" style="margin-top:16px">
          <thead><tr><th>Material</th><th>Needed</th><th>On hand</th><th>Short by</th><th>Buy</th><th>Cost to buy</th></tr></thead>
          <tbody>
            ${batchRows.map((r) => `<tr class="${r.shortfall > 0 ? 'row-flag' : ''}">
              <td>${esc(r.name)}${r.needsPrice ? '<span class="flag-note"> needs price</span>' : ''}</td>
              <td>${Math.round(r.needed * 100) / 100} ${esc(r.unit)}</td>
              <td>${r.stock} ${esc(r.unit)}</td>
              <td class="${r.shortfall > 0 ? 'mono strong' : 'mono'}">${r.shortfall > 0 ? `${Math.round(r.shortfall * 100) / 100} ${esc(r.unit)}` : '—'}</td>
              <td>${r.packagesToBuy > 0 ? `${r.packagesToBuy} pack(s)` : '—'}</td>
              <td class="mono">${r.costToBuy > 0 ? peso(r.costToBuy) : '—'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        <div class="cost-summary">
          <div><span class="muted">Batch status</span><div class="mono strong" style="color:${totalShort.length ? 'var(--margin-red)' : 'var(--success)'}">${totalShort.length ? `Short on ${totalShort.length} material(s)` : 'You have everything for this batch'}</div></div>
          ${totalCostToBuy > 0 ? `<div><span class="muted">Estimated cost to fill the gaps</span><div class="mono strong big">${peso(totalCostToBuy)}</div></div>` : ''}
        </div>
        ${leftoverHtml}
      ` : ''}
    </section>
  </div>`;
}

/* ---------- Sales tab ---------- */
/* ---------- Inventory tab ---------- */
function renderInventoryTab() {
  const c = getComputed();
  const totalsByProduct = {};
  PRODUCT_ORDER.forEach((k) => { totalsByProduct[k] = 0; });
  state.finishedStock.forEach((f) => { totalsByProduct[f.product] = (totalsByProduct[f.product] || 0) + (Number(f.qty) || 0); });
  const grandTotal = Object.values(totalsByProduct).reduce((a, b) => a + b, 0);
  const readyValue = state.finishedStock.reduce((a, f) => a + (Number(f.qty) || 0) * ((c.productComputed[f.product] && c.productComputed[f.product].suggestedPrice) || 0), 0);

  return `<div class="stack">
    <section class="card ruled">
      <div class="section-title">Finished goods ready to sell</div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">Units you've already made and have on hand right now — separate from raw materials. Update this whenever you finish a production batch, or when a unit is sold, gifted, or damaged. This is what still lets you sell even when a material has run out.</p>
      <div class="product-cost-grid" style="margin-bottom:14px">
        ${PRODUCT_ORDER.map((k) => `<div class="mini-card">
          <div class="mini-card-head"><span>${RECIPES[k].label}</span><span class="tag">${RECIPES[k].size}</span></div>
          <div class="mini-row"><span>Ready to sell</span><span class="mono strong">${totalsByProduct[k] || 0}</span></div>
        </div>`).join('')}
      </div>
      <div class="section-title-row">
        <div></div>
        <button class="btn-primary" onclick="stockAdd()">+ Add stock entry</button>
      </div>
      <table class="table editable">
        <thead><tr><th>Product</th><th>Sheets</th><th>Variant</th><th>Qty on hand</th><th></th></tr></thead>
        <tbody>
          ${state.finishedStock.length === 0 ? `<tr><td colspan="5" class="muted">No finished stock logged yet — add a row for each batch of already-made products you have ready to sell.</td></tr>` : ''}
          ${state.finishedStock.map((f) => `<tr>
            <td><select class="text-input" onchange="stockPatch('${f.id}','product', this.value)">
              ${PRODUCT_ORDER.map((k) => `<option value="${k}" ${f.product === k ? 'selected' : ''}>${RECIPES[k].label} (${RECIPES[k].size})</option>`).join('')}
            </select></td>
            <td>${numField(`stockrow-sheets-${f.id}`, f.sheets, `stockPatch('${f.id}','sheets', parseFloat(this.value)||0)`)}</td>
            <td><input id="stockrow-variant-${f.id}" class="text-input" value="${esc(f.variant)}" oninput="withFocusPreserved(()=>stockPatch('${f.id}','variant', this.value))" placeholder="e.g. hard cover, with chipboard" /></td>
            <td>${numField(`stockrow-qty-${f.id}`, f.qty, `stockPatch('${f.id}','qty', parseFloat(this.value)||0)`, { min: 0 })}</td>
            <td><button class="icon-btn danger" onclick="stockRemove('${f.id}')" title="Delete">✕</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div class="cost-summary" style="margin-top:14px">
        <div><span class="muted">Total finished units on hand</span><div class="mono strong big">${grandTotal}</div></div>
        <div><span class="muted">Value if all sold at suggested price</span><div class="mono strong">${peso(readyValue)}</div></div>
      </div>
    </section>
  </div>`;
}

/* ---------- Sales tab ---------- */
function renderSalesTab() {
  const c = getComputed();
  const pendingCount = state.sales.filter((s) => s.status === 'pending').length;
  return `<div class="stack">
    <section class="card">
      <div class="section-title-row">
        <div class="section-title">Sales log</div>
        <button class="btn-primary" onclick="saleAdd()">+ Add sale</button>
      </div>
      <p class="muted" style="margin-top:-6px;margin-bottom:12px">Set status to <strong>Pending</strong> for orders that haven't been picked up or paid for yet — those won't count toward revenue until you switch them to Sold. Use "Free item included" for bundles, like a free notepad given with a notebook.</p>
      <div style="overflow-x:auto">
      <table class="table editable">
        <thead><tr><th>Date</th><th>Product</th><th>Sheets</th><th>Qty</th><th>Price each</th><th>Status</th><th>Buyer</th><th>Free item included</th><th>Free sheets</th><th>Free qty</th><th>Note</th><th></th></tr></thead>
        <tbody>
          ${state.sales.map((s) => {
            const statusVal = s.status || (s.gift ? 'gift' : 'sold');
            return `<tr class="${statusVal === 'pending' ? 'row-flag' : ''}">
            <td><input id="sale-date-${s.id}" class="text-input narrow" type="date" value="${esc(s.date)}" onchange="salePatch('${s.id}','date', this.value)" /></td>
            <td><select class="text-input" onchange="salePatch('${s.id}','product', this.value)">
              ${PRODUCT_ORDER.map((k) => `<option value="${k}" ${s.product === k ? 'selected' : ''}>${RECIPES[k].label} (${RECIPES[k].size})</option>`).join('')}
            </select></td>
            <td>${numField(`sale-sheets-${s.id}`, s.sheets, `salePatch('${s.id}','sheets', parseFloat(this.value)||0)`)}</td>
            <td>${numField(`sale-qty-${s.id}`, s.qty, `salePatch('${s.id}','qty', parseFloat(this.value)||0)`)}</td>
            <td>${numField(`sale-price-${s.id}`, s.priceEach, `salePatch('${s.id}','priceEach', parseFloat(this.value)||0)`, { suffix: '₱' })}</td>
            <td><select class="text-input" onchange="salePatch('${s.id}','status', this.value)">
              <option value="sold" ${statusVal === 'sold' ? 'selected' : ''}>Sold</option>
              <option value="pending" ${statusVal === 'pending' ? 'selected' : ''}>Pending (not paid/picked up)</option>
              <option value="gift" ${statusVal === 'gift' ? 'selected' : ''}>Gift</option>
            </select></td>
            <td><input id="sale-buyer-${s.id}" class="text-input narrow" value="${esc(s.buyer)}" oninput="withFocusPreserved(()=>salePatch('${s.id}','buyer', this.value))" /></td>
            <td><select class="text-input" onchange="salePatch('${s.id}','bundleProduct', this.value)">
              <option value="" ${!s.bundleProduct ? 'selected' : ''}>None</option>
              ${PRODUCT_ORDER.map((k) => `<option value="${k}" ${s.bundleProduct === k ? 'selected' : ''}>${RECIPES[k].label} (${RECIPES[k].size})</option>`).join('')}
            </select></td>
            <td>${s.bundleProduct ? numField(`sale-bsheets-${s.id}`, s.bundleSheets || 0, `salePatch('${s.id}','bundleSheets', parseFloat(this.value)||0)`) : ''}</td>
            <td>${s.bundleProduct ? numField(`sale-bqty-${s.id}`, s.bundleQty || 1, `salePatch('${s.id}','bundleQty', parseFloat(this.value)||0)`) : ''}</td>
            <td><input id="sale-note-${s.id}" class="text-input" value="${esc(s.note)}" oninput="withFocusPreserved(()=>salePatch('${s.id}','note', this.value))" /></td>
            <td><button class="icon-btn danger" onclick="saleRemove('${s.id}')" title="Delete">✕</button></td>
          </tr>`;
          }).join('')}
        </tbody>
      </table>
      </div>
      <div class="cost-summary" style="margin-top:14px">
        <div><span class="muted">Total revenue (gifts &amp; pending excluded)</span><div class="mono strong big">${peso(c.totalRevenue)}</div></div>
        ${pendingCount > 0 ? `<div><span class="muted">Pending orders</span><div class="mono strong">${pendingCount}</div></div>` : ''}
      </div>
    </section>
  </div>`;
}

/* ---------- Settings tab ---------- */
function renderSettingsTab() {
  const s = state.settings;
  const currentMaterialsValue = state.materials.reduce((a, m) => a + (Number(m.price) || 0), 0);
  return `<div class="stack">
    <section class="card ruled">
      <div class="section-title">Break-even target</div>
      <div class="form-grid">
        <label>Starting capital to recover${numField('set-startingCapital', s.startingCapital, "settingsPatch('startingCapital', parseFloat(this.value)||0)", { suffix: '₱' })}</label>
      </div>
      <p class="muted small">This feeds the "starting investment" milestone on the Dashboard — a fixed number that answers "have we earned back what we put in to start this." It's set once and only changes when you edit it here. Your Dashboard also shows a second, live number ("net position") that answers a different question — whether the business has taken in more than it's spent, all-time, including every restock. Neither one is more "correct" than the other; they're just answering different questions, so both are shown. Current materials + equipment on record: <strong>${peso(currentMaterialsValue)}</strong>.</p>
      <button class="btn-ghost" style="margin-top:8px" onclick="if(confirm('Set the break-even target to match your current materials + equipment total? This will change your break-even target.')) settingsPatch('startingCapital', ${currentMaterialsValue})">Sync target to current materials + equipment total</button>
    </section>

    <section class="card">
      <div class="section-title">Electricity</div>
      <div class="form-grid">
        <label>Rate${numField('set-electricityRate', s.electricityRate, "settingsPatch('electricityRate', parseFloat(this.value)||0)", { suffix: '₱/kWh' })}</label>
        <label>Printer wattage${numField('set-printerWatt', s.printerWatt, "settingsPatch('printerWatt', parseFloat(this.value)||0)", { suffix: 'W' })}</label>
        <label>Black print speed${numField('set-blackIpm', s.blackIpm, "settingsPatch('blackIpm', parseFloat(this.value)||0)", { suffix: 'pages/min' })}</label>
        <label>Color print speed${numField('set-colorIpm', s.colorIpm, "settingsPatch('colorIpm', parseFloat(this.value)||0)", { suffix: 'pages/min' })}</label>
      </div>
      <p class="muted small">Canon G2020 draws about 18W while printing, ~0.6W on standby. Speeds default to Canon's rated 9.1 ipm black / 5.0 ipm color — edit if yours differs.</p>
    </section>

    <section class="card">
      <div class="section-title">Ink (rough estimate)</div>
      <div class="form-grid">
        <label>Black bottle price${numField('set-blackBottlePrice', s.blackBottlePrice, "settingsPatch('blackBottlePrice', parseFloat(this.value)||0)", { suffix: '₱' })}</label>
        <label>Black page yield${numField('set-blackYield', s.blackYield, "settingsPatch('blackYield', parseFloat(this.value)||0)", { suffix: 'pages' })}</label>
        <label>Color bottle price${numField('set-colorBottlePrice', s.colorBottlePrice, "settingsPatch('colorBottlePrice', parseFloat(this.value)||0)", { suffix: '₱' })}</label>
        <label>Color page yield${numField('set-colorYield', s.colorYield, "settingsPatch('colorYield', parseFloat(this.value)||0)", { suffix: 'pages' })}</label>
        <label>Heavy-cover ink multiplier${numField('set-colorHeavyMultiplier', s.colorHeavyMultiplier, "settingsPatch('colorHeavyMultiplier', parseFloat(this.value)||0)", { suffix: '×' })}</label>
      </div>
      <p class="muted small">Defaults are placeholders based on typical local GI-71 bottle prices — swap in your actual receipt totals whenever you like, no rush. The "heavy-cover multiplier" accounts for full-bleed, richly saturated cover designs (like the Astronaut Kids and sailboat covers) using noticeably more ink than a typical light-color print — the color yield rating printers publish is based on much lighter average coverage. 4× is a reasonable starting estimate; if you ever track how many notebooks you actually get from one full ink refill, that number would let us calibrate this properly.</p>
    </section>

    <section class="card">
      <div class="section-title">Pricing</div>
      <div class="form-grid"><label>Markup over cost${numField('set-markup', s.markup, "settingsPatch('markup', parseFloat(this.value)||0)", { suffix: '%' })}</label></div>
    </section>

    <section class="card warn-card"><button class="btn-ghost" onclick="resetAll()">Reset to starting defaults</button></section>
  </div>`;
}

/* ---------- main render dispatcher ---------- */
function render() {
  renderTabs();
  renderBanner();
  const main = document.getElementById('app-main');
  if (state.loading) { main.innerHTML = `<div style="padding:48px;text-align:center;color:var(--ink-soft)">Loading your ledger…</div>`; return; }
  if (state.tab === 'dashboard') main.innerHTML = renderDashboard();
  else if (state.tab === 'materials') main.innerHTML = renderMaterialsTab();
  else if (state.tab === 'products') main.innerHTML = renderProductsTab();
  else if (state.tab === 'planner') main.innerHTML = renderPlannerTab();
  else if (state.tab === 'inventory') main.innerHTML = renderInventoryTab();
  else if (state.tab === 'sales') main.innerHTML = renderSalesTab();
  else if (state.tab === 'settings') main.innerHTML = renderSettingsTab();
}

/* ---------- boot ---------- */
render();
loadAll();
