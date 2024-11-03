const {Builder}=require('selenium-webdriver')
const HomePage=require('../page_objects/demoblazeHome')
const fs = require('fs');


describe('Home page products',function(){
    let driver;
    let homePage;


    before(async function () {
        driver= await new Builder().forBrowser('chrome').build();
        homePage=new HomePage(driver);
    })

    after(async function () {
        await driver.quit();
        
    })


    it ('should get product data and save them to a file', async function () {
        await homePage.open();

        const productsListed=[];

        const firstPageProducts=await homePage.getProductDetails();
        productsListed.push(...firstPageProducts)


        await homePage.goToNextPage();
        const secondPageProducts = await homePage.getProductDetails();
        productsListed.push(...secondPageProducts);

        const fileContent = productsListed.map(p => `Title: ${p.title}\nPrice: ${p.price}\nLink: ${p.link}\n`).join('\n');
        fs.writeFileSync('products.txt', fileContent);

        console.log('Product details saved to products.txt');
        
    })

})