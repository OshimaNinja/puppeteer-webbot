var routes = [
	{path: "/", controller: "index_controller"}
];

exports.activate = function(app){
	routes.forEach(route => { 
		app.use(route.path, require("../controllers/" + route.controller));
	});	
};