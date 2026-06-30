// Connects API route to the main app
let showQuote = true;

async function getRandomQuote() {
   try {
        if (showQuote) {
            const res = await fetch('https://zenquotes.io/api/random', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
                
            const data = await res.json();

            const quote = data[0].q ?? 'No quote available';
            const author = data[0].a ?? 'Unknown'; 
                       
            showQuote = !showQuote;

            return (quote+ ' - ' + author);
            
        } else {
            const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            });    
            const data = await res.json();
            showQuote = !showQuote;

            return (data.joke);
        }
    } catch(error) {
        console.log('Error:' + error);
        console.log('Error Cause:' + error.cause);
    }
}



module.exports = { getRandomQuote }; 