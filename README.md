
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


## Types of Requests

There are two basic types of requests, `APIRequest()` which retrieves data based on the location and variables 
you request and `GEORequest()` which will respond with the data in GEOJSON format including the bounding box 
coordinates data for creating maps

### Request Format

Both requests have the same basic format:

```js

census.APIRequest(request, callback);

census.GEORequest(request, callback);

```

__Arguments__

* `request` - The request object, see more on this below
* `callback(response)` - A callback which is called when the request is completed 
  with response object

## Request Object

__Location Options__

To specify a location, you must use `lat` and `lng`, or `zip`, or `state`. At least one of these must be specified.

* __lat__ [int] - The latitude of the requested location (North). Also supported: `latitude`, `y`
* __lng__ [int] - The longitude of the requested location (East). Also supported: `longitude`, `x`
* __zip__ [string] - The 5-digit zip code of the location. Note that USPS zip code areas do not align precisely with Census geographies, so when high accuracy is required it is recommended to use latitude and longitude. Specified as a string because certain zip codes begin with zeroes.
* __state__ [string] - The 2-letter USPS state code. It will be converted into the latitude and longitude of that state's capital.

__Level Options__

* __level__ [string] - At what level to request the data. These are based on census geographies. Supported options are: `blockGroup`, `tract`, `county`, `state`, `us`, and `place`. Note that the `place` tag currently only supports incorporated places.
* __sublevel__ [boolean] - _Optional_ Whether or not to return based upon sublevels (Defaults to `false`)
* __container__ [string] - _Optional_ GeoJSON request only - Specifies a level which serves as a boundary for a GeoJSON request. For instance, if your level is `tract` and your container is set as `place` with sublevel enabled, it will return all tracts which fall within or touch that place's geographical boundaries. Supported options are: `tract`, `county`, `state`, `place`, `geometry`, and `geometry_within`. Note that for the `geometry` and `geometry` within tags you must specify the containerGeometry. `geometry` will return any entities that intersect the given geometry (including if they intersect but extend beyond the perimeter) whereas `geometry_within` will only return entities that are entirely contained within the containerGeometry specified.
* __containerGeometry__ [object] - _Optional_ GeoJSON request only - Specifies the bounding geometry for a GeoJSON request. The format of this data should be ArcGIS ESRI JSON. You can convert GeoJSON into ESRI using the `GEOtoESRI()` function. The boundary can be any arbitrary closed region or regions.

__Data Options__

* __api__ [string] - _Optional_ Specifies the API to use. Supported options are: `acs1`, `acs3`, and `acs5`. (Defaults to `acs5`)
* __year__ [int] _Optional_ - Specifies the year of the API to use. Supported years per API vary, please see the acsyears object of the Census module for details (Defaults to `2013`).
* __variables__ [array] _Optional_ - An array of strings specifying which variables to query. One can specify an aliased variable (see variable aliases) or a specific ACS variable code (e.g. `B01003_001E`). If this array is not specified, the SDK will simply geocode the location into Census FIPS codes. A list of all ACS variables is available via the getACSVariableDictionary() function.

## Request Examples

A simple APIRequest()

```js

// latitude and longitude of Mark Twain's childhood home

var request = {
  "lat": 39.710438,
  "lng": -91.356049,
  "level": "blockGroup",
  "variables": [
      "income",
      "population"
  ]
};

census.APIRequest(request, function(response) {
  console.log(response);
});

```

This request will have the following response

```json

{ 
  "lat": 39.710438,
  "lng": -91.356049,
  "level": "blockGroup",
  "sublevel": false,
  "variables": [ "income", "population" ],
  "year": 2013,
  "api: "acs5",
  "state": "29",
  "county": "127",
  "tract": "960800",
  "blockGroup": "1",
  "place": "30214",
  "place_name": "Hannibal city",
  "data": [{ 
    "income": "28864",
    "population": "601"
  }] 
}

*/

````


## Alias Variables
<table>
  <tr>
    <td><strong>Description</strong></td>
    <td><strong>Alias Name</strong></td>
    <td><strong>Variable</strong></td>
  </tr>

  <tr>
    <td>Median household income in the past 12 months (in 2013 inflation-adjusted dollars)</td>
    <td>income</td>
    <td>B19013_001E</td>
  </tr>

  <tr>
    <td>Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)</td>
    <td>income_per_capita</td>
    <td>B19301_001E</td>
  </tr>

  <tr>
    <td>Number of persons, age 16 or older, in the labor force</td>
    <td>employment_labor_force</td>
    <td>B23025_002E</td>
  </tr>

  <tr>
    <td>Number of persons, age 16 or older, not in the labor force</td>
    <td>employment_not_labor_force</td>
    <td>B23025_007E</td>
  </tr>

  <tr>
    <td>Number of persons, age 16 or older, in the civilian labor force</td>
    <td>employment_civilian_labor_force</td>
    <td>B23025_003E</td>
  </tr>

  <tr>
    <td>Number of employed, age 16 or older, in the civilian labor force</td>
    <td>employment_employed</td>
    <td>B23025_004E</td>
  </tr>

  <tr>
    <td>Number of unemployed, age 16 or older, in the civilian labor force</td>
    <td>employment_unemployed</td>
    <td>B23025_005E</td>
  </tr>

  <tr>
    <td>Number of persons, age 16 or older, in the Armed Forces</td>
    <td>employment_armed_forces</td>
    <td>B23025_006E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Management, business, science, and arts occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_management_business _science_and_arts_occupations</td>
    <td>C24010_003E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Management, business, and financial occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_management_business _and_financial_occupations</td>
    <td>C24010_004E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Management occupations' for the civilian population age 16 and over</td>
    <td>employment_male_management_occupations</td>
    <td>C24010_005E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Business and financial operations occupations' for the civilian population age 16 and over</td>
    <td>employment_male_business_and_ financial_operations_occupations</td>
    <td>C24010_006E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Computer, engineering, and science occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_computer_engineering _and_science_occupations</td>
    <td>C24010_007E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Computer and mathematical occupations' for the civilian population age 16 and over</td>
    <td>employment_male_computer_and_ mathematical_occupations</td>
    <td>C24010_008E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Architecture and engineering occupations' for the civilian population age 16 and over</td>
    <td>employment_male_architecture_ and_engineering_occupations</td>
    <td>C24010_009E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Life, physical, and social science occupations' for the civilian population age 16 and over</td>
    <td>employment_male_life_physical_ and_social_science_occupations</td>
    <td>C24010_010E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Education, legal, community service, arts, and media occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_education_legal_ community_service_arts_and_ media_occupations</td>
    <td>C24010_011E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Community and social service occupations' for the civilian population age 16 and over</td>
    <td>employment_male_community_and_ social_service_occupations</td>
    <td>C24010_012E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Legal occupations' for the civilian population age 16 and over</td>
    <td>employment_male_legal_occupations</td>
    <td>C24010_013E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Education, training, and library occupations' for the civilian population age 16 and over</td>
    <td>employment_male_education_training_ and_library_occupations</td>
    <td>C24010_014E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Arts, design, entertainment, sports, and media occupations' for the civilian population age 16 and over</td>
    <td>employment_male_arts_design_ entertainment_sports_and_ media_occupations</td>
    <td>C24010_015E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Healthcare practitioners and technical occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_healthcare_ practitioners_and_technical_ occupations</td>
    <td>C24010_016E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Health diagnosing and treating practitioners and other technical occupations' for the civilian population age 16 and over</td>
    <td>employment_male_health_diagnosing_ and_treating_practitioners_and_ other_technical_occupations</td>
    <td>C24010_017E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Health technologists and technicians' for the civilian population age 16 and over</td>
    <td>employment_male_health_ technologists_and_technicians</td>
    <td>C24010_018E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Service occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_service_occupations</td>
    <td>C24010_019E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Healthcare support occupations' for the civilian population age 16 and over</td>
    <td>employment_male_healthcare_ support_occupations</td>
    <td>C24010_020E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Protective service occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_protective_ service_occupations</td>
    <td>C24010_021E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Fire fighting and prevention, and other protective service workers including supervisors' for the civilian population age 16 and over</td>
    <td>employment_male_fire_fighting_ and_prevention_and_other_protective_ service_workers_including_supervisors</td>
    <td>C24010_022E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Law enforcement workers including supervisors' for the civilian population age 16 and over</td>
    <td>employment_male_law_enforcement_ workers_including_supervisors</td>
    <td>C24010_023E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Food preparation and serving related occupations' for the civilian population age 16 and over</td>
    <td>employment_male_food_preparation_ and_serving_related_occupations</td>
    <td>C24010_024E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Building and grounds cleaning and maintenance occupations' for the civilian population age 16 and over</td>
    <td>employment_male_building_and_ grounds_cleaning_and_maintenance_ occupations</td>
    <td>C24010_025E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Personal care and service occupations' for the civilian population age 16 and over</td>
    <td>employment_male_personal_ care_and_service_occupations</td>
    <td>C24010_026E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Sales and office occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_sales_and_ office_occupations</td>
    <td>C24010_027E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Sales and related occupations' for the civilian population age 16 and over</td>
    <td>employment_male_sales_and_ related_occupations</td>
    <td>C24010_028E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Office and administrative support occupations' for the civilian population age 16 and over</td>
    <td>employment_male_office_and_ administrative_support_occupations</td>
    <td>C24010_029E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Natural resources, construction, and maintenance occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_natural_resources_ construction_and_maintenance_occupations</td>
    <td>C24010_030E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Farming, fishing, and forestry occupations' for the civilian population age 16 and over</td>
    <td>employment_male_farming_fishing_ and_forestry_occupations</td>
    <td>C24010_031E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Construction and extraction occupations' for the civilian population age 16 and over</td>
    <td>employment_male_construction_ and_extraction_occupations</td>
    <td>C24010_032E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Installation, maintenance, and repair occupations' for the civilian population age 16 and over</td>
    <td>employment_male_installation_ maintenance_and_repair_occupations</td>
    <td>C24010_033E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Production, transportation, and material moving occupations:' for the civilian population age 16 and over</td>
    <td>employment_male_production_ transportation_and_material_moving_ occupations</td>
    <td>C24010_034E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Production occupations' for the civilian population age 16 and over</td>
    <td>employment_male_production_ occupations</td>
    <td>C24010_035E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Transportation occupations' for the civilian population age 16 and over</td>
    <td>employment_male_transportation_ occupations</td>
    <td>C24010_036E</td>
  </tr>

  <tr>
    <td>Number of employed male 'Material moving occupations' for the civilian population age 16 and over</td>
    <td>employment_male_material_moving_ occupations</td>
    <td>C24010_037E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Management, business, science, and arts occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_management_ business_science_and_arts_occupations</td>
    <td>C24010_039E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Management, business, and financial occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_management_ business_and_financial_occupations</td>
    <td>C24010_040E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Management occupations' for the civilian population age 16 and over</td>
    <td>employment_female_management_ occupations</td>
    <td>C24010_041E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Business and financial operations occupations' for the civilian population age 16 and over</td>
    <td>employment_female_business_and_ financial_operations_occupations</td>
    <td>C24010_042E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Computer, engineering, and science occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_computer_ engineering_and_science_occupations</td>
    <td>C24010_043E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Computer and mathematical occupations' for the civilian population age 16 and over</td>
    <td>employment_female_computer_ and_mathematical_occupations</td>
    <td>C24010_044E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Architecture and engineering occupations' for the civilian population age 16 and over</td>
    <td>employment_female_architecture_ and_engineering_occupations</td>
    <td>C24010_045E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Life, physical, and social science occupations' for the civilian population age 16 and over</td>
    <td>employment_female_life_physical_ and_social_science_occupations</td>
    <td>C24010_046E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Education, legal, community service, arts, and media occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_education_legal_ community_service_arts_and_media_ occupations</td>
    <td>C24010_047E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Community and social service occupations' for the civilian population age 16 and over</td>
    <td>employment_female_community_ and_social_service_occupations</td>
    <td>C24010_048E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Legal occupations' for the civilian population age 16 and over</td>
    <td>employment_female_legal_ occupations</td>
    <td>C24010_049E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Education, training, and library occupations' for the civilian population age 16 and over</td>
    <td>employment_female_education_ training_and_library_occupations</td>
    <td>C24010_050E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Arts, design, entertainment, sports, and media occupations' for the civilian population age 16 and over</td>
    <td>employment_female_arts_design_ entertainment_sports_and_media_ occupations</td>
    <td>C24010_051E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Healthcare practitioners and technical occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_healthcare_ practitioners_and_technical_occupations</td>
    <td>C24010_052E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Health diagnosing and treating practitioners and other technical occupations' for the civilian population age 16 and over</td>
    <td>employment_female_health_diagnosing_ and_treating_practitioners_and_ other_technical_occupations</td>
    <td>C24010_053E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Health technologists and technicians' for the civilian population age 16 and over</td>
    <td>employment_female_health_ technologists_and_technicians</td>
    <td>C24010_054E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Service occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_service_ occupations</td>
    <td>C24010_055E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Healthcare support occupations' for the civilian population age 16 and over</td>
    <td>employment_female_healthcare_ support_occupations</td>
    <td>C24010_056E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Protective service occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_protective_ service_occupations</td>
    <td>C24010_057E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Fire fighting and prevention, and other protective service workers including supervisors' for the civilian population age 16 and over</td>
    <td>employment_female_fire_fighting_ and_prevention_and_other_protective_ service_workers_including_supervisors</td>
    <td>C24010_058E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Law enforcement workers including supervisors' for the civilian population age 16 and over</td>
    <td>employment_female_law_enforcement_ workers_including_supervisors</td>
    <td>C24010_059E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Food preparation and serving related occupations' for the civilian population age 16 and over</td>
    <td>employment_female_food_preparation_ and_serving_related_occupations</td>
    <td>C24010_060E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Building and grounds cleaning and maintenance occupations' for the civilian population age 16 and over</td>
    <td>employment_female_building_and_grounds_ cleaning_and_maintenance_occupations</td>
    <td>C24010_061E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Personal care and service occupations' for the civilian population age 16 and over</td>
    <td>employment_female_personal_care_ and_service_occupations</td>
    <td>C24010_062E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Sales and office occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_sales_and_ office_occupations</td>
    <td>C24010_063E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Sales and related occupations' for the civilian population age 16 and over</td>
    <td>employment_female_sales_and_ related_occupations</td>
    <td>C24010_064E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Office and administrative support occupations' for the civilian population age 16 and over</td>
    <td>employment_female_office_and_ administrative_support_occupations</td>
    <td>C24010_065E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Natural resources, construction, and maintenance occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_natural_resources_ construction_and_maintenance_occupations</td>
    <td>C24010_066E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Farming, fishing, and forestry occupations' for the civilian population age 16 and over</td>
    <td>employment_female_farming_fishing_ and_forestry_occupations</td>
    <td>C24010_067E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Construction and extraction occupations' for the civilian population age 16 and over</td>
    <td>employment_female_construction_ and_extraction_occupations</td>
    <td>C24010_068E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Installation, maintenance, and repair occupations' for the civilian population age 16 and over</td>
    <td>employment_female_installation_ maintenance_and_repair_occupations</td>
    <td>C24010_069E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Production, transportation, and material moving occupations:' for the civilian population age 16 and over</td>
    <td>employment_female_production_ transportation_and_material_moving_ occupations</td>
    <td>C24010_070E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Production occupations' for the civilian population age 16 and over</td>
    <td>employment_female_production_ occupations</td>
    <td>C24010_071E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Transportation occupations' for the civilian population age 16 and over</td>
    <td>employment_female_transportation_ occupations</td>
    <td>C24010_072E</td>
  </tr>

  <tr>
    <td>Number of employed female 'Material moving occupations' for the civilian population age 16 and over</td>
    <td>employment_female_material_ moving_occupations</td>
    <td>C24010_073E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level</td>
    <td>poverty</td>
    <td>B17001_002E</td>
  </tr>

  <tr>
    <td>Number of male persons whose income in the past 12 months is below the poverty level</td>
    <td>poverty_male</td>
    <td>B17001_003E</td>
  </tr>

  <tr>
    <td>Number of female persons whose income in the past 12 months is below the poverty level</td>
    <td>poverty_female</td>
    <td>B17001_017E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (White Alone)</td>
    <td>poverty_white_alone</td>
    <td>B17001A_002E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (Black or African American Alone)</td>
    <td>poverty_black_alone</td>
    <td>B17001B_002E</td>
  </tr>

  <tr>
    <td>Population (American Indian or Alaskan Native Alone)</td>
    <td>population_american_indian_alone</td>
    <td>B02001_004E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (Asian Alone)</td>
    <td>poverty_asian_alone</td>
    <td>B17001D_002E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (Native Hawaiian and Other Pacific Islander Alone)</td>
    <td>poverty_native_hawaiian_alone</td>
    <td>B17001E_002E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (Some Other Race Alone)</td>
    <td>poverty_other_alone</td>
    <td>B17001F_002E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (Two or more races)</td>
    <td>poverty_two_or_more_races</td>
    <td>B17001G_002E</td>
  </tr>

  <tr>
    <td>Number of persons whose income in the past 12 months is below the poverty level (Hispanic Origin)</td>
    <td>poverty_hispanic_origin</td>
    <td>B17001I_002E</td>
  </tr>

  <tr>
    <td>Number of families below the poverty level in the past 12 months</td>
    <td>poverty_family</td>
    <td>B17012_002E</td>
  </tr>

  <tr>
    <td>Number of married couples whose income is below the poverty level in the past 12 months</td>
    <td>poverty_family_married</td>
    <td>B17012_003E</td>
  </tr>

  <tr>
    <td>Number of families with a male householder and no wife present whose income is below the poverty level in the past 12 months</td>
    <td>poverty_family_single_male</td>
    <td>B17012_009E</td>
  </tr>

  <tr>
    <td>Number of families with a female householder and no husband present whose income is below the poverty level in the past 12 months</td>
    <td>poverty_family_single_female</td>
    <td>B17012_014E</td>
  </tr>

  <tr>
    <td>Median age</td>
    <td>age</td>
    <td>B01002_001E</td>
  </tr>

  <tr>
    <td>Median age by sex (male)</td>
    <td>median_male_age</td>
    <td>B01002_002E</td>
  </tr>

  <tr>
    <td>Median age by sex (female)</td>
    <td>median_female_age</td>
    <td>B01002_003E</td>
  </tr>

  <tr>
    <td>Total population</td>
    <td>population</td>
    <td>B01003_001E</td>
  </tr>

  <tr>
    <td>Population (White Alone)</td>
    <td>population_white_alone</td>
    <td>B02001_002E</td>
  </tr>

  <tr>
    <td>Population (Black or African American Alone)</td>
    <td>population_black_alone</td>
    <td>B02001_003E</td>
  </tr>

  <tr>
    <td>Population (Asian Alone)</td>
    <td>population_asian_alone</td>
    <td>B02001_005E</td>
  </tr>

  <tr>
    <td>Population (Native Hawaiian and Other Pacific Islander Alone)</td>
    <td>population_native_hawaiian_alone</td>
    <td>B02001_006E</td>
  </tr>

  <tr>
    <td>Population (Some Other Race Alone)</td>
    <td>population_other_alone</td>
    <td>B02001_007E</td>
  </tr>

  <tr>
    <td>Population (Two or more races)</td>
    <td>population_two_or_more_races</td>
    <td>B02001_008E</td>
  </tr>

  <tr>
    <td>Population (Hispanic Origin)</td>
    <td>population_hispanic_origin</td>
    <td>B03001_003E</td>
  </tr>

  <tr>
    <td>Median year housing units were built</td>
    <td>median_house_construction_year</td>
    <td>B25035_001E</td>
  </tr>

  <tr>
    <td>Median contract rent</td>
    <td>median_contract_rent</td>
    <td>B25058_001E</td>
  </tr>

  <tr>
    <td>Median gross rent (contract rent plus the cost of utilities)</td>
    <td>median_gross_rent</td>
    <td>B25064_001E</td>
  </tr>

  <tr>
    <td>Median value (dollars) for Owner-Occupied housing units</td>
    <td>median_home_value</td>
    <td>B25077_001E</td>
  </tr>

  <tr>
    <td>Total time spent commuting (in minutes)</td>
    <td>commute_time</td>
    <td>B08136_001E</td>
  </tr>

  <tr>
    <td>Time spent commuting (in minutes): Car, truck, or van - alone</td>
    <td>commute_time_solo_automobile</td>
    <td>B08136_003E</td>
  </tr>

  <tr>
    <td>Time spent commuting (in minutes): Car, truck, or van - carpool</td>
    <td>commute_time_carpool</td>
    <td>B08136_004E</td>
  </tr>

  <tr>
    <td>Time spent commuting (in minutes): public transport (excluding taxis)</td>
    <td>commute_time_public_transport</td>
    <td>B08136_007E</td>
  </tr>

  <tr>
    <td>Time spent commuting (in minutes): walking</td>
    <td>commute_time_walked</td>
    <td>B08136_011E</td>
  </tr>

  <tr>
    <td>Time spent commuting (in minutes): Taxicab, motorcycle, bicycle, or other means</td>
    <td>commute_time_other</td>
    <td>B08136_012E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who completed no schooling</td>
    <td>education_none</td>
    <td>B15003_002E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who have a regular high school diploma</td>
    <td>education_high_school</td>
    <td>B15003_017E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who have a GED or alternative credential</td>
    <td>education_ged</td>
    <td>B15003_018E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who hold an Associate's degree</td>
    <td>education_associates</td>
    <td>B15003_021E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who hold a Bachelor's degree</td>
    <td>education_bachelors</td>
    <td>B15003_022E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who hold a Master's degree</td>
    <td>education_masters</td>
    <td>B15003_023E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who hold a Profesisonal degree</td>
    <td>education_professional</td>
    <td>B15003_024E</td>
  </tr>

  <tr>
    <td>The number of persons age 25 and over who hold a Doctoral degree</td>
    <td>education_doctorate</td>
    <td>B15003_025E</td>
  </tr>
</table>


nb. This documentation is largely based off of the docs available at http://uscensusbureau.github.io/citysdk/guides/censusModule.html