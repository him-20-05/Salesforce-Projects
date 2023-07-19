public class demo8 {
    public static void updatecontactphone(){
        list<account> acclist = [select id, name,phone,(select id, phone from contacts) from account where createddate = THIS_MONTH];
        list<contact> conlist = new list<contact>();
        if(!acclist.isEmpty()){
            for(account acc : acclist){
                if(acc.phone == null){
                    for(contact con : acc.contacts){
                        contact conrec = new contact();
                        conrec.id = con.id;
                        conrec.phone = acc.Phone;
                        conlist.add(conrec);
                    }
                }
                
            }
        }
        if(!conlist.isempty()){
            update conlist;
        }
    }

}