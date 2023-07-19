import { LightningElement } from 'lwc';

export default class DynamicBinding extends LightningElement {
    myValue = 'Salesforce lightning';
    handleChange(event){
        this.myValue = event.target.value;
    }
}