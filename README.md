## requirejs学习笔记

author: lzj

新接触requirejs, 入门级选手, 把了解东西记录下来, 以备后面查阅

传统的js加载方式是使用多个`script`标签, 将js文件按依赖顺序依次加载, 这样的加载方式不但会阻塞其它资源的加载, 而且会影响浏览器的渲染.

requirejs通过声明不同js文件之间的**依赖关系**,  并采用**异步加载**和**回调执行**的方式执行js代码, 有效的解决的上述问题.
并且requirejs是一个模块化的js框架, 鼓励代码的模块化, 鼓励使用脚本时用moduleId替代其URL地址. 一个文件只定义一个模块.

### API
requirejs常用的三个函数和三个配置项
三个函数:
- define: define是一个**全局函数**, 用于创建一个新的模块. 
此方法可接受3个参数, define(name, deps, callback):
1. name: 可选参数, 模块名称
2. deps: 可选参数, 依赖模块数组
3. call: 必选, 回调函数, 若存在依赖的模块, 则被依赖的模块可以参数(我们称其为**模块对象**)的形式传入此回调函数, 并且参数的顺序与模块的依赖顺序一致.
- require: require也是一个**全局函数**, 用于加载依赖.
此方法可接受两个参数, require(deps, callback):
1. 数组, 表示所依赖的模块
2. 回调函数, 指定的模块加载后, 将调用此函数; 加载的模块会以参数的形式传入此回调函数, 并且参数的顺序与模块的依赖顺序一致.
- config: 用于配置requirejs

三个配置项:
- basrUrl: 加载模块的根路径
- paths: 映射不在根路径下的模块的路径
- shim: 对于不符合AMD规范的js模块, 使用此配置可实现requirejs引入

### 现在开始上示例

#### 目录结构及主要代码

![image](https://github.com/lizujia/requirejs_demo/blob/master/img/md/1.png)

- app目录, 存放各页面功能代码
- module目录, 存放自定义模块代码
- lib目录, 存放库文件
- main.js, 程序入口点, 主要有两个功能, 一是配置所需模板及模板间的依赖关系, 二是加载程序主模块.

index.html
```xml
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script data-main="js/main.js" src="js/lib/require/require.js"></script>
	</head>
	<body>
		<div>Hello World</div>
	</body>
</html>
```
main.js
```javascript
require.config({
	baseUrl: "js/",
	paths: {
		"jquery": ["lib/jquery/jQuery.v1.11.1.min"]
	}
});

require(["jquery"], function(jq){
	alert(jq().jquery);
});
```
浏览器访问index.html
alert提示jQuery版本号1.11.1, 页面显示Hello World, 
而且js的执行并没有影响页面的渲染.

> 示例代码中, 映射关系的key值**jquery**不能改变, 这是因为在调用`define`函数创建jquery模块时, 使用了第一个参数, 将此模块命名为jquery, 那么这个模块就只属于jquery, 只能用jquery去引用它, 所以当使用其它名称去引入时, 会提示`undefined`.
> 
> 而, 当定义模块时没有使用第一个参数为其命名, 那么在引用它时就可以使用任意的名称, 使用起来很自由.

#### 代码解释
index.html中, 通过`script`标签引入了*requirejs.js*库文件
requirejs通过`data-main`属性去搜索一个脚本文件(本示例中就是*main.js*), 此脚本文件中需要为所有脚本文件配置一个根路径, requirejs通过这个根路径去加载相关的模块.

main.js中, 
首先配置了所有模块的根路径baseUrl, 
然后配置了paths对象, 示例中只映射了jquery的库文件

需要注意的是:
1. 库文件不需要再加`.js`后缀
2. 如果baseUrl不配置的话, 默认为**main.js**所在路径, 即其他模块的文件默认与main.js在同一个目录(或其子目录)

require方法加载了jquery模块, 并将其模块对象作为参数传入到回调函数中, 
最终打印了jquery的版本信息.


#### 下面使用define函数定义一个无其它依赖的模块, 并调用其功能

在module目录下新建文件`person.js`, 内容如下:
```javascript
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
			// 通常从服务器端获取, 示例就用静态的了
			return persons;
		};
		
		return {
			list: list
		};
		
	}();
});
```
文件中定义了一个模块, 此模块不依赖任何其他模块, 并反正一个对象, 对象中包含一个list方法.

`main.js`文件修改如下:
```javascript
require.config({
	baseUrl: "js/",
	paths: {
		"jquery": ["lib/jquery/jQuery.v1.11.1.min"],
		"person": ["module/person"]
	}
});

require(["jquery", "person"], function($, person){
	var persons = person.list();
	for(var i=0; i<persons.length; i++) {
		$('body').append("<div>"+ persons[i].id + ".&nbsp;&nbsp;&nbsp;" + persons[i].name + "</div>");
	}
});
```
1. 添加了person模块的映射
2. 加载了person模块, 并调用了其`list`方法, 获取了persons数组, 并将数组内容展示在页面中.
其中, 回调函数的两个参数**($和person)**分别为`jquery`和`person`两个模块的模块对象.

代码运行效果如下:
![image](https://github.com/lizujia/requirejs_demo/blob/master/img/md/2.png)


#### 通过自定义属性进一步重构代码

上面的示例中, 主模块main.js直接加载了`person`模块, 并对其返回数据进行了处理, 这样当页面多时, 并不利于模块化和重用, 代码也会越来越不清晰. 可通过自定义属性进一步重构代码.

新建person.html页面, 代码如下:
```xml
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script data-main="js/main.js" src="js/lib/require/require.js"></script>
	</head>
	<body my-js="js/app/showperson.js">
		<div>Hello Person</div>
	</body>
</html>
```
其中, body元素添加了自定义属性my-js, 其值为本页面的功能js文件路径.

在app路径下新建文件showperson.js, 代码如下:
```javascript
require(["jquery", "person"], function($, person){
	var persons = person.list();
	for(var i=0; i<persons.length; i++) {
		$('body').append("<div>"+ persons[i].id + ".&nbsp;&nbsp;&nbsp;<span>" 
		+ persons[i].name + "</span></div>");
	}
});
```
即将原本写在main.js中的展示代码移动到此文件中.

修改main.js文件,
```javascript
require.config({
	baseUrl: "js/",
	paths: {
		"jquery": ["lib/jquery/jQuery.v1.11.1.min"],
		"person": ["module/person"]
	}
});

require(["jquery"], function($){
	var jsurl=$('body').attr('my-js');
    require([jsurl], function () {
		
	});
});
```
在require方法的回调函数中, 访问了body元素的my-js属性的值, 加载该值指向的模块, 即showperson.js, 模块加载完成后会立即执行其中的代码.

这样就可以复用main.js, 将不同模块的功能从主模块中分离出去, 并且利于扩展.
代码运行效果如下:
![image](https://github.com/lizujia/requirejs_demo/blob/master/img/md/3.png)


#### 使用define函数定义一个依赖其它模块的模块

上面的示例中, 使用define函数定义了一个无依赖的模块, 现定义一个新模块使其依赖上面定义的模块.

在module目录下新建文件account.js, 内容如下:
```javascript
define(["person"], function(person){
	var persons = person.list();
	
	var accounts = [];
	// 就是根据persons数组, 返回一个accounts数组
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
```
新定义的模块依赖了`person`模块, 并通过回调参数调用了person模块中的方法.

app目录下新建文件showaccount.js, 内容如下:
```javascript
require(["jquery", "account"], function($, account){
	var accounts = account.list();
	for(var i=0; i<accounts.length; i++) {
		$('body').append("<div>"+ accounts[i].personId + ".&nbsp;&nbsp;&nbsp;" 
		+ accounts[i].psersonName + "&nbsp;&nbsp;&nbsp;" + accounts[i].accountNo +"</div>");
	}
});
```

新建account.html,
```xml
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script data-main="js/main.js" src="js/lib/require/require.js"></script>
	</head>
	<body my-js="js/app/showaccount.js">
		<div>Hello Account</div>
	</body>
</html>
```

运行效果如下图:
![image](https://github.com/lizujia/requirejs_demo/blob/master/img/md/4.png)



#### 引入非AMD规范的模块

module目录下新建文件noamd.js
一般地, 我们编写js工具类或js框架有以下几种形式:
```javascript
// 第一种:
var noamd = (function(){
	
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
// 第二种:
var noamd = {};
noamd.hi= function(name) {
	var str = '大家好, 我是' + name;
	alert(str);
}
noamd.say = function() {
	alert('Hello');
}
// 第三种:
(function(){
	
	var hi= function(name) {
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
```

main.js中, config方法的调用修改为:
```javascript
require.config({
	baseUrl: "js/",
	paths: {
		"jquery": ["lib/jquery/jQuery.v1.11.1.min"],
		"person": ["module/person"],
		"account": ["module/account"],
		"mynoamd": ["module/noamd"]
	},
	shim: {
		"mynoamd": {
			deps: [],
			exports: "noamd"
		}
	}
});
```
1. paths中添加了noamd模块的映射
2. 配置`shim`属性,  
- **mynoamd**为paths映射的key
- deps, 数组, 表示此模块要依赖的其他模块
- exports的值, 即**noamd**, 必须与<span style="color: red">module/noamd.js文件中暴露出去的全局变量名称一致</span> 

修改了showperson.js文件
```javascript
require(["jquery", "person", "mynoamd"], function($, person, _){
	var persons = person.list();
	for(var i=0; i<persons.length; i++) {
		$('body').append("<div>"+ persons[i].id 
		+ ".&nbsp;&nbsp;&nbsp;<span>" + persons[i].name + "</span></div>");
	}
	
	$('span').click(function(){
		_.hi($(this).text());
	})
});
```
文件加载了新定义的非AMD模块`mynoamd`, 并将`_`作为其模块对象传入回调函数中.
回调函数中, 为每个span注册了`click`事件, 并调用`_`对象的`hi`方法.
代码运行效果就是, 点击姓名时alert提示: 大家好, 我是xxx


#### 暴露多个全局变量的非AMD模块

如果一个文件模块暴露了多个全局变量, 那么就不能使用shim了, 得使用`init`函数, 例如有如下文件(multi.js):
```javascript
function xixi() {
	alert("xixi...");
}

function haha() {
	alert("haha...");
}
```
有两个全局变量, 而且都需要, 那么main.js写法如下:
```javascript
require.config({
	baseUrl: "js/",
	paths: {
		"jquery": ["lib/jquery/jQuery.v1.11.1.min"],
		"person": ["module/person"],
		"account": ["module/account"],
		"mynoamd": ["module/noamd"],
		"mymulti": ["module/multi"]
	},
	shim: {
		"mynoamd": {
			deps: [],
			exports: "noamd"
		},
		"mymulti": {
			deps: [],
			init: function() {
				return {
					myxixi: xixi,
					myhaha: haha
				}
			}
		}
	}
});
```
非AMD模块`mymulti`通过`init`函数, 对外暴露一个接口对象, 而将原来的两个全局函数映射为接口对象的两个局部函数, 这样就可以与符合AMD规范的模块一样使用了.
当exports和init同时存在的时, exports将被忽略.

