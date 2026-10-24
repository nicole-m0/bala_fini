# Auditoria visual e técnica — Fini Brasil

Data: 24 de outubro de 2026.

Projeto: landing page conceitual independente “Fini — Abriu. Sorriu.”

Status: auditoria e recomendações. Nenhuma melhoria foi implementada.

**Atualização P0 (24/10/2026):** a validação via Chrome headless foi realizada posteriormente à auditoria inicial. Os resultados e as evidências estão na seção 22. As seções 1 a 21 preservam o diagnóstico histórico; suas limitações de acesso ao navegador devem ser lidas em conjunto com a atualização.

## 1. Escopo, método e limites da análise

Esta auditoria considera direção de arte digital, motion design, UX/UI, arquitetura frontend, acessibilidade, desempenho e experiência mobile.

Foram examinados o HTML, o CSS, o JavaScript, o inventário de imagens, o README, a configuração de publicação e as ferramentas auxiliares de preparação e verificação do projeto.

Foi iniciado um servidor HTTP local, conforme o procedimento previsto no projeto. A inspeção visual foi interrompida pela ferramenta Computer Use: ela não conseguiu determinar a URL atual do Chrome no Windows com confiança suficiente para aplicar sua política de navegação. Consequentemente:

- Não houve inspeção visual efetiva de telas desktop ou mobile.
- Não foram capturadas screenshots nesta auditoria.
- Não foram verificados visualmente recortes, nitidez, cores dos assets, sobreposições ou enquadramentos reais.
- Não foram executadas medições de Lighthouse, Core Web Vitals, FPS, consumo de memória ou desempenho em aparelho físico.
- Não foi confirmada a conformidade de contraste ou acessibilidade com WCAG.
- A existência de ferramentas de teste no repositório não foi tratada como comprovação de aprovação dos testes.

As observações sobre estrutura, valores, lógica e recursos existentes derivam do código. Os juízos sobre aparência são diagnósticos de direção de arte baseados nessa implementação e precisam de confirmação no navegador. Os riscos e comportamentos ainda não reproduzidos são identificados como pontos a validar.

Durante a auditoria original, nenhum arquivo foi alterado, nenhuma dependência foi instalada e não houve commit ou publicação. A criação deste relatório é uma ação posterior, expressamente solicitada. Ela não altera arquivos do site.

## 2. Diagnóstico principal

A base é funcional e possui recursos de acabamento relevantes. A principal limitação expressiva é a repetição de uma fórmula de composição: embalagem inclinada, círculo ou disco, palavra ampliada ao fundo, selo e frase emocional.

O projeto já tem mais variedade técnica de movimento do que uma página composta apenas por fades. Há órbitas com variação de escala e opacidade, sobreposição de imagens durante as trocas, parallax, máscaras e entradas específicas. Portanto, o diagnóstico não é ausência de animação ou ausência absoluta de profundidade.

O problema potencial está na percepção: objetos diferentes compartilham gestos semelhantes, a profundidade é predominantemente gráfica e os doces decorativos não têm a mesma materialidade das embalagens fotografadas. A direção de arte depende de recursos comuns a landing pages lúdicas, com pouca ação derivada dos formatos específicos da Fini.

O maior ganho deve vir de três frentes: hierarquia mais seletiva, personalidade de movimento por objeto e assets que expressem textura e sensação.

## 3. Estrutura, tecnologias e dependências

### 3.1. Stack

| Área | Implementação identificada |
|---|---|
| Estrutura | HTML semântico em `index.html` |
| Estilos | CSS próprio em `css/style.css` |
| Interações | JavaScript puro em `js/script.js` |
| Animação | CSS, Web Animations API e `requestAnimationFrame` |
| Fontes | Fredoka e DM Sans pelo Google Fonts |
| Assets | Imagens WebP locais |
| Publicação | Configuração estática em `vercel.json` |
| Build | Não há etapa de build necessária para visualizar o site |

Não há GSAP, React, Three.js ou biblioteca de carrossel no código analisado. Não há necessidade imediata de introduzir essas dependências para a primeira rodada de refinamentos.

O README orienta abrir `index.html` ou servir a pasta por HTTP com Python. As fontes têm fallbacks de sistema.

### 3.2. Arquivos e responsabilidades

| Arquivo ou diretório | Responsabilidade |
|---|---|
| `index.html` | Conteúdo, estrutura semântica e estados iniciais |
| `css/style.css` | Layout, identidade visual, responsividade e estilos de movimento |
| `js/script.js` | Menu, abas, galeria, gestos, teclado, campanha e animações |
| `assets/images/` | Embalagens, displays, logo e mascote |
| `tools/prepare_assets.py` | Preparação opcional de assets; depende de Pillow |
| `tools/validate_files.py` | Verificação de caminhos, IDs, atributos e decodificação de imagens |
| `tools/check_site.mjs` | Verificação opcional via Chrome DevTools Protocol |
| `vercel.json` | Publicação estática com diretório de saída na raiz |

### 3.3. Componentes e percurso

1. Header sticky com navegação por âncoras e link externo para a loja oficial.
2. Hero “Abriu. Sorriu.” com produto rotativo, palavras de apoio, selo, órbitas e controles.
3. Ticker com mensagens repetidas em movimento contínuo.
4. Vibes: abas para Azedinho, Docinho, Tubes e Clássicos.
5. Clássicos: galeria de cinco produtos com navegação por botões, índice, teclado e gesto horizontal.
6. Mundo Fini: manifesto central, embalagens periféricas e camadas de profundidade.
7. História: mascote, texto institucional e duas datas.
8. Encerramento: pergunta “Qual é a sua Fini?” e embalagens em leque.
9. Rodapé com navegação, identificação do conceito independente e espaços reservados para redes sociais.

Os componentes são organizados por classes e seletores, sem uma camada separada de componentes. Isso é proporcional ao porte atual. A adoção de framework não é pré-requisito para elevar a qualidade.

### 3.4. Dados e manutenção

Há três conjuntos de dados em JavaScript: `vibes`, `classics` e `campaign`. Eles armazenam combinações de nomes, imagens, cores e conteúdo editorial.

Essa separação permite narrativas diferentes, mas duplica referências de produtos. Uma futura melhoria pode estabelecer um catálogo comum de informações estáveis, mantendo textos de campanha separados. O objetivo é prevenir divergências, não criar abstrações desnecessárias.

## 4. Inventário e avaliação dos assets

### 4.1. Arquivos disponíveis

- 13 arquivos `balafini`: de `balafini1.webp` a `balafini13.webp`.
- 6 arquivos `caixafini`: de `caixafini2.webp` a `caixafini7.webp`.
- `iconfini.webp`.
- `mascotefini.webp`.

Total: 21 arquivos WebP, aproximadamente 1,62 MiB em disco. Esse total não representa o peso inicialmente transferido: há carregamento tardio e carregamento de produtos conforme a interação.

As embalagens `balafini` têm arquivos entre aproximadamente 81 e 114 mil bytes; os displays, entre aproximadamente 63 e 73 mil bytes. Logo e mascote são menores. Esses números descrevem armazenamento, não qualidade visual ou desempenho medido.

### 4.2. Limitação de linguagem

Não foram identificados assets específicos de doces soltos na estrutura examinada. Minhocas e argolas decorativas são construídas em CSS, com gradientes, bordas, contornos pontilhados e sombras.

Isso aproxima a embalagem do universo fotográfico e os elementos ao redor do universo de ícones sintéticos. A diferença pode diminuir a sensação tátil e contribuir para a aparência genérica.

### 4.3. Validação visual pendente

É necessário observar os arquivos renderizados para avaliar:

- Qualidade dos recortes e possíveis halos.
- Nitidez na escala efetivamente usada.
- Transparência e margens internas de cada arquivo.
- Consistência de iluminação e perspectiva.
- Escala óptica entre sacos e displays.
- Legibilidade dos rótulos e fidelidade das cores.

Não há evidência nesta auditoria para afirmar que algum desses problemas está presente.

## 5. Seções com maior risco de aparência genérica

| Seção | Evidência da implementação | Diagnóstico | Direção de melhoria |
|---|---|---|---|
| Hero | Embalagem inclinada, órbitas, palavra “nham!”, estrelas e selo circular | Muitos recursos conhecidos competindo sem um gesto proprietário claro | Um produto dominante e uma ação associada ao seu formato |
| Vibes | Texto à esquerda, imagem à direita, palavra ao fundo e sticker | Repete a gramática do hero | Fazer a categoria expressar uma sensação, com ritmo e composição próprios |
| Clássicos | Número grande, disco de cor e produto inclinado | A decoração muda, mas o produto continua como cartão flutuante | Galeria com reconhecimento de formatos e direção espacial consistente |
| Mundo Fini | Manifesto central com embalagens nas bordas | Promessa de universo amplo sustentada por conteúdo abstrato | Construir uma cena com intenção ou situações concretas de consumo |
| História | Mascote, círculo, texto e duas datas | Estrutura institucional correta, mas pouco documental | Acrescentar evidências visuais e fatos confirmados |
| Encerramento | Pergunta sobre “sua Fini” e link de volta às vibes | Retoma uma promessa já apresentada sem nova descoberta | Encerrar o percurso com uma conclusão coerente ou ação mais específica |

### 5.1. Conteúdo editorial

Expressões como “muda a vibe”, “pequenos grandes ícones”, “boas histórias” e “pequenos momentos” são versáteis, mas poderiam aparecer em muitas marcas.

Recomenda-se construir o texto a partir de atributos específicos: formato, textura, sensação azeda, combinação de sabores, ritual de compartilhar e reconhecimento dos produtos. O texto deve ajudar a imaginar a experiência de comer Fini.

As informações institucionais e os sabores devem ser confirmados em fontes apropriadas antes de qualquer revisão editorial. Esta auditoria não verificou externamente as datas ou afirmações comerciais.

## 6. Hero: composição, produto e experiência

### 6.1. Acertos existentes

- Headline curta e hierarquia tipográfica explícita.
- CTA principal direto.
- Área fixa de apresentação para os produtos.
- Entrada do novo produto antes da saída completa do anterior.
- Decodificação de imagem antes da apresentação.
- Controles de pausa e avanço.
- Lógica de suspensão do ciclo automático conforme visibilidade, estado da aba, preferência de movimento e foco nos controles.
- Carregamento antecipado apenas do próximo produto na sequência.

### 6.2. Problemas e riscos

**Coreografia uniforme.** Minhocas, Dentaduras, Ursinhos, Amoras e Tubes usam a mesma família de translação, rotação e escala. A mudança de produto não muda suficientemente o comportamento.

**Volume predominantemente plano.** A embalagem tem rotação e sombra, mas continua sendo uma imagem frontal. A movimentação não revela laterais, deformação ou iluminação variável.

**Escala entre formatos.** Um display e uma embalagem flexível ocupam a mesma apresentação. A classe `is-display` reconhece essa diferença, mas o resultado óptico precisa ser inspecionado.

**Competição por atenção.** Headline, produto, palavra ampliada, selo, estrelas, órbitas e nota lateral têm potencial de disputar o olhar. A hierarquia deve ser definida por momento.

### 6.3. Recomendações

- Priorizar mensagem, embalagem e CTA na leitura inicial.
- Fazer detalhes decorativos aparecerem de forma subordinada.
- Definir enquadramento e escala óptica por tipo de asset.
- Criar uma ação curta e reconhecível para cada família de produto.
- Evitar que toda troca reproduza uma apresentação longa.
- Preservar área estável para evitar mudanças de layout durante a campanha.

| Produto | Personalidade de movimento sugerida |
|---|---|
| Minhocas | Curva sinuosa, elasticidade e acomodação |
| Dentaduras | Abertura, encontro ou gesto de sorriso |
| Ursinhos | Agrupamento e pequenos encontros |
| Amoras | Aproximação que valorize textura |
| Tubes | Continuidade de linha e torção |

Esses gestos são propostas, não recursos já implementados. A animação convincente do doce exige um asset adequado; a embalagem atual permite apenas uma interpretação parcial.

## 7. Doces orbitando e profundidade

### 7.1. O que já existe

O código calcula trajetórias elípticas com períodos de 12, 17 e 21 segundos, fases diferentes e dois percursos. A profundidade modifica escala, opacidade e ordem de sobreposição. O mobile oculta um dos doces.

Portanto, não é correto classificar o sistema como sem profundidade programada.

### 7.2. Por que ainda pode parecer plano

- O doce mantém aparência de forma CSS.
- A rotação acompanha o percurso como um plano girando.
- A velocidade angular constante sugere mecanismo orbital.
- A passagem de camada traseira para dianteira usa um limiar binário de `z-index`.
- A órbita continua independentemente da embalagem apresentada.
- Não há mudança de perspectiva, translucidez ou iluminação material vinculada ao movimento.

Esses fatores podem comunicar satélites em vez de balas elásticas e açucaradas. A ocorrência perceptiva precisa ser confirmada visualmente.

### 7.3. Recomendações de motion

- Reduzir a obrigação de movimento contínuo.
- Preferir eventos curtos: entrada, curva, passagem atrás da embalagem, acomodação e descanso.
- Vincular o movimento à ação da campanha.
- Manter coerência entre posição, escala, sombra e sobreposição.
- Variar a velocidade com intenção, evitando aleatoriedade sem função.
- Usar poucos elementos em primeiro plano.
- No mobile, simplificar a cena em vez de apenas reduzir seu tamanho.

## 8. Timing, easing e repetição

### 8.1. Valores identificados

| Movimento | Implementação | Avaliação e recomendação |
|---|---|---|
| Espera do hero | 4.200 ms após o agendamento | O agendamento é retomado após a troca; o ciclo total supera 4,2 s. Definir tempo de leitura e duração total separadamente |
| Saída do hero | 620 ms | Pode ser abreviada nas repetições para manter foco no conteúdo |
| Entrada do hero | 880 ms, atraso de 100 ms | Gesto elaborado para repetição contínua; reservar maior expressão a momentos relevantes |
| Palavra do hero | 850 ms | Evitar que sua animação concorra com o produto |
| Selo do hero | 700 ms | Avaliar necessidade de animar a cada troca |
| Vibes | Saída de 230 ms e entrada de 740 ms | A seleção deve responder imediatamente; a apresentação pode ser mais curta |
| Clássicos | Saída de 260 ms e entrada de 760 ms | Dar continuidade espacial, evitando reinício cerimonial |
| Ticker | 35 s, linear, infinito | Avaliar sua função e oferecer pausa quando aplicável |

### 8.2. Easing

A função de animação em JavaScript usa `cubic-bezier(.19,.85,.25,1)` como easing compartilhado. O CSS também define uma curva geral `cubic-bezier(.22,1,.36,1)`.

A consistência é positiva, mas objetos diferentes podem terminar com a mesma sensação de peso. Recomenda-se separar famílias:

- Interface: resposta rápida e previsível.
- Texto: leitura limpa, deslocamento moderado.
- Embalagem: inércia discreta e acomodação controlada.
- Doce: elasticidade vinculada ao formato.
- Fundo: movimento lento e subordinado.

Não aplicar bounce ou overshoot a tudo. A expressividade depende também de pausas e contraste de ritmo.

### 8.3. Interrupções

Os seletores de vibes e clássicos usam identificadores de requisição para evitar atualizações assíncronas obsoletas. Isso é positivo, mas não comprova suavidade em cliques rápidos.

Validar cancelamento, troca de direção e estado visual quando a pessoa interage antes do fim da animação. A interface não deve exigir que uma coreografia termine para comunicar a escolha.

## 9. Continuidade entre seções

Existem recursos de ligação e camadas no Mundo Fini, mas a continuidade parece predominantemente decorativa pela leitura da implementação.

Propõe-se uma narrativa de percurso:

**Abrir → descobrir a sensação → reconhecer os formatos → compartilhar → conhecer a história.**

Uma curva, uma cor ou um doce pode reaparecer em pontos do percurso, estabelecendo relação entre cenas. Não é necessário manter um objeto animado durante toda a página.

Evitar controle artificial da rolagem como requisito. A narrativa deve permanecer compreensível com movimento reduzido e navegação direta por âncoras.

## 10. Menu e navegação

### 10.1. Fundamentos existentes

- Header sticky.
- Navegação por âncoras.
- `aria-controls`, `aria-expanded` e rótulo atualizado no botão mobile.
- Fechamento por Escape.
- Fechamento ao selecionar link e ao mudar de breakpoint.
- Conteúdo principal e rodapé com `inert` enquanto o menu está aberto.
- Contenção de foco no header durante a abertura.
- Tratamento visual distinto para o estado aberto.

### 10.2. Validações pendentes

- Foco inicial ao abrir o menu.
- Destino do foco ao selecionar uma âncora.
- Retorno do foco ao fechar por diferentes caminhos.
- Menu em celular na horizontal.
- Altura disponível com barras do navegador.
- Acesso ao último link em telas baixas.
- Zoom e ampliação de texto.
- Ordem e compreensão com leitor de tela.

### 10.3. Direção visual

O menu deve oferecer uma pausa legível na experiência. Usar tipografia forte, poucos elementos expressivos e uma hierarquia clara entre navegação interna e loja oficial. A animação de abertura não deve atrasar o acesso aos links.

## 11. Tipografia, hierarquia e cor

### 11.1. Tipografia

Fredoka e DM Sans têm papéis compatíveis com a proposta. O risco é usar a mesma personalidade arredondada em títulos, palavras decorativas e notas, reduzindo a distinção entre funções.

Recomendações:

- Concentrar Fredoka nos momentos de maior expressão.
- Preservar DM Sans em navegação, informação e texto de apoio.
- Revisar textos auxiliares definidos entre 7 e 10 px.
- Reduzir caixa alta com espaçamento amplo quando prejudicar leitura.
- Conferir quebras de títulos com conteúdo real em telas pequenas.
- Tratar lettering autoral como asset específico, quando necessário.

### 11.2. Hierarquia

O grande tamanho dos títulos cria impacto, mas não resolve sozinho a hierarquia. Selos, palavras ao fundo e números ampliados precisam ter importância subordinada.

Cada seção deve responder claramente: qual é sua mensagem principal, qual produto a sustenta e qual ação se espera da pessoa?

### 11.3. Cores

Tokens principais identificados:

| Papel | Cor |
|---|---|
| Creme | `#fbf6e9` |
| Azul / tinta | `#292074` |
| Rosa | `#eb3477` |
| Amarelo | `#f8ed45` |

A base é coerente com uma proposta divertida. O risco está em repetir rosa como ênfase e amarelo como sticker ou faixa, sem função narrativa adicional.

Recomenda-se um conjunto limitado de combinações por produto ou sensação. A percepção premium deve vir de controle de contraste, espaço, recorte e materialidade, preservando a energia da marca.

Os contrastes não foram medidos. É necessário verificar texto, controles, indicadores de foco e estados sobre cada fundo real.

## 12. Direção de arte proposta

### “Abriu um mundo de sensações.”

Combinar embalagens reconhecíveis, doces táteis e movimentos com personalidade. A proposta preserva o caráter divertido da Fini, mas substitui ornamentação genérica por gestos derivados dos produtos.

Princípios:

1. **Produto protagonista:** escala clara, enquadramento intencional e respiro.
2. **Diversão específica:** comportamento ligado a minhocas, dentaduras, ursinhos, amoras e tubes.
3. **Contraste de ritmo:** cenas de impacto alternadas com áreas calmas.
4. **Profundidade coerente:** luz, sombra, escala e sobreposição sugerem o mesmo espaço.
5. **Expressão editorial:** texto e composição com referências concretas ao produto.
6. **Mobile próprio:** menos elementos simultâneos e narrativa adequada à tela vertical.

Premium significa precisão: bons recortes, escala consistente, texto legível e movimento resolvido. Não exige reduzir a diversão ou transformar a identidade em uma estética sóbria.

### 12.1. Aplicação por seção

- **Hero:** cena principal com uma ação curta e memorável.
- **Vibes:** comparação de sensações com resposta rápida e diferenças reais de atmosfera.
- **Clássicos:** reconhecimento dos formatos e navegação contínua.
- **Mundo Fini:** cena com intenção ou contexto concreto de compartilhamento.
- **História:** ritmo mais calmo e evidência institucional confirmada.
- **Encerramento:** conclusão do percurso, evitando apenas repetir a promessa inicial.

## 13. Código versus novos assets

| Melhoria | CSS / JavaScript / GSAP | Necessidade de assets |
|---|---|---|
| Hierarquia, espaços e proporções | Implementável com a stack atual | Não |
| Escala óptica e posicionamento | Implementável | Não, se a resolução atual for suficiente |
| Ritmos e easings por objeto | Implementável | Não |
| Trocas mais rápidas | Implementável | Não |
| Profundidade por escala e sobreposição | Implementável | Não |
| Transições simples entre seções | Implementável | Não |
| Doces açucarados e translúcidos | Código apresenta e anima | Fotografias, recortes ou renders |
| Macro de textura | Código apresenta | Fotografia ou render |
| Lettering exclusivo | Código anima | Desenho tipográfico ou vetor |
| Embalagem em múltiplos ângulos | Limitado com imagem frontal | Fotografias adicionais ou modelo 3D |
| Embalagem abrindo e despejando doces | Simulação limitada com assets atuais | Sequência, vídeo ou 3D |
| Deformação convincente de minhoca | Possível com asset preparado | Vetor apropriado ou modelo |

### 13.1. GSAP

GSAP é opcional. Pode facilitar coordenação de timelines e transições vinculadas à rolagem, mas não corrige composição ou materialidade por si só. A primeira etapa pode ser executada com CSS e Web Animations API.

Uma eventual adoção deve responder a uma necessidade concreta de coordenação, manutenção ou interrupção de sequências.

### 13.2. 3D e WebGL

Não se recomenda introduzir WebGL antes de validar uma cena que realmente precise de interação tridimensional. Renders previamente produzidos podem entregar volume e iluminação sem o custo de uma cena 3D em tempo real.

O uso de 3D exigiria considerar modelagem, materiais, iluminação, peso, fallback e experiência em dispositivos modestos.

## 14. Performance e robustez

### 14.1. Pontos positivos identificados

- WebP local.
- Dimensões declaradas nas imagens.
- Carregamento tardio em várias áreas.
- Preload da imagem inicial.
- Decodificação antes de trocas.
- Cache de carregamento de produtos.
- Carregamento antecipado apenas do próximo item do hero.
- `IntersectionObserver` para revelações e visibilidade do hero.
- Cálculos de geometria orbital preparados para reaproveitamento.
- Uso de transformações para movimentos.

Essas escolhas são favoráveis, mas não substituem medições.

### 14.2. Pontos a medir e revisar

1. **Filtros e sombras:** medir custo de renderização quando várias imagens e doces se movem.
2. **Máscaras e recortes:** verificar custo das animações com `clip-path`.
3. **Camadas:** conferir quantidade e memória de superfícies promovidas para composição.
4. **Atualizações por frame:** medir o custo do conjunto de órbitas e profundidade.
5. **Fontes:** o `@import` externo participa da cadeia de carregamento; avaliar carregamento mais direto e eventual hospedagem local autorizada.
6. **Imagens responsivas:** avaliar variantes por tamanho antes de apenas aumentar a qualidade.
7. **Carregamento inicial:** medir LCP, CLS e comportamento com fontes indisponíveis.
8. **Interações:** observar resposta sob CPU limitada e durante carregamento de imagens.

### 14.3. Falhas e concorrência

Alguns erros de carregamento retornam silenciosamente. A futura implementação deve preservar o estado anterior e permitir compreensão e nova tentativa quando necessário.

Testar cliques rápidos, mudanças de direção, trocas de aba do navegador e alteração da preferência de movimento durante uma animação.

## 15. Acessibilidade e movimento reduzido

### 15.1. Recursos existentes

- Idioma `pt-BR`.
- Estrutura com header, main, seções e footer.
- Link para pular ao conteúdo.
- Títulos associados a seções.
- Textos alternativos e elementos decorativos ocultos da árvore acessível em diversos pontos.
- Indicadores de foco.
- Abas com seleção e navegação por setas, Home e End.
- Galeria com botões e navegação por teclado.
- Menu com Escape, contenção de foco e `inert`.
- Preferência de movimento reduzido considerada em CSS e JavaScript.
- Avanço manual do hero quando o movimento reduzido está ativo.

### 15.2. Pendências

- Medir contrastes em todos os estados.
- Revisar legibilidade dos menores textos.
- Confirmar dimensões e separação de alvos de toque.
- Verificar leitura e anúncios de conteúdo dinâmico.
- Validar menu, zoom e ampliação de texto.
- Verificar se a mudança para movimento reduzido cancela animações já em andamento.
- Conferir que o conteúdo permanece integralmente acessível sem animação.

### 15.3. Pausa e estados estáticos

O botão do hero controla seu contexto, não uma pausa global de toda a página. O ticker tem animação CSS infinita. Avaliar uma pausa que cubra os movimentos automáticos relevantes.

Com movimento reduzido, a experiência deve continuar editorialmente completa: produto, texto, seleção e CTA precisam aparecer em estados finais legíveis. Não basta remover o movimento se isso deixar conteúdo oculto ou dependente de uma sequência.

## 16. Experiência mobile

O CSS contém adaptações de layout e redução de efeitos. Ainda assim, não houve inspeção em viewport mobile nesta auditoria.

Prioridades de validação:

- Verificar a posição do CTA e da embalagem no início da página.
- Confirmar se o empilhamento de texto e arte torna o hero excessivamente longo.
- Avaliar os espaços reservados por alturas mínimas em títulos e descrições.
- Testar categorias com embalagens e displays de proporções diferentes.
- Conferir navegação horizontal do índice de clássicos.
- Testar gesto horizontal sem prejudicar rolagem vertical.
- Verificar sobreposição de selos, palavras e imagens em 320 px.
- Testar orientação horizontal e barras do navegador.
- Confirmar que a simplificação de parallax mantém a composição intencional.

Mobile deve ser tratado como composição própria. Menos doces simultâneos, menos texto decorativo e eventos mais curtos podem aumentar clareza e reduzir custo gráfico.

## 17. Conteúdo, links e acabamento

- O rodapé identifica redes sociais como espaço reservado; substituir ou remover conforme o escopo aprovado.
- Revisar se o destino de cada link corresponde à sua promessa. O link institucional atual aponta para uma categoria da loja.
- Confirmar datas e informações da história antes de enriquecê-la.
- Preservar a identificação de projeto conceitual independente.
- Diferenciar descoberta de produto e saída para a loja oficial.
- Evitar repetir CTAs que prometem novas descobertas, mas apenas retornam à mesma seção sem contexto adicional.

## 18. Ferramentas de teste existentes e limites

O repositório inclui ferramentas para validar caminhos, IDs, atributos de imagem e decodificação de WebP, além de um script de navegador com verificações de diferentes larguras, estados dinâmicos, menu, movimento reduzido e interações.

O script de navegador também grava screenshots e fecha o navegador controlado. Não foi executado durante a auditoria, respeitando a restrição de não alterar arquivos.

Não há resultado desta auditoria que permita declarar ausência de overflow, ausência de erros de runtime, aprovação de todos os assets ou funcionamento de todos os gestos. Esses itens permanecem pendentes de execução controlada.

## 19. Plano de implementação proposto

O plano abaixo depende de aprovação. Nenhuma etapa de implementação foi iniciada.

### P0 — Completar a observação e estabelecer uma referência

**Objetivo:** confirmar o diagnóstico em telas reais antes de editar.

- Inspecionar desktop e mobile no navegador.
- Observar o ciclo completo do hero e os diferentes formatos de embalagem.
- Percorrer todas as categorias e clássicos.
- Abrir e fechar o menu por diferentes caminhos.
- Verificar teclado, foco, zoom e movimento reduzido.
- Medir desempenho e registrar limitações do ambiente.
- Capturar referências somente quando a gravação de arquivos estiver autorizada.

**Resultado esperado:** evidências visuais e técnicas que distingam problemas reproduzidos de hipóteses.

### P1 — Hierarquia e composição com os assets atuais

**Objetivo:** obter alto impacto visual com baixo risco técnico.

- Reorganizar o hero ao redor de mensagem, produto e CTA.
- Ajustar escala óptica de embalagens e displays.
- Reduzir repetição de círculos, selos e palavras decorativas.
- Revisar textos pequenos e quebras de títulos.
- Dar função visual própria a Vibes e Clássicos.
- Compor o mobile de forma independente.

**Dependências:** assets atuais e confirmação visual.

**Critérios de revisão:** leitura clara, produto reconhecível, CTA acessível e ausência de sobreposições prejudiciais nas larguras observadas.

### P2 — Sistema de movimento

**Objetivo:** reduzir repetição e sensação mecânica.

- Separar famílias de easing e duração.
- Abreviar trocas de interface.
- Criar pausas e momentos de repouso.
- Dar personalidade de movimento a cada família de produto.
- Rever órbitas contínuas e alternância de camadas.
- Criar continuidade pontual entre seções.
- Garantir interrupção e resposta em interações rápidas.
- Consolidar pausa e movimento reduzido.

**Dependências:** CSS e JavaScript; GSAP somente se justificado.

**Critérios de revisão:** resposta imediata à escolha, continuidade compreensível, ausência de conteúdo dependente de movimento e custo compatível com os dispositivos avaliados.

### P3 — Materialidade e novos assets

**Objetivo:** elevar diferenciação e percepção de qualidade.

- Produzir ou obter doces recortados com textura.
- Definir iluminação e perspectiva consistentes.
- Criar lettering quando ele tiver função de marca.
- Avaliar macros e cenas renderizadas.
- Usar 3D em tempo real apenas diante de necessidade concreta.

**Dependências:** produção ou fornecimento de assets e definição de direitos de uso.

**Critérios de revisão:** coerência entre produto e elementos ao redor, recortes limpos e qualidade suficiente na escala de exibição.

### P4 — Narrativa e conteúdo

**Objetivo:** tornar o percurso específico da Fini.

- Tornar Vibes mais sensorial.
- Valorizar o reconhecimento dos formatos em Clássicos.
- Dar contexto concreto ao Mundo Fini.
- Enriquecer a história com informações e imagens confirmadas.
- Resolver placeholders e destinos de links.
- Reavaliar a função do encerramento.

**Dependências:** conteúdo validado e direção de arte aprovada.

**Critérios de revisão:** cada seção acrescenta informação, sensação ou ação distinta.

### P5 — Acabamento e validação final

**Objetivo:** consolidar qualidade visual, acessibilidade e desempenho.

- Validar desktop, mobile e orientação horizontal.
- Testar teclado, leitor de tela, zoom e alvos de toque.
- Medir carregamento, estabilidade e resposta das interações.
- Avaliar aparelhos modestos e rede limitada.
- Rever filtros, camadas e resolução das imagens conforme evidências.
- Confirmar estados de falha e comportamento sem fontes externas.

**Critérios de revisão:** resultados registrados com ambiente e limites explícitos, sem alegações de aprovação não demonstradas.

Acessibilidade e performance devem acompanhar todas as etapas; P5 consolida a verificação, não adia esses requisitos.

## 20. Matriz de prioridade

| Frente | Impacto esperado | Esforço relativo | Prioridade |
|---|---|---|---|
| Completar inspeção visual | Alto: fundamenta decisões | Baixo a médio, condicionado ao acesso | P0 |
| Hero e escala de produtos | Alto | Médio | P1 |
| Legibilidade e hierarquia mobile | Alto | Médio | P1 |
| Redução de repetição decorativa | Alto | Baixo a médio | P1 |
| Timing, easing e interrupções | Alto | Médio | P2 |
| Pausa e movimento reduzido | Alto para acesso e conforto | Médio | Transversal / P2 |
| Novos doces e materialidade | Alto para diferenciação | Médio a alto | P3 |
| Conteúdo específico e história | Médio a alto | Médio | P4 |
| 3D em tempo real | Incerto antes de protótipo | Alto | Condicional |

Os esforços são estimativas qualitativas de escopo, não orçamento ou prazo validado.

## 21. Recomendação de sequência e estado final

A primeira intervenção recomendada é recompor o hero e reduzir a repetição visual com os assets atuais. Em seguida, ajustar o sistema de movimento e validar resposta e desempenho. Novos assets de doces soltos tendem a oferecer mais diferenciação do que acrescentar animações às mesmas formas CSS.

A implementação permanece aguardando aprovação. Este documento registra a auditoria, suas recomendações e suas limitações; não representa aprovação visual do site nem resultado de testes que não foram executados.

## 22. Atualização P0 — Inspeção visual e validação executadas

### 22.1. Ambiente e integridade

O relatório original foi lido integralmente. O site foi servido por Python 3.13.9 em **http://127.0.0.1:8000/**, com resposta HTTP 200 confirmada. A automação utilizou Node.js 22.19.0 e uma instância isolada de Chrome headless com Chrome DevTools Protocol na interface local, porta 9223. Nenhuma dependência foi instalada.

O acesso headless funcionou, superando a limitação da tentativa anterior de controle da janela do navegador. Isso não equivale a inspeção em celular físico ou avaliação manual contínua de vídeo.

Os hashes SHA-256 dos arquivos abaixo foram registrados antes e depois das capturas e permaneceram iguais:

| Arquivo | SHA-256 |
|---|---|
| `index.html` | `8D35634CEC434E2E703425AE75B39D9DBAB1A14E65261751D55B2FBD636A5E2B` |
| `css/style.css` | `734B8CEBD51C137452D28EF1D121EFF262055B7BF1ABE2B9D8C8391184BB8C0B` |
| `js/script.js` | `BFAC60B117EBD55D4A25AAF0C801913E91450FBF218F6DC295C55D61B00EDCC8` |
| `tools/check_site.mjs` | `F49361829B15C7CA96ED8546FEED74C25995F780B58B5CA6633711D43728DF00` |

Também foi executado `git diff --exit-code` para esses quatro arquivos, sem diferenças. Não houve alteração no site, commit ou deploy.

### 22.2. Revisão e execução do script existente

O `tools/check_site.mjs` foi revisado antes da execução. Seus efeitos relevantes são: conectar à primeira página do Chrome na porta 9223, navegar para um arquivo local, alterar estados apenas no DOM da página de teste, criar/gravar imagens em `tools/screenshots` e fechar o navegador com `Browser.close`.

Para preservar arquivos existentes e evitar interferência no Chrome pessoal, foi criada uma adaptação exclusiva da auditoria:

- `auditoria/p0-20261024-01/run-existing.mjs`: prepara e executa a cópia.
- `auditoria/p0-20261024-01/check_site.audit.mjs`: cópia derivada do teste original, com destino de screenshots substituído e navegação alterada de `file:///` para HTTP local.
- `auditoria/p0-20261024-01/existing-tests.log`: saída completa e código de saída.
- `auditoria/p0-20261024-01/inspect.mjs`: inspeção complementar e capturas por seção.
- `auditoria/p0-20261024-01/inspection.json`: medidas, estados de movimento, geometria do menu e eventos de erro da inspeção complementar.

O teste derivado terminou com **código de saída 0**. As mudanças da adaptação não alteram as asserções originais. O Chrome foi reaberto de forma isolada para a inspeção complementar após seu encerramento pelo teste.

O perfil temporário do Chrome também fica dentro da pasta de auditoria. Ele é um artefato de execução, não parte dos assets do site.

### 22.3. Evidências visuais salvas

Diretório exclusivo: **`auditoria/p0-20261024-01/screenshots/`**. Os arquivos da auditoria foram criados sem sobrescrever capturas anteriores.

Capturas completas do teste existente:

- [Desktop 1440](auditoria/p0-20261024-01/screenshots/1440.png).
- [Mobile 375](auditoria/p0-20261024-01/screenshots/375.png).
- [Mobile 320](auditoria/p0-20261024-01/screenshots/320.png).
- [Mobile 430](auditoria/p0-20261024-01/screenshots/430.png).
- [Tablet 768](auditoria/p0-20261024-01/screenshots/768.png).
- `menu.png` e `tubes.png`: estados complementares previstos pelo teste.

Capturas individuais: arquivos com prefixos `1440-`, `375-` e `320-`, seguidos de `inicio`, `vibes`, `classicos`, `mundo`, `sobre` e `final`. Há também estados Tubes em Vibes e Clássicos, menu mobile, menu horizontal e amostras de troca do hero e de Vibes.

**Cuidados ao interpretar as capturas:**

- O teste original percorre a página e força a classe `visible` antes das capturas completas. Essas imagens mostram o layout revelado, mas não comprovam o disparo natural de todas as entradas.
- A inspeção complementar não força as revelações. Capturas fora do viewport podem mostrar conteúdos ainda ocultos. Isso não deve ser automaticamente classificado como desaparecimento durante uso normal.
- Algumas capturas complementares sem recorte abrangem o documento inteiro. O header sticky pode aparecer na posição de rolagem atual e o link de pular conteúdo pode estar visível por foco. Esses registros não representam múltiplos headers no site.
- Os nomes `300ms` e `350ms` indicam a espera solicitada pelo script antes da captura, não precisão temporal garantida do frame produzido pelo Chrome. Não são medições de duração ou FPS.

### 22.4. Resultados técnicos confirmados

| Verificação | Resultado observado | Limite da conclusão |
|---|---|---|
| HTTP local | Resposta 200 | Não valida hospedagem pública |
| Larguras 320, 375, 430, 768, 1024, 1440 e 1920 | Sem overflow horizontal global nas amostras do teste | Não garante ausência de todo recorte interno |
| Imagens presentes no DOM | Lista de imagens quebradas vazia nas amostras | Não mede qualidade visual |
| Decodificação dos assets | 21 WebPs decodificados | Não valida fidelidade de marca |
| Vibes | Quatro opções testadas em 320, 375, 430, 768 e 1440 | Teste programático, majoritariamente com movimento reduzido |
| Altura de Vibes | 628 px em 320; 640 px em 375/430; 540 px em 768/1440 | Estabilidade não implica aproveitamento ideal do espaço |
| Clássicos | Cinco opções carregadas e selecionadas nas larguras previstas | Não é revisão visual de cada produto em cada largura |
| Menu | Abre e fecha; `inert` e contenção de foco previstos no teste passaram | Não substitui teste completo com leitor de tela |
| Teclado da galeria | Avanço e retorno passaram | Eventos despachados programaticamente |
| Swipe da galeria | Mudança de produto passou | Gesto sintético, não toque físico |
| Hero automático | Legenda mudou de Dentaduras para Ursinhos | Confirma ciclo, não qualidade subjetiva de easing |
| Pausa orbital | Transformação permaneceu estável após pausa | Não é pausa de toda a página |
| Camadas orbitais | Foram observadas camadas 2 e 5 | Não garante transição perceptiva suave |
| Cinco avanços do hero | Imagens válidas e altura da composição estável | Não equivale a medição global de CLS |
| Parallax desktop | Transformação mudou com rolagem | Não mede fluidez |
| Parallax mobile | Transformação permaneceu estável | Confirma simplificação |
| Animação em 320 | Sem overflow global nas dez amostras de troca do clássico | Não é monitoramento contínuo de todos os frames |
| Exceções de runtime | Lista vazia no teste existente | Limitada aos eventos e cenários cobertos |
| Erros complementares | Nenhum evento registrado de exceção ou `Network.loadingFailed` | Não verifica todos os códigos HTTP ou todos os logs |
| Fontes | `document.fonts.status` carregado; verificações de Fredoka e DM Sans positivas | Não mede atraso de fontes nem comportamento offline |

### 22.5. Diagnóstico visual por seção

#### Hero

**Confirmado visualmente:** headline, embalagem e CTA possuem hierarquia clara. A embalagem de Minhocas é grande, reconhecível e tem recorte utilizável, sem retângulo de fundo aparente. A sombra cria separação. Não foi observado um problema grosseiro que exija substituir imediatamente esse asset.

A palavra amarela é parcialmente encoberta pela embalagem, funcionando mais como textura do que como texto. O selo, as estrelas, as linhas e a nota lateral ampliam a ornamentação. Há oportunidade de simplificar, mas a hipótese de colapso da hierarquia não se confirmou nas capturas principais.

No mobile, texto e arte são sequenciais. Em 375 × 900, o final do hero fica a aproximadamente **901 px do topo do documento**, enquanto o CTA ocupa aproximadamente **391 a 451 px**. Em 320 × 900, o final fica em **859 px** e o CTA entre **389 e 449 px**. Portanto, o CTA está acessível cedo nessas condições; a oportunidade é apresentar a embalagem e a próxima seção com menos extensão vertical. Alturas menores de viewport ainda merecem validação.

As amostras da troca Minhocas → Dentaduras mostram continuidade de enquadramento e atualização de palavra/cor. Não há evidência de um flash vazio nas amostras, e o teste confirma estabilidade da composição. Isso não permite julgar todos os frames intermediários ou afirmar que o easing está perfeito.

**Prioridade:** refinar composição e personalidade; preservar carregamento antecipado, decodificação, área estável, pausa e continuidade entre imagens.

#### Vibes

**Confirmado visualmente:** a fórmula embalagem inclinada + palavra ao fundo + selo repete o hero. O painel pastel é limpo e coerente, mas a diferenciação depende principalmente de cor e texto.

No mobile há espaços verticais expressivos entre título, descrição, link e produto. O painel permanece estável entre opções, mas as alturas reservadas geram uma experiência longa. As quatro abas quebram em duas linhas em 375 px, com Clássicos na segunda. Isso não é overflow, mas enfraquece a percepção de conjunto.

O display Tubes tem presença visual menor e mais horizontal que a embalagem vertical. O recorte é utilizável; a oportunidade é equalizar escala óptica e enquadramento, sem esticar a imagem.

**Ocorrência a reproduzir:** capturas individuais `1440-vibes.png` e `375-vibes.png`, obtidas por navegação programática direta, mostram o espaço do título externo sem o título revelado. A captura completa preparada pelo teste mostra o título. O fato confirmado é a diferença entre os dois métodos; ainda não está confirmado que o clique real na âncora ou a rolagem normal deixam o título permanentemente oculto. O teste original pode mascarar problemas de reveal ao forçar `visible`. Investigar isso antes de classificar como bug definitivo de produção.

**Prioridade:** validar revelação por âncora, reduzir espaços reservados e dar uma ação sensorial própria ao painel.

#### Clássicos

**Confirmado visualmente:** o fundo azul cria uma ruptura forte e melhora a diferenciação em relação a Vibes. A avaliação inicial de repetição precisa ser moderada: a gramática do produto se repete, mas a seção não parece apenas mais um painel pastel.

A embalagem Dentaduras fica bem destacada sobre o disco claro; não foram observados fundos retangulares ou recortes grosseiros na escala examinada. O título, nome e descrição têm boa hierarquia relativa. O índice é discreto e pequeno. Em 320 px, a faixa deixa parte das opções fora da área inicial, exigindo descoberta da rolagem horizontal.

Tubes usa uma caixa horizontal com perspectiva, cuja presença difere da embalagem vertical. A equalização deve ser óptica, preservando proporção. Não se confirmou a necessidade de reconstruir a galeria por falha funcional.

**Prioridade:** legibilidade e descoberta do índice, escala por formato e refinamento de resposta; preservar o contraste azul e os controles existentes.

#### Mundo Fini

**Confirmado visualmente:** a cena rosa é expressiva e possui mais riqueza de planos do que a auditoria puramente técnica poderia sugerir. Tipografia central, “SINTA.”, elipses e embalagens periféricas constroem uma composição reconhecível. O teste comprova variação de transformação no desktop e simplificação no mobile.

Não foi observada colisão importante das embalagens com o texto central nas capturas examinadas. No mobile, produtos nas bordas e na base são parcialmente cortados por intenção compositiva. Diferenciar esses cortes de defeitos de recorte do arquivo.

Há **duas argolas amarelas próximas na parte superior direita do mobile**: a ponte de Clássicos e a argola do Mundo Fini. A repetição é visível e merece redistribuição. As formas CSS têm acabamento mais sintético que as embalagens.

**Prioridade:** ajustar a duplicação decorativa e a materialidade. Não remover todo o sistema de profundidade sem uma alternativa visual aprovada.

#### História

**Confirmado visualmente:** funciona como uma pausa mais calma. Mascote, círculo e texto têm separação adequada; no mobile o personagem vem antes da informação. Os anos se destacam, mas suas legendas e o pequeno texto superior têm pouca presença pelo tamanho.

A seção permanece genérica do ponto de vista narrativo: duas datas e um parágrafo abstrato não sustentam uma história rica. Isso é oportunidade editorial, não falha técnica comprovada. O asset do mascote tem suavidade perceptível; não há evidência suficiente para condenar sua resolução sem comparação em escala e dispositivo físico.

**Prioridade:** legibilidade, conteúdo concreto e eventual ampliação de acervo; manter o ritmo calmo.

#### Menu

**Confirmado em retrato:** o menu azul de tela cheia tem boa separação, links grandes e CTA amarelo. As funções cobertas pelo teste passaram.

**Problema confirmado em 667 × 375:** o link “Produtos” inicia em **y = 22,5 px**, na região da logo. A captura `667x375-menu.png` mostra sobreposição. O CTA da loja ocupa **y = 352,5 a 402,5 px**, ultrapassando a altura inicial de 375 px; a navegação tem altura de rolagem de 468 px. A possibilidade de rolar não resolve a colisão superior.

**Prioridade alta:** revisar alinhamento vertical e espaçamento do menu para viewports baixos; validar rolagem, foco e alcance de todos os links. Não alterar o menu sem aprovação.

#### Encerramento e rodapé

**Confirmado visualmente:** o amarelo cria um fechamento forte. O leque de embalagens tem recortes nas bordas e base; nas capturas parece uma decisão gráfica, não imagem quebrada. No mobile existe um intervalo amplo entre CTA e produtos.

O encerramento repete a descoberta da “sua Fini” e retorna às vibes; continua válida a oportunidade de dar uma conclusão mais específica ao percurso. O rodapé mantém textos muito pequenos e placeholders sociais. Não foi medida conformidade de contraste.

**Prioridade:** revisar espaços, legibilidade e função do CTA; preservar a mudança de cor e a ideia de coleção.

### 22.6. Animações: o que foi validado e o que realmente mudar

**Preservar:** decodificação, troca sem área vazia planejada, altura estável do hero, controles de pausa/avanço, estados de teclado, profundidade desktop e simplificação mobile. Os resultados não justificam substituir toda a animação nem adicionar GSAP como correção automática.

**Modificar na etapa aprovada:** repetição do gesto entre hero, Vibes e Clássicos; excesso de elementos decorativos equivalentes; relação entre tipo de doce e sua ação; espaço e escala óptica nas transições de sacos para displays. Esses são ajustes de direção e UX, não falhas de carregamento.

**Pausa:** a inspeção complementar registrou `heroPaused: true` enquanto o ticker continuava com `animationPlayState: running`. Isso confirma o escopo local da pausa. Não é necessariamente um erro de rótulo, pois o botão se refere ao hero; permanece a oportunidade de oferecer controle dos demais movimentos automáticos.

**Movimento reduzido:** o teste registrou hero e órbita estacionários. A inspeção complementar registrou `animationName: none` no ticker após ativar a preferência. Portanto, a hipótese de ticker continuar animando com movimento reduzido não se confirmou. A mudança de preferência no meio de uma animação ativa ainda não foi testada de forma específica.

**Limite:** foram analisados estados, transformações e capturas temporais. Não houve gravação de vídeo nem observação contínua em velocidade real. A severidade de problemas subjetivos de timing, easing e fluidez permanece parcial. Os intervalos nominais das capturas não são benchmarks.

### 22.7. Comparação com as hipóteses anteriores

| Hipótese | Situação após P0 |
|---|---|
| Página inteira visualmente uniforme | Parcial: Clássicos azul e Mundo Fini rosa dão contraste expressivo |
| Repetição de embalagem, palavra e selo | Confirmada em hero e Vibes, com variações em outras seções |
| Doces CSS não acompanham materialidade das embalagens | Confirmada como avaliação visual |
| Recortes das embalagens poderiam exigir substituição | Não confirmada nos principais produtos examinados; manter validação de detalhe |
| Hero mobile pode ser longo | Confirmado pela extensão; CTA, porém, permanece acessível cedo |
| Parallax poderia estar ausente ou sem efeito | Refutada funcionalmente: transformação desktop varia |
| Órbitas sem profundidade | Refutada tecnicamente: escala/camadas e movimento foram verificados |
| Menu precisa de validação em horizontal | Problema confirmado em 667 × 375 |
| Possível overflow global mobile | Não observado nas larguras e amostras testadas |
| Movimento reduzido insuficiente em todos os elementos | Não confirmado como generalização; ticker, hero e órbita responderam nos testes |
| Animações de reveal merecem atenção | Mantida: há diferença entre captura preparada e navegação programática direta |
| Performance em aparelho modesto pode sofrer | Continua hipótese, sem medição de aparelho físico |

### 22.8. Prioridades revistas

1. **Alta — Menu em viewport baixo:** corrigir sobreposição com logo e alcance inicial dos links quando houver autorização.
2. **Alta para investigação — Reveal por navegação direta:** reproduzir clique real e rolagem normal, sem forçar classes. Não declarar resolvido a partir das capturas completas preparadas.
3. **Média/alta — Mobile:** reduzir extensão e espaços em Vibes e encerramento; melhorar composição do hero sem perder o CTA acessível.
4. **Média — Escala óptica:** tratar displays e sacos com enquadramentos próprios.
5. **Média — Movimento e decoração:** reduzir repetição e redistribuir as duas argolas na entrada do Mundo Fini.
6. **Média — Legibilidade e conteúdo:** revisar pequenos textos, índice, placeholders e narrativa institucional.
7. **Posterior — Assets táteis:** produzir doces adequados após validar a composição com os assets existentes.
8. **Condicional — GSAP ou 3D:** nenhuma evidência coletada torna sua adoção obrigatória.

### 22.9. Limitações que permanecem

- Sem celular físico, leitor de tela, zoom manual ou interação tátil real.
- Sem medição de FPS, Lighthouse, Core Web Vitals, CPU limitada ou rede limitada.
- Sem medição completa de contraste e conformidade WCAG.
- Sem inspeção visual individual de cada uma das 21 imagens em todos os contextos; todas decodificaram, mas isso não equivale a aprovação artística.
- Sem confirmação de fidelidade cromática de marca.
- Sem validação de todos os links externos ou afirmações institucionais.
- Sem teste específico de alteração de movimento reduzido durante transição ativa.
- Capturas de página inteira e navegação programática têm os artefatos descritos acima.

**Estado da etapa:** inspeção headless e testes existentes executados, evidências salvas e diagnóstico atualizado. P0 avançou substancialmente; os itens de validação manual e desempenho permanecem explicitamente pendentes. Nenhuma melhoria foi implementada. A execução das próximas etapas aguarda autorização.
