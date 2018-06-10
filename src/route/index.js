const getApiRoutes = version => require(`./v${version}`)();

module.exports = { getApiRoutes };
