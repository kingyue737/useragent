#!/usr/bin/env node

var axios = require('axios').default
  , path = require('path')
  , fs = require('fs');

var files = {
    'pgts.yaml': 'https://raw.githubusercontent.com/tobie/ua-parser/master/test_resources/pgts_browser_list.yaml'
  , 'testcases.yaml': 'https://raw.githubusercontent.com/tobie/ua-parser/master/test_resources/test_user_agent_parser.yaml'
  , 'firefoxes.yaml': 'https://raw.githubusercontent.com/tobie/ua-parser/master/test_resources/firefox_user_agent_strings.yaml'
};

/**
 * Update the fixtures
 */

Object.keys(files).forEach(function (key) {
  axios.get(files[key]).then(promise => {
    if (promise.status !== 200) throw `Invalid status code ${promise.status}`

    console.log('downloaded', files[key]);
    fs.writeFileSync(path.join(__dirname, '..', 'test', 'fixtures', key), promise.data);
  }).catch((e) => console.error(e));
});
