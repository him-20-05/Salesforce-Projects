import { LightningElement } from 'lwc';

export default class NavigationBar extends LightningElement {
    message = {
        title: 'Amazon',
        search: 'Search on Amazon',
        username: 'UserName',
        menu: 'Show Menu',
        itemOne: 'Item One',
        itemTwo: 'Item Two',
        itemThree: 'Item Three',
        itemFour: 'Item Four',
        cart: '1',
    };
    connectedCallback() {
        this.template.addEventListener('click', this.handleClick.bind(this));
    }
    handleClick(event) {
        if (event.target.type === 'checkbox' && event.target.checked) {
            this.template.querySelector('.slds-grid').style.backgroundColor = 'black';
        } else {
            this.template.querySelector('.slds-grid').style.backgroundColor = 'white';
        }
    }
}
