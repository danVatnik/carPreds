var request = require('request');
var zlib = require('zlib');
var rscript = require('js-call-r');

class CarDataProvider {
    getCarData(url){
        let self = this;
        return new Promise((resolve, reject) => {
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
                  //return(self.processResponse(buffer));
                    resolve(self.processResponse(buffer));
                });
        
          });
        });
    }

    getCars(url, coeffs){
        let self = this;
        return new Promise((resolve, reject) => {
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
                  resolve(self.carsModel(buffer, coeffs));
                });
        
          });
        });
    }

    carsModel(data, coeffs){
        let self = this;
        let response = JSON.parse(data);
        let cars = response.listings.map(l => {
            let carModel = self.buildListingCarModel(l, coeffs);
            l.gain = carModel.gain;
            return(l);
        });

        return(cars);
    }

    buildListingCarModel(listing, coeffs){
        let car = this.buildCarModel(listing);
        car.value = this.computeCarValue(car, coeffs);
        car.gain = car.value - car.price;
        return(car);
    }

    computeCarValue(car, coeffs){
        return(car.year * coeffs['year'] 
        + car.miles * coeffs['miles'] 
        + car.year * car.miles * coeffs['year:miles'] 
        + coeffs['(Intercept)'])
    }

    buildCarModel(listing){
        let regex = /[\,\$]/g;
        
        if(!listing.hasOwnProperty("derivedPrice"))
            return(null);

        let price = parseInt(listing.derivedPrice.replace(regex, ''));
        
        let miles = "";
        if(listing.hasOwnProperty("maxMileage")){
            miles = listing.maxMileage;
        }else{
            miles = "0";
        }
        miles = parseInt(miles.replace(regex, ''));
        
        let year = parseInt(listing.title.split(' ')[1]);
        
        return({
            price: price,
            miles: miles,
            year: year,
        });
    }

    processResponse(buffer){
        let self = this;
        let response = JSON.parse(buffer);
        let cars = response.listings.map(l => {
            return(self.buildCarModel(l));
        });

        const result = rscript.callSync('./server/rScripts/modelization.R', cars);
        return(result.result);

    }
}

module.exports = CarDataProvider;