import { LightningElement, track, wire } from 'lwc';
import getTasks from '@salesforce/apex/ToDoListController.getTasks';
import createTask from '@salesforce/apex/ToDoListController.createTask';
import deleteTask from '@salesforce/apex/ToDoListController.deleteTask';
import { refreshApex } from '@salesforce/apex';

export default class ToDoList extends LightningElement {
    @track
    newTask = '';
   

    @wire(getTasks) 
    toDoTasks;
    
    
    updateNewTask(event) {
        this.newTask = event.target.value;
    }

    handleRefresh(){
        this.isLoading = true;
        refreshApex(this.toDoTasks);
        
    }

    handleClick() {
        this.isLoading = true;
        createTask({ subject: this.newTask })
            .then(() => {
                this.newTask = '';
                // refresh the toDoTasks wire adapter to get the updated list of tasks
                return refreshApex(this.toDoTasks);
            })
            .catch(error => {
                console.error(error);
            })
           
    }

    deleteTask(event) {
        this.isLoading = true;
        let taskIdToDelete = event.target.name;
        deleteTask({ idToDelete: taskIdToDelete })
            .then(() => {
                // refresh the toDoTasks wire adapter to get the updated list of tasks
                return refreshApex(this.toDoTasks);
            })
            .catch(error => {
                console.error(error);
            })
           
    }
}
