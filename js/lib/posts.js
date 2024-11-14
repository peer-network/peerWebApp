async function getPosts(offset, limit, fromDate = null, toDate = null) {
  const accessToken = getCookie("authToken");

  // Create headers
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  var graphql = JSON.stringify({
    query: `query Users {
            getallposts(
                offset: ${offset}
                limit: ${limit}
                from: "${fromDate}"
                to: "${toDate}"
                filterBy: null
                sortBy: null
                title: null
            ) {
                id
                contenttype
                title
                media
                mediadescription
                amountlikes
                amountviews
                amountcomments
                isliked
                comments {
                    commentid
                    userid
                    postid
                    parentid
                    content
                    createdat
                    user {
                        id
                        username
                        img
                        isfollowed
                    }
                }
            }
        }`,
    variables: {},
  });

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: graphql,
    redirect: "follow",
  };

  return fetch("https://getpeer.eu/graphql", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
}
async function likePost(postid) {
  const accessToken = getCookie("authToken");

  // Create headers
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  var graphql = JSON.stringify({
    query: `mutation LikePost {
        likePost(input: { postid: "${postid}" }) {
          status
          ResponseCode
        }
      }`,
    variables: {},
  });

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://getpeer.eu/graphql", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
async function dislikePost(postid) {
  const accessToken = getCookie("authToken");

  // Create headers
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  var graphql = JSON.stringify({
    query: `mutation DislikePost {
        dislikePost(input: { postid: "${postid}" }) {
          status
          ResponseCode
        }
      }`,
    variables: {},
  });

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: graphql,
    redirect: "follow",
  };

  fetch("https://getpeer.eu/graphql", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function fetchPostData(postId) {
  const accessToken = getCookie("authToken");
  const query = `
            query getPost($id: ID!) {
                post(id: $id) {
                    comments {
                        commentid
                        userid
                        postid
                        parentid
                        content
                        amountlikes
                        isliked
                        createdat
                    }
                }
            }
        `;

  const variables = { id: postId };

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  return fetch("https://your-graphql-endpoint.com/graphql", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.errors) {
        console.error("GraphQL Fehler:", result.errors);
        return null;
      }
      return result.data.post;
    })
    .catch((error) => {
      console.error("Netzwerkfehler:", error);
      return null;
    });
}
