function calcularHormigon() {
  const largo = Number(document.getElementById("h_largo").value);
  const ancho = Number(document.getElementById("h_ancho").value);
  const alto = Number(document.getElementById("h_alto").value);
  const aceroKgM3 = Number(document.getElementById("h_acero").value);

  const desperdicio = Number(document.getElementById("desperdicio").value);
  const moneda = document.getElementById("moneda").value;

  if (largo <= 0 || ancho <= 0 || alto <= 0) {
    alert("Dimensiones inválidas");
    return;
  }

  // Volumen
  let volumen = largo * ancho * alto;
  volumen = aplicarDesperdicio(volumen, desperdicio);

  // Dosificación típica 1 : 2 : 3
  const cementoPorM3 = 7.5;   // sacos
  const arenaPorM3 = 0.50;    // m3
  const gravaPorM3 = 0.70;    // m3

  const cemento = redondear(volumen * cementoPorM3);
  const arena = redondear(volumen * arenaPorM3, 3);
  const grava = redondear(volumen * gravaPorM3, 3);
  const acero = redondear(volumen * aceroKgM3);

  // Costos (USD base)
  const precioGrava = 30; // USD/m3

  let cCemento = costo(cemento, PRECIOS.cemento);
  let cArena = costo(arena, PRECIOS.arena);
  let cGrava = costo(grava, precioGrava);
  let cAcero = costo(acero, 1.20); // USD/kg

  cCemento = convertirMoneda(cCemento, moneda);
  cArena = convertirMoneda(cArena, moneda);
  cGrava = convertirMoneda(cGrava, moneda);
  cAcero = convertirMoneda(cAcero, moneda);

  const total = redondear(cCemento + cArena + cGrava + cAcero);

  document.getElementById("resultadoHormigon").innerHTML = `
    <h3>Resultados Hormigón Armado</h3>
    <p><b>Volumen:</b> ${redondear(volumen)} m³</p>
const pCemento = parseFloat(document.getElementById("precio_cemento_ha").value);
const pArena   = parseFloat(document.getElementById("precio_arena_ha").value);
const pGrava   = parseFloat(document.getElementById("precio_grava_ha").value);
const pAcero   = parseFloat(document.getElementById("precio_acero_ha").value);
    <table>
      <tr><th>Material</th><th>Cantidad</th><th>Unidad</th><th>Costo</th></tr>
      <tr><td>Cemento</td><td>${cemento}</td><td>sacos</td><td>${moneda} ${redondear(cCemento)}</td></tr>
      <tr><td>Arena</td><td>${arena}</td><td>m³</td><td>${moneda} ${redondear(cArena)}</td></tr>
      <tr><td>Grava</td><td>${grava}</td><td>m³</td><td>${moneda} ${redondear(cGrava)}</td></tr>
      <tr><td>Acero</td><td>${acero}</td><td>kg</td><td>${moneda} ${redondear(cAcero)}</td></tr>
    </table>

    <h3>Total: ${moneda} ${total}</h3>
  `;
}
