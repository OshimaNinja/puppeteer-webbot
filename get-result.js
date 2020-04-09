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

    const value = setConfigValue(data);
    // console.log("aaaa")
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await page.setViewport({ width: 1600, height: 700 })
    console.log("start!")

    await page.navigateUntilReady('https://approve.me/s/spg/43615#/splash')
    await page.clickIfExists('label[for="agreeTC"] span[data-l10n-id="am_sf_splash_iHaveReadAndIAgree"]')

    await page.formFillOut(configs, {});

    await twoPage(page, value);

    await aboutYou(page, value);

    await aboutYou2(page, value);
    
    await aboutYou3(page, value);
    
    await aboutYou4(page, value);

    await page.waitUntilActionReady();

    await incomePage1(page, value);

    await incomePage2(page, value);

    await incomePage3(page, value);

    await incomePage4(page, value);

    await paymentPage1(page, value);

    await paymentPage2(page, value);

    await paymentPage3(page, value);

    await paymentPage4(page, value);

    await reviewPage1(page, value);

    await page.waitForSelector('.approval-amount', {timeout: 10000});

    const element = await page.$(".approval-amount");
    const text = await (await element.getProperty('textContent')).jsonValue();

    const filename = 'result/Result_' + (new Date()).getTime() + '.png';
    await page.screenshot({ path: './public/' + filename });

    console.log("Program Ended! Thanks!");

    await browser.close()
    console.log("Really end!");
    
    return {filename, text};
}

twoPage = async (page, value) => {
    console.log("two page;", page.url())

    await page.formFillOut(twoConfig, value)

    // await page.clickIfExists('button#MoveNext');
}

aboutYou = async (page, value) => {
    console.log('About You Page:', page.url());
    
    await page.formFillOut(aboutYouConfig, value);

    const emailcheck = await page.$('input[name="Customer_Email"]');
    if ( emailcheck ){
        console.log('again click')
        await page.clickIfExists('button#MoveNext');
    }
    
}

aboutYou2 = async (page, value) => {
    console.log("About You 2 page");
    await page.screenshot({path: 'about2-test.png'});
    
    await page.typeIfExists('input[name="Address_Zip"]', value.Address_Zip, "");

    await page.formFillOut(aboutYou2Config, value);
}

aboutYou3 = async (page, value) => {
    console.log("About You 3th page");
    
    const residence = value.you_residence;
    await page.formFillOut(residence == "Rent" ? [aboutYou3Config[0]] : [aboutYou3Config[1]]);
}

aboutYou4 = async (page, value) => {
    console.log("About You 4th Page:", page.url());
    await page.typeIfExists('input[name="Identification_Number"]', value.identificationNumber, "ID number:");

    await page.formFillOut(aboutYou4Config, value);
}

incomePage1 = async (page, value) => {
    console.log('income infomation Page 1st');

    await page.formFillOut(incomePage1Config, value);
}

incomePage2 = async (page, value) => {
    console.log('income information Page 2nd');

    await page.typeIfExists('input#IncomeSource_Zip', value.employer_zip, 'Zip');

    await page.formFillOut(incomePage2Config, value);
}

incomePage3 = async (page, value) => {
    console.log("Income information page 3th");

    await page.formFillOut(incomePage3Config, value);
}


incomePage4 = async (page, value) => {
    console.log("Income Page 4th");

    await page.formFillOut(incomePage4Config, value);
    const incomeNext = page.$('input[name="IncomeSource_PreviousPayDate"]')
    if (incomeNext) {
        console.log('Income page again click!');
        await page.clickIfExists('button#MoveNext');
    }
    await page.screenshot({path: 'income4-test.png'})
}

paymentPage1 = async (page, value) => {
    console.log("Payment Page start!");
    await page.screenshot({path: 'payment-test.png'})
    await page.formFillOut(paymentPage1Config, value);
}


paymentPage2 = async (page, value) => {
    console.log("Payment Page 2st!");

    const deposit = value.payment_deposit;

    await page.formFillOut([deposit == "Yes" ? paymentPage2Config[0] : paymentPage2Config[1]], value);
}

paymentPage3 = async (page, value) => {
    console.log("Payment Page 3th!");

    await page.formFillOut(paymentPage3Config, value);
}

paymentPage4 = async (page, value) => {
    console.log("Payment Page 4th!");

    await page.typeIfExists('input[name="PaymentCard_Zip"]', value.card_zip, "");
    await page.formFillOut(paymentPage4Config, value);
}

reviewPage1 = async (page, value) => {
    console.log("Review Page Start!");

    await page.clickIfExists('label[for="Meta_ReviewAccept"]', "check Click");
    await page.formFillOut(reviewPage1Config, value);
}

const getDateType = str => {
    str = str.split('-');
    return str[1] + '/' + str[2] + '/' + str[0];
}

const getPassDate = date => {
    const d1 = new Date(date);
    const d2 = new Date();
    console.log(d2.getMonth(), d1.getMonth())
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    console.log(months)
    if (months <= 0) return [0, 0];
    let year = parseInt(months / 12);
    months = months % 12;
    return [year, months]
}

const primaryIncome = {
    'Employer' :'Employed Full-Time',
    'Social Security': 'Social Security',
    'Self-employed': 'Self-Employed',
    'Retirement': 'Other',
    'Disability': 'Other'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const getPaid = {
    'Weekly': 'Weekly',
    'Bi-Weekly': 'Every Other Week',
    'Monthly': 'Monthly',
    'Semi-Monthl': 'Twice Per Month'
}

const getExpiration = str => {
    str = str.split('/');
    const monthdata = {
        '01': '01 - January',
        '02': '02 - February',
        '03': '03 - March',
        '04': '04 - April',
        '05': '05 - May',
        '06': '06 - June',
        '07': '07 - July',
        '08': '08 - August',
        '09': '09 - September',
        '10': '10 - October',
        '11': '11 - November',
        '12': '12 - December',
    }

    return [monthdata[str[0]], "20" + str[1]];
}

const setConfigValue = data => {
    const passDate = getPassDate(data.Bank_Ac_Open_Date);
    const expriation = getExpiration(data.Expiration);
    return {
        //two config page
        custom_firstname: data.custom_firstname,
        custom_lastname: data.custom_lastname,
        custom_dateofbirth: getDateType(data.Date_Of_Birth),
        custom_ssn: data.Social_Security_Number,
        ///aboutYouValue
        custom_email: data.custom_email,
        custom_primary_phone: data.custom_primary_phone,
        ///aboutYou2Value
        Address_Line1: data.Street_Adress,
        Address_Line2: "",
        Address_City: data.City,
        Address_State: "Arkansas",
        Address_Zip: data.Zip,
        Residence_YearsAtAddress: "5",
        Residence_MonthsAtAddress: "",

        ///about 3th page
        you_residence: data.staying,

        ////aboutYou4Value
        identificationType: "Drivers License",
        identificationNumber: data.Driving_Licence_Number,
        identificationState: "Arkansas",

        //incomePage1Value = {
        income_type: primaryIncome[data.Source_of_primary_Income],

        //incomePage2Value = {
        employer_name: data.Employer_Name,
        employer_phone: data.Employer_Phone_No,
        employer_zip: data.Employer_Zip,

        //incomePage3Value = {
        employed_year: getRandomInt(1, 4),
        employed_month: '',
        employed_income: getRandomInt(2800, 3501),
        // incomePage4Value = {
        frequency_type: getPaid[data.How_Often_Do_you_get_Paid],
        pre_pay_date: getDateType(data.Last_Payday),

        
        // paymentPage1Value = {
        routing_number: data.Routing_No,
        account_number: data.Bank_Account_No,
        bank_openyear: passDate[0],
        bank_openmonth: passDate[1],

        // payment page 2th

        payment_deposit: data.pay,

        //paymentPage3Value = {
        card_cardnumber: data.card_cardnumber,
        card_exmonth: expriation[0],
        card_exyear: expriation[1],
        card_firstname: data.custom_firstname,
        card_lastname: data.custom_lastname,
        
        // paymentPage4Value = {
        card_address: data.Street_Adress,
        card_line2: "",
        card_city: data.City,
        card_state: "Arkansas",
        card_zip: data.Zip,
    }
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

// console.log(getPassDate('2010-04-03'));

module.exports = {
    getResult
}