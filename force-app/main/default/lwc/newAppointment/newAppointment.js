import { LightningElement, track, wire } from 'lwc';
import searchContacts from '@salesforce/apex/newContactController.searchContacts';
import getRelatedAccounts from '@salesforce/apex/newContactController.getRelatedAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountSearch extends LightningElement {
    @track customerName = '';
    @track contacts;
    @track selectedContact;
    @track relatedAccounts;

    handleCustomerNameChange(event) {
        this.customerName = event.target.value;
        if (this.customerName.length > 0) {
            this.searchContacts();
        } else {
            this.contacts = null;
            this.selectedContact = null;
            this.relatedAccounts = null;
        }
    }

    searchContacts() {
        searchContacts({ customerName: this.customerName })
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                console.error('Error retrieving contacts', error);
            });
    }

    handleContactSelection(event) {
        const contactId = event.target.dataset.contactId;
        this.selectedContact = this.contacts.find(contact => contact.Id === contactId);
        this.loadRelatedAccounts(contactId);
    }

    loadRelatedAccounts(contactId) {
        getRelatedAccounts({ contactId: contactId })
            .then(result => {
                this.relatedAccounts = result;
            })
            .catch(error => {
                console.error('Error retrieving related accounts', error);
            });
    }

    handleNewAppointment(event) {
        const accountId = event.target.dataset.accountId;
        const contactId = event.target.dataset.contactId;
        // Navigate to the appointment creation page with accountId, contactId, and other necessary details
        this.showToast('New Appointment', 'New appointment page will be opened with Account and Contact details', 'info');
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}
