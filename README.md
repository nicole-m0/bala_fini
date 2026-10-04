# Fini — Abriu. Sorriu.

Redesign conceitual independente da Fini Brasil, em HTML5, CSS3 e JavaScript puro. Não é uma loja e não possui vínculo oficial com a marca.

## Visualizar

Abra `index.html` no navegador. Para servir por HTTP, execute na pasta do projeto:

```sh
python -m http.server 8000
```

Acesse http://localhost:8000. Nenhuma instalação ou etapa de build é necessária. As fontes gratuitas Fredoka e DM Sans vêm do Google Fonts; sem internet, o site utiliza fontes de sistema.

## Estrutura

- `index.html`: conteúdo semântico e seções.
- `css/style.css`: direção visual, responsividade e movimento reduzido.
- `js/script.js`: menu, seletor de vibes, galeria de clássicos, gestos, teclado e animações.
- `assets/images/`: imagens fornecidas, preparadas em WebP com transparência.
- `tools/prepare_assets.py`: preparação opcional dos arquivos de origem; requer Pillow e preserva assets já processados.
- `tools/check_site.mjs`: verificação opcional via protocolo do Chrome, sem pacotes externos. Requer Chrome em modo headless na porta 9223.

## Interações

O seletor de vibes funciona com clique e setas, Home e End no teclado. A galeria de clássicos aceita botões, setas ao receber foco e gestos horizontais no celular. Escape fecha o menu mobile. As animações respeitam `prefers-reduced-motion` e os movimentos de profundidade são simplificados no mobile.

### Refinamento de direção de arte

A hero apresenta Minhocas Azedinhas, Dentaduras, Ursinhos, Amoras e Tubes em uma área fixa. Cada produto fica visível por aproximadamente 4,2 segundos antes da transição com deslocamento, rotação e escala. Palavra, selo e acento de cor acompanham a troca. Os controles permitem pausar ou avançar; o ciclo para fora da tela, em abas ocultas e quando os controles recebem foco. Com movimento reduzido, o avanço é manual.

Três doces percorrem elipses de 12, 17 e 21 segundos, com escala, transparência e ordem de camadas conforme a profundidade. O mobile usa dois doces. A seção Mundo Fini tem seis planos visuais e velocidades de scroll distintas, calculadas em `requestAnimationFrame`; no mobile, o parallax fica estático. As demais seções têm movimentos próprios: máscara lateral no seletor, contraponto entre produto/número nos Clássicos, revelação calma na história e entrada em leque no encerramento.

O header ganha uma superfície flutuante ao rolar e um menu mobile em tela cheia com contenção do foco. A linha que vinha embutida na imagem da logo foi removida. O asset `caixafini5.webp`, encontrado com 0 bytes, foi refeito a partir do PNG fornecido; o processamento agora valida arquivos existentes e salva via arquivo temporário para evitar exports parciais. A validação também decodifica todos os WebPs.

## Referência e créditos

Referência: https://www.finistore.com.br/balas-de-gelatina. Informações institucionais utilizadas: chegada ao Brasil em 1998 e fábrica própria em Jundiaí em 2001. Imagens fornecidas pela pessoa solicitante; marca, embalagens e personagens pertencem aos respectivos titulares. Os links de compra levam à loja oficial; redes sociais são identificadas como espaço reservado. Sem preços ou promoções.
