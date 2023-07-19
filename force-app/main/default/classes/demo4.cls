public class demo4 {
    public static void countcontacts(){
        list<account> acc = [select id, name,(select id, name from contacts) from account where createddate = LAST_MONTH];
        
        if(!acc.isEmpty()){
            for(account acclist:acc){
                acclist.Total_contact__c = acclist.contacts.size();
            }
        }
        if(!acc.isEmpty()){
            update acc;
        }
    }

}