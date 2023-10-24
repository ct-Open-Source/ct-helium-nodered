// ChirpStack ruft im Decoder die Funktion decodeUplink auf und überreicht das Objekt "input". 
// Die meisten Decoder erwarten jedoch, dass die Parameter einzeln übergeben werden (siehe unten "function Decode").
// Um nicht großartig am Decoder des Herstellers herumzudoktern, können wir diesen einfach aus der Funktion decodeUplink aufrufen -- so wie in diesem Beispiel.
// Wichtig ist nur, dass die Variablen in der richtigen Reihenfolge übergeben werden, da anhanddessen die Zuordnung erfolgt. 
// Hier wird Decode aufgerufen, input.fPort übergeben und in "function Decode" als fPort entgegengenommen. Vertauscht man die Variablen auf einer Seite, werden sie im Decoder falsch zugeordnet.

function decodeUplink(input) {
        return { 
            // Funktionsaufruf. "Decode" muss angepasst werden, sofern die Funktion anders heißt.
            data: Decode(input.fPort, input.bytes)
        };   
}

// Eigentlicher Gerätedecoder, hier gekürzt.
function Decode(fPort, bytes)
...
...
...

// Hier heißt die Funktion "Decoder" und die Variablen werden in einer anderen Reihenfolge übergeben. Wir müssten wahlweise die Funktion umbenennen oder oben den Aufruf ändern und die Reihenfolge der Variablenzuordnung korrekt anpassen.
function Decoder(port, bytes)
...
...
...
