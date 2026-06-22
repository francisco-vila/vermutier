import { useState, useEffect } from "react";

const T = {
  bg:"#1a1610",surface:"#231f18",card:"#2c2720",border:"#3d3628",
  copper:"#b5651d",copperLight:"#d4854a",amber:"#c9922a",
  cream:"#e8dfc8",creamMuted:"#a89880",green:"#3a5c3a",
  greenLight:"#4e7a4e",red:"#8b2c2c",text:"#e8dfc8",textMuted:"#9a8c78",
};

// ── Avatar (base64 placeholder — reemplazar con la imagen real) ──
const AVATAR = "data:image/jpeg;base64,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";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:${T.bg};color:${T.text};font-family:'Inter',sans-serif;min-height:100vh;}
  .app{max-width:1000px;margin:0 auto;padding:20px 14px 80px;}
  .header{text-align:center;padding:18px 0 16px;border-bottom:1px solid ${T.border};margin-bottom:20px;}
  .header-eyebrow{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:${T.copper};margin-bottom:8px;}
  .header-title{font-family:'Playfair Display',serif;font-size:clamp(24px,5vw,40px);font-weight:700;color:${T.cream};line-height:1.1;}
  .header-title span{color:${T.amber};}
  .header-sub{font-size:12px;color:${T.textMuted};margin-top:6px;}
  .tabs{display:flex;gap:3px;background:${T.surface};border:1px solid ${T.border};border-radius:10px;padding:3px;margin-bottom:18px;overflow-x:auto;}
  .tab{flex:1;padding:8px 4px;border:none;border-radius:7px;background:transparent;color:${T.textMuted};font-family:'Inter',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .18s;white-space:nowrap;min-width:55px;}
  .tab:hover{color:${T.cream};}
  .tab.active{background:${T.card};color:${T.amber};border:1px solid ${T.border};}
  .card{background:${T.card};border:1px solid ${T.border};border-radius:12px;padding:16px;margin-bottom:14px;}
  .card-title{font-family:'Playfair Display',serif;font-size:15px;color:${T.cream};margin-bottom:12px;display:flex;align-items:center;gap:8px;}
  .card-title::before{content:'';display:inline-block;width:3px;height:15px;background:${T.copper};border-radius:2px;}
  label{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:${T.textMuted};margin-bottom:4px;}
  input,select,textarea{width:100%;background:${T.surface};border:1px solid ${T.border};border-radius:7px;color:${T.cream};font-family:'Inter',sans-serif;font-size:15px;padding:8px 11px;outline:none;transition:border-color .15s;}
  input:focus,select:focus,textarea:focus{border-color:${T.copper};}
  select option{background:${T.surface};}
  .field{margin-bottom:11px;}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
  .row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:none;border-radius:7px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;}
  .btn-primary{background:${T.copper};color:#fff;}
  .btn-primary:hover{background:${T.copperLight};}
  .btn-ghost{background:transparent;border:1px solid ${T.border};color:${T.textMuted};}
  .btn-ghost:hover{border-color:${T.copper};color:${T.cream};}
  .btn-danger{background:transparent;border:1px solid ${T.red};color:#c46060;padding:4px 9px;font-size:12px;}
  .btn-danger:hover{background:${T.red};color:#fff;}
  .btn-sm{padding:5px 11px;font-size:12px;}
  .tbl{width:100%;border-collapse:collapse;font-size:12px;}
  .tbl th{text-align:left;padding:6px 8px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:${T.textMuted};border-bottom:1px solid ${T.border};}
  .tbl td{padding:7px 8px;border-bottom:1px solid ${T.border}22;vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .num{text-align:right;font-variant-numeric:tabular-nums;}
  .highlight{color:${T.amber};font-weight:600;}
  .tag{display:inline-block;padding:2px 7px;border-radius:20px;font-size:9px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;}
  .tag-backbone{background:#3d2a10;color:${T.amber};}
  .tag-body{background:#1e3020;color:#6daa6d;}
  .tag-finish{background:#1a2535;color:#6a9ac4;}
  .section-label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${T.copper};margin-bottom:8px;margin-top:14px;}
  .divider{border:none;border-top:1px solid ${T.border};margin:12px 0;}
  .hint{font-size:11px;color:${T.textMuted};margin-top:3px;}
  .alert{background:#2a1f0a;border:1px solid ${T.amber}44;border-radius:8px;padding:10px 13px;font-size:12px;color:${T.cream};margin-bottom:12px;line-height:1.6;}
  .alert-red{background:#2a1010;border:1px solid ${T.red}44;border-radius:8px;padding:10px 13px;font-size:12px;color:#e8c8c8;margin-bottom:12px;}
  .alert-green{background:#0a2a15;border:1px solid ${T.green}88;border-radius:8px;padding:10px 13px;font-size:12px;color:#c8e8d0;margin-bottom:12px;}
  .kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin-bottom:14px;}
  .kpi{background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:11px;text-align:center;}
  .kpi-val{font-family:'Playfair Display',serif;font-size:20px;color:${T.amber};display:block;}
  .kpi-label{font-size:10px;color:${T.textMuted};margin-top:2px;}
  .total-score{text-align:center;font-family:'Playfair Display',serif;font-size:42px;color:${T.amber};line-height:1;margin:12px 0 4px;}
  .total-label{text-align:center;font-size:11px;color:${T.textMuted};}
  .score-row{display:flex;align-items:center;gap:10px;margin-bottom:9px;}
  .score-label{width:120px;font-size:12px;color:${T.creamMuted};flex-shrink:0;}
  .score-bar-bg{flex:1;height:5px;background:${T.surface};border-radius:3px;overflow:hidden;}
  .score-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,${T.copper},${T.amber});transition:width .3s;}
  .score-val{width:26px;text-align:right;font-size:12px;color:${T.amber};font-weight:600;}
  .radar-wrap{display:flex;justify-content:center;padding:6px 0;}
  .stock-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:4px;margin-bottom:10px;}
  .stock-item{display:flex;align-items:center;gap:7px;padding:6px 9px;background:${T.surface};border:1px solid ${T.border};border-radius:6px;cursor:pointer;font-size:12px;color:${T.creamMuted};transition:all .15s;}
  .stock-item:hover{border-color:${T.copper}44;}
  .stock-item.checked{border-color:${T.copper};color:${T.cream};background:#2a1f0a;}
  .stock-item input[type=checkbox]{accent-color:${T.copper};width:13px;height:13px;flex-shrink:0;}
  .sidebar-inner{display:flex;flex-direction:column;gap:5px;}
  .recipe-item{background:${T.surface};border:1px solid ${T.border};border-radius:7px;padding:8px 11px;cursor:pointer;transition:border-color .15s;display:flex;justify-content:space-between;align-items:center;}
  .recipe-item:hover{border-color:${T.copper};}
  .recipe-item.selected{border-color:${T.copper};background:${T.card};}
  .recipe-item.historic{border-left:3px solid #a06ac4;}
  .recipe-name{font-size:12px;color:${T.cream};}
  .recipe-meta{font-size:10px;color:${T.textMuted};margin-top:1px;}
  .lib-item{background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:10px 12px;margin-bottom:6px;}
  .lib-item-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
  .lib-item-nombre{font-size:13px;color:${T.cream};font-weight:500;}
  .lib-item-grupo{font-size:10px;color:${T.copper};text-transform:uppercase;letter-spacing:.06em;}

  @media(max-width:640px){
    .app{padding:10px 10px 80px;}
    .layout{flex-direction:column!important;gap:0!important;}
    .sidebar-wrap{width:100%!important;max-width:100%!important;min-width:0!important;margin-bottom:14px;}
    .sidebar-inner{flex-direction:row;overflow-x:auto;padding-bottom:4px;gap:5px;}
    .recipe-item{min-width:120px;flex-direction:column;align-items:flex-start;}
    .row{grid-template-columns:1fr!important;}
    .row-3{grid-template-columns:1fr 1fr!important;}
    .stock-grid{grid-template-columns:1fr 1fr!important;}
    .kpi-grid{grid-template-columns:1fr 1fr!important;}
    .tbl th,.tbl td{padding:5px 5px;}
    .card{padding:12px 10px;}
    .tabs{gap:2px;}
  }
`;

// ── Biblioteca de extractos estándar ─────────────────────────────
// gL: gramos de botánico por litro de alcohol 50%
// dias: días de maceración recomendados
// dosis: ml de extracto por litro de vermut final (punto de partida)
// rol: backbone | body | finish
const BIBLIOTECA_STD = [
  // Raíces
  {nombre:"Ajenjo",grupo:"Hierbas",gL:40,dias:6,dosis:4,rol:"backbone"},
  {nombre:"Raíz de angélica",grupo:"Raíces",gL:100,dias:12,dosis:6,rol:"backbone"},
  {nombre:"Regaliz (raíz)",grupo:"Raíces",gL:90,dias:12,dosis:5,rol:"backbone"},
  {nombre:"Ruibarbo",grupo:"Raíces",gL:80,dias:10,dosis:5,rol:"backbone"},
  // Hierbas y hojas
  {nombre:"Peumo (hojas)",grupo:"Hierbas",gL:40,dias:7,dosis:4,rol:"body"},
  {nombre:"Cedrón",grupo:"Hierbas",gL:35,dias:5,dosis:6,rol:"body"},
  {nombre:"Menta",grupo:"Hierbas",gL:30,dias:4,dosis:4,rol:"body"},
  {nombre:"Romero",grupo:"Hierbas",gL:40,dias:6,dosis:3,rol:"body"},
  {nombre:"Hinojo",grupo:"Hierbas",gL:40,dias:5,dosis:5,rol:"body"},
  {nombre:"Apio",grupo:"Hierbas",gL:30,dias:5,dosis:3,rol:"body"},
  {nombre:"Olivo (hojas)",grupo:"Hierbas",gL:35,dias:6,dosis:3,rol:"body"},
  {nombre:"Arrayán (hoja)",grupo:"Hierbas",gL:35,dias:6,dosis:5,rol:"body"},
  {nombre:"Tabaco",grupo:"Hierbas",gL:20,dias:3,dosis:1,rol:"finish"},
  // Especias
  {nombre:"Cardamomo",grupo:"Especias",gL:50,dias:6,dosis:5,rol:"body"},
  {nombre:"Canela cassia",grupo:"Especias",gL:50,dias:6,dosis:4,rol:"body"},
  {nombre:"Anís (semilla)",grupo:"Especias",gL:50,dias:6,dosis:5,rol:"body"},
  {nombre:"Coriander (semilla)",grupo:"Especias",gL:45,dias:5,dosis:5,rol:"body"},
  {nombre:"Enebro",grupo:"Especias",gL:50,dias:7,dosis:6,rol:"body"},
  // Cítricos
  {nombre:"Piel de naranja",grupo:"Cítricos",gL:70,dias:4,dosis:8,rol:"finish"},
  {nombre:"Piel de limón",grupo:"Cítricos",gL:70,dias:3,dosis:5,rol:"finish"},
  {nombre:"Piel de pomelo",grupo:"Cítricos",gL:65,dias:4,dosis:5,rol:"finish"},
  // Flores
  {nombre:"Hibisco",grupo:"Flores",gL:25,dias:3,dosis:6,rol:"finish"},
  // Frutas secas
  {nombre:"Arrayán (bayas)",grupo:"Frutas secas",gL:60,dias:8,dosis:8,rol:"body"},
  {nombre:"Murta",grupo:"Frutas secas",gL:60,dias:9,dosis:10,rol:"body"},
];

const GRUPOS = ["Raíces","Hierbas","Especias","Cítricos","Flores","Frutas secas"];
const ROLES = ["backbone","body","finish"];
const ROLE_LABELS = {backbone:"Backbone",body:"Cuerpo",finish:"Acabado"};

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

const fmt=(n,dec=0)=>n==null||isNaN(n)||!isFinite(n)?"—":n.toLocaleString("es-CL",{minimumFractionDigits:dec,maximumFractionDigits:dec});
const uid=()=>Math.random().toString(36).slice(2,9);
const STORAGE_KEY="vermutier_v5";

// ── Recetas históricas ───────────────────────────────────────────
// Las recetas históricas usan modelo antiguo (g/L directo).
// Se muestran como referencia pero no calculan batch con extracto.
const RECETAS_HISTORICAS = [
  {
    id:"bosque_oscuro_1",nombre:"Bosque Oscuro N°1",fecha:"jun 2025",
    estilo:"vermouth_rosso",base:"Carménère o País 13-14°",
    perfil:"Bosque húmedo, fruta negra madura, retrogusto amargo-herbal largo",
    procesoNotas:"Doble maceración. Extracto madre en alcohol 60-65° (8-12 días) para todos menos cítricos e hibisco. Macerado en frío en vino (3-5 días) para cítricos e hibisco. Ensamblar 60-80 ml extracto/L vino. Azúcar 75-90 g/L.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"b1",nombre:"Ajenjo",mlL:"5",rol:"backbone",notas:"Amargo clásico"},
      {id:"b2",nombre:"Raíz de angélica",mlL:"7",rol:"backbone",notas:"Amargo terroso, fijador"},
      {id:"b3",nombre:"Ruibarbo",mlL:"6",rol:"backbone",notas:"Amargo frutal, fruta roja"},
      {id:"b4",nombre:"Regaliz (raíz)",mlL:"5",rol:"backbone",notas:"Dulzor profundo"},
      {id:"b5",nombre:"Peumo (hojas)",mlL:"4",rol:"body",notas:"Resinoso-balsámico, usar con moderación"},
      {id:"b6",nombre:"Murta",mlL:"12",rol:"body",notas:"Fruta roja del bosque"},
      {id:"b7",nombre:"Arrayán (bayas)",mlL:"8",rol:"body",notas:"Balsámico, fruta oscura"},
      {id:"b8",nombre:"Cardamomo",mlL:"5",rol:"body",notas:"Especias dulces"},
      {id:"b9",nombre:"Canela cassia",mlL:"4",rol:"body",notas:"Calidez especiada"},
      {id:"b10",nombre:"Enebro",mlL:"5",rol:"body",notas:"Resina, madera"},
      {id:"b11",nombre:"Coriander (semilla)",mlL:"5",rol:"body",notas:"Cítrico seco, floral"},
      {id:"b12",nombre:"Piel de naranja",mlL:"8",rol:"finish",notas:"Apertura cítrica"},
      {id:"b13",nombre:"Piel de pomelo",mlL:"5",rol:"finish",notas:"Cítrico amargo"},
      {id:"b14",nombre:"Hibisco",mlL:"7",rol:"finish",notas:"Color, acidez frutal"},
      {id:"b15",nombre:"Cedrón",mlL:"5",rol:"finish",notas:"Cítrico floral"},
      {id:"b16",nombre:"Hinojo",mlL:"4",rol:"finish",notas:"Anís suave"},
    ],
  },
  {
    id:"hist_r7",nombre:"Viognier-Roussanne may 2023",fecha:"1 may 2023",
    estilo:"vermouth_bianco",base:"Viognier-Roussanne 2020",
    perfil:"Cítrico-herbáceo con fondo frutal y especiado suave",
    procesoNotas:"Receta de referencia con gramajes reales. Base de calibración histórica.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"h1",nombre:"Ajenjo",mlL:"4",rol:"backbone",notas:"Amargo limpio"},
      {id:"h2",nombre:"Piel de naranja",mlL:"8",rol:"body",notas:"Cítrico dominante"},
      {id:"h3",nombre:"Arrayán (bayas)",mlL:"8",rol:"body",notas:"Frutal silvestre"},
      {id:"h4",nombre:"Piel de pomelo",mlL:"5",rol:"body",notas:"Cítrico amargo seco"},
      {id:"h5",nombre:"Menta",mlL:"4",rol:"body",notas:"Frescura herbal"},
      {id:"h6",nombre:"Cedrón",mlL:"5",rol:"body",notas:"Herbal limón"},
      {id:"h7",nombre:"Cardamomo",mlL:"4",rol:"finish",notas:"Especiado cálido"},
      {id:"h8",nombre:"Pimienta negra",mlL:"3",rol:"finish",notas:"Especiado seco"},
    ],
  },
  {
    id:"hist_r6",nombre:"Viognier-Roussanne jun 2023",fecha:"15 jun 2023",
    estilo:"vermouth_bianco",base:"Viognier-Roussanne 2020",
    perfil:"Cítrico-silvestre con murta y arrayán",
    procesoNotas:"Introduce murta como novedad territorial.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"h41",nombre:"Ajenjo",mlL:"4",rol:"backbone",notas:"Backbone seco"},
      {id:"h42",nombre:"Piel de naranja",mlL:"8",rol:"body",notas:"Cítrico dominante"},
      {id:"h43",nombre:"Arrayán (bayas)",mlL:"8",rol:"body",notas:"Frutal silvestre"},
      {id:"h44",nombre:"Murta",mlL:"10",rol:"body",notas:"Frutal nativa"},
      {id:"h45",nombre:"Piel de pomelo",mlL:"5",rol:"body",notas:"Cítrico amargo"},
      {id:"h46",nombre:"Menta",mlL:"4",rol:"body",notas:"Frescura herbal"},
      {id:"h47",nombre:"Cardamomo",mlL:"4",rol:"finish",notas:"Especiado cálido"},
    ],
  },
  {
    id:"hist_r3",nombre:"Teillery enero 2024",fecha:"27 ene 2024",
    estilo:"vermouth_bianco",base:"Vino orgánico Teillery sin sulfitos",
    perfil:"Herbal-cítrico con anís y especias cálidas",
    procesoNotas:"Estimados desde receta de referencia.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"t1",nombre:"Ajenjo",mlL:"4",rol:"backbone",notas:"Backbone seco"},
      {id:"t2",nombre:"Peumo (hojas)",mlL:"3",rol:"backbone",notas:"Resinoso territorial"},
      {id:"t3",nombre:"Piel de naranja",mlL:"8",rol:"body",notas:"Cítrico principal"},
      {id:"t4",nombre:"Piel de limón",mlL:"5",rol:"body",notas:"Cítrico fresco"},
      {id:"t5",nombre:"Cedrón",mlL:"6",rol:"body",notas:"Herbal limón"},
      {id:"t6",nombre:"Hinojo",mlL:"5",rol:"body",notas:"Anisado vegetal"},
      {id:"t7",nombre:"Anís (semilla)",mlL:"4",rol:"body",notas:"Dulce anisado"},
      {id:"t8",nombre:"Cardamomo",mlL:"4",rol:"finish",notas:"Especiado cálido"},
      {id:"t9",nombre:"Canela cassia",mlL:"3",rol:"finish",notas:"Cálido de fondo"},
    ],
  },
  {
    id:"hist_r10",nombre:"Rosé agosto 2021 — Peumo",fecha:"14 ago 2021",
    estilo:"vermouth_rosado",base:"Rosé Reserva Undurraga 2017",
    perfil:"Especiado con peumo y notas cítricas, más robusto",
    procesoNotas:"Época más especiada. Peumo más prominente.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"p1",nombre:"Ajenjo",mlL:"5",rol:"backbone",notas:"Backbone intenso"},
      {id:"p2",nombre:"Peumo (hojas)",mlL:"4",rol:"backbone",notas:"Resinoso característico"},
      {id:"p3",nombre:"Piel de naranja",mlL:"8",rol:"body",notas:"Cítrico dominante"},
      {id:"p4",nombre:"Piel de pomelo",mlL:"5",rol:"body",notas:"Cítrico amargo"},
      {id:"p5",nombre:"Cedrón",mlL:"6",rol:"body",notas:"Herbal limón"},
      {id:"p6",nombre:"Canela cassia",mlL:"4",rol:"body",notas:"Especiado cálido"},
      {id:"p7",nombre:"Anís (semilla)",mlL:"4",rol:"body",notas:"Anisado suave"},
      {id:"p8",nombre:"Pimienta negra",mlL:"3",rol:"finish",notas:"Picante seco"},
      {id:"p9",nombre:"Nuez moscada",mlL:"2",rol:"finish",notas:"Cálido de fondo"},
    ],
  },
  {
    id:"hist_r12",nombre:"Arrayán julio 2021",fecha:"4 jul 2021",
    estilo:"vermouth_rosado",base:"Por definir",
    perfil:"Frutal silvestre con arrayán como protagonista",
    procesoNotas:"Época más especiada. Primera vez con arrayán como eje.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"a1",nombre:"Ajenjo",mlL:"5",rol:"backbone",notas:"Backbone — dosis 2021"},
      {id:"a2",nombre:"Arrayán (bayas)",mlL:"10",rol:"body",notas:"Protagonista frutal"},
      {id:"a3",nombre:"Piel de pomelo",mlL:"6",rol:"body",notas:"Cítrico amargo"},
      {id:"a4",nombre:"Anís (semilla)",mlL:"5",rol:"body",notas:"Anisado dulce"},
      {id:"a5",nombre:"Canela cassia",mlL:"4",rol:"finish",notas:"Especiado cálido"},
      {id:"a6",nombre:"Pimienta negra",mlL:"3",rol:"finish",notas:"Picante seco"},
    ],
  },
  {
    id:"hist_r1",nombre:"Batch A — junio 2025",fecha:"2 jun 2025",
    estilo:"vermouth_bianco",base:"Por definir",
    perfil:"Floral-herbal sin ajenjo. Experimento con hibisco.",
    procesoNotas:"Sin base documentada. Primera exploración sin ajenjo.",
    esHistorica:true,cata:{},
    extractos:[
      {id:"f1",nombre:"Peumo (hojas)",mlL:"3",rol:"backbone",notas:"Backbone sin ajenjo"},
      {id:"f2",nombre:"Hibisco",mlL:"6",rol:"body",notas:"Floral ácido, color"},
      {id:"f3",nombre:"Hinojo",mlL:"5",rol:"body",notas:"Anisado vegetal"},
      {id:"f4",nombre:"Cedrón",mlL:"6",rol:"body",notas:"Herbal limón"},
      {id:"f5",nombre:"Menta",mlL:"4",rol:"body",notas:"Frescura herbal"},
    ],
  },
];

const loadRecipes=()=>{
  try{
    const s=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(s&&s.length>0)return s;
  }catch{}
  return RECETAS_HISTORICAS.map(r=>({...r,extractos:r.extractos.map(e=>({...e}))}));
};
const saveRecipes=r=>localStorage.setItem(STORAGE_KEY,JSON.stringify(r));
const emptyRecipe=()=>({
  id:uid(),nombre:"",estilo:"vermouth_bianco",base:"",perfil:"",procesoNotas:"",
  extractos:[],cata:{},esHistorica:false,
});

// ── Radar ────────────────────────────────────────────────────────
function Radar({scores}){
  const n=SCORE_ATTRS.length,cx=105,cy=105,r=75;
  const angle=i=>Math.PI*2*i/n-Math.PI/2;
  const pt=(i,val)=>{const a=angle(i),rr=(val/10)*r;return[cx+rr*Math.cos(a),cy+rr*Math.sin(a)];};
  const lp=i=>{const a=angle(i);return[cx+(r+17)*Math.cos(a),cy+(r+17)*Math.sin(a)];};
  return(
    <svg width={210} height={210} viewBox="0 0 210 210">
      {[2,4,6,8,10].map(lv=><polygon key={lv} points={SCORE_ATTRS.map((_,i)=>pt(i,lv).join(",")).join(" ")} fill="none" stroke={T.border} strokeWidth={1}/>)}
      {SCORE_ATTRS.map((_,i)=><line key={i} x1={cx} y1={cy} x2={pt(i,10)[0]} y2={pt(i,10)[1]} stroke={T.border} strokeWidth={1}/>)}
      <polygon points={SCORE_ATTRS.map((a,i)=>pt(i,scores[a.key]||0).join(",")).join(" ")} fill={T.copper+"44"} stroke={T.copper} strokeWidth={2}/>
      {SCORE_ATTRS.map((a,i)=>{const[lx,ly]=lp(i);return<text key={a.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={7.5} fill={T.creamMuted}>{a.label.split("—")[0].trim()}</text>;})}
    </svg>
  );
}

// ── Tab Biblioteca ───────────────────────────────────────────────
// Muestra los extractos estándar como referencia de maceración.
// El elaborador puede consultarla para saber cuánto botánico macerar
// y cuántos días, antes de preparar sus extractos.
function TabBiblioteca(){
  const [filtroGrupo,setFiltroGrupo]=useState("Todos");
  const grupos=["Todos",...GRUPOS];
  const items=filtroGrupo==="Todos"?BIBLIOTECA_STD:BIBLIOTECA_STD.filter(b=>b.grupo===filtroGrupo);
  return(
    <>
      <div className="card">
        <div className="card-title">Biblioteca de extractos</div>
        <p style={{fontSize:12,color:T.textMuted,marginBottom:12,lineHeight:1.6}}>
          Parámetros estándar de maceración para cada botánico en alcohol al 50%.
          La dosis (ml/L) es el punto de partida para la formulación. Ajusta según cata.
        </p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
          {grupos.map(g=>(
            <button key={g} onClick={()=>setFiltroGrupo(g)}
              style={{padding:"4px 10px",borderRadius:20,border:`1px solid ${filtroGrupo===g?T.copper:T.border}`,
                background:filtroGrupo===g?"#2a1f0a":"transparent",
                color:filtroGrupo===g?T.amber:T.textMuted,fontSize:11,cursor:"pointer"}}>
              {g}
            </button>
          ))}
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Botánico</th>
              <th>Grupo</th>
              <th className="num">g/L alcohol</th>
              <th className="num">Días</th>
              <th className="num">Dosis ml/L</th>
              <th>Rol típico</th>
            </tr>
          </thead>
          <tbody>
            {items.map(b=>(
              <tr key={b.nombre}>
                <td style={{color:T.cream}}>{b.nombre}</td>
                <td style={{color:T.textMuted,fontSize:11}}>{b.grupo}</td>
                <td className="num">{b.gL}</td>
                <td className="num">{b.dias}</td>
                <td className="num highlight">{b.dosis}</td>
                <td><span className={`tag tag-${b.rol}`}>{ROLE_LABELS[b.rol]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <div className="card-title">Cómo preparar un extracto</div>
        <div style={{fontSize:12,color:T.creamMuted,lineHeight:1.8}}>
          <p><strong style={{color:T.cream}}>1. Pesar</strong> el botánico seco según g/L de la tabla.</p>
          <p><strong style={{color:T.cream}}>2. Macerar</strong> en alcohol 50% los días indicados, en frasco oscuro hermético a temperatura ambiente (18-22°C). Agitar cada 24 h.</p>
          <p><strong style={{color:T.cream}}>3. Filtrar</strong> con muselina y luego papel de filtro. El líquido resultante es tu extracto.</p>
          <p><strong style={{color:T.cream}}>4. Etiquetar</strong> con nombre, fecha y grado alcohólico (≈50°). Guardar en frasco oscuro.</p>
          <p style={{marginTop:8,color:T.textMuted}}>El extracto es estable por 12+ meses. Con pipeta o gotario, dosifico ml/L al armar la formulación.</p>
        </div>
      </div>
    </>
  );
}

// ── Tab Formulación ──────────────────────────────────────────────
// El elaborador define la receta en ml de extracto por litro de vermut.
// Puede agregar extractos desde la biblioteca o de forma manual.
function TabFormulacion({recipe,setRecipe}){
  const [mostrarBib,setMostrarBib]=useState(false);

  const toggleBib=bot=>{
    const existe=recipe.extractos.find(e=>e.nombre===bot.nombre);
    if(existe){
      setRecipe(r=>({...r,extractos:r.extractos.filter(e=>e.nombre!==bot.nombre)}));
    } else {
      setRecipe(r=>({...r,extractos:[...r.extractos,{
        id:uid(),nombre:bot.nombre,mlL:String(bot.dosis),rol:bot.rol,notas:bot.grupo
      }]}));
    }
  };

  const addManual=()=>setRecipe(r=>({...r,extractos:[...r.extractos,{id:uid(),nombre:"",mlL:"",rol:"body",notas:""}]}));
  const updateExt=(id,field,val)=>setRecipe(r=>({...r,extractos:r.extractos.map(e=>e.id===id?{...e,[field]:val}:e)}));
  const removeExt=id=>setRecipe(r=>({...r,extractos:r.extractos.filter(e=>e.id!==id)}));
  const enBib=nombre=>!!recipe.extractos.find(e=>e.nombre===nombre);
  const totalMlL=recipe.extractos.reduce((s,e)=>s+(parseFloat(e.mlL)||0),0);

  return(
    <>
      <div className="card">
        <div className="card-title">Datos generales</div>
        <div className="row">
          <div className="field"><label>Nombre</label>
            <input value={recipe.nombre} onChange={e=>setRecipe(r=>({...r,nombre:e.target.value}))} placeholder="Nombre de la formulación"/>
          </div>
          <div className="field"><label>Estilo</label>
            <select value={recipe.estilo} onChange={e=>setRecipe(r=>({...r,estilo:e.target.value}))}>
              <option value="vermouth_bianco">Vermouth bianco</option>
              <option value="vermouth_dry">Vermouth seco (dry)</option>
              <option value="vermouth_rosso">Vermouth rosso</option>
              <option value="vermouth_rosado">Vermouth rosado</option>
              <option value="gin_destilado">Gin destilado</option>
              <option value="gin_macerado">Gin macerado</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="field"><label>Base / vino</label>
            <input value={recipe.base} onChange={e=>setRecipe(r=>({...r,base:e.target.value}))} placeholder="Ej: Viognier-Roussanne 2020, 13°"/>
          </div>
          <div className="field"><label>Perfil aromático</label>
            <input value={recipe.perfil} onChange={e=>setRecipe(r=>({...r,perfil:e.target.value}))} placeholder="Ej: Cítrico-herbáceo, frutal silvestre"/>
          </div>
        </div>
        <div className="field"><label>Notas de proceso</label>
          <textarea rows={2} value={recipe.procesoNotas} onChange={e=>setRecipe(r=>({...r,procesoNotas:e.target.value}))} placeholder="Observaciones, ajustes, referencias..."/>
        </div>
      </div>

      <div className="card">
        <div className="flex-between" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div className="card-title" style={{marginBottom:0}}>Extractos (ml/L de vermut)</div>
          <div style={{display:"flex",gap:6}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>setMostrarBib(!mostrarBib)}>
              {mostrarBib?"▲ Cerrar":"📚 Biblioteca"}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={addManual}>+ Manual</button>
          </div>
        </div>

        {mostrarBib&&(
          <div style={{marginBottom:12,padding:12,background:T.surface,borderRadius:8,border:`1px solid ${T.border}`}}>
            <p style={{fontSize:11,color:T.textMuted,marginBottom:10}}>Selecciona los extractos de tu biblioteca. La dosis estándar se carga automáticamente — ajústala después.</p>
            {GRUPOS.map(grupo=>{
              const items=BIBLIOTECA_STD.filter(b=>b.grupo===grupo);
              return(
                <div key={grupo} style={{marginBottom:10}}>
                  <div className="section-label" style={{marginTop:0}}>{grupo}</div>
                  <div className="stock-grid">
                    {items.map(bot=>(
                      <div key={bot.nombre} className={`stock-item${enBib(bot.nombre)?" checked":""}`} onClick={()=>toggleBib(bot)}>
                        <input type="checkbox" readOnly checked={enBib(bot.nombre)}/>
                        <span>{bot.nombre} <span style={{color:T.textMuted,fontSize:10}}>({bot.dosis} ml/L)</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {recipe.extractos.length===0&&(
          <div style={{textAlign:"center",padding:24,color:T.textMuted,fontSize:13}}>
            Abre "📚 Biblioteca" para agregar extractos, o usa "+ Manual".
          </div>
        )}

        {recipe.extractos.length>0&&(
          <>
            <table className="tbl">
              <thead><tr><th>Extracto</th><th className="num">ml/L</th><th>Rol</th><th>Notas</th><th></th></tr></thead>
              <tbody>
                {recipe.extractos.map(e=>(
                  <tr key={e.id}>
                    <td>
                      <input list="bib-list" value={e.nombre}
                        onChange={ev=>updateExt(e.id,"nombre",ev.target.value)}
                        placeholder="Nombre del extracto..."
                        style={{minWidth:140,fontSize:13}}/>
                      <datalist id="bib-list">
                        {BIBLIOTECA_STD.map(b=><option key={b.nombre} value={b.nombre}/>)}
                      </datalist>
                    </td>
                    <td>
                      <input type="number" value={e.mlL} onChange={ev=>updateExt(e.id,"mlL",ev.target.value)}
                        style={{width:60,fontSize:13}} min={0} step={0.5} placeholder="0"/>
                    </td>
                    <td>
                      <select value={e.rol} onChange={ev=>updateExt(e.id,"rol",ev.target.value)} style={{width:100,fontSize:12}}>
                        {ROLES.map(ro=><option key={ro} value={ro}>{ROLE_LABELS[ro]}</option>)}
                      </select>
                    </td>
                    <td>
                      <input value={e.notas} onChange={ev=>updateExt(e.id,"notas",ev.target.value)}
                        placeholder="Función aromática" style={{minWidth:90,fontSize:12}}/>
                    </td>
                    <td><button className="btn btn-danger" onClick={()=>removeExt(e.id)}>×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{padding:"7px 8px",fontSize:11,color:T.textMuted,borderTop:`1px solid ${T.border}22`,marginTop:4}}>
              Total extractos: <strong style={{color:T.amber}}>{fmt(totalMlL,1)} ml/L</strong>
              <span style={{marginLeft:12,color:T.textMuted}}>— cada litro de vermut lleva {fmt(totalMlL,1)} ml de extracto combinado</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ── Tab Batch ────────────────────────────────────────────────────
// Calcula el batch completo usando la Regla de Pearson para equilibrar
// el grado alcohólico entre vino base y extracto madre.
//
// FÓRMULA PRINCIPAL (Pearson):
//   E_ml = Vf_ml × (°F - °V) / (°E - °V)
//   Vino_ml = Vf_ml - E_ml - Jarabe_ml
//
// DISTRIBUCIÓN DE EXTRACTOS:
//   ml_i = dosis_i (ml/L) × Vf (L)
//   Si Σml_i < E_ml → completar con alcohol neutro 50°
//   Si Σml_i > E_ml → advertencia: °alc final será mayor al objetivo
//
// GRAMOS DE BOTÁNICO PARA PRODUCIR CADA EXTRACTO:
//   g_i = (ml_extracto_i / 1000) × gL_i
//   donde gL_i = g botánico por litro de alcohol 50° (desde biblioteca)
function TabBatch({recipe,litrosStr,setLitrosStr,litros,formato,setFormato}){
  const [gradVino,setGradVino]=useState("13");
  const [gradObj,setGradObj]=useState("17");
  const [gradExtracto,setGradExtracto]=useState("50");
  const [azucarGL,setAzucarGL]=useState("80");

  const gV=parseFloat(gradVino)||13;
  const gF=parseFloat(gradObj)||17;
  const gE=parseFloat(gradExtracto)||50;
  const azGL=parseFloat(azucarGL)||0;
  const Vf=litros;

  // Pearson: ml de extracto madre total necesario
  const E_ml = Vf * 1000 * (gF - gV) / (gE - gV);

  // Jarabe de azúcar (densidad aprox 1.32 kg/L para 65° Brix)
  const azucar_g = azGL * Vf;
  const jarabe_ml = azucar_g / 1.32;

  // Vino base ajustado
  const vino_ml = Vf * 1000 - E_ml - jarabe_ml;

  // Extractos individuales
  const exts = recipe.extractos.filter(e=>e.nombre&&parseFloat(e.mlL)>0);
  const extItems = exts.map(e=>{
    const mlTotal = parseFloat(e.mlL) * Vf;
    const bibRef = BIBLIOTECA_STD.find(b=>b.nombre===e.nombre);
    const gBotan = bibRef ? (mlTotal/1000)*bibRef.gL : null;
    return {...e, mlTotal, gBotan, bibRef};
  });
  const totalExtractosML = extItems.reduce((s,e)=>s+e.mlTotal,0);
  const ajusteAlcohol = E_ml - totalExtractosML;
  const botellas = Math.floor((Vf*1000)/formato);

  if(exts.length===0) return(
    <div className="card">
      <div style={{textAlign:"center",padding:24,color:T.textMuted,fontSize:13}}>
        Agrega extractos con sus dosis en la pestaña Formulación primero.
      </div>
    </div>
  );

  return(
    <>
      <div className="card">
        <div className="card-title">Parámetros del batch</div>
        <div className="row">
          <div className="field"><label>Volumen final (litros)</label>
            <input type="number" value={litrosStr} min={0.5} step={0.5} inputMode="decimal"
              onChange={e=>setLitrosStr(e.target.value)}
              onBlur={e=>{const v=parseFloat(e.target.value)||1.5;setLitrosStr(String(v));}}/>
            <p className="hint">Tus batches típicos: 1.5 L</p>
          </div>
          <div className="field"><label>Formato botella (ml)</label>
            <select value={formato} onChange={e=>setFormato(parseInt(e.target.value))}>
              <option value={500}>500 ml</option>
              <option value={700}>700 ml</option>
              <option value={750}>750 ml</option>
              <option value={1000}>1.000 ml</option>
            </select>
          </div>
        </div>
        <div className="row-3">
          <div className="field"><label>°Alc vino base</label>
            <input type="number" value={gradVino} onChange={e=>setGradVino(e.target.value)} min={10} max={16} step={0.5}/>
          </div>
          <div className="field"><label>°Alc objetivo vermut</label>
            <input type="number" value={gradObj} onChange={e=>setGradObj(e.target.value)} min={14} max={22} step={0.5}/>
          </div>
          <div className="field"><label>°Alc extracto madre</label>
            <input type="number" value={gradExtracto} onChange={e=>setGradExtracto(e.target.value)} min={40} max={70} step={1}/>
          </div>
        </div>
        <div className="field"><label>Azúcar objetivo (g/L)</label>
          <input type="number" value={azucarGL} onChange={e=>setAzucarGL(e.target.value)} min={0} max={150} step={5}/>
          <p className="hint">Rosso clásico: 75–90 g/L · Bianco: 50–70 g/L · Dry: 0–30 g/L</p>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Composición del batch — {fmt(Vf,1)} L</div>
        <div className="kpi-grid">
          <div className="kpi"><span className="kpi-val">{fmt(vino_ml,0)}</span><div className="kpi-label">ml vino base</div></div>
          <div className="kpi"><span className="kpi-val">{fmt(E_ml,0)}</span><div className="kpi-label">ml extracto total</div></div>
          <div className="kpi"><span className="kpi-val">{fmt(jarabe_ml,0)}</span><div className="kpi-label">ml jarabe azúcar</div></div>
          <div className="kpi"><span className="kpi-val">{fmt(azucar_g,0)}</span><div className="kpi-label">g azúcar total</div></div>
          <div className="kpi"><span className="kpi-val">{gF}°</span><div className="kpi-label">°alc objetivo</div></div>
          <div className="kpi"><span className="kpi-val">{botellas}</span><div className="kpi-label">botellas {formato}ml</div></div>
        </div>

        <div className="alert" style={{fontSize:11}}>
          <strong>Cómo ensamblar:</strong> Mezcla {fmt(vino_ml,0)} ml de vino + {fmt(totalExtractosML,0)} ml de extractos{ajusteAlcohol>1?` + ${fmt(ajusteAlcohol,0)} ml alcohol 50° de ajuste`:""} + {fmt(jarabe_ml,0)} ml de jarabe de azúcar. Reposa 2-4 semanas en botella oscura antes de catar.
        </div>

        {ajusteAlcohol > 5 && (
          <div className="alert-green">
            ✓ Tus extractos suman <strong>{fmt(totalExtractosML,0)} ml</strong>. Agregar <strong>{fmt(ajusteAlcohol,0)} ml</strong> de alcohol neutro al 50° para completar el volumen de extracto necesario ({fmt(E_ml,0)} ml total).
          </div>
        )}
        {ajusteAlcohol < -5 && (
          <div className="alert-red">
            ⚠ Tus extractos suman <strong>{fmt(totalExtractosML,0)} ml</strong>, que supera el extracto calculado ({fmt(E_ml,0)} ml). El °alc final será mayor a {gF}°. Reduce alguna dosis o sube el °objetivo.
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Extractos individuales</div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Extracto</th>
              <th>Rol</th>
              <th className="num">ml/L</th>
              <th className="num">ml batch</th>
              <th className="num">g botánico*</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map(rol=>extItems.filter(e=>e.rol===rol).map(e=>(
              <tr key={e.id}>
                <td style={{color:T.cream}}>{e.nombre}</td>
                <td><span className={`tag tag-${rol}`}>{ROLE_LABELS[rol]}</span></td>
                <td className="num">{fmt(parseFloat(e.mlL),1)}</td>
                <td className="num highlight">{fmt(e.mlTotal,1)} ml</td>
                <td className="num" style={{color:T.textMuted}}>{e.gBotan?`${fmt(e.gBotan,1)} g`:"—"}</td>
              </tr>
            )))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{paddingTop:8,fontSize:11,color:T.textMuted}}>Total extractos</td>
              <td className="num highlight" style={{paddingTop:8}}>{fmt(totalExtractosML,1)} ml</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <p style={{fontSize:10,color:T.textMuted,marginTop:8}}>* Gramos de botánico seco necesarios para producir ese volumen de extracto, según concentración de la biblioteca. Si ya tienes el extracto listo, ignora esta columna.</p>
      </div>
    </>
  );
}

// ── Tab Costos ───────────────────────────────────────────────────
function TabCostos({recipe,litros,litrosStr,setLitrosStr,formato,setFormato}){
  const [precios,setPrecios]=useState({});
  const [extras,setExtras]=useState({base_vino:"",envases:"",etiquetas:"",otros:""});
  const botellas=Math.floor((litros*1000)/formato);

  const costoExts=recipe.extractos.filter(e=>e.nombre&&parseFloat(e.mlL)>0).reduce((sum,e)=>{
    const mlTotal=parseFloat(e.mlL)*litros;
    const bibRef=BIBLIOTECA_STD.find(b=>b.nombre===e.nombre);
    const gBotan=bibRef?(mlTotal/1000)*bibRef.gL:0;
    const precioKg=parseFloat(precios[e.id])||0;
    return sum+(gBotan/1000)*precioKg;
  },0);

  const costoBase=parseFloat(extras.base_vino)||0;
  const costoEnvases=(parseFloat(extras.envases)||0)*botellas;
  const costoEtiquetas=(parseFloat(extras.etiquetas)||0)*botellas;
  const costoOtros=parseFloat(extras.otros)||0;
  const costoTotal=costoExts+costoBase+costoEnvases+costoEtiquetas+costoOtros;
  const xBotella=botellas>0?costoTotal/botellas:0;

  return(
    <>
      <div className="card">
        <div className="card-title">Parámetros</div>
        <div className="row">
          <div className="field"><label>Litros de salida</label>
            <input type="number" value={litrosStr} min={0.5} step={0.5} inputMode="decimal"
              onChange={e=>setLitrosStr(e.target.value)}
              onBlur={e=>{const v=parseFloat(e.target.value)||1.5;setLitrosStr(String(v));}}/>
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
        <div className="card-title">Costos (CLP)</div>
        <div className="row">
          <div className="field"><label>Vino base — total batch</label>
            <input type="number" value={extras.base_vino} placeholder="0" onChange={e=>setExtras(x=>({...x,base_vino:e.target.value}))}/>
          </div>
          <div className="field"><label>Envase + tapa — por unidad</label>
            <input type="number" value={extras.envases} placeholder="0" onChange={e=>setExtras(x=>({...x,envases:e.target.value}))}/>
          </div>
        </div>
        <div className="row">
          <div className="field"><label>Etiqueta — por unidad</label>
            <input type="number" value={extras.etiquetas} placeholder="0" onChange={e=>setExtras(x=>({...x,etiquetas:e.target.value}))}/>
          </div>
          <div className="field"><label>Otros — total batch</label>
            <input type="number" value={extras.otros} placeholder="0" onChange={e=>setExtras(x=>({...x,otros:e.target.value}))}/>
          </div>
        </div>
        {recipe.extractos.filter(e=>e.nombre&&parseFloat(e.mlL)>0).length>0&&(
          <>
            <div className="section-label">Precio botánicos (CLP/kg)</div>
            <p style={{fontSize:11,color:T.textMuted,marginBottom:10}}>Ingresa el precio por kg. El costo se calcula según los gramos de botánico necesarios para producir el extracto del batch.</p>
            {recipe.extractos.filter(e=>e.nombre&&parseFloat(e.mlL)>0).map(e=>{
              const mlTotal=parseFloat(e.mlL)*litros;
              const bibRef=BIBLIOTECA_STD.find(b=>b.nombre===e.nombre);
              const gBotan=bibRef?(mlTotal/1000)*bibRef.gL:null;
              const precioKg=parseFloat(precios[e.id])||0;
              const costo=gBotan?(gBotan/1000)*precioKg:0;
              return(
                <div key={e.id} className="field">
                  <label style={{display:"flex",justifyContent:"space-between"}}>
                    <span>{e.nombre}{gBotan?` — ${fmt(gBotan,1)} g`:""}</span>
                    {precioKg>0&&gBotan&&<span style={{color:T.amber}}>= ${fmt(costo)}</span>}
                  </label>
                  <input type="number" value={precios[e.id]||""} placeholder="Precio/kg"
                    onChange={ev=>setPrecios(p=>({...p,[e.id]:ev.target.value}))}/>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="card">
        <div className="card-title">Resumen — {fmt(litros,1)} L / {botellas} botellas</div>
        <div className="kpi-grid">
          <div className="kpi"><span className="kpi-val">${fmt(costoTotal)}</span><div className="kpi-label">Total batch</div></div>
          <div className="kpi"><span className="kpi-val">${fmt(xBotella)}</span><div className="kpi-label">Por botella</div></div>
          <div className="kpi"><span className="kpi-val">{botellas}</span><div className="kpi-label">Botellas</div></div>
        </div>
        <table className="tbl">
          <thead><tr><th>Categoría</th><th className="num">Total</th><th className="num">x botella</th><th className="num">%</th></tr></thead>
          <tbody>
            {[{label:"Vino base",val:costoBase},{label:"Botánicos",val:costoExts},{label:"Envases",val:costoEnvases},{label:"Etiquetas",val:costoEtiquetas},{label:"Otros",val:costoOtros}].map(row=>(
              <tr key={row.label}><td>{row.label}</td><td className="num">${fmt(row.val)}</td>
                <td className="num">${fmt(botellas>0?row.val/botellas:0)}</td>
                <td className="num">{costoTotal>0?fmt((row.val/costoTotal)*100,1):0}%</td></tr>
            ))}
          </tbody>
        </table>
        <div className="divider"/>
        <div className="section-label">Precio de venta sugerido</div>
        <table className="tbl">
          <thead><tr><th>Canal</th><th className="num">Margen</th><th className="num">Precio</th></tr></thead>
          <tbody>
            {[{label:"Amigos / gifting",pct:0.3},{label:"Minorista",pct:0.6},{label:"Hostelería",pct:1.2}].map(m=>(
              <tr key={m.label}><td>{m.label}</td><td className="num">{(m.pct*100).toFixed(0)}%</td>
                <td className="num highlight">${fmt(xBotella*(1+m.pct))}</td></tr>
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
        <div className="card-title">Cata — {recipe.nombre||"Sin nombre"}</div>
        {SCORE_ATTRS.map(a=>{
          const val=parseFloat(cata[a.key])||0;
          return(
            <div key={a.key} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <label style={{marginBottom:0}}>{a.label}</label>
                <span style={{fontSize:12,color:T.amber,fontWeight:600}}>{val}/10</span>
              </div>
              <input type="range" min={0} max={10} step={0.5} value={val}
                onChange={e=>setScore(a.key,parseFloat(e.target.value))}
                style={{width:"100%",accentColor:T.copper}}/>
            </div>
          );
        })}
        <div className="field" style={{marginTop:8}}><label>Notas y ajustes para el próximo batch</label>
          <textarea rows={3} value={cata.diagnostico||""}
            onChange={e=>setRecipe(r=>({...r,cata:{...(r.cata||{}),diagnostico:e.target.value}}))}
            placeholder="¿Qué cambiarías? ¿Más o menos de algún extracto?"/>
        </div>
      </div>
      <div className="card">
        <div className="total-score">{avg.toFixed(1)}</div>
        <div className="total-label">puntuación global / 10</div>
        <div className="radar-wrap"><Radar scores={cata}/></div>
        <div className="section-label">Por atributo</div>
        {SCORE_ATTRS.map(a=>{
          const val=parseFloat(cata[a.key])||0;
          return(
            <div key={a.key} className="score-row">
              <div className="score-label">{a.label}</div>
              <div className="score-bar-bg"><div className="score-bar-fill" style={{width:`${val*10}%`}}/></div>
              <div className="score-val">{val}</div>
            </div>
          );
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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:T.textMuted}}>Recetario</span>
        <button className="btn btn-ghost btn-sm" onClick={onNew}>+ Nueva</button>
      </div>
      <div className="sidebar-inner">
        {propias.length>0&&(
          <>
            <div style={{fontSize:9,letterSpacing:".1em",textTransform:"uppercase",color:T.copper,marginBottom:2}}>Mis recetas</div>
            {propias.map(r=>(
              <div key={r.id} className={`recipe-item${r.id===activeId?" selected":""}`} onClick={()=>onSelect(r.id)}>
                <div>
                  <div className="recipe-name">{r.nombre||"Sin nombre"}</div>
                  <div className="recipe-meta">{r.estilo?.replace(/_/g," ")||"—"}</div>
                </div>
                <button className="btn btn-danger" onClick={e=>{e.stopPropagation();onDelete(r.id);}}>×</button>
              </div>
            ))}
          </>
        )}
        <div style={{fontSize:9,letterSpacing:".1em",textTransform:"uppercase",color:"#a06ac4",marginBottom:2,marginTop:propias.length>0?6:0}}>Históricas</div>
        {historicas.map(r=>(
          <div key={r.id} className={`recipe-item historic${r.id===activeId?" selected":""}`} onClick={()=>onSelect(r.id)}>
            <div>
              <div className="recipe-name" style={{fontSize:11}}>{r.nombre}</div>
              <div className="recipe-meta">{r.fecha}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────
const TABS=[
  {key:"formulacion",label:"Formulación"},
  {key:"batch",label:"Batch"},
  {key:"costos",label:"Costos"},
  {key:"cata",label:"Cata"},
  {key:"biblioteca",label:"📚 Biblioteca"},
];

export default function App(){
  const [recipes,setRecipes]=useState(loadRecipes);
  const [activeId,setActiveId]=useState(null);
  const [tab,setTab]=useState("formulacion");
  const [litrosStr,setLitrosStr]=useState("1.5");
  const [formato,setFormato]=useState(750);
  const litros=parseFloat(litrosStr)||1.5;
  const recipe=recipes.find(r=>r.id===activeId)||null;

  useEffect(()=>{saveRecipes(recipes);},[recipes]);

  const newRecipe=()=>{
    const r=emptyRecipe();
    setRecipes(rs=>[...rs,r]);
    setActiveId(r.id);
    setTab("formulacion");
  };
  const setRecipe=updater=>setRecipes(rs=>rs.map(r=>r.id===activeId?(typeof updater==="function"?updater(r):updater):r));
  const deleteRecipe=id=>{
    if(recipes.find(r=>r.id===id)?.esHistorica)return;
    setRecipes(rs=>rs.filter(r=>r.id!==id));
    if(activeId===id)setActiveId(null);
  };

  return(
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-eyebrow">Destilería artesanal del Sur del Mundo</div>
          <div className="header-title">Vermu<span>tier</span></div>
          <div className="header-sub">Maestro Vermutero · Formulación con extractos · Batch · Costos · Cata</div>
        </div>

        <div className="layout" style={{display:"flex",gap:18,alignItems:"flex-start"}}>
          <div className="sidebar-wrap" style={{minWidth:195,maxWidth:205,flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,
              padding:"9px 11px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:9}}>
              <img src={AVATAR} alt="Pantxo Vila"
                style={{width:42,height:42,borderRadius:"50%",objectFit:"cover",
                  border:`2px solid ${T.copper}`,flexShrink:0}}/>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:T.cream}}>Pantxo Vila</div>
                <div style={{fontSize:9,color:T.copper,letterSpacing:"0.06em",textTransform:"uppercase",marginTop:2}}>Maestro Vermutero</div>
              </div>
            </div>
            <Sidebar recipes={recipes} activeId={activeId}
              onSelect={id=>{setActiveId(id);setTab("formulacion");}}
              onNew={newRecipe} onDelete={deleteRecipe}/>
          </div>

          <div style={{flex:1,minWidth:0}}>
            {!recipe?(
              <div className="card" style={{textAlign:"center",padding:36}}>
                <div style={{fontSize:30,marginBottom:10}}>🌿</div>
                <div style={{color:T.cream,fontSize:14,marginBottom:6}}>Selecciona una receta o crea una nueva</div>
                <div style={{color:T.textMuted,fontSize:12,marginBottom:16}}>Las recetas históricas están cargadas en el sidebar</div>
                <button className="btn btn-primary" onClick={newRecipe}>+ Nueva formulación</button>
              </div>
            ):(
              <>
                <div className="tabs">
                  {TABS.map(t=>(
                    <button key={t.key} className={`tab${tab===t.key?" active":""}`} onClick={()=>setTab(t.key)}>{t.label}</button>
                  ))}
                </div>
                {tab==="formulacion"&&<TabFormulacion recipe={recipe} setRecipe={setRecipe}/>}
                {tab==="batch"&&<TabBatch recipe={recipe} litrosStr={litrosStr} setLitrosStr={setLitrosStr} litros={litros} formato={formato} setFormato={setFormato}/>}
                {tab==="costos"&&<TabCostos recipe={recipe} litros={litros} litrosStr={litrosStr} setLitrosStr={setLitrosStr} formato={formato} setFormato={setFormato}/>}
                {tab==="cata"&&<TabCata recipe={recipe} setRecipe={setRecipe}/>}
                {tab==="biblioteca"&&<TabBiblioteca/>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
