public class Books {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks() {

        try{
            return [
                SELECT Id,Name,Author_Name__c,Book_Category__c,
                CoverImage__c,Languages__c,Price__c 
                FROM Book__c Limit 40];

        }
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
       

    }
}