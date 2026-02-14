// Datos de precios por defecto en CUP
const PRECIOS_PANEL = {
  pladur: 120,       // precio por m²
  madera: 80,        // precio por m²
  vigas_metalicas: 50 // precio por viga
};

// Materiales disponibles según tipo
const MATERIALES_PANEL = {
  pladur: ["pladur", "vigas_metalicas"],
  madera: ["madera"]
};

// Mostrar materiales según el tipo
function mostrarMaterialesPanel() {
  const tipo = document.getElementById("pl_tipo").value;
  const container = document.getElementById("pl_materiales");
  container.innerHTML = "<h3>Precios Panelería Ligera (CUP)</h3>";

  MATERIALES_PANEL[tipo].forEach(mat => {
    let label = document.createElement("label");
    label.textContent = mat === "vigas_metalicas" ? "Vigas metálicas (CUP por unidad)" :
                        mat.charAt(0).toUpperCase() + mat.slice(1) + " (CUP por m²)";
    let input = document.createElement("input");
    input.type = "number";
    input.id = `precio_${mat}_panel`;
    input.value = PRECIOS_PANEL[mat];
    input.step = 1;
    container.appendChild(label);
    container.appendChild(input);
  });
}

// Ejecutar al cargar la página
mostrarMaterialesPanel();

// Calcular área automáticamente
function calcularAreaPanel() {
  const largo = Number(document.getElementById("pl_largo").value);
  const alto = Number(document.getElementById("pl_alto").value);
  const area = largo > 0 && alto > 0 ? largo * alto : 0;
  document.getElementById("pl_area").textContent = area.toFixed(2);
}

// Función de cálculo principal
function calcularPanel() {
  const largo = Number(document.getElementById("pl_largo").value);
  const alto = Number(document.getElementById("pl_alto").value);
  const area = largo * alto;
  const tipo = document.getElementById("pl_tipo").value;
  const usarCostos = document.getElementById("pl_costos").checked;

  if (largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

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

  MATERIALES_PANEL[tipo].forEach(mat => {
    let cantidad, unidad, costo;

    if (mat === "pladur") {
      cantidad = area;
      unidad = "m²";
      costo = PRECIOS_PANEL[mat] * cantidad;
    } else if (mat === "madera") {
      cantidad = area;
      unidad = "m²";
      costo = PRECIOS_PANEL[mat] * cantidad;
    } else if (mat === "vigas_metalicas") {
      cantidad = Math.ceil(area / 3); // Una viga cada 3 m² aprox.
      unidad = "u";
      costo = PRECIOS_PANEL[mat] * cantidad;
    }

    if (!usarCostos) costo = "-";

    total += typeof costo === "number" ? costo : 0;

    html += `
      <tr>
        <td>${mat.replace("_"," ")}</td>
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

  document.getElementById("resultadoPanel").innerHTML = html;
}