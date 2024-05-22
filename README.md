# Terraforming the Cloud - Part 2

Temas abordados neste modulo:

* Criação de [Módulos de Terraform](https://www.terraform.io/docs/language/modules/syntax.html)
* Criação de Módulo de [Resource Group](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group)
* Criação de Módulo de [Container App](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app) e [Container App Environment](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app_environment)

## Início

Esta secção explica como preparar a Azure Cloud Shell para executarem os comandos.

💡 Ao fazerem copy-paste na `Azure Cloud Shell`, aconselhamos a que "colem" os conteúdos com `ctrl+shift+v`.

## Configurar a cloud shell

<details>

<summary>Clicar para expandir</summary>

Abrir o endereço: <a href="https://portal.azure.com" target="_blank">Open Azure Portal</a>

Autenticar na Azure Cloud:

![alt text](/images/sign_in.png)

Abrir a Cloud Shell:

![alt text](/images/cloud_shell.png)

Selecionar Bash:

![alt text](/images/bash_pshell.png)

Seleciona "Mount storage account" e a subscrição <>

![alt text](/images/subscription.png)

Seleciona "Select existing storage account" e clica "Next"

![alt text](/images/mount_storage.png)

Seleciona a subscrição <>, o Resource Group "tf-azure-workshop-rg", a Storage account name "tfazureworkshopsa" e o File share "fileshare" e clica "Select"

![alt text](/images/select_storage_account.png)

Faz apply

![alt text](/images/storage_subscription_apply.png)

Mudar para o editor:

![alt text](/images/choose_editor.png)

Confirmar a mudança:

![alt text](/images/classic_shell.png)

Clonar o projeto:

```bash
git clone https://github.com/tentwentyone/terraforming-the-cloud-azure-basic-part2.git
```

Mudar de diretório.

```bash
cd terraforming-the-cloud-azure-basic-part2
```

Abrir o editor:

![alt text](/images/open_editor.png)

⚠️ NOTA: o editor não atualiza automaticamente quaisquer mudanças, é preciso clicar no botão de refresh, localizado aqui.

![alt text](/images/refresh_vscode.png)

Setup está completo!

![alt text](/images/setup_complete.png)

</details>

## Tutorial

🧭 [Clica aqui para começar!](tutorial.md)

### Comandos Úteis

```bash
# Obter a informação do teu Resource Group
az group show --name <MyResourceGroup>

# Verificar que o teu Resource Group existe
az group exists --name <MyResourceGroup>

# Obter a informação da tua Container App
az containerapp show -n <my-containerapp> -g <MyResourceGroup>

# Obtem a informação do teu Container App Environment
az containerapp env show -n MyContainerappEnvironment -g MyResourceGroup

```
