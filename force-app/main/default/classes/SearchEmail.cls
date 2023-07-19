public with sharing class SearchEmail {
    
    public List<Contact> contacts {get;set;}
    public String key {get;set;}
    
    public SearchEmail(ApexPages.StandardController controller)
    {
        
    }    
    
    public PageReference search_now(){
        contacts = [SELECT Id, Name, email FROM Contact WHERE Name like :(key+'%')];
        return null;
    }
}