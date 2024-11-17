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
    const j1 = prompt("Nombre Jugador 1:", document.getElementById("j1-nombre").textContent);
    const j2 = prompt("Nombre Jugador 2:", document.getElementById("j2-nombre").textContent);
    if (j1) document.getElementById("j1-nombre").textContent = j1;
    if (j2) document.getElementById("j2-nombre").textContent = j2;
    document.getElementById("turno").textContent = turnoActual === "Jugador 1" ? j1 : j2;
}

// Copiar marcador
function copiarMarcador() {
    const marcador = `
Turno: ${turnoActual}
Ronda de batalla: ${rondaActual}

${document.getElementById("j1-nombre").textContent}:
  Misión Principal: ${document.getElementById("j1-prim").textContent}
  Misiones Secundarias: ${document.getElementById("j1-sec").textContent}
  Puntos de Mando: ${document.getElementById("j1-cmd").textContent}
  Misión Secreta: ${document.getElementById("j1-secM").textContent}

${document.getElementById("j2-nombre").textContent}:
  Misión Principal: ${document.getElementById("j2-prim").textContent}
  Misiones Secundarias: ${document.getElementById("j2-sec").textContent}
  Puntos de Mando: ${document.getElementById("j2-cmd").textContent}
  Misión Secreta: ${document.getElementById("j2-secM").textContent}
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
    }
}