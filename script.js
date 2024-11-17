let currentTurn = "Jugador 1"; // Inicialmente, el turno es del jugador 1
let battleRound = 1; // Valor inicial de la ronda

// Actualiza el marcador de turno con el nombre real del jugador
function updateTurnIndicator() {
    const player1Name = document.getElementById("player1-name").textContent;
    const player2Name = document.getElementById("player2-name").textContent;
    document.getElementById("current-turn").textContent = currentTurn === "Jugador 1" ? player1Name : player2Name;
}

// Función para cambiar de turno
function changeTurn() {
    currentTurn = currentTurn === "Jugador 1" ? "Jugador 2" : "Jugador 1";
    updateTurnIndicator();
}

// Función para actualizar la ronda de batalla
function updateRound() {
    const newRound = prompt("Ingrese el número de la ronda actual:", battleRound);
    if (!isNaN(newRound) && newRound > 0) {
        battleRound = parseInt(newRound);
        document.getElementById("current-round").textContent = battleRound;
    }
}

// Función para editar los nombres de los jugadores
function editNames() {
    const player1Name = prompt("Ingrese el nombre del Jugador 1:", document.getElementById("player1-name").textContent);
    const player2Name = prompt("Ingrese el nombre del Jugador 2:", document.getElementById("player2-name").textContent);
    if (player1Name) document.getElementById("player1-name").textContent = player1Name;
    if (player2Name) document.getElementById("player2-name").textContent = player2Name;
    updateTurnIndicator(); // Actualiza el indicador de turno con los nuevos nombres
}

// Función para copiar el marcador en formato ASCII
function copyToClipboard() {
    const player1Name = document.getElementById("player1-name").textContent;
    const player2Name = document.getElementById("player2-name").textContent;
    const asciiContent = `
==============================
         MARCADOR DE JUEGO
==============================
Turno de: ${currentTurn}
Ronda de batalla: ${battleRound}

---------------- ${player1Name} ----------------
Misiones principales: ${document.getElementById("p1-main").textContent}
Misiones secundarias: ${document.getElementById("p1-secondary").textContent}
Puntos de mando:       ${document.getElementById("p1-command").textContent}

---------------- ${player2Name} ----------------
Misiones principales: ${document.getElementById("p2-main").textContent}
Misiones secundarias: ${document.getElementById("p2-secondary").textContent}
Puntos de mando:       ${document.getElementById("p2-command").textContent}

==============================
`;
    navigator.clipboard.writeText(asciiContent).then(() => {
        alert("Contenido copiado al portapapeles en formato ASCII");
    }).catch(err => {
        alert("Error al copiar al portapapeles: " + err);
    });
}

// Función para resetear el marcador
function resetScores() {
    const confirmReset = confirm("¿Estás seguro de que quieres reiniciar el marcador? Esto guardará el estado actual.");
    if (confirmReset) {
        saveScoresToCookies();
        const scoreElements = document.querySelectorAll(".score-group span");
        scoreElements.forEach(element => element.textContent = "0");
        currentTurn = "Jugador 1";
        battleRound = 1;
        document.getElementById("current-turn").textContent = currentTurn;
        document.getElementById("current-round").textContent = battleRound;
    }
}

// Función para guardar marcador en cookies
function saveScoresToCookies() {
    const scores = {
        "p1-main": document.getElementById("p1-main").textContent,
        "p1-secondary": document.getElementById("p1-secondary").textContent,
        "p1-command": document.getElementById("p1-command").textContent,
        "p2-main": document.getElementById("p2-main").textContent,
        "p2-secondary": document.getElementById("p2-secondary").textContent,
        "p2-command": document.getElementById("p2-command").textContent,
        "currentTurn": currentTurn,
        "battleRound": battleRound,
    };
    document.cookie = `gameScores=${JSON.stringify(scores)};path=/;max-age=86400`; // Guarda por 1 día
}

// Función para cargar marcador desde cookies
function loadScoresFromCookies() {
    const cookies = document.cookie.split("; ");
    const scoresCookie = cookies.find(row => row.startsWith("gameScores="));
    if (scoresCookie) {
        const scores = JSON.parse(scoresCookie.split("=")[1]);
        document.getElementById("p1-main").textContent = scores["p1-main"];
        document.getElementById("p1-secondary").textContent = scores["p1-secondary"];
        document.getElementById("p1-command").textContent = scores["p1-command"];
        document.getElementById("p2-main").textContent = scores["p2-main"];
        document.getElementById("p2-secondary").textContent = scores["p2-secondary"];
        document.getElementById("p2-command").textContent = scores["p2-command"];
        currentTurn = scores.currentTurn;
        battleRound = scores.battleRound;
        document.getElementById("current-turn").textContent = currentTurn;
        document.getElementById("current-round").textContent = battleRound;
    }
}

// Cargar los datos cuando la página se inicie
document.addEventListener("DOMContentLoaded", () => {
    loadScoresFromCookies();
    updateTurnIndicator(); // Actualiza el indicador de turno al cargar
});
