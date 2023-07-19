import { LightningElement, track, wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/GetAllcontactsrecord.getAccountFields';

export default class ParentOne extends LightningElement {
    @track contactId;
    @track records;
    @track error;

    @wire(getAccountDetails, { contactId: '$contactId' })
    wiredConData({ error, data }) {
    
        if (data) {
            this.records = data;
            this.error = undefined;
        } else {
            this.records = undefined;
            this.error = error;
        }
    }

    handleChange(event) {
        this.contactId = event.detail;
    }
}
