global class loginUser {
    @AuraEnabled
   
    global static String login(String username,String password){

        String homeURL = '	https://apac-f-dev-ed.develop.my.site.com/s/';
        ApexPages.PageReference pageRef = Site.login(username,password,homeURL);
        return pageRef.getUrl();

    }
}