// * Near Earth Objects - Feed

// * GET https://api.nasa.gov/neo/rest/v1/feed?start_date={{start_date}}&end_date={{end_date}}&api_key={{API_KEY}}


// Pre-request Script

const today = new Date();
const endDate = today.toISOString().split('T')[0];
const startDate = new Date(today);
startDate.setDate(today.getDate() - 7);
const formattedStartDate = startDate.toISOString().split('T')[0];

pm.environment.set("start_date", formattedStartDate);
pm.environment.set("end_date", endDate);


// Post-response Tests

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response has near_earth_objects data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("near_earth_objects");
    pm.expect(Object.keys(jsonData.near_earth_objects).length).to.be.above(0);
});

pm.test("Each NEO has required fields", function () {
    const jsonData = pm.response.json();
    const neoData = Object.values(jsonData.near_earth_objects).flat();
    neoData.forEach(neo => {
        pm.expect(neo).to.have.property("name");
        pm.expect(neo).to.have.property("id");
        pm.expect(neo).to.have.property("close_approach_data");
        pm.expect(neo.close_approach_data.length).to.be.above(0);
    });
});
