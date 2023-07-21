@isTest
private class TestClass {

    @isTest
    static void testSearchContacts() {
        // Create test data - Contacts with specific names
        List<Contact> testContacts = new List<Contact>();
        testContacts.add(new Contact(FirstName='John', LastName='Doe', Email='john.doe@test.com', Phone='1234567890'));
        testContacts.add(new Contact(FirstName='Jane', LastName='Smith', Email='jane.smith@test.com', Phone='9876543210'));
        insert testContacts;

        // Call the method to be tested
        List<Contact> result = ContactControllerClass.searchContacts('Doe');

        // Assertions
        System.assertEquals(1, result.size(), 'Should have found only one matching contact');
        System.assertEquals('John Doe', result[0].Name, 'Found contact should have name "John Doe"');
    }

    @isTest
    static void testGetAccountDetails() {
        // Create test data - Contact with related Account
        Account testAccount = new Account(Name='Test Account', AccountNumber='1234567890');
        insert testAccount;

        Contact testContact = new Contact(FirstName='Test', LastName='Contact', Email='test.contact@test.com', Phone='9876543210', AccountId=testAccount.Id);
        insert testContact;

        // Call the method to be tested
        Contact result = ContactControllerClass.getAccountDetails(testContact.Id);

        // Assertions
        System.assertNotEquals(null, result, 'Should have found a contact');
        System.assertEquals(testContact.Name, result.Name, 'Found contact should have the same name');
        System.assertEquals(testContact.Email, result.Email, 'Found contact should have the same email');
        System.assertEquals(testContact.Phone, result.Phone, 'Found contact should have the same phone');
        System.assertEquals(testAccount.Name, result.Account.Name, 'Found contact should have the same Account name');
        System.assertEquals(testAccount.AccountNumber, result.Account.AccountNumber, 'Found contact should have the same Account number');
    }
}
