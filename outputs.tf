output "subscription_id" {
  value       = data.azurerm_subscription.this.subscription_id
  description = "Value of the subscription id"
}
