import { LightningElement, track, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactControllerClass.searchContacts';
import getAccountDetails from '@salesforce/apex/ContactControllerClass.getAccountDetails';
import { NavigationMixin } from 'lightning/navigation';

import Appointment__c from '@salesforce/schema/Appointment__c'

// const CONTACT_COLUMNS = [
//   { label: 'Name', fieldName: 'Name', type: 'text' },
//   { label: 'Email', fieldName: 'Email', type: 'email' },
//   { label: 'Phone', fieldName: 'Phone', type: 'phone' }
// ];

export default class ContactSearch extends NavigationMixin(LightningElement) {
  @track contacts;
  //@track contactColumns = CONTACT_COLUMNS;
  @track contactOptions = [];
  @track selectedContactId = '';
  @track selectedContact = {};

  searchKeyword = '';

  objectApiName = Appointment__c;
  
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
    this.showCreateAppointment = false; // Add this line to close the "Create Appointment" page
  
    const inputField = this.template.querySelector('lightning-input');
    inputField.value = ''; // Clear the value of the input field
  }

  @wire(getAccountDetails, { contactId: '$selectedContactId' })
  loadAccountDetails({ error, data }) {
    if (data) {
      this.selectedContact = data;
    } else if (error) {
      console.error('Error retrieving account details', error);
    }
  }
  
  handleContactSelection(event) {
    this.selectedContactId = event.target.dataset.contactId;
    if (this.selectedContactId) {
      this.loadAccountDetails({ contactId: this.selectedContactId });
    } else {
      this.selectedContact = {};
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

  handleAppointmentSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const fields = event.detail.fields;
    // Set the Contact and Account IDs from the selectedContact object
    fields.Contact__c = this.selectedContact.Id;
    fields.Account__c = this.selectedContact.Account.Id;
   
    this.template.querySelector('lightning-record-form').submit(fields);
  }

  handleAppointmentCreated(event) {
    this.showCreateAppointment = false;


  
}
}