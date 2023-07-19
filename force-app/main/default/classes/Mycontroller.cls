public with sharing class Mycontroller {
    @AuraEnabled(cacheable=true)
    public static List<String> getRecordTypes(String objectName) {
        List<String> recordTypeNames = new List<String>();
        for (Schema.RecordTypeInfo recordTypeInfo : Schema.SObjectType.Borrower_Track_Record__c.getRecordTypeInfos()) {
            recordTypeNames.add(recordTypeInfo.getName());
        }
        return recordTypeNames;
    }

    @AuraEnabled
    public static void saveRecord(String recordTypeName, Map<String, Object> recordData) {
        // get the record type Id for the given record type name
        Id recordTypeId = Schema.SObjectType.Borrower_Track_Record__c.getRecordTypeInfosByName().get(recordTypeName).getRecordTypeId();
        
        // create a new record with the record type Id
        Borrower_Track_Record__c obj = new Borrower_Track_Record__c();
        obj.RecordTypeId = recordTypeId;
        
        // set field values
        for (String fieldName : recordData.keySet()) {
            obj.put(fieldName, recordData.get(fieldName));
        }
        
        // save the record
        insert obj;
    }
}
