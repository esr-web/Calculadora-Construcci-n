// pladur.js

function calcularAreaPladur() {
  const largo = parseFloat(document.getElementById("pld_largo").value);
  const alto = parseFloat(document.getElementById("pld_alto").value);
  if (!isNaN(largo) && !isNaN(alto)) {
    const area = largo * alto;
    document.getElementById("pld_area").innerText = area.toFixed(2);
  } else {
    document.getElementById("pld_area").innerText = "0";
  }
}

function mostrarMaterialesPladur() {
  const tipoCara = document.getElementById("pld_cara").value;
  const materialesDiv = document.getElementById("pld_materiales");
  
  materialesDiv.innerHTML = `
    <h3>Precios Muro de Pladur (CUP)</h3>
    <label>Planchas de pladur (1.2 x 2.4 m)</label>
    <input type="number" id="precio_placa" value="12">

    <label>Tornillos (por unidad)</label>
    <input type="number" id="precio_tornillo" value="0.05">

    <label>Masilla (25 kg por saco)</label>
    <input type="number" id="precio_masilla" value="15">

    <label>Cinta para juntas (rollo de 30 m)</label>
    <input type="number" id="precio_cinta" value="6">

    <label>Perfiles metálicos (m)</label>
    <input type="number" id="precio_perfil" value="4">
  `;
}

function calcularPladur() {
  const largo = parseFloat(document.getElementById("pld_largo").value);
  const alto = parseFloat(document.getElementById("pld_alto").value);
  const tipoCara = document.getElementById("pld_cara").value;

  if (isNaN(largo) || isNaN(alto) || largo <= 0 || alto <= 0) {
    alert("Introduce valores válidos de largo y alto.");
    return;
  }

  const area = largo * alto;
  const factorCara = (tipoCara === "doble") ? 2 : 1;

  // ====== CONSUMOS PROPORCIONALES ======
  const placaM2 = 2.88; // 1.2 x 2.4 m
  const placas = (area / placaM2) * factorCara;

  const tornillos = 25 * area * factorCara;
  const sacosMasilla = (0.6 * area * factorCara) / 25;
  const rollosCinta = (1.2 * area * factorCara) / 30;

  // Perfiles (NO se duplican en doble cara)
  const perfilesVerticales = 2.5 * area;
  const perfilesHorizontales = 1 * area;

  // ====== PRECIOS ======
  const precioPlaca = parseFloat(document.getElementById("precio_placa").value);
  const precioTornillo = parseFloat(document.getElementById("precio_tornillo").value);
  const precioMasilla = parseFloat(document.getElementById("precio_masilla").value);
  const precioCinta = parseFloat(document.getElementById("precio_cinta").value);
  const precioPerfil = parseFloat(document.getElementById("precio_perfil").value);

  // ====== COSTOS ======
  const costoPlaca = placas * precioPlaca;
  const costoTornillos = tornillos * precioTornillo;
  const costoMasilla = sacosMasilla * precioMasilla;
  const costoCinta = rollosCinta * precioCinta;
  const costoPerfiles = (perfilesVerticales + perfilesHorizontales) * precioPerfil;

  const costoTotal = costoPlaca + costoTornillos + costoMasilla + costoCinta + costoPerfiles;

  // ====== TABLA DE RESULTADOS ======
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
        <td>Planchas de pladur (1.2x2.4 m)</td>
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
        <td>${sacosMasilla.toFixed(3)} sacos</td>
        <td>${precioMasilla.toFixed(2)}</td>
        <td>${costoMasilla.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Cinta para juntas (rollo 30 m)</td>
        <td>${rollosCinta.toFixed(3)} rollos</td>
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
