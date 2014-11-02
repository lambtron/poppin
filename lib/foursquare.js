
var request = require('request');
var thunkify = require('thunkify');
var domain = 'https://api.foursquare.com/v2';
var client_id = process.env.FSQ_ID;
var client_secret = process.env.FSQ_SECRET;
var fsq_api_date = '20141101';


// https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

/**
 * getVenues
 *
 */
function* _getVenues(lat, lng, limit) {
  var get = thunkify(request.get);
  var path = '/venues/trending?ll=' + lat + ',' + lng
           + '&limit=' + limit
           + '&client_id=' + client_id
           + '&client_secret=' + client_secret
           + '&v=' + fsq_api_date;
  return yield get(domain + path);
}


/**
 * getTrending
 * @type {}
 * 
 */
module.exports.getTrending = function *getTrending() {
  if ('POST' != this.method) return yield next;

  var lat = this.request.body.location.lat || '';
  var lng = this.request.body.location.lng || '';

  if (lat == '' || lng == '') {
    this.body = 'Need to include lat and lng in request.';
    return;
  }

  // Get top 5 trending.
  var venues = yield _getVenues(lat, lng, 5);

  // Return.
  this.body = venues;
};
