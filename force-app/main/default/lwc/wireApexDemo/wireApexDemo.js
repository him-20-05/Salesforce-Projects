import { LightningElement, api, wire } from 'lwc';

import getContacts from '@salesforce/apex/ContactController.getContacts';


export default class WireApexDemo extends LightningElement {

    @api recordId;

    @wire(getContacts, {accId:'$recordId'})
    wiredContacts({data,error}){
        if(data){
            this.allContacts = data;
            console.log(data);
        }else if(error){
            console.log(error);
        }

    } //data and error

}