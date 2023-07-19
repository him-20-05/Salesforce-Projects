@isTest
private class AnimalTest {
    @isTest static  void testGetCallout() {
        // Create the mock response based on a static resource
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('GetAnimalName_Id');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Associate the callout with a mock response
        Test.setMock(HttpCalloutMock.class, mock);
        // Call method to test
        string  animalName = AnimalLocator.getAnimalNameById(1);
        // Verify mock response is not null
        System.assertEquals('Cat',animalName, 'The animal name should be Cat');
        // Verify status code
 
    }
}