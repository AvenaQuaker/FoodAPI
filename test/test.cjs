let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:1234"; // Cambia la URL si es necesario

describe("GET /Foods", () => {
    it("Debería devolver todos los platillos", (done) => {
        chai.request(url)
            .get("/Foods")
            .end(function (err, res) {
                expect(res.body).to.be.an("array");
                done();
            });
    });
});

describe("POST /Foods", () => {
    it("Debería crear un nuevo platillo", (done) => {
        const newFood = {
            Nombre: "Tacos",
            Origen: "México",
            Ingredientes: ["Tortilla", "Carne", "Cebolla", "Cilantro"],
            Imagen: "https://example.com/tacos.jpg",
        };

        chai.request(url)
            .post("/Foods")
            .send(newFood)
            .end(function (err, res) {
                expect(res).to.have.status(201);
                expect(res.body.dish).to.have.property("Nombre").eql("Tacos");
                done();
            });
    });
});

describe("PATCH /Foods", () => {
    it("Debería actualizar un platillo existente", (done) => {
        const updatedFood = {
            Key: "7",
            Nombre: "Tacos al Pastor",
        };

        chai.request(url)
            .patch(`/Foods`)
            .send(updatedFood)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");

                done();
            });
    });
});

describe("DELETE /Foods/:key", () => {
    it("Debería eliminar un platillo", (done) => {
        chai.request(url)
            .delete(`/Foods/11`) // Asegúrate de que la clave del platillo sea válida
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("message");
                done();
            });
    });
});
