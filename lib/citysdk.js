/**
 * CitySDK
**/

var censusModule = require('./census');

//SDK instance for the callback functions
CitySDK.prototype.sdkInstance = null;

/**
 * Instantiates an instance of the CitySDK object.
 * @constructor
 */
function CitySDK(key) {
    CitySDK.prototype.sdkInstance = this;
    CitySDK.prototype.modules = {};
    CitySDK.prototype.modules.census = censusModule;
    censusModule.enable(key);

    return censusModule;
}

module.exports = CitySDK;