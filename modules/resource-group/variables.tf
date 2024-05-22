
# RANDOM_PET VARIABLES

variable "random_pet_length" {
  description = "The length of the random pet"
  type        = number
  default     = 2
}

variable "random_pet_separator" {
  description = "The separator of the random pet"
  type        = string
  default     = "-"
}

variable "random_pet_prefix" {
  description = "The prefix of the random pet"
  type        = string
  default     = null
}

variable "random_pet_keepers" {
  description = "The keepers of the random pet"
  type        = map(string)
  default     = null
}

# RESOURCE GROUP VARIABLES

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
  default     = "tfworkshop"
}

variable "resource_group_location" {
  description = "The location of the resource group"
  type        = string
  default     = "westeurope"
}

variable "managed_by" {
  description = "The managed by of the resource group"
  type        = string
  default     = "terraform"
}
variable "tags" {
  description = "The tags of the resource group"
  type        = map(string)
  default = {
    project = "terraform-workshop-part-2"
  }
}

variable "user_prefix" {
  description = "Your custom prefix to use for all resources in this example"
  type        = string
}
