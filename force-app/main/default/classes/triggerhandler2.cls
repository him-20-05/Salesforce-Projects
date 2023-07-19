public class triggerhandler2 {
    
    public static void bankRecord(list<Bank__c> newlist,map<id,Bank__c> oldmap ){
         
        
         //map<id,Bank__c> bankIdtoMap = new map<id,Bank__c>();
         list<bank__c> bankTobeUpdated = new list<Bank__c>();
        
        set<id> bankid = new set<id>();
  
        

             for(Bank__c bankv : newlist){
                 if(oldmap != null && bankv.Opening_Balance__c != oldmap.get(bankv.id).Opening_Balance__c){
                     //bankIdtoMap.put(bankv.id,bankv);
                     bankid.add(bankv.Id);
                     
             
              }
                
           }
         for(bank__c bkk : [select id,  name, Opening_Balance__c,Closing_Balance__c,Sales_Date__c from Bank__c where name = 'BOI']){
             
            
             if(bkk.Sales_Date__c == system.today()+ 1){
                 
                 bkk.Opening_Balance__c = bkk.Closing_Balance__c;
                 bankTobeUpdated.add(bkk);
             }
            }
        
        if(!bankTobeUpdated.isEmpty()){
            update bankTobeUpdated;
            
            system.debug('bank'+ bankTobeUpdated);
        
        
       
        
      }
}
}