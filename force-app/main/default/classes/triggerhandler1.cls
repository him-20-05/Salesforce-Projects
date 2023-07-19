public class triggerhandler1 {
    public static void accountIndustry(list<account> newlist){
        for(account acc: newlist){
            if(acc.industry != null && acc.industry == 'media'){
                 acc.Rating = 'hot';
            }
        }
    }
    
    public static void createopportunity(list<account> newlist){
        list<opportunity> opp = new list<opportunity>();
        for(account acc:newlist){
            opportunity opp1= new opportunity();
            opp1.AccountId= acc.Id;
            opp1.Name= acc.Name;
            opp1.StageName= 'prospecting';
            opp1.CloseDate = system.today();
            opp.add(opp1);
        }
        if(!opp.isempty()){
            insert opp;
        }
            
    }
    public static void updateaccountphone(list<account> newlist, map<id,account> oldmap){
        
        for(account acc :newlist){
            if(oldmap != null && acc.phone != oldmap.get(acc.id).phone){
                acc.Description= 'phone is updated on account';
            }
        }
    }
    public static void updaterelatedopp(list<account> newlist, map<id,account> oldmap){
        map<id,account> accIdtoAccountMap = new map<id,account>();
        list<opportunity> oppTobeUpdated = new list<opportunity>();
        
        for(account acc : newlist){
            if(oldmap != null && acc.phone != oldmap.get(acc.id).phone){
                accIdtoAccountMap.put(acc.id,acc);
            }
        }
        
        for(opportunity opp : [select id, accountPhone__c,account.id from opportunity where accountid in :accIdtoAccountMap.keyset()]){
            
            opportunity opp1 = new opportunity();
            if(accIdtoAccountMap.containsKey(opp.accountid)){
                opp1.id = opp.id;
                opp1.accountPhone__c = accIdtoAccountMap.get(opp.accountid).phone;
                oppTobeUpdated.add(opp1);
            }
        }
        if(!oppTobeUpdated.isEmpty()){
            update oppTobeUpdated;
        }
    }
}