@isTest
public class test_class_forAccount {
    @istest
    public static void account_handlerTest(){
        list<account> newList = new list<account>();
        
        for(integer i = 0; i<= 5; i++){
            account acc = new account();
            acc.name = 'test'+i;
            acc.Industry = 'media';
            newlist.add(acc);
        }
        test.startTest();
        insert newlist;
        test.stoptest();
        
        list<account> updatedAcc = [select id, name,industry,Rating from account where id =: newlist[0].id];
        system.assertEquals('Hot',updatedAcc[0].Rating);
    }
        

}