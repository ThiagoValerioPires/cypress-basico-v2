// <reference types="Cypress" />
beforeEach(() => {
    cy.visit('./src/index.html')
  })

describe('Central de Atendimento ao Cliente TAT', function(){

    it('verifica o titulo da aplicacao', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    
    it('preenche campos obrigatorios e envia formulario', function(){        
        const textoLongo = 'Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me Ajude-me'
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Pires')
        cy.get('#email').type('thiago.valerio@gmail.com')
        cy.get('#open-text-area').type(textoLongo,{delay:0})
        
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){        
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Pires')
        cy.get('#email').type('thiago.valerio.gmail.com')
        cy.get('#open-text-area').type('Help')
        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', function(){        
        cy.get('#phone').type('Thiago').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){        
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Pires')
        cy.get('#email').type('thiago.valerio@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Help')
        
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()        
        cy.get('.success').should('be.visible')
    })
})