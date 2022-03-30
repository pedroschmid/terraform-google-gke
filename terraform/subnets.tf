resource "google_compute_subnetwork" "private" {
  name                     = "private"
  ip_cidr_range            = var.PRIVATE_SUBNET_CIDR_RANGE
  region                   = var.REGION
  network                  = google_compute_network.main.id
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "k8s-pod-range"
    ip_cidr_range = var.KUBERNETES_POD_CIDR_RANGE
  }

  secondary_ip_range {
    range_name    = "k8s-service-range"
    ip_cidr_range = var.KUBERNETES_SERVICE_CIDR_RANGE
  }
}