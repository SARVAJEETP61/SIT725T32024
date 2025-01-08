import { expect } from 'chai';
import request from 'request';

describe("POST /add-coffee", function () {
    var url = "http://localhost:3000/add-coffee";

    it("returns status 200 when coffee is added successfully", function (done) {
        request.post(
            {
                url: url,
                json: true,
                body: { name: "Espresso", price: 3.5 },
            },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal("Data added successfully");
                done();
            }
        );
    });

    it("returns status 400 when data is missing", function (done) {
        request.post(
            {
                url: url,
                json: true,
                body: {},
            },
            function (error, response, body) {
                expect(response.statusCode).to.equal(400);
                expect(body).to.equal("Missing coffee data");
                done();
            }
        );
    });
});

describe("GET /get-coffees", function () {
    var url = "http://localhost:3000/get-coffees";

    it("returns status 200 and fetches all coffees", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            body = JSON.parse(body);
            expect(body).to.be.an("array");
            done();
        });
    });
});