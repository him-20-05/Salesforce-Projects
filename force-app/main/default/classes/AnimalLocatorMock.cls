@isTest
global class AnimalLocatorMock implements HttpCalloutMock{
    
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"animals": ["id":1,"name":"mighty moose","eats":"plants","says":"bellows"]}');
        response.setStatusCode(200);
        return response; 
    }

}