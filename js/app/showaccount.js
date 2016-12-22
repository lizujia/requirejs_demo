require(["jquery", "account"], function($, account){
	var accounts = account.list();
	for(var i=0; i<accounts.length; i++) {
		$('body').append("<div>"+ accounts[i].personId + ".&nbsp;&nbsp;&nbsp;" + accounts[i].psersonName + "&nbsp;&nbsp;&nbsp;" + accounts[i].accountNo +"</div>");
	}
});