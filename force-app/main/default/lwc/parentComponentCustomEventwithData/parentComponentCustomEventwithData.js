import { LightningElement } from 'lwc';

export default class ParentComponentCommunication extends LightningElement {
    endValueInParent = 0;
    count = 1;
    msg = 'Default message';
    handleOnChange(event){
        this.endValue = event.detail.endValue
        this.msg = event.detail.msg;
        if(this.count < this.endValue)
        this.count = this.count + 1;
}
}