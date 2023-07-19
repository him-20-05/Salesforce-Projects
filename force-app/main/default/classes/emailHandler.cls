public class emailHandler {
    public static void sendEmail(list<contact> conlist){
        
        list<messaging.Email> emailList = new list<messaging.Email>();
        
        for(contact con : conlist){
            if(con.email != null){
                messaging.SingleEmailMessage emailmsg = new messaging.SingleEmailMessage();
                string[] toAddress = new string[]{con.email};
                    emailMsg.setToAddresses(toAddress);
                string emailsub = 'welcome' + con.FirstName;
                emailmsg.setSubject(emailsub);
                string disname = 'himanshu tiwari';
                emailmsg.setSenderDisplayName(disname);
                
                string content = 'hi' + con.FirstName + '<br/><br/>' + 
                    'welcome to salesforce ecosystem';
                
                emailmsg.setHtmlBody(content);
                emaillist.add(emailmsg);
            }
        }
        messaging.sendemail(emailList);
        
    }

}