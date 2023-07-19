import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    handleClick() {
        console.log('###Handle Click');
        this.template.querySelector('c-child').refresh();
    }

    handleClickPro(){
        console.log('###Handle Click Pro');
        this.refs.childcmp.refresh();            //this is for template reference not using query selectors
    }
}