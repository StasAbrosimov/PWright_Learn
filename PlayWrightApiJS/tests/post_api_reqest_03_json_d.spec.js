const { test, expect } = require('@playwright/test');
import { faker } from '@faker-js/faker';
const { DateTime } = require('luxon');

const apiRequestBody = require('../test-data/booking_POST_data.json');

test('POST API plus dynamic json file', async ({ request }) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(500);

    const checkinD = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutD = DateTime.now().plus({ day: 10 }).toFormat('yyyy-MM-dd');

    apiRequestBody.firstname = firstName;
    apiRequestBody.lastname = lastName;
    apiRequestBody.totalprice = totalPrice;
    apiRequestBody.bookingdates.checkin = checkinD;
    apiRequestBody.bookingdates.checkout = checkOutD;

    const postResponse = await request.post('/booking',
        {
            data: apiRequestBody
        }
    )

    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    const postApiJson = await postResponse.json();

    console.log(postApiJson);

    expect(postApiJson.booking).toHaveProperty("firstname", firstName);
    expect(postApiJson.booking).toHaveProperty("lastname", lastName);

    expect(postApiJson.booking).toHaveProperty("totalprice", totalPrice);
    expect(postApiJson.booking).toHaveProperty("lastname", apiRequestBody.lastname);

    expect(postApiJson.booking.bookingdates).toHaveProperty("checkin", checkinD);
    expect(postApiJson.booking.bookingdates).toHaveProperty("checkout", checkOutD);
});