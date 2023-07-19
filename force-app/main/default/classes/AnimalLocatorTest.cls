@istest
private class AnimalLocatorTest {
    
    @isTest
    static void animalLocatortest1(){
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());
        String actual =AnimalLocator.getAnimalNameById(2);
        string expected = 'moose';
        system.assertEquals(actual,expected);
    }

}