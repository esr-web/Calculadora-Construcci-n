// ===============================
// MURO DE LADRILLOS
// ===============================

function calcularMuroLadrillo() {

  const largo = Number(document.getElementById("l_largo").value);
  const alto = Number(document.getElementById("l_alto").value);
  const tipoLadrillo = document.getElementById("l_tipo_ladrillo").value;
  const colocacion = document.getElementById("l_colocacion").value;
  const desperdicio = Number(document.getElementById("l_desperdicio").value) / 100;

  if (!largo || !alto) {
    alert("Complete todas las dimensiones");
    return;
  }

  const area = largo * alto;

  // Consumo de ladrillos por m²
  const consumoLadrillo = {
    macizo: {
      citara: 50,
      citara_y_media: 75,
      aparejo: 60
    },
    hueco: {
      citara: 40,
      citara_y_media: 60,
      aparejo: 50
    }
  };

  const ladrillosBase = area * consumoLadrillo[tipoLadrillo][colocacion];
  const ladrillos = ladrillosBase * (1 + desperdicio);

  // Mortero (aproximaciones técnicas)
  const mortero = area * (
    colocacion === "citara" ? 0.02 :
    colocacion === "citara_y_media" ? 0.03 : 0.025
  );

  const cemento = mortero * 7; // sacos
  const arena = mortero;       // m³

  // Precios
  const pLadrillo = Number(document.getElementById("precio_ladrillo").value);
  const pCemento = Number(document.getElementById("precio_cemento_l").value);
  const pArena = Number(document.getElementById("precio_arena_l").value);

  const cLadrillo = ladrillos * pLadrillo;
  const cCemento = cemento * pCemento;
  const cArena = arena * pArena;

  const total = cLadrillo + cCemento + cArena;

  document.getElementById("resultadoLadrillo").innerHTML = `
    <h3>Resultados Muro de Ladrillos</h3>

    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Ladrillos</td>
        <td>${ladrillos.toFixed(0)}</td>
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