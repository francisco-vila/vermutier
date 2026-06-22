import { useState, useEffect } from "react";

const T = {
  bg:"#1a1610",surface:"#231f18",card:"#2c2720",border:"#3d3628",
  copper:"#b5651d",copperLight:"#d4854a",amber:"#c9922a",
  cream:"#e8dfc8",creamMuted:"#a89880",green:"#3a5c3a",
  greenLight:"#4e7a4e",red:"#8b2c2c",text:"#e8dfc8",textMuted:"#9a8c78",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:${T.bg};color:${T.text};font-family:'Inter',sans-serif;min-height:100vh;}
  .app{max-width:980px;margin:0 auto;padding:24px 16px 60px;}
  .header{text-align:center;padding:32px 0 24px;border-bottom:1px solid ${T.border};margin-bottom:28px;}
  .header-eyebrow{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:${T.copper};margin-bottom:10px;}
  .header-title{font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,44px);font-weight:700;color:${T.cream};line-height:1.1;}
  .header-title span{color:${T.amber};}
  .header-sub{font-size:13px;color:${T.textMuted};margin-top:8px;}
  .tabs{display:flex;gap:4px;background:${T.surface};border:1px solid ${T.border};border-radius:10px;padding:4px;margin-bottom:24px;flex-wrap:wrap;}
  .tab{flex:1;padding:9px 6px;border:none;border-radius:7px;background:transparent;color:${T.textMuted};font-family:'Inter',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .18s;white-space:nowrap;min-width:70px;}
  .tab:hover{color:${T.cream};}
  .tab.active{background:${T.card};color:${T.amber};border:1px solid ${T.border};}
  .card{background:${T.card};border:1px solid ${T.border};border-radius:12px;padding:20px;margin-bottom:16px;}
  .card-title{font-family:'Playfair Display',serif;font-size:17px;color:${T.cream};margin-bottom:14px;display:flex;align-items:center;gap:8px;}
  .card-title::before{content:'';display:inline-block;width:3px;height:18px;background:${T.copper};border-radius:2px;}
  label{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${T.textMuted};margin-bottom:5px;}
  input,select,textarea{width:100%;background:${T.surface};border:1px solid ${T.border};border-radius:7px;color:${T.cream};font-family:'Inter',sans-serif;font-size:14px;padding:9px 12px;outline:none;transition:border-color .15s;}
  input:focus,select:focus,textarea:focus{border-color:${T.copper};}
  select option{background:${T.surface};}
  .field{margin-bottom:14px;}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .row-3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;}
  .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border:none;border-radius:7px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;}
  .btn-primary{background:${T.copper};color:#fff;}
  .btn-primary:hover{background:${T.copperLight};}
  .btn-primary:disabled{opacity:.5;cursor:not-allowed;}
  .btn-ghost{background:transparent;border:1px solid ${T.border};color:${T.textMuted};}
  .btn-ghost:hover{border-color:${T.copper};color:${T.cream};}
  .btn-success{background:${T.green};color:#aedcae;border:1px solid ${T.greenLight};}
  .btn-success:hover{background:${T.greenLight};}
  .btn-danger{background:transparent;border:1px solid ${T.red};color:#c46060;padding:5px 10px;font-size:12px;}
  .btn-danger:hover{background:${T.red};color:#fff;}
  .btn-sm{padding:6px 12px;font-size:12px;}
  .tbl{width:100%;border-collapse:collapse;font-size:13px;}
  .tbl th{text-align:left;padding:8px 10px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:${T.textMuted};border-bottom:1px solid ${T.border};}
  .tbl td{padding:9px 10px;border-bottom:1px solid ${T.border}22;vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .num{text-align:right;font-variant-numeric:tabular-nums;}
  .highlight{color:${T.amber};font-weight:600;}
  .tag{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;}
  .tag-backbone{background:#3d2a10;color:${T.amber};}
  .tag-body{background:#1e3020;color:#6daa6d;}
  .tag-finish{background:#1a2535;color:#6a9ac4;}
  .tag-hist{background:#2a1a35;color:#a06ac4;}
  .recipes-list{display:flex;flex-direction:column;gap:8px;}
  .recipe-item{background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:10px 14px;cursor:pointer;transition:border-color .15s;display:flex;justify-content:space-between;align-items:center;}
  .recipe-item:hover{border-color:${T.copper};}
  .recipe-item.selected{border-color:${T.copper};background:${T.card};}
  .recipe-item.historic{border-left:3px solid #a06ac4;}
  .recipe-name{font-size:14px;color:${T.cream};}
  .recipe-meta{font-size:11px;color:${T.textMuted};margin-top:2px;}
  .radar-wrap{display:flex;justify-content:center;padding:8px 0;}
  .score-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .score-label{width:140px;font-size:13px;color:${T.creamMuted};flex-shrink:0;}
  .score-bar-bg{flex:1;height:6px;background:${T.surface};border-radius:3px;overflow:hidden;}
  .score-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,${T.copper},${T.amber});transition:width .3s;}
  .score-val{width:28px;text-align:right;font-size:13px;color:${T.amber};font-weight:600;}
  .total-score{text-align:center;font-family:'Playfair Display',serif;font-size:48px;color:${T.amber};line-height:1;margin:16px 0 4px;}
  .total-label{text-align:center;font-size:12px;color:${T.textMuted};}
  .cost-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px;}
  .cost-kpi{background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:14px;text-align:center;}
  .cost-kpi-val{font-family:'Playfair Display',serif;font-size:22px;color:${T.amber};display:block;}
  .cost-kpi-label{font-size:11px;color:${T.textMuted};margin-top:2px;}
  .divider{border:none;border-top:1px solid ${T.border};margin:16px 0;}
  .hint{font-size:12px;color:${T.textMuted};margin-top:4px;}
  .empty{text-align:center;padding:32px;color:${T.textMuted};font-size:14px;}
  .flex-between{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
  .section-label{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:${T.copper};margin-bottom:10px;margin-top:18px;}
  .alert{background:#2a1f0a;border:1px solid ${T.amber}44;border-radius:8px;padding:12px 14px;font-size:13px;color:${T.cream};margin-bottom:14px;}
  .alert-purple{background:#1e1428;border:1px solid #a06ac444;border-radius:8px;padding:12px 14px;font-size:13px;color:${T.cream};margin-bottom:14px;}
  .botanicos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px;margin-bottom:14px;}
  .bot-check{display:flex;align-items:center;gap:8px;padding:7px 10px;background:${T.surface};border:1px solid ${T.border};border-radius:7px;cursor:pointer;transition:border-color .15s;font-size:13px;color:${T.creamMuted};}
  .bot-check:hover{border-color:${T.copper}44;}
  .bot-check.checked{border-color:${T.copper};color:${T.cream};background:#2a1f0a;}
  .bot-check input[type=checkbox]{accent-color:${T.copper};width:14px;height:14px;flex-shrink:0;}
  .propuesta-card{background:${T.surface};border:1px solid ${T.border};border-radius:10px;padding:16px;margin-bottom:12px;}
  .propuesta-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
  .propuesta-nombre{font-family:'Playfair Display',serif;font-size:16px;color:${T.cream};}
  .propuesta-perfil{font-size:12px;color:${T.textMuted};margin-top:3px;}
  .propuesta-justif{font-size:12px;color:${T.creamMuted};margin-top:10px;font-style:italic;border-left:2px solid ${T.copper}44;padding-left:10px;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .spinner{width:20px;height:20px;border:2px solid ${T.border};border-top-color:${T.copper};border-radius:50%;animation:spin .7s linear infinite;display:inline-block;}
  .loading-box{display:flex;flex-direction:column;align-items:center;gap:14px;padding:40px;color:${T.textMuted};font-size:14px;}
  .sidebar-inner{display:flex;flex-direction:column;gap:8px;}
  .badge-hist{display:inline-block;padding:2px 7px;border-radius:4px;font-size:10px;background:#2a1a35;color:#c9a0f0;margin-left:6px;vertical-align:middle;}

  /* ── Responsivo móvil ── */
  @media (max-width: 640px) {
    .app { padding: 12px 10px 80px; }
    .header { padding: 20px 0 16px; }
    .header-title { font-size: 28px; }
    .layout { flex-direction: column !important; gap: 0 !important; }
    .sidebar { width: 100% !important; max-width: 100% !important; min-width: 0 !important; }
    .sidebar-inner { display: flex; flex-direction: row; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px; }
    .sidebar-section-label { display: none; }
    .sidebar-new-btn { flex-shrink: 0; }
    .recipes-list { flex-direction: row !important; flex-wrap: nowrap; gap: 6px; }
    .recipe-item { min-width: 140px; flex-direction: column; align-items: flex-start; gap: 4px; padding: 8px 10px; }
    .recipe-item .btn-danger { align-self: flex-end; margin-top: 4px; }
    .tabs { gap: 2px; }
    .tab { font-size: 11px; padding: 8px 4px; }
    .card { padding: 14px 12px; }
    .card-title { font-size: 15px; }
    .row { grid-template-columns: 1fr !important; }
    .row-3 { grid-template-columns: 1fr !important; }
    .botanicos-grid { grid-template-columns: 1fr 1fr !important; gap: 5px; }
    .bot-check { font-size: 12px; padding: 6px 8px; }
    .tbl { font-size: 12px; }
    .tbl th { font-size: 9px; padding: 6px 6px; }
    .tbl td { padding: 7px 6px; }
    .cost-summary { grid-template-columns: 1fr 1fr 1fr !important; }
    .cost-kpi { padding: 10px 8px; }
    .cost-kpi-val { font-size: 18px; }
    input, select, textarea { font-size: 16px !important; }
    .btn { font-size: 13px; }
    .total-score { font-size: 36px; }
    .score-label { width: 110px; font-size: 12px; }
  }
`;

// ── STOCK DE PANTXO ──────────────────────────────────────────────
const STOCK_HUERTA = [
  "Apio","Peumo (hojas)","Ajenjo","Anís (semilla)","Arrayán (bayas)","Arrayán (hoja)",
  "Olivo (hojas)","Hibisco","Piel de naranja","Piel de limón","Piel de pomelo",
  "Hinojo","Menta","Romero","Cedrón",
];
const STOCK_COMPRADO = [
  "Tabaco","Cardamomo","Murta","Ruibarbo","Coriander (semilla)",
  "Canela cassia","Regaliz (raíz)","Raíz de angélica","Enebro",
];
const STOCK_TODO = [...STOCK_HUERTA, ...STOCK_COMPRADO];

// ── RECETAS HISTÓRICAS (con gramajes estimados desde R7) ─────────
const RECETAS_HISTORICAS = [
  {
    id:"hist_r7", nombre:"Viognier-Roussanne mayo 2023", fecha:"1 may 2023",
    estilo:"vermouth_bianco", base:"Viognier-Roussanne 2020",
    perfil:"Cítrico-herbáceo con fondo frutal y especiado suave",
    procesoNotas:"Única receta con gramajes reales. Base de calibración.",
    esHistorica:true,
    botanicos:[
      {id:"h1",nombre:"Ajenjo",gl:"1.3",rol:"backbone",notas:"Amargo limpio, bajo"},
      {id:"h2",nombre:"Naranja (cáscara)",gl:"2.8",rol:"body",notas:"Cuerpo cítrico dominante"},
      {id:"h3",nombre:"Arrayán (bayas)",gl:"1.3",rol:"body",notas:"Frutal silvestre"},
      {id:"h4",nombre:"Pomelo (cáscara)",gl:"0.5",rol:"body",notas:"Cítrico amargo seco"},
      {id:"h5",nombre:"Menta",gl:"0.4",rol:"body",notas:"Frescura herbal"},
      {id:"h6",nombre:"Menta coca",gl:"0.5",rol:"body",notas:"Herbal más intenso"},
      {id:"h7",nombre:"Tilo",gl:"0.2",rol:"finish",notas:"Floral suave"},
      {id:"h8",nombre:"Pimienta negra",gl:"0.3",rol:"finish",notas:"Especiado seco"},
      {id:"h9",nombre:"Cardamomo",gl:"0.5",rol:"finish",notas:"Especiado cálido"},
      {id:"h10",nombre:"Nuez moscada",gl:"0.1",rol:"finish",notas:"Cálido de fondo"},
    ],
    cata:{},
  },
  {
    id:"hist_r10", nombre:"Rosé agosto 2021 — Peumo", fecha:"14 ago 2021",
    estilo:"vermouth_rosado", base:"Rosé Reserva Undurraga 2017",
    perfil:"Especiado con peumo y notas cítricas, más robusto",
    procesoNotas:"Gramajes parciales. Peumo añadido al final. Pimienta alta para la época.",
    esHistorica:true,
    botanicos:[
      {id:"h11",nombre:"Ajenjo",gl:"1.8",rol:"backbone",notas:"Backbone más intenso que R7"},
      {id:"h12",nombre:"Peumo (hojas)",gl:"0.8",rol:"backbone",notas:"Resinoso característico"},
      {id:"h13",nombre:"Naranja (cáscara)",gl:"2.4",rol:"body",notas:"Cítrico dominante"},
      {id:"h14",nombre:"Pomelo (cáscara)",gl:"0.8",rol:"body",notas:"Cítrico amargo"},
      {id:"h15",nombre:"Cedrón",gl:"0.6",rol:"body",notas:"Herbal limón"},
      {id:"h16",nombre:"Canela cassia",gl:"0.5",rol:"body",notas:"Especiado cálido"},
      {id:"h17",nombre:"Anís (semilla)",gl:"0.4",rol:"body",notas:"Anisado suave"},
      {id:"h18",nombre:"Pimienta negra",gl:"0.5",rol:"finish",notas:"Alta para la época"},
      {id:"h19",nombre:"Nuez moscada",gl:"0.1",rol:"finish",notas:"Cálido de fondo"},
      {id:"h20",nombre:"Jengibre",gl:"0.3",rol:"finish",notas:"Picante fresco"},
    ],
    cata:{},
  },
  {
    id:"hist_r3", nombre:"Teillery enero 2024", fecha:"27 ene 2024",
    estilo:"vermouth_bianco", base:"Vino orgánico Teillery sin sulfitos",
    perfil:"Herbal-cítrico con anís y especias cálidas, estilo más floral",
    procesoNotas:"Sin gramajes originales. Estimados desde R7 y patrón histórico.",
    esHistorica:true,
    botanicos:[
      {id:"h21",nombre:"Ajenjo",gl:"1.3",rol:"backbone",notas:"Backbone seco"},
      {id:"h22",nombre:"Peumo (hojas)",gl:"0.7",rol:"backbone",notas:"Resinoso territorial"},
      {id:"h23",nombre:"Naranja (cáscara)",gl:"2.5",rol:"body",notas:"Cítrico principal"},
      {id:"h24",nombre:"Limón (cáscara)",gl:"0.8",rol:"body",notas:"Cítrico fresco"},
      {id:"h25",nombre:"Cedrón",gl:"0.6",rol:"body",notas:"Herbal limón"},
      {id:"h26",nombre:"Hinojo",gl:"0.5",rol:"body",notas:"Anisado vegetal"},
      {id:"h27",nombre:"Anís (semilla)",gl:"0.4",rol:"body",notas:"Dulce anisado"},
      {id:"h28",nombre:"Cardamomo",gl:"0.4",rol:"finish",notas:"Especiado cálido"},
      {id:"h29",nombre:"Canela cassia",gl:"0.3",rol:"finish",notas:"Cálido de fondo"},
    ],
    cata:{},
  },
  {
    id:"hist_r4", nombre:"Teillery diciembre 2023", fecha:"13 dic 2023",
    estilo:"vermouth_bianco", base:"Vino orgánico Teillery sin sulfitos",
    perfil:"Más especiado y robusto, con jengibre y clavo de la etapa 2021-23",
    procesoNotas:"Sin gramajes. Estimados. Período de transición hacia menor uso de clavo/jengibre.",
    esHistorica:true,
    botanicos:[
      {id:"h31",nombre:"Ajenjo",gl:"1.3",rol:"backbone",notas:"Backbone seco"},
      {id:"h32",nombre:"Peumo (hojas)",gl:"0.7",rol:"backbone",notas:"Resinoso territorial"},
      {id:"h33",nombre:"Naranja (cáscara)",gl:"2.5",rol:"body",notas:"Cítrico dominante"},
      {id:"h34",nombre:"Pomelo (cáscara)",gl:"0.6",rol:"body",notas:"Amargo seco"},
      {id:"h35",nombre:"Menta",gl:"0.4",rol:"body",notas:"Frescura herbal"},
      {id:"h36",nombre:"Canela cassia",gl:"0.4",rol:"finish",notas:"Cálido especiado"},
      {id:"h37",nombre:"Cardamomo",gl:"0.4",rol:"finish",notas:"Especiado cálido"},
      {id:"h38",nombre:"Pimienta negra",gl:"0.3",rol:"finish",notas:"Especiado seco"},
      {id:"h39",nombre:"Nuez moscada",gl:"0.1",rol:"finish",notas:"Cálido de fondo"},
    ],
    cata:{},
  },
  {
    id:"hist_r6", nombre:"Viognier-Roussanne junio 2023", fecha:"15 jun 2023",
    estilo:"vermouth_bianco", base:"Viognier-Roussanne 2020",
    perfil:"Cítrico-silvestre con murta y arrayán. Mayor complejidad frutal.",
    procesoNotas:"Sin gramajes. Estimados. Introduce murta como novedad.",
    esHistorica:true,
    botanicos:[
      {id:"h41",nombre:"Ajenjo",gl:"1.3",rol:"backbone",notas:"Backbone seco"},
      {id:"h42",nombre:"Naranja (cáscara)",gl:"2.5",rol:"body",notas:"Cítrico dominante"},
      {id:"h43",nombre:"Limón (cáscara)",gl:"0.7",rol:"body",notas:"Cítrico fresco"},
      {id:"h44",nombre:"Pomelo (cáscara)",gl:"0.5",rol:"body",notas:"Cítrico amargo"},
      {id:"h45",nombre:"Arrayán (bayas)",gl:"1.2",rol:"body",notas:"Frutal silvestre"},
      {id:"h46",nombre:"Murta",gl:"0.8",rol:"body",notas:"Frutal nativa"},
      {id:"h47",nombre:"Menta",gl:"0.4",rol:"body",notas:"Frescura herbal"},
      {id:"h48",nombre:"Cardamomo",gl:"0.4",rol:"finish",notas:"Especiado cálido"},
      {id:"h49",nombre:"Pimienta negra",gl:"0.3",rol:"finish",notas:"Especiado seco"},
      {id:"h50",nombre:"Nuez moscada",gl:"0.1",rol:"finish",notas:"Cálido de fondo"},
    ],
    cata:{},
  },
  {
    id:"hist_r1", nombre:"Batch A — junio 2025", fecha:"2 jun 2025",
    estilo:"vermouth_bianco", base:"Por definir",
    perfil:"Floral-herbal sin ajenjo. Experimento con hibisco y peumo.",
    procesoNotas:"Sin gramajes ni base documentada. Estimados conservadores.",
    esHistorica:true,
    botanicos:[
      {id:"h51",nombre:"Peumo (hojas)",gl:"1.0",rol:"backbone",notas:"Backbone resinoso sin ajenjo"},
      {id:"h52",nombre:"Hibisco",gl:"1.5",rol:"body",notas:"Floral ácido, color"},
      {id:"h53",nombre:"Hinojo",gl:"0.8",rol:"body",notas:"Anisado vegetal"},
      {id:"h54",nombre:"Cedrón",gl:"0.7",rol:"body",notas:"Herbal limón"},
      {id:"h55",nombre:"Menta",gl:"0.4",rol:"body",notas:"Frescura herbal"},
    ],
    cata:{},
  },
  {
    id:"hist_r12", nombre:"Arrayán julio 2021", fecha:"4 jul 2021",
    estilo:"vermouth_rosado", base:"Por definir",
    perfil:"Frutal silvestre con arrayán como protagonista. Anisado y especiado.",
    procesoNotas:"Sin gramajes. Época más especiada. Estimados desde patrón 2021.",
    esHistorica:true,
    botanicos:[
      {id:"h61",nombre:"Ajenjo",gl:"1.5",rol:"backbone",notas:"Backbone — dosis 2021"},
      {id:"h62",nombre:"Arrayán (bayas)",gl:"1.5",rol:"body",notas:"Protagonista frutal"},
      {id:"h63",nombre:"Pomelo (cáscara)",gl:"1.0",rol:"body",notas:"Cítrico amargo"},
      {id:"h64",nombre:"Anís (semilla)",gl:"0.6",rol:"body",notas:"Anisado dulce"},
      {id:"h65",nombre:"Canela cassia",gl:"0.5",rol:"finish",notas:"Especiado cálido"},
      {id:"h66",nombre:"Pimienta negra",gl:"0.4",rol:"finish",notas:"Picante seco"},
      {id:"h67",nombre:"Nuez moscada",gl:"0.1",rol:"finish",notas:"Cálido de fondo"},
    ],
    cata:{},
  },
];

// ── Helpers ──────────────────────────────────────────────────────
const ROLES = ["backbone","body","finish"];
const ROLE_LABELS = {backbone:"Principal",body:"Cuerpo",finish:"Acabado"};
const MERMA = {gin_destilado:0.12,gin_macerado:0.06,vermouth_dry:0.05,vermouth_bianco:0.05,vermouth_rosso:0.05,vermouth_rosado:0.05};
const SCORE_ATTRS = [
  {key:"visual",label:"Visual"},
  {key:"nariz_apertura",label:"Nariz — apertura"},
  {key:"nariz_fondo",label:"Nariz — fondo"},
  {key:"paladar_ataque",label:"Paladar — ataque"},
  {key:"paladar_cuerpo",label:"Paladar — cuerpo"},
  {key:"balance_dulzor",label:"Dulzor / amargor"},
  {key:"retrogusto",label:"Retrogusto"},
  {key:"equilibrio",label:"Equilibrio general"},
];
const fmt=(n,dec=0)=>n==null||isNaN(n)?"—":n.toLocaleString("es-CL",{minimumFractionDigits:dec,maximumFractionDigits:dec});
const uid=()=>Math.random().toString(36).slice(2,9);
const STORAGE_KEY="maestrobot_recipes_v3";
const loadRecipes=()=>{
  try{
    const stored=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(stored&&stored.length>0) return stored;
    return RECETAS_HISTORICAS.map(r=>({...r,botanicos:r.botanicos.map(b=>({...b}))}));
  }catch{
    return RECETAS_HISTORICAS.map(r=>({...r,botanicos:r.botanicos.map(b=>({...b}))}));
  }
};
const saveRecipes=r=>localStorage.setItem(STORAGE_KEY,JSON.stringify(r));

// ── Radar ────────────────────────────────────────────────────────
function Radar({scores}){
  const n=SCORE_ATTRS.length,cx=120,cy=120,r=90;
  const angle=i=>Math.PI*2*i/n-Math.PI/2;
  const pt=(i,val)=>{const a=angle(i),rr=(val/10)*r;return[cx+rr*Math.cos(a),cy+rr*Math.sin(a)];};
  const labelPt=i=>{const a=angle(i);return[cx+(r+20)*Math.cos(a),cy+(r+20)*Math.sin(a)];};
  return(
    <svg width={240} height={240} viewBox="0 0 240 240">
      {[2,4,6,8,10].map(lv=><polygon key={lv} points={SCORE_ATTRS.map((_,i)=>pt(i,lv).join(",")).join(" ")} fill="none" stroke={T.border} strokeWidth={1}/>)}
      {SCORE_ATTRS.map((_,i)=><line key={i} x1={cx} y1={cy} x2={pt(i,10)[0]} y2={pt(i,10)[1]} stroke={T.border} strokeWidth={1}/>)}
      <polygon points={SCORE_ATTRS.map((a,i)=>pt(i,scores[a.key]||0).join(",")).join(" ")} fill={T.copper+"44"} stroke={T.copper} strokeWidth={2}/>
      {SCORE_ATTRS.map((a,i)=>{const[lx,ly]=labelPt(i);return<text key={a.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={8.5} fill={T.creamMuted}>{a.label.split("—")[0].trim()}</text>;})}
    </svg>
  );
}


// ── Tab Proponer (sin IA) ───────────────────────────────────────
function TabProponer(){
  const [seleccionados,setSeleccionados]=useState([]);
  const [extras,setExtras]=useState("");
  const extrasArr=extras.split(",").map(s=>s.trim()).filter(Boolean);
  const todosDisp=[...seleccionados,...extrasArr];

  const toggle=bot=>setSeleccionados(s=>s.includes(bot)?s.filter(b=>b!==bot):[...s,bot]);

  const copiarLista=()=>{
    const texto="Botánicos disponibles:\n"+todosDisp.map((b,i)=>`${i+1}. ${b}`).join("\n");
    navigator.clipboard.writeText(texto).catch(()=>{});
  };

  return(
    <>
      <div className="card">
        <div className="card-title">Tu stock disponible</div>
        <p style={{fontSize:13,color:T.textMuted,marginBottom:16}}>
          Marca los botánicos que tienes hoy. Copia la lista y pégala en MaestroBot para que te proponga una formulación.
        </p>
        <div className="section-label" style={{marginTop:0}}>Desde tu huerta</div>
        <div className="botanicos-grid">
          {STOCK_HUERTA.map(bot=>(
            <div key={bot} className={`bot-check${seleccionados.includes(bot)?" checked":""}`} onClick={()=>toggle(bot)}>
              <input type="checkbox" readOnly checked={seleccionados.includes(bot)}/>
              <span>🌿 {bot}</span>
            </div>
          ))}
        </div>
        <div className="section-label">De fuera</div>
        <div className="botanicos-grid">
          {STOCK_COMPRADO.map(bot=>(
            <div key={bot} className={`bot-check${seleccionados.includes(bot)?" checked":""}`} onClick={()=>toggle(bot)}>
              <input type="checkbox" readOnly checked={seleccionados.includes(bot)}/>
              <span>🛒 {bot}</span>
            </div>
          ))}
        </div>
        <div className="actions" style={{marginTop:8,marginBottom:12}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>setSeleccionados(STOCK_TODO.slice())}>Seleccionar todo</button>
          <button className="btn btn-ghost btn-sm" onClick={()=>setSeleccionados([])}>Limpiar</button>
        </div>
        <div className="field">
          <label>Otros botánicos (separados por coma)</label>
          <input value={extras} onChange={e=>setExtras(e.target.value)} placeholder="Ej: Maqui, tilo, laurel..."/>
        </div>
      </div>

      {todosDisp.length>0&&(
        <div className="card">
          <div className="card-title">Lista para MaestroBot</div>
          <div className="alert" style={{fontFamily:"monospace",fontSize:12,lineHeight:1.7}}>
            {todosDisp.map((b,i)=><div key={i}>{i+1}. {b}</div>)}
          </div>
          <p style={{fontSize:12,color:T.textMuted,marginBottom:12}}>
            Copia esta lista y pégala en MaestroBot en Claude con el estilo y perfil que buscas. MaestroBot te propondrá la formulación. Luego cárgala en la pestaña <strong style={{color:T.cream}}>Formulación</strong>.
          </p>
          <button className="btn btn-primary" onClick={copiarLista} style={{width:"100%",justifyContent:"center"}}>
            📋 Copiar lista
          </button>
        </div>
      )}
    </>
  );
}

// ── Tab Formulación ──────────────────────────────────────────────
function TabFormulacion({recipe,setRecipe}){
  const addBotanico=()=>setRecipe(r=>({...r,botanicos:[...r.botanicos,{id:uid(),nombre:"",gl:"",rol:"backbone",notas:""}]}));
  const updateBot=(id,field,val)=>setRecipe(r=>({...r,botanicos:r.botanicos.map(b=>b.id===id?{...b,[field]:val}:b)}));
  const removeBot=id=>setRecipe(r=>({...r,botanicos:r.botanicos.filter(b=>b.id!==id)}));
  const totalGL=recipe.botanicos.reduce((s,b)=>s+(parseFloat(b.gl)||0),0);
  return(
    <>
      {recipe.esHistorica&&(
        <div className="alert-purple">
          <span className="badge-hist">Receta histórica</span> Gramajes marcados con * son estimaciones basadas en tu receta de mayo 2023 (R7). Ajústalos según tu memoria de cada batch.
        </div>
      )}
      <div className="card">
        <div className="card-title">Datos generales</div>
        <div className="row">
          <div className="field"><label>Nombre</label>
            <input value={recipe.nombre} onChange={e=>setRecipe(r=>({...r,nombre:e.target.value}))} placeholder="Nombre de la formulación"/>
          </div>
          <div className="field"><label>Estilo</label>
            <select value={recipe.estilo} onChange={e=>setRecipe(r=>({...r,estilo:e.target.value}))}>
              <option value="vermouth_bianco">Vermouth bianco</option>
              <option value="vermouth_dry">Vermouth seco</option>
              <option value="vermouth_rosso">Vermouth rosso</option>
              <option value="vermouth_rosado">Vermouth rosado</option>
              <option value="gin_destilado">Gin destilado</option>
              <option value="gin_macerado">Gin macerado</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="field"><label>Base / vino</label>
            <input value={recipe.base} onChange={e=>setRecipe(r=>({...r,base:e.target.value}))} placeholder="Ej: Viognier-Roussanne 2020, Teillery orgánico..."/>
          </div>
          <div className="field"><label>Perfil aromático</label>
            <input value={recipe.perfil} onChange={e=>setRecipe(r=>({...r,perfil:e.target.value}))} placeholder="Ej: Cítrico-herbáceo con fondo frutal"/>
          </div>
        </div>
        <div className="field"><label>Notas de proceso / fecha</label>
          <textarea rows={2} value={recipe.procesoNotas} onChange={e=>setRecipe(r=>({...r,procesoNotas:e.target.value}))} placeholder="Temperatura de maceración, tiempo, encabezado (azúcar/alcohol)..."/>
        </div>
      </div>
      <div className="card">
        <div className="flex-between">
          <div className="card-title">Botánicos</div>
          <button className="btn btn-primary btn-sm" onClick={addBotanico}>+ Agregar</button>
        </div>
        {recipe.botanicos.length===0&&<div className="empty">Sin botánicos. Usa la pestaña ✦ Proponer o agrega manualmente.</div>}
        {recipe.botanicos.length>0&&(
          <table className="tbl">
            <thead><tr><th>Botánico</th><th>g/L</th><th>Rol</th><th>Notas aromáticas</th><th></th></tr></thead>
            <tbody>
              {recipe.botanicos.map(b=>(
                <tr key={b.id}>
                  <td>
                    <input list="stock-list" value={b.nombre} onChange={e=>updateBot(b.id,"nombre",e.target.value)} placeholder="Nombre" style={{minWidth:160}}/>
                    <datalist id="stock-list">{STOCK_TODO.map(s=><option key={s} value={s}/>)}</datalist>
                  </td>
                  <td><input type="number" value={b.gl} onChange={e=>updateBot(b.id,"gl",e.target.value)} style={{width:70}} min={0} step={0.05}/></td>
                  <td>
                    <select value={b.rol} onChange={e=>updateBot(b.id,"rol",e.target.value)} style={{width:110}}>
                      {ROLES.map(ro=><option key={ro} value={ro}>{ROLE_LABELS[ro]}</option>)}
                    </select>
                  </td>
                  <td><input value={b.notas} onChange={e=>updateBot(b.id,"notas",e.target.value)} placeholder="Función aromática" style={{minWidth:120}}/></td>
                  <td><button className="btn btn-danger" onClick={()=>removeBot(b.id)}>×</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr><td colSpan={5}><div style={{padding:"8px 10px",fontSize:12,color:T.textMuted}}>Total botánicos: <strong style={{color:T.amber}}>{fmt(totalGL,2)} g/L</strong> · Encabezado Pantxo: 37.5 g azúcar/L + 30 ml alcohol/L</div></td></tr></tfoot>
          </table>
        )}
      </div>
    </>
  );
}

// ── Tab Batch ────────────────────────────────────────────────────
function TabBatch({recipe}){
  const [litros,setLitros]=useState(1.5);
  const [formato,setFormato]=useState(750);
  const pct=MERMA[recipe.estilo]??0.05;
  const litrosTrabajo=litros/(1-pct);
  const bots=recipe.botanicos.filter(b=>b.nombre&&parseFloat(b.gl)>0);
  return(
    <>
      <div className="card">
        <div className="card-title">Parámetros del batch</div>
        <div className="row">
          <div className="field"><label>Litros de salida</label>
            <input type="number" value={litros} min={0.5} step={0.5} onChange={e=>setLitros(parseFloat(e.target.value)||0)}/>
            <p className="hint">Tus batches típicos son 1.5 L (2 botellas de vino)</p>
          </div>
          <div className="field"><label>Formato de botella (ml)</label>
            <select value={formato} onChange={e=>setFormato(parseInt(e.target.value))}>
              <option value={500}>500 ml</option><option value={700}>700 ml</option>
              <option value={750}>750 ml</option><option value={1000}>1.000 ml</option>
            </select>
          </div>
        </div>
        <div className="alert">
          Merma estimada: <strong style={{color:T.amber}}>{(pct*100).toFixed(0)}%</strong> —
          Volumen de trabajo: <strong style={{color:T.amber}}>{fmt(litrosTrabajo,2)} L</strong>
        </div>
        <div className="alert" style={{marginBottom:0}}>
          Encabezado Pantxo: <strong style={{color:T.amber}}>{fmt(37.5*litros,1)} g</strong> azúcar +{" "}
          <strong style={{color:T.amber}}>{fmt(30*litros,0)} ml</strong> alcohol (para {fmt(litros,1)} L)
        </div>
      </div>
      {bots.length===0?<div className="card"><div className="empty">Agrega botánicos en Formulación o usa ✦ Proponer.</div></div>:(
        <div className="card">
          <div className="card-title">Tabla de ingredientes — {fmt(litros,1)} L de salida</div>
          <table className="tbl">
            <thead><tr><th>Botánico</th><th>Rol</th><th className="num">g/L</th><th className="num">Batch (g)</th></tr></thead>
            <tbody>
              {ROLES.map(rol=>bots.filter(b=>b.rol===rol).map(b=>{
                const cant=parseFloat(b.gl)*litrosTrabajo;
                return(<tr key={b.id}><td>{b.nombre}</td><td><span className={`tag tag-${rol}`}>{ROLE_LABELS[rol]}</span></td><td className="num">{fmt(parseFloat(b.gl),2)}</td><td className="num highlight">{fmt(cant,2)} g</td></tr>);
              }))}
            </tbody>
          </table>
          <hr className="divider"/>
          <div className="section-label">Botellas estimadas</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[500,700,750,1000].map(f=>(
              <div key={f} className="cost-kpi" style={{minWidth:90,opacity:f===formato?1:0.5}}>
                <span className="cost-kpi-val">{Math.floor((litros*1000)/f)}</span>
                <div className="cost-kpi-label">{f} ml</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ── Tab Costos ───────────────────────────────────────────────────
function TabCostos({recipe}){
  const [litros,setLitros]=useState(1.5);
  const [formato,setFormato]=useState(750);
  const [precios,setPrecios]=useState({});
  const [extras,setExtras]=useState({base_vino:"",envases:"",etiquetas:"",otros:""});
  const pct=MERMA[recipe.estilo]??0.05;
  const litrosTrabajo=litros/(1-pct);
  const botellas=Math.floor((litros*1000)/formato);
  const costoBots=recipe.botanicos.filter(b=>b.nombre&&parseFloat(b.gl)>0).reduce((sum,b)=>{
    const cantG=parseFloat(b.gl)*litrosTrabajo;
    const precioKg=parseFloat(precios[b.id])||0;
    return sum+(cantG/1000)*precioKg;
  },0);
  const costoBase=parseFloat(extras.base_vino)||0;
  const costoEnvases=(parseFloat(extras.envases)||0)*botellas;
  const costoEtiquetas=(parseFloat(extras.etiquetas)||0)*botellas;
  const costoOtros=parseFloat(extras.otros)||0;
  const costoTotal=costoBots+costoBase+costoEnvases+costoEtiquetas+costoOtros;
  const costoPorBotella=botellas>0?costoTotal/botellas:0;
  const rows=[{label:"Vino base",val:costoBase},{label:"Botánicos",val:costoBots},{label:"Envases",val:costoEnvases},{label:"Etiquetas",val:costoEtiquetas},{label:"Otros",val:costoOtros}];
  return(
    <>
      <div className="card">
        <div className="card-title">Parámetros</div>
        <div className="row">
          <div className="field"><label>Litros de salida</label>
            <input type="number" value={litros} min={0.5} step={0.5} onChange={e=>setLitros(parseFloat(e.target.value)||0)}/>
          </div>
          <div className="field"><label>Formato (ml)</label>
            <select value={formato} onChange={e=>setFormato(parseInt(e.target.value))}>
              <option value={500}>500</option><option value={700}>700</option>
              <option value={750}>750</option><option value={1000}>1000</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Costos</div>
        <div className="row">
          <div className="field"><label>Vino base — total batch (CLP)</label>
            <input type="number" value={extras.base_vino} placeholder="0" onChange={e=>setExtras(x=>({...x,base_vino:e.target.value}))}/>
          </div>
          <div className="field"><label>Envase + tapa — por unidad (CLP)</label>
            <input type="number" value={extras.envases} placeholder="0" onChange={e=>setExtras(x=>({...x,envases:e.target.value}))}/>
          </div>
        </div>
        <div className="row">
          <div className="field"><label>Etiqueta — por unidad (CLP)</label>
            <input type="number" value={extras.etiquetas} placeholder="0" onChange={e=>setExtras(x=>({...x,etiquetas:e.target.value}))}/>
          </div>
          <div className="field"><label>Otros — total batch (CLP)</label>
            <input type="number" value={extras.otros} placeholder="0" onChange={e=>setExtras(x=>({...x,otros:e.target.value}))}/>
          </div>
        </div>
        {recipe.botanicos.filter(b=>b.nombre&&parseFloat(b.gl)>0).length>0&&(
          <>
            <div className="section-label">Precio botánicos (CLP/kg)</div>
            {recipe.botanicos.filter(b=>b.nombre&&parseFloat(b.gl)>0).map(b=>(
              <div key={b.id} className="field">
                <label>{b.nombre} ({fmt(parseFloat(b.gl),2)} g/L)</label>
                <input type="number" value={precios[b.id]||""} placeholder="0" onChange={e=>setPrecios(p=>({...p,[b.id]:e.target.value}))}/>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="card">
        <div className="card-title">Resumen — {fmt(litros,1)} L / {botellas} botellas</div>
        <div className="cost-summary">
          <div className="cost-kpi"><span className="cost-kpi-val">${fmt(costoTotal)}</span><div className="cost-kpi-label">Total batch</div></div>
          <div className="cost-kpi"><span className="cost-kpi-val">${fmt(costoPorBotella)}</span><div className="cost-kpi-label">Por botella</div></div>
          <div className="cost-kpi"><span className="cost-kpi-val">{botellas}</span><div className="cost-kpi-label">Botellas {formato}ml</div></div>
        </div>
        <table className="tbl">
          <thead><tr><th>Categoría</th><th className="num">Total</th><th className="num">Por botella</th><th className="num">%</th></tr></thead>
          <tbody>{rows.map(row=>(<tr key={row.label}><td>{row.label}</td><td className="num">${fmt(row.val)}</td><td className="num">${fmt(botellas>0?row.val/botellas:0)}</td><td className="num">{costoTotal>0?fmt((row.val/costoTotal)*100,1):0}%</td></tr>))}</tbody>
        </table>
        <hr className="divider"/>
        <div className="section-label">Precio de venta sugerido</div>
        <table className="tbl">
          <thead><tr><th>Canal</th><th className="num">Margen</th><th className="num">Precio</th></tr></thead>
          <tbody>
            {[{label:"Amigos / gifting",pct:0.3},{label:"Minorista",pct:0.6},{label:"Hostelería",pct:1.2}].map(m=>(
              <tr key={m.label}><td>{m.label}</td><td className="num">{(m.pct*100).toFixed(0)}%</td><td className="num highlight">${fmt(costoPorBotella*(1+m.pct))}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Tab Cata ─────────────────────────────────────────────────────
function TabCata({recipe,setRecipe}){
  const cata=recipe.cata||{};
  const setScore=(key,val)=>setRecipe(r=>({...r,cata:{...(r.cata||{}),[key]:val}}));
  const scores=SCORE_ATTRS.map(a=>parseFloat(cata[a.key])||0);
  const avg=scores.reduce((s,v)=>s+v,0)/scores.length;
  return(
    <>
      <div className="card">
        <div className="card-title">Ficha de cata — {recipe.nombre||"Sin nombre"}</div>
        {SCORE_ATTRS.map(a=>{
          const val=parseFloat(cata[a.key])||0;
          return(<div key={a.key} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <label style={{marginBottom:0}}>{a.label}</label>
              <span style={{fontSize:12,color:T.amber,fontWeight:600}}>{val}/10</span>
            </div>
            <input type="range" min={0} max={10} step={0.5} value={val} onChange={e=>setScore(a.key,parseFloat(e.target.value))} style={{width:"100%",accentColor:T.copper}}/>
          </div>);
        })}
        <div className="field" style={{marginTop:8}}><label>Diagnóstico y ajustes para el próximo batch</label>
          <textarea rows={3} value={cata.diagnostico||""} onChange={e=>setRecipe(r=>({...r,cata:{...(r.cata||{}),diagnostico:e.target.value}}))} placeholder="¿Qué cambiarías? ¿Qué funcionó? ¿Más o menos de algún botánico?"/>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Puntuación global</div>
        <div className="total-score">{avg.toFixed(1)}</div>
        <div className="total-label">sobre 10</div>
        <div className="radar-wrap"><Radar scores={cata}/></div>
        <div className="section-label">Por atributo</div>
        {SCORE_ATTRS.map(a=>{
          const val=parseFloat(cata[a.key])||0;
          return(<div key={a.key} className="score-row"><div className="score-label">{a.label}</div><div className="score-bar-bg"><div className="score-bar-fill" style={{width:`${val*10}%`}}/></div><div className="score-val">{val}</div></div>);
        })}
      </div>
    </>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────
function Sidebar({recipes,activeId,onSelect,onNew,onDelete}){
  const historicas=recipes.filter(r=>r.esHistorica);
  const propias=recipes.filter(r=>!r.esHistorica);
  return(
    <div>
      <div className="flex-between sidebar-section-label" style={{marginBottom:12}}>
        <span style={{fontSize:12,color:T.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Recetario</span>
      </div>
      <div className="sidebar-inner">
        <button className="btn btn-ghost btn-sm sidebar-new-btn" onClick={onNew} style={{flexShrink:0}}>+ Nueva</button>
        {propias.map(r=>(
          <div key={r.id} className={`recipe-item${r.id===activeId?" selected":""}`} onClick={()=>onSelect(r.id)}>
            <div><div className="recipe-name">{r.nombre||"Sin nombre"}</div><div className="recipe-meta">{r.estilo?.replace(/_/g," ")||"—"}</div></div>
            <button className="btn btn-danger" style={{flexShrink:0}} onClick={e=>{e.stopPropagation();onDelete(r.id);}}>×</button>
          </div>
        ))}
        <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#a06ac4",alignSelf:"center",whiteSpace:"nowrap",padding:"0 4px"}}>── hist ──</div>
        {historicas.map(r=>(
          <div key={r.id} className={`recipe-item historic${r.id===activeId?" selected":""}`} onClick={()=>onSelect(r.id)}>
            <div>
              <div className="recipe-name" style={{fontSize:13}}>{r.nombre}</div>
              <div className="recipe-meta">{r.fecha}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────
const emptyRecipe=()=>({id:uid(),nombre:"",estilo:"vermouth_bianco",base:"",perfil:"",procesoNotas:"",botanicos:[],cata:{},esHistorica:false});
const TABS=[
  {key:"proponer",label:"✦ Proponer"},
  {key:"formulacion",label:"Formulación"},
  {key:"batch",label:"Batch"},
  {key:"costos",label:"Costos"},
  {key:"cata",label:"Cata"},
];

export default function App(){
  const [recipes,setRecipes]=useState(loadRecipes);
  const [activeId,setActiveId]=useState(null);
  const [tab,setTab]=useState("proponer");
  const recipe=recipes.find(r=>r.id===activeId)||null;
  useEffect(()=>{saveRecipes(recipes);},[recipes]);
  const newRecipe=()=>{const r=emptyRecipe();setRecipes(rs=>[...rs,r]);setActiveId(r.id);setTab("proponer");};
  const setRecipe=updater=>setRecipes(rs=>rs.map(r=>r.id===activeId?(typeof updater==="function"?updater(r):updater):r));
  const deleteRecipe=id=>{setRecipes(rs=>rs.filter(r=>r.id!==id&&r.esHistorica!==true||r.id!==id));if(activeId===id)setActiveId(null);};

  return(
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-eyebrow">Destilería artesanal · Pelvín, sur de Chile</div>
          <div className="header-title">Vermu<span>tier</span></div>
          <div className="header-sub">Proponer · Formular · Escalar · Costear · Catar</div>
        </div>
        <div className="layout" style={{display:"flex",gap:24,alignItems:"flex-start"}}>
          <div className="sidebar" style={{minWidth:210,maxWidth:220}}>
            <Sidebar recipes={recipes} activeId={activeId} onSelect={setActiveId} onNew={newRecipe} onDelete={deleteRecipe}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            {!recipe?(
              <div className="card" style={{textAlign:"center",padding:48}}>
                <div style={{fontSize:36,marginBottom:12}}>🌿</div>
                <div style={{color:T.cream,fontSize:16,marginBottom:8}}>Tu recetario te espera</div>
                <div style={{color:T.textMuted,fontSize:13,marginBottom:20}}>
                  Selecciona una receta histórica del sidebar o crea una nueva propuesta con tus botánicos de temporada
                </div>
                <button className="btn btn-primary" onClick={newRecipe}>+ Nueva formulación</button>
              </div>
            ):(
              <>
                <div className="tabs">
                  {TABS.map(t=>(
                    <button key={t.key} className={`tab${tab===t.key?" active":""}`} onClick={()=>setTab(t.key)}>{t.label}</button>
                  ))}
                </div>
                {tab==="proponer"&&<TabProponer/>}
                {tab==="formulacion"&&<TabFormulacion recipe={recipe} setRecipe={setRecipe}/>}
                {tab==="batch"&&<TabBatch recipe={recipe}/>}
                {tab==="costos"&&<TabCostos recipe={recipe}/>}
                {tab==="cata"&&<TabCata recipe={recipe} setRecipe={setRecipe}/>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
