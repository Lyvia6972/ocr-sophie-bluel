const contenerGallery = document.querySelector(".gallery");
const conteneurBtn = document.querySelector(".filtre");
const token = sessionStorage.getItem("token");
const logout = document.getElementById("logout");
const banniere = document.querySelector(".bandeauNoir");
const openModal = document.querySelector(".openModal");
const fondclair = document.querySelector(".fondClair");
const modal = document.querySelector(".modal");
const closemodal = document.querySelector(".modalClose i");
const modalBody = document.querySelector(".modalBody");
const modal2 = document.querySelector(".modal2");
const retour = document.querySelector(".retour");
const choisirCategorie = document.getElementById("typeCategorie");
const apercu = document.getElementById("apercu");
const titrePhoto = document.getElementById("titrePhoto");
// const poubelleBtn = document.querySelector(".poubelleBtn");
// console.log(
//   logout,
//   banniere,
//   openModal,
//   modal,
//   closemodal,
//   modal2,
//   choisirCategorie
// );

// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
};

let indexBouton = 0;

// ---- Initialisation de la page ----
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

  // ---- Vérification de la connection du client avec la validation du token ----
  if (token) {
    banniere.style.display = "flex";
    logout.textContent = "logout";
    conteneurBtn.style.display = "none";
    openModal.style.display = "flex";
    console.log("Je suis connectée");
  } else {
    console.log("Je ne suis pas connecte");
  }

  //---- Se deconnecter lorsque l'on clique sur "logout" donc token effacé ----
  if (logout !== null)
    logout.addEventListener("click", () => {
      sessionStorage.clear("token");
    });

  createGalleryModal(works); // affichage de la galerie dans la modale
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

// Récupération de la galerie pour la modale
const createGalleryModal = (works) => {
  modalBody.innerHTML = "";
  works.forEach((work) => {
    // console.log(work.id);
    const modalFigures = document.createElement("figure");
    modalBody.appendChild(modalFigures);

    const imgFigureModal = document.createElement("img");
    modalFigures.appendChild(imgFigureModal);
    imgFigureModal.src = work.imageUrl;
    imgFigureModal.alt = work.title;
    // console.log(imgFigureModal);

    const poubelleBtn = document.createElement("i");
    modalFigures.appendChild(poubelleBtn);
    poubelleBtn.classList.add("fa-solid");
    poubelleBtn.classList.add("fa-trash-can");
    // console.log(poubelleBtn);
    poubelleBtn.addEventListener("click", function () {
      // console.log("je supprime la photo numero " + work.id);
      deletePhoto(work.id);
    });
  });
};

function afficherModal() {
  // console.log("test de afficher modal");
  modal.style.display = "block";
  fondclair.style.display = "block";
}
openModal.addEventListener("click", afficherModal);

function fermerModal() {
  fondclair.style.display = "none";
  modal.style.display = "none";
  modal2.style.display = "none";
  apercu.src = "";
  titrePhoto.value = "";
}
closemodal.addEventListener("click", fermerModal);

fondclair.addEventListener("click", fermerModal);

// Supprimer une photo
function deletePhoto(id) {
  const response = fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.ok) {
      majGallery();
      alert("L'élément a bien été supprimé");
    } else {
      alert("L'élément n'a pas pu être supprimé, veuillez-vous reconnecter.");
      document.location.href = "login.html";
    }
  });
}

ajoutPhoto.addEventListener("click", function () {
  modal.style.display = "none";
  modal2.style.display = "flex";
});

// Mise à jour de la galerie après la suppression d'une photo
const majGallery = () => {
  fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((works) => {
      createGallery(works);
      createGalleryModal(works);
    });
};

// ---- Modale 2 ----

// Flèche pour revenir sur la modale 1
retour.addEventListener("click", function () {
  modal2.style.display = "none";
  modal.style.display = "flex";
  apercu.src = "";
  titrePhoto.value = "";
});

// Affichage photos miniatures pour l'ajout
const telechargerPhoto = document.getElementById("telechargerPhoto");
// console.log(telechargerPhoto);
telechargerPhoto.addEventListener("change", apercuPhoto);
function apercuPhoto() {
  const file = this.files[0];
  // console.log(this.files[0].name);
  const photoUrl = URL.createObjectURL(file);
  apercu.src = photoUrl;
  apercu.style.display = "flex";
}

// Affichage des categories lors de la sélection pour l'ajout des photos
async function choixCategorie() {
  const categorieModale = await getCategories();
  for (let i = 1; i < categorieModale.length; i++) {
    const option = document.createElement("option");
    option.textContent = categorieModale[i].name;
    option.value = categorieModale[i].id;
    choisirCategorie.appendChild(option);
  }
}
choixCategorie();
