let temperature = document.getElementById('temperature_label');
let divVille = document.getElementById('ville');
let siel = document.getElementById('siel');

let changer = document.getElementById('changer');


let ville;
// vide pour geolocaliser la méteo
// dans certain cas lutilisateur a bloqué toute geaolocalisation sur son navigator donc:
if ('geolocation' in navigator) {
    /* la géolocalisation est disponible */
    navigator.geolocation.watchPosition(function(position) {
        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=0f526fc4c706001878f4fecba0e8ab16&units=metric';
        console.log(url);
        let config = {
            method: "get"
        };

        fetch(url, config)
            .then(function(response) {

                return response.json()
                    .then(function(data) {

                        if (response.status == 400)
                            console.log('erreur données requetes');
                        else {

                            let temp = data.main.temp;
                            let vile = data.name;
                            let apparence = data.main.humidity;

                            siel.textContent = apparence;

                            temperature.textContent = temp;

                            divVille.textContent = vile;

                        }

                    })
                    .catch(function(server_error) {
                        console.log('error serveur')
                            /* la géolocalisation n'est pas disponible */
                    })


            });


    }, error, options);

    var options = {
        enableHighAccuracy: true
            // l'application souhaite recevoir les meilleurs résultats possibles
    }

} else {
    ville = "paris";
    revevoirelaMeteo(ville)
        /* la géolocalisation n'est pas disponible */


}



function revevoirelaMeteo(ville) {


    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=0f526fc4c706001878f4fecba0e8ab16&units=metric';
    console.log(url)
        // on doit le mettre dans la fonction car l'url est personnaliseren fonction de la ville 

    let config = {
        method: "get"
    };

    fetch(url, config)
        .then(function(response) {

            return response.json()
                .then(function(data) {

                    if (response.status == 400)
                        console.log('erreur données requetes');
                    else {
                        console.log(data);
                        let temp = data.main.temp;
                        let pays = data.sys.country;
                        let vile = data.name;


                        temperature.textContent = temp;

                        divVille.textContent = vile;

                        var newDiv = document.createElement("div");
                        console.log(newDiv)
                        newDiv.textContent = pays;
                        // document.body.append(newDiv)

                        divVille.prepend(newDiv);

                    }


                })
                .catch(function(server_error) {
                    console.log(server_errors)
                })


        });


}


// le fait d'appler la fonction ca permet d'avoir une température au début comme defaut
changer.addEventListener('click', function() {

    ville = prompt("rentrez une ville de votre choix");
    // dans ma variable ville :l'utilisateur peut changer


    revevoirelaMeteo(ville);


});


function error() {
    ville = "paris";
    revevoirelaMeteo(ville)
        // en cas l 'utilisateur a bloqué sa localisation

}