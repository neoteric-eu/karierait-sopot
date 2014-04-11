(function() {
	'use strict';

	define([], function () {
		var todoResource = function($config, $resource) {
			return $resource($config.get('baseUrl')+':service',
			{
				service: 'todo',
			},
			{
				getTodoList: {
					method: 'GET'
				},

				saveTodoList: {
					method: 'POST',
				}
			});
		};
		return ['$config', '$resource', todoResource];
	});

}( define ));
