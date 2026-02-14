function calcularAreaPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);
  const area = largo * alto || 0;
  document.getElementById("pld_area").textContent = area.toFixed(2);
}

function calcularPladur() {
  const largo = Number(document.getElementById("pld_largo").value);
  const alto = Number(document.getElementById("pld_alto").value);
  const tipo = document.getElementById("pld_cara").value;

  if (largo <= 0 || alto <= 0) {
    alert("Introduce largo y alto válidos");
    return;
  }

  const area = largo * alto;
  const caras = tipo === "doble" ? 2 : 1;

  /* ===== RENDIMIENTOS TÉCNICOS ===== */
  const planchas = Math.ceil((area * caras) / 3);          // placa 1.20 x 2.40
  const perfiles = Math.ceil(area * 3);                    // m lineales
  const tornillosNecesarios = Math.ceil(area * caras * 25); // 25 tornillos/m²
  const masillaKg = area * caras * 0.5;                    // 0.5 kg/m²

  /* ===== DATOS DE EMPAQUE ===== */
  const tornillosCaja = Number(document.getElementById("tornillos_por_caja").value);
  const kgMasillaSaco = Number(document.getElementById("kg_masilla_saco").value);

  const cajasTornillos = Math.ceil(tornillosNecesarios / tornillosCaja);
  const sacosMasilla = Math.ceil(masillaKg / kgMasillaSaco);

  /* ===== PRECIOS ===== */
  const pPladur = Number(document.getElementById("precio_pladur").value);
  const pPerfil = Number(document.getElementById("precio_perfil").value);
  const pTornillos = Number(document.getElementById("precio_tornillos").value);
  const pMasilla = Number(document.getElementById("precio_masilla").value);

  const total =
    planchas * pPladur +
    perfiles * pPerfil +
    cajasTornillos * pTornillos +
    sacosMasilla * pMasilla;

  document.getElementById("resultadoPladur").innerHTML = `
    <div class="card-content">
      <h3>Resultado – Muro de Pladur</h3>
      <p><b>Área:</b> ${area.toFixed(2)} m²</p>
      <p><b>Planchas:</b> ${planchas} unidades</p>
      <p><b>Perfiles metálicos:</b> ${perfiles} m</p>
      <p><b>Tornillos:</b> ${tornillosNecesarios} uds (${cajasTornillos} cajas)</p>
      <p><b>Masilla:</b> ${masillaKg.toFixed(1)} kg (${sacosMasilla} sacos)</p>
      <hr>
      <p><b>Costo total:</b> ${total.toFixed(2)} CUP</p>
    </div>
  `;
}
