import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendMassEmail from '@salesforce/apex/sendEmail.sendMassEmails';


export default class SendMassEmail extends LightningElement {

    @track showButton = false;

    handleCheckboxChange(event) {
        this.showButton = event.target.checked;
        
        if (this.showButton) {
            sendMassEmail()
                .then(() => {
                
                    this.showToast('Success', 'Mass email sent successfully.', 'success');
                })
                .catch((error) => {
                 
                    this.showToast('Error', 'Error sending mass email: ' + error.message, 'error');
                });
        }
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
}