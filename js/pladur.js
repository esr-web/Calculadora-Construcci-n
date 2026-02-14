function calcularAreaPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);

  document.getElementById("pld_area").innerText =
    largo > 0 && alto > 0 ? (largo * alto).toFixed(2) : "0";
}

function calcularPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);
  const tipo = document.getElementById("pld_cara").value;

  if (largo <= 0 || alto <= 0) {
    alert("Introduzca dimensiones válidas");
    return;
  }

  const area = largo * alto;
  const caras = tipo === "doble" ? 2 : 1;

  /* ===== CONSUMOS TÉCNICOS ===== */

  // Pladur
  const areaPlaca = 2.88; // 1.20 x 2.40 m

  // Tornillos
  const tornillosPorM2 = 25;

  // Masilla
  const rendimientoMasilla = 25; // m² por saco (25 kg)

  // Cinta
  const cintaPorM2 = 1; // m
  const cintaPorRollo = 30; // m

  // Perfiles (NO se duplican)
  const separacionMontantes = 0.60; // m
  const alturaPerfil = alto;

  /* ===== CANTIDADES ===== */

  // Se duplican
  const planchas = Math.ceil((area * caras) / areaPlaca);
  const tornillos = Math.ceil(area * caras * tornillosPorM2);
  const sacosMasilla = Math.ceil((area * caras) / rendimientoMasilla);
  const rollosCinta = Math.ceil((area * caras) / cintaPorRollo);

  // NO se duplican
  const montantes = Math.ceil(largo / separacionMontantes) + 1;
  const metrosMontante = montantes * alturaPerfil;
  const metrosCanal = largo * 2; // superior + inferior

  /* ===== PRECIOS (CUP) ===== */
  const pPlaca = Number(document.getElementById("precio_placa")?.value || 0);
  const pTornillo = Number(document.getElementById("precio_tornillo")?.value || 0);
  const pMasilla = Number(document.getElementById("precio_masilla")?.value || 0);
  const pCinta = Number(document.getElementById("precio_cinta")?.value || 0);
  const pPerfil = Number(document.getElementById("precio_perfil")?.value || 0);

  const costoTotal =
    planchas * pPlaca +
    tornillos * pTornillo +
    sacosMasilla * pMasilla +
    rollosCinta * pCinta +
    (metrosMontante + metrosCanal) * pPerfil;

  /* ===== RESULTADOS ===== */
  document.getElementById("resultadoPladur").innerHTML = `
    <h3>Resultados – Muro de Pladur</h3>
    <table>
      <tr><th>Material</th><th>Cantidad</th><th>Unidad</th></tr>
      <tr><td>Planchas 1.20 × 2.40 m</td><td>${planchas}</td><td>u</td></tr>
      <tr><td>Tornillos</td><td>${tornillos}</td><td>u</td></tr>
      <tr><td>Masilla (25 kg)</td><td>${sacosMasilla}</td><td>sacos</td></tr>
      <tr><td>Cinta para juntas (30 m)</td><td>${rollosCinta}</td><td>rollos</td></tr>
      <tr><td>Montantes metálicos</td><td>${metrosMontante.toFixed(2)}</td><td>m</td></tr>
      <tr><td>Canales metálicos</td><td>${metrosCanal.toFixed(2)}</td><td>m</td></tr>
    </table>
    <h3>Total: ${costoTotal.toFixed(2)} CUP</h3>
  `;
}
function mostrarMaterialesPladur() {
  const contenedor = document.getElementById("pld_materiales");

  contenedor.innerHTML = `
    <h3>Precios Muro de Pladur (CUP)</h3>

    <label>Placa de pladur (1.20 × 2.40 m)</label>
    <input type="number" id="precio_placa" value="500">

    <label>Tornillo (por unidad)</label>
    <input type="number" id="precio_tornillo" value="2">

    <label>Masilla (saco 25 kg)</label>
    <input type="number" id="precio_masilla" value="600">

    <label>Cinta para juntas (rollo 30 m)</label>
    <input type="number" id="precio_cinta" value="350">

    <label>Perfil metálico (CUP por metro)</label>
    <input type="number" id="precio_perfil" value="120">
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  mostrarMaterialesPladur();
});
