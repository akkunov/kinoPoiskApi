import {baseUrl, globalHeader} from "./constants.js";

export class Http {
    static async getPremiers({year, month}){
        const url = `${baseUrl}premieres?year=${year}&month=${month}&page=1`
        return  fetch(url,{headers:globalHeader})

    }
    static async getReleases({year, month}){
        const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}&page=1`
        return  fetch(url,{headers:globalHeader})
    }
    static async getBestMovies({year, month}){
        const url = `${baseUrl}/top?page=1`
        return  fetch(url,{headers:globalHeader})
    }

}