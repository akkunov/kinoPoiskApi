import {apiKey} from "./constants.js";

export class Http {
    static async getPremiers({year, month}){
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}&page=1`
        const headers = {
            "content-type": 'application/json',
            "X-API-KEY": apiKey
        }
        return  fetch(url,{headers})

    }
    static async getReleases({year, month}){
        const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}&page=1`
        const headers = {
            "content-type": 'application/json',
            "X-API-KEY": apiKey
        }
        return  fetch(url,{headers})
    }
    static async getBestMovies({year, month}){
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?page=1`
        const headers = {
            "content-type": 'application/json',
            "X-API-KEY": apiKey
        }
        return  fetch(url,{headers})
    }

}