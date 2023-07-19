import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldvalue} from 'lightning/uiRecordApi';


 import NAME_FIELD from '@salesforce/schema/Account.Name';
 import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class wireDecorator extends LightningElement {

    @api recordId;
    @wire(getRecord, {recordId: '$recordId', fields: [NAME_FIELD, PHONE_FIELD]})
    record;  //data and error
    
    

    get name(){
        return this.record.data ? getFieldvalue(this.record.data, NAME_FIELD) : ''; //or we can do this way also

        //return this.record.data.fields.name.value;

    } //ternary operator

    get phone(){
        return this.record.data ? getFieldvalue(this.record.data, PHONE_FIELD) : '';

        //return this.record.data.fields.phone.value;
        
    }
}