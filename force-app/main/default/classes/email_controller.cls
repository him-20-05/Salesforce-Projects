public class email_controller {
    public string email{get;set;}
    
    public pageReference checkEmail(){
        
   
    contact existingContact;
    

        try {
            existingContact = [SELECT Id FROM Contact WHERE Email = :email];
        } catch (Exception e) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'An error occurred while checking the email on Contact records: ' + e.getMessage()));
            return null;
        }

        if (existingContact == null) {
            PageReference contact_pages = Page.contact_pages;
            contact_pages.setRedirect(true);
            contact_pages.getParameters().put('email', email);
            return contact_pages;
        } else {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.WARNING, 'A Contact record already exists with this email address.'));
            return null;
        }
    }
}