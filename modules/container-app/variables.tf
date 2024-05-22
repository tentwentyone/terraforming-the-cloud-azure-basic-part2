
variable "container_name" {
  description = "The name of the container"
  type        = string
}

variable "container_image_tag" {
  description = "The image of the container"
  type        = string
}

variable "container_image" {
  description = "The image of the container"
  type        = string
}

variable "container_app_cpu" {
  description = "The CPU of the container app"
  type        = number
  default     = 1
}

variable "container_app_memory" {
  description = "The memory of the container app"
  type        = string
  default     = "2Gi"
}

variable "container_app_environment_name" {
  description = "The name of the container app environment"
  type        = string
}

variable "container_app_name" {
  description = "The name of the container app"
  type        = string
}

variable "resource_group_location" {
  description = "The location of the resource group"
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "instance_count" {
  description = "Number of instances to create"
  type        = number
  default     = 1
}

variable "target_port" {
  description = "The target port of the container app"
  type        = number
  default     = 8080
}

variable "insecure_connections" {
  description = "Allow insecure connections"
  type        = bool
  default     = true
}

variable "external_enabled" {
  description = "Enable external connections"
  type        = bool
  default     = true
}

variable "transport" {
  description = "The transport of the container app"
  type        = string
  default     = "http"
}

variable "traffic_weight_percentage" {
  description = "The traffic weight percentage"
  type        = number
  default     = 100
}

variable "latest_revision" {
  description = "The latest revision"
  type        = bool
  default     = true
}
