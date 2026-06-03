# Quickstart - Login Screen Amor Doce

Este guia ajuda a configurar e testar a nova tela de login localmente.

## Configuração Local

1.  Certifique-se de que o servidor local está em execução:
    ```bash
    npm run dev
    ```
2.  Acesse `http://localhost:3000/login` ou a página principal `/` (onde a tela de login será exibida).

## Fluxo de Teste Manual

1.  **Carregamento Inicial**: Abra o navegador e verifique se o logotipo centralizado e a imagem de fundo dos paqueras (`crush.jpg`) aparecem corretamente.
2.  **Validação**: Clique no botão "Entrar" sem digitar e-mail e senha. Os campos devem indicar erro visual.
3.  **Login Simulado**: Insira um e-mail válido (ex: `teste@amordoce.com`) e qualquer senha. Clique em "Entrar" e confirme o redirecionamento ou fluxo de autenticação simulada.
