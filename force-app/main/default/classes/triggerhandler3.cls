public class triggerhandler3 {
    
    public static void accountDeletion(list<account> oldlist){
        Set<Id> setacc = new Set<Id>();
        for(Account a : oldlist)
        {
            setacc.add(a.Id);
        }
          Map<Id, Account> accts = new Map<Id, Account>([select id, (Select Id from Opportunities) from Account  where id in :setacc]);
        for(Account a : oldlist){
            if(accts.get(a.id).Opportunities.size()>0){
                a.adderror('This Account has some related Opportunity record(s), you cannot delete this Account');
            }
        }                                       
    }
}