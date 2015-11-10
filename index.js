var http = require('http'),
    path = require('path'),
    express = require('express'),
    _ = require('underscore'),
    stubData = require('./stubData');

// App Setup
var app = express();
app.set('port', process.env.PORT || 9090);
app.use('/js', express.static(path.join(__dirname + '/www/scripts')));
app.use('/css', express.static(path.join(__dirname + '/www/styles')));
app.use('/img', express.static(path.join(__dirname + '/www/imgs')));

// Route Handling
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.get('/partials/:directive', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/www/' + req.params.directive + '.html'));
});

app.get('/data/:ID', function (req, res, next) {
  var viewModel,
      ID = req.params.ID;
  if ( ID === 'all' ) {
    viewModel = _.map(stubData, function (build) {
      return {
        type: build.type,
        name: build.name,
        owner: build.owner,
        timeStarted: build.timeStarted,
        state: build.queueState,
        metricsstate: build.metrics.state,
        buildstate: build.build.state,
        unitstate: build.unitTest.state,
        functionalstate: build.functionalTest.state,
        expanded: false
      };
    });
  } else {
    viewModel = _.find(stubData, function (build) {
      return build.name === ID;
    });
  }

  if ( viewModel && viewModel !== [] && viewModel !== {} ) {
    res.status(200).send(viewModel);
  } else {
    res.status(500).send('error - no matching data');
  }
});

// Init App Server
var server = app.listen(process.env.PORT || app.get('port'), function() {
  console.log("Server has been started at port " + server.address().port);
});