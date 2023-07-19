public class queuableApex implements Queueable {
    
    private list<account> accList;
    private id parentAccId;
    
    public queuableApex(list<account> accRecords, Id id){
        this.acclist = accRecords;
        this.parentAccId = id;
        
        
    }
    
    public void execute(QueueableContext context){
        for(account acc:accList){
            acc.ParentId = parentAccId;
        }
        update accList;
    }

}