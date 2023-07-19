trigger trigger4_emai on Contact (before insert,after insert) {
    if(trigger.isInsert){
        if(trigger.Isafter){
            emailHandler.sendEmail(trigger.new);
        }
    }

}