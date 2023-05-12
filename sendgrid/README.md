# Google Cloud SCC Notifications to SendGrid Email

This repository contains provides example code to create Finding Notifications for Security Command Center, and sends the findings by email via the SendGrid API.

The infrastructure is written in Terraform, which will create the following components:

- [SCC Finding Notifications](https://cloud.google.com/security-command-center/docs/how-to-notifications)
- [Pub/Sub Topic](https://cloud.google.com/pubsub)
- [GCS Bucket](https://cloud.google.com/storage/docs/creating-buckets)
- [GCS Object](https://cloud.google.com/storage/docs/json_api/v1/objects)
- [Cloud Function](https://cloud.google.com/functions)

The Cloud Function is written in Python which will parse the Pub/Sub event and send the details to the SendGrid using the SendGrid Email API Key.

## Prerequisites 

1. Tested on Terraform v1.4.6 with Google Cloud Provider v4.64.0
2. Google Cloud SDK
3. Enable Cloud Functions API and Cloud Build API
4. Enable Security Command Center
5. Python runtime = 3.8
6. Create a SendGrid Email API Key - info can be found [here](https://cloud.google.com/security-command-center/docs/how-to-enable-real-time-notifications#setting_up_a_messaging_app) in the SendGrid Email section.


## Usage

Update the python/main.py file at line 6, 17, 18 and 22 with your ORG ID, FROM, TO emails and your SendGrid API key
```
ORG_ID     = "CHANGE_ME"
from_email = 'CHANGE_ME'
to_emails  = 'CHANGE_ME'
sg         = SendGridAPIClient('CHANGE_ME')
```

Update the terraform.tfvars file with your ORG values then deploy using terraform.

```
bucket_name                     = "scc_sendgrid_notification_code"
bucket_location                 = "US"
function_name                   = "scc-notification-sendgrid"
function_description            = "SCC Notifications to SendGrid"
function_runtime                = "python38"
function_location               = "us-central1"
topic_name                      = "scc-notifications-topic"    
topic_iam_role                  = "roles/pubsub.publisher"
scc_notification_name           = "all-active-alerts"    
scc_notification_description    = "My Custom Cloud Security Command Center Finding Notification Configuration"
notification_filter             = "(severity=\"HIGH\" OR severity=\"CRITICAL\") AND state=\"ACTIVE\""
org_id                          = "CHANGE_ME"
project_id                      = "CHANGE_ME"

```