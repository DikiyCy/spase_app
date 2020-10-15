export default class FetchData {

    startUrl = 'https://api.spacexdata.com/v4/';

    getResource = async url => {
        const res = await fetch(url);

        // проверяем на ошибку
        if (!res.ok) {
            throw new Error (`Ha-ha, error: ${res.status}`);
        }

        return await res.json();

    };

    getRocket = async () => {
        return this.getResource(this.startUrl + 'rockets');
    };

    getLaunches = async () => {
        return this.getResource(this.startUrl + 'launches/past');
    };

    getCompany = async () => {
        return this.getResource(this.startUrl + 'company');
    };



}
