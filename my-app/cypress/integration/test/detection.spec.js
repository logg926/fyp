describe('Testing for detection report', () => {
  it('Can open', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Detection').click()
    cy.url().should('include', '/Detection')

  })
  it('Should be able upload video', function () {
    // upload file using drag and drop using a fixtue
    const fileName = 'files/demo1.mp4'
    cy.fixture(fileName)
      .then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName,
          mimeType: 'video/mp4',
          encoding: 'utf8'
        });
      });
      expect(vid).match(fileName);
    // assert succesful upload and continue testing
  })

  // it('Deepfake Detection', function () {

  //   cy.intercept('http://localhost:8000/svm_test').as('apiCheck_svm')
  //   cy.intercept('http://localhost:8000/ensemble_test').as('apiCheck_ens')
  //   cy.intercept('http://localhost:8000/cnn_test').as('apiCheck_cnn')
  //   cy.intercept('http://localhost:8000/capsule_test').as('apiCheck_cap')
  //   cy.contains('Detect').click()
  //   console.log("button click")
  //   cy.wait('@apiCheck_cap', { requestTimeout: 50000 })
  //   cy.wait('@apiCheck_cnn', { requestTimeout: 50000 })
  //   cy.wait('@apiCheck_ens', { requestTimeout: 50000 })
  //   cy.wait('@apiCheck_svm', { requestTimeout: 50000 })
  // })
})