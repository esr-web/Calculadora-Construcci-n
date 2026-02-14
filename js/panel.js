// Precios por defecto en CUP
const PRECIOS_PLADUR = {
  placas: 120,   // precio por m²
  vigas: 50,     // precio por unidad
  masilla: 15,   // precio por m²
  cinta: 5       // precio por m²
};

// Materiales disponibles
const MATERIALES_PLADUR = ["placas", "vigas", "masilla", "cinta"];

// Generar inputs de materiales
function mostrarMaterialesPladur() {
  const container = document.getElementById("pld_materiales");
  container.innerHTML = "<h3>Precios Muro de Pladur (CUP)</h3>";

  MATERIALES_PLADUR.forEach(mat => {
    // Solo mostrar vigas si hay placas (siempre hay placas, pero se deja lógico)
    let label = document.createElement("label");
    label.textContent = mat.charAt(0).toUpperCase() + mat.slice(1) + 
      (mat === "vigas" ? " (CUP por unidad)" : " (CUP por m²)");

    let input = document.createElement("input");
    input.type = "number";
    input.id = `precio_${mat}_pld`;
    input.value = PRECIOS_PLADUR[mat];
    input.step = 1;

    container.appendChild(label);
    container.appendChild(input);
  });
}

// Ejecutar al cargar la página
mostrarMaterialesPladur();

// Calcular área automáticamente
function calcularAreaPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);
  const area = (largo > 0 && alto > 0) ? largo * alto : 0;
  document.getElementById("pld_area").textContent = area.toFixed(2);
}

// Función principal de cálculo
function calcularPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);
  const area = largo * alto;
  const cara = document.getElementById("pld_cara").value; // una o doble
  const usarCostos = document.getElementById("pld_costos").checked;

  if (largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const factor = (cara === "doble") ? 2 : 1;

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
  `;

  let total = 0;

  MATERIALES_PLADUR.forEach(mat => {
    let cantidad, unidad, costo;
    const precio = Number(document.getElementById(`precio_${mat}_pld`).value);

    if (mat === "placas" || mat === "masilla" || mat === "cinta") {
      cantidad = area * factor;
      unidad = "m²";
      costo = precio * cantidad;
    } else if (mat === "vigas") {
      cantidad = Math.ceil(area / 3); // Una viga cada 3 m² aprox
      unidad = "u";
      costo = precio * cantidad;
    }

    if (!usarCostos) costo = "-";

    total += (typeof costo === "number") ? costo : 0;

    html += `
      <tr>
        <td>${mat.charAt(0).toUpperCase() + mat.slice(1)}</td>
        <td>${cantidad}</td>
        <td>${unidad}</td>
        <td>${typeof costo === "number" ? costo.toFixed(2) : "-"}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <h3>Total: ${usarCostos ? total.toFixed(2) : "-"} CUP</h3>
  `;

  document.getElementById("resultadoPladur").innerHTML = html;
}