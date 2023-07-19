trigger accountTrigger on Account (before insert) {
    for(account acc : trigger.new){
        acc.Description='new description';
    }

}