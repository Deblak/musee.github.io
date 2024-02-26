let museumList = [];
let eachMuseumThemesTab = [];
let globalThemesSet = new Set;

async function fetchMuseumList() {

    const response = await fetch("https://data.culturecommunication.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?limit=4")
    const json = await response.json();
    museumList = json.results
    //appel des resultats de l'API
    const firstMuseumName = museumList[0].nom_officiel;
    console.log(firstMuseumName);


    //tableau pour stocker les themes
    museumList.map((museum) => {
        eachMuseumThemesTab = museum.domaine_thematique;
        for (let i = 0; i < eachMuseumThemesTab.length; i++) {
            globalThemesSet.add(eachMuseumThemesTab[i]);
        }
    });

    for (let i = 0; i < museumList.length; i++) {
        const museum = museumList[i];

        const name = museum.nom_officiel;
        const history = museum.histoire;
        const city = museum.ville;
        const adress = museum.adresse;
        const visit = museum.url;


        let infoMuseum =
            `<article>
                <header class="name_and_star">
                <h2>${name}</h2>
                    <img src="./ressources/star.png" class="star"/>
                </header>
                <p>${history}</p>
                <a href ="maps.html"><p><b>Adresse:</b> ${adress} ${city}</p></a>
                <a href="http://${visit}"><button class="visit"> Nous Visiter</button></a> 
            </article>
            <hr/>`
        targetMuseum.innerHTML += infoMuseum;
    }
}

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
                     <img src="./ressources/star.png" class="star"/>
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
    console.log("Ici, load event listener.");
});
const targetMuseum = document.getElementById("targetMuseum");