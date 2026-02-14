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

  // Área
  const area = largo * alto;

  // Consumos técnicos (por m²)
  let ladrillosPorM2 = 0;
  let cementoPorM2 = 0;
  let arenaPorM2 = 0;

  if (tipoLadrillo === "macizo") {
    ladrillosPorM2 = 50;
    cementoPorM2 = 0.22;
    arenaPorM2 = 0.02;
  } else {
    ladrillosPorM2 = 25;
    cementoPorM2 = 0.18;
    arenaPorM2 = 0.018;
  }

  if (tipoColocacion === "citara_y_media") {
    ladrillosPorM2 *= 1.5;
    cementoPorM2 *= 1.4;
    arenaPorM2 *= 1.4;
  }

  // Cantidades
  let ladrillos = area * ladrillosPorM2;
  let cemento = area * cementoPorM2;
  let arena = area * arenaPorM2;

  // Desperdicio
  ladrillos *= (1 + desperdicio / 100);
  cemento *= (1 + desperdicio / 100);
  arena *= (1 + desperdicio / 100);

  // Costos
  const cLadrillo = ladrillos * pLadrillo;
  const cCemento = cemento * pCemento;
  const cArena = arena * pArena;

  const total = cLadrillo + cCemento + cArena;

  // Resultado (MISMO DISEÑO QUE HORMIGÓN)
  document.getElementById("resultadoLadrillo").innerHTML = `
    <h3>Resultados – Muro de Ladrillos</h3>

    <p><b>Área del muro:</b> ${area.toFixed(2)} m²</p>

    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Ladrillos</td>
        <td>${Math.round(ladrillos)}</td>
        <td>u</td>
        <td>${cLadrillo.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Cemento</td>
        <td>${cemento.toFixed(2)}</td>
        <td>sacos</td>
        <td>${cCemento.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Arena</td>
        <td>${arena.toFixed(3)}</td>
        <td>m³</td>
        <td>${cArena.toFixed(2)}</td>
      </tr>
    </table>

    <h3>Total: ${total.toFixed(2)} CUP</h3>
  `;
}