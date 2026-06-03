# Data Model - Login Screen Amor Doce

Este documento descreve os modelos de dados e estados necessários para a tela de login.

## Modelos de Dados

### 1. Credentials (Credenciais de Acesso)
*   `email`: String (Requer formato de e-mail válido, obrigatório)
*   `password`: String (Senha do usuário, obrigatório, min length 4)

### 2. LoginStats (Informações de Status)
*   `subscriberCount`: Número inteiro (Total de inscritos mostrados, ex: `25242053`)
*   `activeOnlineCount`: Número inteiro (Total de jogadoras online no momento, ex: `1448`)

### 3. NavigationMenuLink (Links do Menu Lateral)
*   `label`: String (Ex: "Início", "Paqueras", "Personalização")
*   `href`: String (Âncora ou rota de destino)
*   `isActive`: Boolean (Determina o destaque visual)

---

## Validações de Formulário
*   O campo de E-mail deve conter um caractere `@` e um domínio válido.
*   Ambos os campos devem ser preenchidos antes de disparar a ação de login.
