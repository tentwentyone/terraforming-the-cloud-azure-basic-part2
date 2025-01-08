
resource "random_pet" "this" {
  length    = var.random_pet_length
  separator = var.random_pet_separator
  prefix    = var.random_pet_prefix
  keepers   = var.random_pet_keepers
}

resource "azurerm_resource_group" "this" {
  name       = "${var.user_prefix}-${random_pet.this.id}-${var.resource_group_name}"
  location   = var.resource_group_location
  managed_by = var.managed_by
  tags       = var.tags
}
