const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-angular')());


// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
// //   const browser = await puppeteer.launch();
// //   const page = await browser.newPage();

// //   // Navigate to given Url and wait until Angular is ready.
// //   await page.navigateUntilReady('https://angular.io');

// //   // Selector will find a button on the top of the page that say "Get Started".
// //   await page.clickIfExists('a.button.hero-cta', 'Top Get Started Button');
// //   // Should navigate to the new Url.
// //   console.log(page.target().url()); // https://angular.io/start

// //   // Selector won't find any element on this page.
// //   await page.clickIfExists('a.button.hero-cta', 'Top Get Started Button');
// //   // Url should be the same
// //   console.log(page.target().url()); // https://angular.io/start

// //   await page.close();
// //   await browser.close();
// })();

const configs = [
    {
        label: 'agreeTC',
        selector: 'input#agreeTC',
        type: 'check'
    },
    {
        label: 'Continue',
        selector: 'button#continue',
        type: 'click'
    }
]
const data = {

}

puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage()

    await page.setViewport({ width: 1600, height: 1000 })
    console.log("start!")
    await page.navigateUntilReady('https://approve.me/s/spg/43615#/splash')
    await page.clickIfExists('label[for="agreeTC"] span[data-l10n-id="am_sf_splash_iHaveReadAndIAgree"]')

    await page.formFillOut(configs, data);

    await twoPage(page);

    // await aboutYou(page);

    // await aboutYou2(page);

    // await aboutYou3(page);

    // await aboutYou4(page);

    await incomePage1(page);

    await incomePage2(page);

    await incomePage3(page);

    await page.waitFor(3000);

    await page.screenshot({ path: 'example.png' });

    await browser.close()
})

twoConfig = [
    {
        label: 'Name:',
        selector: 'input[name="Customer_FirstName"]',
        type: 'type',
        value: "custom_firstname"
    },
    {
        label: '&nbsp',
        selector: 'input[name="Customer_LastName"]',
        type: 'type',
        value: "custom_lastname"
    },
    {
        label: 'Date of birth:',
        selector: 'input[name="Customer_DateOfBirth"]',
        type: 'type',
        value: "custom_dateofbirth"
    },
    {
        label: 'Social Security number or ITIN:',
        selector: 'input[name="Customer_SSN"]',
        type: 'type',
        value: "custom_ssn"
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

customer = {
    custom_firstname: "Thomas",
    custom_lastname: "Jang",
    custom_dateofbirth: "03/12/1990",
    custom_ssn: "432594248"
}

twoPage = async page => {
    // await page.waitUntilActionReady();
    console.log("two page;", page.url())
    await page.formFillOut(twoConfig, customer)
    // await page.waitUntilActionReady()
}

aboutYouConfig = [
    {
        label: 'Email:',
        selector: 'input[name="Customer_Email"]',
        type: 'type',
        value: "custom_email"
    },
    {
        label: 'Mobile Phone:',
        selector: 'input#PrimaryPhone_Number',
        type: 'type',
        value: "custom_primary_phone"
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

aboutYouValue = {
    custom_email: "thomasjang57@gmail.com",
    custom_primary_phone: "8707538767"
}

aboutYou = async page => {
    console.log('About You Page:', page.url());

    await page.clickIfExists('a[ng-click="def.action()"]');
    await page.waitUntilActionReady();

    await page.formFillOut(aboutYouConfig, aboutYouValue);
}

aboutYou2Config = [
    {
        label: 'Home address:',
        selector: 'input[name="Address_Line1"]',
        type: 'type',
        value: "Address_Line1"
    },
    {
        label: '',
        selector: 'input[name="Address_Line2"]',
        type: 'type',
        value: "Address_Line2"
    },
    {
        label: '',
        selector: 'input[name="Address_City"]',
        type: 'type',
        value: "Address_City"
    },
    {
        label: '',
        selector: 'select[name="Address_State"]',
        type: 'select-text',
        value: "Address_State"
    },
    // {
    //     label: '',
    //     selector: 'input[name="Address_Zip"]',
    //     type: 'type',
    //     value: "Address_Zip"
    // },
    {
        label: 'Time at current address:',
        selector: 'input[name="Residence_YearsAtAddress"]',
        type: 'type',
        value: "Residence_YearsAtAddress"
    },
    {
        label: '&nbsp',
        selector: 'input[name="Residence_MonthsAtAddress"]',
        type: 'type',
        value: "Residence_MonthsAtAddress"
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

aboutYou2Value = {
    Address_Line1: "5500 Camden Ln",
    Address_Line2: "",
    Address_City: "Jonebsoro",
    Address_State: "Arkansas",
    Address_Zip: "72404",
    Residence_YearsAtAddress: "2",
    Residence_MonthsAtAddress: ""
}

aboutYou2 = async page => {
    console.log("About You 2 page");

    await page.typeIfExists('input[name="Address_Zip"]', aboutYou2Value.Address_Zip, "");

    await page.formFillOut(aboutYou2Config, aboutYou2Value);
}

aboutYou3Config = [
    {
        label: "Rent",
        selector: 'button#Residence_HousingStatus_Rent',
        type: 'click'
    },
    {
        label: "Own",
        selector: 'button#Residence_HousingStatus_Own',
        type: 'click'
    }
]

aboutYou3 = async page => {
    console.log("About You 3th page");

    const residence = "Rent";
    await page.formFillOut(residence == "Rent" ? [aboutYou3Config[0]] : [aboutYou3Config[1]]);
}

aboutYou4Config = [
    {
        label: 'Type of photo ID:',
        selector: 'select[name="Identification_IdentificationType"]',
        type: 'select-text',
        value: 'identificationType'
    },
    {
        label: 'State issued:',
        selector: 'select[name="Identification_State"]',
        type: 'select-text',
        value: 'identificationState'
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

aboutYou4Value = {
    identificationType: "Drivers License",
    identificationNumber: "929048541",
    identificationState: "Arkansas"
}

aboutYou4 = async page => {
    console.log("About You 4th Page");
    await page.typeIfExists('input[name="Identification_Number"]', aboutYou4Value.identificationNumber, "ID number:");

    await page.formFillOut(aboutYou4Config, aboutYou4Value);
}

incomePage1Config = [
    {
        label: 'Primary source of income:',
        selector: 'select[name="IncomeSource_IncomeType"]',
        type: 'select-text',
        value: 'income_type'
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

incomePage1Value = {
    income_type: "Employed Full-Time"
}

incomePage1 = async page => {
    console.log('income infomation Page 1st');

    await page.formFillOut(incomePage1Config, incomePage1Value);
}

incomePage2Config = [
    {
        label: 'Employer name:',
        selector: 'input[name="IncomeSource_EmployerName"]',
        type: 'type',
        value: 'employer_name'
    },
    {
        label: 'Employer phone:',
        selector: 'input[name="IncomeSource_EmployerPhone"]',
        type: 'type',
        value: 'employer_phone'
    },
    // {
    //     label: 'Employer zip code:',
    //     selector: 'input[name="IncomeSource_Zip"]',
    //     type: 'type',
    //     value: 'employer_zip'
    // },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

incomePage2Value = {
    employer_name: 'HINO MOTORS MANUFACTURING',
    employer_phone: '8707023000',
    employer_zip: '72364'
}

incomePage2 = async page => {
    console.log('income information Page 2nd');

    await page.typeIfExists('input#IncomeSource_Zip', incomePage2Value.employer_zip, 'Zip');

    await page.formFillOut(incomePage2Config, incomePage2Value);
}

incomePage3Config = [
    {
        label: 'Length of time with current employer:',
        selector: 'input[name="IncomeSource_EmployedYears"]',
        type: 'type',
        value: 'employed_year'
    },
    {
        label: ' ',
        selector: 'input[name="IncomeSource_EmployedMonths"]',
        type: 'type',
        value: 'employed_month'
    },
    {
        label: 'Monthly income (before tax):',
        selector: 'input[name="IncomeSource_MonthlyIncome"]',
        type: 'type',
        value: 'employed_income'
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

incomePage3Value = {
    employed_year: '2',
    employed_month: '',
    employed_income: '60.95'
}


incomePage3 = async page => {
    console.log("Income information page 3th");

    await page.formFillOut(incomePage3Config, incomePage3Value);
}

// incomePage4Config = {
//     // console.log('Income Information Last')
// }