public class demo7 {
    public static void copyphoneaccount(){
        list<employee__c> emplist = [select id, name,Phone__c, account__r.phone from employee__c ];
        
        if(!emplist.isempty()){
            for(employee__c emp : emplist){
                if(emp.Phone__c == null){
                    emp.Phone__c = emp.account__r.phone;
                }
            }
        }
        if(!emplist.isempty()){
            update emplist;
        }

}
}