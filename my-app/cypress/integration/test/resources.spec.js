describe('Testing for resources tab', () => {
    // Test for opening the detection page
    it('Can open', () => {
        cy.visit('http://localhost:3000')

        cy.contains('Resources').click()
        cy.url().should('include', '/Resources')

    })

    it('Can open subtabs', () => {
        cy.contains('Introduction to deepfake').click()
        cy.contains('Introduction to deepfake models').click()
        cy.contains('Potential Application and Related Incidents').click()
        cy.contains('External links').click()
    })
})