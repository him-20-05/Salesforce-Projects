global class bankUpdateScheduler implements schedulable {
    
    global void execute(schedulableContext sc){
        bankUpdate bankkk = new bankUpdate();
        
        database.executeBatch(bankkk);
    }

}