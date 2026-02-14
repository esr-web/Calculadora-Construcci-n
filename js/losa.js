function calcularLosa() {
  const largo = Number(document.getElementById("l_losa").value);
  const ancho = Number(document.getElementById("a_losa").value);
  const espesor = Number(document.getElementById("e_losa").value);
  const diametro = Number(document.getElementById("d_losa").value);

  if (!largo || !ancho || !espesor) {
    alert("Complete todas las dimensiones");
    return;
  }

  const volumen = largo * ancho * espesor; // m³ de losa

  // Consumos estándar por m³ de losa
  const cemento = volumen * 7;     // sacos
  const arena = volumen * 0.5;     // m³
  const grava = volumen * 0.8;     // m³

  // Acero en kg/m³ según norma para losas (aprox. 80 kg/m³)
  const pesoPorMetro = {
    6: 0.222,
    8: 0.395,
    10: 0.617,
    12: 0.888,
    14: 1.21,
    16: 1.58
  };

  const acero = volumen * 80 * pesoPorMetro[diametro]; 

  // Precios
  const pCemento = Number(document.getElementById("precio_cemento_losa").value);
  const pArena = Number(document.getElementById("precio_arena_losa").value);
  const pGrava = Number(document.getElementById("precio_grava_losa").value);
  const pAcero = Number(document.getElementById("precio_acero_losa").value);

  // Costos
  const cCemento = cemento * pCemento;
  const cArena = arena * pArena;
  const cGrava = grava * pGrava;
  const cAcero = acero * pAcero;

  const total = cCemento + cArena + cGrava + cAcero;

  document.getElementById("resultadoLosa").innerHTML = `
    <h3>Resultados Losa de Hormigón</h3>
    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Cemento</td>
        <td>${cemento.toFixed(1)}</td>
        <td>sacos</td>
        <td>${cCemento.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Arena</td>
        <td>${arena.toFixed(2)}</td>
        <td>m³</td>
        <td>${cArena.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Grava</td>
        <td>${grava.toFixed(2)}</td>
        <td>m³</td>
        <td>${cGrava.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Acero Ø ${diametro}</td>
        <td>${acero.toFixed(2)}</td>
        <td>kg</td>
        <td>${cAcero.toFixed(2)}</td>
      </tr>
      <tr class="total">
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>${total.toFixed(2)}</strong></td>
      </tr>
    </table>
  `;
}
