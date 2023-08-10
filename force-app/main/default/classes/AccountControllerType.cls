public with sharing class AccountControllerType {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
        try {
            return[SELECT Id, Name, CreatedDate, Owner.Name, Active__c FROM Account];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}