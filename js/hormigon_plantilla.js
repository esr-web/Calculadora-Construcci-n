function calcularHA() {
  const tipo = document.getElementById("ha_tipo").value;
  const l = Number(document.getElementById("ha_largo").value);
  const a = Number(document.getElementById("ha_ancho").value);
  const h = Number(document.getElementById("ha_alto").value);

  const desperdicio = Number(document.getElementById("desperdicio").value);
  const moneda = document.getElementById("moneda").value;

  if (l <= 0 || a <= 0 || h <= 0) {
    alert("Dimensiones inválidas");
    return;
  }

  // Cuantías típicas (kg/m³)
  const cuantias = {
    zapata: 90,
    columna: 160,
    viga: 130
  };

  const aceroKgM3 = cuantias[tipo];

  // Volumen
  let volumen = l * a * h;
  volumen = aplicarDesperdicio(volumen, desperdicio);

  // Dosificación típica 1:2:3
  const cemento = redondear(volumen * 7.5);
  const arena = redondear(volumen * 0.50, 3);
  const grava = redondear(volumen * 0.70, 3);
  const acero = redondear(volumen * aceroKgM3);

  // Costos base USD
  const cCemento = convertirMoneda(costo(cemento, PRECIOS.cemento), moneda);
  const cArena   = convertirMoneda(costo(arena, PRECIOS.arena), moneda);
  const cGrava   = convertirMoneda(costo(grava, 30), moneda);
  const cAcero   = convertirMoneda(costo(acero, 1.20), moneda);

  const total = redondear(cCemento + cArena + cGrava + cAcero);

  document.getElementById("resHA").innerHTML = `
    <h3>Resultado – ${tipo.toUpperCase()}</h3>
    <p><b>Volumen:</b> ${redondear(volumen)} m³</p>

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
