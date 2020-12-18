import {APIRequestResponse} from "./APIRequestResponse";

export class APIRequest {

    endpoint : string | undefined;
    body : any;

    async send() : Promise<APIRequestResponse> {
        const apiUrl = "http://localhost:2020";
        const reqUrl : string = apiUrl + this.endpoint;
        const bodyJson = JSON.stringify(this.body);
        return new Promise(function(resolve, reject){
            let req = new XMLHttpRequest();
            req.open('POST', reqUrl);
            req.onload = () => {
                if(req.status >= 200 && req.status < 300) {
                    resolve(JSON.parse(req.response));
                } else {
                    reject(req.statusText);
                }
            };
            req.setRequestHeader("Content-type", "application/json");
            req.onerror = () => reject(req.statusText);
            req.send(bodyJson);
            console.log(bodyJson);
        });
    }
}