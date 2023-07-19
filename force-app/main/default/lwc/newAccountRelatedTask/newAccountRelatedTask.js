import { LightningElement, track, wire } from 'lwc';
import searchContacts from '@salesforce/apex/GetAllcontactsrecord.searchContacts';

export default class NewAccountRelatedTask extends LightningElement {
    @track searchTerm = '';
    @track contactList = [];
    @track selectedContactId;
    @wire(searchContacts) contacts;
    contactId;

    handleAccountRadioChange(event) {
        this.contactId = event.target.dataset.contactId;
        const sampleDemo = new CustomEvent('samplevent', {
            detail: this.contactId
        });
        this.dispatchEvent(sampleDemo);
    }
    


    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }

    handleSearch() {
        searchContacts({ searchTerm: this.searchTerm })
            .then(result => {
                this.contactList = result;
            })
            .catch(error => {
                // Handle error
            });
    }

    handleReset() {
        this.searchTerm = '';
        this.contactList = [];
        this.selectedContactId = undefined;
    }

   
}
