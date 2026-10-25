# Auditoria P4 — revisão visual e acabamento da landing page Fini

Data: 25/10/2026. **Somente auditoria. Nenhuma alteração de site implementada.**

## 1. Diagnóstico e referência aprovada

A página tem uma identidade coerente e já diferencia bem suas seções. O próximo ganho vem de correções locais de legibilidade, foco e enquadramento responsivo; não há justificativa visual para redesenhar hero, Vibes, Clássicos ou Mundo Fini.

Referência desta auditoria: composição P1, motion P2 e integração local de H01-v02 da P3-D, todos aprovados para continuidade local. **H02 permanece em CSS por decisão aprovada**, assim como as argolas. A diferença de materialidade não reabre a produção de H02 nem autoriza refazer H01.

Não foi identificado problema crítico que impeça o uso geral nos cenários examinados. Há cinco correções importantes, seguidas de refinamentos opcionais. Isso não equivale a certificação de acessibilidade ou desempenho em todos os dispositivos.

## 2. Método, evidências e limites

Foi auditado o site atual servido em `http://127.0.0.1:8004/`, com Chrome headless isolado, DPR 1 e cache desativado. Foram feitas novas capturas de navegador, sem gerar imagens de produto ou assets.

Viewports examinados:

- Desktop: 1440 × 900 e 1920 × 1080.
- Tablet: 1024 × 900 e 768 × 1024; inspeção adicional dos controles em 800, 820 e 900 px.
- Mobile: 320 × 900, 375 × 667 e 430 × 900.
- Horizontal: 667 × 375, incluindo menu aberto.

Foram percorridos hero, Vibes, Clássicos, Mundo Fini, História, encerramento e rodapé. As quatro categorias e os cinco clássicos foram selecionados em 1440, 768, 375 e 320 px. Também foram observados entrada de produto, pausa, movimento reduzido, âncora de Vibes e foco no CTA do Mundo Fini.

Dados e capturas: [auditoria/p4-20261025/](auditoria/p4-20261025/). Principais registros: [observacoes.json](auditoria/p4-20261025/resultados/observacoes.json), [complemento.json](auditoria/p4-20261025/resultados/complemento.json) e [detalhes.json](auditoria/p4-20261025/resultados/detalhes.json).

As revelações foram disparadas por navegação/rolagem, sem forçar `visible`. A coleta principal terminou antes dos cenários finais por um erro da automação; o complemento executou esses cenários e terminou sem exceções de runtime registradas. A coleta visual de oito viewports e todas as seleções de Vibes/Clássicos já estava salva.

Para identificar o corte de Tubes, foi feita uma comparação **temporária apenas no DOM da sessão de teste**, retirando o clipping do contêiner. A captura é identificada como diagnóstico; a página foi recarregada depois. Nenhum HTML, CSS ou JavaScript em disco foi alterado.

Limites: sem celular físico, Safari/Firefox, leitor de tela, zoom manual de navegador, tela com cores calibradas, rede lenta ou CPU limitada. Capturas são amostras, não vídeo contínuo nem benchmark de FPS. Não foram reexecutados todos os testes de falha de P3-D, pois o código permaneceu idêntico ao estado aprovado.

## 3. Avaliação por seção

| Seção | O que funciona e deve ser preservado | Acabamento relevante |
|---|---|---|
| Hero | Mensagem/CTA dominantes; embalagem reconhecível; órbitas com oclusão e pausas; H01 realista subordinada ao produto | Controles apertados e parcialmente recortados no tablet; preservar embalagem, trajetória e coreografias |
| Vibes | Composição editorial própria, produto vertical, área curva de cor e abas claras; displays sem esticar | A variação moderada de altura já aprovada continua aceitável; não voltar às reservas vazias anteriores |
| Clássicos | Azul cria boa ruptura; texto e produto equilibrados; disco orgânico ajuda a apresentação; controles têm alvos de pelo menos 44 px nas amostras | Display Tubes sofre corte lateral no mobile; índice horizontal continua pouco explícito para quem não descobre a rolagem |
| Mundo Fini | Cena rosa com camadas reconhecíveis; produto periférico, título central e texto mais estável | Contraste insuficiente nos textos pequenos e foco que se confunde com o fundo; manter parallax e recortes periféricos intencionais |
| História | Pausa de ritmo adequada; mascote e datas organizados; boa separação de texto | Mascote mais suave que as embalagens e linguagem institucional genérica; não há necessidade demonstrada de trocar o asset agora |
| Encerramento/rodapé | Amarelo fecha o percurso; leque funciona como coleção; aviso de conceito independente é importante | Repetição do convite de Vibes e placeholder social ainda comunicam protótipo; tratar como refinamento editorial |

Referências de conjunto: [desktop completo](auditoria/p4-20261025/capturas/1440x900-pagina.png), [tablet completo](auditoria/p4-20261025/capturas/768x1024-pagina.png), [mobile 320 completo](auditoria/p4-20261025/capturas/320x900-pagina.png) e [mobile 430 completo](auditoria/p4-20261025/capturas/430x900-pagina.png).

## 4. Achados críticos

**Nenhum bloqueio crítico reproduzido nesta auditoria.** Não foram observados desaparecimento persistente de conteúdo, imagens quebradas, overflow horizontal global ou exceções do site nas amostras coletadas. A âncora de Vibes revelou o título, e o menu horizontal manteve seus links abaixo da logo e dentro da altura disponível.

Essa classificação diz respeito à experiência local examinada. Publicação continua fora da autorização, e direitos/fidelidade comercial de H01 não passam a estar aprovados por esta auditoria.

## 5. Achados importantes

### I01 — Controles do hero ultrapassam o recorte no tablet

**Confirmado visualmente e por geometria.** Em 768 px, a área útil do documento é 753 px e o botão de avançar termina em x≈769,4 px. Em 800 px, termina em x≈792,8 com área útil de 785 px; em 820 px, x≈807,4 com área útil de 805 px. A seção usa `overflow:hidden`. Parte do controle fica cortada mesmo sem overflow global.

A legenda ocupa apenas cerca de 66 px e quebra em três linhas. O rótulo inicial é particularmente longo. Em 900/1024 px o botão volta a caber, mas a legenda continua apertada.

Evidências: [768 px](auditoria/p4-20261025/capturas/768x1024-hero.png), [800 px](auditoria/p4-20261025/capturas/800-hero-controles.png), medições em `complemento.json`.

**Recomendação:** reservar uma linha de layout própria aos controles no intervalo de tablet estreito, ou ajustar largura/alinhamento do player e da legenda nesse intervalo. Manter alvos de 44 px e a área do produto; não mover ou estreitar a órbita para resolver um problema da interface.

**Aceite:** controles inteiros e legenda legível em 768, 800, 820, 900 e 1024 px, nas cinco embalagens, sem nova colisão com CTA ou arte.

### I02 — Display Tubes perde parte da silhueta em Clássicos no mobile

**Confirmado.** Em 320 px, o contêiner começa em x≈19,2, enquanto a caixa transformada da imagem vai de x≈−14,2 até 317,8. Nem toda essa caixa contém pixels opacos, mas a comparação visual confirma que a lateral esquerda real da embalagem é cortada pelo `overflow-x:clip` de `.classic-stage`.

Comparação: [estado atual](auditoria/p4-20261025/capturas/320-tubes-repouso.png) e [diagnóstico no DOM sem o recorte do contêiner](auditoria/p4-20261025/capturas/320-tubes-diagnostico-sem-clip.png). O diagnóstico revela o vértice que antes ficava oculto; não é uma versão implementada. O mesmo conflito de caixa foi medido em 375 px.

**Recomendação:** ajustar largura óptica e centralização de `.classic-picture img.is-display` no mobile considerando a rotação final de −10°. Preservar inclinação, pista de entrada/saída e proporção nativa. Não simplesmente liberar overflow da página: isso pode reintroduzir rolagem horizontal durante a transição.

**Aceite:** silhueta inteira em repouso e sem corte prejudicial nas trocas, em 320/375/430 px; sem overflow global. Não confundir esse problema com os cortes intencionais de Mundo Fini e do leque final.

### I03 — Textos pequenos de Mundo Fini têm contraste insuficiente

**Confirmado pelas cores e tamanhos computados.** Creme `#fbf6e9` sobre rosa `#eb3477` tem contraste nominal **3,68:1**. O parágrafo usa 14 px desktop e 12 px mobile; a introdução, 18/14 px; a identificação superior, 10 px. Esses textos não se beneficiam da exceção de tamanho grande.

O alvo para texto comum é pelo menos 4,5:1; os grandes títulos têm critério distinto. Não é necessário escurecer toda a seção ou substituir os títulos aprovados. Referência técnica: [W3C — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Evidências: [desktop](auditoria/p4-20261025/capturas/1440x900-mundo.png) e [mobile](auditoria/p4-20261025/capturas/320x900-mundo.png). O lettering translúcido ao fundo torna a leitura local ainda mais variável; 3,68 é a medição nominal do par base, não uma certificação de cada pixel.

**Recomendação:** definir um tratamento localizado de cor para texto pequeno que atinja 4,5:1 nas áreas reais de fundo. A tinta azul atual também precisa ser medida antes de ser usada sobre rosa; não presumir que qualquer azul resolve. Preferir uma tonalidade de tinta suficientemente escura ou um suporte de contraste discreto, sem criar um novo card ou reconstruir a cena.

**Aceite:** parágrafo, introdução e legenda legíveis sobre suas áreas reais de fundo, mantendo o rosa principal, a hierarquia e o título.

### I04 — Anel de foco rosa se confunde com o fundo de Mundo Fini

**Confirmado.** O CTA está em `:focus-visible`, com outline de 3 px e offset de 6 px, ambos sobre o fundo rosa. A cor do outline é exatamente `rgb(235,52,119)`, a mesma cor-base da seção: contraste nominal de 1:1. A pequena elevação do botão não substitui um indicador claramente reconhecível.

Evidência: [foco centralizado no CTA](auditoria/p4-20261025/capturas/1440-world-focus-centralizado.png) e `detalhes.json`. Referência: [W3C — foco visível](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

**Recomendação:** uma variante de foco local para botões nessa seção, por exemplo com anel claro/escuro contrastante ou duas cores. Preservar o padrão global onde ele já funciona.

**Aceite:** localizar o CTA imediatamente ao navegar por Tab e Shift+Tab; indicador persistente e visível em desktop/mobile, sem ser cortado por contêineres.

### I05 — Ticker automático continua sem pausa acessível própria

**Confirmado.** Com o hero pausado, o ticker visível permanece com `animationPlayState:running` e animação `marquee`. Movimento reduzido o deixa estático, e a suspensão fora da tela continua sendo positiva. Porém, quem não usa a preferência de sistema não tem um controle local para parar essa faixa.

Não é defeito do botão do hero, cujo rótulo e escopo são locais. É uma lacuna no controle do movimento do ticker. `aria-hidden` não elimina a distração visual. Referência: [W3C — pausar, parar ou ocultar movimento automático](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

**Recomendação:** oferecer pausa própria claramente rotulada ou tornar essa faixa estática. Preferir a solução menor que preserve o ritmo aprovado. Não ampliar silenciosamente o escopo do botão do hero nem reescrever as coreografias P2.

**Aceite:** parar/retomar o ticker por teclado e ponteiro, com estado compreensível; respeitar movimento reduzido desde o carregamento e sem reativação inesperada.

## 6. Refinamentos opcionais

| ID | Observação | Recomendação proporcional |
|---|---|---|
| O01 | “Instagram / TikTok” e “Espaço reservado neste conceito” deixam o rodapé com aparência de trabalho inacabado | Se a meta for acabamento de apresentação, retirar o bloco reservado ou usar somente destinos oficiais verificados. Preservar o aviso de conceito independente |
| O02 | Índice de Clássicos em 320 px tem 282 px disponíveis para 443 px de conteúdo; Amoras/Tubes ficam fora da área inicial | Manter a rolagem aprovada e considerar uma indicação discreta de continuidade/rolagem. Não reduzir fonte ou alvos para forçar tudo a caber |
| O03 | “Explore a marca no site oficial”, em História, aponta para a categoria de balas de gelatina da loja | Ajustar o rótulo à descoberta de produtos ou usar destino institucional verificado. Não é link quebrado comprovado; é precisão da promessa |
| O04 | História e encerramento usam linguagem abstrata e repetem convites de descoberta | Se houver revisão editorial autorizada, trocar poucas frases por informações/sensações concretas verificadas. Não inventar fatos, datas, sabores ou novos CTAs |
| O05 | Notas como “de sempre. pra sempre.” e microtexto decorativo têm presença fraca; o mascote é mais suave que os packs | Evitar ampliar o ruído para resolver isso. Manter decorativos subordinados; não produzir novos assets sem necessidade demonstrada |
| O06 | A mistura de H01 fotográfica, H02 CSS e argolas sintéticas ainda é perceptível | Registrar como limite aceito. Preservar H01/H02 e argolas agora; não abrir nova rodada de assets nem remover doces aprovados para uniformizar tudo |

## 7. Composição, imagens, tipografia e movimento

**Composição e cor.** Creme → azul → rosa → creme → amarelo produz progressão clara. Vibes deixou de repetir o hero; Clássicos tem personalidade de galeria; Mundo Fini apresenta uma cena. Não se confirmou uma página inteira genérica ou uma hierarquia colapsada. As duas argolas amarelas de Mundo Fini estão espacialmente separadas no mobile; o problema antigo de proximidade não reapareceu nas capturas.

**Imagens e profundidade.** Embalagens são reconhecíveis, com proporções preservadas. Displays ocupam caixas mais largas em vez de serem esticados. O problema demonstrado é o clipping de Tubes no mobile, não a necessidade de substituir todo o acervo. Rotação, escala, sombra e sobreposição já dão profundidade suficiente para esta linguagem; não há evidência que justifique WebGL ou novas fotografias de embalagens nesta rodada.

**Tipografia e espaços.** Fredoka e DM Sans foram carregadas nas oito configurações. Headline e títulos têm escala coerente. No mobile, CTA do hero aparece cedo, mesmo quando a arte continua abaixo da primeira dobra: em 375 × 667 isso não é por si só um defeito. Vibes preserva abas na mesma linha e corpo de texto legível.

A altura do painel Vibes variou de 545 a 578 px em 375 px e de 545 a 577 px em 320 px. Essa variação já foi aprovada em P1; não foi tratada como bug novo, nem se recomenda reintroduzir grandes reservas vazias. O ajuste realmente necessário é a faixa de controles do hero no tablet.

**Movimento.** Há variedade suficiente: hero com cinco gestos por produto, Vibes com respostas de sensação, Clássicos com direção reversível e Mundo com parallax amortecido. História e leque final oferecem outro ritmo. A identidade dos gestos está no código aprovado e foi validada em P2/P3; nesta auditoria foram observadas seleções, estados finais e amostras de troca do hero. Não se declara fluidez perfeita de todas as curvas a partir de três screenshots.

O movimento reduzido manteve hero/órbita estáticos e ticker sem animação na observação atual. Não se recomenda aumentar amplitude, velocidade ou acrescentar animações para disfarçar o acabamento dos assets.

## 8. Acessibilidade, navegação e desempenho

### Verificado nesta passagem

- Sem imagens quebradas ou overflow horizontal global nas oito amostras.
- Quatro Vibes e cinco Clássicos selecionáveis nas quatro larguras examinadas.
- Âncora de Produtos chegou a `#vibes`, com título revelado e visível.
- Menu 667 × 375 com conteúdo abaixo da logo e dentro do viewport; `main.inert` ativo enquanto aberto.
- Botões examinados tinham pelo menos 44 × 44 px; a leitura isolada de uma regra antiga de 37 px seria um falso diagnóstico, pois a cascata aplica mínimos posteriores.
- Zero exceções de runtime ou falhas de rede inesperadas nos eventos registrados. A falha da automação descrita na seção 2 não foi registrada como exceção do site.

### Desempenho: dados e interpretação

Após percorrer a página, o Resource Timing registrou cerca de **0,94–1,03 MB transferidos** nas amostras, conforme recursos/produtos antecipados naquele momento. Esses valores não são o peso inicial nem o total de todos os estados possíveis. H01 usou o WebP de 256 px em DPR 1; o mestre PNG permaneceu fora do carregamento da página.

Foram registrados alguns long tasks e layout shifts de fontes/textos/seções. As somas de shifts sem entrada recente ficaram entre aproximadamente **0,0003 e 0,0207** nesta navegação automatizada. Não são Core Web Vitals de usuários reais nem comparação rigorosa antes/depois. A captura e o ambiente interferem nos tempos.

O `@import` de Google Fonts continua na cadeia de CSS. `backdrop-filter` do header, sombras de imagens e camadas em movimento merecem medição em aparelho modesto antes de otimizações. Não foi reproduzido gargalo que justifique agora remover filtros, instalar biblioteca ou substituir o sistema de animação.

As medições P3-D e os testes de fallback continuam como histórico válido da versão de código preservada; não foram apresentados como testes novos de P4. Acessibilidade completa, zoom de 200%, leitor de tela, Safari/iOS e rede limitada permanecem pendentes.

## 9. Proposta objetiva de execução, após autorização

| Lote | Escopo proposto | Critério de aprovação |
|---|---|---|
| P4-A — Legibilidade e acesso | I03 contraste de texto pequeno, I04 foco e I05 controle do ticker | Contraste medido, foco inequívoco e pausa por teclado; cores principais, hierarquia e motion P2 preservados |
| P4-B — Enquadramento responsivo | I01 player do hero no tablet e I02 display Tubes no mobile | Controles inteiros e embalagem sem corte prejudicial, sem overflow; órbitas e transições com os mesmos parâmetros |
| P4-C — Acabamento editorial opcional | O01/O03; O02/O04/O05 somente se desejados | Destinos/rótulos claros, remoção de aparência de placeholder e descoberta do índice sem redesenhar seções |
| P4-D — Verificação final | Repetir larguras/estados, teclado, movimento reduzido, falhas H01 e captura de transições; complementar com aparelho físico/zoom quando possível | Evidência antes/depois comparável, sem novas regressões e limitações registradas |

O06 é um limite documentado, não uma tarefa autorizada de produção. A proposta não inclui refazer H01, produzir H02, substituir argolas/Mundo Fini, mudar a narrativa visual aprovada ou publicar o site.

Preservar como base de comparação: textos e produtos reais, mesmo viewport, mesma categoria/clássico e, para o hero, mesma embalagem/fase sempre que se comparar enquadramento.

## 10. Integridade e estado final

Os hashes SHA-256 iniciais/finais de **33 arquivos** — HTML, CSS, JavaScript, configurações, WebPs e mestres existentes — foram comparados. Registro: [hashes-iniciais.json](auditoria/p4-20261025/resultados/hashes-iniciais.json) e [integridade-final.json](auditoria/p4-20261025/resultados/integridade-final.json).

Foram criados somente este relatório, scripts e capturas de evidência na pasta de auditoria. Nenhum arquivo do site, asset ou animação foi alterado. Nenhuma imagem de produto foi gerada; sem dependências, commit ou deploy.

**Auditoria entregue. A implementação dos lotes propostos aguarda sua autorização.**
