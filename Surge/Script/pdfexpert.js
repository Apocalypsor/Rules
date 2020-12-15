// URL = ^https:\/\/license\.pdfexpert\.com\/api\/2\.0\/pdfexpert6\/subscription\/refresh

let obj = JSON.parse($response.body);
obj= {
  "productId": "com.readdle.PDFExpert5.subscription.year50",
  "receiptStatus": "ok",
  "subscriptionExpirationDate": "16:52 15/11/2999",
  "isPDFExpert6User": false,
  "inAppStates": [
    {
      "receiptStatus": "ok",
      "productId": "com.readdle.PDFExpert5.subscription.year50",
      "isInGracePeriod": false,
      "subscriptionAutoRenewStatus": "autoRenewOn",
      "originalTransactionId": "530000671440206",
      "isEligibleForIntroPeriod": false,
      "subscriptionExpirationDate": "16:52 15/11/2999",
      "type": "subscription",
      "subscriptionState": "trial",
      "productName": "subscription"
    }
  ],
  "isEligibleForIntroPeriod": false,
  "originalTransactionId": "530000671440206",
  "bundleId": "com.readdle.PDFExpert5",
  "type": "subscription",
  "inAppPurchased": [
    "com.readdle.PDFExpert5.subscription.year50"
  ],
  "receiptId": 1604854280000,
  "chargingPlatform": "iOS AppStore",
  "subscriptionState": "trial",
  "subscriptionAutoRenewStatus": "autoRenewOn",
  "isInGracePeriod": false
};
$done({body: JSON.stringify(obj)});