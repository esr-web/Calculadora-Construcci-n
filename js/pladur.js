// Calcula el área automáticamente
function calcularAreaPladur() {
  const largo = parseFloat(document.getElementById("pld_largo").value) || 0;
  const alto = parseFloat(document.getElementById("pld_alto").value) || 0;
  const area = largo * alto;
  document.getElementById("pld_area").textContent = area.toFixed(2);
  return area;
}

// Mostrar los inputs de precios
function mostrarMaterialesPladur() {
  const contenedor = document.getElementById("pld_materiales");
  contenedor.innerHTML = `
    <h3>Precios Muro de Pladur (CUP)</h3>
    <label>Precio placa (1.2 x 2.4 m) (CUP / ud)</label>
    <input type="number" id="precio_placa" value="12">

    <label>Precio tornillo (CUP / ud)</label>
    <input type="number" id="precio_tornillo" value="0.05">

    <label>Precio masilla (CUP / saco 25kg)</label>
    <input type="number" id="precio_masilla" value="15">

    <label>Precio cinta juntas (CUP / rollo 30m)</label>
    <input type="number" id="precio_cinta" value="6">

    <label>Precio perfil metálico (CUP / m)</label>
    <input type="number" id="precio_perfil" value="4">
  `;
}

// Cálculo definitivo proporcional
function calcularPladur() {
  const area = calcularAreaPladur();
  if (area <= 0) {
    alert("Introduce un área válida");
    return;
  }

  const tipoCara = document.getElementById("pld_cara").value;
  const factorCara = (tipoCara === "doble") ? 2 : 1;

  // ====== CONSUMOS ======
  const placas = area / 2.88 * factorCara; // Área proporcional a plancha
  const tornillos = area * 25 * factorCara; // Tornillos proporcional
  const sacosMasilla = (area * 0.6 * factorCara) / 25; // Masilla en sacos de 25kg
  const rollosCinta = (area * 1.2 * factorCara) / 30; // Cinta en rollos de 30m

  // Perfiles (NO se duplican)
  const perfilesVerticales = area * 2.5;
  const perfilesHorizontales = area * 1.0;

  // ====== PRECIOS desde inputs ======
  const precioPlaca = parseFloat(document.getElementById("precio_placa").value) || 0;
  const precioTornillo = parseFloat(document.getElementById("precio_tornillo").value) || 0;
  const precioMasilla = parseFloat(document.getElementById("precio_masilla").value) || 0;
  const precioCinta = parseFloat(document.getElementById("precio_cinta").value) || 0;
  const precioPerfil = parseFloat(document.getElementById("precio_perfil").value) || 0;

  // ====== COSTOS ======
  const costoPlaca = placas * precioPlaca;
  const costoTornillos = tornillos * precioTornillo;
  const costoMasilla = sacosMasilla * precioMasilla;
  const costoCinta = rollosCinta * precioCinta;
  const costoPerfiles = (perfilesVerticales + perfilesHorizontales) * precioPerfil;
  const costoTotal = costoPlaca + costoTornillos + costoMasilla + costoCinta + costoPerfiles;

  // ====== TABLA RESULTADOS ======
  const resultado = `
    <table class="tabla-resultados">
      <thead>
        <tr>
          <th>Material</th>
          <th>Cantidad</th>
          <th>Precio unitario (CUP)</th>
          <th>Costo (CUP)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Planchas de pladur</td>
          <td>${placas.toFixed(2)} ud</td>
          <td>${precioPlaca.toFixed(2)}</td>
          <td>${costoPlaca.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Tornillos</td>
          <td>${tornillos.toFixed(0)} ud</td>
          <td>${precioTornillo.toFixed(2)}</td>
          <td>${costoTornillos.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Masilla (25 kg)</td>
          <td>${sacosMasilla.toFixed(2)} sacos</td>
          <td>${precioMasilla.toFixed(2)}</td>
          <td>${costoMasilla.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Cinta de juntas (30 m)</td>
          <td>${rollosCinta.toFixed(2)} rollos</td>
          <td>${precioCinta.toFixed(2)}</td>
          <td>${costoCinta.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Perfiles metálicos</td>
          <td>${(perfilesVerticales + perfilesHorizontales).toFixed(2)} m</td>
          <td>${precioPerfil.toFixed(2)}</td>
          <td>${costoPerfiles.toFixed(2)}</td>
        </tr>
        <tr class="total">
          <td colspan="3"><strong>Total</strong></td>
          <td><strong>${costoTotal.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("resultadoPladur").innerHTML = resultado;
}
