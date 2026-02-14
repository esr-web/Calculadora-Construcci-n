// Función para actualizar área automáticamente
function actualizarArea() {
  const largo = Number(document.getElementById("l_largo").value) || 0;
  const alto = Number(document.getElementById("l_alto").value) || 0;
  const area = largo * alto;
  document.getElementById("l_area").textContent = area.toFixed(2);
}

// Función para calcular muro de ladrillos
function calcularMuroLadrillo() {
  const largo = Number(document.getElementById("l_largo").value);
  const alto = Number(document.getElementById("l_alto").value);
  const desperdicio = Number(document.getElementById("l_desperdicio").value);

  const tipoLadrillo = document.getElementById("tipo_ladrillo").value;
  const tipoColocacion = document.getElementById("tipo_colocacion").value;

  const pLadrillo = Number(document.getElementById("precio_ladrillo").value);
  const pCemento = Number(document.getElementById("precio_cemento_l").value);
  const pArena = Number(document.getElementById("precio_arena_l").value);

  if (largo <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const area = largo * alto;

  // Consumos técnicos por m²
  let ladrillosPorM2 = tipoLadrillo === "macizo" ? 50 : 25;
  let cementoPorM2 = tipoLadrillo === "macizo" ? 0.22 : 0.18;
  let arenaPorM2 = tipoLadrillo === "macizo" ? 0.02 : 0.018;

  // Ajuste por colocación
  if (tipoColocacion === "citara_y_media") {
    ladrillosPorM2 *= 1.5;
    cementoPorM2 *= 1.4;
    arenaPorM2 *= 1.4;
  } else if (tipoColocacion === "aparejo") {
    ladrillosPorM2 *= 1.2;
    cementoPorM2 *= 1.15;
    arenaPorM2 *= 1.15;
  }

  // Cantidades con desperdicio
  const ladrillos = Math.round(ladrillosPorM2 * area * (1 + desperdicio / 100));
  const cemento = (cementoPorM2 * area * (1 + desperdicio / 100)).toFixed(2);
  const arena = (arenaPorM2 * area * (1 + desperdicio / 100)).toFixed(3);

  // Costos
  const cLadrillo = (ladrillos * pLadrillo).toFixed(2);
  const cCemento = (cemento * pCemento).toFixed(2);
  const cArena = (arena * pArena).toFixed(2);
  const total = (Number(cLadrillo) + Number(cCemento) + Number(cArena)).toFixed(2);

  // Mostrar resultados en tabla igual a Hormigón Armado
  document.getElementById("resultadoLadrillo").innerHTML = `
    <h3>Resultados – Muro de Ladrillos</h3>
    <table>
      <tr>
        <th>Concepto</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Área del muro</td>
        <td>${area.toFixed(2)}</td>
        <td>m²</td>
        <td>-</td>
      </tr>
      <tr>
        <td>Ladrillos</td>
        <td>${ladrillos}</td>
        <td>u</td>
        <td>${cLadrillo}</td>
      </tr>
      <tr>
        <td>Cemento</td>
        <td>${cemento}</td>
        <td>sacos</td>
        <td>${cCemento}</td>
      </tr>
      <tr>
        <td>Arena</td>
        <td>${arena}</td>
        <td>m³</td>
        <td>${cArena}</td>
      </tr>
    </table>
    <h3>Total: ${total} CUP</h3>
  `;
}

// Conectar los eventos
document.addEventListener("DOMContentLoaded", () => {
  // Botón de calcular
  document.getElementById("btnCalcularLadrillo")
          .addEventListener("click", calcularMuroLadrillo);

  // Inputs de largo y alto actualizan el área automáticamente
  document.getElementById("l_largo").addEventListener("input", actualizarArea);
  document.getElementById("l_alto").addEventListener("input", actualizarArea);
});