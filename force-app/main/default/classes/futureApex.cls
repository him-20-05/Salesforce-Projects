public class futureApex {
    @future
    public static void countContacts(list<id> accIds){
        list<account> accList = [select id ,(select id from contacts)from account
                                where id in : accIds];
        for(account acc : accList){
            acc.Total_contact__c = acc.contacts.size();
        }
        if(!accList.isempty()){
            update acclist;
        }
    }

}