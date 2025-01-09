describe('Pesquisa endereço no navegador', function() {
    beforeEach(function(){
        cy.visit('https://google.com')
    })    
    it.only('busca numa página digitando e clicando enter', function(){
        cy.get('#APjFqb').type('lp.pontomais login{enter}')
     })

    it('busca digitando e clicando na lupa', function(){
      cy.get('#APjFqb').type('lp.pontomais login')  
     // cy.get('.H0PQec').click() clicar na lupa
    })

    it('submeter o form diretamente', function(){
        cy.get('#input').type('lp.pontomais login')  
        // cy.get('.H0PQec').click() clicar na lupa
    })
})