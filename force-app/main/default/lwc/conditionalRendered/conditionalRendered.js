import { LightningElement } from 'lwc';

export default class ConditionalRendered extends LightningElement {
    myValue = "salesforce lightning";
    showMe = false;
    handleChange(event){
        this.showMe = event.target.checked;
    }
}