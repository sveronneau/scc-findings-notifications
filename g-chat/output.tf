output "tf_state_bucket" {
  value       = google_storage_bucke.state.name
  description = "The name of the bucket made to hold the Terraform State file."

  depends_on = [
    google_storage_bucke.state,
  ]
}
