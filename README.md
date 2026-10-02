# Quiz Especial pra Ketlle ❤️

Um quiz romântico e interativo criado como presente digital. A ideia é que a Ketlle receba o link, abra no celular e responda 20 perguntas sobre o relacionamento, sem precisar de cadastro ou login.

## 🚀 Como funciona

- **Sem login/cadastro:** Ela só abre o link e começa
- **Progresso salvo:** Se fechar o navegador, continua de onde parou
- **Envio automático:** As respostas vão para uma planilha Google (via Apps Script)
- **Plano B:** Botão de WhatsApp caso o envio automático falhe
- **Surpresa final:** Fotos do casal com confetes
- **Painel secreto:** Você pode ver as respostas em `/painel` com uma chave

## 📋 Pré-requisitos

- Node.js 20+
- npm
- Conta Google (para o Apps Script)
- Conta GitHub (para hospedagem)

## 🔧 Configuração

### 1. Instalar dependências

```bash
cd pra-ketlle
npm install
```

### 2. Configurar o Apps Script

Este é o passo mais importante para receber as respostas automaticamente.

#### Passo a passo (5 minutos):

1. **Criar a planilha:**
   - Acesse [sheets.google.com](https://sheets.google.com)
   - Crie uma nova planilha (o nome não importa, o script vai criar automaticamente)

2. **Abrir o Apps Script:**
   - Na planilha, vá em **Extensões** → **Apps Script**
   - Apague todo o código que já estiver lá

3. **Colar o código:**
   - Abra o arquivo `apps-script/Code.gs` deste projeto
   - Copie todo o conteúdo
   - Cole no editor do Apps Script

4. **Definir a chave do painel:**
   - No editor do Apps Script, clique em **Executar** → `definirChavePainel`
   - Na caixa que abrir, digite uma senha secreta (ex: `minhaChaveSecreta123`)
   - Clique em **Revisar permissões** → **Avançado** → **Ir para Apps Script (não seguro)**
   - Escolha sua conta e clique em **Permitir**
   - Anote essa chave! Você vai precisar dela para acessar o painel

5. **Publicar como Web App:**
   - Clique no botão azul **Implantar** → **Novo implantamento**
   - Selecione **App da Web**
   - Descrição: `Quiz`
   - **Executar como:** `Eu`
   - **Quem tem acesso:** `Qualquer pessoa`
   - Clique em **Implantar**
   - Copie a **URL do app da Web** (algo como `https://script.google.com/macros/s/.../exec`)

6. **Configurar no projeto:**
   - No seu repositório GitHub, vá em **Settings** → **Secrets and variables** → **Actions**
   - Clique em **New repository secret**
   - Name: `VITE_SCRIPT_URL`
   - Value: cole a URL que você copiou
   - Clique em **Add secret**

### 3. Adicionar as fotos

1. Comprima as 4 fotos do casal:
   - Máximo 1600px no lado maior
   - Qualidade ~80%
   - **Remova os metadados EXIF** (localização)
   - Você pode usar ferramentas online como [TinyPNG](https://tinypng.com) ou [ImageOptim](https://imageoptim.com)

2. Renomeie as fotos para:
   - `foto1.jpg`
   - `foto2.jpg`
   - `foto3.jpg`
   - `foto4.jpg`

3. Coloque-as na pasta `public/fotos/`

### 4. (Opcional) Adicionar música

Se quiser música de fundo:
1. Coloque o arquivo MP3 em `public/musicas/`
2. Renomeie para `nossa-musica.mp3`
3. A música já está configurada no `src/config.ts`

### 5. Personalizar (opcional)

Edite `src/config.ts` para alterar:
- Nomes
- Número do WhatsApp
- Mensagem final
- Cores do tema

Edite `src/data/perguntas.ts` para:
- Alterar perguntas existentes
- Adicionar novas perguntas
- Mudar opções

## 🏃 Rodar localmente

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## 🚀 Fazer deploy no GitHub Pages

1. **Inicializar o Git:**
   ```bash
   cd pra-ketlle
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Criar o repositório no GitHub:**
   - Acesse [github.com/new](https://github.com/new)
   - Nome do repositório: `pra-ketlle`
   - **Importante:** Deixe público (GitHub Pages gratuito exige isso)
   - Não adicione README, .gitignore ou licença (já temos)
   - Clique em **Create repository**

3. **Conectar e push:**
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/pra-ketlle.git
   git branch -M main
   git push -u origin main
   ```

4. **Ativar GitHub Pages:**
   - No repositório, vá em **Settings** → **Pages**
   - Em **Build and deployment** → **Source**, selecione **GitHub Actions**
   - O workflow já está configurado em `.github/workflows/deploy.yml`

5. **Aguardar deploy:**
   - Vá em **Actions** no repositório
   - Aguarde o workflow terminar (aprox. 2-3 minutos)
   - O site estará disponível em `https://SEU_USUARIO.github.io/pra-ketlle/`

## 🔐 Acessar o painel

1. Acesse `https://SEU_USUARIO.github.io/pra-ketlle/painel`
2. Digite a chave que você definiu no Apps Script
3. A chave fica salva no seu navegador (localStorage)

## 🔄 Zerar o quiz para responder de novo

Se a Ketlle quiser responder de novo:

1. **No celular dela:**
   - Abra o link do quiz
   - No navegador, vá em configurações
   - Limpe os dados do site ou o cache
   - Recarregue a página

2. **Na planilha:**
   - Abra a planilha Google
   - Apague a linha com as respostas anteriores (opcional)

## 📱 Links finais

Depois do deploy, você terá dois links:

- **Quiz (para a Ketlle):** `https://SEU_USUARIO.github.io/pra-ketlle/`
- **Painel (só para você):** `https://SEU_USUARIO.github.io/pra-ketlle/painel`

## 🔒 Privacidade

- O repositório é público (exigência do GitHub Pages gratuito)
- Mas o site não aparece em buscadores:
  - `robots.txt` bloqueia tudo
  - Meta tags `noindex, nofollow`
  - Título genérico ("Quiz Especial")
- As respostas **não ficam no repositório**
- As respostas ficam só na sua planilha Google
- As fotos têm EXIF removido (sem localização)

## 🛠️ Stack

- **Vite** - Build tool
- **React + TypeScript** - Framework
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animações
- **canvas-confetti** - Confetes
- **Google Apps Script** - Backend sem servidor

## 📝 Estrutura do projeto

```
pra-ketlle/
├── public/
│   ├── fotos/          # Fotos do casal
│   ├── musicas/        # Música de fundo (opcional)
│   └── robots.txt      # Bloqueia buscadores
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas (Quiz, Final, Painel)
│   ├── data/           # Perguntas
│   ├── config.ts       # Configurações editáveis
│   └── main.tsx        # Entry point
├── apps-script/
│   └── Code.gs         # Google Apps Script
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions
```

## 💡 Dicas

- Teste no celular antes de enviar para a Ketlle
- Verifique se o número do WhatsApp está correto (formato: 55XXXXXXXXXXX)
- A chave do painel fica no Apps Script, não no código do site
- Se o envio automático falhar, o botão de WhatsApp sempre funciona

## 🐛 Problemas comuns

**Site não atualiza após mudanças:**
- Limpe o cache do navegador
- Aguarde o GitHub Actions terminar (2-3 minutos)

**Apps Script retorna erro:**
- Verifique se a URL está correta nos Secrets
- Verifique se o Web App está com "Quem tem acesso: Qualquer pessoa"

**Painel não acessa:**
- Verifique se a chave está correta
- Limpe o localStorage do navegador

**Fotos não aparecem:**
- Verifique se estão em `public/fotos/`
- Verifique se os nomes estão corretos (foto1.jpg, foto2.jpg, etc.)

## ❤️ Feito com amor

Este projeto foi criado especialmente para celebrar o relacionamento. Espero que a Ketlle ame! 💕
