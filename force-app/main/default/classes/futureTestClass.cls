@isTest
public class futureTestClass{
    @isTest
    private static void testFutureClass(){
        list<account> accList = new list<account>();
        
        for(integer i=0; i<250; i++){
            accList.add(new Account(name = 'test'+i));
        }
        insert accList;
        
        list<contact> conList = new List<contact>();
        list<id> accIds = new List<id>();
        for(account acc:accList){
            conList.add(new contact(firstName = 'test', lastName= acc.name, accountId=acc.id));
            accIds.add(acc.Id);
        }
        insert conList;
        
        test.startTest();
        futureApex.countContacts(accIds);
        test.stopTest();
        
        list<account> accs = [select id, Total_contact__c from Account];
        
        system.assertEquals(1, accs[0].Total_contact__c,'contacts not updated successfully');
    }
}