public with sharing class ContactSearchExtension {
   public Contact contact { get; set; }
   
   public void searchEmail(ApexPages.StandardController controller) {
       contact =[select id, email from contact where Email Like '%"+email+ "%'];
   }
   
   public PageReference redirectToOtherPage() {
       return new PageReference('/apex/contact_pages');
   }
}