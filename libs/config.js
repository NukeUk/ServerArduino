/**
 * Created by nikitaukolov on 07.03.16.
 */
var nconf = require('nconf');

nconf.argv()
.env()
.file({ file: './config.json'});

module.exports = nconf;