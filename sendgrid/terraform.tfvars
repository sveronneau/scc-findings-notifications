bucket_name                     = "scc_sendgrid_notification_code"
state_bucket_name               = "scc_gchat_notification_state"
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
