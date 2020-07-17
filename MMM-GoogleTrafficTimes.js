Module.register("MMM-GoogleTrafficTimes",{

        // Module config defaults
        defaults : {
                key: '',
                origin: 'SW1A 1AA',
                destination1: 'Work:SW1A 2PW',
                destination2: 'Gym:XXX',
                destination3: 'School:XXX',
                updateInterval: 900000
        },

        getStyles: function () {
                return ["MMM-GoogleTrafficTimes.css"];
        },

        start: function() {
        var self = this;
        Log.info("Starting module: " + this.name);

        if (this.config.key === "") {
                Log.error("MMM-GoogleTrafficTimes: API key not provided or valid!");
                return;
        }

        setInterval(function() {
                self.updateDom();
        }, this.config.updateInterval);
    },

	// Override dom generator.
	getDom: function() {
                var origin = this.config.origin;
                var location1 = this.config.destination1.split(':')[1];
                var location2 = this.config.destination2.split(':')[1];
                var location3 = this.config.destination3.split(':')[1];

		var nameList = [];
                nameList[0] = this.config.destination1.split(':')[0];
                nameList[1] = this.config.destination2.split(':')[0];
                nameList[2] = this.config.destination3.split(':')[0];
               
		var re1 = new RegExp(location1, 'g');
                var re2 = new RegExp(location2, 'g');
                var re3 = new RegExp(location3, 'g');

                var wrapper = document.createElement("div");
		wrapper.style = "text-align:left;font-size:0.65em;line-height:normal";


		var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.config.key;
                script.setAttribute('defer','');
                script.setAttribute('async','');
                document.body.appendChild(script);

                var self = this;

        script.onload = function () {
                var geocoder = new google.maps.Geocoder;
                var service = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [origin],
          destinations: [location1, location2, location3],
          travelMode: 'DRIVING',
          drivingOptions: {
                departureTime: new Date(Date.now())
          },
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            Log.error('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            let timings = '';

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
			var trafficIcon = 'CircleIcon';
			if(typeof(results[j].duration_in_traffic) != 'undefined') {
				if (results[j].duration_in_traffic.value > results[j].duration.value) {trafficIcon = 'RedCircleIcon'};
				wrapper.innerHTML += '<span class="' + trafficIcon + '"><span>' +  nameList[j] + '<p></p>' + results[j].duration_in_traffic.text + '</span></span>';
			}

              }
            }
          }
        });
	}
		return wrapper;
	}
});
