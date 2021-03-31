/* jshint esversion: 8 */

// Setup body-parser for getting text-based data from the client-side.

app.use(bodyParser.urlencoded({
  extended: true
}));
