resource "google_project_service" "compute" {
  project = var.PROJECT
  service = "compute.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_service" "container" {
  project = var.PROJECT
  service = "container.googleapis.com"
  disable_dependent_services = true
}
