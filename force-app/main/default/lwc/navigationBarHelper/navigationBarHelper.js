import { LightningElement } from 'lwc';

import{NavigationMixin} from 'lightning/navigation'

export default class NavigationBarHelper extends NavigationMixin(LightningElement) {

    navigateToBook(e){
        console.log("Books...");
        this[NavigationMixin.Navigate]({
            "type":"standard__webPage",
            "attributes":{
                "url":"/books"
            }

        })
    }

    navigateToHome(e){
        console.log("Home...");
        this[NavigationMixin.Navigate]({
            "type":"standard__webPage",
            "attributes":{
                "url":"/"
            }

        })
    }
    navigateToFashion(e){
        console.log("Fashion...");
        this[NavigationMixin.Navigate]({
            "type":"standard__webPage",
            "attributes":{
                "url":"/fashion"
            }

        })
    }
}