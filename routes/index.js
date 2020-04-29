var routes = [
	{path: "/", controller: "index_controller"},
	{path: "/plaid", controller: "plaid_controller"}
];

exports.activate = function(app){
	routes.forEach(route => { 
		app.use(route.path, require("../controllers/" + route.controller));
	});	
};