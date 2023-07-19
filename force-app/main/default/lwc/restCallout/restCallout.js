import { LightningElement } from 'lwc';

export default class RestCallout extends LightningElement {
    randomJoke;
    connectedCallback(){
        const calloutURL = "https://icanhazdadjoke.com";
        fetch(calloutURL, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })

        .then((Response) => {
            if(Response.ok) {
                return Response.json();
            }
        })
        .then((responseJSON) => {
            this.JokeOfTheDay = responseJSON.joke;
        })
    }
}