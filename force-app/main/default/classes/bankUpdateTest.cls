@isTest
public class bankUpdateTest{
    @isTest
    private static void testBtachClass(){
        list<Bank__c> bankList = new list<Bank__c>();
        
        for(integer i=0; i<5; i++){
            bankList.add(
            new Bank__c(name= 'bank'+ i, Opening_Balance__c=1000, Deposit__c=500));
            
        }
        insert bankList;
        
        Test.startTest();
        bankUpdate bankupdation = new bankUpdate();
        id batchid = database.executeBatch(bankupdation, 5);
        Test.stopTest();
        
        list<Bank__c> updateBankList = [select Id,  Name, Opening_Balance__c,Closing_Balance__c,Sales_Date__c from Bank__c];
        system.assertEquals(5, updateBankList.size());
    }

}