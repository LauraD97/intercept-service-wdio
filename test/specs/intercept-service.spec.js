describe("WDIO intercept service", () => {
  it("should be able to capture search suggestions", async () => {
    browser.url("https://www.amazon.com/-/es/");
    await browser.setupInterceptor(); // Capture ajax calls

    //Assertion
    await browser.expectRequest('GET', '/api/2017/suggestions', 200); //Expect GET request with 200 statusCode

    // Launch ajax request
    await $("#twotabsearchtextbox").setValue("mobile"); // Action that initiates ajax request
    await browser.pause(3000);

    //Validate the requests
    browser.assertRequests();

    //Get the request/requests
    let suggestionsResponse = await browser.getRequest(6);
    let suggestionsResponses = await browser.getRequests();
  });
});
