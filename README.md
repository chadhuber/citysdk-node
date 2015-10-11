
# CitySDK API Node Wrapper

A node package based on the public API Library via http://uscensusbureau.github.io/citysdk/


## Super simple to use

The Node CitySDK Wrapper is designed to be the simplest way possible to make calls to the Census CitySDK API from a node-based project


## Changes to the original CitySDK

- Removal of jquery library (uses npm request module instead of $.ajax calls, replaces $.grep with _.filter(), replaces $.inArray with native .indexOf(), uses V8 Engine's native JSON.parse() etc)
- Replaced externally terraformer.io library with its corresponding node package https://github.com/Esri/Terraformer
- Restructed for server based operation instead of client-side (ie. made appropriate changes for instances of window.[])


## Getting Started

Install via NPM

`npm install citysdk`


Inside your Node.js project

`var census = require('citysdk')(YOUR_CENSUS_API_KEY);`

nb. Request your Census API Key at http://api.census.gov/data/key_signup.html


## Making Requests

```js

census.APIRequest(request, callback);

```

__Arguments__

* `request` - The request object, see more on this below
* `callback(response)` - A callback which is called when the request is completed 
  with response object


## Request Example

```js

// latitude and longitude of Mark Twain's childhood home

var request = {
  "lat": 39.710438,
  "lng": -91.356049,
  "level": "tract",
  "variables": [
      "income",
      "population"
  ]
};

census.APIRequest(request, function(response) {
  console.log(response);
});

/* RESPONSE

{ lat: 39.710438,
  lng: -91.356049,
  level: 'tract',
  variables: [ 'income', 'population' ],
  year: 2013,
  api: 'acs5',
  sublevel: false,
  state: '29',
  county: '127',
  tract: '960800',
  blockGroup: '1',
  place: '30214',
  place_name: 'Hannibal city',
  data: [ { income: '29212', population: '3320' } ] }

*/t

````

## Request Object

* __lat__ [int] - This tag specifies the latitude of the location in which we are interested. You can also specify this as "latitude" or "y".

* __lng__ [int] - This tag specifies the longitude of the location in which we are interested. You can also specify this as "longitude" or "x".

* __level__ [string] - This tag specifies the "level" of data to request. Supported levels are based off of Census geographies, the SDK supporting: "blockGroup", "tract", "county", "state", "us", and "place". Please note, that the "place" level currently only supports incorporated places. If we changed our level to "blockGroup" instead of state, we would get information for a much smaller geographic region.

* __variables__ [array] - This is an optional array of strings which specify the variables from the ACS to request. This example uses an alias (see aliases below), but you could also request raw ACS variables like "B01003_001E". You can find a list of all ACS variables on the Census's developer site, or by calling the Census module's getACSVariableDictionary() function.

nb. Largely based off of the documentation available at http://uscensusbureau.github.io/citysdk/guides/censusModule.html

