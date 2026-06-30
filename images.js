
async function getRandomImg() {
    const image = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await image.json();

    return {
        title: 'A random dog',
        image_url: data.message
    };
}

module.exports = { getRandomImg };