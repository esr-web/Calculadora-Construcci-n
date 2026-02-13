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

  // Precios base en CUP
  const precioBloqueCUP = PRECIOS.bloque_15;
  const precioCementoCUP = PRECIOS.cemento;
  const precioArenaCUP = PRECIOS.arena;

  // Tipo de cambio
  const cambioUSD = Number(document.getElementById("cambio_usd_muro").value);
  const cambioEUR = Number(document.getElementById("cambio_eur_muro").value);

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

  let totalCUP = 0;

  if (usarCostos) {
    const costoBloquesCUP = bloques * precioBloqueCUP;
    const costoCementoCUP = cemento * precioCementoCUP;
    const costoArenaCUP = arena * precioArenaCUP;

    totalCUP = costoBloquesCUP + costoCementoCUP + costoArenaCUP;

    // Conversión para mostrar
    const costoBloquesUSD = (costoBloquesCUP / cambioUSD).toFixed(2);
    const costoCementoUSD = (costoCementoCUP / cambioUSD).toFixed(2);
    const costoArenaUSD = (costoArenaCUP / cambioUSD).toFixed(2);
    const totalUSD = (totalCUP / cambioUSD).toFixed(2);

    const costoBloquesEUR = (costoBloquesCUP / cambioEUR).toFixed(2);
    const costoCementoEUR = (costoCementoCUP / cambioEUR).toFixed(2);
    const costoArenaEUR = (costoArenaCUP / cambioEUR).toFixed(2);
    const totalEUR = (totalCUP / cambioEUR).toFixed(2);

    html += `
      <tr><td>Bloques 15 cm</td><td>${bloques}</td><td>u</td><td>${costoBloquesCUP} CUP / ${costoBloquesUSD} USD / ${costoBloquesEUR} EUR</td></tr>
      <tr><td>Cemento</td><td>${cemento}</td><td>sacos</td><td>${costoCementoCUP} CUP / ${costoCementoUSD} USD / ${costoCementoEUR} EUR</td></tr>
      <tr><td>Arena</td><td>${arena}</td><td>m³</td><td>${costoArenaCUP} CUP / ${costoArenaUSD} USD / ${costoArenaEUR} EUR</td></tr>
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
    ${usarCostos ? `<h3>Total: ${totalCUP} CUP / ${totalUSD} USD / ${totalEUR} EUR</h3>` : ""}
  `;

  document.getElementById("resultado").innerHTML = html;
}