/* 
========================================================
Projekt: Hangman-Spiel
Beschreibung: Ein interaktives Konsolenspiel, bei dem der Spieler Buchstaben erraten muss. 
Autoren: Christoph, Tomasz, Aaron, Patrick
Erstellungsdatum: 27. Januar 2025
Letzte Änderung: 27. Januar 2025
Version: 1.0

Verwendung:
1. Öffne die HTML-Datei im Browser.
2. Spieler 1 gibt ein Wort ein, das erraten werden soll.
3. Spieler 2 rät Buchstaben, indem er
    - Mit der Maus auf die html-Seite klickt
    - dann lediglich die Tastatur benutzt (über addEventListener und "keypress").
    - Es erfolgt keine visuelle Darstellung der eingegebenen Buchstaben innerhalb der Console.

Dateien:
- index.html: HTML-Datei mit der Struktur und Einbindung des Skripts.
- script.js: Hauptlogik des Spiels.

Notizen:
- Die Konsole wird live aktualisiert, um den Spielstatus darzustellen.
========================================================
*/


// Variablen für das Spiel
let wordToGuess = "";       // Das Wort, das erraten werden soll
let guessedWord = [];       // Darstellung des erratenen Wortes mit "_"
let wrongGuesses = [];      // Liste der falschen Buchstaben
let lives = 6;              // Anzahl der Leben
let gameRunning = false;    // Status des Spiels

let ichBinSauer = true;   //Bedeutung das ich wirklich Sauer bin...aber nicht auf eren!

// Begrüßung und Anweisungen
console.clear();
console.log("Willkommen beim Hangman-Spiel!");
console.log("Spieler 1: Gib ein Wort ein, das erraten werden soll.");
console.log("Spieler 2: Drücke Buchstaben auf deiner Tastatur, um zu raten.");
console.log("(Das Spiel startet automatisch, wenn Spieler 1 ein Wort eingegeben hat.)");

// Funktion, um das Spiel zu starten
function startGame() {
  let isValidWord = false;

  while (!isValidWord) {
    wordToGuess = prompt("Spieler 1: Gib ein Wort ein, das erraten werden soll:");

    // Wenn "Abbrechen" gedrückt wird, das Spiel beenden
    if (wordToGuess === null) {
      console.log("Das Spiel wurde beendet. Lade die Seite neu, um ein neues Spiel zu starten.");
      return; // Beendet das Spiel
    }

    // Bereinige und überprüfe die Eingabe
    wordToGuess = wordToGuess.trim().toLowerCase(); // Entferne Leerzeichen und konvertiere zu Kleinbuchstaben
    if (wordToGuess && /^[a-z]+$/.test(wordToGuess)) {
      isValidWord = true; // Das Wort ist gültig, Schleife verlassen
    } else {
      console.log("Fehler: Bitte gib ein gültiges Wort ein (nur Buchstaben).");
    }
  }

  // Spielvariablen initialisieren
  guessedWord = Array(wordToGuess.length).fill("_"); // Platzhalter erstellen
  wrongGuesses = []; // Falsche Buchstaben zurücksetzen
  lives = 6; // Leben zurücksetzen
  gameRunning = true; // Spielstatus aktivieren

  updateDisplay(); // Ersten Spielstatus anzeigen
}

// Funktion, die die Ansicht der Konsole "live" aktualisiert
function updateDisplay() {
  console.clear(); // Konsole leeren, um einen Live-Effekt zu erzielen

  console.log("Willkommen beim Hangman-Spiel!");
  console.log("\n" + guessedWord.join(" ")); // Zeige das Wort mit Platzhaltern
  console.log("Falsche Buchstaben: " + (wrongGuesses.length > 0 ? wrongGuesses.join(", ") : "Keine"));
  console.log("Verbleibende Leben: " + lives);
  console.log("Drücke eine Taste, um einen Buchstaben zu raten.");
}

// Verarbeitung der Eingaben
function handleKeyPress(event) {
  if (!gameRunning) {
    console.log("Das Spiel ist nicht aktiv. Lade die Seite neu, um ein neues Spiel zu starten.");
    return;
  }

  const letter = event.key.toLowerCase(); // Buchstabe der gedrückten Taste

  // Eingabe validieren
  if (!/^[a-z]$/.test(letter)) {
    console.log("Bitte gib nur Buchstaben ein.");
    return;
  }

  // Prüfen, ob der Buchstabe bereits geraten wurde
  if (guessedWord.includes(letter) || wrongGuesses.includes(letter)) {
    console.log(`Der Buchstabe '${letter}' wurde bereits geraten.`);
    return;
  }

  // Buchstaben überprüfen
  if (wordToGuess.includes(letter)) {
    // Korrekte Buchstaben einsetzen
    wordToGuess.split("").forEach((char, index) => {
      if (char === letter) guessedWord[index] = letter;
    });
  } else {
    // Falscher Buchstabe
    wrongGuesses.push(letter);
    lives--;
  }

  // Spielstatus aktualisieren
  updateDisplay();
  checkGameStatus();
}

// Überprüft den Spielstatus
function checkGameStatus() {
  if (!guessedWord.includes("_")) {
    console.log("\n🎉 Herzlichen Glückwunsch! Du hast das Wort erraten: " + wordToGuess);
    resetGame();
  } else if (lives === 0) {
    console.log("\n💀 Game Over! Das Wort war: " + wordToGuess);
    resetGame();
  }
}

// Setzt das Spiel zurück
function resetGame() {
  gameRunning = false; // Spielstatus deaktivieren
  console.log("\nDas Spiel ist vorbei. Lade die Seite neu, um ein neues Spiel zu starten.");
}

// Starte das Spiel direkt nach dem Laden der Seite
startGame();

// Fängt Tastenanschläge ab
document.addEventListener("keypress", handleKeyPress);
