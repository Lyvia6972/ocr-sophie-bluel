const contenerGallery = document.querySelector(".gallery");
const conteneurBtn = document.querySelector(".filtre");

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

  for (let i = 0; i < categories.length; i += 1) {
    let currentBtn = document.createElement("div"); //Affichage des boutons
    currentBtn.classList.add("btn");
    conteneurBtn.appendChild(currentBtn);

    currentBtn.innerText = categories[i].name; // noms des categories qui s'affichent dans les boutons hihihi
    currentBtn.setAttribute("id", categories[i].id);

    if (categories[i].id === 0) {
      // bouton "Tous" actif au chargement de la page
      currentBtn.classList.add("selected");
    }

    currentBtn.addEventListener("click", () => {
      // Eventlistener et changement de couleur
      const ensBtns = document.querySelectorAll(".btn");
      ensBtns.forEach((btn) => {
        console.log(btn);

        btn.classList.remove("selected");
      });
      currentBtn.classList.add("selected");

      if (i !== 0) {
        allFilter = works.filter((bouton) => bouton.categoryId == i);
        createGallery(allFilter);
        // console.log(allFilter);
      } else {
        createGallery(works);
      }
    });
  }
});

// const btnTous = document.querySelector("#btn-tous"); //bouton Tous
// console.log(btnTous);
// btnTous.addEventListener("click", () => {
//   const ensBtns = document.querySelectorAll(".btn");
//   ensBtns.forEach((btn) => {
//     btn.classList.remove("selected");
//   });
//   btnTous.classList.add("selected");

//   btnTous.innerText = categories[i].name; // noms des categories qui s'affichent dans les boutons hihihi
//   btnTous.setAttribute("id", categories[i].id);
// });

// ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  const btnTous = { id: 0, name: "Tous" }; // Boutons "Tous"
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
