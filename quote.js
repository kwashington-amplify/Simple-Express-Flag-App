// Connects API route to the main app

async function getRandomQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();

        const quote = data[0].q;
        const author = data[0].a;

        return quote + ' - ' + author;
    } catch (error) {
        console.error('Error fetching quote:', error.message);
    }
}

module.exports = { getRandomQuote };