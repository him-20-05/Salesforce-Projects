
import { LightningElement, track, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactControllerClass.searchContacts';
import getAccountDetails from '@salesforce/apex/ContactControllerClass.getAccountDetails';
import { NavigationMixin } from 'lightning/navigation';
import APPOINTMENT_OBJECT from '@salesforce/schema/Appointment__c';

const CONTACT_COLUMNS = [
  { label: 'Name', fieldName: 'Name', type: 'text' },
  { label: 'Email', fieldName: 'Email', type: 'email' },
  { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class ContactSearch extends NavigationMixin(LightningElement) {
  @track contacts;
  @track contactColumns = CONTACT_COLUMNS;
  @track contactOptions = [];
  @track selectedContactId = '';
  @track selectedContact = {};

  searchKeyword = '';
  objectApiName = APPOINTMENT_OBJECT;
  @track showCreateAppointment = false;

  handleSearchChange(event) {
    this.searchKeyword = event.target.value;
    this.handleSearch();
  }

  handleSearch() {
    if (this.searchKeyword.length > 0) {
      searchContacts({ searchKeyword: this.searchKeyword })
        .then((result) => {
          this.contacts = result;
          this.contactOptions = result.map((contact) => ({
            label: contact.Name,
            value: contact.Id
          }));
        })
        .catch((error) => {
          console.error('Error retrieving contacts', error);
        });
    } else {
      this.contacts = null;
      this.contactOptions = [];
    }
  }

  handleReset() {
    this.searchKeyword = '';
    this.contacts = null;
    this.contactOptions = [];
    this.selectedContactId = '';
    this.selectedContact = '';

    const inputField = this.template.querySelector('lightning-input');
    inputField.value = ''; // Clear the value of the input field
  }

  handleContactSelection(event) {
    this.selectedContactId = event.target.dataset.contactId;
    if (this.selectedContactId) {
      this.loadAccountDetails({ contactId: this.selectedContactId });
    } else {
      this.selectedContact = {};
    }
  }

  @wire(getAccountDetails, { contactId: '$selectedContactId' })
  loadAccountDetails({ error, data }) {
    if (data) {
      this.selectedContact = data;
    } else if (error) {
      console.error('Error retrieving account details', error);
    }
  }

  handleContactClick(event) {
    const contactId = event.target.dataset.contactId;
    this.navigateToRecord(contactId);
  }

  handleAccountClick(event) {
    const accountId = event.target.dataset.accountId;
    this.navigateToRecord(accountId);
  }

  navigateToRecord(recordId) {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: recordId,
        objectApiName: 'Contact',
        actionName: 'view'
      }
    });
  }

  handleNewAppointment() {
    this.showCreateAppointment = true;
  }

  handleSaveAppointment() {
    const selectedContactNameInput = this.template.querySelector('lightning-input[data-selected-contact-name]');
    const selectedAccountNameInput = this.template.querySelector('lightning-input[data-selected-account-name]');
    
    const selectedContactName = selectedContactNameInput.value;
    const selectedAccountName = selectedAccountNameInput.value;
    
    // Logic to save the appointment record goes here
    // You can now use selectedContactName and selectedAccountName
    
    this.showCreateAppointment = false;
    this.selectedContactId = '';
    this.selectedContact = {};
  }
  

  get concatenatedBillingAddress() {
    if (this.selectedContact.Account && this.selectedContact.Account.BillingAddress) {
      const address = this.selectedContact.Account.BillingAddress;
      let concatenatedAddress = '';
      
      if (address.street) {
        concatenatedAddress += `${address.street}, `;
      }
      if (address.city) {
        concatenatedAddress += `${address.city}, `;
      }
      if (address.state) {
        concatenatedAddress += `${address.state}, `;
      }
      if (address.postalCode) {
        concatenatedAddress += `${address.postalCode}, `;
      }
      if (address.country) {
        concatenatedAddress += `${address.country}`;
      }
      
      return concatenatedAddress;
    }
    
    return '';
  }

  
  
}
