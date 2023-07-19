trigger accountTrigger1 on Account (before insert) {
    if(trigger.isInsert){
        accountTriggerhandler.beforeinsert(Trigger.New);
}
}