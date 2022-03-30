# CORE
variable "PROJECT" {
  type        = string
  description = "Google project ID"
}

variable "REGION" {
  type        = string
  description = "Google cloud region"
}

# APIS
variable "COMPUTE_API" {
  type        = string
  description = "Google compute api url"
}

variable "CONTAINER_API" {
  type        = string
  description = "Google container api url"
}

variable "OAUTH_CLOUD_PLATAFORM_API" {
  type        = string
  description = "Google OAuth cloud plataform api url"
}

# NETWORK
variable "NETWORK_TIER" {
  type        = string
  description = "Google network tier type"
}

variable "PRIVATE_SUBNET_CIDR_RANGE" {
  type        = string
  description = "Google private subnet cidr range"
}

variable "KUBERNETES_POD_CIDR_RANGE" {
  type        = string
  description = "Google kubernetes pod cidr range"
}

variable "KUBERNETES_SERVICE_CIDR_RANGE" {
  type        = string
  description = "Google kubernetes service cidr range"
}

# KUBERNETES
variable "MASTER_IPV4_CIDR_BLOCK" {
  type        = string
  description = "Google kubernetes master cidr block address"
}
variable "WORKLOAD_POOL" {
  type        = string
  description = "Google kubernetes workload pull name"
}

variable "MACHINE_TYPE" {
  type        = string
  description = "Google machine type"
}

# IAM
variable "KUBERNETES_SERVICE_ACCOUNT" {
  type        = string
  description = "Google service account for kubernetes access"
}