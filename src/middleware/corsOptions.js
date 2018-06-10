module.exports = {
	origin: '*',
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['X-Requested-With', 'Content-Type'],
	credentials: true
};
