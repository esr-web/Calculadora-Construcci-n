// Precios por defecto
let PRECIOS_PLADUR = {
  placa: 50,      // CUP por placa
  viga: 120,      // CUP por viga metálica
  masilla: 80,    // CUP por saco
  cinta: 30       // CUP por rollo
};

// Función para mostrar los materiales según el tipo de cara
function mostrarMaterialesPladur() {
  const container = document.getElementById("pld_materiales");
  container.innerHTML = `
    <h3>Precios Muro de Pladur (CUP)</h3>
    <label>Placa de pladur (CUP / unidad)</label>
    <input type="number" id="precio_placa_pld" value="${PRECIOS_PLADUR.placa}" step="1">

    <label>Viga metálica (CUP / unidad)</label>
    <input type="number" id="precio_viga_pld" value="${PRECIOS_PLADUR.viga}" step="1">

    <label>Masilla (CUP / saco)</label>
    <input type="number" id="precio_masilla_pld" value="${PRECIOS_PLADUR.masilla}" step="1">

    <label>Cinta para juntas (CUP / rollo)</label>
    <input type="number" id="precio_cinta_pld" value="${PRECIOS_PLADUR.cinta}" step="1">
  `;
}

// Ejecutar al cargar
mostrarMaterialesPladur();

// Función para calcular área automáticamente
function calcularAreaPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);
  const area = largo > 0 && alto > 0 ? largo * alto : 0;
  document.getElementById("pld_area").innerText = area.toFixed(2);
  return area;
}

// Función para calcular los materiales y costos
function calcularPladur() {
  const area = calcularAreaPladur();
  if (area <= 0) {
    alert("Ingrese dimensiones válidas para el muro");
    return;
  }

  const cara = document.getElementById("pld_cara").value;
  const usarCostos = document.getElementById("pld_costos").checked;

  // Cantidades básicas por m²
  const placasPorM2 = 1;      // 1 placa por m² (ejemplo)
  const vigasPorM2 = 0.2;     // 1 viga cada 5 m²
  const masillaPorM2 = 0.1;   // 0.1 saco por m²
  const cintaPorM2 = 0.05;    // 0.05 rollo por m²

  let factor = cara === "doble" ? 2 : 1;

  let placas = redondear(area * placasPorM2 * factor);
  let vigas = redondear(area * vigasPorM2 * factor);
  let masilla = redondear(area * masillaPorM2 * factor, 2);
  let cinta = redondear(area * cintaPorM2 * factor, 2);

  // Tomar precios de los inputs
  const precio_placa = Number(document.getElementById("precio_placa_pld").value);
  const precio_viga = Number(document.getElementById("precio_viga_pld").value);
  const precio_masilla = Number(document.getElementById("precio_masilla_pld").value);
  const precio_cinta = Number(document.getElementById("precio_cinta_pld").value);

  let html = `
    <h3>Resultados</h3>
    <p><b>Área del muro:</b> ${area.toFixed(2)} m²</p>
    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Placas de pladur</td><td>${placas}</td><td>u</td><td>${usarCostos ? redondear(placas * precio_placa) : '-'}</td>
      </tr>
      <tr>
        <td>Vigas metálicas</td><td>${vigas}</td><td>u</td><td>${usarCostos ? redondear(vigas * precio_viga) : '-'}</td>
      </tr>
      <tr>
        <td>Masilla</td><td>${masilla}</td><td>sacos</td><td>${usarCostos ? redondear(masilla * precio_masilla) : '-'}</td>
      </tr>
      <tr>
        <td>Cinta para juntas</td><td>${cinta}</td><td>rollos</td><td>${usarCostos ? redondear(cinta * precio_cinta) : '-'}</td>
      </tr>
    </table>
  `;

  if (usarCostos) {
    const total = placas * precio_placa + vigas * precio_viga + masilla * precio_masilla + cinta * precio_cinta;
    html += `<h3>Total: CUP ${redondear(total)}</h3>`;
  }

  document.getElementById("resultadoPladur").innerHTML = html;
}

// Función auxiliar de redondeo
function redondear(num, decimales = 0) {
  return Number(Math.round(num + "e" + decimales) + "e-" + decimales);
}