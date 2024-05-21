import {apiKey} from './js/constants.js'
const content = document.querySelector('.content');

async function getMovies(){
    try {
        const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&limit=15'
        const headers = {
            "content-type":  'accept: application/json' ,
            "X-API-KEY": apiKey
        }
        const response  = await fetch(url,{headers})
        if(!response.ok){
            throw Error('error in fetching data', response)
            return
        }
        const responseData = await response.json()
        return responseData;

    }catch (e){
        return  e
    }

}

function displayMovies (movies=[]) {
    console.log(movies)
    movies.items.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                    <div class="cover__inner">
                        <img src="${movie.posterUrl}"
                             alt="${movie.nameOriginal}" 
                             class="card__image">
                        <div class="card__cover"></div>
                    </div>
                 ${
            movie.nameRu ? `<h2 class="card__title">${movie.nameRu}</h2>` : 
                    `<h2 class="card__title">${movie.nameOriginal}</h2>` }
                    <span class="card__category">${movie?.genres.map(genre => ` ${genre.genre}`)}</span>
                    ${movie.ratingImdb ? `<span class='card__rating'>${movie.ratingImdb }</span>` : 
                        movie.ratingKinopoisk ? `<span class='card__rating'>${movie.ratingKinopoisk}</span>` : '' }
       `
        content.appendChild(card);
    })
}

function main(){
    getMovies().then(data => {
        displayMovies(data)
    })
}
main()