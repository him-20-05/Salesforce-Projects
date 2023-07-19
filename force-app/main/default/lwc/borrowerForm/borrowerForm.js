
import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';


const BORROWER_FORM_FIELDS = {
    RECORD_TYPE_ID: 'RecordTypeId',
    ADDRESS_1__C: 'Address_1__c',
    AMOUNT_FINANCED__C: 'Amount_Financed__c',
    CITY__C: 'City__c',
    ENTITY_NAME__C: 'Entity_Name__c',
    EXIT__C: 'Exit__c',
    MONTHLY_RENT__C: 'Monthly_Rent__c',
    OWNERSHIP__C: 'Ownership__c',
    ZIPCODE__C: 'ZipCode__c',
    STATE__C: 'State__c',
    REHAB_BUDGET__C: 'Rehab_Budget__c',
    PURCHASE_PRICE__C: 'Purchase_Price__c',
    PURCHASE_DATE__C: 'Purchase_Date__c',
    NAME: 'Name'
};

export default class BorrowerForm extends LightningElement {
    // Properties for the component
    showModal = false;
    selectedRecordType;
    modalClass;
    showRecordType1 = false;
    showRecordType2 = false;
    showRecordType3 = false;
    address1Value;
    amountValue;
    cityValue;
    entityValue;
    exitValue;
    rentValue;
    ownershipValue;
    zipCodeValue;
    stateValue;
    rehabValue;
    priceValue;
    purchaseDateValue;
    nameValue;

    // Handler for when a record type button is clicked
    handleRecordType(event) {
        // Get the name of the record type button clicked
        const recordTypeName = event.target.dataset.recordType;

        // Set the selected record type and modal class based on the record type name
        if (recordTypeName === 'ALL') {
            this.selectedRecordType = 'All';
            this.modalClass = 'slds-modal slds-fade-in-open slds-modal_small';
            this.showRecordType1 = true;
            this.showRecordType2 = true;
            this.showRecordType3 = true;
        } else if (recordTypeName === 'FIX') {
            this.selectedRecordType = 'Fix and Flip';
            this.modalClass = 'slds-modal slds-fade-in-open slds-modal_medium';
            this.showRecordType1 = true;
            this.showRecordType2 = false;
            this.showRecordType3 = false;
        } else if (recordTypeName === 'FLIPS') {
            this.selectedRecordType = 'Flips';
            this.modalClass = 'slds-modal slds-fade-in-open slds-modal_large';
            this.showRecordType1 = false;
            this.showRecordType2 = true;
            this.showRecordType3 = false;
        }

        // Open the modal
        this.showModal = true;
    }

    // Handlers for when input fields change
    handleAddress1Change(event) {
        this.address1Value = event.target.value;
    }

    handleAmountFinance(event) {
        this.amountValue = event.target.value;
    }

    handleCity(event) {
        this.cityValue = event.target.value;
    }

    handleEntity(event) {
        this.entityValue = event.target.value;
    }

    handleExit(event) {
        this.exitValue = event.target.value;
    }

    handleMonthlyRent(event) {
        this.rentValue = event.target.value;
    }

    handleOwnership(event) {
        this.ownershipValue
    }
    handleZipCode(event) {
        this.zipCodeValue = event.target.value;
    }
    
    handleState(event) {
        this.stateValue = event.target.value;
    }
    
    handleRehab(event) {
        this.rehabValue = event.target.value;
    }
    
    handlePrice(event) {
        this.priceValue = event.target.value;
    }
    
    handlePurchaseDate(event) {
        this.purchaseDateValue = event.target.value;
    }
    
    handleName(event) {
        this.nameValue = event.target.value;
    }
    
    // Handler for when the save button is clicked
    handleSave() {
        // Define the fields for the record to be created
        const fields = {};
        fields[BORROWER_FORM_FIELDS.RECORD_TYPE_ID] = this.selectedRecordType === 'All' ? null : this.selectedRecordType;
        fields[BORROWER_FORM_FIELDS.ADDRESS_1__C] = this.address1Value;
        fields[BORROWER_FORM_FIELDS.AMOUNT_FINANCED__C] = this.amountValue;
        fields[BORROWER_FORM_FIELDS.CITY__C] = this.cityValue;
        fields[BORROWER_FORM_FIELDS.ENTITY_NAME__C] = this.entityValue;
        fields[BORROWER_FORM_FIELDS.EXIT__C] = this.exitValue;
        fields[BORROWER_FORM_FIELDS.MONTHLY_RENT__C] = this.rentValue;
        fields[BORROWER_FORM_FIELDS.OWNERSHIP__C] = this.ownershipValue;
        fields[BORROWER_FORM_FIELDS.ZIPCODE__C] = this.zipCodeValue;
        fields[BORROWER_FORM_FIELDS.STATE__C] = this.stateValue;
        fields[BORROWER_FORM_FIELDS.REHAB_BUDGET__C] = this.rehabValue;
        fields[BORROWER_FORM_FIELDS.PURCHASE_PRICE__C] = this.priceValue;
        fields[BORROWER_FORM_FIELDS.PURCHASE_DATE__C] = this.purchaseDateValue;
        fields[BORROWER_FORM_FIELDS.NAME] = this.nameValue;
    
        // Call the createRecord method to insert the record
        createRecord({ apiName: 'Borrower_Track_Record__c', fields })
            .then(() => {
                // Handle success
                this.showModal = false;
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    }
}    