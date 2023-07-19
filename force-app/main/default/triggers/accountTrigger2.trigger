trigger accountTrigger2 on Account (before insert, after insert,before update, after update) {
    if(trigger.isinsert){
        if(trigger.isbefore){
            triggerhandler1.accountIndustry(trigger.new);
        }
        else if(trigger.isafter){
        triggerhandler1.createopportunity(trigger.new);
        }
    }
    if(trigger.isupdate){
        if(trigger.isbefore){
            triggerhandler1.updateaccountphone(trigger.new, trigger.oldmap);
        }
        else if(trigger.isafter){
          triggerhandler1.updaterelatedopp(trigger.new,trigger.oldmap );
        }
    }
}