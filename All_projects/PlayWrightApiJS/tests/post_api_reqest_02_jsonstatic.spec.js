const { test, expect } = require('@playwright/test');

const apiRequestBody = require('../test-data/booking_POST_data.json');

test('POST API plus static json file', async ({ request }) => {

    const postResponse = await request.post('/booking',
        {
            data: apiRequestBody
        }
    )

    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    const postApiJson = await postResponse.json();

    console.log(postApiJson);

    expect(postApiJson.booking).toHaveProperty("firstname", apiRequestBody.firstname);
    expect(postApiJson.booking).toHaveProperty("lastname", apiRequestBody.lastname);

    expect(postApiJson.booking.bookingdates).toHaveProperty("checkin", apiRequestBody.bookingdates.checkin);
    expect(postApiJson.booking.bookingdates).toHaveProperty("checkout", apiRequestBody.bookingdates.checkout);
});