describe("Requests - posts", () => {
    it("Create new comment", () => {
        cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
            .its('body.0')             
            .as('korisnik')                     
            .then(function () {                 
                cy.request('https://jsonplaceholder.cypress.io/posts?_limit=1')
                    .its('body.0')              
                    .as('objava')
            })

            .then(function () {
                cy.request('POST', 'https://jsonplaceholder.cypress.io/comments', {
                    postId: this.objava.id,
                    name: 'Comment name',
                    email: this.korisnik.email,
                    body: 'Comment body'
                })
                    .its('body')
                    .as('komentar')         
            })

            .then(function () {
                expect(this.komentar, 'post has the right user id').property('postId').to.equal(this.objava.id)
                expect(this.komentar, 'post has the right user id').property('email').to.equal(this.korisnik.email)
            })
    })
})