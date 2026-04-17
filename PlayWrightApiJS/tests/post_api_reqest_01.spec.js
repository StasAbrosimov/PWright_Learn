const { test, expect } = require('@playwright/test');

test('POST API plus static body', async ({ request }) => {

    const postResponse = await request.post('/booking',
        {
            data: {
                "firstname": "Stat_first",
                "lastname": "Stat_last",
                "totalprice": 1000,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "super bowls"
            }
        }
    )

    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    const postApiJson = await postResponse.json();

    console.log(postApiJson);

    expect(postApiJson.booking).toHaveProperty("firstname", "Stat_first");
    expect(postApiJson.booking).toHaveProperty("lastname", "Stat_last");

    expect(postApiJson.booking.bookingdates).toHaveProperty("checkin", "2018-01-01");
    expect(postApiJson.booking.bookingdates).toHaveProperty("checkout", "2019-01-01");
});