describe('Central de Atendimento ao Cliente TAT', () => {
  //visitando site antes de todos os testes
  beforeEach(() => cy.visit('./src/index.html'))

  it('verifica o título da aplicação', () => {
    //verificando título da aplicação
    cy.get('#title').contains('CAC TAT')
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário.', () =>{

    // constante
    const longText = Cypress._.repeat('Obrigada!', 10)
    //instruções de inserção de conteúdo nos campos
    cy.get('#firstName').type('Marilia')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('testes@testes.com.br')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('.button').click()

    //validação da assertividade do testes
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
    //instruções de inserção de conteúdo nos campos
    cy.get('#firstName').type('Marilia')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('testes2testes.com.br')
    cy.get('#open-text-area').type('Bom curso!')
    cy.get('.button').click()
    
    //validação da assertividade do testes
    cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não-númerico', ()=>{
    //instruções de inserção de conteúdo nos campos
    cy.get('#phone').type('abcd').should('have.value', '')

  })

  it('exibir mensagem de erro quandp o telefone se torner orbigatório ma não é preenchido', ()=>{
    //instruções de inserção de conteúdo nos campos
    cy.get('#firstName').type('Marilia')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('testes@testes.com.br')
    cy.get('#open-text-area').type('Bom curso!')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

     //validação da assertividade do testes
    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName').type('Marilia').should('have.value', 'Marilia').clear().should('have.value', '')
    cy.get('#lastName').type('Correia').should('have.value', 'Correia').clear().should('have.value', '')
    cy.get('#email').type('testes@testes.com.br').should('have.value', 'testes@testes.com.br').clear().should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('71999995566').should('have.value', '71999995566').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{

    //instruções de inserção de conteúdo nos campos
    cy.get('button[type="submit"]').click()

    //validação da assertividade do testes
    cy.get('.error').should('be.visible')
  })

  it.only('envia o formuário com sucesso usando um comando customizado', () =>{




  })

})