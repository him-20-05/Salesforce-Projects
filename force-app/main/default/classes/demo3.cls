public class demo3 {
    
    public static void updateopp(){
        list<opportunity> opp = new list<opportunity>();
        
        for(opportunity opp1 : [select id, name,stagename, closedate from opportunity where createddate = LAST_WEEK ]){
            
            if(opp1.StageName == 'closed won'){
                opp1.Description = 'opportunity is closed won';
            }
             else if(opp1.StageName == 'closed lost'){
                opp1.Description = 'opportunity is closed lost';
            }
            opp.add(opp1);
       
    }
        if(!opp.isempty()){
            update opp;
        }

}
}