// Importing mongoose to access the database
const mongoose = require('mongoose');
// Getting the table object
const Resources = mongoose.model('Resources');
// Exporting all these functions
module.exports = {
    // Get resources
    async index(req, res) {
        console.log("New request: " + req.ip + " - get resources:");
        // Getting info by query
        const lat1 = req.query.latitude;
        const lon1 = req.query.longitude;
        const type = req.query.type;
        console.log("Latitude: " + lat1);
        console.log("Longitude: " + lon1);
        console.log("Type: " + type);
        // Earth radius meters
        const R = 6371000;
        // Getting all resources from database
        var allResources = await Resources.find();

        var resources = [];
        // If it wants to filter by locality
        if (lat1 && lon1) {
            // Getting all points with distance less than 30000 meters
            for (var i = 0; i < allResources.length; i++) {
                // Getting resource latitude and longitude
                var lat2 = allResources[i].latitude;
                var lon2 = allResources[i].longitude;
                // Calculating in radians
                var φ1 = lat1*Math.PI/180;
                var φ2 = lat2*Math.PI/180;
                var Δφ = (lat2-lat1)*Math.PI/180;
                var Δλ = (lon2-lon1)*Math.PI/180;
                // Applying the formula of the distance between two points in a sphere
                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                // Finally getting the value of the distance
                var distance = R * c;
                // Checking if distance is less than 30000
                if (distance < 30000) {
                    // Checking if it wants to filter by type
                    if (type && allResources[i].type == type) {
                        resources = [...resources, allResources[i]];
                    } else if (!type) {
                        resources = [...resources, allResources[i]];
                    }
                }
            }
        } else {
            console.log("It isn't using filter by location.");
            resources = allResources;
        }

        console.log(resources);
        console.log("===========================");

        return res.json(resources);
    },

    async store(req, res) {
        const resource = await Resources.create(req.body);

        return res.json(resource);
    },
    async destroy(req, res) {
        const resource = await Resources.deleteMany(req.body);

        return res.json(resource);
    },

};
