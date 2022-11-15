let page = 1;
let searchWord;

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const searchString = document.getElementById('search-result').value;
    const urlEncodedSearchString = encodeURIComponent(searchString);
    searchWord = urlEncodedSearchString
    displayCardFront(searchWord, page)
})


async function displayCardFront(keyword, pageNumber) {
    const result = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${keyword}&fields=id,title,image_id&page=${pageNumber}`)
    const parsedResponse = await result.json();
    //console.log(parsedResponse)

    const htmlArray = [];
    for (let i = 0; i < parsedResponse.data.length; i++) {
        const src = `https://www.artic.edu/iiif/2/${parsedResponse.data[i].image_id}/full/843,/0/default.jpg`
        const title = parsedResponse.data[i].title
        const cardHtml = `
        <img src=${src} class="card-img-top"></img>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
        </div>
        `
        htmlArray.push(cardHtml)
    }

    const htmlString = htmlArray.join('');
    document.getElementById("image-container").innerHTML = `
    <div class="card" style="width: 18rem;">
        ${htmlString}
    </div>
    `

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

    displayCardFront(searchWord, page)
})

    

