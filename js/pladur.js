function calcularAreaPladur() {
  const largo = parseFloat(document.getElementById("pld_largo").value) || 0;
  const alto = parseFloat(document.getElementById("pld_alto").value) || 0;

  const area = largo * alto;
  document.getElementById("pld_area").innerText = area.toFixed(2);
}

function mostrarMaterialesPladur() {
  // Esta función se mantiene por compatibilidad
  // (no hace falta generar inputs dinámicos)
}

function calcularPladur() {
  const largo = parseFloat(document.getElementById("pld_largo").value);
  const alto = parseFloat(document.getElementById("pld_alto").value);
  const tipo = document.getElementById("pld_cara").value;

  if (!largo || !alto) {
    alert("Introduce el largo y el alto del muro");
    return;
  }

  const area = largo * alto;
  const caras = tipo === "doble" ? 2 : 1;

  /* Rendimientos estándar */
  const planchas = Math.ceil((area * caras) / 3); // plancha ≈ 3 m²
  const perfiles = Math.ceil(area * 3);           // 3 m por m²
  const tornillos = Math.ceil((area * caras * 25) / 1000); // cajas
  const masilla = Math.ceil(area / 20);            // 1 saco / 20 m²

  /* Precios */
  const pPladur = parseFloat(document.getElementById("precio_pladur").value);
  const pPerfil = parseFloat(document.getElementById("precio_perfil").value);
  const pTornillos = parseFloat(document.getElementById("precio_tornillos").value);
  const pMasilla = parseFloat(document.getElementById("precio_masilla").value);

  const costoPladur = planchas * pPladur;
  const costoPerfil = perfiles * pPerfil;
  const costoTornillos = tornillos * pTornillos;
  const costoMasilla = masilla * pMasilla;

  const total = costoPladur + costoPerfil + costoTornillos + costoMasilla;

  document.getElementById("resultadoPladur").innerHTML = `
    <div class="card-content">
      <h3>Resultado Muro de Pladur</h3>
      <p><b>Área:</b> ${area.toFixed(2)} m²</p>
      <p><b>Planchas:</b> ${planchas} uds</p>
      <p><b>Perfiles:</b> ${perfiles} m</p>
      <p><b>Tornillos:</b> ${tornillos} cajas</p>
      <p><b>Masilla:</b> ${masilla} sacos</p>
      <hr>
      <p><b>Costo total:</b> ${total.toFixed(2)} CUP</p>
    </div>
  `;
}
