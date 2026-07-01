import { test, expect} from '@playwright/test'
 
const url:string = 'https://automate-test.stpb-digital.com/login/'
let locator_email:string = '#email'
let locator_pass:string = 'input[name="password"]'
let locator_btn_btnLogin:string = '#btn-login'
let locator_msgEmail:string = 'email must be a valid email'
let locator_msgPassword:string = 'password must be at least 5 characters'
let locator_btnHide:string = '//*[@id="__next"]/div[1]/div/div/div[2]/div/div/form/div[2]/div/div/button'

test.beforeEach('Open Url', async({page}) => {
    await page.goto(url)
})

test('Validate to default page', async ({page})=> {
    // await page.goto(url)
    await expect(page).toHaveTitle("Kru P' Beam - STPB")
    await expect(page.getByText("Welcome to Kru P' Beam! 👋🏻")).toBeVisible()
    await expect(page.locator(locator_email)).toBeVisible();
    await expect(page.locator(locator_pass)).toBeVisible();
    await expect(page.locator(locator_btn_btnLogin)).toBeVisible()
    await expect(page.getByRole("link", {name:"Create an account"})).toBeVisible()
})

test('Validate show name page', async({page})=> {
    // await page.goto(url)
    await expect(page).toHaveTitle("Kru P' Beam - STPB")
})

test('Validate the email format is valid', async({page})=> {
    // await page.goto(url)
    await page.locator(locator_email).fill('user.test@krupbeam.com')

    await expect(page.locator(locator_email)).toHaveValue('user.test@krupbeam.com')
    await expect(page.getByText(locator_msgEmail)).not.toBeVisible()
})

test('Validate the email format is invalid', async({page})=>{
    // await page.goto(url);

    let data:string[] = ['user.krupbeam.com','ไทย', '09912345678']
    
    for(let x of data){
        await page.locator(locator_email).fill(x)
        await expect(page.locator(locator_email)).toHaveValue(x)
        await page.locator(locator_btn_btnLogin).click()
        await expect(page.getByText(locator_msgEmail)).toBeVisible()
    }
})

test('Validate the password format is valid',async ({page})=> {
    // await page.goto(url)
    await page.locator(locator_pass).fill('1234567890')

    await expect(page.locator(locator_pass)).toHaveValue('1234567890')
    await expect(page.getByText(locator_msgPassword)).not.toBeVisible()
})

test('Validate the password format is invalid',async ({page})=> {
    // await page.goto(url)

    let data:string[] = ['123','ไทย','test']

    for(let x of data){
    await page.locator(locator_pass).fill(x)
    await expect(page.locator(locator_pass)).toHaveValue(x)
    await page.locator(locator_btn_btnLogin).click();
    await expect(page.getByText(locator_msgPassword)).toBeVisible()
    }
})

test('Verify hide password button functionality', async ({page})=> {
    // await page.goto(url)
    await page.locator(locator_pass).fill('1234567890')

    await expect(page.locator(locator_pass)).toHaveValue('1234567890')
    await page.locator(locator_btnHide).click()

    await expect(page.locator(locator_pass)).toHaveAttribute('type', 'text')
})

test('Verify the email and password is valid', async ({page})=> {
    // await page.goto(url)
    await page.locator(locator_email).fill('user.test@krupbeam.com')
    await page.locator(locator_pass).fill('jKNsrapwLNV7eBN')

    await expect(page.locator(locator_email)).toHaveValue('user.test@krupbeam.com')
    await expect(page.locator(locator_pass)).toHaveValue('jKNsrapwLNV7eBN')

    await page.locator(locator_btn_btnLogin).click()
    await expect(page.getByText('Search Filters')).toBeVisible()
    await expect(page).toHaveURL('https://automate-test.stpb-digital.com/user/list/')
})

test('Verify the email and password is invalid', async ({page})=> {
    // await page.goto(url)
    await page.locator(locator_email).fill('test12345678@gmail.com')
    await page.locator(locator_pass).fill('12345678900')

    await expect(page.locator(locator_email)).toHaveValue('test12345678@gmail.com')
    await expect(page.locator(locator_pass)).toHaveValue('12345678900')

    await page.locator(locator_btn_btnLogin).click()
    await expect(page.getByText('Email or Password is invalid')).toBeVisible()
})

test('Verify required fields for input text', async ({page})=> {
    // await page.goto(url)
    await page.locator(locator_email).fill('')
    await page.locator(locator_pass).fill('')
    await page.locator(locator_btn_btnLogin).click()
    await expect(page.getByText('email is a required field')).toBeVisible()
    await expect(page.getByText(locator_msgPassword)).toBeVisible()
})

test('Verify link Hyperlink Hyperlink Create an account is click', async  ({page}) => {
    // await page.goto(url)
    await page.getByRole('link',{name:'Create an account'}).click()
    await expect(page).toHaveURL('https://automate-test.stpb-digital.com/register/')
    await expect(page).toHaveTitle("Kru P' Beam - STPB")
})

test.afterEach('capture', async({page}, testinfo)=> {
    if(testinfo.status !== testinfo.expectedStatus){
        await page.screenshot({
            path:`screenshots/${testinfo.title}.png`,
            fullPage : true
        });
    }
})
