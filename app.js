const solarButton = document.getElementById("searchButton"); // Hitta Element "searchButton" genom id och deklarera den till solarButton
const display = document.getElementById("results"); // Hitta Element "results" genom id och deklarera den till display
const apiUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies'; // Hämtar API URL och deklarera den till apiUrl
const apiKeyUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys'; // Hämtar API Key URL och deklarera den till apiKeyUrl
let firstSearchLight = true;

async function Fetchdata(){
    try {
        const keyResponse = await fetch(apiKeyUrl, {    
            method: 'POST', // Hämtar key från Key URL med POST metod
            headers: {
                'Content-Type': 'application/json' // Markera till URL att det är JSON data som överförs 
            }, 
        });
        if (!keyResponse.ok) {
            throw new Error('Error! Unable to fetch API Key'); // Skapa Error meddelande ifall något strular till med API key fetch
        }
        const keydata = await keyResponse.json(); // Omvandlar datan och deklarerar den till keydata
        const apiKey = keydata.key; // Hämta API Key och markerar den deklarerar den till apiKey

        const response = await fetch(apiUrl, {
            method: 'GET', // Använder GET metod för att hämta API
            headers: {
                'x-zocom': `${apiKey}` // Sätter in API nyckeln som vi fick tidigare med apikey  
            }
        });
        if (!response.ok) {
            throw new Error('Error! Unable to fetch resources'); // Skapa Error meddelande ifall något strular till med data fetch
        }

        solarButton.addEventListener('click', async () => { //Lägger till en EventListener till button
            const searchInput = document.getElementById('searchInput').value.trim().toLowerCase(); // Hitta Element "searchInput" genom id samt deklarera den till searchInput, ta bort whitespace på input genom "trim()" och omvandlar alla tecken til gemener.
            const bodies = document.querySelectorAll('.circleman');
            display.textContent = ''; // Fixar att display är tom från börjar och tar bort tidigare sökresultat när man söker nästa resultat.
            let found = false;

            const solarBody = data.bodies.find(body => 
                body.name.toLowerCase() === searchInput // Hittar API data genom bodies och 
            );
        
            if (solarBody) {
                const name = document.createElement('h3');
                const desc = document.createElement('p');
                const tempday = document.createElement('p');
                const tempnight = document.createElement('p');
                const moons = document.createElement('p');
                const distance = document.createElement('p');
                const rotation = document.createElement('p');
                const orbitalPeriod = document.createElement('p');
                const circumference = document.createElement('p'); //Skapar Element h3 och p och deklarerar dem

                name.textContent = 'Namn: ' + solarBody.name + ' || Latin Namn: ' + solarBody.latinName;
                desc.textContent = 'Besktrivning: ' + solarBody.desc;
                tempday.textContent = 'Temperaturen på dagen: ' + solarBody.temp.day + "°C";
                tempnight.textContent = 'Temperaturen på natten: ' + solarBody.temp.night + "°C";
                moons.textContent = 'Antal månar: ' + solarBody.moons.length;
                distance.textContent = 'Avstånd från Solen: ' + solarBody.distance + " km";
                rotation.textContent = 'Längd på dygn i antal jorddygn runt sin egen axel: ' + solarBody.rotation;
                orbitalPeriod.textContent = 'Antal jorddygn runt solen: ' + solarBody.orbitalPeriod;
                circumference.textContent = 'Omkretsen: ' + solarBody.circumference + " km"; //Lägger till text och API data från solarBody genom textContent till h3 och p 

                desc.style.fontSize = "1.2vw";
                desc.style.textAlign = "center";
                display.style.border = "yellow 5px double";
                display.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; //Styla desc och display vid klick av button

                display.appendChild(name);
                display.appendChild(desc);
                display.appendChild(tempday);
                display.appendChild(tempnight);
                display.appendChild(moons);
                display.appendChild(distance);
                display.appendChild(rotation);
                display.appendChild(orbitalPeriod);
                display.appendChild(circumference); //Lägger till h3 och all p in till display

                bodies.forEach(group => {
                    const name = group.dataset.name;

                    group.classList.remove('hide', 'select');

                    if (name === searchInput) {
                        if(!firstSearchLight) {
                        group.classList.add('select');
                        }
                        found = true; 
                    } else {
                        group.classList.add('hide');
                    }
                });

                if (!found) {
                    alert(`Ingen himmelkropp hittas för "${searchInput}"`)
                }

                firstSearchLight = false;
            } else {
                    display.textContent = `Ingen data hittades på '${searchInput}'.`; //Om man söker med en fel skriven namn dyker en Error meddelande.  
                }
        });

        const data = await response.json(); // Omvandlar datan till läsbar text och markerar den med variable namnen data
        console.log(data); // Loggar ut datan
    }
    catch(error){
        console.error(error); // Ifall något strular till skicka ut Error meddelande
    }
}

Fetchdata() // Run function Run!! - \(O-O)\