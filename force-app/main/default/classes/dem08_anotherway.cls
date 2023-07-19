public class dem08_anotherway {
    public static void updatecontactphone(){
        list<account> acclist = [select id, name,phone from account where createddate = THIS_MONTH and phone != null];
        map<id,account> accIdtoaccountmap = new map<id,account>(acclist);
        list<contact> conlist = [select id,accountid,phone from contact where accountid IN:accIdtoaccountmap.keyset()];
        list<contact> contactstobeupdated = new list<contact>();
        if(!conlist.isEmpty()){
            
                    for(contact con : conlist){
                        if(accIdtoaccountmap.containsKey(con.AccountId)){
                            contact conrec = new contact();
                            conrec.id = con.id;
                            conrec.phone = accIdtoaccountmap.get(con.AccountId).Phone;
                            contactstobeupdated.add(conrec);
                        }
                        
                    }
                }
                
            
        
        if(!contactstobeupdated.isempty()){
            update contactstobeupdated;
        }
    }


}