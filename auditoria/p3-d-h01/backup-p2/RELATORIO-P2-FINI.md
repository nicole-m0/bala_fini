# Relatório P2 — Motion Design e Profundidade Visual

Data: 24/10/2026.

Estado: implementação local concluída e validada nos cenários descritos. **Aguardando revisão da pessoa solicitante.** Não houve commit ou deploy.

## 1. Escopo e preservação de P1

Foram lidos integralmente `AUDITORIA-VISUAL-FINI.md`, incluindo a atualização P0, e `RELATORIO-P1-FINI.md`.

A implementação usa CSS, JavaScript e Web Animations API. Não foram instaladas dependências. Não foram utilizados GSAP, React, Three.js ou WebGL.

Em relação ao estado P1 aprovado, apenas `css/style.css` e `js/script.js` foram alterados. O HTML, os textos editoriais, as informações de produtos e os 21 assets permanecem iguais ao backup P1. As diferenças de HTML que ainda aparecem em relação ao último commit pertencem a P1, não a esta etapa.

Permanecem a composição editorial de Vibes, as cores principais, os enquadramentos em repouso, o menu corrigido em viewport horizontal, a correção de reveal, as âncoras, a galeria, o teclado, o swipe e os controles do hero.

## 2. Backup e rastreabilidade

Backup criado antes das edições:

**`auditoria/p2-20261024-01/backup-p1/`**

Inclui HTML, CSS, JavaScript, assets, ferramentas de teste e os dois relatórios lidos. Não inclui credenciais ou arquivos de autenticação.

Registros:

- [Estado inicial do Git](auditoria/p2-20261024-01/git-inicial.txt).
- [Hashes do estado P1](auditoria/p2-20261024-01/hashes-p1.json).
- [Estado posterior do Git](auditoria/p2-20261024-01/git-final.txt), registrado antes de criar este relatório.
- [Diferença de código entre P1 e P2](auditoria/p2-20261024-01/p1-to-p2.patch).
- [Manifesto de integridade e validação](auditoria/p2-20261024-01/manifesto-final.json).

O Git já continha as alterações aprovadas de P1 e artefatos locais não rastreados. Nenhum trabalho anterior foi descartado. A referência de recuperação desta etapa é o backup P1, não um novo commit.

## 3. Direção de movimento

O movimento deixou de usar uma única curva e um mesmo gesto para todas as seções. A proposta utiliza:

- Hero: antecipação curta, trânsito em profundidade, acomodação e leitura em repouso.
- Doces: passagem alternada diante e atrás da embalagem, com períodos próprios de deslocamento e descanso.
- Vibes: reações locais e sensoriais, sem mover o bloco editorial inteiro.
- Clássicos: produtos compartilhando uma pista espacial, com sentido reversível.
- Mundo Fini: camadas com deslocamentos limitados e amortecimento.
- Interface: feedback curto e previsível; o movimento não condiciona o acesso ao controle.

Opacidade continua sendo usada para sobrepor produtos durante trocas, mas não é o único recurso de expressão. As mudanças de escala e perspectiva são simulações gráficas com os assets existentes, não modelos tridimensionais ou física real.

## 4. Hero — Coreografia principal

### 4.1. Movimento por produto

| Produto de entrada | Gesto | Duração nominal de entrada |
|---|---|---|
| Minhocas Azedinhas | Aproximação em curva, torção discreta e acomodação | 920 ms |
| Dentaduras | Entrada superior com pequena articulação no eixo X e acomodação vertical | 820 ms |
| Ursinhos | Elevação curta e pequena resposta elástica | 760 ms |
| Amoras | Aproximação por profundidade e escala, com pouca translação lateral | 900 ms |
| Tubes | Movimento mais firme, lateral, com inclinação no eixo Y | 980 ms |

As entradas têm atraso de 60 ms em relação ao início da troca. A saída dura 560 ms e começa com uma antecipação pequena antes de recuar. O produto recebido ultrapassa discretamente o repouso e se acomoda.

O plano de imagem usa perspectiva CSS. A composição final retorna à pose P1; não há alteração de layout por frame. No mobile, as maiores excursões de profundidade são reduzidas.

A palavra de apoio tem gesto menor e o selo responde em outro momento da troca, evitando que todos os elementos tenham o mesmo pico de movimento. Após a conclusão, o agendamento conserva 4,2 segundos de leitura antes de iniciar a próxima troca automática.

### 4.2. Controles e continuidade

- Carregamento antecipado do próximo produto e decodificação antes da troca preservados.
- Área de apresentação e enquadramento final preservados.
- Pausa passa a congelar as animações WAAPI em andamento no hero, além das órbitas.
- Retomar continua a partir dos tempos pausados.
- Avançar durante a pausa acomoda a transição pendente e apresenta o destino solicitado sem reativar o ciclo automático.
- Avanços rápidos acumulam a intenção de navegação e mantêm apenas o destino pendente mais recente, sem criar uma fila ilimitada de imagens.
- Uma aba oculta suspende os trabalhos WAAPI; o hero fora da tela também suspende sua transição.

### 4.3. Defeito encontrado e corrigido na inspeção de frames

A primeira versão de P2 cancelava o efeito da saída assim que sua duração acabava, mas mantinha o nó da imagem até a entrada terminar. Isso permitia que a embalagem anterior reaparecesse brevemente atrás da nova.

A correção remove a imagem de saída no encerramento da própria saída. A validação final registrou sua remoção enquanto a entrada ainda se acomodava. As sequências finais mostram a troca Amoras → Tubes sem o reaparecimento observado na versão intermediária.

## 5. Doces — Passagem entre planos

As trajetórias foram recentradas na área da embalagem e estreitadas para atravessar visualmente sua projeção. O sistema combina:

- Ordem de camada traseira/dianteira em relação à embalagem.
- Escala entre aproximadamente 0,68 e 1,16 conforme o plano.
- Opacidade entre aproximadamente 0,62 e 1.
- Balanço das minhocas, evitando a sensação de girarem como uma placa rígida.
- Rotação distinta para a argola.
- Períodos próprios de 12, 17 e 21 segundos, com fase deslocada.
- Percurso com aceleração/desaceleração e repouso em 16% de cada período.

O mobile mantém dois doces visíveis. A geometria é medida no resize e reutilizada; os frames atualizam transformações, opacidade e camada. As formas CSS foram preservadas. Sua diferença de materialidade em relação às embalagens continua sendo um limite dos assets, reservado a P3.

## 6. Vibes — Transições sensoriais

### 6.1. Identidade de cada categoria

| Categoria | Reação do produto | Duração nominal |
|---|---|---|
| Azedinho | Oscilação curta lateral e angular, com acomodação rápida | 460 ms |
| Docinho | Aproximação suave e pequena expansão/acomodação | 640 ms |
| Tubes | Movimento lateral curto e torção em perspectiva | 540 ms |
| Clássicos | Pequeno giro e pressão de escala, retornando ao repouso | 420 ms |

A área de cor também reage: duração de cor por categoria e uma resposta luminosa discreta, transitória e local. Essa resposta não cria novos stickers nem altera o topo curvo aprovado em P1. Termina em repouso.

A saída usa uma cópia temporária do mesmo asset, decorativa e sem ID, removida ao terminar. O produto recebido mantém a pose vertical final de P1. Não há animação de entrada do bloco editorial inteiro a cada seleção.

### 6.2. Resposta e acessibilidade

- `aria-selected`, posição na navegação por teclado e indicador de seleção são atualizados imediatamente, antes de aguardar a imagem.
- `aria-busy` identifica o carregamento transitório do painel.
- Conteúdo e imagem são atualizados após decodificação válida.
- A última requisição válida prevalece em alternâncias rápidas.
- Em falha de carregamento, seleção e associação do painel retornam ao último estado efetivamente exibido.
- Cópias temporárias usam `aria-hidden` e alt vazio; não duplicam os IDs da página.

A variação moderada de altura conforme a categoria continua sendo a decisão aprovada em P1. P2 não adiciona interpolação contínua de altura.

## 7. Clássicos — Continuidade espacial

Saída e entrada acontecem simultaneamente em uma pista compartilhada. Avançar envia o produto anterior para um lado e recebe o próximo pelo outro; voltar inverte esse sentido.

Embalagens verticais têm uma oscilação angular pequena e assentamento mais rápido. Displays têm trânsito mais firme e inclinação em perspectiva, com duração maior:

- Saída: 400 ms.
- Entrada vertical: 520 ms.
- Entrada de display: 620 ms.
- Número: deslocamento de contraponto reduzido, de apenas 10 px antes de voltar ao repouso.

O nome e as informações deixam de depender de uma máscara longa em cada troca. A continuidade principal fica no produto. No mobile, a amplitude lateral é reduzida para 65%.

Botões, índice, teclado e swipe foram preservados. Requisições obsoletas não substituem o estado mais recente, e as imagens temporárias são removidas após a troca. Em erro de imagem, o estado selecionado retorna ao último produto efetivamente exibido.

## 8. Mundo Fini — Profundidade com limites

O parallax usa amortecimento dependente do tempo entre frames, em vez de aplicar diretamente todo o deslocamento da rolagem. A constante de amortecimento é de 85 ms; isso não é uma promessa de duração fixa para o movimento completo.

Limites principais:

| Plano | Limite de deslocamento vertical |
|---|---|
| Texto principal | 5 px |
| Embalagens | 50 px |
| Outros elementos decorativos | 70 px |

A rotação é limitada a 6°, e a variação de escala das embalagens a 1,8%. O texto fica no plano mais estável. As velocidades derivam das camadas existentes, reduzidas para manter leitura.

No mobile e com movimento reduzido, o parallax fica estático. `will-change` deixa de ser aplicado permanentemente a todas as camadas e é reservado ao contexto visível no desktop. Não houve mudança de conteúdo ou de disposição estrutural do Mundo Fini.

## 9. Microinterações e ritmo entre seções

- Botões: resposta mais curta, elevação discreta no hover/foco e pressão curta no acionamento, sem a deformação ampla anterior.
- Abas: seleção imediata, marcador curto e retorno rápido ao repouso.
- Controles da galeria: hover contido e feedback de acionamento.
- Menu mobile: entrada dos links mais curta, com intervalos menores.
- Revelações: tempos ajustados por seção, preservando a correção do observador de Vibes feita em P1.
- História permanece uma pausa calma; o encerramento conserva a entrada em leque, com duração mais compacta.
- Ticker: animação suspensa quando está fora da tela e quando a página está oculta.

A conexão gráfica já existente entre Clássicos e Mundo Fini foi preservada. Não foi acrescentado um objeto que percorre toda a página nem controle artificial da rolagem.

## 10. Implementação técnica e movimento reduzido

### 10.1. Escolhas técnicas

Não houve necessidade concreta de GSAP: Web Animations API permite curvas por gesto, keyframes de antecipação/acomodação, pausa, retomada, cancelamento e finalização.

Um registro central mantém somente os trabalhos WAAPI ativos. Ao terminar ou cancelar, os efeitos são liberados e o CSS volta ao estado de repouso aprovado. As cópias temporárias de produto são limitadas ao contexto da troca.

Os movimentos principais usam `transform` e opacidade. Não se escrevem largura, altura, posição de layout ou margens a cada frame. As dimensões das cópias são obtidas uma vez por interação; a cor da área de Vibes é uma transição CSS limitada à troca de categoria. A geometria orbital é reutilizada.

### 10.2. Preferência de movimento

Com `prefers-reduced-motion`:

- Não há ciclo automático do hero.
- Os doces ficam estáticos.
- O parallax fica estático.
- As transições finitas em andamento são finalizadas, limpando imagens temporárias.
- O conteúdo continua acessível em seu estado final.
- Avanço manual e seleção de categorias continuam funcionando.
- A reação luminosa de Vibes é desativada.
- O tratamento CSS existente que remove animações e transições permanece ativo.

Durante o teste, o Chrome emulado atualizou `matchMedia().matches` antes de entregar o evento de mudança. Foi acrescentada uma checagem leve da preferência nos frames já ativos e na entrada de novas animações, além do listener normal. Não foi criado polling contínuo por timer.

O botão de pausa continua se referindo ao hero. Ele não foi transformado em um controle global de movimento da página.

## 11. Testes executados na versão final

Ambiente: servidor Python local em **http://127.0.0.1:8002/**, Node.js e Chrome headless isolado, com cache desativado nas execuções de navegador. Nenhuma dependência foi instalada.

### 11.1. Suite existente preservada

`tools/check_site.mjs` permaneceu intacto. Foram usadas cópias de execução com alteração apenas da URL, destino de capturas e desativação do cache, mantendo as asserções originais.

| Execução final | Resultado | Log |
|---|---|---|
| Suite completa | Código 0 | [tests-delivery/existing-tests.log](auditoria/p2-20261024-01/tests-delivery/existing-tests.log) |
| Pausa/retomada com foco mantido no botão | Código 0 | [tests-focus/existing-tests.log](auditoria/p2-20261024-01/tests-focus/existing-tests.log) |

A suite completa confirmou, dentro de sua cobertura:

- Sem overflow global nas amostras de 320, 375, 430, 768, 1024, 1440 e 1920 px.
- Sem imagens quebradas nas amostras e 21 WebPs decodificados.
- Seleção das quatro categorias e cinco clássicos nas larguras previstas.
- Ciclo do hero, pausa orbital, camadas e altura estável da composição.
- Cinco avanços do hero com imagem válida.
- Movimento reduzido estacionário para hero e órbita.
- Menu, `inert` e contenção de foco cobertos pelo teste.
- Teclado da galeria e swipe sintético.
- Parallax desktop variável e mobile simplificado.
- Sem overflow global nas dez amostras de uma troca animada em 320 px.
- Lista de exceções de runtime vazia.

### 11.2. Cenários adicionais de P2

Resultados completos: [motion-approved-build/results.json](auditoria/p2-20261024-01/motion-approved-build/results.json). O nome da pasta identifica a execução técnica final; não significa aprovação da pessoa solicitante para P2.

| Cenário | Resultado observado |
|---|---|
| Remoção da embalagem de saída | Confirmada enquanto a entrada ainda estava se acomodando |
| Pausa no meio de uma troca | Tempos WAAPI, transformações das imagens e órbita permaneceram iguais durante a pausa de teste |
| Avanço durante a pausa | Acomodação concluída sem retomar automaticamente |
| Sete avanços rápidos | Destino final esperado, uma única imagem de hero ao terminar |
| Seleções rápidas em Vibes | Seleção imediata e sem cópias temporárias remanescentes ao concluir |
| Oito avanços rápidos em Clássicos | Sem cópias temporárias remanescentes ao concluir |
| Segunda aba real do Chrome | `document.hidden` observado como verdadeiro; tempos e órbita permaneceram estáveis |
| Retorno à aba | Transição concluída após restaurar o viewport emulado |
| Movimento reduzido durante hero | Troca finalizada, uma imagem e nenhum trabalho WAAPI remanescente |
| Avanço manual com movimento reduzido | Produto alterado sem reativar o ciclo |
| Movimento reduzido durante Vibes | Transição finalizada sem cópias ou trabalhos remanescentes |
| Mobile 320, 375 e 430 | Hero, Tubes e galeria registrados; sem overflow global ou imagens quebradas nas amostras; uma imagem de hero ao repouso |
| Mundo Fini no mobile | Transformação da embalagem permaneceu igual após rolar |
| Menu 667 × 375 | Primeiro link abaixo da logo e todos os links dentro do viewport |
| Exceções/network loading failures na execução adicional | Lista vazia nos eventos monitorados |

Os cliques de seleção foram enviados como entrada de mouse do navegador. A suite original também usa eventos DOM e gestos sintéticos; isso não equivale a toque físico ou ensaio manual com leitor de tela.

### 11.3. Arquivos e integridade

Passaram:

```text
python -B tools/validate_files.py
node --check js/script.js
git diff --check
node auditoria/p2-20261024-01/verify-delivery.mjs
```

Logs: [checks-finais.log](auditoria/p2-20261024-01/checks-finais.log). O verificador de entrega confirmou HTML, relatórios anteriores, ferramentas e assets iguais ao estado P1 preservado. Avisos de conversão futura de LF/CRLF do Git não foram erros de whitespace.

## 12. Evidências visuais finais

### Visualizador de frames

**[Abrir visualizador local](auditoria/p2-20261024-01/revisao-final/index.html)**

Enquanto o servidor estiver ativo, também pode ser aberto por:

**http://127.0.0.1:8002/auditoria/p2-20261024-01/revisao-final/**

O visualizador permite selecionar sequência, reproduzir, pausar e avançar frame a frame. Não inicia reprodução automaticamente e não carrega serviços externos.

Há **22 sequências, com 303 frames reais do screencast**, sendo uma referência P1 e 21 sequências P2:

- Cinco transições do hero no desktop.
- Quatro categorias de Vibes no desktop.
- Duas direções de troca de formato em Clássicos no desktop.
- Parallax de Mundo Fini no desktop.
- Hero, Tubes e Clássicos em cada largura mobile de 320, 375 e 430 px.

As imagens brutas e seus timestamps ficam em **`auditoria/p2-20261024-01/motion-approved-build/`**. As folhas de sequência estão em **`auditoria/p2-20261024-01/revisao-final/`**.

Exemplos:

- [Hero Amoras → Tubes](auditoria/p2-20261024-01/revisao-final/1440-hero-4-sequencia.jpg).
- [Hero Dentaduras → Ursinhos](auditoria/p2-20261024-01/revisao-final/1440-hero-2-sequencia.jpg).
- [Vibes Azedinho](auditoria/p2-20261024-01/revisao-final/1440-vibes-azedo-sequencia.jpg).
- [Vibes Tubes em 375 px](auditoria/p2-20261024-01/revisao-final/375-vibes-tubes-sequencia.jpg).
- [Clássicos em 375 px](auditoria/p2-20261024-01/revisao-final/375-classics-transition-sequencia.jpg).
- [Menu horizontal preservado](auditoria/p2-20261024-01/motion-approved-build/667x375-menu.png).

Também há capturas estáticas de repouso e capturas completas produzidas pela suite em `tests-delivery/screenshots/`.

### Como interpretar

- O screencast tem amostragem variável; desktop foi limitado a 1100 px de largura de captura, embora o viewport de teste fosse 1440 px. O mobile foi testado nos tamanhos indicados.
- Os timestamps são do navegador. Eles não garantem que cada frame da animação foi capturado.
- O visualizador respeita os intervalos registrados entre frames. Não converte a sequência em um vídeo interpolado e não comprova 60 fps.
- As folhas combinam amostras reais com rótulos de tempo. Não são novos assets de produto nem imagens falsas do site.
- `ffmpeg` não foi encontrado no PATH. Não foi instalado um codificador; a entrega usa sequências e reprodução local dos frames.
- A suite original força classes de reveal em suas capturas completas. Essas imagens servem para layout, não para provar o disparo natural das revelações.

## 13. Ocorrências intermediárias e limites

As pastas intermediárias foram preservadas como histórico técnico e **não representam a versão final**. Use `motion-approved-build/`, `revisao-final/`, `tests-delivery/` e `tests-focus/` como evidências da entrega.

Ocorrências investigadas:

1. A criação de outra aba no Chrome headless alterou o viewport emulado. A retomada foi reavaliada após restaurar 1440 × 900, para não confundir pausa correta de um hero fora da tela com travamento.
2. A emulação da preferência reduziu movimento antes da entrega do evento `change`; o tratamento ativo descrito na seção 10 foi implementado e testado.
3. A inspeção visual encontrou o reaparecimento da embalagem de saída; a remoção foi corrigida e a sequência final foi inspecionada novamente.
4. Uma asserção inicialmente baseada em espera fixa foi substituída por observação do estado da camada, pois a captura de frames altera a amostragem temporal do navegador. Não se usou o tempo de parede dessa espera como benchmark.

Limitações que permanecem:

- Sem aparelhos físicos, Safari ou Firefox.
- Sem medição de FPS, Core Web Vitals, uso de memória ou impacto energético em dispositivo modesto.
- Sem auditoria completa de contraste, zoom ou leitor de tela.
- Sem teste deliberado de rede lenta ou falha de cada asset; o código preserva o estado anterior em falha, mas essa recuperação não foi validada com injeção de falhas nesta entrega.
- Os testes de overflow são amostrais, não cobrem matematicamente todos os frames possíveis.
- Clássicos continua com índice horizontal no mobile, como aprovado em P1.
- As alturas de Vibes continuam variando conforme o conteúdo, como registrado em P1.
- Doces CSS continuam sem a textura e translucidez que exigiriam assets de P3.
- A percepção subjetiva de peso, ritmo e intensidade ainda depende da revisão da pessoa solicitante no site em execução, especialmente porque o screencast perde frames.

## 14. Próximos passos

1. Revisar o hero e as quatro reações de Vibes no site local e no visualizador.
2. Avaliar se as amplitudes e tempos comunicam a personalidade desejada sem prejudicar leitura.
3. Revisar as trocas de formatos e o parallax em um aparelho físico quando disponível.
4. Ajustar somente os pontos indicados nessa revisão antes de considerar P2 aprovada.
5. Manter P3 separada: nenhum novo asset ou cena 3D foi iniciado.

Prévia do site: **http://127.0.0.1:8002/** enquanto o servidor desta sessão permanecer ativo.

**P2 entregue para revisão. Sem commit e sem publicação na Vercel.**
