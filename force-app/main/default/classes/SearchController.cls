public with sharing class SearchController
{
private apexpages.standardController controller {get; set; }
private contact c;
public List<contact> searchResults {get; set; }
public string searchEmail
{
get
{
if (searchEmail==null) searchEmail = '';
return searchEmail;
}
set;
}

public SearchController(ApexPages.StandardController controller)
{
this.controller = controller;
this.c = (contact) controller.getRecord();
}

public PageReference search()
{
if(SearchResults == null)
{
SearchResults = new List<contact>();
}
else
{
SearchResults.Clear();
}

String qry = 'Select firstname,lastname, email from contact where name like \'%'+searchEmail+'%\' Order By Name';
SearchResults = Database.query(qry);
return null;
}
}