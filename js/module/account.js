define(["person"], function(person){
	var persons = person.list();
	
	var accounts = [];
	for(var i=0; i<persons.length; i++) {
		accounts.push({
			personId: persons[i].id,
			psersonName: persons[i].name,
			accountNo: (Math.random() * 1000000).toFixed()
		});
	}
	
	var list = function() {
		return accounts;
	}
	
	return  {
		list: list
	}
	
});
