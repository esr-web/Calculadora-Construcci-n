function calcularMuro() {
  const largo = Number(document.getElementById("largo").value);
  const alto = Number(document.getElementById("alto").value);
  const desperdicio = Number(document.getElementById("desperdicio").value);
  const moneda = document.getElementById("moneda").value;
  const usarCostos = document.getElementById("costos").checked;

  if (largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const area = largo * alto;

  // Datos técnicos estándar
  const bloquesPorM2 = 12.5;
  const cementoPorM2 = 0.25;
  const arenaPorM2 = 0.018;

  let bloques = area * bloquesPorM2;
  let cemento = area * cementoPorM2;
  let arena = area * arenaPorM2;

  bloques = redondear(aplicarDesperdicio(bloques, desperdicio));
  cemento = redondear(aplicarDesperdicio(cemento, desperdicio));
  arena = redondear(aplicarDesperdicio(arena, desperdicio), 3);

  let html = `
    <h3>Resultados</h3>
    <p><b>Área:</b> ${redondear(area)} m²</p>
    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo</th>
      </tr>
  `;

  let total = 0;

  if (usarCostos) {
    const cBloque = convertirMoneda(costo(bloques, PRECIOS.bloque_15), moneda);
    const cCemento = convertirMoneda(costo(cemento, PRECIOS.cemento), moneda);
    const cArena = convertirMoneda(costo(arena, PRECIOS.arena), moneda);

    total = cBloque + cCemento + cArena;

    html += `
      <tr><td>Bloques 15 cm</td><td>${bloques}</td><td>u</td><td>${moneda} ${redondear(cBloque)}</td></tr>
      <tr><td>Cemento</td><td>${cemento}</td><td>sacos</td><td>${moneda} ${redondear(cCemento)}</td></tr>
      <tr><td>Arena</td><td>${arena}</td><td>m³</td><td>${moneda} ${redondear(cArena)}</td></tr>
    `;
  } else {
    html += `
      <tr><td>Bloques 15 cm</td><td>${bloques}</td><td>u</td><td>-</td></tr>
      <tr><td>Cemento</td><td>${cemento}</td><td>sacos</td><td>-</td></tr>
      <tr><td>Arena</td><td>${arena}</td><td>m³</td><td>-</td></tr>
    `;
  }

  html += `
    </table>
    <h3>Total: ${moneda} ${redondear(total)}</h3>
  `;

  document.getElementById("resultado").innerHTML = html;
}
