Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Evandra')
    cy.get('#lastName').type('Raymundo')
    cy.get('#email').type('evandra@exemplo.com')
    cy.get('#open-text-area').type('Teste automação usando comandos customizados') //usado no exercício 7 customização de automação
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click() // para o exercício extra 8 usamos cy.contains ao invés de cy.get
    cy.get('.success').should('be.visible')
})