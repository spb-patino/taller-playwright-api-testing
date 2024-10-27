// * APOD (Astronomy Picture of the Day)

// * GET https://api.nasa.gov/planetary/apod?api_key={{API_KEY}}&date={{yesterday}}


// Pre-request Script

const today = new Date();
today.setDate(today.getDate() - 1);
const yesterday = today.toISOString().split('T')[0];
pm.environment.set("yesterday", yesterday);


// Post-response Tests

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response has image or video URL", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("url");
    pm.expect(jsonData.url).to.match(/https:\/\/.+\.(jpg|png|gif|mp4)/);
});

pm.test("Title and explanation are present", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("title");
    pm.expect(jsonData).to.have.property("explanation");
});
