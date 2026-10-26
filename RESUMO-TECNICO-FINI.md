# Fini — resumo técnico consolidado P1–P5

Atualizado em 26/10/2026. Landing page em HTML, CSS e JavaScript puro. Estudo de caso independente para demonstrar habilidades de desenvolvimento web e atrair clientes do portfólio da autora. Sem contratação, parceria ou autorização presumida da Fini.

## Evolução e validação

| Etapa | Resultado consolidado |
|---|---|
| P1 | Refinamento da direção visual e responsividade: hierarquia do hero, composição de Vibes, menu em orientação horizontal e revelações. Preservadas embalagens e identidade do conceito |
| P2 | Coreografia do hero, órbitas com profundidade, transições próprias de Vibes e Clássicos, parallax e pausas; versões simplificadas no mobile e respeito a movimento reduzido |
| P3 | Produção H01-v01/v02 e integração local de H01-v02, com WebPs de 256/512 px e fallback CSS. H02 permanece em CSS, sem nova imagem. Referências e mestres preservados separadamente |
| P4-A/B/C | Ajustes localizados de acessibilidade, contraste/foco, pausa do ticker, enquadramento e controles do player/tablet, Tubes no mobile, índice rolável e revisão editorial. Removidos placeholders sociais e URLs fictícias |
| P4-D | Encerramento visual/funcional local aprovado pelo usuário. 11 viewports de 320 a 1920 px, incluindo horizontal e tablets; 154 estados finais de hero/Vibes/Clássicos examinados. Sem overflow global ou imagens quebradas nas amostras normais |
| P5-A | Preparação técnica aprovada: saída isolada por allowlist em `dist/`, 21 arquivos/1.367.571 bytes. Testes existentes em sete larguras, recursos HTTP íntegros e 21 tentativas de acesso interno com 404. Sem deploy |
| P5-B | Revisão documental encerrada e aprovada. Apresentação recomendada como estudo independente; versão Fini permanece local enquanto direitos não estiverem esclarecidos. Alternativa: demo separada com identidade fictícia e recursos próprios/licenciados |

Os relatórios extensos, ZIPs, capturas, logs, backups e perfis de navegador são acervo local de revisão, ignorado pelo Git após a organização. Não são necessários para executar a landing ou seu build. Os números acima resumem testes anteriores, não constituem novos testes em produção.

## Implementação preservada

- `index.html`, `css/style.css`, `js/script.js`: fonte da landing aprovada.
- `assets/images/`: imagens do acervo original, incluindo os dois WebPs H01-v02 usados pelo site; não houve remoção de assets históricos nesta organização.
- `tools/build_dist.mjs` e `tools/publication-allowlist.json`: build por lista explícita, sem transformação visual, com cópias verificadas por SHA-256 e recusa de arquivos extras na saída.
- `tools/check_site.mjs`, `tools/validate_files.py`, `tools/check_dist.py`: verificações preservadas. Scripts de preparação também preservados.
- `vercel.json`: `framework: null`, `buildCommand: "node tools/build_dist.mjs"`, `outputDirectory: "dist"`. `.vercelignore` limita insumos de eventual upload; `.gitignore` organiza o versionamento, sem definir autorização de publicação.

Para gerar e servir somente a saída:

```sh
node tools/build_dist.mjs
python -m http.server 8015 --bind 127.0.0.1 --directory dist
```

Com o servidor ativo, `python tools/check_dist.py`. O build gera seu inventário em `auditoria/p5-a-20261026/`, pasta local ignorada. Não sirva a raiz do projeto como saída pública.

## Competências demonstradas e limites

Hero com cinco produtos, pausa/retomada e seleção manual; Vibes por clique/setas/Home/End; Clássicos com botões, teclado e swipe; menu com Escape/contenção de foco; ticker com pausa própria; órbitas e parallax em camadas; `prefers-reduced-motion` e fallback de H01.

A validação P4-D inclui contraste mínimo de 4,561:1 nas regiões examinadas de Mundo Fini, foco visível, estados ARIA e alvos do player de pelo menos 44 × 44 px nos estados amostrados. Isso não certifica toda a página como WCAG conforme. Não houve leitor de tela real, zoom manual de 200%, celular físico, cobertura de todos os navegadores ou métricas de campo. Não alegar 60 fps, modelo 3D, conversões comerciais ou Core Web Vitals de produção.

Fredoka e DM Sans continuam externas via Google Fonts, com fallback de sistema. A distribuição tem 18 imagens e três arquivos de implementação; não contém fontes locais, relatórios, ferramentas, mestres ou referências.

## Procedência e pendências preservadas

As imagens de embalagens, displays, logo e mascote foram fornecidas no acervo local; o processamento está documentado em `tools/prepare_assets.py`. Isso não comprova autoria ou autorização para divulgação profissional. H01-v02 foi produzido com edição generativa baseada em R06/R07, de origem registrada na FiniStore; não deve ser descrito como fotografia própria nem como asset cedido pela marca para este projeto.

Permanecem versionáveis os registros `design/p3-candies/referencias/REFERENCIAS.md`, `design/p3-candies/referencias/oficial/ORIGEM.json`, referências originais, prompts e mestres. O registro de origem declara direitos de publicação não confirmados. Documentos antigos do acervo P3 podem descrever estados históricos de produção, sem prevalecer sobre o estado integrado atual.

Documentos permanentes:

- [Pendências de autorização](PENDENCIAS-AUTORIZACAO-FINI.md): continuam abertas para marca, imagens de produto, mascote e referências/derivação H01.
- [Prontidão para portfólio](RELATORIO-P5-B-FINI.md): inventário por arquivo, textos propostos, riscos de confusão, alternativas neutras e checklist. O aviso de caráter conceitual não encerra os direitos.
- [Organização do Git](RELATORIO-LIMPEZA-GIT-FINI.md): exclusões apenas do índice, inventário para eventual remoção física e verificações.

Nenhum encerramento técnico/documental autoriza publicação. Qualquer divulgação depende da resolução aplicável das pendências, revisão humana e autorização expressa do usuário. Sem commit, push ou deploy nesta organização.
