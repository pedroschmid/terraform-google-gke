resource "google_project_service" "compute" {
  project = "k8s-github"
  service = "compute.googleapis.com"
}

resource "google_project_service" "container" {
  project = "k8s-github"
  service = "container.googleapis.com"
}
