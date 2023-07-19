@RestResource(urlMapping='/checkAccount/*/Checkcontacts')
global with sharing class AccountManager {
    
    @HttpGet
    global static Account getAccount(){
        RestRequest request =RestContext.request;
        String accountId = request.requestURI.substringBetween('Account/','/contacts');
        system.debug(accountId);
        Account result = [select id,name,(select id, FirstName,LastName from Contacts)from Account
                         where Id = :accountId];
          system.debug(result);
        return result;
    }

}