public class AnimalLocator {
    public static string getAnimalNameById(integer i){
         Http http = new http();
        HttpRequest request = new HttpRequest();
        
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/'+i);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        
        
            map<string,Object> results = (map<string,Object>)json.deserializeUntyped(response.getBody());
            map<string,Object> animal =  (map<string,Object>)results.get('animal');
            system.debug('name: '+ string.valueOf(animal.get('name')));
            return string.valueOf(animal.get('name'));
       
    
}
}