describe('Testing for detection report', () => {
  it('Can open', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Detection').click()
    cy.url().should('include', '/Detection')

  })
  it('Should be able upload video', function () {
    // upload file using drag and drop using a fixtue
    const fileName = 'files/demo2.mp4'
    cy.fixture(fileName, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)  
    .then(fileContent => {
        // console.log(fileContent.toString())
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName,
          mimeType: 'video/mp4',
          encoding: 'utf8'
        });
      });
      cy.wait(5000)
    // assert succesful upload and continue testing
  })

  it('Deepfake Detection', function () {

    cy.intercept('http://localhost:8000/svm_test').as('apiCheck_svm')
    cy.intercept('http://localhost:8000/ensemble_test').as('apiCheck_ens')
    cy.intercept('http://localhost:8000/cnn_test').as('apiCheck_cnn')
    cy.intercept('http://localhost:8000/capsule_test').as('apiCheck_cap')
    cy.contains('Detect the Video').click()
    console.log("button click")
    
    cy.wait('@apiCheck_cnn', { requestTimeout: 500000, responseTimeout: 500000 })
    cy.wait('@apiCheck_ens', { requestTimeout: 500000, responseTimeout: 500000 })
    cy.wait('@apiCheck_svm', { requestTimeout: 500000, responseTimeout: 500000 })
    cy.wait('@apiCheck_cap', { requestTimeout: 500000, responseTimeout: 500000 })
  })
})