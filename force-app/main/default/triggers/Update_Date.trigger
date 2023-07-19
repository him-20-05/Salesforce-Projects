trigger Update_Date on Case (before insert,before update) {
    If(trigger.isBefore && trigger.isInsert){
        Update_Last_modified_Date.update_date(trigger.new);
    }
    else if(trigger.isbefore && trigger.isUpdate){
        
    }
}