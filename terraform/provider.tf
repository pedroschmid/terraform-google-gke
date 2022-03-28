provider "google" {
  credentials = file("keys/gcp-service-account-key.json")
  project     = "k8s-github"
  region      = "us-east2"
}

terraform {
  backend "gcs" {
    bucket = "devops-676b1d26-8d39-4aaf-b004-26fc9c49568f"
    prefix = "terraform/state/k8s-github"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}