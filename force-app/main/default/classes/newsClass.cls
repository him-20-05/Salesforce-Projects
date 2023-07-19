public with sharing class newsClass {

    @AuraEnabled
    public static Map<String, Object> retrieveNews() {
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://newsapi.org/v2/everything?q=tesla&from=2023-05-01&sortBy=publishedAt&apiKey=01c87a40e304409aaedf9b34549cffce');
        httpRequest.setMethod('GET');

        Map<String, Object> newJSONData = new Map<String, Object>();
        String strResponse = null;

        try {
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if (httpResponse.getStatusCode() == 200) {
                strResponse = httpResponse.getBody();
            } else {
                throw new CalloutException(httpResponse.getBody());
            }
        } catch (Exception ex) {
            throw ex;
        }

        if (!String.isBlank(strResponse)) {
            newJSONData = (Map<String, Object>) JSON.deserializeUntyped(strResponse);
        }

        if (!newJSONData.isEmpty()) {
            return newJSONData;
        } else {
            return null;
        }
    }
}
