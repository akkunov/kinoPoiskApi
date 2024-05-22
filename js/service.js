export class LocalStorage{
    static getItem(key) {
        const data = localStorage.getItem(key)
        if (!data) {
            return null
        }
        return JSON.parse(data) || null
    }

    static setItem(key, data) {
        const jsonData = JSON.stringify(data)
        localStorage.setItem(key, jsonData);
    }
}