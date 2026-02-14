function calcularHormigon() {

  const largo = parseFloat(document.getElementById("h_largo").value);
  const ancho = parseFloat(document.getElementById("h_ancho").value);
  const alto = parseFloat(document.getElementById("h_alto").value);
  const cuantia = parseFloat(document.getElementById("h_acero").value);

  if (isNaN(largo) || isNaN(ancho) || isNaN(alto)) {
    alert("Ingrese dimensiones válidas");
    return;
  }

  const volumen = largo * ancho * alto;

  const cemento = volumen * 7.5;
  const arena = volumen * 0.5;
  const grava = volumen * 0.7;
  const acero = volumen * cuantia;

  const pCemento = parseFloat(document.getElementById("precio_cemento_ha").value);
  const pArena = parseFloat(document.getElementById("precio_arena_ha").value);
  const pGrava = parseFloat(document.getElementById("precio_grava_ha").value);
  const pAcero = parseFloat(document.getElementById("precio_acero_ha").value);

  const cCemento = cemento * pCemento;
  const cArena = arena * pArena;
  const cGrava = grava * pGrava;
  const cAcero = acero * pAcero;

  const total = cCemento + cArena + cGrava + cAcero;

  document.getElementById("resultadoHormigon").innerHTML = `
    <h3>Resultados Hormigón Armado</h3>
    <p><b>Volumen:</b> ${volumen.toFixed(2)} m³</p>

    <table>
      <tr><th>Material</th><th>Cantidad</th><th>Unidad</th><th>Costo (CUP)</th></tr>
      <tr><td>Cemento</td><td>${cemento.toFixed(2)}</td><td>sacos</td><td>${cCemento.toFixed(2)}</td></tr>
      <tr><td>Arena</td><td>${arena.toFixed(3)}</td><td>m³</td><td>${cArena.toFixed(2)}</td></tr>
      <tr><td>Grava</td><td>${grava.toFixed(3)}</td><td>m³</td><td>${cGrava.toFixed(2)}</td></tr>
      <tr><td>Acero</td><td>${acero.toFixed(0)}</td><td>kg</td><td>${cAcero.toFixed(2)}</td></tr>
    </table>

    <h3>Total: ${total.toFixed(2)} CUP</h3>
  `;
}
