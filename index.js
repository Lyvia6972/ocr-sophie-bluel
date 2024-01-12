const contenerGallery = document.querySelector(".gallery");
const conteneurBtn = document.querySelector(".filtre");
// const ensBtns = document.querySelectorAll(".btn");

// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
};

let indexBouton = 0;

// initialisation de la page
document.addEventListener("DOMContentLoaded", async () => {
  const works = await getWorks(); // recuperation des works

  createGallery(works); // affichage des works
  // console.log(works);

  const categories = await getCategories(); // recuperer les categories
  // console.log(categories);

  let whiteBtntous = document.createElement("div"); //Affichage du bouton Tous
  whiteBtntous.classList.add("btn");
  conteneurBtn.appendChild(whiteBtntous);

  whiteBtntous.innerText = "Tous";
  whiteBtntous.setAttribute("id", 0, "selected");
  // categories.unshift(whiteBtn);

  for (let i = 0; i < categories.length; i++) {
    let whiteBtn = document.createElement("div"); //Affichage des boutons
    whiteBtn.classList.add("btn");
    conteneurBtn.appendChild(whiteBtn);

    whiteBtn.innerText = categories[i].name; // noms des categories qui s'affichent dans les boutons hihihi
    whiteBtn.setAttribute("id", categories[i].id);

    // if (categories[i].id === 0) {
    //   whiteBtn.classList.add("selected");
    // }
    // if (i === indexBouton) {
    //   whiteBtn.classList.add("selected");
    // }

    /* A faire 
       creer un evenlistener au clique pour chak btn
       inserer le filtrage des boutons
       changer la couleur des btn en vert puis blanc*/

    whiteBtn.addEventListener("click", () => {
      const ensBtns = document.querySelectorAll(".btn"); // Eventlistener et changement de couleur
      ensBtns.forEach((whiteBtn) => {
        whiteBtn.classList.remove("selected");
      });
      whiteBtn.classList.add("selected");
    });

    const ensBtns = document.querySelectorAll(".btn"); //  clique pour avoir le filtre
    for (let i = 0; i < ensBtns.length; i++) {
      ensBtns[i].addEventListener("click", () => {
        if (i !== 0) {
          allFilter = works.filter((bouton) => bouton.categoryId == i);
          createGallery(allFilter);
          console.log(allFilter);
        } else {
          createGallery(works);
        }
      });
    }
  }
});

// ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
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

    // console.log(figures);
  });
};
