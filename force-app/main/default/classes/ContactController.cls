public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContacts(String accId){
        try {
            return[
                SELECT accountId, Id, FirstName,LastName
                FROM contact
                WHERE accountId =:accId
                WITH SECURITY_ENFORCED
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}