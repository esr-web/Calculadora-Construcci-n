function calcularZinc() {
  const largo = Number(document.getElementById("l_techo").value);
  const ancho = Number(document.getElementById("a_techo").value);
  const solape = Number(document.getElementById("solape").value) || 0.15;

  if (!largo || !ancho) {
    alert("Complete todas las dimensiones");
    return;
  }

  // ====== Ajuste por alero ======
  const alero = 0.4; // 40 cm alero
  const largoTotal = largo + 2 * alero;
  const anchoTotal = ancho + 2 * alero;

  // ====== Plancha de zinc ======
  const areaPlancha = 1 * 3; // m²
  const areaUtilPlancha = areaPlancha - (1 * solape); // descontando solape
  const cantidadPlanchas = Math.ceil((largoTotal * anchoTotal) / areaUtilPlancha);

  // ====== Purlins ======
  // Supongamos que cada purlin va cada 1 m a lo ancho del techo
  const distanciaPurlin = 1; // m
  const cantidadPurlins = Math.ceil(anchoTotal / distanciaPurlin) * 2; // 2 purlins por línea (aprox.)

  // ====== Tornillos autotaladrantes ======
  // Estimación: 6 tornillos por m²
  const tornillos = Math.ceil(largoTotal * anchoTotal * 6);

  // ====== Precios ======
  const precioPlaca = Number(document.getElementById("precio_zinc").value);
  const precioPurlin = Number(document.getElementById("precio_purlin").value);
  const precioTornillo = Number(document.getElementById("precio_tornillo").value);

  // ====== Costos ======
  const costoPlaca = cantidadPlanchas * precioPlaca;
  const costoPurlin = cantidadPurlins * precioPurlin;
  const costoTornillo = tornillos * precioTornillo;

  const total = costoPlaca + costoPurlin + costoTornillo;

  // ====== Tabla de resultados ======
  document.getElementById("resultadoZinc").innerHTML = `
    <h3>Resultados Cubierta de Zinc</h3>
    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Planchas de zinc (1x3 m)</td>
        <td>${cantidadPlanchas}</td>
        <td>unidades</td>
        <td>${costoPlaca.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Purlins metálicos</td>
        <td>${cantidadPurlins}</td>
        <td>m</td>
        <td>${costoPurlin.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Tornillos autotaladrantes</td>
        <td>${tornillos}</td>
        <td>ud</td>
        <td>${costoTornillo.toFixed(2)}</td>
      </tr>
      <tr class="total">
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>${total.toFixed(2)}</strong></td>
      </tr>
    </table>
  `;
}
