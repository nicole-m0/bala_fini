# Fini — Abriu. Sorriu.

Redesign conceitual independente da Fini Brasil, em HTML5, CSS3 e JavaScript puro. Não é uma loja e não possui vínculo oficial com a marca.

## Estado atual — P5-A

A P4-D foi aprovada para encerramento da revisão visual e funcional local. A P5-A prepara uma distribuição isolada, sem publicação.

```sh
node tools/build_dist.mjs
python -m http.server 8015 --bind 127.0.0.1 --directory dist
```

Acesse http://127.0.0.1:8015/. Use Node.js 22 ou superior e Python 3. Sirva exclusivamente `dist/` para revisar a saída pública: a raiz contém acervo interno.

`tools/publication-allowlist.json` permite somente 21 arquivos. O build verifica SHA-256, preserva originais e interrompe diante de arquivos extras ou links simbólicos em `dist/`, sem apagá-los automaticamente. O inventário fica fora da saída, em `auditoria/p5-a-20261026/distribution-inventory.json`.

`vercel.json` configura `framework: null`, `buildCommand: "node tools/build_dist.mjs"` e `outputDirectory: "dist"`. `.vercelignore` restringe os insumos de eventual upload pela CLI. Nenhuma configuração remota foi acessada ou alterada. Auditorias, backups, relatórios, ZIPs, referências, mestres, scripts de teste e segredos ficam fora da distribuição.

Com o servidor ativo, `python tools/check_dist.py` confere recursos e acessos negativos. As suítes existentes adaptadas para HTTP estão em `auditoria/p5-a-20261026/`, com logs e evidências; requerem Chrome headless/CDP na porta 9235. Resultados em [RELATORIO-P5-A-FINI.md](RELATORIO-P5-A-FINI.md).

Os WebPs H01-v02 de 256 e 512 px integram a saída; H02 continua com gradiente CSS. Não há fontes locais: Google Fonts e o fallback já existente foram preservados. Layout, animações e assets aprovados não foram alterados. Os placeholders de redes sociais foram removidos na P4-C e permanecem ausentes.

Marca e imagens continuam com autorizações pendentes, registradas separadamente em [PENDENCIAS-AUTORIZACAO-FINI.md](PENDENCIAS-AUTORIZACAO-FINI.md). Sem commit ou deploy. Aguardando revisão do usuário antes de qualquer publicação.

## Documentação permanente e acervo local

O [resumo técnico P1–P5](RESUMO-TECNICO-FINI.md) consolida a evolução, validações, limitações e configuração atual. A [revisão de prontidão para portfólio](RELATORIO-P5-B-FINI.md) foi encerrada documentalmente; o projeto permanece um estudo independente, sem contratação ou parceria com a Fini e sem autorização presumida de divulgação.

Relatórios históricos P1–P5-A, ZIPs, auditorias, capturas, perfis, backups e provas ficam preservados localmente e ignorados pelo Git; seus links e comandos históricos de auditoria dependem desse acervo e não estarão disponíveis num checkout limpo. Eles não são necessários para gerar ou servir a landing. `dist/` também é gerada e ignorada. Referências de origem e mestres de produção continuam preservados; nada foi apagado nesta organização.

Consulte o [relatório de organização do Git](RELATORIO-LIMPEZA-GIT-FINI.md) antes de considerar qualquer exclusão física. Não apague registros de autorização ou procedência como se fossem cache. O teste HTTP `tools/check_dist.py` funciona também sem os backups históricos.

## Visualizar os originais localmente

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

Referência: https://www.finistore.com.br/balas-de-gelatina. Informações institucionais utilizadas: chegada ao Brasil em 1998 e fábrica própria em Jundiaí em 2001. Imagens fornecidas pela pessoa solicitante; marca, embalagens e personagens pertencem aos respectivos titulares. Os links de compra levam à loja oficial; o bloco de redes sociais foi removido na P4-C, sem URLs fictícias. Sem preços ou promoções. H01-v02 é uma edição generativa baseada em referências. A aprovação visual não comprova autorização para divulgação pública.
