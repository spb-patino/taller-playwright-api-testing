// * Mars Rover Photos

// * GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key={{API_KEY}}


// Pre-request Script

const randomSol = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
pm.environment.set("randomSol", randomSol);


// Post-response Tests

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 5000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(5000);
});

pm.test("Response has photos", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.photos.length).to.be.above(0);
});

pm.test("Each photo has required fields", function () {
    const jsonData = pm.response.json();
    jsonData.photos.forEach(photo => {
        pm.expect(photo).to.have.property("img_src");
        pm.expect(photo).to.have.property("earth_date");
        pm.expect(photo).to.have.property("rover");
        pm.expect(photo.rover).to.have.property("name");
    });
});
