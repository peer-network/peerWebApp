async function likeComment( commentId) {
    const accessToken = getCookie("authToken");

    // Create headers
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    });

    // 2. GraphQL Body erstellen
    var graphql = JSON.stringify({
        query: `mutation LikeComment {
            likeComment(commentid: "${commentId}") {
                status
                ResponseCode
            }
        }`,
        variables: {}
    });

    
    // 3. Request-Options definieren
    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: graphql,
        redirect: 'follow'
    };

    // 4. fetch aufrufen
    fetch("https://getpeer.eu/graphql", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
