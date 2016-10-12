import nock from 'nock';
import Moyasar from './../src/moyasar.js';

let apiKey = "Very_Dummy_Key";

export let moyasar = new Moyasar(apiKey);

export let basicAuth = {
  user: apiKey,
  pass: ''
};

export let fakeServer = nock('https://api.moyasar.com/v1');
