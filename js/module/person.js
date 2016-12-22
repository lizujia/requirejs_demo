define(function(){
	return function(){
		var persons = [{
			id: 1,
			name: '张三',
			age: 23, 
			sex: '男'
		}, {
			id: 2,
			name: '李四',
			age: 21, 
			sex: '女'
		}, {
			id: 3,
			name: '王五',
			age: 19, 
			sex: '男'
		}, {
			id: 4,
			name: '刘一',
			age: 23, 
			sex: '男'
		}];
		
		var list = function() {
			return persons;
		};
		
		return {
			list: list
		};
		
	}();
});



