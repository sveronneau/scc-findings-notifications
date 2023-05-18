import base64
import json
import os
from google.cloud import secretmanager
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

org_id      = os.environ["ORG_ID"]
project_id  = os.environ["PROJECT_ID"]
from_email  = os.environ["FROM_EMAIL"]
to_emails   = os.environ["TO_EMAILS"]
secret_id   = os.environ["SECRET_ID"]

client = secretmanager.SecretManagerServiceClient()
request = {"name": f"projects/{project_id}/secrets/{secret_id}/versions/latest"}
response = client.access_secret_version(request)
secret_payload = response.payload.data.decode("UTF-8")

def send_email_notification(event, context):
    """Triggered from a message on a Pub/Sub topic.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    message_json = json.loads(pubsub_message)
    message = Mail(
        from_email=(from_email),
        to_emails=(to_emails),
        subject='New High or Critical Severity Finding Detected',
        html_content='A new high or critical severity finding was detected: ' + ''.join(message_json['finding']['category']) + '<br>https://console.cloud.google.com/security/command-center/overview?organizationId=' + org_id)
    try:        
        sg = SendGridAPIClient(secret_payload)        
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)

    print(pubsub_message)
