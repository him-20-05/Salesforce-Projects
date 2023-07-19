public with sharing class newContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String customerName) {
        String searchTerm = '%' + customerName + '%';
        return [SELECT Id, Name FROM Contact WHERE Name LIKE :searchTerm];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getRelatedAccounts(String contactId) {
        return [SELECT Id, Name FROM Account WHERE Id = :contactId];
    }
}
