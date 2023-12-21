// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works") 
    const works = await response.json()
    return works
            
}
// initiaalisation de la page
document.addEventListener("DOMContentLoaded", async () => {
    // recuperation des works
    const works = await getWorks()
   
    // affichage des works
    createGallery(works)

    // recuperer les categories
    const categories = await getCategories()

    // afficher les categories
    createCategory(categories)

    // afficher boutons

    
})


// // ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json()
        return categories
    }
    


// ----- Récupération de la gallery -----
const createGallery = (works) => {
    works.forEach((work) => {
        const contenerGallery = document.querySelector(".gallery")
        // contenerGallery.innerHTML = "Bonjour les nuls"
        const figures = document.createElement("figure")
        contenerGallery.appendChild(figures)
        
        const imgFigure = document.createElement("img")
        figures.appendChild(imgFigure)
        imgFigure.classList.add("galleryImg")
        imgFigure.src = work.imageUrl
        imgFigure.alt = work.title
        
        const figureFigCaption = document.createElement("figcaption")
        figures.appendChild(figureFigCaption)
        figureFigCaption.innerText = work.title
        
        // console.log(figures)
    }
    )
}


// ----- Création des boutons -----
// const conteneurBtns = () => {
//     const filter = document.createElement("div")
//         filter.classList.add("filter")
//         portfolio.appendChild(filter)
//         boutons.innerHtml = `
//         <button class = "
//     `
// }

//___Initialisation des boutons___
let indexBouton = 0;
const conteneurBtn = document.querySelector("filter")
for (let i = 0; i < categories.lenght; i++){
    let whiteBtn = document.createElement("div")
    whiteBtn.classList.add("btn")
    conteneurBtn.appendChild(whiteBtn)
    if (i === indexBouton){
        whiteBtn.classList.add("selected")
    }
   
}

