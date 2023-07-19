public class demo2 {
    public static void updatephone(){
        list<account> acc = [select id, name,phone from account where createddate = LAST_WEEK ];
        
        if(acc.size()>0){
            for(account acclist :acc){
                acclist.phone = '1234567890';
               
            }
        }
        if(acc.size()>0){
             update acc;
        }
    }
    

}