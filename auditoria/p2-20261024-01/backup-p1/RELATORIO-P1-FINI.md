# Relatório P1 — Fini Brasil

Data: 24/10/2026.

Estado: implementação local concluída para revisão. Sem commit e sem deploy.

## 1. Escopo e resultado

A auditoria `AUDITORIA-VISUAL-FINI.md` foi lida integralmente, incluindo a seção 22. A implementação se concentrou em hierarquia, composição, tipografia pequena, enquadramento de produtos e responsividade.

O hero mantém embalagem, headline e CTA como protagonistas, com menos ornamentos concorrentes. Vibes ganhou uma composição própria de catálogo: área de produto com fundo de cor, imagem em repouso vertical e texto editorial separado. O menu horizontal e o reveal de Vibes foram corrigidos após reprodução no navegador.

Não foram introduzidos frameworks, bibliotecas, imagens ou modelos 3D. A reformulação profunda de motion P2 e a produção de assets P3 permanecem fora desta entrega.

## 2. Segurança e estado inicial do Git

Antes de modificar os arquivos do site, foi criada a cópia:

**`auditoria/p1-20261024-01/backup/`**

Ela contém HTML, CSS, JavaScript, README, configuração estática, relatório de auditoria, ferramentas de preparação/validação e os assets. Arquivos de credenciais e configuração de autenticação não foram copiados.

O estado inicial foi registrado em [git-inicial.txt](auditoria/p1-20261024-01/git-inicial.txt):

```text
HEAD: 605d15dd5cd4e79e1ba1fa4dfef4dad3402043e5

?? AUDITORIA-VISUAL-FINI.md
?? auditoria/
```

Não havia alterações rastreadas nos arquivos do site. Os hashes iniciais estão em [hashes-iniciais.json](auditoria/p1-20261024-01/hashes-iniciais.json). O estado posterior foi registrado em [git-final.txt](auditoria/p1-20261024-01/git-final.txt), antes da criação deste relatório.

Para uma eventual restauração, os três arquivos alterados do site têm versões originais correspondentes no backup. Nenhuma restauração foi executada.

## 3. Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `css/style.css` | Correção da máscara de reveal; composição P1; menu para telas baixas; enquadramentos, tipografia e espaços responsivos |
| `js/script.js` | Cor de Vibes aplicada à área do produto via variável CSS; legenda em uma linha; ângulo de repouso de Vibes ajustado para a nova composição |
| `index.html` | Legenda inicial de Vibes convertida de duas linhas para uma |

O restante do conteúdo HTML foi preservado. Os arquivos de imagem, `README.md`, `vercel.json`, o relatório original e as três ferramentas originais foram comparados com os hashes/backup e permaneceram iguais.

Os scripts, logs, perfil isolado do navegador e capturas produzidos para validar P1 ficam em `auditoria/p1-20261024-01/`. São artefatos locais de trabalho, não novos assets do site.

## 4. Correções confirmadas

### 4.1. Menu em 667 × 375

Antes, o alinhamento vertical centralizado distribuía o conjunto de links de modo incompatível com a altura disponível. “Produtos” começava em 22,5 px, sobre a região da logo, e o CTA terminava em 402,5 px, além dos 375 px iniciais.

A correção usa uma regra específica para viewports de até 767 px de largura e 500 px de altura:

- Alinhamento inicial, em vez de centralização vertical.
- Reserva superior de 87 px para logo e botão de fechar.
- Links com altura mínima de 44 px e espaçamento compacto.
- Remoção apenas dos pseudo-elementos decorativos do menu nesse contexto.
- Rolagem interna preservada para alturas ainda menores.
- Links impedidos de encolher no eixo vertical.

Depois, “Produtos” começa em **87 px**; a logo termina em aproximadamente **64,1 px**. O botão da loja ocupa **271 a 315 px**. Todos os links ficam dentro da altura inicial de 375 px, e a altura de rolagem registrada é 375 px.

Os rótulos acessíveis, Escape, `inert`, contenção de foco e lógica de fechamento existentes foram preservados.

### 4.2. Reveal por âncora

A ocorrência da auditoria foi reproduzida com entrada de mouse pelo Chrome DevTools Protocol: posição do link obtida no layout, seguida de eventos de pressionar/soltar o botão do mouse. Não foi usado `element.click()` para simular a navegação investigada.

Em desktop, o clique em Produtos alterava a URL para `#vibes`, mas o título mantinha `visible: false` e `clip-path: inset(0px 100% 0px 0px)`. O mesmo ocorreu após abrir o menu e selecionar Produtos nas larguras mobile.

A máscara estava aplicada ao próprio elemento observado pelo `IntersectionObserver`, que ficava totalmente recortado. A correção move a máscara para o `div` interno do título e mantém o elemento observado sem recorte. A animação de entrada e sua duração foram preservadas. A regra de movimento reduzido foi ajustada ao novo seletor.

Na validação final, o título recebeu `visible: true` nas cinco configurações: **1440 × 900, 320 × 900, 375 × 900, 430 × 900 e 667 × 375**. As capturas finais não precisaram forçar a classe de revelação.

O procedimento é interação de navegador automatizada por entrada de mouse, não interação manual humana ou toque em um aparelho físico.

## 5. Refinamento visual

### 5.1. Hero

- Headline e CTA mantidos, sem reescrita da campanha.
- Nota lateral e estrela secundária retiradas da composição visual.
- Segunda linha orbital decorativa ocultada; geometria e movimento dos doces preservados.
- Palavra de apoio menor, posicionada na base da apresentação.
- Selo de sabor reduzido, mantendo um acento amarelo reconhecível.
- Texto de apoio e controles com leitura mais confortável.
- No mobile, controles em uma linha própria, sem depender de sobreposição absoluta na arte.
- Área mobile compactada, mantendo a embalagem reconhecível e os controles acessíveis.

A embalagem continua inclinada no hero. Esse gesto passa a ser mais próprio dessa cena, pois Vibes usa repouso vertical. Não houve reescrita do ciclo automático, órbitas, parallax, preload, decodificação ou cache.

### 5.2. Vibes

A seção deixou de ser um grande painel pastel com embalagem inclinada, palavra ampliada e selo circular.

A composição final usa:

- Título editorial separado por uma linha fina.
- Abas com indicador rosa na base, em vez de uma sequência de pills.
- Quatro categorias na mesma linha em 320, 375 e 430 px.
- Área de produto à esquerda no desktop, com topo curvo e base reta.
- Cor da categoria concentrada nessa área, enquanto o texto permanece sobre creme.
- Produto em repouso vertical, sem distorção.
- Frase curta como legenda de base, sem círculo ou sticker.
- Remoção visual da palavra gigante e da argola dessa seção.
- No mobile, texto seguido da apresentação do produto, com espaços menores.

O conteúdo, seleção por teclado, ARIA e links foram preservados. A transição existente continua usando saída, entrada e máscara; somente os ângulos de repouso inicial/final passaram de 10° para 0° para combinar com o enquadramento. Tempos e easing foram mantidos. Esse ajuste de pose não constitui a reformulação profunda de P2.

### 5.3. Enquadramento óptico

Em Vibes, embalagens verticais e displays têm caixas de apresentação diferentes. Os displays ganham largura, mantendo `object-fit: contain`. A intenção é aproximar sua presença óptica da embalagem vertical sem esticar a imagem.

No hero, o enquadramento dos displays foi ampliado proporcionalmente dentro da área fixa. Em Clássicos, os displays foram centralizados com largura própria e sem o deslocamento lateral anterior por margem negativa.

Os testes percorreram todos os produtos dinâmicos. As inspeções visuais incluem Minhocas, Dentaduras e estados Tubes. A aprovação artística individual de cada produto em todos os tamanhos continua dependendo da revisão do conjunto completo.

### 5.4. Tipografia e hierarquia

- Vibes: textos de apoio em 14 px no mobile e 15 px no desktop.
- Abas mobile em 12 px, com alvos de pelo menos 48 px de altura.
- Controles do hero com alvos de 44 px.
- Índice e tags dos Clássicos com tamanhos revistos.
- Descrições dos Clássicos e História mais legíveis no mobile.
- Legendas das datas e textos pequenos do rodapé ampliados.
- Quebras e limites de largura de títulos revisados.

Fredoka, DM Sans e as cores principais foram preservadas. Não há alegação de conformidade WCAG completa: não foi feita auditoria integral de contraste ou leitor de tela.

### 5.5. Ritmo e áreas preservadas

Clássicos mantém o fundo azul, a galeria e o contraste de seção. Mundo Fini mantém a cena rosa, embalagens periféricas e parallax. História conserva o ritmo calmo e o mascote. O encerramento mantém o amarelo e o leque de produtos.

No mobile, a argola do Mundo Fini foi deslocada para a parte inferior, separando-a da argola que faz a ponte com Clássicos. A entrada em leque do encerramento foi preservada, com menos espaço vazio entre CTA e produtos.

## 6. Medidas antes/depois

Alturas em pixels CSS, medidas no estado inicial Azedinho. O hero abaixo corresponde à altura da seção, sem somar o header. Os números são de layout neste ambiente, não métricas de performance.

| Viewport | Hero antes → depois | Vibes antes → depois | Encerramento antes → depois |
|---|---|---|---|
| 1440 × 900 | 725 → 725 | 946 → 913 | 585 → 585 |
| 320 × 900 | 784 → 766 | 988 → 829 | 417 → 345 |
| 375 × 900 | 826 → 756 | 963 → 807 | 422 → 345 |
| 430 × 900 | 839 → 770 | 964 → 820 | 422 → 347 |
| 667 × 375 | 893 → 794 | 933 → 803 | 422 → 352 |

Em 375 px, Vibes ficou aproximadamente 16% mais curta e o encerramento aproximadamente 18% mais curto. A redução do hero é mais discreta em 320 px porque os controles agora ocupam uma linha própria e a leitura ganhou tamanho.

A altura do painel Vibes passa a acompanhar o conteúdo: os testes registraram variação de **545 a 578 px em 375 px**, por exemplo. Isso remove as grandes reservas vazias anteriores, mas pode deslocar a seção seguinte ao trocar a categoria. É uma decisão explícita para revisão; caso seja desejada estabilidade absoluta entre categorias, uma reserva moderada pode ser avaliada sem voltar aos espaços originais.

Dados completos: [comparison.json](auditoria/p1-20261024-01/comparison.json).

## 7. Capturas antes/depois

São **32 capturas de referência antes** e **32 capturas da versão final**, além das capturas de testes. Nenhum arquivo de P0 foi sobrescrito.

| Comparação | Antes | Depois |
|---|---|---|
| Página desktop 1440 | [Antes](auditoria/p1-20261024-01/before/1440-full.png) | [Depois](auditoria/p1-20261024-01/final/1440-full.png) |
| Página mobile 320 | [Antes](auditoria/p1-20261024-01/before/320-full.png) | [Depois](auditoria/p1-20261024-01/final/320-full.png) |
| Página mobile 375 | [Antes](auditoria/p1-20261024-01/before/375-full.png) | [Depois](auditoria/p1-20261024-01/final/375-full.png) |
| Página mobile 430 | [Antes](auditoria/p1-20261024-01/before/430-full.png) | [Depois](auditoria/p1-20261024-01/final/430-full.png) |
| Menu 667 × 375 | [Antes](auditoria/p1-20261024-01/before/667x375-menu.png) | [Depois](auditoria/p1-20261024-01/final/667x375-menu.png) |
| Clique em Produtos — 1440 | [Antes](auditoria/p1-20261024-01/before/1440x900-anchor-vibes.png) | [Depois](auditoria/p1-20261024-01/final/1440x900-anchor-vibes.png) |
| Clique em Produtos — 375 | [Antes](auditoria/p1-20261024-01/before/375x900-anchor-vibes.png) | [Depois](auditoria/p1-20261024-01/final/375x900-anchor-vibes.png) |
| Vibes Tubes — 320 | [Antes](auditoria/p1-20261024-01/before/320-vibes-tubes.png) | [Depois](auditoria/p1-20261024-01/final/320-vibes-tubes.png) |
| Encerramento — 375 | [Antes](auditoria/p1-20261024-01/before/375-final.png) | [Depois](auditoria/p1-20261024-01/final/375-final.png) |

As pastas também contêm hero em cada viewport e recortes de Vibes, Clássicos, Mundo Fini, História e encerramento em 1440 e 375 px.

**Leitura das evidências:**

- O hero automático pode estar em produtos ou fases diferentes entre duas capturas. Comparar composição, não identidade absoluta do frame.
- As capturas finais completas foram precedidas de rolagem por entrada de wheel para disparar revelações naturalmente. As classes não foram forçadas pelo script visual de P1.
- O reposicionamento ao topo antes da captura completa final foi feito por `scrollTo`, depois da verificação das âncoras por entrada de mouse.
- O script original de testes ainda força revelações nas suas próprias capturas. Essas imagens não são a evidência principal da correção de reveal.
- As pastas `after/` e `after-final/` são tentativas intermediárias. `after/` recebeu a versão antiga pela sessão de validação e não deve ser usada como resultado de P1. A pasta **`final/`** é a referência da entrega.
- A primeira rodada usou o servidor existente em 8000. Para eliminar a ambiguidade de cache/sessão, a validação final usou um servidor dedicado em 8001 e cache do navegador desativado.

## 8. Testes executados

### 8.1. Suite existente

O script original `tools/check_site.mjs` foi preservado. Uma cópia de execução foi criada em `auditoria/p1-20261024-01/tests/check_site.audit.mjs`, alterando apenas infraestrutura de execução: URL HTTP local, pasta de capturas e desativação de cache. As asserções originais foram mantidas.

Resultado: **código de saída 0**. Log completo: [existing-tests.log](auditoria/p1-20261024-01/tests/existing-tests.log).

Verificações que passaram:

- Sem overflow horizontal global em 320, 375, 430, 768, 1024, 1440 e 1920 px nas amostras previstas.
- Sem imagens quebradas nas amostras; 21 WebPs decodificados.
- Quatro categorias de Vibes e cinco produtos de Clássicos nos tamanhos previstos pelo teste.
- Hero automático avançando; cinco trocas com imagem válida e composição estável.
- Pausa orbital e camadas dianteira/traseira.
- Hero e órbita estacionários com movimento reduzido.
- Menu abrindo/fechando, `inert` e contenção de foco cobertos pelo teste.
- Navegação de Clássicos por teclado e gesto sintético.
- Parallax desktop variável e mobile simplificado.
- Sem overflow global nas dez amostras de animação de Clássicos em 320 px.
- Lista de exceções de runtime vazia nos cenários cobertos.

### 8.2. Validação adicional

O script visual verificou as cinco configurações solicitadas por meio de entrada de mouse no navegador, salvando antes/depois e geometria dos elementos. Resultados: [before/results.json](auditoria/p1-20261024-01/before/results.json) e [final/results.json](auditoria/p1-20261024-01/final/results.json).

Uma checagem posterior confirmou:

- Título de Vibes revelado nas cinco configurações.
- Ausência de overflow nas cinco amostras de layout.
- Primeiro link do menu horizontal abaixo da logo.
- Todos os links do menu horizontal dentro de 375 px.
- Ausência de exceções registradas na execução visual final.
- Assets idênticos ao backup e ferramentas originais preservadas.

Também passaram:

```text
python -B tools/validate_files.py
node --check js/script.js
git diff --check
node auditoria/p1-20261024-01/verify-evidence.mjs
```

O verificador Python validou caminhos, assets dinâmicos, IDs, atributos alt, equilíbrio de chaves CSS e decodificação dos WebPs. Logs: [checks.log](auditoria/p1-20261024-01/checks.log). O Git emitiu avisos sobre conversão futura de LF para CRLF; não houve erro de whitespace.

## 9. Limitações e problemas restantes

- Inspeção em Chrome headless, sem celular físico ou outros motores de navegador.
- Sem auditoria completa de leitor de tela, zoom ou contraste.
- Sem benchmark de FPS, Core Web Vitals, CPU limitada ou rede lenta.
- Asserções de overflow por amostra não garantem ausência de qualquer recorte interno em todos os frames.
- A investigação por clique real se concentrou no caminho para Vibes, onde o problema foi reproduzido. Não representa teste manual exaustivo de todas as âncoras e combinações de foco.
- Vibes pode mudar moderadamente de altura conforme a categoria; registrar essa diferença foi parte da revisão.
- O índice de Clássicos continua horizontal no mobile; seus textos foram ampliados, mas uma parte das opções requer rolagem.
- A diferença de materialidade entre doces CSS e embalagens permanece para P3.
- O ticker mantém movimento automático fora do escopo da pausa do hero, como antes. O tratamento existente de movimento reduzido foi preservado.
- Timings, easings e coreografias repetidas não foram reformulados profundamente; isso pertence a P2.
- Conteúdo institucional e placeholders sociais foram preservados, pois sua revisão pertence ao escopo editorial posterior.
- O CSS continua usando a cascata existente com um bloco P1 identificado. Uma reorganização estrutural completa do stylesheet não foi incluída.

## 10. Próximos passos para revisão

1. Revisar os pares de imagens de hero, Vibes, menu horizontal e encerramento.
2. Aprovar ou ajustar a nova área de produto e a ordem editorial de Vibes.
3. Decidir se a variação moderada de altura de Vibes é aceitável.
4. Após aprovação visual de P1, definir o escopo de P2 sem perder as salvaguardas de carregamento, pausa e acessibilidade.
5. Planejar novos assets apenas quando P3 for autorizada.

Prévia local da implementação: **http://127.0.0.1:8001/** enquanto o servidor desta sessão permanecer ativo.

**Entrega aguardando revisão. Nenhum deploy ou commit foi realizado.**
