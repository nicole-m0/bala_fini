# Plano P3 — Materialidade e novos assets Fini

Data da revisão: 25/10/2026.

Estado: **planejamento técnico e visual; implementação e produção de imagens ainda não autorizadas.**

## 1. Base de trabalho e limites

Foram lidos integralmente `AUDITORIA-VISUAL-FINI.md`, incluindo a seção 22, `RELATORIO-P1-FINI.md` e `RELATORIO-P2-FINI.md`. Também foram conferidos o HTML, a cascata CSS, a lógica de animação e os scripts de preparação/validação atuais.

A referência válida é o estado P2 aprovado, que incorpora a composição P1. As limitações históricas de acesso ao navegador da auditoria inicial não substituem os resultados posteriores. Da mesma forma, os resultados de P2 não provam a qualidade ou o desempenho de assets que ainda não existem.

Este plano já existia no workspace e foi revisado nesta etapa contra os três documentos e o código atual. Somente este documento foi atualizado. Não foram alterados arquivos do site, geradas imagens, substituídos doces, instaladas dependências ou executados commit/deploy. Não foi realizada uma nova sessão de testes visuais no navegador. A imagem local `assets/images/balafini6.webp` foi consultada como referência de embalagem e aparência geral das Minhocas Azedinhas, não como uma fotografia macro de produção. A aprovação de P2 informada nesta solicitação passa a ser a referência; o estado “aguardando revisão” do relatório P2 é histórico e seu arquivo permanece preservado.

## 2. Decisão de direção de arte

**Prioridade: transformar as duas minhocas orbitais do hero em doces reconhecíveis, táteis e compatíveis com o produto real.** Preservar posições, tamanho óptico, ciclos, pausas e passagem entre planos aprovados em P2.

Não converter toda a decoração em fotografia. A combinação desejada é:

- Embalagens e doces: materialidade, textura e volume.
- Estrelas, trajetórias, selos, linhas e campos de cor: linguagem gráfica da marca.
- Tipografia e interface: nitidez, legibilidade e resposta imediata.

O primeiro lote não troca automaticamente os doces conforme cada embalagem da campanha. Essa associação exigiria mais referências, arquivos e decisões de conteúdo visual; fica como expansão opcional, não como requisito para elevar a qualidade dos orbitais atuais.

## 3. Inventário completo de doces CSS

Há **sete instâncias** de `.candy` no HTML: três minhocas e quatro argolas. A contagem inclui uma argola oculta em Vibes. Pela cascata atual, seis são visíveis no desktop e quatro no mobile, considerando as respectivas seções quando em tela. As instâncias não são sete tipos diferentes de produto.

| ID do plano | Seletor / local | Aparência CSS e dimensões-base | Movimento atual | Decisão |
|---|---|---|---|---|
| H01 | `.hero-art .w1.satellite` | Minhoca azul-claro/rosa por gradiente, contorno pontilhado, volume por sombras internas; 100 × 33 px desktop; 65 × 23 px mobile | Órbita de 12 s; fase 3,8; trilha 0; balanço, escala, opacidade e camadas | **Primeiro asset a substituir** |
| H02 | `.hero-art .w2.satellite` | Minhoca amarelo/rosa; 85 × 30 px desktop; oculta abaixo de 768 px | Órbita de 17 s; fase 0,7; trilha 1; mesma família de balanço com deslocamento de fase | **Segundo asset a substituir** |
| H03 | `.hero-art .r1.satellite` | Argola rosa: borda espessa, sombras e pontilhado; 63 × 63 px desktop; 42 × 42 px mobile | Órbita de 21 s; fase 2,3; trilha 0; rotação própria, escala, opacidade e camadas | Asset **condicionado a referência real verificável** |
| V01 | `.vibe-art .ring` | Argola rosa remanescente, mas `display:none` em P1/P2 | Não aparece nem recebe a coreografia sensorial atual | **Não produzir asset nem reativar** |
| C01 | `.section-bridge` na saída de Clássicos | Argola amarela que atravessa visualmente a borda de Mundo Fini; 90 × 90 px desktop; 58 × 58 px mobile | Pose fixa de −18°; acompanha o fluxo da página; não é uma órbita nem uma camada de parallax | **Manter como conexão gráfica** |
| M01 | `.world-ring.depth-layer` | Argola amarela; 95 × 95 px desktop; 45 × 45 px mobile, na parte inferior direita após P1 | `data-drift=0.44`, `data-spin=12`; amortecimento e limites de P2; estática no mobile | Segundo lote, **condicionado a referência real** e ganho visual |
| M02 | `.world-worm.depth-layer` | Minhoca azul-claro/rosa; 145 × 42 px desktop; oculta no mobile | `data-drift=0.52`, `data-spin=9`; ângulo-base de 30°; amortecimento e limites de P2 | Segundo lote; **reutilizar H01 quando visualmente adequado** |

As dimensões acima são caixas CSS, não a silhueta exata do futuro doce. Não incluem o aumento por escala, a rotação, a perspectiva, sombras externas ou a densidade de pixels do dispositivo. O tamanho de produção deve considerar tudo isso.

### 3.1. Como a profundidade orbital funciona

`measureOrbit()` mede a área em relação ao produto; `drawOrbits()` reutiliza a geometria e escreve no wrapper:

- `--orbit-x` e `--orbit-y`.
- `--orbit-rotation`.
- `--orbit-scale`, aproximadamente de 0,68 a 1,16.
- `--orbit-opacity`, aproximadamente de 0,62 a 1.
- `z-index` 2 ou 5; a embalagem fica na camada 3.

O deslocamento usa aceleração/desaceleração e 16% de repouso por período. As minhocas balançam; a argola tem rotação distinta. O ramo de rotação verifica `element.classList.contains('ring')`: essa classe é hoje também um contrato de comportamento, não apenas estilo.

O relógio orbital é preservado ao pausar e ao ocultar a aba. Movimento reduzido mantém os elementos estáticos. **P3 deve substituir a superfície visual, sem recriar esse sistema.**

### 3.2. Como os doces de Mundo Fini se movem

`renderMotion()` aplica deslocamento amortecido, spin e escala a `.depth-layer`. O limite dos elementos decorativos é 70 px de deslocamento, com rotação limitada a 6° além do ângulo-base. Os coeficientes acima diferenciam as camadas; não são pixels de movimento direto.

O mobile mantém a argola em composição estática e oculta a minhoca. Esses comportamentos devem permanecer. A ponte C01 não pertence a `.depth-layer` e não deve ser conectada ao parallax por engano.

## 4. Outros elementos decorativos: o que preservar como gráfico

| Elemento / contexto | Implementação e reação atuais | Decisão P3 |
|---|---|---|
| `.orbit` e `:after` | Elipse fina, pose de −20°; segunda elipse oculta em P1 | Manter CSS e geometria; a elipse participa da medição orbital |
| `.hero-backword` | Palavra tipográfica de apoio; gesto curto a cada troca | Manter texto e animação; não rasterizar |
| `.flavor-seal` | Círculo amarelo com texto de sabor; pequena acomodação em P2 | Manter CSS/texto para nitidez e acessibilidade |
| `.spark.s1` | Glifo gráfico com cor de acento acompanhando a campanha | Manter gráfico; não é um doce |
| `.spark.s2` e `.hand-note` | Estrela e nota antigas, ocultas pela composição P1 | Não criar assets e não reativar |
| Ticker e seus símbolos | Texto e glifos; movimento contínuo suspenso fora da tela/aba | Manter tipografia e comportamento |
| Símbolos das abas, sublinhado rosa e linha de Vibes | Interface gráfica e feedback de seleção | Manter CSS/glifos |
| Área curva de cor de Vibes e `:after` | Campo de cor e reação luminosa curta por categoria | Manter gráfico; não substituir por textura fotográfica de fundo |
| `.vibe-art:before` e `.vibe-sticker` | Linha de base e legenda editorial, sem selo circular em P1 | Manter linha e texto |
| `.vibe-letter` | Palavra gigante antiga, oculta em P1/P2 | Não produzir asset nem reativar |
| `.classic-disc` | Disco orgânico que muda cor e pose na galeria | Manter campo gráfico; não é uma bala ampliada |
| `.classic-number`, `.classic-tag`, `.classic-sideword` | Número em contorno, rótulo e nota tipográfica | Manter texto/contorno; não produzir imagem |
| C01, ponte entre seções | Argola de função editorial, com pose fixa | Manter como grafismo; não vincular a um SKU não confirmado |
| `.world-ribbon` e `:after` | Elipses/faixa translúcida em uma camada de profundidade | Manter gráfico e parallax aprovado |
| `.world-echo` | Palavra “SINTA.” em plano de fundo | Manter texto e contraste atuais |
| `.world-spark` | Estrela amarela com `drift=-0.34`, `spin=-18`, limitados por P2 | Manter gráfico; estática no mobile |
| `.world-particle` | Discos de 17 e 9 px; `drift=0.62` e `-0.48`; ocultos no mobile | Manter partículas abstratas; não convertê-las em açúcar fotográfico |
| `.world-note` | Nota tipográfica em pose fixa, oculta no mobile | Manter texto |
| `.about-ring` e `.about-label` | Moldura rosa do mascote e selo de texto; revelação calma | Manter gráficos; a moldura não é uma argola de gelatina |
| Pseudo-elementos do encerramento | “encore!” e estrela, com resposta de entrada | Manter tipografia e glifo |
| Pseudo-elementos do menu e ponto da loja | Assinatura gráfica; ocultos no menu horizontal baixo | Manter o comportamento aprovado |
| Superfície do header, contornos, setas, linhas, fundos de logo | Interface e enquadramento | Manter CSS/texto; não pertencem ao lote de materialidade |

Embalagens, displays, mascote, logo e leque final **já são imagens**. Não são doces construídos em CSS e não precisam ser refeitos neste escopo. Cópias temporárias de embalagem em Vibes/Clássicos são recursos de transição de P2, não novos assets.

## 5. Fidelidade ao produto: condição anterior à produção

### 5.1. Minhocas

A embalagem local de Minhocas Azedinhas mostra doces alongados, curvos, bicolores e açucarados. Ela orienta a família visual, mas não oferece detalhe suficiente para estabelecer com precisão geometria, granulação, espessura e cada combinação cromática.

Antes de fotografar ou renderizar, reunir uma referência individual aprovada do produto: fotografia macro fornecida, acervo autorizado ou amostra física. Registrar produto/SKU quando disponível, procedência, data e cores observadas. As cores do gradiente CSS não são uma especificação de fabricação.

As variantes A e B podem manter a diferenciação fria/quente da composição se as combinações forem confirmadas na referência real. Não fabricar uma combinação apenas para reproduzir os hexadecimais atuais.

### 5.2. Argolas

O acervo local não traz uma referência individual verificável para a argola rosa ou amarela como produto Fini específico. Portanto:

1. Não encomendar um “donut de gelatina” genérico como se fosse um produto da marca.
2. Não considerar a classe `.ring` prova de que existe um SKU correspondente.
3. Manter H03 como grafismo enquanto não houver referência aprovada.
4. Só produzir uma argola com açúcar, cor e proporção confirmados.
5. Se não houver produto compatível, apresentar separadamente a opção de outro doce real do catálogo já representado, como Ursinhos. Essa troca de silhueta e comportamento precisa de aprovação própria; não faz parte da substituição automática de H03.

Esse ponto não bloqueia a produção planejada das duas minhocas, mas impede inventar os outros doces.

## 6. Lista de assets a produzir

### 6.1. Lote obrigatório inicial: hero

| Asset lógico | Uso | Enquadramento e pose | Material e iluminação | Arquivo mestre recomendado | Exportações de entrega |
|---|---|---|---|---|---|
| `minhoca-azeda-a` | H01; possível reutilização em M02 | Uma unidade inteira, horizontal e levemente sinuosa; vista quase superior, inclinada cerca de 15–25° em relação à vista perpendicular ao doce; espessura perceptível | Gelatina bicolor confirmada, grãos de açúcar irregulares e translúcidos; luz difusa superior esquerda e preenchimento suave | PNG RGBA, lado maior de aproximadamente 1536 px; área útil próxima de 3:1, conforme pose real | WebP com alfa em 256 e 512 px no lado maior; proporção nativa preservada |
| `minhoca-azeda-b` | H02, desktop | Outra unidade/pose coerente, com variação natural de curva; mesma câmera e escala de referência | Mesmo kit de luz; segunda combinação cromática real aprovada | Mesmo padrão de mestre, aproximadamente 1536 px no lado maior | WebP com alfa em 256 e 512 px no lado maior |

São **dois mestres e quatro derivados WebP** no lote mínimo. A proporção é um guia de composição, não autorização para esticar o doce. Ajustar a pose real ou usar `object-fit:contain` se a silhueta exigir outra proporção.

### 6.2. Lote condicionado: argola orbital

| Asset lógico | Uso | Especificação | Resolução |
|---|---|---|---|
| `argola-[produto-confirmado]-a` | H03 | Uma unidade inteira; abertura interna real com alfa; vista frontal/quase superior com inclinação leve, cerca de 10–20°; espessura, superfície e cor iguais à referência; luz compatível com as minhocas | Mestre PNG RGBA de aproximadamente 1024 × 1024 px; derivados WebP de 192 e 384 px no lado maior |

Produzir somente após o marco de fidelidade da seção 5.2. Se a abertura não for circular no produto real, manter sua forma real; não regularizar a geometria para imitar o CSS.

### 6.3. Segundo lote: Mundo Fini

- **M02:** começar reutilizando `minhoca-azeda-a`, em exportação de 512 px. A caixa maior de Mundo Fini ainda cabe nesse arquivo. Não encomendar outra vista sem comparar a reutilização no ângulo-base de 30°.
- **M01:** se H03 tiver sido aprovado como produto real, avaliar a reutilização do mesmo asset. Se for necessária outra cor, ela exige referência real própria e outro arquivo; não aplicar recoloração CSS para simular uma variante comercial.
- **C01:** manter gráfico; nenhum arquivo novo.
- **V01:** permanece oculto; nenhum arquivo novo.

### 6.4. Expansões opcionais fora do lote mínimo

Doces individuais de Dentaduras, Ursinhos, Amoras ou Tubes podem ser estudados futuramente para relação específica com a campanha. Cada um precisa de referência real, escala óptica e decisão de integração. Não adicionar todos como preload nem mudar a campanha aprovada apenas para usar mais imagens.

Não são necessários nesta primeira implementação: macro de fundo, vídeo de abertura de pacote, sequência 360°, sprite sheet, nova embalagem, novo mascote ou cena WebGL.

## 7. Padrão de produção visual

### 7.1. Recorte e transparência

- Fundo totalmente transparente, sem retângulo branco, cinza, checkerboard gravado ou matte colorido.
- Contorno orgânico e grãos periféricos preservados, sem halo de seleção.
- Açúcar claro não deve desaparecer como se fosse fundo.
- Na argola, tanto o exterior quanto o furo precisam de alfa correto.
- Reservar aproximadamente 4–6% de margem útil para recorte e antialiasing, sem grande vazio invisível ao redor.
- Centralizar a massa visual. Registrar eventual ajuste de centro óptico; não corrigir por deslocamentos de layout durante a animação.
- Não recortar os doces a partir da área impressa de uma embalagem: isso mistura plástico, reflexos, impressão e perspectiva.

### 7.2. Materialidade e cor

Mostrar espessura, cor interna e brilho de gelatina com açúcar de escala compatível. Evitar aparência de plástico, cápsula lisa, vidro, borracha ou açúcar ampliado como pedras.

Usar perfil sRGB e uma referência cromática comum. Não saturar o doce para “combinar” artificialmente com o rosa da página. A cor deve funcionar sobre creme, azul e rosa por composição, sem trocar sua identidade.

Uma imagem RGBA oferece uma aproximação de translucidez, não refração física em tempo real. É necessário compor o asset sobre os fundos reais para aprovar bordas e corpo. Não reduzir indiscriminadamente o alfa do doce inteiro.

### 7.3. Luz, perspectiva e sombras

Usar uma luz ampla superior esquerda, preenchimento suave do lado oposto e volume legível sem reflexo pontual extremo. Produzir o lote sob o mesmo kit de câmera/luz.

Como os sprites giram em P2, uma luz excessivamente direcional pareceria girar junto com o bitmap. A primeira solução é uma iluminação difusa e pouco polarizada, validada em vários ângulos da animação. Não prometer que uma única imagem representa todas as vistas tridimensionais.

O asset deve conter sombreado próprio e oclusão local da sua superfície, mas **não uma sombra de chão, elipse de apoio ou sombra longa externa**. A sombra externa fica no CSS e deve existir uma única vez. O filtro herdado de `.candy` precisa ser revisado no modificador com asset para não somar sombra nova a sombras sintéticas antigas.

### 7.4. Fotografia versus render

Preferência inicial: fotografia isolada ou acervo de produto aprovado, por fidelidade. Render offline é adequado quando houver referência suficiente de geometria e material e puder ser comparado à amostra real. O navegador receberia o bitmap pronto, não um modelo 3D.

Sem referência aprovada, não produzir imagem gerada a partir de descrição genérica. Uma proposta visual plausível não comprova compatibilidade com o produto.

## 8. Resolução, formatos e orçamento

O dimensionamento deve considerar o lado visual máximo × escala de P2 × DPR. Exemplos de referência:

- H01: 100 px × 1,16 × DPR 3 ≈ 348 pixels físicos; o derivado de 512 px oferece margem.
- M02: 145 px × DPR 3 = 435 pixels físicos; reutilização de 512 px é suficiente como ponto inicial. O aumento de até 1,018 em Mundo Fini é exclusivo de `.world-pack`; os doces mantêm escala 1.
- H03: 63 px × 1,16 × DPR 3 ≈ 219 pixels físicos; o derivado de 384 px cobre essa condição.
- M01: 95 px × DPR 3 = 285 pixels físicos; o derivado de 384 px também cobre esse uso.

Esses cálculos são recomendações, não medições de qualidade dos futuros arquivos. Margem transparente, rotação e ocupação útil devem ser consideradas na aprovação final.

**Formatos:** PNG RGBA como mestre de troca; WebP com alfa como entrega preferida. Comparar compressão com e sem perda quando açúcar e bordas exigirem. PNG de entrega só se trouxer benefício verificável; não servir PNG e WebP simultaneamente sem necessidade.

**Metas iniciais, ainda não medidas:**

| Derivado | Meta de peso por arquivo |
|---|---|
| Minhoca 256 px | Até aproximadamente 25 KiB |
| Minhoca 512 px | Até aproximadamente 50 KiB |
| Argola 192 px, se aprovada | Até aproximadamente 20 KiB |
| Argola 384 px, se aprovada | Até aproximadamente 40 KiB |

Orçamento proposto do primeiro par: até 100 KiB adicionais no desktop e até 50 KiB no mobile, conforme DPR e seleção responsiva. Com H03 aprovado, buscar até 150 KiB adicionais no hero desktop. Reutilizações em Mundo Fini não devem duplicar downloads do mesmo URL.

Se a qualidade exigir mais bytes, rever resolução e estratégia antes de eliminar textura para cumprir uma meta cega. O orçamento precisa ser validado com arquivos reais.

Memória descomprimida e camadas também importam: dois arquivos RGBA de 512 × 192 px e um de 384 × 384 px representam cerca de 1,31 MiB apenas de pixels, antes dos custos do navegador. Mestres de 1536 px não devem ser enviados ao usuário final.

## 9. Estrutura de armazenamento proposta

As pastas abaixo **não foram criadas nesta etapa**:

```text
assets/images/candies/
  minhocas-azedinhas/
    minhoca-a-view01-v01-256.webp
    minhoca-a-view01-v01-512.webp
    minhoca-b-view01-v01-256.webp
    minhoca-b-view01-v01-512.webp
  argolas/                         # somente após confirmação do produto
    [produto]-a-view01-v01-192.webp
    [produto]-a-view01-v01-384.webp
  manifest.json
  README.md

design/p3-candies/                 # material de produção; não carregar no site
  referencias/
  masters/
    minhoca-a-view01-v01.png
    minhoca-b-view01-v01.png
  provas/
    fundos-creme-azul-rosa/

auditoria/p3-[data]-[execucao]/
  antes/
  depois/
  motion/
  resultados/
```

Usar nomes ASCII, sem espaços, com identidade, vista, versão e tamanho explícitos. Não renomear `balafini*.webp` ou `caixafini*.webp` nem sobrescrever os 21 assets existentes.

O manifesto deve registrar: ID, produto/referência e seu status de aprovação, URLs, dimensões reais, proporção, peso, centro óptico, papel decorativo, presença de alfa e aplicações previstas. Referências e mestres ficam fora da lista de carregamento. Antes de qualquer publicação futura, conferir a exclusão de material de produção da saída de hospedagem; a configuração atual publica a raiz e uma pasta `design/` não é automaticamente privada.

## 10. Integração proposta sem reescrever P2

### 10.1. Manter o wrapper animado

Preservar os elementos `.satellite`, seus `data-period`, `data-phase`, `data-track` e as classes que determinam a rotação. Inserir a imagem como filha do wrapper existente, não substituir o nó acompanhado pelo array `satellites`.

Esquema conceitual, não implementado:

```text
wrapper decorativo existente
  posição, tamanho CSS, órbita, escala, opacidade, z-index, pausa
  imagem filha
    textura, alfa, object-fit:contain, ajuste óptico estático
```

Assim, o movimento continua no pai e a superfície visual fica no filho. Não escrever um novo `transform` no wrapper a partir do carregador de imagens, pois apagaria a composição `translate → centralização → rotação → escala` de P2.

### 10.2. Troca progressiva e falhas

1. Preservar a forma CSS como fallback inicial.
2. Solicitar apenas o asset necessário à instância visível.
3. Decodificar a imagem antes de apresentá-la.
4. Inserir/mostrar a imagem e ativar um modificador, por exemplo `has-asset`, no mesmo ciclo de atualização.
5. Retirar apenas o desenho sintético daquela instância: gradiente, borda, contorno pontilhado e sombras internas.
6. Se o carregamento falhar, não ativar o modificador; manter a forma anterior e a animação funcional.

A troca não deve reiniciar `orbitTime`, mover o centro, acrescentar um pulso ou exigir outra coreografia. Com movimento reduzido, revelar diretamente a imagem decodificada no estado estático.

### 10.3. CSS e proporção

Definir a filha com dimensões contidas no wrapper, `object-fit:contain`, proporção original e `pointer-events:none`. Declarar dimensões intrínsecas do arquivo. Não deformar a imagem para preencher 100 × 33 px se ela tiver outra proporção.

Os seletores de asset precisam vencer a especificidade das regras de `.hero-art .satellite.r1`, `.world-ring` e demais ajustes por breakpoint. Uma remoção genérica de borda em `.ring` afetaria a ponte gráfica, o fallback e componentes que não foram aprovados para substituição.

O reset localizado deve abranger `background`, `border`, `box-shadow`, `outline` e `outline-offset`, preservando largura/altura externas com `box-sizing:border-box`. Nas argolas, remover a borda amplia a área interna disponível: dimensionar a imagem pela caixa externa preservada, sem somar novamente os antigos 18/12 px de borda. Rever o `filter:drop-shadow` herdado de `.candy` e aplicá-lo uma única vez ao alfa da silhueta, com intensidade subordinada à embalagem. Nenhum `transform` novo deve substituir o transform de `.satellite` ou `.depth-layer`.

Manter as dimensões externas e o centro óptico estáveis. O furo da argola passa a vir do alfa do arquivo, não da borda CSS. Evitar `overflow:hidden` ou máscaras no wrapper que cortem grãos periféricos ou sombras aprovadas.

### 10.4. Carregamento e responsividade

- Não competir com o preload da embalagem principal nem aguardar doces para liberar headline/CTA.
- Selecionar derivados por tamanho efetivo e DPR; considerar a escala máxima de 1,16 no `sizes`, não só o tamanho-base.
- Não presumir que `display:none` impede download de um `<img>` com `src`. Adiar a criação/atribuição de H02 no mobile e de M02 enquanto estiver oculto.
- Ao passar para desktop, carregar H02 sem reiniciar as órbitas.
- Carregar Mundo Fini próximo à entrada em viewport e reutilizar o mesmo URL quando for o mesmo asset.
- Usar cache de decodificação de doces separado ou claramente tipado. `loadProduct()` atual monta caminhos de embalagem e não deve ser alterado de forma incompatível.
- Carregar uma única vista por doce no primeiro lote. Não adicionar troca de frames ou direção de luz por frame.
- Evitar blur, hue-rotate, filtros múltiplos ou recoloração para simular um produto diferente.

Um sprite 2D pode manter profundidade perceptiva por escala, posição e oclusão, mas não revela novas faces reais. Só avaliar outras vistas depois de provar uma limitação visível do asset único.

Para o lote inicial, preferir identificadores `data-candy-asset` no HTML e criação da imagem pelo carregador existente a ser ampliado, sem `src` antecipado em instâncias ocultas. Associar cada solicitação a um identificador de geração; se o breakpoint mudar enquanto a imagem decodifica, reaproveitar o cache, mas só anexar a filha se a instância ainda estiver elegível. Usar `srcset`/`sizes` depois dessa elegibilidade, com teto de tamanho baseado na maior escala orbital e nas dimensões do wrapper. Resolver a escolha de recurso no carregamento/resize, nunca dentro de `drawOrbits()`.

Manter `--orbit-opacity` como profundidade gráfica, sem embutir esse fade no arquivo. Ela multiplica o alfa do bitmap; conferir especialmente a passagem traseira em 0,62 para que o doce não desapareça. Se o resultado exigir mudar opacidade, amplitude ou camada de P2, apresentar esse ajuste para revisão separadamente. A substituição inicial deve funcionar com os valores aprovados.

## 11. Alterações futuras por arquivo

| Arquivo/área | Alteração necessária após autorização | Preservar |
|---|---|---|
| `index.html` | Marcação decorativa e/ou identificadores de asset nos wrappers selecionados; dimensões intrínsecas e fontes responsivas se as imagens forem declaradas em HTML | Textos, âncoras, ordem de leitura, controles, layout e nós acompanhados pela animação |
| `css/style.css` | Imagem filha, modificador de prontidão, remoção localizada do desenho sintético, sombra única e ajuste óptico por breakpoint | Transformações orbitais, z-index, caixas externas, cores gráficas, movimento reduzido e componentes sem asset |
| `js/script.js` | Manifesto/mapeamento de instâncias, carregamento/decodificação, fallback e atualização de recursos quando muda o breakpoint | Relógio orbital, fases, trilhas, pausas, registro de trabalhos, filas do hero, Vibes, Clássicos e profundidade de Mundo Fini |
| Novo diretório de doces | Derivados aprovados e metadados | Todos os assets existentes |
| Ferramentas de exportação | Fluxo separado para RGBA já preparado, variantes de tamanho e validação de alfa | Processamento atual de embalagens sem execução em lote sobre elas |
| Validações | Varredura de subpastas, manifesto, `srcset`/fontes e falhas de rede | Asserções existentes e evidências P2 |

Em H01/H02, não é necessário reescrever `drawOrbits()` para usar uma imagem. Em H03, manter o comportamento de argola; se outro tipo de doce for escolhido, a mudança de classificação/rotação deverá ser uma decisão explícita, fora da troca simples de superfície.

## 12. Atenção ao pipeline existente

`tools/prepare_assets.py` foi preparado para as imagens fornecidas. Ele remove fundo claro conectado às bordas por limiar, recorta o conteúdo e gera WebP em `assets/images/`.

**Não aplicar esse processo automaticamente aos novos doces.** Pode apagar açúcar, alterar translucidez e perder margens/pivôs aprovados. O novo fluxo deve partir de alfa preparado na origem, preservar regiões semitransparentes e criar derivados sem recorte agressivo.

O Pillow já é usado pelas ferramentas locais. Não há justificativa atual para instalar uma nova dependência apenas para planejar ou exportar esses bitmaps; a capacidade de exportação será conferida quando houver arquivos reais e autorização.

`tools/validate_files.py` usa `glob('*.webp')` na raiz de imagens e não cobre automaticamente a futura árvore de doces. O script de navegador também enumera arquivos WebP da raiz. A futura implementação precisa ampliar a cobertura por manifesto/subpastas, além de validar `srcset`, alfa e dimensões. Não declarar os novos arquivos aprovados apenas porque a suite antiga continuou passando.

## 13. Etapas e marcos de aprovação

| Etapa | Entrega planejada | Critério para avançar |
|---|---|---|
| P3-A — Referências | Fotos individuais/aprovação de produto para H01/H02; decisão sobre H03 | Forma, cores e acabamento verificáveis; sem produto inventado |
| P3-B — Piloto | Um mestre de H01 e prova sobre creme/azul/rosa | Textura, alfa, iluminação e tamanho óptico aprovados antes de produzir variantes |
| P3-C — Lote do hero | H01/H02 e derivados; H03 somente se liberado | Coerência de câmera/luz, identidade e orçamento de peso |
| P3-D — Integração controlada | Troca de uma instância por vez, em cópia de trabalho com backup P2 | Órbita e layout preservados; fallback funcional |
| P3-E — Reutilização em Mundo Fini | M02 com asset aprovado; M01 apenas se compatível | Ganho visual sem nova competição com texto ou download redundante |
| P3-F — Validação e revisão | Antes/depois, sequências, resultados e limitações | Aprovação visual explícita antes de ampliar escopo ou publicar |

Cada marco é proposto para uma futura execução. Nenhum foi iniciado por este documento. Não há estimativa de prazo validada nem autorização para gerar imagens ou implementar agora.

## 14. Critérios de aprovação visual dos assets

O piloto só deve ser aceito se cumprir:

- Reconhecimento do tipo de doce e correspondência com a referência real aprovada.
- Textura de açúcar legível no tamanho de uso, sem depender de zoom no mestre.
- Gelatina com espessura e brilho coerentes, sem aparência plástica ou de vidro.
- Sem halo branco/cinza, fundo residual ou perfuração artificial do açúcar.
- Alfa aprovado sobre creme `#fbf6e9`, azul `#292074` e rosa `#eb3477`.
- Silhueta inteira, furo correto quando aplicável e grãos não cortados.
- Kit de luz consistente entre A/B e embalagens, sem sombra de chão flutuando junto.
- Ocupação óptica comparada ao P2, sem transformar o doce decorativo no protagonista.
- Sem alteração arbitrária de cor ou fabricação de variante inexistente.

Em caso de conflito entre fidelidade real e encaixe na cápsula CSS, não distorcer a imagem. Apresentar a diferença de pose/tamanho para revisão.

## 15. Critérios de validação no site

### 15.1. Desktop

Validar 1440 × 900 e 1920 × 1080; acrescentar 768 e 1024 px para a transição responsiva. Conferir DPR 1, 2 e 3 nas fontes adequadas, sem inferir nitidez a partir de screenshot reduzida.

Observar ao menos um ciclo completo de cada doce. O maior período é de 21 s, portanto uma captura de apenas um segundo não comprova a órbita inteira.

Critérios:

- Passagens diante/atrás da embalagem continuam nos mesmos planos.
- Bordas e açúcar permanecem legíveis no maior e no menor tamanho orbital.
- Doce não encobre por tempo indevido headline, CTA ou controles.
- Nenhum salto de centro/tamanho quando a imagem termina de carregar.
- Nenhum halo aparece durante a rotação ou a passagem sobre a embalagem.
- Sombra externa única; luz não parece se inverter de forma gritante.
- Em Mundo Fini, leitura central preservada e deslocamentos iguais aos aprovados em P2.
- Fases e pausas continuam após resize, troca de produto e retorno à aba.

### 15.2. Mobile

Validar 320 × 900, 375 × 900 e 430 × 900, além de 375 × 667 e 667 × 375. Usar ao menos um aparelho físico modesto quando disponível; emulação não substitui essa evidência.

Critérios:

- H02 continua oculto e não é solicitado apenas por existir no HTML.
- H01 e H03, se aprovado, mantêm a quantidade e o peso visual da composição atual.
- As imagens não colidem com selo, embalagem, controles ou CTA.
- O doce continua reconhecível em aproximadamente 42–75 px de uso, conforme a instância/escala, sem contar com grãos exagerados.
- M02 continua oculto; M01 permanece estático e bem enquadrado.
- Não há overflow global novo nem cortes involuntários de grãos/sombras.
- O menu horizontal corrigido continua acessível e sem colisões.
- Mudar a orientação não reinicia o movimento nem troca um fallback por uma imagem deslocada.

### 15.3. Movimento reduzido e acessibilidade

- Imagens decorativas com `alt=""`, sem foco, sem interação e com o contexto decorativo oculto da árvore acessível.
- Sem anúncios de cada doce ao trocar a embalagem.
- Estado estático completo com `prefers-reduced-motion` desde o carregamento.
- Alteração da preferência durante carregamento/transição sem deixar imagem vazia ou duplicada.
- Pausa, retomada, avanço manual, teclado e swipe preservados.
- Formas CSS de fallback não podem piscar sobre a imagem pronta.

### 15.4. Rede, desempenho e regressão

- Executar a suite existente e os cenários adicionais de P2 sobre a nova versão.
- Estender os testes para decodificação recursiva, alfa, URLs responsivos e identidade dos wrappers.
- Simular atraso, erro 404 e arquivo inválido: embalagem e CTA continuam utilizáveis; o doce conserva o fallback.
- Medir bytes transferidos, recurso escolhido por DPR, tempo de decodificação e estabilidade de layout antes/depois.
- Conferir ausência de solicitações duplicadas desnecessárias ao reutilizar um asset em outra seção.
- Medir frames longos/custo de composição em aparelho modesto, sem prometer 60 fps antecipadamente.
- Confirmar que somente H01/H02/H03 liberados receberam novos bitmaps; grafismos e assets aprovados permanecem preservados.

### 15.5. Condições objetivas de aceite e comparação

Registrar a referência P2 e a candidata P3 no mesmo navegador, viewport, DPR, estado de cache e produto, com as órbitas comparadas no mesmo `orbitTime`. Comparar repouso, escala mínima/máxima, cruzamento de camada e os 16% de descanso; não julgar diferenças a partir de capturas em fases aleatórias. Percorrer também as cinco embalagens do hero, incluindo o display Tubes, pois a oclusão muda com sua silhueta.

| Critério | Condição de aprovação proposta |
|---|---|
| Integridade da animação | Mesmos nós animados, períodos 12/17/21 s, fases e trilhas; nenhuma reinicialização do relógio por carregamento ou resize |
| Estabilidade | Caixas externas e geometria medidas antes/depois iguais; nenhuma contribuição nova de layout atribuível aos doces |
| Leitura e recorte | Zero nova sobreposição prejudicial a texto/controles; zero halo/fundo residual visível no tamanho de uso e na inspeção a 100% do derivado |
| Responsividade | H02/M02 sem solicitação inicial em mobile; ao cruzar 767/768 px, ausência de duplicação de imagens, salto de centro ou quebra do fallback |
| Rede | URLs válidos, um recurso por instância elegível, reutilização por cache; metas de bytes da seção 8 atendidas ou exceção documentada para revisão |
| Desempenho | Comparar ao menos três execuções equivalentes por versão; investigar regressão repetida superior a 10% no tempo de carregamento principal ou custo de frames antes do aceite, sem tratar esse limiar como garantia de fluidez |
| Robustez | Pausar/retomar e alterar movimento reduzido durante decode e troca; nenhuma imagem vazia, duplicada ou animação reativada indevidamente |

Além do Chrome usado em P2, incluir Safari/iOS e Chrome/Android quando disponíveis. Se só houver emulação, registrar essa limitação e manter a validação em aparelho físico pendente; não declarar cobertura realizada. As medições futuras devem distinguir cache frio/quente e rede/CPU limitadas, sem transformar resultados laboratoriais em Core Web Vitals de usuários reais.

## 16. Evidências necessárias para aprovação da implementação

Quando a implementação for autorizada, registrar:

1. Referência de produto e provas de alfa em três fundos.
2. Comparação P2/P3 em repouso, com enquadramentos equivalentes.
3. Sequências da passagem diante/atrás, escala mínima/máxima e retorno ao repouso.
4. Capturas desktop/mobile e orientação horizontal.
5. Resultados de pausa, movimento reduzido, resize e falha de carregamento.
6. Manifesto com dimensões, peso, versão e uso de cada arquivo.
7. Medições de transferência/decodificação e limitações do ambiente.

O screencast pode perder frames, como já documentado em P2. Ele é evidência visual, não medição automática de FPS. Aprovação artística e aprovação técnica devem ser registradas separadamente.

## 17. Recomendação para a autorização seguinte

Autorizar primeiro **referências e piloto de uma minhoca**, antes de produzir toda a família. Depois de aprovado o piloto, produzir a segunda variante e integrar H01/H02 gradualmente. Manter a argola gráfica até confirmar uma referência real ou aprovar explicitamente outro doce.

Essa sequência concentra o investimento no hero, evita retrabalho e mantém a composição e o motion design aprovados.

**Nenhuma imagem foi gerada ou substituída. Nenhum arquivo do site foi alterado. O plano aguarda autorização para produção e implementação.**
