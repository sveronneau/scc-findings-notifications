bucket_name                     = "scc_slack_notification_code"
state_bucket_name               = "scc_slack_notification_state"
bucket_location                 = "US"
function_name                   = "scc-notification-slack"
function_description            = "SCC Notifications to Slack"
function_runtime                = "python38"
function_location               = "us-central1"
topic_name                      = "scc-notifications-topic-slack"    
topic_iam_role                  = "roles/pubsub.publisher"
scc_notification_name           = "all-active-alerts-slack"    
scc_notification_description    = "My Custom Cloud Security Command Center Finding Notification Configuration"
notification_filter             = "(severity=\"HIGH\" OR severity=\"CRITICAL\") AND state=\"ACTIVE\""
secret_id                       = "scc-slack"
org_id                          = "CHANGE_ME"
project_id                      = "CHANGE_ME"
slack_channel                   = "CHANGE_ME"
