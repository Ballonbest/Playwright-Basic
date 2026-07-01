import { test, expect } from '@playwright/test'

const loginUrl: string = 'https://automate-test.stpb-digital.com/login/'

let loginEmailInput: string = '#email'
let loginPasswordInput: string = 'input[name="password"]'
let loginbtn: string = '#btn-login'

//msg
let loginmsg_Email: string = 'email must be a valid email'
let loginmsg_Password: string = 'password must be at least 5 characters'

test.beforeEach('Open Url', async ({ page }) => {
    await page.goto(loginUrl)
})


test('Verify Login page elements displayed are correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: "Welcome to Kru P' Beam! 👋🏻" })).toBeVisible()
    await expect(page.locator(loginEmailInput)).toBeVisible()
    await expect(page.locator(loginPasswordInput)).toBeVisible()
    await expect(page.locator(loginbtn)).toBeEnabled()
    await expect(page.getByRole('link', { name: "Create an account" })).toBeVisible
})

test('Verify display name page', async ({ page }) => {
    await expect(page).toHaveTitle("Kru P' Beam - STPB")
})

test('Valid Email with Special Characters', async ({ page }) => {
    await page.locator(loginEmailInput).fill('user.test@krupbeam.com')

    await page.locator(loginbtn).click()
    await expect(page.getByText(loginmsg_Email)).not.toBeVisible()
})

test('Should reject email containing non-English characters and invlid format', async ({ page }) => {
    const data: string[] = ['user.krupbeam.com', 'ไทย', '09912345678']

    for (let x of data) {
        await page.locator(loginEmailInput).fill(x)
        await page.locator(loginbtn).click()
        await expect(page.getByText(loginmsg_Email)).toBeVisible()
    }
})

test.only('Valid input over 5 digits', async ({ page }) => {
    await page.locator(loginPasswordInput).fill('1234567890')

    await expect(page.locator(loginPasswordInput)).toHaveValue('1234567890')
    await expect(page.getByText(loginmsg_Password)).not.toBeVisible()
})

test.only('Invalid input under 5 digits',async ({page}) => {
    let data:string[] = ['123','test']

    for(let x of data){
    await page.locator(loginPasswordInput).fill(x)
    await expect(page.locator(loginPasswordInput)).toHaveValue(x)
    await page.locator(loginbtn).click()

    await expect(page.getByText(loginmsg_Password)).toBeVisible()
    }

    
})