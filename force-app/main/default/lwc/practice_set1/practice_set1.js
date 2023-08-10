import { LightningElement, track, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountControllerType.getAccount'
export default class Practice_set1 extends LightningElement {
    @track accountData;
    @track error;
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
        { label: 'Owner Name', fieldName: 'OwnerName', type: 'text' },
        { label: 'Active', fieldName: 'IsActive', type: 'button',
            typeAttributes: {
                label: { fieldName: 'isActiveLabel' },
                variant: { fieldName: 'isActiveVariant' }
            }
        }
    ];

    @wire(getAccount)
    wiredAccounts({error, data}) {

        if (data) {
            this.accountData = data.map((account) => ({
                Id: account.Id,
                Name: account.Name,
                CreatedDate: account.CreatedDate,
                OwnerName: account.Owner.Name,
                IsActive: account.Active__c,
                isActiveLabel: account.Active__c ? 'Active' : 'Inactive',
                isActiveVariant: account.Active__c ? 'success' : 'destructive',
            }));
            this.error = undefined; // Reset any previous errors
        } else if (error) {
            this.accountData = undefined; // Clear the data if there was an error
            this.error = 'Error retrieving accounts: ' + error.message;
        }
    }

    }
