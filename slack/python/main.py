import base64
import json
import requests
import os
from google.cloud import secretmanager

slack_channel   = os.environ["SLACK_CHANNEL"]
secret_id       = os.environ["SECRET_ID"]
org_id          = os.environ["ORG_ID"]
project_id      = os.environ["PROJECT_ID"]

client = secretmanager.SecretManagerServiceClient()
request = {"name": f"projects/{project_id}/secrets/{secret_id}/versions/latest"}
response = client.access_secret_version(request)
secret_payload = response.payload.data.decode("UTF-8")

def SCC_Slack(event, context):
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    message_json = json.loads(pubsub_message)
    finding = message_json['finding']

    requests.post("https://slack.com/api/chat.postMessage", data={
        "token": secret_payload,
        "channel": slack_channel,
        "text": f"HIGH or CRITICAL severity finding {finding['category']} was detected!\nhttps://console.cloud.google.com/security/command-center/overview?organizationId={org_id}"
    })
