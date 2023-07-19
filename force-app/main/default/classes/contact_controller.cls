public with sharing class contact_controller {
    public list<contact> newList {get;set;}
    
    public contact_controller(ApexPages.StandardController controller){
        
        newList=[select firstname,lastname,email,phone, Driver_Age__c,Driving_Experience__c,Note_Optional__c
                ,My_credit_card_covers_CDW_in_India__c from contact];
        
    }
    public PageReference back() {
    	PageReference pg = new PageReference('/apex/CarRental');
        pg.setRedirect(true);
        return pg;
    }

}