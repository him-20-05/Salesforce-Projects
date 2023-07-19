public with sharing class footwear {
    @AuraEnabled(cacheable=true)
    public static List<Footwear__c> getAllFootwear() {
        try{
            return [SELECT Id, Name, Image__c, Type__c, Price__c 
                    FROM Footwear__c 
                    LIMIT 40];
        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
