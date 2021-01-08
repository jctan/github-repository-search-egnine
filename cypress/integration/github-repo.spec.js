
//<reference types="Cypress" />


context('Github Repo Cypress Test', () => {
	const username = 'jctan'

	beforeEach(() => {
		cy.visit('http://localhost:8080');
	})
	it('check username entered', function(){
		cy.get('#input-7')
		  .type(username)
		  .should('have.value', username)
		  .type('{enter}')
	})


	it('check user entered exist', function(){
		cy.get('#input-7')
		  .type(username)
		  .should('have.value', username)
		  .type('{enter}')

		cy.get('.v-list-item__content')
		  .should('be.visible')
	})


	it('check if user have repo(s)', function(){

		cy.get('#input-7')
		  .type(username)
		  .type('{enter}')

		cy.request('GET',`https://api.github.com/users/${username}`).then((res) => {
			expect(res).to.have.property('status', 200)
		})
		  
		cy.get('.container.repositories')
		  .should('be.visible')
	})

})