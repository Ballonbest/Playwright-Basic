import{test, expect} from '@playwright/test'

test('test table', async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const table = page.locator('table').first() // ระบุตารางที่ต้องการก่อน

    const targetRow = table.locator('tr').filter({hasText:'Learn Selenium'})
    const rowData = await targetRow.innerText()
    console.log('ข้อมูลแถว Learn Selenium:', rowData)

    const bookNamesColumn = table.locator('tbody tr td:nth-child(1)')
    const names: string[] = await bookNamesColumn.allInnerTexts()
    console.log('รายชื่อหนังสือทั้งหมด', names)
})
