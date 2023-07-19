public with sharing class show_accountRecords{ 
       public List<Account> records {get; set;} 
       //public boolean display{get;set;}
    
 
   
public show_accountRecords(){ 
    
    try{
        
         
       records = [select Name, AccountNumber, phone,NumberOfEmployees,Rating,AnnualRevenue from Account 
                  where lastModifiedDate <= LAST_N_DAYS:120
                  limit 10]; 
} 
        catch(Exception ex){
            ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.ERROR,'Account Record page is not showing');
            ApexPages.addMessage(myMsg);
     
      
    }
    
      
}  
}