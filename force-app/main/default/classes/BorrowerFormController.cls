public with sharing class BorrowerFormController {
    @AuraEnabled
    public static void createBorrowerForm(String recordType, String address1Value, Double amountValue, String cityValue,
                                          String entityValue, String exitValue, Double rentValue, Double ownershipValue, String zipCodeValue,
                                          String stateValue, Double rehabValue, Double priceValue, Date purchaseDateValue, String nameValue) {
        // create a new record for borrower_form__c object
        Borrower_Track_Record__c borrowerForm = new Borrower_Track_Record__c();
        // set the record type of the new record based on the record type selected in the LWC component
        borrowerForm.RecordTypeId = Schema.SObjectType.Borrower_Track_Record__c.getRecordTypeInfosByName().get(recordType).getRecordTypeId();
        // set the field values of the new record
        borrowerForm.Address_1__c = address1Value;
        borrowerForm.Amount_Financed__c = amountValue;
        borrowerForm.City__c = cityValue;
        borrowerForm.Entity_Name__c = entityValue;
        borrowerForm.Exit__c = exitValue;
        borrowerForm.Monthly_Rent__c = rentValue;
        borrowerForm.Ownership__c = ownershipValue;
        borrowerForm.ZipCode__c = zipCodeValue;
        borrowerForm.State__c = stateValue;
        borrowerForm.Rehab_Budget__c = rehabValue;
        borrowerForm.Purchase_Price__c = priceValue;
        borrowerForm.Purchase_Date__c = purchaseDateValue;
        borrowerForm.Name = nameValue;
        // insert the new record into the borrower_form__c object
        insert borrowerForm;
    }
}
