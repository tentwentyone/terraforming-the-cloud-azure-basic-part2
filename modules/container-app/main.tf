
resource "azurerm_container_app_environment" "this" {
  name                = var.container_app_environment_name
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
}



resource "azurerm_container_app" "this" {
  count                        = var.instance_count
  name                         = var.container_app_name
  container_app_environment_id = azurerm_container_app_environment.this.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  template {

    container {
      name   = var.container_name
      image  = "${var.container_image}:${var.container_image_tag}"
      cpu    = var.container_app_cpu
      memory = var.container_app_memory
    }
  }

  ingress {
    target_port                = var.target_port
    allow_insecure_connections = var.insecure_connections
    external_enabled           = var.external_enabled
    transport                  = var.transport
    traffic_weight {
      percentage      = var.traffic_weight_percentage
      latest_revision = var.latest_revision
    }
  }
}
