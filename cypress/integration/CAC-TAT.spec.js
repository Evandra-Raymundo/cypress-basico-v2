// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulario', function(){
       // Para o exercício 13 vamos criar uma nova linha com cy clock
       cy.clock()
        //Para o exercício extra 1 vamos criar uma variável
       const longText = 'Teste para o exercício 2 que exige um texto longo dentro do campo de digitação, Teste para o exercício 2 que exige um texto longo dentro do campo de digitação.'

       //exercício 1
        cy.get('#firstName').type('Evandra')
        cy.get('#lastName').type('Raymundo')
        cy.get('#email').type('evandra@exemplo.com')
        //cy.get('#open-text-area').type('Teste primeira automação') usado no exercício 1
        cy.get('#open-text-area').type(longText, { delay: 0}) // para o exercício extra 2 como é a variável vai sem aspas e o objeto delay tira o tempo de espera
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click() // para o exercício extra 8 usamos cy.contains ao invés de cy.get
        cy.get('.success').should('be.visible')
       
        //Adicionados para o exercício 13 
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })
    it('mensagem de erro ao submeter o formulário  com email com formatação inválida', function(){
        // Para o exercício 13 vamos criar uma nova linha com cy clock
       cy.clock()
        
        cy.get('#firstName').type('Evandra')
        cy.get('#lastName').type('Raymundo')
        cy.get('#email').type('evandra@exemplo,com')
        cy.get('#open-text-area').type('Teste exercício extra2') 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click() // para o exercício extra 8 usamos cy.contains ao invés de cy.get
        cy.get('.error').should('be.visible')

        //Adicionados para o exercício 13 
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){  //exercício extra 3 telefone vazio 
       cy.get('#phone')
       .type('abcdefghij')
       .should('have.value', '')
    })
    it.only('exibe mensagem de erro quando telefone se torna obrigatório mas não pe preenchido antes do envio do  form ', function(){
        // Para o exercício 13 vamos criar uma nova linha com cy clock
        cy.clock()

        cy.get('#firstName').type('Evandra')
        cy.get('#lastName').type('Raymundo')
        cy.get('#email').type('evandra@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste exercício extra4') 
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click() // para o exercício extra 8 usamos cy.contains ao invés de cy.get
        
        cy.get('.error').should('be.visible')
         //Adicionados para o exercício 13 
         cy.tick(3000)
         cy.get('.success').should('not.be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){ // Exercício extra 5
        cy.get('#firstName')
        .type('Evandra')
        .should('have.value', 'Evandra')
        .clear()
        .should('have.value', '')
        
        cy.get('#lastName')
        .type('Raymundo')
        .should('have.value', 'Raymundo')
        .clear()
        .should('have.value', '')
       
        cy.get('#email')
        .type('evandra@exemplo.com')
        .should('have.value', 'evandra@exemplo.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('1633722345')
        .should('have.value', '1633722345')
        .clear()
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando nenhum campo obrigatório é preenchido', function(){ // Exercício extra 6
       // cy.get('button[type="submit"]').click()
       cy.contains('button', 'Enviar').click() // para o exercício extra 8 usamos cy.contains ao invés de cy.get
        cy.get('.error').should('be.visible') 
    })
    it('envia formulário com sucesso usando comando customizado', function(){
     cy.fillMandatoryFieldsAndSubmit()
     cy.get('.success').should('be.visible')
    })
    //criando seleções em campos drop down
    it('seleciona produto(YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube' )
    })
    it('seleciona produto pelo seu valor(Mentoria) por seu texto', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria' )
    })
    it('seleciona produto pelo seu índice(Blog) por seu texto', function(){
        cy.get('#product')
        .select(1) // indice é número por isso está sem aspas
        .should('have.value', 'blog' )
    })
      
    //inputs do tipo radio, são seleção de opção única
      it('marca o tipo de atendimento "FeedBack"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
       // .should('not.be.checked')  força a falha. Ou seja é pra verificar a não marcação e está marcado
        .should('be.checked') 
    })
     //Utilizando o cy.each() e o cy.wrap() marca cada um dos radios e verifica um de cada vez
     it('marca cada  tipo de atendimento', function(){
        cy.get('input[type="radio"]')
         .each(typeofService => {
            cy.wrap(typeofService)
            .check()
            .should('be.checked')
         }) 
    })
    //Marcando e desmarcando inputs do tipo checkbox
    it('marca ambos checkboxes de depois demarca o último (last)', function(){
        cy.get('input[type="checkbox"]') //seletor genérico
        .check()
        .should('be.checked') //verifica q todos estão marcados
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    // Revisão de exercício já realizado, utilizando check ao invés de click
    it('exibe mensagem de erro quando telefone se torna obrigatório mas não pe preenchido antes do envio do  form ', function(){
        cy.get('#firstName').type('Evandra')
        cy.get('#lastName').type('Raymundo')
        cy.get('#email').type('evandra@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste exercício extra6')
        cy.contains('button', 'Enviar').click() // para o exercício extra trocamos o click do exercício 4 para check
        
        cy.get('.error').should('be.visible')
    })
      //Fazendo upload de arquivos com cypress
     // it.only('seleciona um arquivo da pasta fixtures', ()=> {
      //  cy.get('#file-upload')
        //.selectFile('cypress-basico-v2\cypress\fixtures\example.json')
       // .should((input)=> {
       //  //console.log(input)   
       //  expect(input[0].files[0].name).to.equal('example.json')
       // })
     // })
    // it('seleciona um arquivo simulando um drag and drop', () => {
       // cy.get('#file-upload')
      //  .selectFile('cypress-basico-v2\cypress\fixtures\example.json', {action: 'drag-drop'})
     //  .should((input)=> {
        //console.log(input)   
     //   expect(input[0].files[0].name).to.equal('example.json')
     //   })
    // })
   
    // it('seleciona um arquivo utilizando uma fixture para qual foi dado um alias', () => {
      //  cy.fixture('example.json').as('sampleFile')
     //   cy.get('#file-upload')
     //   .selectFile('@sampleFile')
     //   .should((input)=> {
     //   expect(input[0].files[0].name).to.equal('example.json')
     //   })
    // })

     //Links que abrem em outra ABA
     it('verifica a politica de privacidade abre em outra aba sem o clique', ()=> {
        cy.contains('a', 'Política de Privacidade') //criando uma seleção mais específica
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
     })
     it('acessa a página da política de privacidade removendo a target e então cçoca no Link', ()=> {
        cy.contains('a', 'Política de Privacidade') //criando uma seleção mais específica
        .invoke('removeAttr', 'target') // remoção do target 
        .click()
        cy.contains('h1', 'CAC TAT - Política de privacidade')
        .should('be.visible')
     })
     
    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
            cy.get('.success')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')
              .invoke('hide')
              .should('not.be.visible')
            cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
    })
     //Simulando um comando CTRL+V
    it('preenche o campo da área de texto usando o comando invoke', () => {
      cy.get('#open-text-area').invoke('val', 'Esse texto é do exercício13')
      .should('have.value', 'Esse texto é do exercício13')
     })
     it(' Faz uma requisição HTTP', () => {
       cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
       .as('getRequest')
       .its('status')
       .should('be.equal', 200)
       cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')
        cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')
    })

    it.only('encontra o gato escondido', () => {
      cy.get('#cat') 
       .invoke ('show')
       .should('be.visible')
       //Mudando o nome da aplicação
       cy.get('#title')
       .invoke('text', 'CAT TAT')
       cy.get('#subtitle')
       .invoke('text', 'I love CATs')
    })

    

  })