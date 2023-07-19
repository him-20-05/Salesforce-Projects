 public with sharing class toDoListController {

        @AuraEnabled(cacheable=true)
        public static list<Task> getTasks() {
            try {
                return [SELECT Subject FROM Task 
                WHERE 
                OwnerId =: UserInfo.getUserId() ];
    
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        @AuraEnabled
        public static void createTask(String subject) {
            Task task = new Task();
            task.Subject = subject;
            insert task;
        }
        
        @AuraEnabled
        public static void deleteTask(Id idToDelete) {
            delete [SELECT Id FROM Task WHERE Id = :idToDelete];
        }
        
      
    }
   
