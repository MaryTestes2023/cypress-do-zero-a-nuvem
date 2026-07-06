describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Obrigada! ', 10)

    cy.get('#firstName').type('Marilia')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('testes@testes.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Marilia')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('testes2testes.com.br')
    cy.get('#open-text-area').type('Bom curso!')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Marilia')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('testes@testes.com.br')
    cy.get('#open-text-area').type('Bom curso!')
    
    cy.get('#phone-checkbox').check() // Alterado para .check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Marilia').should('have.value', 'Marilia').clear().should('have.value', '')
    cy.get('#lastName').type('Correia').should('have.value', 'Correia').clear().should('have.value', '')
    cy.get('#email').type('testes@testes.com.br').should('have.value', 'testes@testes.com.br').clear().should('have.value', '')
    
    cy.get('#phone').type('71999995566').should('have.value', '71999995566').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // Removido o .only para não ignorar os outros testes ao rodar a suite completa
 // it('envia o formulário com sucesso usando um comando customizado', () => {
  //  cy.fillMandatoryFieldsAndSubmit() // Exemplo de comando customizado
  //})
})
