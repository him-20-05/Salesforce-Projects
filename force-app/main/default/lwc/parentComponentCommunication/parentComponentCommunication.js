import { LightningElement } from 'lwc';

export default class ParentComponentCommunication extends LightningElement {
    count = 1;
    handleOnChange(){
        this.count = this.count + 1;
    }
}