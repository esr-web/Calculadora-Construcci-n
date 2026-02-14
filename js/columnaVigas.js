function calcularColumnasVigas() {
  const tipo = document.getElementById("tipo_elemento").value;
  const largo = Number(document.getElementById("cv_largo").value);
  const ancho = Number(document.getElementById("cv_ancho").value);
  const alto  = Number(document.getElementById("cv_alto").value);

  if (!largo || !ancho || !alto) {
    alert("Complete todas las dimensiones");
    return;
  }

  const volumen = largo * ancho * alto;

  // ====== Consumos estándar por m³ ======
  let cemento, arena, grava;

  cemento = volumen * 7;   // sacos
  arena   = volumen * 0.5; // m³
  grava   = volumen * 0.8; // m³

  // ====== Cercos de acero Ø 6 mm ======
  let acero;

  if(tipo === "columna") {
    // Columna: 4 cercos verticales, altura total
    acero = 4 * alto * 1; // 1 m de perímetro por cercos, se ajusta a la altura
  } else {
    // Viga: acero en perímetro de sección, supongamos 4 barras longitudinales + estribos cada 0.2 m
    const barrasLongitudinales = 4 * largo;
    const numEstribos = Math.ceil(largo / 0.2);
    const perimetroEstribo = 2 * (ancho + alto); // rectangular
    acero = barrasLongitudinales + (numEstribos * perimetroEstribo);
  }

  // Peso acero por metro
  const pesoPorMetro = 0.222; // Ø6 mm

  acero = acero * pesoPorMetro; // kg

  // ====== Precios ======
  const pCemento = Number(document.getElementById("precio_cemento_cv").value);
  const pArena   = Number(document.getElementById("precio_arena_cv").value);
  const pGrava   = Number(document.getElementById("precio_grava_cv").value);
  const pAcero   = Number(document.getElementById("precio_acero_cv").value);

  // ====== Costos ======
  const cCemento = cemento * pCemento;
  const cArena   = arena * pArena;
  const cGrava   = grava * pGrava;
  const cAcero   = acero * pAcero;

  const total = cCemento + cArena + cGrava + cAcero;

  // ====== Resultados ======
  document.getElementById("resultadoCV").innerHTML = `
    <h3>Resultados ${tipo === "columna" ? "Columna" : "Viga"}</h3>
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
        <td>Acero Ø6 mm</td>
        <td>${acero.toFixed(2)}</td>
        <td>kg</td>
        <td>${cAcero.toFixed(2)}</td>
      </tr>
      <tr class="total">
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>${total.toFixed(2)}</strong></td>
      </tr>
    </table>
  `;
}
