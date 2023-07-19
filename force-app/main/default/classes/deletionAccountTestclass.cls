@isTest
public class deletionAccountTestclass {
    @istest
    private static void accountdeletion(){
        account a= new account();
        a.Name = 'dbhuqs';
        a.id = '0012w00001MFbWYAA1';
        insert a;
        
        opportunity opp = new opportunity();
        opp.AccountId = '0012w00001MFbWYAA1';
        insert opp;
        
       
        
        test.startTest();
          try{
              
              delete a;
             
        }
        catch(Exception e){
            Boolean expectedExceptionThrown =  e.getMessage().contains('This Account has some related Opportunity record(s), you cannot delete this Account') ? true : false;
           
            System.assertEquals(expectedExceptionThrown, false);
        }

 
        
        test.stopTest();
        
        
       
      
       
            
            
            
            
        }
    }