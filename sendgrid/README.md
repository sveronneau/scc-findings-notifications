# Google Cloud SCC Notifications to SendGrid Email

This repository contains provides example code to create Finding Notifications for Security Command Center, and sends the findings by email via the SendGrid API.

The infrastructure is written in Terraform, which will create the following components:

- [SCC Finding Notifications](https://cloud.google.com/security-command-center/docs/how-to-notifications)
- [Pub/Sub Topic](https://cloud.google.com/pubsub)
- [GCS Bucket](https://cloud.google.com/storage/docs/creating-buckets)
- [GCS Object](https://cloud.google.com/storage/docs/json_api/v1/objects)
- [Cloud Function](https://cloud.google.com/functions)
- [Secrets Manager](https://cloud.google.com/secret-manager)

The Cloud Function is written in Python which will parse the Pub/Sub event and send the details to the SendGrid using the SendGrid Email API Key.

## Prerequisites 

1. Tested on Terraform v1.4.6 with Google Cloud Provider v4.64.0
2. Google Cloud SDK
3. Enable Cloud Functions, Cloud Build, Pub/Sub and Secrets Manager APIs.  
   - gcloud services enable cloudfunctions.googleapis.com
   - gcloud services enable cloudbuild.googleapis.com
   - gcloud services enable pubsub.googleapis.com
   - gcloud services enable secretmanager.googleapis.com
4. Enable Security Command Center (UI)
5. Python runtime = 3.8
6. Create a SendGrid Email API Key - info can be found [here](https://cloud.google.com/security-command-center/docs/how-to-enable-real-time-notifications#setting_up_a_messaging_app) in the SendGrid Email section.

## Usage

- Update the terraform.tfvars file with your ORG, Project, From and To values then deploy using terraform.
- You will be prompted to enter the SendGrid API Key from step #6 during TF Apply and Deploy.  
- This value will be stored in Secrets Manager.

```
bucket_name                     = "scc_sendgrid_notification_code"
bucket_location                 = "US"
function_name                   = "scc-notification-sendgrid"
function_description            = "SCC Notifications to SendGrid"
function_runtime                = "python38"
function_location               = "us-central1"
topic_name                      = "scc-notifications-topic-sendgrid"    
topic_iam_role                  = "roles/pubsub.publisher"
scc_notification_name           = "all-active-alerts-sendgrid"    
scc_notification_description    = "My Custom Cloud Security Command Center Finding Notification Configuration"
notification_filter             = "(severity=\"HIGH\" OR severity=\"CRITICAL\") AND state=\"ACTIVE\""
secret_id                       = "scc-sendgrid"
org_id                          = "CHANGE_ME"
project_id                      = "CHANGE_ME"
from_email                      = "CHANGE_ME"
to_emails                       = "CHANGE_ME"
```

*Python code coming from https://cloud.google.com/security-command-center/docs/how-to-enable-real-time-notifications#sendgrid-email code snippet.*