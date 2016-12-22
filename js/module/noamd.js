/*var noamd = (function(){
	
	var hi = function(name) {
		var str = '大家好, 我是' + name;
		alert(str);
	}
	var say = function() {
		alert('Hello');
	}
	
	return {
		hi: hi,
		say: say
	}
	
})();

var noamd = {};
noamd.hi = function(name) {
	var str = '大家好, 我是' + name;
	alert(str);
}
noamd.say = function() {
	alert('Hello');
}*/

(function(){
	
	var hi = function(name) {
		var str = '大家好, 我是' + name;
		alert(str);
	}
	var say = function() {
		alert('Hello');
	}
	
	window.noamd = {
		hi: hi,
		say: say
	}
	
})(window);