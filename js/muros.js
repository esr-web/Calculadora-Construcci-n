function calcularMuro() {

  const largo = Number(document.getElementById("largo").value);
  const alto = Number(document.getElementById("alto").value);
  const desperdicio = Number(document.getElementById("desperdicio").value) || 0;
  const moneda = document.getElementById("moneda").value;
  const usarCostos = document.getElementById("costos").checked;

  if (largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const area = largo * alto;

  /* === DATOS TÉCNICOS === */
  const bloquesPorM2 = 12.5;
  const cementoPorM2 = 0.25;
  const arenaPorM2 = 0.018;

  /* === CANTIDADES === */
  let bloques = aplicarDesperdicio(area * bloquesPorM2, desperdicio);
  let cemento = aplicarDesperdicio(area * cementoPorM2, desperdicio);
  let arena = aplicarDesperdicio(area * arenaPorM2, desperdicio);

  bloques = redondear(bloques);
  cemento = redondear(cemento);
  arena = redondear(arena, 3);

  /* === PRECIOS (SIEMPRE EN CUP) === */
  const precioBloqueCUP = Number(document.getElementById("precio_bloque_muro").value) || 0;
  const precioCementoCUP = Number(document.getElementById("precio_cemento_muro").value) || 0;
  const precioArenaCUP = Number(document.getElementById("precio_arena_muro").value) || 0;

  /* === TIPOS DE CAMBIO === */
  const cambioUSD = Number(document.getElementById("cambio_usd_muro").value) || 1;
  const cambioEUR = Number(document.getElementById("cambio_eur_muro").value) || 1;

  /* === COSTOS EN CUP === */
  const costoBloquesCUP = usarCostos ? bloques * precioBloqueCUP : 0;
  const costoCementoCUP = usarCostos ? cemento * precioCementoCUP : 0;
  const costoArenaCUP = usarCostos ? arena * precioArenaCUP : 0;

  const totalCUP = costoBloquesCUP + costoCementoCUP + costoArenaCUP;

  /* === FUNCIÓN PARA MOSTRAR COSTOS === */
  function mostrarCosto(costoCUP) {
    if (!usarCostos) return "-";

    switch (moneda) {
      case "USD":
        return `
          ${(costoCUP / cambioUSD).toFixed(2)} USD<br>
          ${costoCUP.toFixed(2)} CUP<br>
          ${(costoCUP / cambioEUR).toFixed(2)} EUR
        `;
      case "EUR":
        return `
          ${(costoCUP / cambioEUR).toFixed(2)} EUR<br>
          ${costoCUP.toFixed(2)} CUP<br>
          ${(costoCUP / cambioUSD).toFixed(2)} USD
        `;
      default: // CUP
        return `
          ${costoCUP.toFixed(2)} CUP<br>
          ${(costoCUP / cambioUSD).toFixed(2)} USD<br>
          ${(costoCUP / cambioEUR).toFixed(2)} EUR
        `;
    }
  }

  /* === RESULTADO === */
  let html = `
    <h3>Resultados</h3>
    <p><b>Área del muro:</b> ${redondear(area)} m²</p>

    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo</th>
      </tr>

      <tr>
        <td>Bloques 15 cm</td>
        <td>${bloques}</td>
        <td>u</td>
        <td>${mostrarCosto(costoBloquesCUP)}</td>
      </tr>

      <tr>
        <td>Cemento</td>
        <td>${cemento}</td>
        <td>sacos</td>
        <td>${mostrarCosto(costoCementoCUP)}</td>
      </tr>

      <tr>
        <td>Arena</td>
        <td>${arena}</td>
        <td>m³</td>
        <td>${mostrarCosto(costoArenaCUP)}</td>
      </tr>
    </table>

    ${usarCostos ? `<h3>Total</h3><p>${mostrarCosto(totalCUP)}</p>` : ""}
  `;

  document.getElementById("resultado").innerHTML = html;
}