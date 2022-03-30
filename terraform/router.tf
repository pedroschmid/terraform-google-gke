resource "google_compute_router" "router" {
  name    = "router"
  region  = var.REGION
  network = google_compute_network.main.id
}