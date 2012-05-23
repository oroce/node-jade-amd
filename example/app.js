var express    = require('express'),
    jade       = require('jade'),
    toAmdString           = require('../lib/jade-amd').toAmdString,
    jadeRuntimeAmdString  = require('../lib/jade-amd').jadeRuntimeAmdString;

var app = module.exports = express.createServer();


app.configure(function(){
  app.use(express.logger('dev'));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false, pretty: true, });
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon());

  app.use(app.router);

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function (req,res) {
  var sampleJade = "h1 Hello #{locals.name || 'World'}!";
  var sampleFunction = jade.compile(sampleJade, {client: true, compileDebug: false})  

  res.locals({
    sampleJade          : sampleJade,
    sampleHTML          : jade.compile(sampleJade)({}),
    sampleFunction      : sampleFunction.toString(),
    sampleAMD           : toAmdString(sampleFunction),
    jadeRuntimeAmdString: jadeRuntimeAmdString,
  });


  res.render('index');
});

app.listen(3000);
console.log("Example jade-amd Express app started: http://localhost:3000");