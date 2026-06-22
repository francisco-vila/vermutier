# Vermutier — Lógica de cálculo

## 1. Biblioteca de extractos

Cada botánico tiene una ficha de maceración estándar con los siguientes parámetros:

### Concentración de maceración (g/L de alcohol 50%)
Define cuántos gramos de botánico seco se ponen por litro de alcohol al 50%.
Varía según dureza del material:

| Grupo | g/L alcohol 50% | Días maceración |
|---|---|---|
| Raíces y cortezas duras (angélica, regaliz, quina) | 80–120 g/L | 10–14 días |
| Especias (cardamomo, canela, clavo, pimienta) | 40–60 g/L | 5–7 días |
| Hierbas y hojas (ajenjo, peumo, cedrón, menta) | 30–50 g/L | 5–8 días |
| Cítricos (pieles de naranja, pomelo, limón) | 60–80 g/L | 3–5 días |
| Flores (hibisco, lavanda, flor de saúco) | 20–30 g/L | 3–4 días |
| Frutas secas (murta, arrayán) | 50–70 g/L | 7–10 días |

### Dosis aromática (ml de extracto por litro de vermut final)
Define la intensidad de cada botánico en la formulación final.
El elaborador ajusta esta dosis según el perfil buscado.
Rangos orientativos:
- Backbone (ajenjo, angélica, regaliz): 2–8 ml/L
- Cuerpo (peumo, murta, arrayán, especias): 5–20 ml/L
- Acabado (cítricos, flores): 3–10 ml/L

---

## 2. Cálculo de grado alcohólico — Regla de mezcla (Pearson)

El vermut final resulta de mezclar vino base + extracto madre (suma de extractos individuales).
Se aplica la regla de mezcla de Pearson para encontrar las proporciones exactas.

### Variables
- **°V** = grado alcohólico del vino base (típico: 12–14°)
- **°E** = grado alcohólico del extracto madre (50° si se usa alcohol de uva al 50%)
- **°F** = grado alcohólico objetivo del vermut final (16–22°)
- **Vf** = volumen final deseado (litros)

### Fórmula
```
E_ml = Vf × 1000 × (°F - °V) / (°E - °V)
Vino_ml = Vf × 1000 - E_ml
```

### Ejemplo para 1.5 L a 17°, vino 13°, extracto 50°
```
E_ml = 1500 × (17 - 13) / (50 - 13)
E_ml = 1500 × 4 / 37
E_ml = 162 ml de extracto total

Vino_ml = 1500 - 162 = 1338 ml de vino
```

### Ajuste por azúcar
El azúcar (solución de jarabe 65° Brix) tiene volumen propio que desplaza vino.
Se resta del vino, no del extracto.
```
Jarabe_ml = (azúcar_g / 1000) × densidad_jarabe (≈ 1.32 kg/L)
Vino_ajustado_ml = Vino_ml - Jarabe_ml
```

---

## 3. Distribución de extractos individuales

El total de extracto calculado (E_ml) se distribuye entre todos los botánicos
según su dosis aromática relativa.

### Paso 1 — Calcular ml de cada extracto en el batch
```
ml_extracto_i = dosis_i (ml/L) × Vf (L)
```

### Paso 2 — Verificar que suma ≤ E_ml
```
Total_extractos = Σ ml_extracto_i
```
Si `Total_extractos > E_ml`: la app advierte que el grado alcohólico final
será mayor al objetivo. El elaborador puede:
- Reducir dosis de algún extracto
- Subir el °F objetivo
- Aceptar el desvío

Si `Total_extractos < E_ml`: la diferencia se completa con alcohol de uva
neutro al 50% (mismo grado que el extracto madre).
```
Alcohol_ajuste_ml = E_ml - Total_extractos
```

### Paso 3 — Gramos de botánico para producir cada extracto
Para saber cuánto botánico macerar:
```
Gramos_botánico = (ml_extracto_i / 1000) × concentración_g_por_L
```

---

## 4. Encabezado de azúcar

El vermut rosso clásico lleva 75–90 g/L de azúcar.
El bianco 50–70 g/L. El dry < 30 g/L.

El elaborador ingresa g/L de azúcar objetivo.
La app calcula:
```
Azúcar_total_g = azúcar_g_por_L × Vf
Jarabe_ml = Azúcar_total_g / 1.32  (densidad aproximada jarabe 65° Brix)
```

El jarabe se resta del vino base para mantener el volumen final correcto.

---

## 5. Resumen del batch — orden de operaciones

1. Definir: volumen final (Vf), °alc objetivo (°F), °vino (°V), °extracto (°E), azúcar (g/L)
2. Calcular E_ml total (Pearson)
3. Calcular Jarabe_ml y Vino_ml ajustado
4. Distribuir E_ml entre extractos individuales según dosis aromática
5. Calcular gramos de botánico a macerar por extracto
6. Reportar ajuste con alcohol neutro si Total_extractos < E_ml

---

## 6. Biblioteca de extractos — fichas precargadas (botánicos de Pantxo)

| Botánico | Grupo | g/L alcohol | Días | Dosis típica ml/L |
|---|---|---|---|---|
| Ajenjo | Hierbas | 40 g/L | 6 días | 4 ml/L |
| Peumo (hojas) | Hierbas | 40 g/L | 7 días | 8 ml/L |
| Cedrón | Hierbas | 35 g/L | 5 días | 6 ml/L |
| Menta | Hierbas | 30 g/L | 4 días | 4 ml/L |
| Romero | Hierbas | 40 g/L | 6 días | 3 ml/L |
| Apio | Hierbas | 30 g/L | 5 días | 3 ml/L |
| Olivo (hojas) | Hierbas | 35 g/L | 6 días | 3 ml/L |
| Hinojo | Hierbas | 40 g/L | 5 días | 5 ml/L |
| Piel de naranja | Cítricos | 70 g/L | 4 días | 8 ml/L |
| Piel de limón | Cítricos | 70 g/L | 3 días | 5 ml/L |
| Piel de pomelo | Cítricos | 65 g/L | 4 días | 5 ml/L |
| Hibisco | Flores | 25 g/L | 3 días | 6 ml/L |
| Arrayán (bayas) | Frutas secas | 60 g/L | 8 días | 8 ml/L |
| Arrayán (hoja) | Hierbas | 35 g/L | 6 días | 5 ml/L |
| Murta | Frutas secas | 60 g/L | 9 días | 10 ml/L |
| Anís (semilla) | Especias | 50 g/L | 6 días | 5 ml/L |
| Cardamomo | Especias | 50 g/L | 6 días | 5 ml/L |
| Canela cassia | Especias | 50 g/L | 6 días | 4 ml/L |
| Coriander (semilla) | Especias | 45 g/L | 5 días | 5 ml/L |
| Enebro | Especias | 50 g/L | 7 días | 6 ml/L |
| Tabaco | Hierbas | 20 g/L | 3 días | 1 ml/L |
| Regaliz (raíz) | Raíces | 90 g/L | 12 días | 5 ml/L |
| Raíz de angélica | Raíces | 100 g/L | 12 días | 6 ml/L |
| Ruibarbo | Raíces | 80 g/L | 10 días | 5 ml/L |
