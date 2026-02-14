function calcularMuro() {

  const largo = parseFloat(document.getElementById("largo").value);
  const alto = parseFloat(document.getElementById("alto").value);
  const desperdicio = parseFloat(document.getElementById("desperdicio").value || 0);
  const tipoBloque = document.getElementById("tipo_bloque").value;
  const moneda = document.getElementById("moneda").value;

  if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const area = largo * alto;

  // Consumos normativos aproximados
  const bloquesPorM2 = 12.5;

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

  const factor = 1 + desperdicio / 100;

  bloques = Math.ceil(bloques * factor);
  cemento = (cemento * factor).toFixed(2);
  arena = (arena * factor).toFixed(3);

  const pBloque = parseFloat(document.getElementById("precio_bloque_muro").value);
  const pCemento = parseFloat(document.getElementById("precio_cemento_muro").value);
  const pArena = parseFloat(document.getElementById("precio_arena_muro").value);

  const cBloques = bloques * pBloque;
  const cCemento = cemento * pCemento;
  const cArena = arena * pArena;

  const total = cBloques + cCemento + cArena;

  document.getElementById("resultado").innerHTML = `
    <h3>Resultados Muro de Bloques</h3>
    <p><b>Área:</b> ${area.toFixed(2)} m²</p>

    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (${moneda})</th>
      </tr>
      <tr>
        <td>Bloque ${tipoBloque} cm</td>
        <td>${bloques}</td>
        <td>u</td>
        <td>${cBloques.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Cemento</td>
        <td>${cemento}</td>
        <td>sacos</td>
        <td>${cCemento.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Arena</td>
        <td>${arena}</td>
        <td>m³</td>
        <td>${cArena.toFixed(2)}</td>
      </tr>
    </table>

    <h3>Total: ${total.toFixed(2)} ${moneda}</h3>
  `;
}
document.getElementById("moneda").addEventListener("change", function () {
  const moneda = this.value;
  document.getElementById("tituloPrecios").innerHTML = `
    Precios (${moneda})
    <select id="moneda">
      <option value="CUP" ${moneda === "CUP" ? "selected" : ""}>CUP</option>
      <option value="USD" ${moneda === "USD" ? "selected" : ""}>USD</option>
    </select>
  `;
});
