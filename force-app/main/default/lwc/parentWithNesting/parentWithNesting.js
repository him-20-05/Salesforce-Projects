import { LightningElement } from 'lwc';
import findAccList from '@salesforce/apex/AccountControllers.findAccList';

export default class ParentWithNesting extends LightningElement {
    myData;
    error;
    handleOnChange(event){
        const keyword = event.target.value;
        if(keyword != null && keyword.length>0){
            findAccList({keyword})
               .then((result)=>{
                  this.myData = result;
                  this.error = undefined;

            })
               .catch((error)=>{
                  this.error = error;
                  this.myData = undefined;
            });
        }
        else{
            this.myData = undefined;
        }
    }
}