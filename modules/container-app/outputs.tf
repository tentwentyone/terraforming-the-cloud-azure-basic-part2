output "container_app_name" {
  description = "The name of the Container App"
  value       = azurerm_container_app.this[*].name
}

output "container_app_id" {
  description = "The ID of the Container App"
  value       = azurerm_container_app.this[*].id
}

output "container_app_latest_revision_fqdns" {
  description = "The fully qualified domain names (FQDNs) of the latest revisions of the Container Apps"
  value       = azurerm_container_app.this[*].latest_revision_fqdn
}

