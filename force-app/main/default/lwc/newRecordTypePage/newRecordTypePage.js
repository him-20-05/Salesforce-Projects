import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import RECORD_TYPE_ID from '@salesforce/schema/Borrower_Track_Record__c.RecordTypeId';

const fieldsByRecordType = {
    '0122w000001rZY4AAM': ['Address_1__c', 'Name', 'Amount_Financed__c'],
    '0122w000001rZY9AAM': ['Address_1__c', 'Name', 'Amount_Financed__c'],
    '0122w000001rZYJAA2': ['Address_1__c', 'Name', 'Amount_Financed__c']
    // add more record types and fields as needed
};

export default class BorrowerForm extends LightningElement {
    @api recordId;
    @track selectedRecordType;
    recordTypeId;

    @wire(getRecord, { recordId: '$recordId', fields: [RECORD_TYPE_ID] })
    wiredRecord({ error, data }) {
        if (data) {
            console.log('record type Id: ', data.fields.RecordTypeId.value);
            this.recordTypeId = data.fields.RecordTypeId.value;
        } else if (error) {
            console.error(error);
        }
    }

    get recordTypeOptions() {
        console.log('recordTypeOptions called');
        return Object.keys(fieldsByRecordType).map((recordTypeId) => {
            return { label: recordTypeId, value: recordTypeId };
        });
    }

    get recordTypeFields() {
        console.log('recordTypeFields called');
        return fieldsByRecordType[this.recordTypeId];
    }

   
 
}
