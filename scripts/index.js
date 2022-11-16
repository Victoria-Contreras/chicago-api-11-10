let page = 1;
let searchWord;

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const searchString = document.getElementById('search-result').value;
    const urlEncodedSearchString = encodeURIComponent(searchString);
    searchWord = urlEncodedSearchString
    displayCard(searchWord, page)
})


async function displayCard(keyword, pageNumber) {
    const result = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${keyword}&fields=id,title,image_id&page=${pageNumber}`)
    const parsedResponse = await result.json();
    //console.log(parsedResponse)

    const htmlArray = [];
    for (let i = 0; i < parsedResponse.data.length; i++) {
        const src = `https://www.artic.edu/iiif/2/${parsedResponse.data[i].image_id}/full/843,/0/default.jpg`
        const artId = parsedResponse.data[i].id
        
        const detailedResult = await fetch(`https://api.artic.edu/api/v1/artworks/${artId}`);
        const detailedParsedResponse = await detailedResult.json();

        const title = detailedParsedResponse.data.title;
        const artist = detailedParsedResponse.data.artist_title;
        const date = detailedParsedResponse.data.date_display;
        const type = detailedParsedResponse.data.artwork_type_title;


        const cardHtml = `
        <div class="col-4">
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src=${src} alt="" style="height:200px;">
                    </div>
                    <div class="flip-card-back" style="height: 200px;">
                        <div>
                            <h3>${title}</h3>
                            <h4>${artist}</h4>
                            <p>${date}</p>
                            <p>${type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        htmlArray.push(cardHtml)
    }

    const htmlString = htmlArray.join('');
    document.getElementById("image-container").innerHTML = `${htmlString}`

}



const navButtons = document.querySelector("nav") 
navButtons.addEventListener("click", (e) => {
    let target = e.target.id; 
    const previousButton = document.getElementById("previous")
    const nextButton = document.getElementById("next")
    
    if (target != "previous" && target != "next") {
        page = target;
        
    } else if (target === "next") {
        page++
    } else if (target === "previous" && page != 1) {
        page--
    }

    displayCard(searchWord, page)
})

    

