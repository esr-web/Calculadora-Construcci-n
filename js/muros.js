function calcularMuro() {

  const largo = parseFloat(document.getElementById("largo").value);
  const alto = parseFloat(document.getElementById("alto").value);
  const desperdicio = parseFloat(document.getElementById("desperdicio").value || 0);
  const moneda = document.getElementById("moneda").value;
  const usarCostos = document.getElementById("costos").checked;
  const tipoBloque = document.getElementById("tipo_bloque").value;

  if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  // ======================
  // CÁLCULO GEOMÉTRICO
  // ======================
  const area = largo * alto;

  // ======================
  // CONSUMOS POR BLOQUE
  // ======================
  let bloquesPorM2 = 12.5;
  let cementoPorM2, arenaPorM2;

  if (tipoBloque === "10") {
    cementoPorM2 = 0.18;
    arenaPorM2 = 0.020;
  } else if (tipoBloque === "15") {
    cementoPorM2 = 0.20;
    arenaPorM2 = 0.025;
  } else {
    cementoPorM2 = 0.22;
    arenaPorM2 = 0.030;
  }

  let bloques = area * bloquesPorM2;
  let cemento = area * cementoPorM2;
  let arena = area * arenaPorM2;

  bloques *= (1 + desperdicio / 100);
  cemento *= (1 + desperdicio / 100);
  arena *= (1 + desperdicio / 100);

  bloques = Math.ceil(bloques);
  cemento = Number(cemento.toFixed(2));
  arena = Number(arena.toFixed(3));

  // ======================
  // PRECIOS (CUP BASE)
  // ======================
  const pBloque = parseFloat(document.getElementById("precio_bloque_muro").value);
  const pCemento = parseFloat(document.getElementById("precio_cemento_muro").value);
  const pArena = parseFloat(document.getElementById("precio_arena_muro").value);

  const cambioUSD = parseFloat(document.getElementById("cambio_usd_muro").value);
  const cambioEUR = parseFloat(document.getElementById("cambio_eur_muro").value);

  // ======================
  // COSTOS CUP
  // ======================
  let cBloques = bloques * pBloque;
  let cCemento = cemento * pCemento;
  let cArena = arena * pArena;

  let totalCUP = cBloques + cCemento + cArena;

  // ======================
  // CONVERSIÓN
  // ======================
  function convertir(valor) {
    if (moneda === "USD") return valor / cambioUSD;
    if (moneda === "EUR") return valor / cambioEUR;
    return valor;
  }

  function simbolo() {
    return moneda === "USD" ? "USD" : moneda === "EUR" ? "EUR" : "CUP";
  }

  // ======================
  // SALIDA (MISMO DISEÑO
  // QUE HORMIGÓN ARMADO)
  // ======================
  let html = `
    <h3>Resultados Muro de Bloques</h3>
    <p><b>Área:</b> ${area.toFixed(2)} m²</p>

    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo</th>
      </tr>

      <tr>
        <td>Bloques ${tipoBloque} cm</td>
        <td>${bloques}</td>
        <td>u</td>
        <td>${usarCostos ? convertir(cBloques).toFixed(2) + " " + simbolo() : "-"}</td>
      </tr>

      <tr>
        <td>Cemento</td>
        <td>${cemento}</td>
        <td>sacos</td>
        <td>${usarCostos ? convertir(cCemento).toFixed(2) + " " + simbolo() : "-"}</td>
      </tr>

      <tr>
        <td>Arena</td>
        <td>${arena}</td>
        <td>m³</td>
        <td>${usarCostos ? convertir(cArena).toFixed(2) + " " + simbolo() : "-"}</td>
      </tr>
    </table>
  `;

  if (usarCostos) {
    html += `
      <h3>Total: ${convertir(totalCUP).toFixed(2)} ${simbolo()}</h3>
    `;
  }

  document.getElementById("resultado").innerHTML = html;
}

// Mantener compatibilidad
function actualizarPreciosMuro() {
  alert("Precios de muros actualizados");
}