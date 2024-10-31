// Asynchrone Funktion, um einen Benutzer zu registrieren
async function registerUser(email, password, username) {
    // GraphQL-Mutation für die Registrierung eines Benutzers
    const query = `
        mutation Register($input: RegisterInput!) {
            register(input: $input) {
                status
                errorMessage
                userid
            }
        }
    `;


    // Variablen, die an die Mutation übergeben werden (E-Mail, Passwort, Benutzername)
    const variables = {
        input: {
            email: email,
            password: password,
            username: username
        }
    };

    try {
        // API-Anfrage an den GraphQL-Server
        const response = await fetch('https://getpeer.eu/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Konvertierung der Mutation und Variablen in JSON-Format
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });

        // Überprüfen, ob die HTTP-Antwort erfolgreich war
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }

        // Das Ergebnis als JSON parsen
        const result = await response.json();

        // Erfolgreiche Registrierung
        if (result.data.register.status === "success") {
            console.log("Registrierung erfolgreich! Benutzer-ID:", result.data.register.userid);
            // Benutzer nach erfolgreicher Registrierung verifizieren
            verifyUser2(result.data.register.userid);
        } 
        // Fehler: Benutzername bereits vergeben
        else if (result.data.register.errorMessage === "Username already taken") {
            console.error("Fehler bei der Registrierung: Der Benutzername ist bereits vergeben.");
            alert("Der Benutzername ist bereits vergeben. Bitte wähle einen anderen Benutzernamen.");
        }
        // Fehler: E-Mail bereits registriert
        else if (result.data.register.errorMessage === "Email already registered") {
            console.error("Fehler bei der Registrierung: Die E-Mailadresse wird bereits verwendet.");
            alert("Die E-Mailadresse wird bereits verwendet.");
        } 
        // Allgemeiner Fehler
        else {
            console.error("Fehler bei der Registrierung:", result.data.register.errorMessage);
        }
    } catch (error) {
        // Fehlerbehandlung bei Netzwerkfehlern oder anderen Problemen
        console.error("Ein Fehler ist aufgetreten:", error);
    }
}

// Event-Listener für das Registrierungsformular, der ausgelöst wird, wenn das Formular abgeschickt wird
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Verhindern des Standardverhaltens des Formulars (Seiten-Reload)

    // Abrufen der Eingabewerte für Benutzername, E-Mail, Passwort und Passwort-Bestätigung
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Passwortvalidierung
    const passwordMinLength = 8;  // Mindestlänge des Passworts
    const passwordRegex = /^(?=.*[A-Z]).+$/;  // Muss mindestens einen Großbuchstaben enthalten

    // Überprüfung, ob das Passwort die Mindestlänge erfüllt
    if (password.length < passwordMinLength) {
        alert("Das Passwort muss mindestens 8 Zeichen lang sein!");
        return;
    }

    // Überprüfung, ob das Passwort einen Großbuchstaben enthält
    if (!passwordRegex.test(password)) {
        alert("Das Passwort muss mindestens einen Großbuchstaben enthalten!");
        return;
    }

    // Überprüfung, ob die Passwörter übereinstimmen
    if (password !== confirmPassword) {
        alert("Passwörter stimmen nicht überein!");
        return;
    }

    // Registrierung des Benutzers, nachdem die Validierungen bestanden wurden
    await registerUser(email, password, username);
});

// Asynchrone Funktion, um einen Benutzer nach der Registrierung zu verifizieren
async function verifyUser2(userid) {
    // GraphQL-Mutation zur Verifizierung eines Benutzers
    const query = `
    mutation VerifiedAccount($userid: String!) {
        verifiedAccount(userid: $userid) {
            status
            errorMessage
            accessToken
            refreshToken
        }
    }
`;

    // API-Anfrage an den GraphQL-Server
    fetch('https://getpeer.eu/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: {
                userid: userid  // Übergabe der dynamischen Benutzer-ID (userid)
            }
        })
    })
    .then(response => response.json())  // Antwort in JSON umwandeln
    .then(data => {
        console.log('Mutation result:', data);
        // Ergebnis der Mutation verarbeiten
        const { status, errorMessage, accessToken, refreshToken } = data.data.verifiedAccount;
        console.log('Status:', status);
        console.log('Error Message:', errorMessage);
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        
        // Speichern des Access-Tokens als Cookie
        document.cookie = "authToken=${accessToken}; path=/; secure";
        document.cookie = "refreshToken=${refreshToken}; path=/; secure";
        
        // Token aus dem Cookie abrufen und anzeigen
        // alert(getCookie("authToken"));
    })
    .catch(error => {
        // Fehlerbehandlung
        console.error('Error:', error);
    });
}

// Funktion, um einen Cookie-Wert anhand des Cookie-Namens zu erhalten
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

