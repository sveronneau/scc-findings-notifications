import base64
import json
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

ORG_ID = "CHANGE_ME"

def send_email_notification(event, context):
    """Triggered from a message on a Pub/Sub topic.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    message_json = json.loads(pubsub_message)
    message = Mail(
        from_email='CHANGE_ME',
        to_emails='CHANGE_ME',
        subject='New High or Critical Severity Finding Detected',
        html_content='A new high or critical severity finding was detected: ' + ''.join(message_json['finding']['category']) + '<br>https://console.cloud.google.com/security/command-center/overview?organizationId=' + ORG_ID)
    try:
        sg = SendGridAPIClient('CHANGE_ME')
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)

    print(pubsub_message)