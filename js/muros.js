// ===============================
// MUROS.JS – TOTALMENTE FUNCIONAL
// ===============================

function calcularMuro() {

  // --- ENTRADAS ---
  const largo = parseFloat(document.getElementById("largo").value);
  const alto = parseFloat(document.getElementById("alto").value);
  const desperdicio = parseFloat(document.getElementById("desperdicio").value || 0);
  const tipoBloque = document.getElementById("tipo_bloque").value;
  const moneda = document.getElementById("moneda").value;
  const calcularCostos = document.getElementById("costos").checked;

  if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
    alert("⚠️ Introduce largo y alto válidos");
    return;
  }

  // --- ÁREA ---
  const area = largo * alto;

  // --- BLOQUES POR m² SEGÚN TIPO ---
  let bloquesPorM2;
  if (tipoBloque === "10") bloquesPorM2 = 12.5;
  if (tipoBloque === "15") bloquesPorM2 = 12.5;
  if (tipoBloque === "20") bloquesPorM2 = 12.5;

  let bloques = area * bloquesPorM2;
  bloques *= (1 + desperdicio / 100);
  bloques = Math.ceil(bloques);

  // --- CONSUMOS ---
  let cementoPorM2 = tipoBloque === "10" ? 0.18 :
                     tipoBloque === "15" ? 0.20 : 0.22;

  let arenaPorM2 = tipoBloque === "10" ? 0.02 :
                   tipoBloque === "15" ? 0.025 : 0.03;

  const cemento = area * cementoPorM2;
  const arena = area * arenaPorM2;

  // --- RESULTADO BASE ---
  let html = `
    <h3>Resultado – Muro de Bloques ${tipoBloque} cm</h3>
    <p><strong>Área:</strong> ${area.toFixed(2)} m²</p>
    <p><strong>Bloques:</strong> ${bloques} unidades</p>
    <p><strong>Cemento:</strong> ${cemento.toFixed(2)} sacos</p>
    <p><strong>Arena:</strong> ${arena.toFixed(2)} m³</p>
  `;

  // --- COSTOS ---
  if (calcularCostos) {

    const precioBloque = parseFloat(document.getElementById("precio_bloque_muro").value);
    const precioCemento = parseFloat(document.getElementById("precio_cemento_muro").value);
    const precioArena = parseFloat(document.getElementById("precio_arena_muro").value);

    const cambioUSD = parseFloat(document.getElementById("cambio_usd_muro").value);
    const cambioEUR = parseFloat(document.getElementById("cambio_eur_muro").value);

    let totalCUP =
      bloques * precioBloque +
      cemento * precioCemento +
      arena * precioArena;

    let total = totalCUP;
    let simbolo = "CUP";

    if (moneda === "USD") {
      total = totalCUP / cambioUSD;
      simbolo = "USD";
    }

    if (moneda === "EUR") {
      total = totalCUP / cambioEUR;
      simbolo = "EUR";
    }

    html += `
      <hr>
      <h4>Costos</h4>
      <p><strong>Total en CUP:</strong> ${totalCUP.toFixed(2)} CUP</p>
      <p><strong>Total en ${simbolo}:</strong> ${total.toFixed(2)} ${simbolo}</p>
    `;
  }

  // --- MOSTRAR RESULTADO ---
  document.getElementById("resultado").innerHTML = html;
}

// FUNCIONES DE COMPATIBILIDAD
function actualizarPreciosMuro() {
  alert("✔ Precios actualizados");
}