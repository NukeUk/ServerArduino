/**
 * Created by nikitaukolov on 07.03.16.
 */
var winston = require('winston');
function getLogger(module){
    var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports : [
            new winston.transports.Console({
                colorise: true,
                level: 'debug',
                label: path
            })
        ]
    });
}

module.exports = getLogger;