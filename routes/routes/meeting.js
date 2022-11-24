const express =require('express')
const router=express.Router()
const Company = require('../models/Company')
const Partner = require('../models/Partner')
const Meeting =require('../models/Meeting')
const axios = require('axios')

// Get All Meetings 
router.get('/',async(req,res)=>{
    try {
        const promise=await Meeting.find({})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get meeting by id
router.get('/:id',async(req,res)=>{
    try {
        const promise=await Meeting.findById(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get meeting by partner id
router.get('/partner/:id',async(req,res)=>{
    try {
        const promise=await Meeting.find({partner_id:req.params.id}).sort({created_at:1})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Get meeting by company id
router.get('/company/:id',async(req,res)=>{
    try {
        const promise=await Meeting.find({company_id:req.params.id}).sort({created_at:1})
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Post Meeting
router.post('/',async(req,res)=>{
    try {
        const meet=new Meeting(req.body)
        const promise=await meet.save()
        const partner = await Partner.findById(promise.partner_id)
        const company = await Company.findById(promise.company_id)
    
        if(partner && company){

            const accountId = 'eyJBZG1pbklkIjoiMzQ1MTMiLCJFbWFpbCI6InRhbGhhZWxtYWxpQHBpdGdyb3d0aC5jb20iLCJDdXN0b21lcklkIjoiQTgzOEI4OUMxQjVCNEJFRUJCQjU2NDYyOTMxNEE3MTkiLCJDb21wYW55SWQiOjUyNDczLCJJc0V4cHJlc3MiOnRydWV9'

            const tokenRequest =
            await axios('https://diyaccountapi.relateddigital.com/tokens'  , {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             data: {
              "email":"talhaelmali@pitgrowth.com",
              "password":"Theagaed987"
              }
           }); 
          
          
           const token = tokenRequest.data.tokenValue
          
          
           const sendMail =
           await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
           },
           data: {
            "senderProfileId": 60857,
            "receiverEmailAddress": `${partner.email}`,
            "subject": "Meet Talebi",
            "content": `<span
            style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">deneme</span>
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                                    cellspacing="0" width="94%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&nbsp;</span> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center"> <img align="center" border="0"
                                                                                    src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903644119-Screen+Shot+2022-10-27+at+22.32.03.png"
                                                                                    alt="" title=""
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                    width="630"> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center"> <img align="center" border="0"
                                                                                    src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666905413114-479197.png"
                                                                                    alt="" title=""
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;"
                                                                                    width="300"> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <div
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-family: 'Open Sans', sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">Hello
                                                                            ${partner.company_name}</span></p>
                                                                    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        <span
                                                                            style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">You
                                                                            get new request from ${company.company_name}</span></p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        &nbsp;</p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        <span
                                                                            style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">To
                                                                            see details of ${company.company_name} and to get an action,
                                                                            please go to dashboard</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                <div align="center">
                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.pitgrowth.com/login.html" style="height:37px; v-text-anchor:middle; width:109px;" arcsize="11%"  stroke="f" fillcolor="#236fa1"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
                                                                    <a href="https://www.pitgrowth.com/login.html"
                                                                        target="_blank" class="v-button"
                                                                        style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #236fa1; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                                        <span
                                                                            style="display:block;padding:10px 20px;line-height:120%;"><span
                                                                                style="font-size: 14px; line-height: 16.8px;">Dashboard</span></span>
                                                                    </a>
                                                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                                    cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&nbsp;</span> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <div align="center">
                                                                    <div style="display: table; max-width:171px;">
                                                                        <!--[if (mso)|(IE)]><table width="171" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:171px;"><tr><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://www.instagram.com/pitgrowth/"
                                                                                            title="Instagram" target="_blank">
                                                                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png"
                                                                                                alt="Instagram"
                                                                                                title="Instagram" width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://twitter.com/pitgrowth"
                                                                                            title="Twitter" target="_blank">
                                                                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle/twitter.png"
                                                                                                alt="Twitter" title="Twitter"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://www.linkedin.com/company/pitgrowth"
                                                                                            title="LinkedIn" target="_blank">
                                                                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png"
                                                                                                alt="LinkedIn" title="LinkedIn"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="info@pitgrowth.com"
                                                                                            title="Email" target="_blank"> <img
                                                                                                src="https://cdn.tools.unlayer.com/social/icons/circle/email.png"
                                                                                                alt="Email" title="Email"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                                    cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&nbsp;</span> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div
                                            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center"> <img align="center" border="0"
                                                                                    src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903575532-Screen+Shot+2022-10-27+at+23.45.12.png"
                                                                                    alt="" title=""
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                    width="630"> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        
                    </td>
                </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->`,
            "startDate": "",
            "finishDate": ""
          }
          }); 

          const sendMail2 =
          await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: {
           "senderProfileId": 60857,
           "receiverEmailAddress": `${partner.email}`,
           "subject": "Meet Talebi",
           "content": `<span
           style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">deneme</span>
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table id="u_body"
           style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%"
           cellpadding="0" cellspacing="0">
           <tbody>
               <tr style="vertical-align: top">
                   <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                       <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                       <div class="u-row-container" style="padding: 0px;background-color: transparent">
                           <div class="u-row"
                               style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                               <div
                                   style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                   <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                   <div class="u-col u-col-100"
                                       style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                       <div style="height: 100%;width: 100% !important;">
                                           <!--[if (!mso)&(!IE)]><!-->
                                           <div
                                               style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                               <!--<![endif]-->
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <table height="0px" align="center" border="0" cellpadding="0"
                                                                   cellspacing="0" width="94%"
                                                                   style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                   <tbody>
                                                                       <tr style="vertical-align: top">
                                                                           <td
                                                                               style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                               <span>&nbsp;</span> </td>
                                                                       </tr>
                                                                   </tbody>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <!--[if (!mso)&(!IE)]><!-->
                                           </div>
                                           <!--<![endif]-->
                                       </div>
                                   </div>
                                   <!--[if (mso)|(IE)]></td><![endif]-->
                                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                               </div>
                           </div>
                       </div>
                       <div class="u-row-container" style="padding: 0px;background-color: transparent">
                           <div class="u-row"
                               style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                               <div
                                   style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                   <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                   <div class="u-col u-col-100"
                                       style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                       <div style="height: 100%;width: 100% !important;">
                                           <!--[if (!mso)&(!IE)]><!-->
                                           <div
                                               style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                               <!--<![endif]-->
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                   <tbody>
                                                                       <tr>
                                                                           <td style="padding-right: 0px;padding-left: 0px;"
                                                                               align="center"> <img align="center" border="0"
                                                                                   src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903644119-Screen+Shot+2022-10-27+at+22.32.03.png"
                                                                                   alt="" title=""
                                                                                   style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                   width="630"> </td>
                                                                       </tr>
                                                                   </tbody>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <!--[if (!mso)&(!IE)]><!-->
                                           </div>
                                           <!--<![endif]-->
                                       </div>
                                   </div>
                                   <!--[if (mso)|(IE)]></td><![endif]-->
                                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                               </div>
                           </div>
                       </div>
                       <div class="u-row-container" style="padding: 0px;background-color: transparent">
                           <div class="u-row"
                               style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                               <div
                                   style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                   <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                   <div class="u-col u-col-100"
                                       style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                       <div style="height: 100%;width: 100% !important;">
                                           <!--[if (!mso)&(!IE)]><!-->
                                           <div
                                               style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                               <!--<![endif]-->
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                   <tbody>
                                                                       <tr>
                                                                           <td style="padding-right: 0px;padding-left: 0px;"
                                                                               align="center"> <img align="center" border="0"
                                                                                   src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903944390-621740.png"
                                                                                   alt="" title=""
                                                                                   style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;"
                                                                                   width="300"> </td>
                                                                       </tr>
                                                                   </tbody>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <!--[if (!mso)&(!IE)]><!-->
                                           </div>
                                           <!--<![endif]-->
                                       </div>
                                   </div>
                                   <!--[if (mso)|(IE)]></td><![endif]-->
                                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                               </div>
                           </div>
                       </div>
                       <div class="u-row-container" style="padding: 0px;background-color: transparent">
                           <div class="u-row"
                               style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                               <div
                                   style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                   <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                   <div class="u-col u-col-100"
                                       style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                       <div style="height: 100%;width: 100% !important;">
                                           <!--[if (!mso)&(!IE)]><!-->
                                           <div
                                               style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                               <!--<![endif]-->
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <div
                                                                   style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                   <p style="font-size: 14px; line-height: 140%;"><span
                                                                           style="font-family: 'Open Sans', sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">Hello
                                                                           ${company.company_name}</span></p>
                                                                   <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
                                                                   <p
                                                                       style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                       <span
                                                                           style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;"><span
                                                                               style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; line-height: 19.6px;">Your
                                                                               request is sent to
                                                                               ${partner.company_name}</span></span></p>
                                                                   <p
                                                                       style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                       &nbsp;</p>
                                                                   <p
                                                                       style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                       <span
                                                                           style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">When
                                                                           the request is approved, we will inform you as soon
                                                                           as possible</span></p>
                                                               </div>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <!--[if (!mso)&(!IE)]><!-->
                                           </div>
                                           <!--<![endif]-->
                                       </div>
                                   </div>
                                   <!--[if (mso)|(IE)]></td><![endif]-->
                                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                               </div>
                           </div>
                       </div>
                       <div class="u-row-container" style="padding: 0px;background-color: transparent">
                           <div class="u-row"
                               style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                               <div
                                   style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                   <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                   <div class="u-col u-col-100"
                                       style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                       <div style="height: 100%;width: 100% !important;">
                                           <!--[if (!mso)&(!IE)]><!-->
                                           <div
                                               style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                               <!--<![endif]-->
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <table height="0px" align="center" border="0" cellpadding="0"
                                                                   cellspacing="0" width="100%"
                                                                   style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                   <tbody>
                                                                       <tr style="vertical-align: top">
                                                                           <td
                                                                               style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                               <span>&nbsp;</span> </td>
                                                                       </tr>
                                                                   </tbody>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <div align="center">
                                                                   <div style="display: table; max-width:171px;">
                                                                       <!--[if (mso)|(IE)]><table width="171" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:171px;"><tr><![endif]-->
                                                                       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                       <table align="left" border="0" cellspacing="0"
                                                                           cellpadding="0" width="32" height="32"
                                                                           style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                           <tbody>
                                                                               <tr style="vertical-align: top">
                                                                                   <td align="left" valign="middle"
                                                                                       style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                       <a href="https://www.instagram.com/pitgrowth/"
                                                                                           title="Instagram" target="_blank">
                                                                                           <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png"
                                                                                               alt="Instagram"
                                                                                               title="Instagram" width="32"
                                                                                               style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                       </a> </td>
                                                                               </tr>
                                                                           </tbody>
                                                                       </table>
                                                                       <!--[if (mso)|(IE)]></td><![endif]-->
                                                                       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                       <table align="left" border="0" cellspacing="0"
                                                                           cellpadding="0" width="32" height="32"
                                                                           style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                           <tbody>
                                                                               <tr style="vertical-align: top">
                                                                                   <td align="left" valign="middle"
                                                                                       style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                       <a href="https://twitter.com/pitgrowth"
                                                                                           title="Twitter" target="_blank">
                                                                                           <img src="https://cdn.tools.unlayer.com/social/icons/circle/twitter.png"
                                                                                               alt="Twitter" title="Twitter"
                                                                                               width="32"
                                                                                               style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                       </a> </td>
                                                                               </tr>
                                                                           </tbody>
                                                                       </table>
                                                                       <!--[if (mso)|(IE)]></td><![endif]-->
                                                                       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                       <table align="left" border="0" cellspacing="0"
                                                                           cellpadding="0" width="32" height="32"
                                                                           style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                           <tbody>
                                                                               <tr style="vertical-align: top">
                                                                                   <td align="left" valign="middle"
                                                                                       style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                       <a href="https://www.linkedin.com/company/pitgrowth"
                                                                                           title="LinkedIn" target="_blank">
                                                                                           <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png"
                                                                                               alt="LinkedIn" title="LinkedIn"
                                                                                               width="32"
                                                                                               style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                       </a> </td>
                                                                               </tr>
                                                                           </tbody>
                                                                       </table>
                                                                       <!--[if (mso)|(IE)]></td><![endif]-->
                                                                       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                       <table align="left" border="0" cellspacing="0"
                                                                           cellpadding="0" width="32" height="32"
                                                                           style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                           <tbody>
                                                                               <tr style="vertical-align: top">
                                                                                   <td align="left" valign="middle"
                                                                                       style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                       <a href="info@pitgrowth.com"
                                                                                           title="Email" target="_blank"> <img
                                                                                               src="https://cdn.tools.unlayer.com/social/icons/circle/email.png"
                                                                                               alt="Email" title="Email"
                                                                                               width="32"
                                                                                               style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                       </a> </td>
                                                                               </tr>
                                                                           </tbody>
                                                                       </table>
                                                                       <!--[if (mso)|(IE)]></td><![endif]-->
                                                                       <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                   </div>
                                                               </div>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <table height="0px" align="center" border="0" cellpadding="0"
                                                                   cellspacing="0" width="100%"
                                                                   style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                   <tbody>
                                                                       <tr style="vertical-align: top">
                                                                           <td
                                                                               style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                               <span>&nbsp;</span> </td>
                                                                       </tr>
                                                                   </tbody>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <!--[if (!mso)&(!IE)]><!-->
                                           </div>
                                           <!--<![endif]-->
                                       </div>
                                   </div>
                                   <!--[if (mso)|(IE)]></td><![endif]-->
                                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                               </div>
                           </div>
                       </div>
                       <div class="u-row-container" style="padding: 0px;background-color: transparent">
                           <div class="u-row"
                               style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                               <div
                                   style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                   <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
                                   <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                   <div class="u-col u-col-100"
                                       style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                       <div
                                           style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                           <!--[if (!mso)&(!IE)]><!-->
                                           <div
                                               style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                               <!--<![endif]-->
                                               <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                   cellpadding="0" cellspacing="0" width="100%" border="0">
                                                   <tbody>
                                                       <tr>
                                                           <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                               align="left">
                                                               <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                   <tbody>
                                                                       <tr>
                                                                           <td style="padding-right: 0px;padding-left: 0px;"
                                                                               align="center"> <img align="center" border="0"
                                                                                   src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903575532-Screen+Shot+2022-10-27+at+23.45.12.png"
                                                                                   alt="" title=""
                                                                                   style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                   width="630"> </td>
                                                                       </tr>
                                                                   </tbody>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                               <!--[if (!mso)&(!IE)]><!-->
                                           </div>
                                           <!--<![endif]-->
                                       </div>
                                   </div>
                                   <!--[if (mso)|(IE)]></td><![endif]-->
                                   <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                               </div>
                           </div>
                       </div>
                       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                      
                   </td>
               </tr>
           </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->`,
           "startDate": "",
           "finishDate": ""
         }
         }); 

          



        }

        res.json(promise)
    } catch (error) {
        res.json("asd")
    }
})

//Update Meeting
router.put('/:id',async(req,res)=>{
    try {
        const exMeet = await Meeting.findById(req.params.id)
        const promise=await Meeting.findByIdAndUpdate(req.params.id,req.body,{new:true})
        const partner = await Partner.findById(promise.partner_id)
        const company = await Company.findById(promise.company_id)


        if(partner && company){

            const accountId = 'eyJBZG1pbklkIjoiMzQ1MTMiLCJFbWFpbCI6InRhbGhhZWxtYWxpQHBpdGdyb3d0aC5jb20iLCJDdXN0b21lcklkIjoiQTgzOEI4OUMxQjVCNEJFRUJCQjU2NDYyOTMxNEE3MTkiLCJDb21wYW55SWQiOjUyNDczLCJJc0V4cHJlc3MiOnRydWV9'

            const tokenRequest =
            await axios('https://diyaccountapi.relateddigital.com/tokens'  , {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             data: {
              "email":"talhaelmali@pitgrowth.com",
              "password":"Theagaed987"
              }
           }); 
          
          
           const token = tokenRequest.data.tokenValue


            
           if(!(promise.date===exMeet.date)){
            const sendMail =
            await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            data: {
             "senderProfileId": 60857,
             "receiverEmailAddress": `${company.email}`,
             "subject": "Meet Talebi",
             "content": `<h1>${partner.company_name}, ${exMeet.date} ${exMeet.time} tarihindeki görüşme talebinizi ${promise.date} ${promise.time} tarihiyle değiştirdi.<h1/>`,
             "startDate": "",
             "finishDate": ""
           }
           })} 



           if(promise.status==="Approved"){
            const sendMail =
            await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            data: {
             "senderProfileId": 60857,
             "receiverEmailAddress": `${company.email}`,
             "subject": "Meet Talebi",
             "content": `<span
             style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">deneme</span>
         <!--[if IE]><div class="ie-container"><![endif]-->
         <!--[if mso]><div class="mso-container"><![endif]-->
         <table id="u_body"
             style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%"
             cellpadding="0" cellspacing="0">
             <tbody>
                 <tr style="vertical-align: top">
                     <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                         <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                         <div class="u-row-container" style="padding: 0px;background-color: transparent">
                             <div class="u-row"
                                 style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                 <div
                                     style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                     <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                     <div class="u-col u-col-100"
                                         style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                         <div style="height: 100%;width: 100% !important;">
                                             <!--[if (!mso)&(!IE)]><!-->
                                             <div
                                                 style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                 <!--<![endif]-->
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <table height="0px" align="center" border="0" cellpadding="0"
                                                                     cellspacing="0" width="94%"
                                                                     style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                     <tbody>
                                                                         <tr style="vertical-align: top">
                                                                             <td
                                                                                 style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                 <span>&nbsp;</span> </td>
                                                                         </tr>
                                                                     </tbody>
                                                                 </table>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <!--[if (!mso)&(!IE)]><!-->
                                             </div>
                                             <!--<![endif]-->
                                         </div>
                                     </div>
                                     <!--[if (mso)|(IE)]></td><![endif]-->
                                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                 </div>
                             </div>
                         </div>
                         <div class="u-row-container" style="padding: 0px;background-color: transparent">
                             <div class="u-row"
                                 style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                 <div
                                     style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                     <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                     <div class="u-col u-col-100"
                                         style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                         <div style="height: 100%;width: 100% !important;">
                                             <!--[if (!mso)&(!IE)]><!-->
                                             <div
                                                 style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                 <!--<![endif]-->
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                     <tbody>
                                                                         <tr>
                                                                             <td style="padding-right: 0px;padding-left: 0px;"
                                                                                 align="center"> <img align="center" border="0"
                                                                                     src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903644119-Screen+Shot+2022-10-27+at+22.32.03.png"
                                                                                     alt="" title=""
                                                                                     style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                     width="630"> </td>
                                                                         </tr>
                                                                     </tbody>
                                                                 </table>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <!--[if (!mso)&(!IE)]><!-->
                                             </div>
                                             <!--<![endif]-->
                                         </div>
                                     </div>
                                     <!--[if (mso)|(IE)]></td><![endif]-->
                                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                 </div>
                             </div>
                         </div>
                         <div class="u-row-container" style="padding: 0px;background-color: transparent">
                             <div class="u-row"
                                 style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                 <div
                                     style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                     <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                     <div class="u-col u-col-100"
                                         style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                         <div style="height: 100%;width: 100% !important;">
                                             <!--[if (!mso)&(!IE)]><!-->
                                             <div
                                                 style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                 <!--<![endif]-->
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                     <tbody>
                                                                         <tr>
                                                                             <td style="padding-right: 0px;padding-left: 0px;"
                                                                                 align="center"> <img align="center" border="0"
                                                                                     src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903944390-621740.png"
                                                                                     alt="" title=""
                                                                                     style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;"
                                                                                     width="300"> </td>
                                                                         </tr>
                                                                     </tbody>
                                                                 </table>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <!--[if (!mso)&(!IE)]><!-->
                                             </div>
                                             <!--<![endif]-->
                                         </div>
                                     </div>
                                     <!--[if (mso)|(IE)]></td><![endif]-->
                                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                 </div>
                             </div>
                         </div>
                         <div class="u-row-container" style="padding: 0px;background-color: transparent">
                             <div class="u-row"
                                 style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                 <div
                                     style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                     <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                     <div class="u-col u-col-100"
                                         style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                         <div style="height: 100%;width: 100% !important;">
                                             <!--[if (!mso)&(!IE)]><!-->
                                             <div
                                                 style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                 <!--<![endif]-->
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <div
                                                                     style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                     <p style="font-size: 14px; line-height: 140%;"><span
                                                                             style="font-family: 'Open Sans', sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">Hello
                                                                             ${company.company_name}</span></p>
                                                                     <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
                                                                     <p
                                                                         style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                         <span
                                                                             style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;"><span
                                                                                 style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; line-height: 19.6px;">Your
                                                                                 request is approved</span></span></p>
                                                                     <p
                                                                         style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                         &nbsp;</p>
                                                                     <p
                                                                         style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                         <span
                                                                             style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;"><span
                                                                                 style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; line-height: 19.6px;">The
                                                                                 calendar is booked for ${promise.date} ${promise.time}</span></span>
                                                                     </p>
                                                                     <p
                                                                         style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                         &nbsp;</p>
                                                                 </div>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <!--[if (!mso)&(!IE)]><!-->
                                             </div>
                                             <!--<![endif]-->
                                         </div>
                                     </div>
                                     <!--[if (mso)|(IE)]></td><![endif]-->
                                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                 </div>
                             </div>
                         </div>
                         <div class="u-row-container" style="padding: 0px;background-color: transparent">
                             <div class="u-row"
                                 style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                 <div
                                     style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                     <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                     <div class="u-col u-col-100"
                                         style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                         <div style="height: 100%;width: 100% !important;">
                                             <!--[if (!mso)&(!IE)]><!-->
                                             <div
                                                 style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                 <!--<![endif]-->
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <table height="0px" align="center" border="0" cellpadding="0"
                                                                     cellspacing="0" width="100%"
                                                                     style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                     <tbody>
                                                                         <tr style="vertical-align: top">
                                                                             <td
                                                                                 style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                 <span>&nbsp;</span> </td>
                                                                         </tr>
                                                                     </tbody>
                                                                 </table>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <div align="center">
                                                                     <div style="display: table; max-width:171px;">
                                                                         <!--[if (mso)|(IE)]><table width="171" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:171px;"><tr><![endif]-->
                                                                         <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                         <table align="left" border="0" cellspacing="0"
                                                                             cellpadding="0" width="32" height="32"
                                                                             style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                             <tbody>
                                                                                 <tr style="vertical-align: top">
                                                                                     <td align="left" valign="middle"
                                                                                         style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                         <a href="https://www.instagram.com/pitgrowth/"
                                                                                             title="Instagram" target="_blank">
                                                                                             <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png"
                                                                                                 alt="Instagram"
                                                                                                 title="Instagram" width="32"
                                                                                                 style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                         </a> </td>
                                                                                 </tr>
                                                                             </tbody>
                                                                         </table>
                                                                         <!--[if (mso)|(IE)]></td><![endif]-->
                                                                         <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                         <table align="left" border="0" cellspacing="0"
                                                                             cellpadding="0" width="32" height="32"
                                                                             style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                             <tbody>
                                                                                 <tr style="vertical-align: top">
                                                                                     <td align="left" valign="middle"
                                                                                         style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                         <a href="https://twitter.com/pitgrowth"
                                                                                             title="Twitter" target="_blank">
                                                                                             <img src="https://cdn.tools.unlayer.com/social/icons/circle/twitter.png"
                                                                                                 alt="Twitter" title="Twitter"
                                                                                                 width="32"
                                                                                                 style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                         </a> </td>
                                                                                 </tr>
                                                                             </tbody>
                                                                         </table>
                                                                         <!--[if (mso)|(IE)]></td><![endif]-->
                                                                         <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                         <table align="left" border="0" cellspacing="0"
                                                                             cellpadding="0" width="32" height="32"
                                                                             style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                             <tbody>
                                                                                 <tr style="vertical-align: top">
                                                                                     <td align="left" valign="middle"
                                                                                         style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                         <a href="https://www.linkedin.com/company/pitgrowth"
                                                                                             title="LinkedIn" target="_blank">
                                                                                             <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png"
                                                                                                 alt="LinkedIn" title="LinkedIn"
                                                                                                 width="32"
                                                                                                 style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                         </a> </td>
                                                                                 </tr>
                                                                             </tbody>
                                                                         </table>
                                                                         <!--[if (mso)|(IE)]></td><![endif]-->
                                                                         <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                         <table align="left" border="0" cellspacing="0"
                                                                             cellpadding="0" width="32" height="32"
                                                                             style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                             <tbody>
                                                                                 <tr style="vertical-align: top">
                                                                                     <td align="left" valign="middle"
                                                                                         style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                         <a href="info@pitgrowth.com"
                                                                                             title="Email" target="_blank"> <img
                                                                                                 src="https://cdn.tools.unlayer.com/social/icons/circle/email.png"
                                                                                                 alt="Email" title="Email"
                                                                                                 width="32"
                                                                                                 style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                         </a> </td>
                                                                                 </tr>
                                                                             </tbody>
                                                                         </table>
                                                                         <!--[if (mso)|(IE)]></td><![endif]-->
                                                                         <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                     </div>
                                                                 </div>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <table height="0px" align="center" border="0" cellpadding="0"
                                                                     cellspacing="0" width="100%"
                                                                     style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                     <tbody>
                                                                         <tr style="vertical-align: top">
                                                                             <td
                                                                                 style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                 <span>&nbsp;</span> </td>
                                                                         </tr>
                                                                     </tbody>
                                                                 </table>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <!--[if (!mso)&(!IE)]><!-->
                                             </div>
                                             <!--<![endif]-->
                                         </div>
                                     </div>
                                     <!--[if (mso)|(IE)]></td><![endif]-->
                                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                 </div>
                             </div>
                         </div>
                         <div class="u-row-container" style="padding: 0px;background-color: transparent">
                             <div class="u-row"
                                 style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                 <div
                                     style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
                                     <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                     <div class="u-col u-col-100"
                                         style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                         <div
                                             style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                             <!--[if (!mso)&(!IE)]><!-->
                                             <div
                                                 style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                 <!--<![endif]-->
                                                 <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                     cellpadding="0" cellspacing="0" width="100%" border="0">
                                                     <tbody>
                                                         <tr>
                                                             <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                 align="left">
                                                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                     <tbody>
                                                                         <tr>
                                                                             <td style="padding-right: 0px;padding-left: 0px;"
                                                                                 align="center"> <img align="center" border="0"
                                                                                     src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903575532-Screen+Shot+2022-10-27+at+23.45.12.png"
                                                                                     alt="" title=""
                                                                                     style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                     width="630"> </td>
                                                                         </tr>
                                                                     </tbody>
                                                                 </table>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                                 <!--[if (!mso)&(!IE)]><!-->
                                             </div>
                                             <!--<![endif]-->
                                         </div>
                                     </div>
                                     <!--[if (mso)|(IE)]></td><![endif]-->
                                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                 </div>
                             </div>
                         </div>
                         <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                         
                     </td>
                 </tr>
             </tbody>
         </table>
         <!--[if mso]></div><![endif]-->
         <!--[if IE]></div><![endif]-->`,
             "startDate": "",
             "finishDate": ""
           }
           })} 
          
          if(promise.status==="Denied"){
           const sendMail =
           await axios(`https://diyaccountapi.relateddigital.com/accounts/${accountId}/transactional-email` , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + token
           },
           data: {
            "senderProfileId": 60857,
            "receiverEmailAddress": `${company.email}`,
            "subject": "Meet Talebiniz Reddedildi",
            "content": `<span
            style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">deneme</span>
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                                    cellspacing="0" width="94%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&nbsp;</span> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center"> <img align="center" border="0"
                                                                                    src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903644119-Screen+Shot+2022-10-27+at+22.32.03.png"
                                                                                    alt="" title=""
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                    width="630"> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center"> <img align="center" border="0"
                                                                                    src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903944390-621740.png"
                                                                                    alt="" title=""
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;"
                                                                                    width="300"> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <div
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-family: 'Open Sans', sans-serif; text-align: justify; font-size: 14px; line-height: 19.6px;">Hello
                                                                            ${company.company_name}</span></p>
                                                                    <p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        <span
                                                                            style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;"><span
                                                                                style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; line-height: 19.6px;">Your
                                                                                request is denied</span></span></p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        &nbsp;</p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        <span
                                                                            style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">Please
                                                                            try to select new partner or service</span></p>
                                                                    <p
                                                                        style="text-align: justify; font-size: 14px; line-height: 140%;">
                                                                        &nbsp;</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                                    cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&nbsp;</span> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:6px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <div align="center">
                                                                    <div style="display: table; max-width:171px;">
                                                                        <!--[if (mso)|(IE)]><table width="171" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:171px;"><tr><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://www.instagram.com/pitgrowth/"
                                                                                            title="Instagram" target="_blank">
                                                                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png"
                                                                                                alt="Instagram"
                                                                                                title="Instagram" width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://twitter.com/pitgrowth"
                                                                                            title="Twitter" target="_blank">
                                                                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle/twitter.png"
                                                                                                alt="Twitter" title="Twitter"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 11px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 11px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="https://www.linkedin.com/company/pitgrowth"
                                                                                            title="LinkedIn" target="_blank">
                                                                                            <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png"
                                                                                                alt="LinkedIn" title="LinkedIn"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="info@pitgrowth.com"
                                                                                            title="Email" target="_blank"> <img
                                                                                                src="https://cdn.tools.unlayer.com/social/icons/circle/email.png"
                                                                                                alt="Email" title="Email"
                                                                                                width="32"
                                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0"
                                                                    cellspacing="0" width="100%"
                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td
                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&nbsp;</span> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: transparent;"><![endif]-->
                                    <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div
                                            style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <!--<![endif]-->
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center"> <img align="center" border="0"
                                                                                    src="https://s3.eu-west-1.amazonaws.com/diycdnbucket/1666903575532-Screen+Shot+2022-10-27+at+23.45.12.png"
                                                                                    alt="" title=""
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;"
                                                                                    width="630"> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        
                    </td>
                </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->`,
            "startDate": "",
            "finishDate": ""
          }
          })} 

        }



        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

//Delete Meeting
router.delete('/:id',async(req,res)=>{
    try {
        const promise=await Meeting.findByIdAndDelete(req.params.id)
        res.json(promise)
    } catch (error) {
        res.json(error)
    }
})

module.exports=router