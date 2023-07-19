trigger deleteoperation on Account (before insert, after delete, before delete) {
    if(Trigger.isdelete){
        if(Trigger.isbefore){
            triggerhandler3.accountDeletion(trigger.old);
                
            
            
        }
    }
        
        
        
        
        
        
       

}