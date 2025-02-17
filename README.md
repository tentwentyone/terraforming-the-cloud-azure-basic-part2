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

Abrir o endereço com o botão direito do rato numa nova janela/tab (também podem ficar a premir o `ctrl` quando clicarem no link) : <a href="https://portal.azure.com" target="_blank">Open Azure Portal</a>

Autenticar na Azure Cloud:

![alt text](/images/sign_in.png)

Abrir a Cloud Shell:

![alt text](/images/cloud_shell.png)

Selecionar Bash:

![alt text](/images/bash_pshell.png)

Seleciona "Mount storage account" e a subscrição.

![alt text](/images/subscription.png)

Clica Apply depois das seleções.

![alt text](/images/subscription_apply.png)

Seleciona "Select existing storage account" e clica "Next"

![alt text](/images/mount_storage.png)

Seleciona a subscrição <>, o Resource Group "tf-azure-workshop-rg", a Storage account name "tfazureworkshopsatto" e o File share "fileshare" e clica "Select"

![alt text](/images/select_storage_account.png)

Mudar para o editor após a conexão ser realizada:

![alt text](/images/choose_editor.png)

Confirmar a mudança:

![alt text](/images/classic_shell.png)

Clonar o projeto:

```bash
git clone https://github.com/tentwentyone/terraforming-the-cloud-azure-basic-part2.git
```
💡 Ao fazerem copy-paste na `Azure Cloud Shell`, aconselhamos a que "colem" os conteúdos com `ctrl+shift+v`.

Mudar de diretório.

```bash
cd terraforming-the-cloud-azure-basic-part2
```

💡 Ao fazerem copy-paste na `Azure Cloud Shell`, aconselhamos a que "colem" os conteúdos com `ctrl+shift+v`.

Abrir o editor:

![alt text](/images/open_editor.png)

⚠️ NOTA: o editor não atualiza automaticamente quaisquer mudanças, é preciso clicar no botão de refresh, localizado aqui.

![alt text](/images/refresh_vscode.png)

Setup está completo!

![alt text](/images/setup_complete.png)

</details>

## Pré-Config Vscode
<!-- markdownlint-disable MD033 -->
<details>

<summary>Clicar para expandir</summary>
<!-- markdownlint-enable MD033 -->

Para iniciares o workshop terás de aceder ao teu workspace no Coder.

Será facultado um link assim como username e password para que possas fazer o login. Ao chegares a esta página utiliza as credenciais para entrares na plataforma.

![alt text](/images/coder-login.png)

Ao fazerem o login deverão encontrar um workspace já criado para o propósito do workshop semelhante a este:

![alt text](/images/coder-workspaces.png)

⚠️ Não criem um novo workspace.

Ao acederem ao vosso workspace vão conseguir ver se este já se encontra disponível e se tal se verificar podem aceder ao `code-server`

![alt text](/images/coder-server.png)

</details>

## Configurar o vscodeserver
<!-- markdownlint-disable MD033 -->
<details>

<summary>Clicar para expandir</summary>
<!-- markdownlint-enable MD033 -->

Abre o terminal no vscode com o comando:

```bash
ctrl+ç
```

ou se estiveres num mac:

```bash
shift+cmd+c
```

Faz git clone do repositório:

```bash
git clone https://github.com/tentwentyone/terraforming-the-cloud-azure-basic-part2.git
```

Abre a diretoria do projecto:

```bash
cd terraforming-the-cloud-azure-basic-part2/
```

Abre a diretoria com o comando:

```bash
ctrl+k+ctrl+o
```

ou se estiveres num mac:

```bash
cmd+k+cmd+o
```

Seleciona o path para o codetour:

```bash
/home/coder/terraforming-the-cloud-azure-basic-part2
```

Inicia o tour no canto inferior esquerdo do teu Visual Studio Code:

![alt text](/images/codetour.png)

</details>

## Tutorial

🧭 [Clica aqui para começar!](tutorial.md)

### Comandos Úteis

```bash
# Obter informações acerca de todos os Resource Groups existentes
az group list --output table

# Verificar que o teu Resource Group existe
az group exists --name <MyResourceGroup>

# Obter informações acerca de todas as Container Apps existentes
az containerapp list --output table

```
