let turnoActual = "Jugador 1";
let rondaActual = 1;

// Cambiar el turno
function cambiarTurno() {
    turnoActual = turnoActual === "Jugador 1" ? "Jugador 2" : "Jugador 1";
    document.getElementById("turno").textContent = turnoActual;
}

// Ajustar la ronda
function ajustarRonda(cambio) {
    rondaActual = Math.max(1, rondaActual + cambio);
    document.getElementById("ronda").textContent = rondaActual;
}

// Ajustar puntaje
function ajustarPuntaje(id, cambio) {
    const elemento = document.getElementById(id);
    const valor = Math.max(0, parseInt(elemento.textContent) + cambio);
    elemento.textContent = valor;
}

// Editar nombres
function editarNombres() {
    const j1 = document.getElementById("j1-nombre").textContent;
    const j2 = document.getElementById("j2-nombre").textContent;
    const nuevoJ1 = prompt("Nombre Jugador 1:", j1);
    const nuevoJ2 = prompt("Nombre Jugador 2:", j2);
    if (nuevoJ1) document.getElementById("j1-nombre").textContent = nuevoJ1;
    if (nuevoJ2) document.getElementById("j2-nombre").textContent = nuevoJ2;
    document.getElementById("turno").textContent = turnoActual === "Jugador 1" ? nuevoJ1 : nuevoJ2;
}

// Copiar marcador en formato ASCII
function copiarMarcador() {
    const marcador = `
==============================
         ${document.getElementById("tituloMarcador").textContent}
==============================
Turno de: ${turnoActual}
Ronda de batalla: ${rondaActual}

---------------- ${document.getElementById("j1-nombre").textContent} ----------------
Misión principal: ${document.getElementById("j1-prim").textContent}
Misiones secundarias: ${document.getElementById("j1-sec").textContent}
Misión secreta: ${document.getElementById("j1-secM").textContent}
Puntos de mando: ${document.getElementById("j1-cmd").textContent}

---------------- ${document.getElementById("j2-nombre").textContent} ----------------
Misión principal: ${document.getElementById("j2-prim").textContent}
Misiones secundarias: ${document.getElementById("j2-sec").textContent}
Misión secreta: ${document.getElementById("j2-secM").textContent}
Puntos de mando: ${document.getElementById("j2-cmd").textContent}

==============================
`;
    navigator.clipboard.writeText(marcador).then(() => alert("Marcador copiado"));
}

// Reiniciar marcador
function reiniciar() {
    if (confirm("¿Reiniciar marcador?")) {
        turnoActual = "Jugador 1";
        rondaActual = 1;
        ["j1-prim", "j1-sec", "j1-cmd", "j1-secM", "j2-prim", "j2-sec", "j2-cmd", "j2-secM"].forEach(id => {
            document.getElementById(id).textContent = "0";
        });
        document.getElementById("turno").textContent = turnoActual;
        document.getElementById("ronda").textContent = rondaActual;
        document.getElementById("j1-nombre").textContent = "Jugador 1";
        document.getElementById("j2-nombre").textContent = "Jugador 2";
        document.getElementById("tituloMarcador").textContent = "Título";
    }
}