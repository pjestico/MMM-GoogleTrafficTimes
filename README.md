# Module: Google Traffic Times

A module for the MagicMirror that displays driving times from a location to one or more destinations based on Google Maps Traffic information. As it uses the times in traffic the values are dynamic as long as there is reasonaby accurate traffic detail available to Google in your area.
The results are displayed in response bubbles which have a white circle as long as the travel time in traffic is the same or shorter than the equivalent Google holds excluding traffic data. If the in traffic travle time is longer then th circle border changes to red in order to quickly identify the increased travel time.

# Installation
Navigate into your MagicMirror's ~/MagicMirror/modules folder and execute git clone https://github.com/pjestico/MMM-GoogleTrafficTimes.git
A new folder will be created, please navigate into it.
Run npm install in ~/MagicMirror/modules/MMM-GoogleTrafficTimes to install the module and dependencies.

# Using the module
To use this module, add it to the modules array in the config/config.js file:
```
var config = {
    modules: [
        {
            module: 'MMM-GoogleTrafficTimes',
            position: 'top_left',
            config: {
                key: 'YOUR_KEY',
                origin: 'SW1A 1AA',
                destination1: 'Work:SW1A 2PW',
                destination2: 'Gym:XXX',
                destination3: 'Beach:XXX',
                AvoidHighways: false,
                AvoidTolls: false,

            },
        }
    ]
}
```
* key = your Google API key as described in the relevant section of this readme
* origin = This is the location all travel times to the destinations below will be measured from.
* destination1 = This is the first location you need travel times to (required).
* destination2 = This is the second location you need travel times to (optional).
* destination3 = This is the third location you need travel times to (optional).
* AvoidHighways = true or false, controls whether Highways are avoided (true) or utilised (false) in routing.
* AvoidTolls = true or false, controls whether Tolls are avoided (true) or utilised (false) in routing.

The Destinations need to be entered in the form Label:Address.

In the example config above for Destination 1 we have a Label of Work with an Address of SW1A 2PW.

The Label appears as the title for each result bubble as shown in the Example Screenshot below.

In this release the origin and destination addresses have been tested across a large number of countries but certainly not all.

Whilst the Google API can accept a multitude of formats from addresses to lat&long co-ordinates this script has some matching code to make the results format nicely and this could have issues with an as yet untried address format.

# Google API Key
In order to use this module you will need a Google Maps API which is available from the Google GCP console.
You will need to enable the following APIs for your key, Maps JavaScript API, Geocoding API, Distance Matrix API.
These are all, at the time of writing (May 2020), available under the free allowance as long as hits to the API are sensible and the default refresh rate of 15 minutes has not resulted in a charge.

# Example Screenshot
![alt text](https://github.com/pjestico/MMM-GoogleTrafficTimes/blob/master/MMM-GoogleTrafficTimes.png?raw=true)


# Suggestions
Please feel free to raise an issue on GitHub for any features you would like to see or usage issues you experience and I will endeavour to address them.
