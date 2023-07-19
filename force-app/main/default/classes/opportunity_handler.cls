public class opportunity_handler {
    public static void insert_opportunity(list<opportunity> newList){
        set<id> accIds = new set<id>();
        list<account> accToBeUpdated = new list<account>();
        
        for(opportunity opp :newlist){
            if(opp.accountid !=null){
                accIds.add(opp.accountid);
            }
        }
        accToBeUpdated = calculateAnnualrevenue(accIds);
        
        if(!accToBeUpdated.isEmpty()){
            update accToBeUpdated;
        }
        
    }
     public static void update_opportunity(list<opportunity> newList, map<id,opportunity> oldMap){
         
         set<id> accIds = new set<id>();
        list<account> accToBeUpdated = new list<account>();
        
        for(opportunity opp :newlist){
            if(opp.accountid !=null && opp.Amount != oldMap.get(opp.id).amount){
                accIds.add(opp.accountid);
            }
        }
        accToBeUpdated = calculateAnnualrevenue(accIds);
        
        if(!accToBeUpdated.isEmpty()){
            update accToBeUpdated;
        }
    }
     public static void delete_opportunity(list<opportunity> oldList){
         
          set<id> accIds = new set<id>();
        list<account> accToBeUpdated = new list<account>();
        
        for(opportunity opp :oldlist){
            if(opp.accountid !=null){
                accIds.add(opp.accountid);
            }
        }
        accToBeUpdated = calculateAnnualrevenue(accIds);
        
        if(!accToBeUpdated.isEmpty()){
            update accToBeUpdated;
        }
        
    }
    
    public static list<account> calculateAnnualrevenue(set<id> accIds){
        
        list<account> accToBeUpdated = new list<account>();
        map<id,decimal> accIdToAnnualRevenue = new map<id,decimal>();
        
        for(opportunity opp : [select id,amount,accountid from opportunity where accountId in : accIds]){
            decimal total = 0;
            if(accIdToAnnualRevenue.containsKey(opp.AccountId)){
                total = accIdToAnnualRevenue.get(opp.AccountId);
            }
            if(opp.Amount != null){
                total = total + opp.Amount;
            }
            accIdToAnnualRevenue.put(opp.AccountId, total);
        }
        if(!accIdToAnnualRevenue.isEmpty()){
            for(id i : accIdToAnnualRevenue.keySet()){
                account acc = new account();
                acc.id = i;
                acc.AnnualRevenue = accIdToAnnualRevenue.get(i);
                accToBeUpdated.add(acc);
                
            }
        }
        return accToBeUpdated;
            
    }

}