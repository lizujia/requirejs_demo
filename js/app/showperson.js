require(["jquery", "person", "mynoamd", "mymulti"], function($, person, _, multi){
	var persons = person.list();
	for(var i=0; i<persons.length; i++) {
		$('body').append("<div>"+ persons[i].id + ".&nbsp;&nbsp;&nbsp;<span>" + persons[i].name + "</span></div>");
	}
	
	$('span').click(function(){
		_.hi($(this).text());
	})
	
	$('span').click(function(){
		multi.myxixi();
		multi.myhaha();
	})
	
});


alert($().jquery);