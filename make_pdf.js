//Required package
var pdf = require("pdf-creator-node");
var fs = require('fs');

getPDFLink = async (data) => {
    var html = fs.readFileSync('template.html', 'utf8');

    var options = {
        format: "A3",
        orientation: "landscape",
        border: "8mm",
        header: {
            height: "25mm",
            contents: '<div style="text-align: center;">Author: Payvantage</div>'
        },
        "footer": {
            "height": "10mm",
            "contents": {
                // first: '1',
                // 2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                // last: 'Last Page'
            }
        }
    }

    const filename = 'plaid/Plaid_Transactions' + (new Date()).getTime() + ".pdf";

    var document = {
        html: html,
        data: {
            accounts: data.accounts,
            transactions: data.transactions
        },
        path: './public/' + filename
    };

    const result = await pdf.create(document, options)
    console.log(result)
    return {path: filename};
}

module.exports = {
    getPDFLink
}