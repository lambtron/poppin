
var koa = require('koa');
var _ = require('koa-route');
var cors = require('koa-cors');
var bodyParser = require('koa-bodyparser');
var app = koa();
var PORT = process.env.PORT || 3000;
var nextbus = require('./lib/nextbus');


app.use(bodyParser());
app.use(cors());


app.use(_.get('/', function *() {
  this.body = "Welcome to the Nextbus Predictions API.\n\n";
  this.body += "See the documentation here: http://www.github.com/lambtron/nextbus-predictions-api";
}));


/**
 * API endpoints.
 *
 */
app.use(_.post('/api/predictions', nextbus.getAllPredictions));


/**
 * Listen on PORT || 3000.
 *
 */
app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
