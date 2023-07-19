public class accountTriggerhandler {
    public static void beforeinsert(list<Account> newlist){
        for(Account acc : newlist){
            acc.description = 'test description';
        }
    }

}