let globalThemesSet = new Set();
let eachMuseumThemesTab = [];
let museumList = [];
let star;

async function fetchMuseumList() {
    const response = await fetch('https://data.culturecommunication.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?limit=30');
    const json = await response.json();
    museumList = json.results;
    //appel des resultats de l'API
    const firstMuseumName = museumList[0].nom_officiel;

    themeSet();
    museumArticle();
}

//Code HTML article des musees
function museumHTML(museum) {
    const name = museum.nom_officiel;
    const history = museum.histoire;
    const city = museum.ville;
    const visit = museum.url;
    const museumDetailURL = `details.html?museumName=${encodeURIComponent(name)}`;

    return `
    <article>
        <header class="name_and_star">
            <a href="${museumDetailURL}"><h2>${name}</h2></a>
            <img src="./ressources/star.png" class="star" id="star" style="opacity:0.33"/>
        </header>
        <p>${history}</p>
        <p><b>Lieu : </b>${city}</p>
        <a href="http://${visit}"><button class="visit"> Nous Visiter</button></a> 
    </article>
    <hr/>
    `;
}


//Afficher par defaut les musees 
function museumArticle() {
    //Boucle pour afficher les musees dans un article
    for (let i = 0; i < museumList.length; i++) {
        const museum = museumList[i];
        targetMuseum.innerHTML += museumHTML(museum);

        star = document.getElementById('star')
        star.addEventListener('click', function () { star.style.opacity = "1"; })
    }
}

//Fonction de la barre de recherche
function handleSearchClick() {
    const search_input = document.getElementById('search_input');
    console.log(search_input.value)
    let filteredTab = []
    museumList.map((museum) => {
        if (museum.nomoff.toLowerCase().includes(search_input.value.toLowerCase())) {
            filteredTab.push(museum)
        }
    })
    console.log('filteredTab2:', filteredTab)

    targetMuseum.innerHTML = "";

    filteredTab.map((museum) => {
        targetMuseum.innerHTML += museumHTML(museum);
    })
}

//************** CHANGEMENTS ICI *************

//Gestion des themes de musees dans la liste déroulante
function themeSet() {
    //tableau pour stocker les themes
    museumList.forEach((museum) => {
        let eachMuseumThemesTab = museum.domaine_thematique;
        if (eachMuseumThemesTab) { // Vérifier si eachMuseumThemesTab est défini
            for (let i = 0; i < eachMuseumThemesTab.length; i++) {
                globalThemesSet.add(eachMuseumThemesTab[i]);
            }
        }
    });

    //afficher les themes dans la liste déroulante
    for (let theme of globalThemesSet.values()) {
        console.log("theme: ", theme)

        let filterMuseum =
            ` <option value="${theme}">${theme}</option> `
        filter.innerHTML += filterMuseum;
    }
}

//Gestion du resultat du filtre de la liste déroulante
function handleSelectChange(event) {
    const selectedElement = event.target.value;
    console.log(selectedElement)
    let filteredTab = []
    museumList.map((museum) => {
        eachMuseumThemesTab = museum.domaine_thematique;
        for (let i = 0; i < eachMuseumThemesTab.length; i++) {
            if (eachMuseumThemesTab.includes(selectedElement)) {
                filteredTab.push(museum)
                break;
            }
        }
    })

    targetMuseum.innerHTML = "";

    //Boucle pour afficher les musées filtrés par thèmes 
    for (let i = 0; i < filteredTab.length; i++) {
        const museum = filteredTab[i];

        const name = museum.nom_officiel;
        const history = museum.histoire;
        const city = museum.ville;
        const visit = museum.url;

        let infoMuseum =
            `<article>
                <header class="name_and_star">
                <h2>${name}</h2>
                    <img src="./ressources/star.png" class="star" id="star" style="opacity:0.33"/>
                </header>
                <p>${history}</p>
                <p><b>Lieu:</b>${city}</p>
                <a href="http://${visit}"><button class="visit"> Visiter le site</button></a> 
            </article>
            <hr/>`
        targetMuseum.innerHTML += infoMuseum;
    }
}

window.addEventListener("load", (event) => {
    fetchMuseumList();
});

const targetMuseum = document.getElementById("targetMuseum");
const filter = document.getElementById("filter");

