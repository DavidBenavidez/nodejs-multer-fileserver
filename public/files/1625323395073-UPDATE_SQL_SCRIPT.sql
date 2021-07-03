UPDATE [ONEPAM].[apm].[QUESTION]
SET
    [FEATURED_FLAG] = 'Y',
    [ANSWER] = N'<style> ::-webkit-scrollbar { width: 0; background: transparent; } .table-container { overflow: scroll; overflow-y: hidden; } ul { width: 50vw; }</style>
To be a valid proof of address, your delivery receipt must contain the details described below. Please note that we only accept delivery receipts from selected stores as indicated in the following lists.

<br/>**If your delivery receipt was from a physical store**<br/><br/>

<div class="table-container">
<div class="bordered-table"></div>

| Must be from any of the following | Must Contain |
|-----------|-----------|
| <ul><li>SM Appliance Center</li><li>Abenson</li><li>Anson’s</li><li>Globe Telecom</li><li>Smart Communications</li></ul> | <ul><li>The logo or name of the merchant</li><li>Your full name (as recipient or addressee)</li><li>Your complete address</li><li>Delivery status (Must be "Delivered" not "Completed")</li><li>Delivery date (Must include the month, day, and year of delivery. Must not be more than 6 months ago by the time you open an account.)</li></ul> |
</div>

<br/><b>If your delivery receipt was from an online store</b><br/><br/>
<div class="table-container">
<div class="bordered-table"></div>

| **Must be from any of the following** | Must Contain |
|-----------|-----------|
| <ul><li>Lazada</li><li>Shopee</li><li>Zalora</li></ul> | <ul><li>The logo or name of the merchant</li><li>Your full name (as recipient or addressee)</li><li>Your complete address</li><li>Delivery status (Must be "Delivered" not "Completed")</li><li>Delivery date (Must include the month, day, and year of delivery. Must not be more than 1 month ago by the time you open an account.)</li></ul> |
</div>

<br/>**Tip on getting delivery receipts from online stores:**<br/><br/>
Receipts from websites are usually more detailed than receipts from apps. Because of this, many customers download or take screenshots of their receipts by logging in to their store account on browsers like Chrome and Safari.'
WHERE
    [QUESTION_CODE] = 'D_RCEIPT_RJCTD'
GO

UPDATE [ONEPAM].[apm].[QUESTION]
SET
    [ANSWER] = N'Our account verification process usually takes 1 to 3 banking days.

If you are unable to get an account number 3 banking days after you open an account, you can send us a message in the ING app and we’ll be happy to help.'
WHERE
    [QUESTION_CODE] = 'VRFY_ACCT_TIME'
GO

UPDATE [ONEPAM].[apm].[QUESTION]
SET
    [QUESTION] = N'What documents do I need to provide to open an ING account?',
    [ANSWER] = N'<style> ::-webkit-scrollbar { width: 0; background: transparent; } .table-container { overflow: scroll; overflow-y: hidden; } th { font-weight: normal; } .table-container ul, .table-container p { width: 50vw; } .inner { min-width: 100%; } .inner__container { overflow: hidden; overflow-x: scroll; } </style>
To open an ING account, you''ll need to provide the following.

1. Any of these IDs:
  * Unified Multipurpose ID (UMID), valid Philippine passport (new passports must be signed on page 3), or Philippine driver’s license
1. A photo of your signature on a plain white piece of paper
1. One (1) proof of address

You can provide any of the following proofs of address. <br /><br />

<div class="table-container">
<div class="bordered-table"></div>

| <p>NBI clearance, Philippine driver’s license, UMID, or voter’s registration certificate</p> | <ul><li>An NBI clearance or driver’s license must not be expired on the date you’ll open an account.</li><li>A voter’s registration certificate must have a visible dry seal or stamp from COMELEC.</li></ul> |
|--|--|
| <p>Electric, water, cable, phone, or internet bill</p> | <ul><li>Must be issued not more than 3 months ago by the time you open an account</li><li>Must contain your full name, complete address, the biller or merchant’s name, and the billing or statement date</li></ul> |
| <p>Condominium dues bill</p> | <ul><li>The indicated billing date must not be more than 3 months ago by the time you open an account.</li><li>Must be under your name</li><li>Must contain the unit number and the building address</li></ul> |
| <p>Credit card statement</p> | <ul><li>The billing or statement date must not be more than 3 months ago by the time you open an account.</li><li>Electronic bills are accepted</li></ul> |
| <p>Recent BIR 2316</p> | <ul><li>Must be signed by you and your employer</li></ul> |
| <p>Bank statement of account, insurance premium billing statement or investment statement of account</p> | <ul><li>Must be under your name</li><li>A monthly statement must be issued not more than 6 months ago by the time you open an account.</li><li>A yearly statement must be issued not more than 12 months ago by the time you open an account.</li><li>Electronic bills are accepted</li></ul> |
| <p>Delivery receipt from SM Appliance Center, Abenson, Anson’s, Globe Telecom, or Smart Communications</p> | <div class="inner__container"><ul><li>Must contain<ul class="inner"><li>The logo or name of the merchant</li><li>Your full name (as recipient or addressee)</li><li>Your complete address</li><li>The delivery status (Must be "Delivered." not "Completed.")</li><li>The delivery date (Must include the month, day, and year of delivery. Must not be more than 6 months ago by the time you open an account.)</li></ul></li></ul></div> |
| <p>Delivery receipt from Lazada, Shopee, or Zalora</p> | <div class="inner__container"> <ul><li>Must contain<ul class="inner"><li>The logo or name of the merchant</li><li>Your full name (as recipient or addressee)</li><li>Your complete address</li><li>The delivery status (Must be "Delivered." not "Completed.")</li><li>The delivery date (Must include the month, day, and year of delivery. Must not be more than 1 month ago by the time you open an account.)</li></ul></li></ul></div> |
</div>'
WHERE
    [QUESTION_CODE] = 'VRFY_IDNTTY'
GO

UPDATE [ONEPAM].[apm].[QUESTION]
SET
    [FEATURED_FLAG] = 'Y'
WHERE
    [QUESTION_CODE] = 'UPLD_ADDTL_DOC'
GO

UPDATE [ONEPAM].[apm].[QUESTION]
SET
    [FEATURED_FLAG] = 'Y',
    [ANSWER] = N'Log in to the ING app and check if the address you entered is the same as the one on your proof of address. If it is not, please update your address.

If you get the same error after updating your address, you can send us a message in the ING app and we’ll be happy to help.'
WHERE
    [QUESTION_CODE] = 'ERR_WRONG_ADD'
GO