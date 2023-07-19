public class CheckContactController {
    public String email { get; set; }
    public string NoteOptional{get;set;}

    public PageReference checkEmailOnContact() {
      list< Contact> existingContact;

        try {
            existingContact = [SELECT Id,email FROM Contact WHERE Email = :email];
        } catch (Exception e) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'An error occurred while checking the email on Contact records: ' + e.getMessage()));
            return null;
        }

        if (existingContact.isEmpty()) {
           PageReference Create_contact_page = Page.Create_contact_page;
           Create_contact_page.setRedirect(true);
           Create_contact_page.getParameters().put('email', email);
            return Create_contact_page;
        } else {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.WARNING, 'A Contact record already exists with this email address.'));
            return null;
        }
    }
     public PageReference back() {
    	PageReference pg = new PageReference('/apex/CarRental');
        pg.setRedirect(true);
        return pg;
    }
}