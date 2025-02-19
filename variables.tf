variable "tenant_id" {
  type        = string
  description = "This is the default tenant id where the resources are managed."
}

variable "subscription_id" {
  type        = string
  description = "The Azure subscription identifier."
}
variable "user_prefix" {
  type        = string
  description = "Este campo é obrigatório para definir a vossa unicidade."
  ## Aqui podem verificar a utilização de uma regra de validação para o campo
  validation {
    condition     = can(regex("^[a-z]+$", var.user_prefix))
    error_message = "Valor inválido. Tem que ser lower-case, sem números nem caracteres especiais."
  }
}
