let estadoMarcador = null;
let turnoJugador = 1;

function cambiarTurno() {
    turnoJugador = turnoJugador === 1 ? 2 : 1;
    actualizarTurno();
    guardarEstado();
}

function actualizarTurno() {
    const nombreElemento = document.getElementById(`j${turnoJugador}-nombre`);
    if (nombreElemento) {
        const nombre = nombreElemento.textContent;
        document.getElementById('turno').textContent = nombre;
    }
}

function copiarMarcador() {
    const titulo = document.getElementById('tituloMarcador').textContent;
    const ronda = document.getElementById('ronda').textContent;

    const jugador1 = obtenerDatosJugador(1);
    const jugador2 = obtenerDatosJugador(2);

    const texto = `
==============================
${titulo}
==============================
Turno de: ${jugador1.nombre}
Ronda de batalla: ${ronda}

------- ${jugador1.nombre} -------
${jugador1.detalles}

------- ${jugador2.nombre} -------
${jugador2.detalles}
`;

    navigator.clipboard.writeText(texto.trim());
}

function obtenerDatosJugador(jugador) {
    const nombre = document.getElementById(`j${jugador}-nombre`).textContent;
    const cmd = document.getElementById(`j${jugador}-cmd`).textContent;
    const prim = document.getElementById(`j${jugador}-prim`).textContent;
    const sec = document.getElementById(`j${jugador}-sec`).textContent;
    const secM = document.getElementById(`j${jugador}-secM`).textContent;
    const mini = document.getElementById(`j${jugador}-mini`).textContent;
    const total = document.getElementById(`j${jugador}-total`).textContent;

    return {
        nombre,
        detalles: `Puntos de mando: ${cmd}
Misión principal: ${prim}
Misiones secundarias: ${sec}
Misión secreta: ${secM}
Miniaturas pintadas: ${mini}
Total: ${total}`
    };
}

function ajustarPuntaje(id, delta) {
    const elemento = document.getElementById(id);
    const valorActual = parseInt(elemento.textContent, 10);
    const nuevoValor = Math.max(0, valorActual + delta);
    elemento.textContent = nuevoValor;
    actualizarTotales();
    guardarEstado();
}

function ajustarRonda(delta) {
    const rondaElemento = document.getElementById('ronda');
    const valorActual = parseInt(rondaElemento.textContent, 10);
    const nuevoValor = Math.max(1, valorActual + delta);
    rondaElemento.textContent = nuevoValor;
    guardarEstado();
}

function alternarMiniaturas(id) {
    const boton = document.getElementById(id);
    if (boton.textContent === "No") {
        boton.textContent = "Sí";
        boton.classList.add('activo');
    } else {
        boton.textContent = "No";
        boton.classList.remove('activo');
    }
    actualizarTotales();
    guardarEstado();
}

function actualizarTotales() {
    for (let i = 1; i <= 2; i++) {
        const prim = parseInt(document.getElementById(`j${i}-prim`).textContent, 10);
        const sec = parseInt(document.getElementById(`j${i}-sec`).textContent, 10);
        const secM = parseInt(document.getElementById(`j${i}-secM`).textContent, 10);
        const miniaturas = document.getElementById(`j${i}-mini`).textContent === "Sí" ? 10 : 0;
        const total = prim + sec + secM + miniaturas;
        document.getElementById(`j${i}-total`).textContent = total;
    }
}

function guardarEstado() {
    estadoMarcador = {
        t: document.getElementById('tituloMarcador').textContent,
        r: document.getElementById('ronda').textContent,
        tu: turnoJugador,
        j: []
    };

    for (let i = 1; i <= 2; i++) {
        estadoMarcador.j.push({
            n: document.getElementById(`j${i}-nombre`).textContent,
            c: document.getElementById(`j${i}-cmd`).textContent,
            p: document.getElementById(`j${i}-prim`).textContent,
            s: document.getElementById(`j${i}-sec`).textContent,
            sm: document.getElementById(`j${i}-secM`).textContent,
            m: document.getElementById(`j${i}-mini`).textContent
        });
    }

    const estadoString = JSON.stringify(estadoMarcador);
    const estadoBase64 = btoa(estadoString);
    window.history.replaceState(null, '', `?e=${estadoBase64}`);
}

function cargarEstado() {
    const urlParams = new URLSearchParams(window.location.search);
    const estadoBase64 = urlParams.get('e');
    if (!estadoBase64) return;

    const estadoGuardado = atob(estadoBase64);
    estadoMarcador = JSON.parse(estadoGuardado);
    document.getElementById('tituloMarcador').textContent = estadoMarcador.t;
    document.getElementById('ronda').textContent = estadoMarcador.r;
    turnoJugador = estadoMarcador.tu;
    actualizarTurno();

    estadoMarcador.j.forEach((jugador, i) => {
        const index = i + 1;
        document.getElementById(`j${index}-nombre`).textContent = jugador.n;
        document.getElementById(`j${index}-cmd`).textContent = jugador.c;
        document.getElementById(`j${index}-prim`).textContent = jugador.p;
        document.getElementById(`j${index}-sec`).textContent = jugador.s;
        document.getElementById(`j${index}-secM`).textContent = jugador.sm;
        const miniaturasBoton = document.getElementById(`j${index}-mini`);
        miniaturasBoton.textContent = jugador.m;
        miniaturasBoton.classList.toggle('activo', jugador.m === "Sí");
    });

    actualizarTotales();
}

function evitarSaltoLinea(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        event.target.blur();
    }
}

function reiniciar() {
    window.history.replaceState(null, '', window.location.pathname);
    location.reload();
}

document.addEventListener('DOMContentLoaded', cargarEstado);
document.addEventListener('DOMContentLoaded', actualizarTurno);
