public with sharing class controller_class {
    public list<Car_Rental__c> newList{get;set;}
    
    public controller_class(ApexPages.StandardController controller){
        newList =[select name,Pickup_Country__c,Pickup_City__c,Return_Country__c,Return_City__c,From_Date__c
                 ,To_Date__c,Pickup_Time__c,Return_Time__c from Car_Rental__c];
    }
    
    public PageReference next() {
    	PageReference pg = new PageReference('/apex/Check_email');
        pg.setRedirect(true);
        return pg;
    }
    
    

}