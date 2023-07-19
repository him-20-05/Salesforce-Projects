import { LightningElement , wire} from 'lwc';

import getAllFootwear from '@salesforce/apex/footwear.getAllFootwear';

export default class Footwear extends LightningElement {

    



    
    
    footwearInfo;

    @wire(getAllFootwear)
    books({error,data}){
        if(data){
            console.log("Footwear:", data);
            this.footwearInfo=data;
           
        }
        else if(error){
            console.log('error',error);
        }
    }
}

