// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var graphql = JSON.stringify({
//   query: "mutation Login {\r\n    login(email: \"hu@bu.du\", password: \"1234567oO#\") {\r\n        status\r\n        errorMessage\r\n        accessToken\r\n        refreshToken\r\n    }\r\n}",
//   variables: {}
// })
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: graphql,
//   redirect: 'follow'
// };

// fetch("https://getpeer.eu/graphql", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
function loginRequest(email, password) {
  const url = "https://getpeer.eu/graphql";
  // Create headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Define the GraphQL mutation with template literals for dynamic values
  const graphql = JSON.stringify({
    query: `mutation Login {
            login(email: "${email}", password: "${password}") {
                status
                errorMessage
                accessToken
                refreshToken
            }
        }`,
    variables: {},
  });

  // Define request options
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  // Send the request and handle the response
  return fetch(url, requestOptions)
    .then((response) => response.json()) // Parsing as JSON for easier use in application logic
    .then((result) => {
      console.log(result);

      console.log("Mutation result:", result);
      // Ergebnis der Mutation verarbeiten
      const { status, errorMessage, accessToken, refreshToken } =
        result.data.login;
      console.log("Status:", status);
      console.log("Error Message:", errorMessage);
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      // Speichern des Access-Tokens als Cookie
      if (status == "success") {
        document.cookie = "authToken=${accessToken}; path=/; secure";
        document.cookie = "refreshToken=${refreshToken}; path=/; secure";
      }
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
// Event-Listener für das Registrierungsformular, der ausgelöst wird, wenn das Formular abgeschickt wird
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Verhindern des Standardverhaltens des Formulars (Seiten-Reload)

    // Abrufen der Eingabewerte für Benutzername, E-Mail, Passwort und Passwort-Bestätigung
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Passwortvalidierung
    const passwordMinLength = 8; // Mindestlänge des Passworts
    const passwordRegex = /^(?=.*[A-Z]).+$/; // Muss mindestens einen Großbuchstaben enthalten

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

    // Registrierung des Benutzers, nachdem die Validierungen bestanden wurden
    await loginRequest(email, password);
  });

// document.getElementById("github-login").addEventListener("click", function () {
//   const clientId = "YOUR_GITHUB_CLIENT_ID";
//   const redirectUri = "https://getpeer.eu:8443/loginGit.php";
//   const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
//     redirectUri
//   )}&scope=user`;
//   window.location.href = githubUrl;
// });
