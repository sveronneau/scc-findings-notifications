# Google Cloud SCC Notifications to Slack

This repository contains provides example code to create Finding Notifications for Security Command Center, and sends the findings to Slack via API call.

The infrastructure is written in Terraform, which will create the following components:

- [SCC Finding Notifications](https://cloud.google.com/security-command-center/docs/how-to-notifications)
- [Pub/Sub Topic](https://cloud.google.com/pubsub)
- [GCS Bucket](https://cloud.google.com/storage/docs/creating-buckets)
- [GCS Object](https://cloud.google.com/storage/docs/json_api/v1/objects)
- [Cloud Function](https://cloud.google.com/functions)

The Cloud Function is written in Python which will parse the Pub/Sub event and send the details to the Slack API using the Slack App Bot Token for validation.


## Prerequisites 

1. Tested on Terraform v1.4.6 with Google Cloud Provider v4.64.0
2. Google Cloud SDK
3. Enable Cloud Functions API and Cloud Build API
4. Enable Security Command Center
5. Python runtime = 3.8
6. Create a Slack API App - info can be found [here](https://cloud.google.com/security-command-center/docs/how-to-enable-real-time-notifications#setting_up_a_messaging_app) in the Slack section.


## Usage

Update the python/main.py file at line 30 and 31 with your ORG ID and Slack App Bot Token
```
TOKEN   = "CHANGE_ME"
CHANNEL = "#CHANGE_ME"
```

Update the terraform.tfvars file with your ORG values then deploy using terraform.

```
    bucket_name                     = "scc_slack_notification_code"
    bucket_location                 = "US"
    function_name                   = "scc-notification-slack"
    function_description            = "SCC Notifications to Slack"
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

*Note: This code sample requires you to hardcode user or application credentials. For added security, and to safeguard credentials, consider using Secret Manager with Cloud Functions.. For instructions, see [Using secrets](https://cloud.google.com/functions/docs/configuring/secrets) in Cloud Functions documentation.*

*Python code coming from https://cloud.google.com/security-command-center/docs/how-to-enable-real-time-notifications#slack code snippet.*