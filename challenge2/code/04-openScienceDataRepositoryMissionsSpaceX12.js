// * Open Science Data Repository - Missions - SpaceX-12

// * GET https://osdr.nasa.gov/geode-py/ws/api/mission/SpaceX-12


// Pre-request Script

    // No pre-request script required for this request.


// Post-response Tests

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 1500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1500);
});

pm.test("identifier is SpaceX-12", () => {
    const response = pm.response.json();
    pm.expect(response).to.have.property('identifier', 'SpaceX-12');
});

pm.test("Project SpaceX-12 has at least one Principal Investigator inside the people array", () => {
    const people = pm.response.json().people;
    const hasPrincipalInvestigator =
        people.some(person => person.roles.includes('Principal Investigator'));
    pm.expect(hasPrincipalInvestigator).to.be.true;
});
