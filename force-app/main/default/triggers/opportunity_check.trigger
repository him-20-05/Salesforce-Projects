trigger opportunity_check on Opportunity (after insert, after update, after delete) {
    
    if(trigger.isAfter){
        if(trigger.isInsert){
            opportunity_handler.insert_opportunity(trigger.new);
        }else if(trigger.isUpdate){
            opportunity_handler.update_opportunity(trigger.new, trigger.oldMap);
        }if(trigger.isInsert){
            opportunity_handler.delete_opportunity(trigger.old);
        }
    }

}