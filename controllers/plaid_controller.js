const router = require('express').Router({ mergeParams: true });
const plaid = require('plaid');
const fs = require('fs');
const PDF = require('../make_pdf');

const PLAID_CLIENT_ID = "5e739843062e7500146c00b6";
// const PLAID_SECRET = "39e090d3c78065179cf0af08d8db58";
const PLAID_SECRET = "29463d2373db7b7c7f2e131c002238";
const PLAID_PUBLIC_KEY = "982aded2b72afc5bfd9ff50388a927";
// var PLAID_ENV = "sandbox";
var PLAID_ENV = "development";


var client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
    { version: '2019-05-29', clientApp: 'Plaid Quickstart' }
);


router.post("/", async (req, res) => {
    const result = await getAccessToken(req.body);
    res.json(result);
});

router.post('/assets', async(req, res) => {
    const result = await getAssetPdf(req.body);
    res.json(result);
});

router.post('/transactions', async(req, res) => {
    const result = await getTransactions(req.body);
    res.json(result);
});

router.post('/access_token', async(req, res) => {
    const result = await client.exchangePublicToken(req.body.public_token);
    return res.json(result);
});

const getTransactions = async (data) => {
    try{
        let result = await client.exchangePublicToken(data.public_token);
        let access_token = result.access_token;
        const tran_res = await client.getTransactions(access_token, data.start_date, data.end_date, {
            count:250,
            offset: 0
        });
        const pdf_res = await PDF.getPDFLink(tran_res);
        return pdf_res;
    } catch(error) {
        console.error("Transactions", error);
        return {error}
    }
}

const getAccessToken = async (testdata) => {
    // console.log(testdata);
    try {
        result = await client.exchangePublicToken(testdata.public_token);
        // console.log(result);
        let access_token = result.access_token;
        const daysRequested = 60;

        const options = {
            client_report_id: testdata.contact_id,
            webhook: 'https://dealer.mypayvantage.com/check_plaid_token.php?action=assets',
            user: {
                client_user_id: testdata.dealer_id,
                first_name: testdata.first_name,
                last_name: testdata.last_name,
                ssn: testdata.ssn,
                phone_number: testdata.phone,
                email: testdata.email,
            },
        };

        result = await client.createAssetReport([access_token], daysRequested, options);
        return result;
    } catch (error) {
        console.error("assets", error);
        return { error };
    }
}

const getAssetPdf = async (data) => {
    try{
        console.log("From webhoook!!!", data);
        const asset_report_token = data.asset_report_token;
        let result = await client.getAssetReportPdf(asset_report_token);
        const filename = 'plaid/Plaid' + (new Date()).getTime() + ".pdf";
        fs.writeFileSync('./public/' + filename, result.buffer);
        result.buffer = filename;

        return result;
    } catch(error) {
        console.log("hook assets", error);
        return {error}
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;