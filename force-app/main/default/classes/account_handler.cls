public class account_handler {
    public static void populate_industry_field(list<account> newlist){
        for(account acc : newlist){
            if(acc.Industry == 'media' || acc.Industry == 'energy'){
                acc.Rating = 'hot';
            }
        }
    }

}