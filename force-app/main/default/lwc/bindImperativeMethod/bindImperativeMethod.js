import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccList';

export default class BindImperativeMethod extends LightningElement {
    accounts;
    error;

    buttonClick(){
        getAccountList()
        .then((result) =>{
            this.accounts = result;
            this.error = undefined;
        })
        .catch((error)=>{
            this.error = error;
            this.accounts = undefined;
        });

    }
}