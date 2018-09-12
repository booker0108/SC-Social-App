export default class ApiHelper {

    // Hostname of API provider
    static HOSTNAME = 'jsonplaceholder.typicode.com'

    static async _api(endpoint, method) {
        let response = await fetch(`https://${ApiHelper.HOSTNAME}${endpoint}`, {method});
        let result = await response.json();
        return result;
    }

    /**
     * Execute GET request to RESTful endpoint
     * @param {string} endpoint Endpoint of api call
     */
    static async get(endpoint){
        return ApiHelper._api(endpoint, 'GET')
    }

    /**
     * Execute POST request to RESTful endpoint
     * @param {string} endpoint Endpoint of api call
     */
    static async post(endpoint){
        return ApiHelper._api(endpoint, 'POST')
    }
    
};