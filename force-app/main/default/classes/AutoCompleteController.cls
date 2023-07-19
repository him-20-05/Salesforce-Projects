public with sharing class AutoCompleteController {
 public list<Contact> conList {get;set;}  

   public  AutoCompleteController(){
        conList = new list<Contact>();
        Contact c = new Contact();
        conList.add(c);
   }

    public void addContact() { 
        Contact c = new Contact();
        conList.add(c);
    }

    public void removeContact(){
        Integer indexVal = Integer.valueof(system.currentpagereference().getparameters().get('index'));
        conList.remove(indexVal - 1);   
    }

}