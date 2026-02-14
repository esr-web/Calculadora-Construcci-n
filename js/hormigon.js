function calcularHormigon() {

  const largo = Number(document.getElementById("h_largo").value);
  const ancho = Number(document.getElementById("h_ancho").value);
  const alto  = Number(document.getElementById("h_alto").value);
  const diametro = Number(document.getElementById("h_diametro").value);

  if (largo <= 0 || ancho <= 0 || alto <= 0) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const volumen = largo * ancho * alto;

  // Consumos estándar por m³
  const cemento = volumen * 7;     // sacos
  const arena   = volumen * 0.5;   // m³
  const grava   = volumen * 0.8;   // m³

  // Peso del acero por metro según Ø (kg/m)
  const pesoPorMetro = {
    6: 0.222,
    8: 0.395,
    10: 0.617,
    12: 0.888,
    14: 1.21,
    16: 1.58,
    18: 2.00,
    20: 2.47,
    25: 3.85
  };

  // Longitud estimada de acero (simplificado)
  const longitudAcero = volumen * 80; // m
  const acero = longitudAcero * pesoPorMetro[diametro];

  // Precios CUP
  const pCemento = Number(document.getElementById("precio_cemento_ha").value);
  const pArena   = Number(document.getElementById("precio_arena_ha").value);
  const pGrava   = Number(document.getElementById("precio_grava_ha").value);
  const pAcero   = Number(document.getElementById("precio_acero_ha").value);

  const cCemento = cemento * pCemento;
  const cArena   = arena * pArena;
  const cGrava   = grava * pGrava;
  const cAcero   = acero * pAcero;

  const total = cCemento + cArena + cGrava + cAcero;

  let html = `
    <h3>Resultados Hormigón Armado</h3>
    <p><b>Volumen:</b> ${volumen.toFixed(2)} m³</p>

    <table>
      <tr>
        <th>Material</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Costo (CUP)</th>
      </tr>
      <tr>
        <td>Cemento</td>
        <td>${cemento.toFixed(1)}</td>
        <td>sacos</td>
        <td>${cCemento.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Arena</td>
        <td>${arena.toFixed(2)}</td>
        <td>m³</td>
        <td>${cArena.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Grava</td>
        <td>${grava.toFixed(2)}</td>
        <td>m³</td>
        <td>${cGrava.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Acero Ø ${diametro}</td>
        <td>${acero.toFixed(2)}</td>
        <td>kg</td>
        <td>${cAcero.toFixed(2)}</td>
      </tr>
    </table>

    <h3>Total: ${total.toFixed(2)} CUP</h3>
  `;

  document.getElementById("resultadoHormigon").innerHTML = html;
}
