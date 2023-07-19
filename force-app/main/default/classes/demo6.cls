public class demo6 {
    public static void totalsalary(){
        list<account> acc = [select id, total_salary__c ,(select id, salary__c from employees__r) from account where createddate = THIS_YEAR];
        if(!acc.isempty()){
            for(account acclist: acc ){
                decimal totalsal = 0;
                for(employee__c emp:acclist.employees__r){
                    totalsal = totalsal + emp.salary__c;
                }
                acclist.total_salary__c = totalsal;
            }
        }
        if(!acc.isempty()){
            update acc;
        }
    }
    

}