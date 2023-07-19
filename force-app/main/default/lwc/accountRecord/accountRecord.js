import { LightningElement } from 'lwc';
import{showToastEvent} from 'lightning/platformShowToastEvent';   // toast event for displaying success message
import ACCOUNT_OBJECT  from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';


export default class accountRecord extends LightningElement {
    objectApiName=ACCOUNT_OBJECT;
    fields=[NAME_FIELD,PHONE_FIELD,REVENUE_FIELD];
    handleSuccess(Event){
        const ToastEvent = new showToastEvent({
            title:"Account record has been created sucessfully",
            message:"Account Created: ",

            variant :"Success"
        });
        this.dispatchEvent(ToastEvent);
   }
}