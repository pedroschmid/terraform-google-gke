resource "google_compute_router" "router" {
  name    = "router"
  region  = "us-east1"
  network = google_compute_network.main.id
}