public with sharing class AccountControllers {
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccList(String keyword){
        String key= '%'+ keyword +'%';
        return [SELECT Id, Name, Phone FROM ACCOUNT WHERE Name Like:key ORDER BY CreatedDate desc Limit 20];

        
    }
}