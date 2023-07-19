public with sharing class GetAllcontactsrecord {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        // Query the contacts based on the search term
        searchTerm = '%' + searchTerm + '%';
        return [SELECT Id, Name, Email, Phone FROM Contact WHERE Name LIKE :searchTerm OR Email LIKE :searchTerm OR Phone LIKE :searchTerm];
    }
    @AuraEnabled(cacheable=true)
    public static Account getAccountFields(Id contactId) {
        // Query the required account fields based on the contact ID
        return [SELECT Id, Name, Industry, Phone, BillingAddress FROM Account WHERE Id = :contactId];
    }
    }

    