import { LightningElement , wire} from 'lwc';
import fashionRecord from '@salesforce/resourceUrl/fashionRe';

import getAllFashion from '@salesforce/apex/fashion.getAllFashion';

export default class Fashion extends LightningElement {

    
    //fashionResources = fashionRecord+'/Fashion/abc.jpg';

    fashionInfo;

    @wire(getAllFashion)
    books({error,data}){
        if(data){
            console.log("Fashion:", data);
            this.fashionInfo=data;
           
        }
        else if(error){
            console.log('error',error);
        }
    }
}
