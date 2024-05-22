import {Http} from "./js/http.js";
import {timeKillerFunction} from "./js/scroll.js";
import {LocalStorage} from "./js/service.js";

document.addEventListener('DOMContentLoaded', function (){
    const premiersMovieContent = document.querySelector('.premier__movies--content');
    const releaseMovieContent = document.querySelector('.release__movies--content');
    const bestMoviesContent = document.querySelector('.best__movies--content');
    const expectedMoviesContent = document.querySelector('.expected__movies--content');
    const chosenMoviesContent = document.querySelector('.chosen__movies--content');

    let chosenData = LocalStorage.getItem('chosen') || []

    timeKillerFunction(premiersMovieContent, '.left', '.right', '.premiers__movies-btn');
    timeKillerFunction(expectedMoviesContent, '.left', '.right', '.expected__movies-btn');
    timeKillerFunction(bestMoviesContent, '.left', '.right', '.best--movies-btn');
    timeKillerFunction(releaseMovieContent, '.left', '.right', '.release__movies-btn');
    timeKillerFunction(chosenMoviesContent, '.left', '.right', '.chosen__movies-btn');

    function handleLike(e,movie){
        const likedClass = e.currentTarget.querySelector('.like-icon.liked');

        if (likedClass) {
            chosenData = chosenData.filter(items => {
                if(items.kinopoiskId) return  items.kinopoiskId !== movie.kinopoiskId

                if(items.filmId )  return items.filmId !== movie.filmId
            });
            likedClass.classList.remove('liked');
            LocalStorage.setItem('chosen', chosenData);
            chosenMoviesContent.innerHTML = ``;
            displayMovies(chosenData, chosenMoviesContent);
            return;
        }
        const data = findInChosen(movie)
        const likeIcon = e.currentTarget.querySelector('.like-icon');
        likeIcon.classList.toggle('liked');
        if(data){
            alert('у вас уже в избарнных есть такой фильм')
            return
        }

        movie.liked= true
        chosenData.push(movie);
        LocalStorage.setItem('chosen', chosenData);
        chosenMoviesContent.innerHTML = ``;
        displayMovies(chosenData, chosenMoviesContent);
    }
    function findInChosen(movie){
        const data  = chosenData.find(items => {
            if(items.kinopoiskId) return  items.kinopoiskId == movie.kinopoiskId

            if(items.filmId )  return items.filmId == movie.filmId
        });

        return data || null
    }
    async function getPremierMovies(){
        try {
            const response  = await Http.getPremiers({year:2024, month:"MARCH"})
            if(!response.ok){
                throw Error('error in fetching data', response)
                return
            }

            const responseData = await response.json();
            console.log(responseData)
            return responseData;
        }catch (e){
            return  e
        }
    }
    async function getReleaseMovies (){
        try {
            const response  = await Http.getReleases({year:2024, month:"MARCH"})
            if(!response.ok){
                throw Error('error in fetching data', response)
                return
            }
            const responseData = await response.json()
            console.log(responseData)
            return responseData;
        }catch (e){
            return  e
        }
    }
    async function getBestMovies(){
        try {
            const response  = await Http.getBestMovies({year:2024, month:"MARCH"})
            if(!response.ok){
                throw Error('error in fetching data', response)
                return
            }
            const responseData = await response.json();
            console.log(responseData)
            return responseData;
        }catch (e){
            return  e
        }
    }


    function displayMovies (movies=[], content) {
        movies.forEach(movie => {
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
                <button class="card__like-btn">
                    <svg class="like-icon ${findInChosen(movie) ?  'liked' : ''}" width="30" height="22" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M13 2C6.925 2 2 6.925 2 13C2 24 15 34 22 36.326C29 34 42 24 42 13C42 6.925 37.075 2 31 2C27.28 2 23.99 3.847 22 6.674C20.9857 5.22921 19.6382 4.05009 18.0715 3.23649C16.5049 2.42289 14.7653 1.99875 13 2Z" stroke="#F24E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
       `
            content.appendChild(card);
            card.querySelector('.card__like-btn')?.addEventListener('click', (e) => handleLike(e,movie));
        })
    }
    function displayChosenMovies (movies=[], content) {
        movies.forEach(movie => {
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
                <button class="card__like-btn">
                    <svg class="like-icon ${movie?.liked ? 'liked' : ''}" width="30" height="22" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M13 2C6.925 2 2 6.925 2 13C2 24 15 34 22 36.326C29 34 42 24 42 13C42 6.925 37.075 2 31 2C27.28 2 23.99 3.847 22 6.674C20.9857 5.22921 19.6382 4.05009 18.0715 3.23649C16.5049 2.42289 14.7653 1.99875 13 2Z" stroke="#F24E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
       `
            content.appendChild(card);
            card.querySelector('.card__like-btn')?.addEventListener('click', (e) => handleLike(e,movie));
        })
    }




    function main(){
        let data = LocalStorage.getItem('films');
        getPremierMovies().then(data => displayMovies(data.items, premiersMovieContent));
        // displayMovies(data.items, premiersMovieContent);
        displayMovies(data.items, expectedMoviesContent);
        getBestMovies().then(data => displayMovies(data.films, bestMoviesContent))
        // displayMovies(data.items, bestMoviesContent);
        getReleaseMovies().then(data => displayMovies(data.releases, releaseMovieContent))
        // displayMovies(data.items, releaseMovieContent);
        console.log(chosenData)
        displayChosenMovies(chosenData, chosenMoviesContent);
    }

    main()
})
