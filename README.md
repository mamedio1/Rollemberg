# Emive · Smart Alarm — Landing Page

Landing page de conversão para franqueado da **Emive Segurança Eletrônica** (Brasília/DF).
Site institucional de página única cujo objetivo é levar o visitante ao WhatsApp comercial para solicitação de orçamento.

**No ar:** https://www.monitoramentobsb.com.br

---

## Visão geral

| Item | Valor |
|---|---|
| Tipo | Landing page estática, single-page, sem build |
| Idioma | `pt-BR` |
| Objetivo | Geração de lead via WhatsApp (sem formulário) |
| Stack | HTML5 + CSS3 (vanilla) + JavaScript (vanilla, sem dependências) |
| Hospedagem | Cloudflare (`server: cloudflare`, Cloudflare Web Analytics beacon) |
| Peso do HTML | ~12 KB · CSS ~9,4 KB · JS ~5,1 KB |

---

## Estrutura de arquivos

```
.
├── index.html          # Marcação completa da página
├── styles.css          # Layout, tokens de cor e responsividade
├── effects.js          # Efeitos de brilho/glow nos botões (opcional e removível)
└── img/
    ├── Layer_1.png             # Logo Emive (topbar) — 80×66
    ├── Frame 14.png            # Hero: família em ambiente seguro — 1920×700
    ├── Sistema Smart 1.png     # Kit do Sistema Smart Emive — 979×494
    ├── Frame 23.png            # Faixa de cards (monitoramento/alarme/câmeras) — 1609×176
    ├── Super App Emive 1.png   # SuperApp em smartphone — 785×524
    ├── Camera cerebro 1.png    # Câmera com IA (rodapé) — 413×438
    └── Layer_2.png             # Logo Emive Segurança Eletrônica (rodapé) — 102×84
```

Sem `package.json`, bundler ou pré-processador: os arquivos são servidos como estão.

---

## Seções da página

| Ordem | Elemento | Classe | Conteúdo |
|---|---|---|---|
| 1 | `<header>` | `.topbar` | Logo, claim *"Segurança para o seu lar ou o seu negócio — Viva a Tranquilidade"* e botão **CONTRATAR** |
| 2 | `<section>` | `.hero` | Imagem de destaque + CTA sobreposto |
| 3 | `<section>` | `.sistema` | *"Sistema Smart Emive com Inteligência Artificial Aplicada"* + CTA **SOLICITE SEU ORÇAMENTO** |
| 4 | `<section>` | `.cards` | Faixa gráfica: Monitoramento 24h · Alarme monitorado · Câmeras de segurança |
| 5 | `<section>` | `.app` | **SuperApp Emive** — lista de benefícios (Controle de acesso, Tecnologia, Comodidade) + CTA **QUERO PARTICIPAR** |
| 6 | `<section id="orcamento">` | `.cta` | *"Faça agora seu orçamento"* + CTA **WHATSAPP** |
| 7 | `<footer>` | `.footer` | Imagem da câmera com IA + logo institucional |

### Conversão

Todos os CTAs apontam para o mesmo destino, em nova aba, com mensagem pré-preenchida:

```
https://wa.me/61996239612?text=Olá! Posso ter mais informações sobre esse sistema de segurança?
```

Atributos `target="_blank" rel="noopener noreferrer"` aplicados em todos os links externos.

---

## Design system

Tokens declarados em `:root` no `styles.css`:

```css
--yellow:       #FFC709;   --orange-a:   #F68B24;
--yellow-light: #FDE24B;   --orange-b:   #FFC709;
--highlight:    #FFE500;   --card-bg:    #EDEEF0;
--dark:         #333333;   --ink:        #111111;
--black:        #000000;   --gray:       #4D4D4D;
--white:        #FFFFFF;
--grad-orange:  linear-gradient(90deg, var(--orange-a) 0%, var(--orange-b) 100%);
--content:      1600px;    /* largura máxima do container .wrap */
```

- **Tipografia:** Inter (Google Fonts, pesos 300–900, `display=swap`, com `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`).
- **Botões:** `.btn-contratar` (topbar) e `.btn-orange` / `.btn-orange--wide` (gradiente laranja).
- **Responsividade:** breakpoints em `1200px`, `960px` e `560px`.

---

## `effects.js` — efeitos de botão

Script autocontido, aditivo e reversível: injeta o próprio `<style id="emive-fx">` e **não altera o `styles.css`**. Para desativar por completo, basta remover a tag `<script src="effects.js">` do `index.html`.

O que faz:

- **Shimmer** — reflexo diagonal percorrendo o botão em ciclo de 5,5 s.
- **Glow** — "respiração" do `box-shadow` (4,5 s) apenas nos botões laranja.
- **Stagger** — cada botão recebe um `--fx-delay` negativo (defasagem até 4,2 s + jitter aleatório), de modo que cintilem alternadamente e não em bloco.
- **Hover** — dispara um brilho único e mais intenso (reflow forçado para reiniciar a animação).
- **Performance** — `IntersectionObserver` (threshold 0.15) ativa a animação só quando o botão está visível; sem suporte, cai para animação sempre ativa.
- **Acessibilidade** — retorna imediatamente se `prefers-reduced-motion: reduce`, desligando todos os efeitos.

Parâmetros centralizados no objeto `CONFIG` no topo do arquivo:

```js
var CONFIG = {
  sweepDur:   5.5,   // ciclo do shimmer (s)
  glowDur:    4.5,   // ciclo do glow (s)
  maxStagger: 4.2,   // defasagem máxima entre botões (s)
  shineAlpha: 0.42,  // intensidade do reflexo em repouso
  hotAlpha:   0.60   // intensidade do reflexo no hover
};
```

---

## Rastreamento e analytics

| Ferramenta | Identificador |
|---|---|
| Google Tag Manager | `GTM-WS9KBNNS` |
| Google Analytics 4 (via GTM) | `G-XKC42FT78L` |
| Meta Pixel | `1597639005308917` e `2324107895019209` (dois pixels, evento `PageView`) |
| Cloudflare Web Analytics | `beacon.min.js` |

> Os IDs de GTM e dos pixels ficam em scripts inline no `<head>` do `index.html`. Ao replicar a página para outro franqueado, **troque esses IDs e o número de WhatsApp** antes de publicar.

---

## SEO

```html
<html lang="pt-BR">
<title>Emive · Smart Alarm — Proteja sua casa ou o seu negócio</title>
<meta name="description" content="Sistema Smart Emive com Inteligência Artificial aplicada.
Proteja sua casa ou o seu negócio com monitoramento 24h, alarme monitorado e câmeras de segurança.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Todas as imagens possuem `alt` descritivo; a hierarquia usa `<h2>` por seção e o logo da topbar tem `aria-label`.

---

## Rodando localmente

Como é estático, qualquer servidor HTTP resolve (abrir via `file://` funciona, mas quebra caminhos relativos em alguns navegadores):

```bash
python3 -m http.server 8000
# ou
npx serve .
```

Acesse `http://localhost:8000`.

---

## Deploy

1. Ajuste conteúdo/imagens em `index.html` e `img/`.
2. Publique os arquivos na raiz do domínio (Cloudflare Pages / hospedagem estática atrás do Cloudflare).
3. Purgue o cache do Cloudflare após alterações em `styles.css` / `effects.js`.

Cabeçalhos observados em produção: `cache-control: public, max-age=0, must-revalidate`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, compressão Brotli e HTTP/3 (`alt-svc: h3`).

---

## Personalização rápida (novo franqueado)

| O que trocar | Onde |
|---|---|
| Número do WhatsApp e texto da mensagem | Todos os `href="https://wa.me/..."` do `index.html` |
| ID do GTM | Script inline no `<head>` e `<noscript>` |
| IDs do Meta Pixel | Script inline `fbq("init", ...)` |
| Paleta | Bloco `:root` em `styles.css` |
| Imagens | `img/` (manter as proporções listadas acima) |
| Title e description | `<head>` do `index.html` |

---

## Melhorias mapeadas

- [ ] Converter as imagens para **WebP/AVIF** — o hero em PNG 1920×700 é o maior peso da página.
- [ ] Adicionar `loading="lazy"` e `decoding="async"` nas imagens abaixo da dobra.
- [ ] Renomear arquivos de imagem sem espaços (`frame-14.png` no lugar de `Frame 14.png`) para evitar URL-encoding.
- [ ] Incluir **Open Graph** e **Twitter Card** (a página ainda não tem preview em compartilhamentos).
- [ ] Adicionar favicon e `apple-touch-icon`.
- [ ] Padronizar caminhos relativos (`img/` vs `./img/`).
- [ ] Marcar evento de conversão (clique no WhatsApp) no GTM/Pixel, hoje só há `PageView`.
- [ ] Considerar `schema.org/LocalBusiness` (JSON-LD) para SEO local em Brasília.
- [ ] Enriquecer o rodapé com CNPJ, endereço, telefone e redes sociais — atualmente traz apenas imagens.

---

## Autoria

Desenvolvido por **Robson Araujo** — desenvolvedor e designer UI/UX.
Projeto de landing page para franqueado da Emive Segurança Eletrônica.
