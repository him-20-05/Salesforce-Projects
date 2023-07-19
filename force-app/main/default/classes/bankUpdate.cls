public class bankUpdate implements database.Batchable<sObject>, database.stateful{
    
    public integer recordCount = 0;
    public database.QueryLocator start(database.BatchableContext bc){
        return database.getQueryLocator([select Id,  Name, Opening_Balance__c,Closing_Balance__c,Sales_Date__c from Bank__c]);
        
    }
    public void execute(database.BatchableContext bc, list<Bank__c> bankk){
        for(Bank__c bk :bankk){
            bk.Deposit__c = 0;
            bk.Charges__c = 0;
            bk.Opening_Balance__c = bk.Closing_Balance__c;
            
        }
        update bankk;
        recordCount = recordCount + bankk.size();
    }
    public void finish(database.BatchableContext bc){
        system.debug('total records'+ recordCount);
    }
    
    
}