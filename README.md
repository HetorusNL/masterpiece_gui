# Masterpiece GUI

Front-end for the masterpiece database; GUI and API.

## API

The API uses python3 and flask to host the API server.
The API returns a (potentially empty) list of results in JSON format.
The current API endpoint can be reached at: https://api.masterpiece.hetorus.nl/.

### Example queries

Query all words  
https://api.masterpiece.hetorus.nl/words  
Query words with id='words-2'  
https://api.masterpiece.hetorus.nl/word/id/words-2  
Query words with course='sentences'  
https://api.masterpiece.hetorus.nl/word/course/sentences  
Query words with wildcard search query='ho' (matching any value in the returned JSON)  
https://api.masterpiece.hetorus.nl/search/word/*/ho  
Query words with search in dutch/english fields with query='ho'  
https://api.masterpiece.hetorus.nl/search/word/dutch,english/ho

## Dashboard

The front-end GUI website of Masterpiece showing the results of the API calls to the Masterpiece API.
By default 'live search' is enabled, and every keystroke sends a 'search' API call and shows the results.
When 'live search' is disabled by clicking on the button, a manual search button is enabled to send the 'search' API call when clicked.
When clicking on the results, a single result page is opened where the 'raw properties' are shown.
'Search only in English/Dutch' is enabled by default.
If this is enabled, only the 'dutch' and 'english' fields are searched instead of every field (including id, course, course_name, etc) by issuing a wildcard search.
The current dashboard is hosted at: https://masterpiece.hetorus.nl

## Scripts

### Run the development server

run the following command to run the dev server:  
`yarn start`  
this starts the development server on `localhost:3000`

### Run a build (without incrementing version number)

run the following command to build the application:  
`yarn build`  
this updates the version number (if changed in `package.json`) and builds the application

### Run a build with version increment and git commit creation

the Semantic Versioning, also known as "semver", is used:  
version: `major.minor.patch`  
run one of the following commands:  
`yarn release-patch` // increments the `patch` number of the version  
`yarn release-minor` // increments the `minor` number of the version  
`yarn release-major` // increments the `major` number of the version  
all these three commands also create a git commit and git tag with the message:  
`v${npm_package_version}` (which is the major.minor.patch version)  
these three commands also perform a push to the master branch on github and push the tags

### Deploy the newly generated version to the server

run the following command to deploy the new version:  
`yarn deploy`  
this removes the previous build from the server and copies the build to the server
