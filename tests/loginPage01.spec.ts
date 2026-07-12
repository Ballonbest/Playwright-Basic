import {test , expect} from '@playwright/test'

let loginemailInput:string = '#email'
let loginPasswordInput:string = 'input[name="password"]'

let loginbtn:string = '#btn-login'

test.beforeEach('open URL', async({page}) => {
    await page.goto("https://automate-test.stpb-digital.com/login/")
})

test('Should display all login page elements', async({page}) => {
    await page.getByText("Welcome to Kru P' Beam! 👋🏻")
    await expect(page.locator(loginemailInput)).toBeEditable()
    await expect(page.locator(loginPasswordInput)).toBeEditable()
    await expect(page.locator(loginbtn)).toBeVisible()
    await expect(page.getByRole('link', {name:"Create an account"})).toBeVisible()
})

test('Should display correct page title', async({page}) => {
    await page.getByTitle("Kru P' Beam - STPB")
})

test('Should accept valid email format', async({page}) => {
    await page.locator(loginemailInput).fill("user.test@krupbeam.com")
    await expect(page.locator(loginemailInput)).toHaveValue("user.test@krupbeam.com")

    await page.locator(loginbtn).click()
    await expect(page.getByText("email must be a valid email")).not.toBeVisible()
    await expect(page.locator('p.MuiFormHelperText-root', {hasText:"email must be a valid email"})).not.toBeVisible()
})

test('Should reject invalid email format', async({page}) => {
    let data:string[] = ['user.krupbeam.com','ไทย','09912345678']

    for(let x of data){
        await page.locator(loginemailInput).fill(x)
        await page.locator(loginbtn).click()

        await expect(page.getByText("email must be a valid email")).toBeVisible()
        await expect(page.locator('p.MuiFormHelperText-root', {hasText:"email must be a valid email"})).toBeVisible()
    }
})

test('Should accept password visibility', async ({page}) => {
    await page.locator(loginPasswordInput).fill('1234567890')
    await page.locator(loginbtn).click()

    await expect(page.getByText('password must be at least 5 characters')).not.toBeVisible()
    await expect(page.locator('p.MuiFormHelperText-root', {hasText:"password must be at least 5 characters"})).not.toBeVisible()
})

test('Should reject password under 5 characters', async({page}) => {
    let passinvalid:string[] = ['123', 'test']

    for(let x of passinvalid){
        await page.locator(loginPasswordInput).fill(x)
        await page.locator(loginbtn).click()

        await expect(page.getByText('password must be at least 5 characters')).toBeVisible()
        await expect(page.locator('p.MuiFormHelperText-root', {hasText:"password must be at least 5 characters"})).toBeVisible()
    }
})

test('Should toggle password visibility', async({page}) => {
    await page.locator(loginPasswordInput).fill('123')
    await expect(page.locator(loginPasswordInput)).toHaveValue('123')
    await page.locator('div:has(> input[name="password"]) button').click()

    await expect(page.locator(loginPasswordInput)).toHaveAttribute('type', 'text')
})

test('Should login successfully with valid credentials', async({page}) => {
    await page.locator(loginemailInput).fill('user.test@krupbeam.com')
    await page.locator(loginPasswordInput).fill('jKNsrapwLNV7eBN')
    await page.locator(loginbtn).click()

    await page.waitForURL('https://automate-test.stpb-digital.com/user/list/')
    await expect(page).toHaveURL('https://automate-test.stpb-digital.com/user/list/')
    await expect(page.getByText('Search Filters')).toBeVisible()
})

test('Should reject unregistered email and password', async({page}) => {
    await page.locator(loginemailInput).fill('test12345678@gmail.com')
    await page.locator(loginPasswordInput).fill('12345678900')
    await page.locator(loginbtn).click()

    await expect(page.getByText('Email or Password is invalid')).toBeVisible()
    await expect(page.locator('p.MuiFormHelperText-root', {hasText:"Email or Password is invalid"})).toBeVisible()
})

test.only('Should show required field errors when empty', async({page}) => {
    await page.locator(loginemailInput).fill('')
    await page.locator(loginPasswordInput).fill('')
    await page.locator(loginbtn).click()

    await expect(page.getByText("email is a required field")).toBeVisible()
    await expect(page.getByText("password must be at least 5 characters")).toBeVisible()
})

test.only('Should navigate to signup page', async({page}) => {
    await page.getByRole('link' , {name:"Create an account"}).click()
    await page.waitForURL('https://automate-test.stpb-digital.com/register/')
    await expect(page).toHaveURL("https://automate-test.stpb-digital.com/register/")

    await expect(page).toHaveTitle("Kru P' Beam - STPB")
    await expect(page.getByText("Welcome to Kru P' Beam! 👋🏻").first()).toBeVisible()
})