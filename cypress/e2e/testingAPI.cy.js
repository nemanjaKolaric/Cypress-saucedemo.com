/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

describe("API Testing", () => {
    const accessToken = "dea10e276df2e4baed467f44c363b50f7815a335d4cfe167e7d80577f2e5db45"

    let randomUser = {
        "name": faker.name.fullName(),
        "gender": faker.name.sex(),
        "email": faker.internet.email()
    }
    let randomStatus = ['active', 'inactive'][Math.floor(Math.random() * 2)]

    it("GET method using Then", () => {
        cy.request("GET", "https://reqres.in/api/users?page=2").as('getAllUsers');
        cy.get("@getAllUsers").then(response => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        })
    });

    it("GET method using Should", () => {
        cy.request("GET", "https://reqres.in/api/users?page=2").should((response) => {
            expect(response.status).to.eq(200);
        })
    });

    it("POST-PUT-GET chained methods", () => {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            auth: {
                'bearer': accessToken
            },
            body: {
                "name": randomUser.name,
                "gender": randomUser.gender,
                "email": randomUser.email,
                "status": randomStatus
            }
        })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).have.property("name", randomUser.name)
                expect(res.body).have.property("gender", randomUser.gender)
                expect(res.body).have.property("email", randomUser.email)
                expect(res.body).have.property("status", randomStatus)
            })
            .then((res) => {
                const userId = res.body.id
                cy.log("User id is: " + userId)

                cy.request({
                    method: "PUT",
                    url: "https://gorest.co.in/public/v2/users/" + userId,
                    auth: {
                        'bearer': accessToken
                    }, body: {
                        "name": randomUser.name + "updated",
                        "gender": randomUser.gender,
                        "email": randomUser.email + "updated",
                        "status": randomStatus
                    }
                })
                    .should((res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body).have.property("id", userId)
                        expect(res.body).have.property("name", randomUser.name + "updated")
                        expect(res.body).have.property("gender", randomUser.gender)
                        expect(res.body).have.property("email", randomUser.email + "updated")
                        expect(res.body).have.property("status", randomStatus)
                    })
            })
            .then((res) => {
                const updatedID = res.body.id
                cy.request({
                    method: "GET",
                    url: "https://gorest.co.in/public/v2/users/" + updatedID,
                    auth: {
                        'bearer': accessToken
                    }
                })
                    .then((res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body).have.property("id", updatedID)
                        expect(res.body).have.property("name", randomUser.name + "updated")
                        expect(res.body).have.property("gender", randomUser.gender)
                        expect(res.body).have.property("email", randomUser.email + "updated")
                        expect(res.body).have.property("status", randomStatus)
                        cy.log(JSON.stringify(res.body))
                    })
            })
    })

    it("GET with chained GET(loop) ", () => {
        let item = "Samsung";

        cy.request({
            method: "GET",
            url: "https://dummyjson.com/products/search?q=" + item
        })
            .then((response) => {
                const product = response.body.products
                return product
            })
            .then((product) => {
                // search for all items with that name
                for (let i = 0; i < product.length; i++) {
                    cy.request({
                        method: "GET",
                        url: "https://dummyjson.com/products/search?q=" + product[i].title
                    }).then((res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body.products[0]).to.have.property("title", product[i].title)
                    })
                }
            })
    })

    it("POST-DELETE chained methods", () => {
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            auth: {
                'bearer': accessToken
            },
            body: {
                "name": randomUser.name,
                "gender": randomUser.gender,
                "email": randomUser.email,
                "status": randomStatus
            }
        })
            .then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body).have.property("name", randomUser.name)
                expect(res.body).have.property("gender", randomUser.gender)
                expect(res.body).have.property("email", randomUser.email)
                expect(res.body).have.property("status", randomStatus)
            })
            .then((res) => {
                const userId = res.body.id
                cy.log("User id is: " + userId)

                cy.request({
                    method: "DELETE",
                    url: "https://gorest.co.in/public/v2/users/" + userId,
                    auth: {
                        'bearer': accessToken
                    }
                }).then((res) => {
                    expect(res.status).to.eq(204)
                })
            })
    })

    it("Spy/Intercept API request", () => {
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.intercept({
            path: "/comments"
        }).as("comments")
        cy.get("table:nth-of-type(1) a[href='/comments']").click()
        cy.wait("@comments").then(inter => {
            cy.log(JSON.stringify(inter))
            console.log(JSON.stringify(inter))
            expect(inter.response.body).to.have.length(500)
        })
    })

    it("Mock API with static response", () => {
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.intercept("GET", "/posts", { limit: 100, name: "John Doe" })
            .as("posts")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@posts").then(inter => {
            expect(inter.response.body.limit).eq(100)
            expect(inter.response.body).to.have.property("name", "John Doe")
        })
    })

    it("Mock API response with dynamic fixture", () => {
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.intercept("GET", "/posts", { fixture: "customer.json" })
            .as("posts")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@posts").then(inter => {
            expect(inter.response.body[0].firstName).eq("John")
            expect(inter.response.body[0]).to.have.property("lastName", "Johnson")
        })
    })
})