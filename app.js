async function Fetchdata(){
    const apiUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies'; // Hämtar API URL och declare den till variable apiUrl
    const apiKeyUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys'; // Hämtar API Key URL och declare den till variable apiKeyUrl
    try {
        const response = await fetch(apiKeyUrl, {    
            method: 'POST', // Hämtar key från Key URL med POST metod
            headers: {
                'Content-Type': 'application/json' // Markera till URL att det är JSON data som överförs 
            }, 
        });
        if (!response.ok) {
            throw new Error('Error! Unable to fetch resources'); // Skapa Error meddelande ifall något strular till
        }
        const keydata = await response.json(); // Omvandlar datan och markerar den med variable namnen keydata
        const apiKey = keydata.key; // Hämta API Key och markerar den med variable namnen apiKey

        const newresponse = await fetch(apiUrl, {
            method: 'GET', // Använder GET metod för att hämta API
            headers: {
                'x-zocom': `${apiKey}` // Sätter in API nyckeln som vi fick tidigare med apikey  
            }
        });

        const data = await newresponse.json(); // Omvandlar datan till läsbar text och markerar den med variable namnen data
        console.log(data); // Loggar ut datan
    }
    catch(error){
        console.error(error); // Ifall något strular till skicka ut Error meddelande
    }
}

Fetchdata() // Run function Run!! - \(O-O)\