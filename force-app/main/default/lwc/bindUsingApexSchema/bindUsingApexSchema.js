import { LightningElement,wire,api} from 'lwc';
import getSingleAccountList from '@salesforce/apex/AccountController.getSingleAccount';
import {getSObjectValue} from '@salesforce/apex';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class BindUsingApexSchema extends LightningElement {
    @api recordid;
    @wire(getSingleAccountList) account;

    get name(){
        return this.account.data ? getSObjectValue(this.account.data, NAME_FIELD):'';
    }
    get phone(){
        return this.account.data ? getSObjectValue(this.account.data, PHONE_FIELD):'';
    }
}