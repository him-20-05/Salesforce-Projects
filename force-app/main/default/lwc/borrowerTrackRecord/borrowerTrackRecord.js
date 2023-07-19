import { LightningElement ,api,track,wire} from 'lwc';



export default class BorrowerTrackRecord extends LightningElement {

    
  
   @track currentStep = '1';
 
    handleOnStepClick(event) {
        this.currentStep = event.target.value;
    }
 
    get isStepOne() {
        return this.currentStep === "1";
    }
 
    get isSteptwo() {
        return this.currentStep === "2";
    }
 
    get isStepThree() {
        return this.currentStep === "3";
    }
    get isStepFour() {
        return this.currentStep === "4";
    }
    get isStepFive() {
        return this.currentStep === "5";
    }
    get isStepSix() {
        return this.currentStep === "6";
    }
    get isStepSeven() {
        return this.currentStep === "7";
    }
 
    get isEnableNext() {
        return this.currentStep != "7";
    }
 
    get isEnablePrev() {
        return this.currentStep != "1";
    }
 
    get isEnableFinish() {
        return this.currentStep === "7";
    }

    
 
    handleNext() {

        // document.getElementById('btn').onclick = function() {  
        //     var markedCheckbox = document.getElementsByName('maritalStatus');  
        //     for (var checkbox of markedCheckbox) {  
        //       if (checkbox.checked)  
        //         document.body.append(checkbox.value + ' ');  
        //     }  
        //   }  

        //   document.getElementById('btn').onclick = function() {  
        //     var markedCheckbox = document.getElementsByName('None');  
        //     for (var checkbox of markedCheckbox) {  
        //       if (checkbox.checked)  
        //         document.body.append(checkbox.value + ' ');  
        //     }  
        //   }  
        //   document.getElementById('btn').onclick = function() {  
        //     var markedCheckbox = document.getElementsByName('Yes');  
        //     for (var checkbox of markedCheckbox) {  
        //       if (checkbox.checked)  
        //         document.body.append(checkbox.value + ' ');  
        //     }  
        //   }  

        //   document.getElementById('btn').onclick = function() {  
        //     var markedCheckbox = document.getElementsByName('NO');  
        //     for (var checkbox of markedCheckbox) {  
        //       if (checkbox.checked)  
        //         document.body.append(checkbox.value + ' ');  
        //     }  
        //   }  

          
        //   document.getElementById('btn').onclick = function() {  
        //     var markedCheckbox = document.getElementsByName('Experience');  
        //     for (var checkbox of markedCheckbox) {  
        //       if (checkbox.checked)  
        //         document.body.append(checkbox.value + ' ');  
        //     }  
        //   }  

        //   document.getElementById('btn').onclick = function() {  
        //     var markedCheckbox = document.getElementsByName('scale');  
        //     for (var checkbox of markedCheckbox) {  
        //       if (checkbox.checked)  
        //         document.body.append(checkbox.value + ' ');  
        //     }  
        //   }  


    
        if (this.currentStep == "1") {
            this.currentStep = "2";
        } else if (this.currentStep == "2") {
            this.currentStep = "3";
        } else if (this.currentStep == "3") {
            this.currentStep = "4";
        } else if (this.currentStep == "4") {
            this.currentStep = "5";
        } else if (this.currentStep == "5") {
            this.currentStep = "6";
        } else if (this.currentStep == "6") {
          
            this.currentStep = "7";
        } 
    }
    
 
    handlePrev(){
        if(this.currentStep == "7"){
            this.currentStep = "6";
        }
        else if(this.currentStep == "6"){
            this.currentStep = "5";
        }else if(this.currentStep == "5"){
            this.currentStep = "4";
        }else if(this.currentStep == "4"){
            this.currentStep = "3";
        }
        else if(this.currentStep == "3"){
            this.currentStep = "2";
        }
        else if(this.currentStep = "2"){
            this.currentStep = "1";
        }
    }
 
    handleFinish(){
 
    }

    //areDetailsVisible = false;
 
  
    // @track isDisabled= true;
    // handleonChange(event){
    //    if(event.target.checked == 'All'){
    //     this.isDisabled =true;
    //    }else{
    //     this.isDisabled =false;
    //    }
    // }

   
    // handleCheckboxChange(event) {
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'married' ? this.template.querySelector('[name="notMarried"]') : this.template.querySelector('[name="married"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    
   
    

    
    
    handleCheckboxChange(event) {
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
    }
       
      handleCheckbox(event) {
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
       
      }
      
    

    // handlecheckboxChange(event) {
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'YES' ? this.template.querySelector('[name="NO"]') : this.template.querySelector('[name="YES"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    handlecheckboxChange(event) {
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
    }
    
    // handleCheckbox(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === 'None' ? this.template.querySelectorAll('[name="1-3 Deals"], [name="5+ Deals"]') : this.template.querySelector('[name="None"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;
    
    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }



    // handlecheckbox(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '1-3 Deals' ? this.template.querySelectorAll('[name="None"], [name="5+ Deals"]') : this.template.querySelector('[name="1-3 Deals"]');

       
    
    //     checkboxes.forEach(checkbox => {
           
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
    // handleCheckBox(event){
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '5+ Deals' ? this.template.querySelectorAll('[name="None"], [name="1-3 Deals"]') : this.template.querySelector('[name="5+ Deals"]');

       
    //     checkboxes.forEach(checkbox => {
            
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
        
        //const checkboxes = this.template.querySelectorAll('input[type="checkbox"]');
        
        // checkboxes.forEach(checkbox => {
        //     if (checkbox.name !== selectedCheckbox.name) {
        //         checkbox.disabled = selectedCheckbox.checked;
        //     }
        // });
    

    // handleBox(event){
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'Yes' ? this.template.querySelector('[name="No"]') : this.template.querySelector('[name="Yes"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    handleBox(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
    }

    // handleEvent(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === 'NONE' ? this.template.querySelectorAll('[name="1-3 DEALS"], [name="5+ DEALS"]') : this.template.querySelector('[name="NONE"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;
    
    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
    // handleevent(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '1-3 DEALS' ? this.template.querySelectorAll('[name="NONE"], [name="5+ DEALS"]') : this.template.querySelector('[name="1-3 DEALS"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;
    
    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
    // handleEvents(event){
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '5+ DEALS' ? this.template.querySelectorAll('[name="NONE"], [name="1-3 DEALS"]') : this.template.querySelector('[name="5+ DEALS"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;
    
    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }

    handleEvent(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
    }

    // YesEvent(event){
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'scale' ? this.template.querySelector('[name="scales"]') : this.template.querySelector('[name="scale"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    YesEvent(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
    }

    formsection1(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
          if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
          }
        });
      }

      areDetailsVisible = false;
      handleChange(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
        if (clickedCheckbox.value === "other" && clickedCheckbox.checked) {
            this.areDetailsVisible = true;
        } else {
            this.areDetailsVisible = false;
        }
    }
    gapFinancing(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }

    exitStrategy(event){
        const clickedCheckbox = event.target;
        const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
        checkboxes.forEach((checkbox) => {
            if (checkbox !== clickedCheckbox) {
                checkbox.checked = false;
            }
        });
    }
      
}
        


