const { test, expect } = require('../support')

test('deve logar como administrador', async ({page})=> {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
})

test('não deve logar com senha incorreta', async ({page})=> {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'abc123')
  
  const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
  await page.popup.haveText(message)
})

test('não deve logar com email inválido', async ({page})=> {
  await page.login.visit()
  await page.login.submit('andreas.com.br', 'pwd123')
  await page.login.alertHaveText('Email incorreto')
})

test('não deve logar com senha em branco', async ({page})=> {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', '')
  await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar com email em branco', async ({page})=> {
  await page.login.visit()
  await page.login.submit('', 'pwd123')
  await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar com os dois campos em branco', async ({page})=> {
  await page.login.visit()
  await page.login.submit('', '')
  await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})