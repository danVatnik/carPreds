let URLBuilder = require('../url-builder');
var express = require('express');
var router = express.Router();
var request = require('request');
var zlib = require('zlib');
let CarDataProvider = require('../car-data-provider');

const baseURL = "https://www.autotrader.com/rest/searchresults/sunset/base"

router.get('/makes', function(req, res, next) {
  
  let params = {
    startYear: 1981,
    numRecords: 100000,
    sortBy: "relevance",
    firstRecord: 0,
    endYear: 2019
  }

  if(req.query.hasOwnProperty("zip"))
    params.zip = req.query.zip;
  
  if(req.query.hasOwnProperty("radius"))
    params.searchRadius = req.query.radius;

  if(req.query.hasOwnProperty("makes"))
    params.makeCodeList = req.query.makes;

  const url = URLBuilder.addQueryParams(baseURL, params);

  request.get({
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      'accept-language': 'en-CA,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,en-GB;q=0.6,en-US;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'cookie': 'AWSELB=EBDDE7B31C005517C06E6B4F0C9FF405B1F68456F397A79103DA7C3DE98D7C9229160B3A178C29A231CB6231C5C88A9A5A4826297F99543ACE4E2411B7EB744EFFB9F47917; DCNAME=www-aws.autotrader.com; JSESSIONID=rm57Jxb2rUUgDDMzH8qWpkN3gTzdU1qTIN8dAeNO.f913b48f326c'
    },
    url: url,   
  }).on('response', function(response){
    var buffer = [];
    var gunzip = zlib.createGunzip();            
        response.pipe(gunzip);

          gunzip.on('data', function (data) {
            buffer += data;
        });
    
        gunzip.on('end', function() {
          res.json(JSON.parse(buffer).filterGroups.find(m => m.displayName == "Make").filters.filter(m => !m.hasOwnProperty("disabled") || (m.hasOwnProperty("disabled") && !m.disabled)));
        });

  });

});


router.get('/models', function(req, res, next) {
  let params = {
    startYear: 1981,
    numRecords: 100000,
    sortBy: "relevance",
    firstRecord: 0,
    endYear: 2019
  }

  if(req.query.hasOwnProperty("zip"))
    params.zip = req.query.zip;
  
  if(req.query.hasOwnProperty("radius"))
    params.searchRadius = req.query.radius;

  if(req.query.hasOwnProperty("makes"))
    params.makeCodeList = req.query.makes;

  const url = URLBuilder.addQueryParams(baseURL, params);

  request.get({
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      'accept-language': 'en-CA,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,en-GB;q=0.6,en-US;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'cookie': 'AWSELB=EBDDE7B31C005517C06E6B4F0C9FF405B1F68456F397A79103DA7C3DE98D7C9229160B3A178C29A231CB6231C5C88A9A5A4826297F99543ACE4E2411B7EB744EFFB9F47917; DCNAME=www-aws.autotrader.com; JSESSIONID=rm57Jxb2rUUgDDMzH8qWpkN3gTzdU1qTIN8dAeNO.f913b48f326c'
    },
    url: url,   
  }).on('response', function(response){
    var buffer = [];
    var gunzip = zlib.createGunzip();            
        response.pipe(gunzip);

          gunzip.on('data', function (data) {
            buffer += data;
        });
    
        gunzip.on('end', function() {
          var response = JSON.parse(buffer);
          var models = response.filterGroups.map(m => m.displayName).filter(value => /Models/.test(value));
          var modelsModels =  response.filterGroups.filter(m => models.includes(m.displayName)).map(m => m.filters.filter(m => !m.hasOwnProperty("disabled") || (m.hasOwnProperty("disabled") && !m.disabled)));
          res.json(modelsModels);
        });

  });
});

router.get('/cars', function(req, res, next) {
  let params = {
    startYear: 1981,
    numRecords: 100000,
    sortBy: "relevance",
    firstRecord: 0,
    endYear: 2019
  }

  let queryMakes = [];
  let queryModels = []; 
  let radius = 50;

  if(req.query.hasOwnProperty("zip"))
    params.zip = req.query.zip;
  
  if(req.query.hasOwnProperty("radius"))
    radius = req.query.radius;

  if(req.query.hasOwnProperty("makes"))
    queryMakes = req.query.makes.split(",");

  if(req.query.hasOwnProperty("models"))
    queryModels = req.query.models.split(",");
  
  let carList = [];
  let promises = [];
  params.searchRadius = 100;
  for (let i = 0; i < queryMakes.length; i++) {
    params.makeCodeList = queryMakes[i];
    params.modelCodeList = queryModels[i];

    const url = URLBuilder.addQueryParams(baseURL, params);
    
    carDataProvider = new CarDataProvider();
    promises.push(carDataProvider.getCarData(url)
      .then(function(coeffs){
        return(carDataProvider.getCars(url, coeffs));
      })
    );
  }

  Promise.all(promises).then(function(cars){
    cars.map(cm => {cm.map(c => carList.push(c))});
    carList.sort(function(a, b) {
      return b.gain - a.gain;
    });
  
    res.json(carList);
  })
});

module.exports = router;
