var express = require('express');
var router = express.Router();
var SplitFactory = require('@splitsoftware/splitio').SplitFactory;

const JSONdb = require('simple-json-db'); // example storage
const counterDb = new JSONdb('counts.json');
counterDb.set('max-count', 0);

let factory = SplitFactory({
  core: {
    authorizationKey: 'SDK_KEY'
  }
});
const client = factory.client();


// Middleware to check if the Split.io client is ready
const ensureSplitReady = async (req, res, next) => {
  if (!client.ready()) {
    try {
      await client.ready();
      next();
    } catch (error) {
      console.error('Error waiting for Split.io client to be ready:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    next();
  }
};

// Apply the middleware to all routes
router.use(ensureSplitReady);

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = "user_"+Math.floor(Math.random()*100) // 100 random different users will hit this page
  let count, max;
  if(!counterDb.has(user)) {
    max = counterDb.get('max-count')
    max += 1; // increment as we have encountered a new user
    counterDb.set('max-count', max)
    // set counter for this new user
    counterDb.set(user, max)
  }
  
  count = counterDb.get(user)
  var treatment = client.getTreatment(user, 'flag_only_show_to_10', {count: count})
  res.render('index', { title: 'Express', user: user, treatment: treatment, count: count });
});

module.exports = router;
