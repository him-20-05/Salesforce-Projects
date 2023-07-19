trigger BankRecord on Bank__c (before insert, after update) {
    
    
        set<id> bankid = new set<id>();
  
        

             for(Bank__c bankv : Trigger.new){
                 if(Trigger.oldmap != null && bankv.Opening_Balance__c != Trigger.oldmap.get(bankv.id).Opening_Balance__c){
                   system.debug('bankid'+bankid);
                     bankid.add(bankv.Id);
             
              }
                
           }
    
         list<bank__c> banktobeUpdated = new list<bank__c>();
         for(bank__c bkk : [select id,  name, Opening_Balance__c,Closing_Balance__c,Sales_Date__c from Bank__c where id in : bankid
                           and sales_date__c = today]){
             
            
            System.debug('banktobeUpdated'+banktobeUpdated);
                 
                 bkk.Opening_Balance__c = bkk.Closing_Balance__c;
                 bankTobeUpdated.add(bkk);
             }
            
        
          if(!bankTobeUpdated.isEmpty()){
            update bankTobeUpdated;
            
            system.debug('Updated bank record'+ bankTobeUpdated);
        
        
       
        
      }
}