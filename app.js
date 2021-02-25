let temperature = document.getElementById('temperature_label');
let divVille = document.getElementById('ville');

let changer = document.getElementById('changer');


let ville = "paris";

revevoirelaMeteo(ville);


// le fait d'appler la fonction ca permet d'avoir une température au début comme defaut

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



                    }


                })
                .catch(function(server_error) {
                    console.log(server_errors)
                })


        });


}

changer.addEventListener('click', function() {

    ville = prompt("rentrez une ville de votre choix");
    // dans ma variable ville :l'utilisateur peut changer


    revevoirelaMeteo(ville);


});