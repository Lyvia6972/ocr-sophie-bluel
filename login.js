const form = document.querySelector("form");

form.addEventListener("submit", function (envoie) {
  const myEmail = document.getElementById("email").value;
  const myMdp = document.getElementById("password").value;

  envoie.preventDefault();

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: myEmail,
      password: myMdp,
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        const userdata = data.token;
        if ((localStorage.user = userdata))
          document.location.href = "./index.html";
      });
    } else {
      document.querySelector(".error").innerHTML =
        "Erreur dans l'identifiant ou le mot de passe";
    }
  });
});
