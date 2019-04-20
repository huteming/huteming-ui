// https://docs.cypress.io/api/introduction/api.html

describe('canvas', () => {
    before(() => {
        cy.visit('#/test/canvas')
    })

    it('生成png图片', () => {
        const src = cy
            .get('#png')
            .should('have.attr', 'src')
            .and('include', 'data:image/png;base64,')
    })

    it('生成jpg图片', () => {
        const src = cy
            .get('#jpg')
            .should('have.attr', 'src')
            .and('include', 'data:image/jpeg;base64,')
    })
})
