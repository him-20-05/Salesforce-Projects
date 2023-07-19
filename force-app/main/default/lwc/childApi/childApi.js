import { LightningElement ,api} from 'lwc';

export default class ChildApi extends LightningElement {
    @api percentage;

    get style(){
        return `background-color:orange; min-height:20px; width:${this.percentage}%; min-width:20px; boder:1px solid black`;
    }

}