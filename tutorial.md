# Terraforming the Cloud - Part 2

![alt text](/images/architecture_2.png)

## Index

* [0. Pré Requisitos](#0-pré-requisitos)
* [1. Uso Básico de Modulos](#1-uso-básico-de-modulos)
  * [1.1 Resource Group Module](#11-resource-group-module)
  * [1.2 Vantagem dos Modulos](#12-vantagem-dos-módulos)
* [2. Container App Module](#2-container-app-module)
  * [2.1 Invocar o módulo](#21-invocar-o-módulo)
  * [2.2 Invocar o módulo com o meta-argument count](#22-invocar-o-módulo-com-o-meta-argument-count)
* [3. Wrap up Destroy](#3-wrap-up--destroy)

## Temas abordados neste modulo

* Criação de [Módulos de Terraform](https://www.terraform.io/docs/language/modules/syntax.html)
* Criação de Módulo de [Resource Group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
* Criação de Módulo de [Container App](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app) e [Container App Environment](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app_environment)

**Tempo estimado**: Cerca de 2 horas

## 0. Pré requisitos

<details>
  <summary>Clica para veres os pré requisitos</summary>

Certifica-te que tens a `azure-cloud-shell` devidamente configurada, correndo o comando:

```bash
source ./scripts/get-azure-credentials.sh
```

💡 Ao fazerem copy-paste na `Azure Cloud Shell`, aconselhamos a que "colem" os conteúdos com `ctrl+shift+v`.

Deve dar os valores do `AZURE_SUBSCRIPTION_ID` e `AZURE_TENANT_ID`.

Após obteres os resultados do `AZURE_SUBSCRIPTION_ID` e `AZURE_TENANT_ID` vai ao ficheiro `terraform.tfvars` e define também um prefixo, no seguinte formato: `user_prefix = "<valor>"`.

* Não te esqueças de salvar o ficheiro depois de fazeres alterações! `ctrl+s` ou se estiveres num mac `cmd+s`.

Inicializar:

```bash
terraform init
```

Planear:

```bash
terraform plan
```

Aplicar:

```bash
terraform apply
```

* Não te esqueças de escrever `yes` para confirmar o apply.

</details>

## 1. Uso Básico de Modulos

> **Neste capitulo iremos abordar a utilização de [terraform modules](https://www.terraform.io/docs/language/modules/syntax.html)**

### 1.1 Resource Group Module

> **Neste capitulo vamos instanciar o nosso Resource Group com base num modulo.**

<details>
  <summary>Clica para veres o Exercício 1.1</summary>

Para criarmos recursos invocando um `module`, vai ao ficheiro `main.tf` na `root`, e descomenta (seleciona o conteúdo e prime `ctrl+k+u` para remover os `#`) o seguinte :

```bash
module "resource_group" {
  source = "./modules/resource-group"

  user_prefix              = var.user_prefix
  random_pet_length        = 1
  random_pet_prefix        = "azure"
  resource_group_name      = "rg"
}

output "resource_group_name" {
  value = module.resource_group.resource_group_name
}
```

* Por norma, os outputs estariam no `outputs.tf` mas aqui estão juntos no âmbito da formação.

* Não te esqueças de salvar o ficheiro depois de fazeres alterações! `ctrl+s` ou se estiveres num mac `cmd+s`.

Quando recorremos a um módulo, devemos indicar a sua `source`. Neste caso, estamos a apontar para `./modules/resource-group`.

![alt text](/images/parent_module.png)

Devemos também fazer um novo `init` para instalar o novo módulo. Isto incluí quaisquer invocações.

Executar o `init`:

```bash
terraform init
```

Executar o `plan`:

```bash
terraform plan
```

Deve apresentar um resultado semelhante a isto:

```bash
Terraform will perform the following actions:

  # module.resource_group.azurerm_resource_group.this will be created
  + resource "azurerm_resource_group" "this" {
      + id         = (known after apply)
      + location   = "westeurope"
      + managed_by = "terraform"
      + name       = (known after apply)
      + tags       = {
          + "project" = "terraform-workshop-part-2"
        }
    }

  # module.resource_group.random_pet.this will be created
  + resource "random_pet" "this" {
      + id        = (known after apply)
      + length    = 1
      + prefix    = "azure"
      + separator = "-"
    }

Plan: 2 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + resource_group_name = (known after apply)
```

Como as `variables` do modulo têm valores `default`, se forem omitidos no módulo, irão adquirir esses valores.

Apesar de não termos adicionado o parametro `tags` ao nosso módulo, ele está a adicionar uma tag `"project" = "terraform-workshop-part-2"` porque é esse o valor `default` da variável `tags` no módulo.

Executar o `apply`:

```bash
terraform apply
```

* Não te esqueças de escrever `yes` para confirmar o apply.

* ⌛Tempo do apply 30 sec.

Podemos verificar que o resource group foi corretamente criado, usando o comando:

```bash
az group show --output table --name=$(terraform output -raw resource_group_name)
```

💡 Ao fazerem copy-paste na `Azure Cloud Shell`, aconselhamos a que "colem" os conteúdos com `ctrl+shift+v`.

Para verificar todos os resource groups:

```bash
az group list --output table
```

💡 Ao fazerem copy-paste na `Azure Cloud Shell`, aconselhamos a que "colem" os conteúdos com `ctrl+shift+v`.

</details>

### 1.2 Vantagem dos módulos

> **Neste capitulo iremos abordar a importância de módulos em terraform de modo a tornar o código reutilizável e organizado**

<details>
  <summary>Clica para veres o Exercício 1.2</summary>

A grande vantagem de usar módulos é impedir a repetição de múltiplos recursos.

Se quisessemos criar outro `resource_group` com os mesmos recursos, sem recorrer a módulos, teriamos de voltar a criar outro `random_pet` e outro `resource_group`.

Neste exemplo o módulo só tem dois recursos, mas podia ter muitos mais.

Recorrendo a módulos, só precisariamos de ter outra invocação, com a mesma source, com um nome e/ou parametros diferentes para as nossas necessidades.

* Descomenta (seleciona o conteúdo e prime `ctrl+k+u` para remover os `#`) o `module "reused_resource_group"` no `main.tf` da `root`.

```bash
module "reused_resource_group" {
  source = "./modules/resource-group"

  random_pet_length        = 1
  random_pet_prefix        = "reused"
  resource_group_name      = "rg"
}

output "reused_resource_group_name" {
  value = module.reused_resource_group.resource_group_name
}
```

* Não te esqueças de salvar o ficheiro depois de fazeres alterações! `ctrl+s` ou se estiveres num mac `cmd+s`.

⚠️ Como estamos a acrescentar um novo módulo, temos de correr `init` mais uma vez para ele ser instalado.

Executar o `init`:

```bash
terraform init
```

Executar o `plan`:

```bash
terraform plan
```

Deve apresentar um resultado semelhante a isto:

```bash
Terraform will perform the following actions:

  # module.reused_resource_group.azurerm_resource_group.this will be created
  + resource "azurerm_resource_group" "this" {
      + id         = (known after apply)
      + location   = "westeurope"
      + managed_by = "terraform"
      + name       = (known after apply)
      + tags       = {
          + "project" = "terraform-workshop-part-2"
        }
    }

  # module.reused_resource_group.random_pet.this will be created
  + resource "random_pet" "this" {
      + id        = (known after apply)
      + length    = 1
      + prefix    = "reused"
      + separator = "-"
    }

Plan: 2 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + reused_resource_group_name = (known after apply)
```

Executar o `apply`:

```bash
terraform apply
```

* Não te esqueças de escrever `yes` para confirmar o apply.

* ⌛Tempo do apply 30 sec.

Podemos verificar que o novo resource group foi corretamente criado:

```bash
az group show --output table --name=$(terraform output -raw reused_resource_group_name)
```

Para verificar todos os resource groups:

```bash
az group list --output table
```

</details>

## 2. Container App Module

> **Neste capitulo iremos abordar a utilização de um módulo para criar uma Azure Container App, usando dependências de outros módulos e aprender sobre o meta-argument count**

### 2.1 Invocar o módulo

> **Neste capitulo vamos instanciar a nossa 1ª Container App com base num modulo e com dependências do módulo de resource group criado no capítulo 1**

<details>
  <summary>Clica para veres o Exercício 2.1</summary>

Vamos utilizar um módulo para a criação de uma `Container App`.

No `main.tf` da `root`, devem descomentar (seleciona o conteúdo e prime `ctrl+k+u` para remover os `#`) o seguinte:

```bash
module "azure_container_app" {
  source = "./modules/container-app"

  resource_group_name                           = module.resource_group.resource_group_name
  resource_group_location                       = module.resource_group.resource_group_location
  container_app_name                            = "${var.user_prefix}-${module.resource_group.random_pet}-app"
  container_app_environment_name                = "${var.user_prefix}-${module.resource_group.random_pet}-env"
  container_app_cpu                             = 1
  container_app_memory                          = "2Gi"
  container_name                                = "github-rocks"
  container_image                               = "ghcr.io/tentwentyone/terraforming-the-cloud-azure-basic-part2/github-rocks"
  container_image_tag                           = ""
}

output "container_app_name" {
  value = module.azure_container_app.container_app_name
}

output "container_app_fqdn" {
  value = module.azure_container_app.container_app_latest_revision_fqdns
}

```

Nos argumentos `resource_group_name` e `resource_group_location` estamos a fazer alusão aos campos que provém do módulo `resource_group`.s

À semelhança da invocação do módulo dos exercícios anteriores temos de definir a `source` deste módulo. Como podes ver estamos a apontar para `./modules/container-app` visto que este é um módulo distinto do que visa criar os `resource-groups`.

Devemos também fazer um novo `init` para instalar o novo módulo. Isto incluí quaisquer invocações.

Executar o `init`:

```bash
terraform init
```

Executar o `plan`:

```bash
terraform plan
```

Executar o `apply`:

```bash
terraform apply
```

* Não te esqueças de escrever `yes` para confirmar o apply.

* ⌛Tempo do apply 2 min.

Podemos verificar que a container app foi corretamente criada:

```bash
az containerapp show --name=$(terraform output -raw container_app_name) --resource-group=$(terraform output -raw resource_group_name) --output table
```

Para verificar todas as container apps:

```bash
az containerapp list --output table
```

</details>

### 2.2 Invocar o módulo com o meta-argument count

> **Neste capitulo vamos instanciar várias Container Apps recorrendo ao meta-argument count**

<details>
  <summary>Clica para veres o Exercício 2.2</summary>

Utilizamos o meta-argumento (argumentos especiais para ir para lá da definição original do recurso) `count` para atingir o objectivo de criar múltiplas instâncias dos recursos definidos no módulo sem termos de criar blocos de recursos adicionais na nossa configuração ou fazer multiplas invocações do mesmo módulo.

No `main.tf` da `root`, devem descomentar (seleciona o conteúdo e prime `ctrl+k+u` para remover os `#`) o seguinte:

```bash
module "count_azure_container_app" {
  source = "./modules/container-app"

  count                                         = 2
  resource_group_name                           = module.resource_group.resource_group_name
  resource_group_location                       = module.resource_group.resource_group_location
  container_app_name                            = "${var.user_prefix}-${module.resource_group.random_pet}-app-${count.index}"
  container_app_environment_name                = "${var.user_prefix}-${module.resource_group.random_pet}-env-${count.index}"
  container_app_cpu                             = 0.25
  container_app_memory                          = "0.5Gi"
  container_name                                = "github-rocks"
  container_image                               = "ghcr.io/tentwentyone/terraforming-the-cloud-azure-basic-part2/github-rocks"
  container_image_tag                           = "1.0.0"
}

output "count_container_app_name" {
  value = flatten([for app in module.count_azure_container_app : app.container_app_name])
}

```

* O output do count recorre a um `for` para iterar os nomes das várias container apps que estamos a criar.

Neste caso, assumimos que queremos duas `container apps` exatamente com os mesmos parâmetros. O `count` não seria uma boa opção se quisessemos mudar os parâmetros entre os nossos recursos. Aqui, estamos a usar o `count.index` para diferenciar os nomes dos recursos com base no `count`, uma vez que os nomes têm de ser únicos, desta forma, os nomes terão um número correspondente á sua posição do count a começar em 0.

* Não te esqueças de salvar o ficheiro depois de fazeres alterações! `ctrl+s` ou se estiveres num mac `cmd+s`.

Devemos também fazer um novo `init` para instalar o novo módulo. Isto incluí quaisquer invocações.

Executar o `init`:

```bash
terraform init
```

Executar o `plan`:

```bash
terraform plan
```

Executar o `apply`:

```bash
terraform apply
```

* Não te esqueças de escrever `yes` para confirmar o apply.

* ⌛Tempo do apply 2 min.

Podemos verificar que as container apps foram corretamente criadas:

```bash
for app_name in $(terraform output -json count_container_app_name | jq -r '.[]'); do
  az containerapp show --name $app_name --resource-group $(terraform output -raw resource_group_name) --output table
done
```

Para verificar todas as container apps:

```bash
az containerapp list --output table
```

Finalmente, Vamos voltar a correr este comando:

```bash

az containerapp show --name=$(terraform output -raw container_app_name) --resource-group=$(terraform output -raw resource_group_name) --output table

```

E copiar o link na coluna `FQDN` e colar no nosso browser numa janela/tab aparte.

Se a aplicação estiver a correr com sucesso, deverão ver uma homepage semelhante a isto:

![alt text](/images/homepage.png)

</details>

## 3. Wrap-up & Destroy

Por fim, podemos destruir tudo de uma só vez.

⏰ Notem que devido à quantidade de recursos envolvidos, a operação de destroy pode demorar entre **10 a 15 minutos**.

```bash
terraform destroy
```

🔚🏁 Chegámos ao fim 🏁🔚

<walkthrough-conclusion-trophy></walkthrough-conclusion-trophy>

<!-- markdownlint-disable-file MD013 -->
<!-- markdownlint-disable-file MD033 -->

 [//]: # (*****************************)
 [//]: # (INSERT IMAGE REFERENCES BELOW)
 [//]: # (*****************************)
