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
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.50"
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

## 1.1 Descomentar o module abaixo

# module "resource_group" {
#   source = "./modules/resource-group"

#   user_prefix         = var.user_prefix
#   random_pet_length   = 1
#   random_pet_prefix   = "azure"
#   resource_group_name = "rg"
# }

## 1.2 Descomentar o module abaixo

# module "reused_resource_group" {
#   source = "./modules/resource-group"

#   user_prefix         = var.user_prefix
#   random_pet_length   = 1
#   random_pet_prefix   = "reused"
#   resource_group_name = "rg"
# }

## 2.1 Descomentar o module abaixo


# module "azure_container_app" {
#   source = "./modules/container-app"

#   count                                         = 2
#   resource_group_name                           = module.resource_group.resource_group_name
#   resource_group_location                       = module.resource_group.resource_group_location
#   container_app_name                            = "${var.user_prefix}-${module.resource_group.random_pet}-app-${count.index}"
#   container_app_environment_name                = "${var.user_prefix}-${module.resource_group.random_pet}-env-${count.index}"
#   container_app_cpu                             = 1
#   container_app_memory                          = "2Gi"
#   container_name                                = "github-rocks"
#   container_image                               = "ghcr.io/tentwentyone/terraforming-the-cloud-azure-basic-part2/github-rocks"
#   container_image_tag                           = "1.0.0"
# }
