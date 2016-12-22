function getProjectUrl() {

	var curWwwPath = window.location.href;

	var pathName = window.location.pathname;

	var pos = curWwwPath.indexOf(pathName);

	var localhostPaht = curWwwPath.substring(0, pos);

	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

	return(localhostPaht + projectName + '/');

	return projectUrl;
}

require.config({
	baseUrl: "js/",
	paths: {
		"jquery": ["lib/jquery/jQuery.v1.11.1.min"],
		"person": ["module/person"],
		"account": ["module/account"],
		"mynoamd": ["module/noamd"],
		"mymulti": ["module/multi"],
		"myjquery": ["module/myjquery"]
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
	},
	map: {
		"*": {
			"jquery": "myjquery"
		},
		"myjquery": {
			"jquery": "jquery"
		}
	}
});

require(["jquery"], function($){
	var jsurl=$('body').attr('my-js');
    require([jsurl], function () {
		
	});
});


