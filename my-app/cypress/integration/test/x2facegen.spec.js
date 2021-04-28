function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

describe('Testing for generation', () => {
  it('Can open', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Generation').click()
    cy.url().should('include', '/Generation')


    cy.contains('Generation with X2face').click()
    cy.url().should('include', '/x2face')

    cy.contains('Start').click()
    cy.wait(1000)
    cy.contains('Stop').click()

  })
  it('Should be able upload', function () {
    // upload file using drag and drop using a fixtue
    // cy.fixture('files/lena_gray.jpg', 'base64').then(content => {
    //     cy.get('input[type=file]').attachFile(content, 'lena_gray.jpg')
    // })
    const fileName = 'files/lena_gray.jpg'
    cy.fixture(fileName)
      .then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent: b64toBlob(fileContent),
          fileName,
          mimeType: 'image/jpeg'
        });
      });

    // assert succesful upload and continue testing
  })
  it('Deepfake Generation', function () {

    cy.intercept('http://localhost:8000/x2gen').as('apiCheck')
    cy.contains('Deepfake this video and Photo').click()
    cy.wait('@apiCheck', { requestTimeout: 50000 })

    cy.contains('Click me to download')
      .invoke('attr', 'href')
      .then(href => {
        const uriRegEx = /http:\/\/localhost:8000\/static\//;
        expect(href).match(uriRegEx);
      });
    // assert succesful upload and continue testing
    // cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','mydownloads','example.jpg')
  })
})