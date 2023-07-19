public with sharing class fashion {
    @AuraEnabled(cacheable=true)
    public static List<Fashion__c> getAllFashion() {

        try{
            return [
                SELECT Id,Name,Footwear__c,
                Cover_Image__c,Clothes__c,Price__c 
                FROM Fashion__c Limit 40];

        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
       

    }
}