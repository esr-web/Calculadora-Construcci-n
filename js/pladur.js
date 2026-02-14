// ====== Función para calcular el área automáticamente ======
function calcularAreaPladur() {
  const largo = parseFloat(document.getElementById("pld_largo").value) || 0;
  const alto = parseFloat(document.getElementById("pld_alto").value) || 0;
  const area = largo * alto;
  document.getElementById("pld_area").textContent = area.toFixed(2);
  return area;
}

// ====== Mostrar los materiales según tipo de construcción ======
function mostrarMaterialesPladur() {
  const tipoCara = document.getElementById("pld_cara").value;
  // Aquí podrías actualizar la UI si quieres mostrar/ocultar materiales
}

// ====== Función principal para calcular Pladur ======
function calcularPladur() {
  const area = calcularAreaPladur();
  const tipoCara = document.getElementById("pld_cara").value;

  if (area <= 0) {
    alert("Introduce un área válida para el muro");
    return;
  }

  const factorCara = (tipoCara === "doble") ? 2 : 1;

  // ====== CONSUMOS ======
  const placas = Math.ceil((area / 2.88) * factorCara); // 1.2 x 2.4 = 2.88 m² por plancha
  const tornillos = Math.ceil(area * 25 * factorCara); // tornillos por m²
  const sacosMasilla = Math.ceil((area * 0.6 * factorCara) / 25); // kg / 25kg por saco
  const rollosCinta = Math.ceil((area * 1.2 * factorCara) / 30); // m / 30m por rollo

  // Perfiles metálicos (NO se duplican para doble cara)
  const perfilesVerticales = Math.ceil(area * 2.5);
  const perfilesHorizontales = Math.ceil(area * 1.0);

  // ====== PRECIOS UNITARIOS ======
  const precioPlaca = 12;      // CUP por plancha 1.2x2.4
  const precioTornillo = 0.05; // CUP por unidad
  const precioMasilla = 15;    // CUP por saco de 25 kg
  const precioCinta = 6;       // CUP por rollo de 30 m
  const precioPerfil = 4;      // CUP por metro de perfil

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
        <td>${placas} ud</td>
        <td>${precioPlaca.toFixed(2)}</td>
        <td>${costoPlaca.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Tornillos</td>
        <td>${tornillos} ud</td>
        <td>${precioTornillo.toFixed(2)}</td>
        <td>${costoTornillos.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Masilla (25 kg/saco)</td>
        <td>${sacosMasilla} sacos</td>
        <td>${precioMasilla.toFixed(2)}</td>
        <td>${costoMasilla.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Cinta de juntas (30 m/rollo)</td>
        <td>${rollosCinta} rollos</td>
        <td>${precioCinta.toFixed(2)}</td>
        <td>${costoCinta.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Perfiles metálicos</td>
        <td>${perfilesVerticales + perfilesHorizontales} m</td>
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
