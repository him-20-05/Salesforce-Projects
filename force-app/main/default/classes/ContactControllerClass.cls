public with sharing class ContactControllerClass {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchKeyword) {
        String searchTerm = '%' + searchKeyword + '%';
        return [SELECT Id, Name, FirstName, LastName, Email, Phone,Title, Account.Name, Account.AccountNumber, Account.BillingAddress FROM Contact WHERE Name LIKE :searchTerm];
    }

    @AuraEnabled(cacheable=true)
public static Contact getAccountDetails(String contactId) {
    Contact selectedContact;
    try {
        selectedContact = [SELECT Id, Name, Email, Phone, Account.Name, Account.AccountNumber, Account.BillingAddress FROM Contact WHERE Id = :contactId];
    } catch (Exception e) {
        selectedContact = new Contact();
        // Handle the exception, log the error, or perform other error handling as needed
    }
    return selectedContact;
}
}
