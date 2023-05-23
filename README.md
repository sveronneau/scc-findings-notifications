[![infracost](https://img.shields.io/endpoint?url=https://dashboard.api.infracost.io/shields/json/df040c4a-bc5b-4d55-ad14-16ac275ee225/repos/c335a269-26fa-4531-8e5f-0f5e100aea42/branch/)](https://dashboard.infracost.io/org/sveronneau/repos/c335a269-26fa-4531-8e5f-0f5e100aea42)

# Send Google Cloud Platform's Security Command Center notifications to your channel of choice.

Many GCP customers who are using Security Command Center (Free or Premium), say that their biggest pain point is getting notified of findings when they are detected (unless using Slack with SCC Premium since it's native).
Going into the console on a regular cadence is something that they will do at first but is quickly forgotten.

In order to help get those notifications out, this repo is hosting some Node JS, Python and Terraform code that allows you to get the Findings from Pub/Sub via a Cloud Function to send those notifications out to you via Slack, G-Chat or SendGrid.

It also uses Secrets Manager to store the API tokens and a sensivite field when asked for the Slack Bot Token, SendGrid API Key or G-Chat WebHook URL on the Terraform run.

<img src="https://cdn-icons-png.flaticon.com/512/4823/4823241.png" width="50" height="50">**This repo works great when used in GCP Cloud Shell!**

## Google Cloud SCC Notifications to Google Chat

- https://github.com/sveronneau/scc-findings-notifications/blob/main/g-chat/README.md

## Google Cloud SCC Notifications to Slack

- https://github.com/sveronneau/scc-findings-notifications/blob/main/slack/README.md

## Google Cloud SCC Notifications to SendGrid

- https://github.com/sveronneau/scc-findings-notifications/blob/main/sendgrid/README.md

## Google Cloud SCC Notifications to MS Team

If you wish to send your SCC Findings to MS Team, the easiest way to do so is to use the 'Send an email to a Channel' feature.  Set an email to your MS Team Channel of choice and then use the SendGrid integration to target that email address.

- https://support.microsoft.com/en-us/office/send-an-email-to-a-channel-in-teams-d91db004-d9d7-4a47-82e6-fb1b16dfd51e
- https://support.microsoft.com/en-us/office/tip-send-email-to-a-channel-2c17dbae-acdf-4209-a761-b463bdaaa4ca
- https://github.com/sveronneau/scc-findings-notifications/blob/main/sendgrid/README.md


*Note: All code samples are not meant for production.  Please use responsibly.*
