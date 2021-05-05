describe('Testing for Info page', () => {  
    // Test for opening the detection page
    it('Can open', () => {
      cy.visit('http://localhost:3000')
  
      cy.contains('Info').click()
  
    })
})