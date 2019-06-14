const mongoose = require('mongoose');

const Resources = mongoose.model('Resources');

module.exports = {
    async index(req, res) {
        const lat1 = req.query.latitude;
        const lon1 = req.query.longitude;
        const type = req.query.type;
        const R = 6371e3; // metres

        var allResources = await Resources.find();

        var resources = [];
        
        if (lat1 && lon1) {
            for (var i = 0; i < allResources.length; i++) {
                var lat2 = allResources[i].latitude;
                var lon2 = allResources[i].longitude;
                
                var φ1 = lat1*Math.PI/180;
                var φ2 = lat2*Math.PI/180;
                var Δφ = (lat2-lat1)*Math.PI/180;
                var Δλ = (lon2-lon1)*Math.PI/180;

                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                var distance = R * c;

                console.log("the distance is: " + distance);
                
                if (distance < 30000) {
                    if (type && allResources[i].type == type) {
                        resources = [...resources, allResources[i]];
                    } else if (!type) {
                        resources = [...resources, allResources[i]];
                    }
                }
            }
        } else {
            resources = allResources;
        }

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
