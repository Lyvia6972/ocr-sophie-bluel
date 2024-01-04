const contenerGallery = document.querySelector(".gallery");
const conteneurBtn = document.querySelector(".filtre");

// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
};

let indexBouton = 0;

// initiaalisation de la page
document.addEventListener("DOMContentLoaded", async () => {
  // recuperation des works
  const works = await getWorks();

  // affichage des works
  createGallery(works);
  // console.log(works);

  // recuperer les categories
  const categories = await getCategories();
  // console.log(categories);

  //Affichage des boutons avec le 1er en vert
  for (let i = 0; i < categories.length; i++) {
    let whiteBtn = document.createElement("div");
    whiteBtn.classList.add("btn");
    conteneurBtn.appendChild(whiteBtn);
    // noms des categories qui s'affichent dans les boutons hihihi
    whiteBtn.innerText = categories[i].name;
    whiteBtn.setAttribute("id", categories[i].id);

    /* A faire 
       creer un evenlistener au clique pour chak btn
       inserer le filtrage des boutons
       changer la couleur des btn en vert puis blanc*/

    // Eventlistener et changement de couleur
    whiteBtn[i].addEventListener("click", () => {
      const ensBtns = document.querySelectorAll(".btn");
      ensBtns.forEach((whiteBtn) => {
        whiteBtn.classList.remove("selected");
      });
      whiteBtn.classList.add("selected");
    });

    // const ensBtns = document.querySelectorAll(".btn");
    // for (let i = 0; i < ensBtns.length; i++) {
    // ensBtns[i].addEventListener("click", () => {
    if (i !== 0) {
      allFilter = works.filter((bouton) => bouton.categoryId == i);
      createGallery(allFilter);
      console.log(allFilter);
    } else {
      createGallery(works);
    }
    //   });
    // }

    // const btnFiltered = categories.filter((bouton, index) => {
    //   if (whiteBtn == bouton.categories[i]) {
    //     return bouton;
    //   }
    //   console.log(btnFiltered);
    // });
  }
  // console.log(whiteBtn);
});

//     nextBtnSelected();

//     document.querySelector(".btn").addEventListener("click", () => {
//         const objets = works.filter((event) => {
//           return event.category.id === 1;
//         });
//         createGallery(objets);
//       });
// });

// // ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
};

// ----- Récupération de la gallery -----
const createGallery = (works) => {
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

// const ensBtns = document.querySelectorAll(".btn");
// for (let i = 0; i < ensBtns.length; i++) {
//   ensBtns[i].addEventListener("click", () => {
//     if (i !== 0) {
//       allFilter = works.filter((bouton) => bouton.categoryId == i);
//       createGallery(allFilter);
//       console.log(allFilter);
//     } else {
//       createGallery(works);
//     }
//   });
// }
