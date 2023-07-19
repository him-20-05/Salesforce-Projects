public class ContactControl {
    public String searchString { get; set; }
    public String email { get; set; }
    public Boolean emailFound { get; set; }
  
    
  
    public PageReference searchEmail() {
        List<Contact> contacts = [SELECT Email FROM Contact WHERE Email = :searchString];
        if (contacts.size() > 0) {
            email = contacts[0].Email;
            emailFound = true;
            return null;
        } if (contacts.isEmpty()) {
           PageReference Create_contact_page = Page.Create_contact_page;
           Create_contact_page.setRedirect(true);
           Create_contact_page.getParameters().put('email', email);
            return Create_contact_page;
        } else {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.WARNING, 'A Contact record already exists with this email address.'));
            return null;
        }
    }
}