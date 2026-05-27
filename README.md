# GoldCoin (GLD) — A Moeda da Nova Era
### Website Oficial — Puerto Esperanza RP

---

## Estrutura de Ficheiros

```
goldcoin/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Estilos
├── js/
│   └── main.js         ← JavaScript
├── assets/             ← Pasta para imagens (logo, etc.)
│   └── (coloca aqui: goldcoin-logo.png, whitepaper.png, etc.)
└── README.md
```

---

## Como Publicar no GitHub Pages

### 1. Criar repositório no GitHub
- Vai a github.com → New Repository
- Nome sugerido: `goldcoin-gld` ou `goldcoin`
- Deixa como **Public**
- Não inicializes com README (já tens um)

### 2. Fazer upload dos ficheiros
```bash
# No terminal, na pasta do projeto:
git init
git add .
git commit -m "feat: lançamento inicial GoldCoin website"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/goldcoin-gld.git
git push -u origin main
```

### 3. Ativar GitHub Pages
- No repositório → Settings → Pages
- Source: `Deploy from a branch`
- Branch: `main` → folder: `/ (root)`
- Save → aguarda 2-3 minutos
- URL padrão: `https://SEU_USERNAME.github.io/goldcoin-gld`

---

## Domínio Gratuito — Opções Recomendadas

### Opção 1: FreeDNS (afraid.org) — MAIS RÁPIDO
- Registo: https://freedns.afraid.org/signup/
- Cria uma conta → "Add Subdomain"
- Tipo: CNAME
- Subdomain: `goldcoin` (ou outro)
- Domain: escolhe um dos domínios disponíveis (ex: `.mooo.com`, `.us.to`, `.crabdance.com`)
- Destination: `SEU_USERNAME.github.io`
- Resultado: `goldcoin.mooo.com` ou similar

### Opção 2: EU.org — MAIS CREDÍVEL (leva 2-4 semanas para aprovação)
- Registo: https://nic.eu.org/arf/en/login/
- Podes registar algo como `goldcoin.eu.org`
- Gratuito e permanente, ótimo para projetos sérios

### Opção 3: js.org — PARA PROJETOS JS/GITHUB PAGES
- https://js.org/
- Processo: fazer PR no repositório deles
- Resultado: `goldcoin.js.org`

---

## Configurar Domínio Personalizado no GitHub Pages

### No GitHub:
1. Settings → Pages → Custom domain
2. Escreve o teu domínio (ex: `goldcoin.mooo.com`)
3. Clica Save
4. Activa "Enforce HTTPS" quando disponível

### Cria ficheiro CNAME na raiz do projeto:
```
goldcoin.mooo.com
```
(apenas uma linha com o teu domínio)

---

## Adicionar as Imagens

Coloca na pasta `assets/`:
- `goldcoin-logo.png` — o logo da moeda
- `whitepaper-preview.png` — preview do whitepaper

No `index.html`, podes substituir o coin visual CSS pelo teu logo:
```html
<!-- Substitui a div .coin-body por: -->
<img src="assets/goldcoin-logo.png" alt="GoldCoin" style="width:80%; border-radius:50%;" />
```

---

## Personalização Rápida

### Mudar preço e stats:
No `js/main.js`, linha ~115:
```js
const BASE_PRICE = 2208.08; // ← altera aqui
```

### Mudar textos:
Todos os textos estão no `index.html` — procura e substitui directamente.

### Mudar cores:
No `css/style.css`, no topo em `:root {}`:
```css
--gold-bright: #F0C040;  /* ouro claro */
--gold-mid: #C9A227;     /* ouro principal */
```

---

## Nota
Este é um projeto **fictício** para roleplay no servidor Puerto Esperanza.  
GoldCoin não é uma criptomoeda real.
