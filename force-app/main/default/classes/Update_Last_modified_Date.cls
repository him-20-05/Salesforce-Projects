public class Update_Last_modified_Date {
    
    public static void update_date(list<case> caseList){ 
        for(case eachCase :caseList) {
            eachCase.Last_Modified_Date__c=System.today();
        }
    }

}