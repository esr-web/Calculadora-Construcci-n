function calcularMuro() {

  const largo = parseFloat(document.getElementById("largo").value);
  const alto = parseFloat(document.getElementById("alto").value);
  const desperdicio = parseFloat(document.getElementById("desperdicio").value || 0);
  const tipoBloque = document.getElementById("tipo_bloque").value;

  if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const area = largo * alto;

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

  bloques *= 1 + desperdicio / 100;
  cemento *= 1 + desperdicio / 100;
  arena *= 1 + desperdicio / 100;

  bloques = Math.ceil(bloques);
  cemento = cemento.toFixed(2);
  arena = arena.toFixed(3);

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
      <tr><th>Material</th><th>Cantidad</th><th>Unidad</th><th>Costo (CUP)</th></tr>
      <tr><td>Bloques ${tipoBloque} cm</td><td>${bloques}</td><td>u</td><td>${cBloques.toFixed(2)}</td></tr>
      <tr><td>Cemento</td><td>${cemento}</td><td>sacos</td><td>${cCemento.toFixed(2)}</td></tr>
      <tr><td>Arena</td><td>${arena}</td><td>m³</td><td>${cArena.toFixed(2)}</td></tr>
    </table>
<input type="number" class="precio-input" id="precio_cemento_ha" value="150">

    <h3>Total: ${total.toFixed(2)} CUP</h3>
  `;
}
document.getElementById("monedaSwitch").addEventListener("change", function () {
  monedaActual = this.checked ? "USD" : "CUP";
  convertirPrecios();
  recalcularTodo();
});
let monedaActual = "CUP";
const tasaCambio = 120; // 1 USD = 120 CUP (ajústalo cuando quieras)
document.getElementById("monedaSwitch").addEventListener("change", function () {
  monedaActual = this.checked ? "USD" : "CUP";
  convertirPrecios();
  recalcularTodo();
});
function convertirPrecios() {
  const precios = document.querySelectorAll(".precio-input");

  precios.forEach(input => {
    let valor = parseFloat(input.value) || 0;

    if (monedaActual === "USD") {
      input.value = (valor / tasaCambio).toFixed(2);
    } else {
      input.value = (valor * tasaCambio).toFixed(0);
    }
  });
}
function formatearPrecio(valor) {
  if (monedaActual === "USD") {
    return `$${valor.toFixed(2)} USD`;
  }
  return `${valor.toFixed(0)} CUP`;
}
function recalcularTodo() {
  if (typeof calcularHormigon === "function") calcularHormigon();
  if (typeof calcularZinc === "function") calcularZinc();
  if (typeof calcularColumnasVigas === "function") calcularColumnasVigas();
  // agrega aquí los demás cálculos
}
