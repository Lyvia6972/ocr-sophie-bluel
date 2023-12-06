// ----------Récupération des projets à partir de l'api---------------

await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(json => console.log(json))