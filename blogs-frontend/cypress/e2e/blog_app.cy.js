describe('Blog App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Juan',
      username: 'JJB',
      password: 'pass'      
    }
    
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.login({username: 'JJB', password: 'pass'})
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', () => {
    cy.get('#logout').click()
    cy.contains('Blogs App')
    cy.contains('login')
  })

  describe('When logged in', function() {
  
      it('A blog can be created', function() {
        cy.get('button').eq(1)
        cy.get('#title').type('This Title')
        cy.get('#author').type('This Author')
        cy.get('#url').type('This URL')
      })
    })

  describe('Login', () => {
    it('fails with wrong credentials', () => {
      cy.get('#logout').click()
      cy.get('#username').type('testing')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
    it('succeds with correct credentials', () => {
      cy.get('#logout').click()
      cy.get('#username').type('JJB')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()
      cy.contains('Juan logged-in')
    })
  })
})

