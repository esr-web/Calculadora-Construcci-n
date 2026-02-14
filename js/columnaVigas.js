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
  const cemento = volumen * 7;   // sacos
  const arena   = volumen * 0.5; // m³
  const grava   = volumen * 0.8; // m³

  // ====== Acero ======
  let aceroPrincipal = 0; // Ø 12 mm
  let aceroCercos    = 0; // Ø 6 mm

  const peso12mm = 0.888; // kg/m para Ø12 mm
  const peso6mm  = 0.222; // kg/m para Ø6 mm

  if(tipo === "columna") {
    // Columna: 4 barras verticales Ø12 mm
    aceroPrincipal = 4 * alto * peso12mm;
    // Cercos: 4 cercos Ø6 mm, altura total
    aceroCercos = 4 * alto * peso6mm;
  } else {
    // Viga: 4 barras longitudinales Ø12 mm
    aceroPrincipal = 4 * largo * peso12mm;
    // Estribos Ø6 mm cada 0.2 m
    const numEstribos = Math.ceil(largo / 0.2);
    const perimetroEstribo = 2 * (ancho + alto);
    aceroCercos = numEstribos * perimetroEstribo * peso6mm;
  }

  const aceroTotal = aceroPrincipal + aceroCercos;

  // ====== Precios ======
  const pCemento = Number(document.getElementById("precio_cemento_cv").value);
  const pArena   = Number(document.getElementById("precio_arena_cv").value);
  const pGrava   = Number(document.getElementById("precio_grava_cv").value);
  const pAcero12 = Number(document.getElementById("precio_acero_cv").value);
  const pAcero6  = Number(document.getElementById("precio_acero_cv").value); // mismo input para simplificar

  // ====== Costos ======
  const cCemento = cemento * pCemento;
  const cArena   = arena * pArena;
  const cGrava   = grava * pGrava;
  const cAceroPrincipal = aceroPrincipal * pAcero12;
  const cAceroCercos    = aceroCercos * pAcero6;
  const cAceroTotal     = cAceroPrincipal + cAceroCercos;

  const total = cCemento + cArena + cGrava + cAceroTotal;

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
        <td>Acero principal Ø12 mm</td>
        <td>${aceroPrincipal.toFixed(2)}</td>
        <td>kg</td>
        <td>${cAceroPrincipal.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Acero cercos Ø6 mm</td>
        <td>${aceroCercos.toFixed(2)}</td>
        <td>kg</td>
        <td>${cAceroCercos.toFixed(2)}</td>
      </tr>
      <tr class="total">
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>${total.toFixed(2)}</strong></td>
      </tr>
    </table>
  `;
}
