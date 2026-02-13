function calcularMuro() {

    const largo = parseFloat(document.getElementById("largo").value);
    const alto = parseFloat(document.getElementById("alto").value);
    const desperdicio = parseFloat(document.getElementById("desperdicio").value) || 0;
    const tipoBloque = document.getElementById("tipo_bloque").value;
    const calcularCostos = document.getElementById("costos").checked;
    const moneda = document.getElementById("moneda").value;

    if (largo <= 0 || alto <= 0) {
        alert("Introduzca dimensiones válidas");
        return;
    }

    // ÁREA
    const area = largo * alto;
    const factorDesperdicio = 1 + (desperdicio / 100);

    // BLOQUES (40x20 cm + junta)
    const bloquesPorM2 = 12.5;
    const bloques = Math.ceil(area * bloquesPorM2 * factorDesperdicio);

    // MORTERO (promedio técnico)
    const morteroPorM2 = 0.02; // m³/m²
    const mortero = area * morteroPorM2 * factorDesperdicio;

    // DOSIFICACIÓN 1:4
    const cemento_m3 = mortero * (1 / 5);
    const arena_m3 = mortero * (4 / 5);

    // CONVERSIÓN CEMENTO
    const densidadCemento = 1440; // kg/m³
    const sacosCemento = Math.ceil((cemento_m3 * densidadCemento) / 42.5);

    // RESULTADO BASE
    let html = `
        <h3>Resultado – Muro de Bloques</h3>
        <p><strong>Área del muro:</strong> ${area.toFixed(2)} m²</p>
        <p><strong>Bloque seleccionado:</strong> ${tipoBloque} cm</p>
        <p><strong>Bloques:</strong> ${bloques} unidades</p>
        <p><strong>Mortero:</strong> ${mortero.toFixed(3)} m³</p>
        <p><strong>Cemento:</strong> ${sacosCemento} sacos</p>
        <p><strong>Arena:</strong> ${arena_m3.toFixed(3)} m³</p>
    `;

    // COSTOS
    if (calcularCostos) {

        const precioBloque = precios.muro.bloque;
        const precioCemento = precios.muro.cemento;
        const precioArena = precios.muro.arena;

        let costoBloques = bloques * precioBloque;
        let costoCemento = sacosCemento * precioCemento;
        let costoArena = arena_m3 * precioArena;

        let totalCUP = costoBloques + costoCemento + costoArena;

        let totalConvertido = totalCUP;
        let simbolo = "CUP";

        if (moneda === "USD") {
            totalConvertido = totalCUP / precios.muro.cambioUSD;
            simbolo = "USD";
        }

        if (moneda === "EUR") {
            totalConvertido = totalCUP / precios.muro.cambioEUR;
            simbolo = "EUR";
        }

        html += `
            <hr>
            <h4>Costos</h4>
            <p>Bloques: ${costoBloques.toFixed(2)} CUP</p>
            <p>Cemento: ${costoCemento.toFixed(2)} CUP</p>
            <p>Arena: ${costoArena.toFixed(2)} CUP</p>
            <p><strong>Total:</strong> ${totalConvertido.toFixed(2)} ${simbolo}</p>
        `;

        agregarPresupuesto("Muro de bloques", totalCUP);
    }

    document.getElementById("resultado").innerHTML = html;
}