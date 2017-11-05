const server = require('./server.js').default;
server.set('port', process.env.PORT || 3000);
server.listen(server.get('port'), () => {
  console.log('Example server listening on port', server.get('port'));
});
