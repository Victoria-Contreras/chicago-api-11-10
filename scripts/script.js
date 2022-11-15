const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchString = document.getElementById('search-result').value;
    const urlEncodedSearchString = encodeURIComponent(searchString);
    getArtId(urlEncodedSearchString);
})

//const tempSearch = 'star'
async function getArtId(keyword) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${keyword}`)
    const JsonData = await response.json();
    const artId = JsonData.data[0].id
    getImageId(artId);
    getArtData(artId);
} 


async function getImageId(id) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,image_id`)
    const JsonData = await response.json();
    const artInfo = JsonData.data
    const imgId = artInfo.image_id;
    appendImage(imgId)
}

async function appendImage(imgId) {
    const source = await fetch(`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`);
    const container = document.getElementById("art-img");
    const img = document.createElement("img");
    img.src = source.url;
    img.className = "card-img-top";
    container.append(img);
}

async function getArtData(artId) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artId}`)
    const JsonData  = await response.json();
    const artData = JsonData.data
    console.log(artData)
    cardBody(artData.title, artData.artist_display)
}

async function cardBody(title, artistInfo) {
    const body = document.getElementById("card-body");
    body.innerHTML = `
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${artistInfo}<p>
    `
}