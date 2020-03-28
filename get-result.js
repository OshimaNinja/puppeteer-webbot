const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-angular')());

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

const getResult = async (data) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()

    await page.setViewport({ width: 1600, height: 700 })
    console.log("start!")

    await page.navigateUntilReady('https://approve.me/s/spg/43615#/splash')
    await page.clickIfExists('label[for="agreeTC"] span[data-l10n-id="am_sf_splash_iHaveReadAndIAgree"]')

    await page.formFillOut(configs, {});

    await twoPage(page);

    await aboutYou(page);

    await aboutYou2(page);

    await aboutYou3(page);

    await aboutYou4(page);

    await incomePage1(page);

    await incomePage2(page);

    await incomePage3(page);

    await incomePage4(page);

    await paymentPage1(page);

    await paymentPage2(page);

    await paymentPage3(page);

    await paymentPage4(page);

    await reviewPage1(page);

    console.log("Program Ended! Thanks!");

    await page.waitFor(30000);

    await page.screenshot({ path: 'example.png' });

    await browser.close()
}


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

incomePage4Config = [
    {
        label: 'How often are you paid?',
        selector: 'select[name="IncomeSource_PayFrequencyType"]',
        type: 'select-text',
        value: 'frequency_type'
    },
    {
        label: 'Previous payday:',
        selector: 'input[name="IncomeSource_PreviousPayDate"]',
        type: 'type',
        value: 'pre_pay_date'
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

incomePage4Value = {
    frequency_type: 'Weekly',
    pre_pay_date: '02/26/2020',
}

incomePage4 = async page => {
    console.log("Income Page 4th");

    await page.formFillOut(incomePage4Config, incomePage4Value);
}

paymentPage1Config = [
    {
        label: 'Bank routing number:',
        selector: 'input[name="BankAccount_RoutingNumber"]',
        type: 'type',
        value: 'routing_number'
    },
    {
        label: 'Checking account number:',
        selector: 'input[name="BankAccount_AccountNumber"]',
        type: 'type',
        value: 'account_number'
    },
    {
        label: 'How long has this account been open?',
        selector: 'input[name="BankAccount_OpenYear"]',
        type: 'type',
        value: 'bank_openyear'
    },
    {
        label: '',
        selector: 'input[name="BankAccount_OpenMonth"]',
        type: 'type',
        value: 'bank_openmonth'
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

paymentPage1Value = {
    routing_number: "031101279",
    account_number: '156127545236',
    bank_openyear: '1',
    bank_openmonth: '6'
}

paymentPage1 = async page => {
    console.log("Payment Page start!");

    await page.formFillOut(paymentPage1Config, paymentPage1Value);
}

paymentPage2Config = [
    {
        label: 'Yes',
        selector: 'button#IncomeSource_IsDirectDeposit_Yes',
        type: 'click'
    },
    {
        label: 'No',
        selector: 'button#IncomeSource_IsDirectDeposit_No',
        type: 'click'
    }
]

paymentPage2Value = {
}

paymentPage2 = async page => {
    console.log("Payment Page 2st!");

    const deposit = "Yes";

    await page.formFillOut([deposit == "Yes" ? paymentPage2Config[0] : paymentPage2Config[1]], paymentPage2Value);
}

paymentPage3Config = [
    {
        label: 'Credit card or debit card number:',
        selector: 'input[name="PaymentCard_CardNumber"]',
        type: 'type',
        value: 'card_cardnumber'
    },
    {   
        label: 'Expiration date:',
        selector: 'select[name="PaymentCard_ExpirationMonth"]',
        type: 'select-text',
        value: 'card_exmonth'
    },
    {   
        label: '',
        selector: 'select[name="PaymentCard_ExpirationYear"]',
        type: 'select-text',
        value: 'card_exyear'
    },
    {
        label: 'Name on card:',
        selector: 'input[name="PaymentCard_FirstName"]',
        type: 'type',
        value: 'card_firstname'
    },
    {
        label: '',
        selector: 'input[name="PaymentCard_LastName"]',
        type: 'type',
        value: 'card_lastname'
    },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

paymentPage3Value = {
    card_cardnumber: "5555555555554444",
    card_exmonth: '05 - May',
    card_exyear: '2020',
    card_firstname: 'Thomas',
    card_lastname: 'Jang'
}

paymentPage3 = async page => {
    console.log("Payment Page 3th!");

    await page.formFillOut(paymentPage3Config, paymentPage3Value);
}

paymentPage4Config = [
    {
        label: 'Street address',
        selector: 'input[name="PaymentCard_Address"]',
        type: 'type',
        value: 'card_address'
    },
    {
        label: 'apt/suite/other',
        selector: 'input[name="PaymentCard_Line2"]',
        type: 'type',
        value: 'card_line2'
    },
    {
        label: 'City',
        selector: 'input[name="PaymentCard_City"]',
        type: 'type',
        value: 'card_city'
    },
    {
        label: 'State',
        selector: 'select[name="PaymentCard_State"]',
        type: 'select-text',
        value: 'card_state'
    },
    // {
    //     label: 'Zip',
    //     selector: 'input[name="PaymentCard_Zip"]',
    //     type: 'type',
    //     value: 'card_zip'
    // },
    {
        label: 'Next',
        selector: 'button#MoveNext',
        type: 'click'
    }
]

paymentPage4Value = {
    card_address: "5500 Camden Ln",
    card_line2: "",
    card_city: "Jonebsoro",
    card_state: "Arkansas",
    card_zip: "72404"
}

paymentPage4 = async page => {
    console.log("Payment Page 4th!");

    await page.typeIfExists('input[name="PaymentCard_Zip"]', paymentPage4Value.card_zip, "");
    await page.formFillOut(paymentPage4Config, paymentPage4Value);
}

reviewPage1Config = [
    // {
    //     label: "I have Read",
    //     selector: 'input[name="Meta_ReviewAccept"]',
    //     type: 'check',
    // },
    {
        label: 'Progressive',
        selector: 'input#Meta_ReviewOptOut',
        type: 'check'
    },
    {
        label: "Submit",
        selector: 'button#submit-app',
        type: 'click'
    }
]

reviewPage1Value = {

}

reviewPage1 = async page => {
    console.log("Review Page Start!");
    // await page.toggleCheck('input#Meta_ReviewAccept', 'Check');
    await page.clickIfExists('label[for="Meta_ReviewAccept"]', "check Click");
    console.log("check!!!!!");
    // await page.waitUntilActionReady();
    await page.formFillOut(reviewPage1Config, reviewPage1Value);
}

module.exports = {
    getResult
}