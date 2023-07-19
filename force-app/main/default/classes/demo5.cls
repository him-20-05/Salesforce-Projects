public class demo5 {
    public static void copyphoneaccount(){
        list<contact> conlist = [select id, name,Phone, account.phone from contact where accountid != null];
        
        if(!conlist.isempty()){
            for(contact con : conlist){
                if(con.phone == null){
                    con.phone = con.account.phone;
                }
            }
        }
        if(!conlist.isempty()){
            update conlist;
        }
            
        
    }

}