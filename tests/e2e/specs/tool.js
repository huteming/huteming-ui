// https://docs.cypress.io/api/introduction/api.html

describe('tool', () => {
    const queryA = 'hello'

    before(() => {
        cy.visit(`#/test/tool?a=${queryA}`)
    })

    it('loadImages', () => {
        cy
            .get('img')
            .should('have.length', 2)
    })

    it('jsonToForm', () => {
        cy.get('#json-a').contains('a')
    })

    it('parseQuery', () => {
        cy.get('#query-a').contains(queryA)
    })
})
