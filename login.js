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
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        document.querySelector(".error").innerHTML =
          "Email ou mot de passe invalide";
      }
    })
    .then((data) => {
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";
      }
    });
});
