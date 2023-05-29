/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

variable bucket_name {
  description = "The name of the bucket."
  type = string
}

variable state_bucket_name {
  description = "The name of the bucket holding the Terraform state file."
  type = string
}

variable bucket_location {
  description = "The GCS location."
  type = string
}

variable function_name {
  description = "A user-defined name of the function. Function names must be unique globally."
  type = string
}

variable function_description {
  description = "(Optional) Description of the function."
  type = string
  default = ""
}

variable function_runtime {
  description = "The runtime in which the function is going to run"
  type = string
  default = "python38"
}

variable function_location {
  description = "Where will the Function be run (Region)"
  type = string
}

variable topic_name {
  description = "Name of the topic."
  type = string
}

variable topic_iam_role {
  description = " The role that should be applied with the SCC Notification service account on the Topic."
  type = string
  default = "roles/pubsub.publisher"
}

variable scc_notification_name {
  description = "This must be unique within the organization."
  type = string
}

variable org_id {
  description = "The Organization unique ID."
  type = string
}

variable project_id {
  description = "The Project unique ID that will host the bucket and function."
  type = string
}

variable scc_notification_description {
  description = "The description of the notification config."
  type = string
}

variable notification_filter {
  description = "Expression that defines the filter to apply across create/update events of assets or findings as specified by the event type."
  type = string
}

variable secret_id {
  description = "name of the secret to be defined in Secrets Manager"
  type = string  
}

variable secret_data {
  description = "Value of the secret to store in Secrets Manager.  Will be prompted to enter during Apply."
  type = string
  sensitive = true
}

variable slack_channel {
  description = "Slack channel name"
  type = string  
}
