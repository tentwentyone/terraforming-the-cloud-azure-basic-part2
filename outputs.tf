output "subscription_id" {
  value       = data.azurerm_subscription.this.subscription_id
  description = "Value of the subscription id"
}

## 1.1 Descomentar o output

# output "resource_group_name" {
#   value = module.resource_group.resource_group_name
# }

## 1.2 Descomentar o output

# output "reused_resource_group_name" {
#   value = module.reused_resource_group.resource_group_name
# }

## 2. Descomentar o output

# output "container_app_info" {
#   value = {
#     for app in module.azure_container_app :
#     app.container_app_name[0] => {
#       fqdn = app.container_app_latest_revision_fqdns[0]
#       id   = app.container_app_id[0]
#     }
#   }
#   description = "Container app info"
# }
