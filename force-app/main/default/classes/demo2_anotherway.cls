public class demo2_anotherway {
    
     public static void updatephone(){
        list<account> acc = new list<account>();
        
        
            for(account acclist :[select id, name,phone from account where createddate = LAST_WEEK ]){
                acclist.phone = '123456';
                acc.add(acclist);
               
            }
        
        if(acc.size()>0){
             update acc;
        }
    }
    



}