const contenerGallery = document.querySelector(".gallery");
const conteneurBtn = document.querySelector(".filtre");
const token = sessionStorage.getItem("token");
const logout = document.getElementById("logout");
const banniere = document.querySelector(".bandeauNoir");
// console.log(logout, banniere);

// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
};

let indexBouton = 0;

// ---- Initialisation de la page
document.addEventListener("DOMContentLoaded", async () => {
  const works = await getWorks(); // recuperation des works

  createGallery(works); // affichage des works

  const categories = await getCategories(); // recuperer les categories

  for (let i = 0; i < categories.length; i += 1) {
    let currentBtn = document.createElement("div"); //Affichage des boutons
    currentBtn.classList.add("btn");
    conteneurBtn.appendChild(currentBtn);

    currentBtn.innerText = categories[i].name; // noms des categories qui s'affichent dans les boutons hihihi
    currentBtn.setAttribute("id", categories[i].id);

    // bouton "Tous" actif au chargement de la page
    if (categories[i].id === 0) {
      currentBtn.classList.add("selected");
    }

    // Changement de couleur au click
    currentBtn.addEventListener("click", () => {
      const ensBtns = document.querySelectorAll(".btn");
      ensBtns.forEach((btn) => {
        // console.log(btn);
        btn.classList.remove("selected");
      });
      currentBtn.classList.add("selected");

      // Lien vers l'api pour le filtre des boutons
      if (i !== 0) {
        allFilter = works.filter((bouton) => bouton.categoryId == i);
        createGallery(allFilter);
      } else {
        createGallery(works);
      }
    });
  }

  // Si loggé le beandeau noir s'affiche sinon il disparait
  // if (isLogged) {
  //   banniere.style.display = "flex";
  //   logout.textContent = "logout";
  //   console.log("Je suis connectée");
  // } else {

  //   console.log("Je ne suis pas connecte");
  // }

  if (token) {
    banniere.style.display = "flex";
    logout.textContent = "logout";
    console.log("Je suis connectée");
    conteneurBtn.style.display = "none";
  } else {
    console.log("Je ne suis pas connecte");
  }

  // Se deconnecter lorsque l'on clique sur "logout" donc token effacé
  if (logout !== null)
    logout.addEventListener("click", () => {
      sessionStorage.clear("token");
    });
});

// ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  // Affichage du bouton "Tous"
  const btnTous = { id: 0, name: "Tous" };
  categories.unshift(btnTous);

  return categories;
};

// ----- Récupération de la gallery -----
const createGallery = (works) => {
  contenerGallery.innerHTML = ""; //  ligne pour vider la page afin que les filtres ne s'accumulent pas sur la page
  works.forEach((work) => {
    const figures = document.createElement("figure");
    contenerGallery.appendChild(figures);

    const imgFigure = document.createElement("img");
    figures.appendChild(imgFigure);
    imgFigure.classList.add("galleryImg");
    imgFigure.src = work.imageUrl;
    imgFigure.alt = work.title;

    const figureFigCaption = document.createElement("figcaption");
    figures.appendChild(figureFigCaption);
    figureFigCaption.innerText = work.title;
  });
};

// ----- Modale -----
// verifie si l'utilisateur est connecté ou pas
async function isLogged() {
  return sessionStorage.getItem("token");
}
