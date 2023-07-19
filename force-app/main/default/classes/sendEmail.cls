public with sharing class sendEmail {
    @AuraEnabled
    public static void sendMassEmails() {
        try {
            List<Contact> contacts = [SELECT Id, Email FROM Contact WHERE Email != null];
            System.debug('Total Contacts: ' + contacts.size());

            List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
            List<Messaging.SingleEmailMessage> emailBatch = new List<Messaging.SingleEmailMessage>();

            for (Contact contact : contacts) {
                Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                email.setTargetObjectId(contact.Id);
                email.setSenderDisplayName('Your Name');
                email.setSubject('Your Subject');
                email.setPlainTextBody('Your Email Body');

                emailBatch.add(email);

                if (emailBatch.size() >= Limits.getLimitEmailInvocations()) {
                    emailList.addAll(emailBatch);
                    emailBatch.clear();
                }
            }

            if (!emailBatch.isEmpty()) {
                emailList.addAll(emailBatch);
            }

            if (!emailList.isEmpty()) {
                System.debug('Total Email Messages: ' + emailList.size());
                Messaging.sendEmail(emailList);
            }
        } catch (Exception ex) {
            System.debug('Error sending mass email: ' + ex.getMessage());
            throw ex;
        }
    }
}
