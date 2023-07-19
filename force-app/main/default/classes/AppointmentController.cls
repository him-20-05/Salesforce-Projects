public with sharing class AppointmentController {
    @AuraEnabled(cacheable=true)
    public static void createAppointment(AppointmentData appointmentData) {
        Appointment__c appointment = new Appointment__c();
        appointment.Account__c = appointmentData.accountId;
        appointment.Contact__c = appointmentData.contactId;
        appointment.Role__c = appointmentData.role;
        appointment.Work_Type__c = appointmentData.workType;
        appointment.Name = appointmentData.Name;
        appointment.Subject__c = appointmentData.subject;
        appointment.Start_Date__c = appointmentData.startDate;
        appointment.Description__c = appointmentData.description;
        
        try {
            insert appointment;
        } catch (Exception ex) {
            // Handle any exception
            System.debug('Error creating appointment: ' + ex.getMessage());
            throw new AuraHandledException('Error creating appointment: ' + ex.getMessage());
        }
    }

    public class AppointmentData {
        @AuraEnabled
        public String Name;
        @AuraEnabled
        public Id accountId;
        @AuraEnabled
        public Id contactId;
        @AuraEnabled
        public String role;
        @AuraEnabled
        public String workType;
        @AuraEnabled
        public String additionalReason;
        @AuraEnabled
        public String subject;
        @AuraEnabled
        public Date startDate;
        @AuraEnabled
        public String description;
    }
}
