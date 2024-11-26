const {test, expect } = require('../support')
const { faker } = require('@faker-js/faker')


test('deve cadastrar um lead na lista de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
});


test('não deve cadastrar quando e-mail já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok())

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});

test('não deve cadastrar com e-mail inválido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Andreas Engel', 'andreas.com')
  
  await page.leads.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'andreas@gmail.com')
  
  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Andreas Engel', '')
  
  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')
  
  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});

