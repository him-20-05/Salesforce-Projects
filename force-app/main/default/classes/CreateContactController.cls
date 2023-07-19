public with sharing class CreateContactController {
    public String firstName { get; set; }
    public String lastName { get; set; }
    public String email { get; set; }
    public String phone { get; set; }
    public String DriverAge{get;set;}
    public String DrivingExperience{get;set;}
    public String NoteOptional{get;set;}
    public boolean CreditCard{get;set;}
    
    public CreateContactController(ApexPages.StandardController controller){
        
        
    }
    
    public void createContact() {
        Contact newContact = new Contact();
        newContact.FirstName = firstName;
        newContact.LastName = lastName;
        newContact.Email = email;
        newContact.Phone = phone;
        newContact.Driver_age__c=DriverAge;
        newContact.Driving_Experience__c=DrivingExperience;
        newContact.Note_optional__c=NoteOptional;
        newContact.My_credit_card_covers_CDW_in_India__c=CreditCard;
      
        try {
            insert newContact;
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.CONFIRM, 'Contact created successfully!'));
        } catch (Exception ex) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Error creating contact: ' + ex.getMessage()));
        }
       
    }
}