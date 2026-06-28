import { test, expect } from '@playwright/test'


test.only('Test Locator', async ({ page }) => {
    await page.goto('https://automate-test.stpb-digital.com/login/')
    await page.locator('#email').fill('admin')
    // await page.locator('class="MuiOutlinedInput-input MuiInputBase-input css-pv9vr9"').fill('admin')
    await page.getByLabel('email is a required field')
    await page.pause();
    await page.getByText('Login')
})


test('Test Assertion', async({page})=> {
    await page.goto('https://automate-test.stpb-digital.com/login/')
    await page.locator('#email').fill('admin') //กรอก email invalid
    await page.locator('#btn-login').click() //สั่งให้กดปุ่มล๊อคอิน

    await expect(page.locator('//*[@id="__next"]/div[1]/div/div/div[2]/div/div/form/div[1]/p')).toHaveText('email must be a valid email')
    await expect(page.locator('#btn-login')).toBeDisabled()
    
    await expect(page).toHaveURL('https://automate-test.stpb-digital.com/login/')
})