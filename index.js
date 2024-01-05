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

// initiaalisation de la page
document.addEventListener("DOMContentLoaded", async () => {
  const works = await getWorks(); // recuperation des works

  createGallery(works); // affichage des works
  // console.log(works);

  const categories = await getCategories(); // recuperer les categories
  // console.log(categories);

  let whiteBtn = document.createElement("div"); //Affichage des boutons
  whiteBtn.classList.add("btn");
  conteneurBtn.appendChild(whiteBtn);

  whiteBtn.innerText = "Tous"; // noms des categories qui s'affichent dans les boutons hihihi
  whiteBtn.setAttribute("id", 0);

  for (let i = 0; i < categories.length; i++) {
    let whiteBtn = document.createElement("div"); //Affichage des boutons
    whiteBtn.classList.add("btn");
    conteneurBtn.appendChild(whiteBtn);

    whiteBtn.innerText = categories[i].name; // noms des categories qui s'affichent dans les boutons hihihi
    whiteBtn.setAttribute("id", categories[i].id);

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

    const ensBtns = document.querySelectorAll(".btn");
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
  contenerGallery.innerHTML = "";
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

    // console.log(figures)
  });
};
