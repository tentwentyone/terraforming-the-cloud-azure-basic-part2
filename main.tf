terraform {
  required_version = ">= 1.8.1"
  backend "local" {
    path = "terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.106"
    }
  }
}

provider "azurerm" {
  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
  features {}
}

# referenciar um recurso já existente
# ref: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subscription
data "azurerm_subscription" "this" {
  subscription_id = var.subscription_id
}

data "azurerm_client_config" "current" {
}



## 1.1 Descomentar o module e o output

# module "resource_group" {
#   source = "./modules/resource-group"

#   user_prefix         = var.user_prefix
#   random_pet_length   = 1
#   random_pet_prefix   = "azure"
#   resource_group_name = "rg"
# }

# output "resource_group_name" {
#   value = module.resource_group.resource_group_name
# }





## 1.2 Descomentar o module e output

# module "reused_resource_group" {
#   source = "./modules/resource-group"

#   user_prefix         = var.user_prefix
#   random_pet_length   = 1
#   random_pet_prefix   = "reused"
#   resource_group_name = "rg"
# }

# output "reused_resource_group_name" {
#   value = module.reused_resource_group.resource_group_name
# }





# # 2.1 Descomentar o module e output

# module "azure_container_app" {
#   source = "./modules/container-app"

#   resource_group_name            = module.resource_group.resource_group_name
#   resource_group_location        = module.resource_group.resource_group_location
#   container_app_name             = "${var.user_prefix}-${module.resource_group.random_pet}-app"
#   container_app_environment_name = "${var.user_prefix}-${module.resource_group.random_pet}-env"
#   container_app_cpu              = 0.25
#   container_app_memory           = "0.5Gi"
#   container_name                 = "github-rocks"
#   container_image                = "ghcr.io/tentwentyone/terraforming-the-cloud-azure-basic-part2/github-rocks"
#   container_image_tag            = "1.0.0"
# }

# output "container_app_name" {
#   value = module.azure_container_app.container_app_name[0]
# }

# output "container_app_fqdn" {
#   value = module.azure_container_app.container_app_latest_revision_fqdns[0]
# }



## 2.2 Descomentar o module e output

# module "count_azure_container_app" {
#   source = "./modules/container-app"

#   count = 2
#   resource_group_name                           = module.resource_group.resource_group_name
#   resource_group_location                       = module.resource_group.resource_group_location
#   container_app_name                            = "${var.user_prefix}-${module.resource_group.random_pet}-app-${count.index}"
#   container_app_environment_name                = "${var.user_prefix}-${module.resource_group.random_pet}-env-${count.index}"
#   container_app_cpu                             = 0.25
#   container_app_memory                          = "0.5Gi"
#   container_name                                = "github-rocks"
#   container_image                               = "ghcr.io/tentwentyone/terraforming-the-cloud-azure-basic-part2/github-rocks"
#   container_image_tag                           = "1.0.0"
# }

# output "count_container_app_name" {
#   value = flatten([for app in module.count_azure_container_app : app.container_app_name])
# }
