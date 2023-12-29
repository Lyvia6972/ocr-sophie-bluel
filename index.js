// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
};



// initiaalisation de la page
document.addEventListener("DOMContentLoaded", async () => {
  // recuperation des works
  const works = await getWorks();

  // affichage des works
  createGallery(works);

  // recuperer les categories
  const categories = await getCategories();
  //   console.log(categories);

  let indexBouton = 0;
  const conteneurBtn = document.querySelector(".filter");
  //Affichage des boutons avec le 1er en vert
    for (let i = 0; i < categories.length; i++) {
        let whiteBtn = document.createElement("div");
        whiteBtn.classList.add("btn");
        conteneurBtn.appendChild(whiteBtn);
        // noms des categories qui s'affichent dans les boutons hihihi
        whiteBtn.innerText = categories[i].name;
        whiteBtn.setAttribute('id', categories[i].id);

        // creer un evenlistener au clique pour chak btn
            // inserer le filtrage des boutons
            // changer la couleur des btn en vert puis blanc

    };

    console.log(conteneurBtn);

    conteneurBtn.forEach((bouton) => {
        bouton.addEventListener("click", () => {
          if(bouton.classList.contains("selected")) {
            return;
          } else {
            bouton.classList.add("selected");
          }
          
        });
        nextBtnSelected();
    });

    // bouton.addEventListener('click', function () {
    //     const conteneurBtn = document.querySelectorAll('.btn');
    //     conteneurBtn.forEach( ( bouton ) => {
    //         bouton.classList.remove("selected");
    //     });
    //     bouton.classList.add("selected");
    // });
 
    
});

// // ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
};

// ----- Récupération de la gallery -----
const createGallery = (works, category) => {
    console.log(works)
  works.forEach((work) => {
    const contenerGallery = document.querySelector(".gallery");
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

// const conteneurBtn = document.querySelector(".filter");
// conteneurBtn.forEach((bouton) => {
//     bouton.addEventListener("click", () => {
//       if(bouton.classList.contains("selected")) {
//         return;
//       } else {
//         bouton.classList.add("selected");
//       }
//     });
//   });
// bouton.addEventListener('click', function () {
//     const conteneurBtn = document.querySelectorAll('.btn');
//     conteneurBtn.forEach( ( bouton ) => {
//         bouton.classList.remove("selected");
//     });
//     bouton.classList.add("selected");

// })

      // ----- Changement des boutons 
      function nextBtnSelected() {
        let indexBouton = 0;
        let totalBtn = document.querySelectorAll(".btn");
            for (let i = 0; i < totalBtn.length; i++){
             const btn = totalBtn[i];
                if (i=== indexBouton){
                btn.classList.add("selected");
                } else {
                    btn.classList.remove("selected");
                }
        }};