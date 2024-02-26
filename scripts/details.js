let museumList = []; // Déclarer une variable globale pour stocker la liste des musées

document.addEventListener("DOMContentLoaded", () => {
    fetchMuseumList();
});

async function fetchMuseumList() {
        const response = await fetch("https://data.culturecommunication.gouv.fr/api/explore/v2.1/catalog/datasets/musees-de-france-base-museofile/records?limit=1");
        const json = await response.json();
        museumList = json.results; // Stocker la liste des musées dans la variable globale

        museumList.forEach(museum => {
            const name = museum.nom_officiel;
            const theme = museum.domaine_thematique;
            const skill = museum.atout;
            const history = museum.histoire;
            const city = museum.ville;
            const adress = museum.adresse;
            const visit = museum.url;
            const phone = museum.telephone;

            //Boucle pour afficher chaque themes du musée
            const targetTheme = document.getElementById('targetTheme');
            targetTheme.innerHTML = "";
            for (let i = 0; i < theme.length; i++) {
                const themeButton =
                    `<button class="button_theme"> ${theme[i]}</button>`;
                targetTheme.innerHTML += themeButton;
            }
            const detailMuseum =
                `
                    <section>
                        <header class="name_and_star">
                            <h2 id="targetName">${name}</h2>
                            <img src="ressources/star.png" class="star" alt="star"/>
                        </header>
                        <article>
                            <address id="targetAddress">${adress}</address>
                            <p id="targetPhone">Téléphone : <a href="tel:${phone}">${phone}</a> </p>
                        </article>
                    </section>
                    <section class="museum_informations">
                        <article>
                            <p id="targetSkill">${skill}</p>
                            <p id="targetHistory">${history}</p>
                        </article>
                        <div>
                            <a href="http://${visit}"><button class="visit visit_detail" id="targetVisit">Nous visiter</button></a>
                        </div>
                    </section>
                `;
            document.body.innerHTML += detailMuseum;
        });
    
}

function handleSearchClick() {
    const search_input = document.getElementById('search_input');
    const searchTerm = search_input.value.toLowerCase();

    const filteredTab = museumList.filter(museum => museum.nom_officiel.toLowerCase().includes(searchTerm));

    const targetMuseum = document.getElementById('targetMuseum');
    targetMuseum.innerHTML = "";

    filteredTab.forEach(museum => {
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
    });
}
