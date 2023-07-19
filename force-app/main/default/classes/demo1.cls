public class demo1 {
    public static void oppcreated(){
        list<account> acc = [select id, name from account where createddate = THIS_YEAR];
        list<opportunity> opptobecreated = new list<opportunity>();
        
        if(acc.size()>0){
        for(account acclist : acc){
        opportunity opp = new opportunity();
            opp.Name = acclist.name;
            opp.CloseDate = system.today();
            opp.StageName = 'prospecting';
            opp.AccountId = acclist.id;
            opptobecreated.add(opp);
            
    }
            if(opptobecreated.size()> 0 ){
                insert opptobecreated;
            }
        
   }
    
    
    }

}