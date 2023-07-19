import { LightningElement } from 'lwc';

export default class ChildComponentCommunication extends LightningElement {
    endValue = 5;
    handleOnClick(){
        const myEndCustomValue = new CustomEvent('increasecount',{
            detail:{
                endValue : this.endValue,
                msg : 'this is a string'
            }
            
        })
        this.dispatchEvent(myEndCustomValue);
    }
}