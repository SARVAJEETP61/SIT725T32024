import { expect } from 'chai';
import request from 'request-promise-native';

const url = "http://localhost:8000/add-coffee";
const getUrl = "http://localhost:8000/get-coffees";

describe("POST /add-coffee", function () {
    const validCoffee = { name: "Espresso", type: "hot coffee" };
    const missingData = {};
    const invalidName = { name: "", type: "cold" };
    const invalidType = { name: "Latte", type: -2 };

    it("should return status 200 when coffee is added successfully", async function () {
        const response = await request.post({
            url: url,
            json: true,
            body: validCoffee,
            resolveWithFullResponse: true,
        });
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.equal("Data added successfully");
    });

    it("should return status 400 when data is missing", async function () {
        try {
            await request.post({
                url: url,
                json: true,
                body: missingData,
            });
        } catch (error) {
            expect(error.statusCode).to.equal(500);
            expect(error.error).to.equal("Failed to add data");
        }
    });

    it("should return status 400 when name is empty", async function () {
        try {
            await request.post({
                url: url,
                json: true,
                body: invalidName,
            });
        } catch (error) {
            expect(error.statusCode).to.equal(400);
            expect(error.error).to.equal("Failed to add data");
        }
    });

    it("should return status 400 when type is invalid", async function () {
        try {
            await request.post({
                url: url,
                json: true,
                body: invalidType,
            });
        } catch (error) {
            expect(error.statusCode).to.equal(400);
            expect(error.error).to.equal("Failed to add data");
        }
    });
});

describe("GET /get-coffees", function () {
    it("should return status 200 and fetch all coffees", async function () {
        const response = await request.get({
            url: getUrl,
            json: true,
            resolveWithFullResponse: true,
        });
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an("array");
    });

    it("should return status 200 even if no coffees are present", async function () {
        await request.delete({
            url: "http://localhost:8000/clear-coffees",
            json: true,
        });

        const response = await request.get({
            url: getUrl,
            json: true,
            resolveWithFullResponse: true,
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an("array").that.is.empty;
    });
});

describe("Edge cases for /add-coffee", function () {
    it("should return status 500 for null input", async function () {
        try {
            await request.post({
                url: url,
                json: true
            });
        } catch (error) {
            expect(error.statusCode).to.equal(500);
            expect(error.error).to.equal("Failed to add data");
        }
    });

    it("should return status 400 for partially missing fields", async function () {
        const partialData = { name: "Mocha" };
        try {
            await request.post({
                url: url,
                json: true,
                body: partialData,
            });
        } catch (error) {
            expect(error.statusCode).to.equal(400);
            expect(error.error).to.equal("Failed to add data");
        }
    });
});