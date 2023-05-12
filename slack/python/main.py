import base64
import json
import requests

TOKEN   = "CHANGE_ME"
CHANNEL = "#CHANGE_ME"

def SCCPubSub(event, context):
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    message_json = json.loads(pubsub_message)
    finding = message_json['finding']

    requests.post("https://slack.com/api/chat.postMessage", data={
        "token": TOKEN,
        "channel": CHANNEL,
        "text": f"HIGH or CRITICAL severity finding {finding['category']} was detected!\nhttps://console.cloud.google.com/security/command-center/overview?organizationId="
    })
