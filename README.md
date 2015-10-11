
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


## Alias Variables

| Alias Name              | Variable    | Description                                                                   |
| :-------------------------------| :-----------| :---------------------------------------------------------------------|
| income                            B19013_001E | Median household income in the past 12 months*                        |
| income_per_capita       | B19301_001E | Per capita income in the past 12 months*                                      |
| employment_labor_force  | B23025_002E | Number of persons, age 16 or older, in the labor force                        |
| employment_not_labor_force      | B23025_007E | Number of persons, age 16 or older, not in the labor force            |
| employment_civilian_labor_force | B23025_003E | Number of persons, age 16 or older, in the civilian labor force       |
| employment_employed     | B23025_004E | Number of employed, age 16 or older, in the civilian labor force              |
| employment_unemployed   | B23025_005E | Number of unemployed, age 16 or older, in the civilian labor force            |
| employment_armed_forces | B23025_006E | Number of persons, age 16 or older, in the Armed Forces                       |
| employment_male_management_business_science_and_arts_occupations | C24010_003E | Number of employed male 'Management, business, science, and arts occupations:' for the civilian population age 16 and over |
| employment_male_management_business_and_financial_occupations | C24010_004E | Number of employed male 'Management, business, and financial occupations:' for the civilian population age 16 and over |
| employment_male_management_occupations | C24010_005E | Number of employed male 'Management occupations' for the civilian population age 16 and over |
| employment_male_business_and_financial_operations_occupations | C24010_006E | Number of employed male 'Business and financial operations occupations' for the civilian population age 16 and over |
| employment_male_computer_engineering_and_science_occupations | C24010_007E | Number of employed male 'Computer, engineering, and science occupations:' for the civilian population age 16 and over |
| employment_male_computer_and_mathematical_occupations | C24010_008E | Number of employed male 'Computer and mathematical occupations' for the civilian population age 16 and over |
| employment_male_architecture_and_engineering_occupations | C24010_009E | Number of employed male 'Architecture and engineering occupations' for the civilian population age 16 and over |
| employment_male_life_physical_and_social_science_occupations | C24010_010E | Number of employed male 'Life, physical, and social science occupations' for the civilian population age 16 and over |
| employment_male_education_legal_community_service_arts_and_media_occupations | C24010_011E | Number of employed male 'Education, legal, community service, arts, and media occupations:' for the civilian population age 16 and over |
| employment_male_community_and_social_service_occupations | C24010_012E | Number of employed male 'Community and social service occupations' for the civilian population age 16 and over |
| employment_male_legal_occupations | C24010_013E | Number of employed male 'Legal occupations' for the civilian population age 16 and over|
| employment_male_education_training_and_library_occupations | C24010_014E | Number of employed male 'Education, training, and library occupations' for the civilian population age 16 and over|
| employment_male_arts_design_entertainment_sports_and_media_occupations | C24010_015E | Number of employed male 'Arts, design, entertainment, sports, and media occupations' for the civilian population age 16 and over|
| employment_male_healthcare_practitioners_and_technical_occupations | C24010_016E | Number of employed male 'Healthcare practitioners and technical occupations:' for the civilian population age 16 and over|
| employment_male_health_diagnosing_and_treating_practitioners_and_other_technical_occupations | C24010_017E | Number of employed male 'Health diagnosing and treating practitioners and other technical occupations' for the civilian population age 16 and over|
| employment_male_health_technologists_and_technicians | C24010_018E | Number of employed male 'Health technologists and technicians' for the civilian population age 16 and over|
| employment_male_service_occupations | C24010_019E | Number of employed male 'Service occupations:' for the civilian population age 16 and over|
| employment_male_healthcare_support_occupations | C24010_020E | Number of employed male 'Healthcare support occupations' for the civilian population age 16 and over|
| employment_male_protective_service_occupations | C24010_021E | Number of employed male 'Protective service occupations:' for the civilian population age 16 and over|
| employment_male_fire_fighting_and_prevention_and_other_protective_service_workers_including_supervisors | C24010_022E | Number of employed male 'Fire fighting and prevention, and other protective service workers including supervisors' for the civilian population age 16 and over|
| employment_male_law_enforcement_workers_including_supervisors | C24010_023E | Number of employed male 'Law enforcement workers including supervisors' for the civilian population age 16 and over|
| employment_male_food_preparation_and_serving_related_occupations | C24010_024E | Number of employed male 'Food preparation and serving related|
occupations' for the civilian population age 16 and over|
| employment_male_building_and_grounds_cleaning_and_maintenance_occupations | C24010_025E | Number of employed male 'Building and grounds cleaning and maintenance occupations' for the civilian population age 16 and over|
| employment_male_personal_care_and_service_occupations | C24010_026E | Number of employed male 'Personal care and service occupations' for the civilian population age 16 and over|
| employment_male_sales_and_office_occupations | C24010_027E | Number of employed male 'Sales and office occupations:' for the civilian population age 16 and over|
| employment_male_sales_and_related_occupations | C24010_028E | Number of employed male 'Sales and related occupations' for the civilian population age 16 and over|
| employment_male_office_and_administrative_support_occupations | C24010_029E | Number of employed male 'Office and administrative support occupations' for the civilian population age 16 and over|
| employment_male_natural_resources_construction_and_maintenance_occupations | C24010_030E | Number of employed male 'Natural resources, construction, and maintenance occupations:' for the civilian population age 16 and over|
| employment_male_farming_fishing_and_forestry_occupations | C24010_031E | Number of employed male 'Farming, fishing, and forestry occupations' for the civilian population age 16 and over|
| employment_male_construction_and_extraction_occupations | C24010_032E | Number of employed male 'Construction and extraction occupations' for the civilian population age 16 and over|
| employment_male_installation_maintenance_and_repair_occupations | C24010_033E | Number of employed male 'Installation, maintenance, and repair occupations' for the civilian population age 16 and over|
| employment_male_production_transportation_and_material_moving_occupations | C24010_034E | Number of employed male 'Production, transportation, and material moving occupations:' for the civilian population age 16 and over|
| employment_male_production_occupations | C24010_035E | Number of employed male 'Production occupations' for the civilian population age 16 and over|
| employment_male_transportation_occupations | C24010_036E | Number of employed male 'Transportation occupations' for the civilian population age 16 and over|
| employment_male_material_moving_occupations | C24010_037E | Number of employed male 'Material moving occupations' for the civilian population age 16 and over|
| employment_female_management_business_science_and_arts_occupations | C24010_039E | Number of employed female 'Management, business, science, and arts occupations:' for the civilian population age 16 and over|
| employment_female_management_business_and_financial_occupations | C24010_040E | Number of employed female 'Management, business, and financial occupations:' for the civilian population age 16 and over|
| employment_female_management_occupations | C24010_041E | Number of employed female 'Management occupations' for the civilian population age 16 and over|
| employment_female_business_and_financial_operations_occupations | C24010_042E | Number of employed female 'Business and financial operations occupations' for the civilian population age 16 and over|
| employment_female_computer_engineering_and_science_occupations | C24010_043E | Number of employed female 'Computer, engineering, and science occupations:' for the civilian population age 16 and over|
| employment_female_computer_and_mathematical_occupations | C24010_044E | Number of employed female 'Computer and mathematical occupations' for the civilian population age 16 and over|
| employment_female_architecture_and_engineering_occupations | C24010_045E | Number of employed female 'Architecture and engineering occupations' for the civilian population age 16 and over|
| employment_female_life_physical_and_social_science_occupations | C24010_046E | Number of employed female 'Life, physical, and social science occupations' for the civilian population age 16 and over|
| employment_female_education_legal_community_service_arts_and_media_occupations | C24010_047E | Number of employed female 'Education, legal, community service, arts, and media occupations:' for the civilian population age 16 and over|
| employment_female_community_and_social_service_occupations | C24010_048E | Number of employed female 'Community and social service occupations' for the civilian population age 16 and over|
| employment_female_legal_occupations | C24010_049E | Number of employed female 'Legal occupations' for the civilian population age 16 and over|
| employment_female_education_training_and_library_occupations | C24010_050E | Number of employed female 'Education, training, and library occupations' for the civilian population age 16 and over|
| employment_female_arts_design_entertainment_sports_and_media_occupations | C24010_051E | Number of employed female 'Arts, design, entertainment, sports, and media occupations' for the civilian population age 16 and over|
| employment_female_healthcare_practitioners_and_technical_occupations | C24010_052E | Number of employed female 'Healthcare practitioners and technical occupations:' for the civilian population age 16 and over|
| employment_female_health_diagnosing_and_treating_practitioners_and_other_technical_occupations | C24010_053E | Number of employed female 'Health diagnosing and treating practitioners and other technical occupations' for the civilian population age 16 and over|
| employment_female_health_technologists_and_technicians | C24010_054E | Number of employed female 'Health technologists and technicians' for the civilian population age 16 and over|
| employment_female_service_occupations | C24010_055E | Number of employed female 'Service occupations:' for the civilian population age 16 and over|
| employment_female_healthcare_support_occupations | C24010_056E | Number of employed female 'Healthcare support occupations' for the civilian population age 16 and over|
| employment_female_protective_service_occupations | C24010_057E | Number of employed female 'Protective service occupations:' for the civilian population age 16 and over|
| employment_female_fire_fighting_and_prevention_and_other_protective_service_workers_including_supervisors | C24010_058E | Number of employed female 'Fire fighting and prevention, and other protective service workers including supervisors' for the civilian population age 16 and over|
| employment_female_law_enforcement_workers_including_supervisors | C24010_059E | Number of employed female 'Law enforcement workers including supervisors' for the civilian population age 16 and over|
| employment_female_food_preparation_and_serving_related_occupations | C24010_060E | Number of employed female 'Food preparation and serving related occupations' for the civilian population age 16 and over|
| employment_female_building_and_grounds_cleaning_and_maintenance_occupations | C24010_061E | Number of employed female 'Building and grounds cleaning and maintenance occupations' for the civilian population age 16 and over|
| employment_female_personal_care_and_service_occupations | C24010_062E | Number of employed female 'Personal care and service occupations' for the civilian population age 16 and over|
| employment_female_sales_and_office_occupations | C24010_063E | Number of employed female 'Sales and office occupations:' for the civilian population age 16 and over|
| employment_female_sales_and_related_occupations | C24010_064E | Number of employed female 'Sales and related occupations' for the civilian population age 16 and over|
| employment_female_office_and_administrative_support_occupations | C24010_065E | Number of employed female 'Office and administrative support occupations' for the civilian population age 16 and over|
| employment_female_natural_resources_construction_and_maintenance_occupations | C24010_066E | Number of employed female 'Natural resources, construction, and maintenance occupations:' for the civilian population age 16 and over|
| employment_female_farming_fishing_and_forestry_occupations | C24010_067E | Number of employed female 'Farming, fishing, and forestry occupations' for the civilian population age 16 and over|
| employment_female_construction_and_extraction_occupations | C24010_068E | Number of employed female 'Construction and extraction occupations' for the civilian population age 16 and over|
| employment_female_installation_maintenance_and_repair_occupations | C24010_069E | Number of employed female 'Installation, maintenance, and repair occupations' for the civilian population age 16 and over|
| employment_female_production_transportation_and_material_moving_occupations | C24010_070E | Number of employed female 'Production, transportation, and material moving occupations:' for the civilian population age 16 and over|
| employment_female_production_occupations | C24010_071E | Number of employed female 'Production occupations' for the civilian population age 16 and over|
| employment_female_transportation_occupations | C24010_072E | Number of employed female 'Transportation occupations' for the civilian population age 16 and over|
| employment_female_material_moving_occupations | C24010_073E | Number of employed female 'Material moving occupations' for the civilian population age 16 and over|
| poverty                   | B17001_002E | Number of persons whose income in the past 12 months is below the poverty level|
| poverty_male              | B17001_003E | Number of male persons whose income in the past 12 months is below the poverty level|
| poverty_female            | B17001_017E | Number of female persons whose income in the past 12 months is below the poverty level|
| poverty_white_alone       | B17001A_002E | Number of persons whose income in the past 12 months is below the poverty level (White Alone)|
| poverty_black_alone       | B17001B_002E | Number of persons whose income in the past 12 months is below the poverty level (Black or African American Alone)|
| population_american_indian_alone | B02001_004E | Population (American Indian or Alaskan Native Alone)|
| poverty_asian_alone       | B17001D_002E | Number of persons whose income in the past 12 months is below the poverty level (Asian Alone)|
| poverty_native_hawaiian_alone | B17001E_002E | Number of persons whose income in the past 12 months is below the poverty level (Native Hawaiian and Other Pacific Islander Alone)|
| poverty_other_alone       | B17001F_002E | Number of persons whose income in the past 12 months is below the poverty level (Some Other Race Alone)|
| poverty_two_or_more_races | B17001G_002E | Number of persons whose income in the past 12 months is below the poverty level (Two or more races)|
| poverty_hispanic_origin   | B17001I_002E | Number of persons whose income in the past 12 months is below the poverty level (Hispanic Origin)|
| poverty_family            | B17012_002E | Number of families below the poverty level in the past 12 months|
| poverty_family_married    | B17012_003E | Number of married couples whose income is below the poverty level in the past 12 months|
| poverty_family_single_male | B17012_009E | Number of families with a male householder and no wife present whose income is below the poverty level in the past 12 months|
| poverty_family_single_female | B17012_014E | Number of families with a female householder and no husband present whose income is below the poverty level in the past 12 months|
| age                       | B01002_001E | Median age|
| median_male_age           | B01002_002E | Median age by sex (male)|
| median_female_age         | B01002_003E | Median age by sex (female)|
| population                | B01003_001E | Total population|
| population_white_alone    | B02001_002E | Population (White Alone)|
| population_black_alone    | B02001_003E | Population (Black or African American Alone)|
| population_asian_alone    | B02001_005E | Population (Asian Alone)|
| population_native_hawaiian_alone | B02001_006E | Population (Native Hawaiian and Other Pacific Islander Alone)|
| population_other_alone    | B02001_007E | Population (Some Other Race Alone)|
| population_two_or_more_races | B02001_008E | Population (Two or more races)|
| population_hispanic_origin | B03001_003E | Population (Hispanic Origin)|
| median_house_construction_year | B25035_001E | Median year housing units were built|
| median_contract_rent      | B25058_001E | Median contract rent|
| median_gross_rent         | B25064_001E | Median gross rent (contract rent plus the cost of utilities)|
| median_home_value         | B25077_001E | Median value (dollars) for Owner-Occupied housing units|
| commute_time              |             | Total time spent commuting (in minutes)|
| commute_time_solo_automobile |          | Time spent commuting (in minutes): Car, truck, or van - alone|
| commute_time_carpool      |             | Time spent commuting (in minutes): Car, truck, or van - carpool|
| commute_time_public_transport | | Time spent commuting (in minutes): public transport (excluding taxis)|
| commute_time_walked       |             | Time spent commuting (in minutes): walking|
| commute_time_other        |             | Time spent commuting (in minutes): Taxicab, motorcycle, bicycle, or other means|
| education_none            | B15003_002E | The number of persons age 25 and over who completed no schooling|
| education_high_school     | B15003_017E | The number of persons age 25 and over who have a regular high school diploma|
| education_ged             | B15003_018E | The number of persons age 25 and over who have a GED or alternative credential|
| education_associates      | B15003_021E | The number of persons age 25 and over who hold an Associate's degree|
| education_bachelors       | B15003_022E | The number of persons age 25 and over who hold a Bachelor's degree|
| education_masters         | B15003_023E | The number of persons age 25 and over who hold a Master's degree|
| education_professional    | B15003_024E | The number of persons age 25 and over who hold a Profesisonal degree|
| education_doctorate       | B15003_025E | The number of persons age 25 and over who hold a Doctoral degree|

