// Función para redondear
function redondear(valor, decimales = 2) {
  return Number(valor.toFixed(decimales));
}

// Función para aplicar desperdicio
function aplicarDesperdicio(cantidad, porcentaje) {
  return cantidad * (1 + porcentaje / 100);
}

// Función principal
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

  // Datos técnicos
  const bloquesPorM2 = 12.5;
  const cementoPorM2 = 0.25;
  const arenaPorM2 = 0.018;

  // Cantidades con desperdicio
  let bloques = redondear(aplicarDesperdicio(area * bloquesPorM2, desperdicio));
  let cemento = redondear(aplicarDesperdicio(area * cementoPorM2, desperdicio));
  let arena = redondear(aplicarDesperdicio(area * arenaPorM2, desperdicio), 3);

  // Precios base en CUP
  const precioBloqueCUP = PRECIOS.bloque_15;
  const precioCementoCUP = PRECIOS.cemento;
  const precioArenaCUP = PRECIOS.arena;

  // Tipo de cambio
  const cambioUSD = Number(document.getElementById("cambio_usd_muro").value) || 1;
  const cambioEUR = Number(document.getElementById("cambio_eur_muro").value) || 1;

  // Calcular costos en CUP
  const costoBloquesCUP = usarCostos ? bloques * precioBloqueCUP : 0;
  const costoCementoCUP = usarCostos ? cemento * precioCementoCUP : 0;
  const costoArenaCUP = usarCostos ? arena * precioArenaCUP : 0;

  const totalCUP = costoBloquesCUP + costoCementoCUP + costoArenaCUP;
  const totalUSD = (totalCUP / cambioUSD).toFixed(2);
  const totalEUR = (totalCUP / cambioEUR).toFixed(2);

  // Función auxiliar para mostrar costos según la moneda seleccionada
  
      function mostrarCosto(costoCUP) {
    if (!document.getElementById("costos").checked) return "-";
    const moneda = document.getElementById("moneda").value;
    const cambioUSD = Number(document.getElementById("cambio_usd_muro").value) || 1;
    const cambioEUR = Number(document.getElementById("cambio_eur_muro").value) || 1;

    switch (moneda) {
        case "USD":
            return `${(costoCUP / cambioUSD).toFixed(2)} USD / ${costoCUP.toFixed(2)} CUP / ${(costoCUP / cambioEUR).toFixed(2)} EUR`;
        case "EUR":
            return `${(costoCUP / cambioEUR).toFixed(2)} EUR / ${costoCUP.toFixed(2)} CUP / ${(costoCUP / cambioUSD).toFixed(2)} USD`;
        case "CUP":
        default:
            return `${costoCUP.toFixed(2)} CUP / ${(costoCUP / cambioUSD).toFixed(2)} USD / ${(costoCUP / cambioEUR).toFixed(2)} EUR`;
    }
}

  // Construir HTML de resultados
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
      <tr><td>Bloques 15 cm</td><td>${bloques}</td><td>u</td><td>${mostrarCosto(costoBloquesCUP)}</td></tr>
      <tr><td>Cemento</td><td>${cemento}</td><td>sacos</td><td>${mostrarCosto(costoCementoCUP)}</td></tr>
      <tr><td>Arena</td><td>${arena}</td><td>m³</td><td>${mostrarCosto(costoArenaCUP)}</td></tr>
    </table>
    ${usarCostos ? `<h3>Total: ${mostrarCosto(totalCUP)}</h3>` : ""}
  `;

  document.getElementById("resultado").innerHTML = html;
}