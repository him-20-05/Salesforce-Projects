public with sharing class contactControllers {
    public list<contact> newList {get;set;}
    
    public contactControllers(ApexPages.StandardController controller){
        
        newList=[select id,email from contact];
        
    }
    public PageReference back() {
    	PageReference pg = new PageReference('/apex/car_rental_page');
        pg.setRedirect(true);
        return pg;
    }
}