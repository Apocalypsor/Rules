# My Automatically Updated Rules

## uBlacklist

- [List](https://raw.githubusercontent.com/Apocalypsor/Rules/master/uBlacklist/uBlacklist.txt)

## Surge

### Case Tracker

- [Module](Surge/Module/CaseTrackerPaid.sgmodule)
- [Script](Surge/Script/case-tracker-paid.js)
- [Remote module URL](https://raw.githubusercontent.com/Apocalypsor/Rules/master/Surge/Module/CaseTrackerPaid.sgmodule)

After pushing these files to the `master` branch on GitHub, add the remote module URL in Surge's Modules section and enable it. The module automatically downloads the script and appends `api.immivision.net` to the MITM hostname list. Enable MITM, install and trust the Surge CA certificate, then fully quit and reopen Case Tracker.

To use the module locally before pushing, import the script into Surge's local script directory, change the module's `script-path` to `case-tracker-paid.js`, and import the module file.

The script modifies only responses to `POST /v1/getUserMetadata`: it sets `isPaid` to `true`, fills a missing `subscriberSince` with the current time, and sets `nextRenewalAt` to the end of 2099. Other fields are preserved. Invalid JSON and responses without a boolean `isPaid` field pass through unchanged.

Look for `[Case Tracker] Applied local paid-status simulation` in Surge's script logs. This simulates the purchase status seen by the client; it does not create real transactions, change server-side permissions, or modify Purchasely's restore-purchase results. It has not yet been tested in Surge or the app.
