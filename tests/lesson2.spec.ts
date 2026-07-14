import {test, expect} from '@playwright/test' 

test.beforeEach('open URL register',async({page}) => {
    await page.goto('https://automate-test.stpb-digital.com/register/')
})

test('Should be able to check and unlock skills', async({page}) => {
    const sqlCheckbox = page.getByRole('checkbox', {name:"SQL"})

    await sqlCheckbox.check()
    await expect(sqlCheckbox).toBeChecked()

    await sqlCheckbox.uncheck()
    await expect(sqlCheckbox).not.toBeChecked()
})

test('Should allow selecting only one gender at a time', async({page}) => {
    const femaleRadio = page.getByRole('radio', {name:"Female", exact:true})
    const maleRadio = page.getByRole('radio', {name:"Male", exact:true})

    await femaleRadio.check()
    await expect(femaleRadio).toBeChecked()
    await expect(maleRadio).not.toBeChecked()

    await maleRadio.check()
    await expect(maleRadio).toBeChecked()
    await expect(femaleRadio).not.toBeChecked()
})

test.only('dropdown', async({page}) => {
    await page.goto("https://web-demo.qahive.com/form-demo")
    await page.locator('//*[@id="root"]/main/div/div/form[1]/div[5]/select').selectOption('TH')

    await expect(page.locator('//*[@id="root"]/main/div/div/form[1]/div[5]/select')).toHaveValue('TH')
})

