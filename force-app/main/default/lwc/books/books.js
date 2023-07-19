import { LightningElement , wire} from 'lwc';
import booksRecord from '@salesforce/resourceUrl/booksRe';

import getAllBooks from '@salesforce/apex/Books.getAllBooks';



export default class Books extends LightningElement {

    //bookResources = booksRecord+'/Books/ah.jpg';
    bookInfo;

    @wire(getAllBooks)
    books({error,data}){
        if(data){
            console.log("Books records:", data);
            this.bookInfo=data;
        }
        else if(error){
            console.log('error',error);
        }
    }
}

