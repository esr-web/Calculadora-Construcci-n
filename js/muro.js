const precios = JSON.parse(localStorage.getItem('precios')) || {};

const bloqueSelect = document.getElementById("tipoBloque");
bloqueSelect.innerHTML = `<option value="15">Bloque 15</option>`;

const largo = document.getElementById("largo");
const alto = document.getElementById("alto");
const area = document.getElementById("area");

largo.addEventListener("input", calcularArea);
alto.addEventListener("input", calcularArea);

function calcularArea(){
    area.value = (largo.value * alto.value || 0).toFixed(2);
}

function calcularMuro(){
    const A = parseFloat(area.value);
    if(!A) return;

    const bloquesPorM2 = 12.5;
    const bloques = A * bloquesPorM2;

    const mortero_m3 = A * 0.02;
    const sacosCemento = mortero_m3 * 7;
    const arena_m3 = mortero_m3 * 0.8;

    const costoBloques = bloques * precios.bloque15;
    const costoCemento = sacosCemento * precios.p250;
    const costoArena = arena_m3 * precios.arena;

    const totalCUP = costoBloques + costoCemento + costoArena;
    const totalUSD = totalCUP / precios.usd;
    const totalEUR = totalCUP / precios.eur;

    const hombres = Math.ceil(A / 10);
    const dias = (A / 8).toFixed(1);

    resultado.classList.remove("hidden");
    resultado.innerHTML = `
        <h3>Resultados</h3>
        <p><b>Bloques:</b> ${bloques.toFixed(0)}</p>
        <p><b>Cemento:</b> ${sacosCemento.toFixed(1)} sacos</p>
        <p><b>Arena:</b> ${arena_m3.toFixed(2)} m³</p>

        <h4>Costos</h4>
        <p>CUP: ${totalCUP.toFixed(2)}</p>
        <p>USD: ${totalUSD.toFixed(2)}</p>
        <p>EUR: ${totalEUR.toFixed(2)}</p>

        <h4>Mano de obra</h4>
        <p>Hombres: ${hombres}</p>
        <p>Tiempo estimado: ${dias} días</p>
    `;
}

function borrar(){
    document.querySelectorAll("input").forEach(i => i.value = "");
    resultado.classList.add("hidden");
}
