trigger trigger3 on Bank__c (after update) {
    if(trigger.isupdate){
        if(trigger.isafter){
            if(!prevent_recursion.firstCall){
                prevent_recursion.firstCall = true;
            }
            triggerhandler2.bankRecord(trigger.new, trigger.oldmap);
        }
    }
    

}