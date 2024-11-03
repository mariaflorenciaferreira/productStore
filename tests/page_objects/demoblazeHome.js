const {By,until} =require('selenium-webdriver')

class HomePage{


    constructor(driver){
        this.driver=driver;
        this.url='https://www.demoblaze.com/'

        this.productContainer = By.css('.div.container:nth-child(6) div.row div.col-lg-9 div.row:nth-child(1) div.col-lg-4.col-md-6.mb-4:nth-child(1) div.card.h-100 > div.card-block:nth-child(2)');
        this.productTitle=By.css('.div.container:nth-child(6) div.row div.col-lg-9 div.row:nth-child(1) div.col-lg-4.col-md-6.mb-4:nth-child(1) div.card.h-100 div.card-block:nth-child(2) h4.card-title:nth-child(1) > a.hrefch')
        this.productPrice=By.css('.h5.card-price')
        this.productlink=By.css('.div.card a')
        this.nextPageButton = By.id('next2');

        
    }

    
    async open(){
        await this.driver.get(this.url);
    }

    async getProductDetails(){
        const products=[];

        const productElements = await this.driver.findElements(this.productContainer);

        for (const productElement of productElements){
            const title= await productElement.findElement(this.productTitles).getText();
            const price = await productElement.findElement(this.productPrices).getText();
            const link = await productElement.findElement(this.productLinks).getAttribute('href');
            

            console.log(`Title: ${title}, Price: ${price}, Link: ${link}`); // Debug statement


            products.push({title,price,link})
        }
        
        return products

    }

    async goToNextPage() {
        const nextPageBtn = await this.driver.findElement(this.nextPageButton);
        await nextPageBtn.click();

        await this.driver.sleep(2000);
        await this.driver.wait(until.elementsLocated(this.productContainer), 5000); 
    }



}

module.exports=HomePage;