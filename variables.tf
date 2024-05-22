variable "tenant_id" {
  type        = string
  description = "This is the default tenant id where the resources are managed."
}

variable "subscription_id" {
  type        = string
  description = "The Azure subscription identifier."
}
variable "user_prefix" {
  description = "Your custom prefix to use for all resources in this example"
  type        = string
}
