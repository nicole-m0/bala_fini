# P5-B — Prontidão para portfólio: estudo de caso independente

Data: 26/10/2026. Revisão exclusivamente documental e de verificação, após aprovação técnica local da P5-A pelo usuário.

**Recomendação: apresentar o trabalho como estudo de caso independente de desenvolvimento web, sem qualificá-lo como projeto contratado pela Fini. Não disponibilizar agora a landing atual nem suas capturas com materiais pendentes em acesso público. Primeiro esclarecer a documentação desses materiais ou preparar, em etapa futura autorizada, uma demonstração com identidade e recursos próprios/licenciados.** A base técnica local está aprovada; a prontidão documental para divulgar a versão atual permanece pendente. Esta conclusão não declara autorização jurídica nem determina que exista infração.

## 1. Finalidade, escopo e evidências

A finalidade declarada pela autora é demonstrar habilidades de desenvolvimento web e atrair potenciais clientes no portfólio profissional. Não existe contratação, parceria ou autorização presumida da Fini. A revisão considera expressamente essa finalidade profissional; a expressão “estudo de caso” não transforma o uso em divulgação autorizada.

Foram lidos [P4-D](RELATORIO-P4-D-FINI.md), [P5-A](RELATORIO-P5-A-FINI.md) e [pendências de autorização](PENDENCIAS-AUTORIZACAO-FINI.md). Também foram examinados o HTML/CSS/JS da distribuição, inventário P5-A, README, script de preparação das imagens, registros de referência e relatórios de produção/integração H01-v02. A inspeção é documental e de código; não houve nova rodada de testes de navegador ou avaliação com visitantes.

Fontes locais de procedência: `tools/prepare_assets.py`, `design/p3-candies/referencias/REFERENCIAS.md`, `design/p3-candies/referencias/oficial/ORIGEM.json`, `RELATORIO-P3-H01-V02-FINI.md` e `RELATORIO-P3-D-H01-FINI.md`.

Os manifestos e READMEs de produção P3 ainda descrevem etapas antigas, inclusive H01-v01 “não integrado”. São registros históricos, não certificados atuais de licença ou inventários da distribuição. Para integração atual prevalecem P4-D/P5-A e o inventário P5-A; para direitos prevalece a ausência de comprovação registrada. Nenhum documento antigo foi alterado nesta revisão.

## 2. Inventário dos materiais e situação documental

Todos os caminhos da tabela abaixo são relativos a `dist/`. A saída contém 21 arquivos: três de implementação e 18 imagens, sendo 16 imagens fornecidas/processadas e dois tamanhos de uma imagem derivada H01-v02. As fontes externas não estão contadas nesses 21 arquivos.

### 2.1 Imagens fornecidas: marca, embalagens e mascote

**Origem conhecida comum (F):** acervo fornecido pela solicitante, descrito no README; o script de preparação aponta para PNGs locais em `C:/Users/Nicole/Pictures`. O script documenta conversão/recorte/transparência, não comprova a origem editorial de cada PNG nem que a fornecedora detenha os direitos.

**Situação comum (P):** sem comprovação localizada de fotógrafo/ilustrador, cadeia de fornecimento, licença ou autorização para divulgação profissional pública e tratamento. A identidade Fini e as embalagens são reconhecíveis, mas a presença da marca não autentica a fotografia como oficial. Tratam-se de imagens de produtos/marca fornecidas, com eventual origem oficial ainda a comprovar; não são classificadas como fotografias autorais da desenvolvedora.

| Arquivo | Conteúdo e finalidade atual | Origem / situação |
|---|---|---|
| `assets/images/iconfini.webp` | Logo no header/rodapé e favicon; identificação da marca | F / P; processamento local não transfere direitos sobre o logo |
| `assets/images/mascotefini.webp` | Mascote Dentadura, seção História | F / P; esclarecer direitos da ilustração e personagem |
| `assets/images/balafini1.webp` | Amoras; hero e Clássicos | F / P |
| `assets/images/balafini2.webp` | Morango Silvestre; leque de encerramento | F / P |
| `assets/images/balafini3.webp` | Polvo; composição Mundo Fini | F / P |
| `assets/images/balafini4.webp` | Sapo; leque de encerramento | F / P |
| `assets/images/balafini5.webp` | Dentaduras; hero e Clássicos | F / P |
| `assets/images/balafini6.webp` | Minhocas Azedinhas; hero, Vibes e encerramento; referência inicial de identidade H01 | F / P |
| `assets/images/balafini7.webp` | Ursinhos; hero, Vibes e Clássicos | F / P |
| `assets/images/balafini8.webp` | Mix Surpresa; leque de encerramento | F / P |
| `assets/images/balafini10.webp` | Beijos; Vibes e Mundo Fini | F / P |
| `assets/images/balafini12.webp` | Bananas; Mundo Fini | F / P |
| `assets/images/balafini13.webp` | Rato; leque de encerramento | F / P |
| `assets/images/caixafini2.webp` | Display Minhocas; Clássicos | F / P |
| `assets/images/caixafini5.webp` | Display Tubes Maçã do Amor; hero e Clássicos | F / P; reconstrução técnica a partir do PNG fornecido registrada no README |
| `assets/images/caixafini7.webp` | Display Tubes Azedinhos Twister; Vibes | F / P |

Os nomes dos produtos e finalidades foram conferidos no HTML e nos conjuntos dinâmicos do JavaScript. Não é uma certificação de exatidão comercial dos rótulos. As onze embalagens e os três displays incluem, além da fotografia, arte de embalagem e sinais de marca cuja situação precisa ser esclarecida.

### 2.2 Imagem derivada de referências: H01-v02

| Arquivo na distribuição | Origem e finalidade | Situação documental |
|---|---|---|
| `assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-256.webp` | Derivado WebP do mestre v02 produzido no projeto com edição generativa `image_gen`; doce decorativo na órbita H01 do hero | Processo e integração local documentados; direitos de divulgação das referências/derivação não confirmados |
| `assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-512.webp` | Outro tamanho do mesmo mestre, para seleção responsiva | Mesma pendência; não é uma segunda fotografia ou uma criação independente das referências |

As referências **de origem oficial registrada** são R06 `MINHOCACITRICA_U3_1000X1000.jpg` e R07 `MINHOCACITRICA_C_1000X1000.jpg`, preservadas em `design/p3-candies/referencias/oficial/`. O registro aponta para a galeria FiniStore de Minhocas Azedinhas 500 g, referência `315500M13003`, com URLs e hashes, e declara `publicationRightsConfirmed: false`. R06 orientou a unidade verde com pontas laranja; R07 apoiou a superfície açucarada.

Esses JPEGs e os mestres PNG não estão em `dist/`, mas sua ausência não encerra a análise da imagem derivada ali utilizada. Ser acessível na FiniStore comprova a fonte registrada, não uma licença de reutilização. A edição generativa e a aprovação estética não constituem comprovação de direitos de divulgação. Não apresentar H01 como fotografia própria nem como imagem oficial fornecida pela marca para este projeto.

### 2.3 Outros elementos de terceiros e materiais produzidos no projeto

| Material / arquivo | Origem e uso | Situação e tratamento recomendado |
|---|---|---|
| Fredoka e DM Sans, importadas em `css/style.css` | Google Fonts; títulos e textos; sem binários locais na saída | Os registros oficiais das duas famílias indicam SIL Open Font License 1.1. Há uma licença identificável, situação diferente das imagens. Registrar fonte, licença e versão utilizada; se futuramente houver hospedagem local/redistribuição de binários, preservar avisos e licença exigidos |
| Nome Fini, nomes de produtos, logo incorporado, linguagem de marca em `index.html` e `js/script.js` | Identificação e ambientação do conceito; não se confundem com autoria da implementação | Uso público profissional ainda sujeito ao esclarecimento documental de marca; não atribuir endosso ou contratação |
| Datas institucionais 1998/2001 e conteúdo de produtos em `index.html`/`js/script.js` | README referencia FiniStore; conteúdo apresentado como História/sabores | Documentar fontes precisas e revisar a exatidão antes de divulgar. A referência genérica não comprova a origem de cada frase nem de eventual slogan |
| Layout, estilos, interações e animações em `index.html`, `css/style.css`, `js/script.js` | Trabalho de implementação desenvolvido e refinado neste projeto, com evidências P1–P5-A | Pode ser descrito como trabalho técnico do estudo; não atribuir autoria de fotos, marca, fonte ou personagem à desenvolvedora. Conferir a descrição de participação humana/ferramentas antes de anunciar autoria exclusiva |
| Doces em CSS, H02, argolas, gradientes, órbitas, camadas, estrelas e selos tipográficos | Construção visual por código no projeto; não são as fotografias oficiais de referência | Evidenciam implementação; não foi identificada biblioteca externa de ícones/3D no código examinado. Produção local não autoriza automaticamente a identidade de marca em que a composição está inserida |
| Título “Abriu. Sorriu.” e demais textos de campanha | Presentes na composição do projeto; origem autoral de cada expressão não comprovada nesta revisão | Não anunciar criação de slogan oficial ou campanha encomendada; confirmar procedência antes de reivindicar autoria exclusiva |

Licenças das fontes consultadas em 26/10/2026: [Fredoka — OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/OFL.txt) e [DM Sans — OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/OFL.txt). A consulta identifica a licença das famílias; não substitui um registro dos binários efetivamente servidos pelo Google Fonts. Não foram baixadas ou instaladas fontes.

## 3. Pendências de comprovação de direitos

Para cada imagem fornecida, registrar arquivo/hash, original correspondente, autor/titular conhecido, quem forneceu, fonte/URL quando aplicável e documento ou licença que sustente o uso pretendido. Não basta “imagem enviada”, “encontrada na internet”, crédito no rodapé ou aprovação visual.

O registro deve esclarecer o alcance necessário: portfólio profissional para atração de clientes, página demonstrativa pública, capturas, vídeo, miniaturas, redes sociais e eventual código aberto; reprodução, adaptações já feitas, prazo, território, atribuição e restrições. Quem confirmar deve ter legitimidade para tratar dos direitos relevantes. Se houver dúvida sobre fundamento ou limites, encaminhar a avaliação a profissional qualificado; esta revisão não resolve essa questão.

Pendências específicas:

- **Marca/logo:** documentar a base para o uso público da identidade e os limites de apresentação do estudo, sem sugerir endosso.
- **Fotografias e artes de embalagem:** esclarecer autoria/licença das imagens e o tratamento permitido, incluindo remoção de fundo, cortes e conversão.
- **Mascote/personagem:** esclarecer o uso da ilustração e do personagem, além de sua procedência.
- **H01-v02:** registrar referências R06/R07, processo generativo, condições pertinentes à ferramenta utilizada e tratamento da derivação; o registro de origem atual não confirma direito de publicação.
- **Fontes:** registrar as licenças identificadas e o modo de fornecimento; não misturar a licença das fontes com as pendências de marca/imagens.
- **Capturas, vídeos e código público:** revisar esses meios separadamente; uma captura do site ainda reproduz os materiais visuais. Não publicar o repositório completo ou ZIPs internos como atalho para mostrar o trabalho.

Nenhuma pendência de `PENDENCIAS-AUTORIZACAO-FINI.md` foi encerrada nesta etapa. Também não foi presumida uma exceção jurídica por finalidade educativa, ausência de venda de produtos, baixa resolução, caráter conceitual ou uso de IA.

## 4. Clareza dos avisos e risco de confusão

O rodapé de `dist/index.html` diz: “Projeto conceitual independente e não oficial.” Em seguida reconhece os respectivos titulares e informa ausência de vendas. O texto é claro onde aparece e não afirma parceria. A metadescrição também identifica o projeto como conceitual independente. Os placeholders de redes sociais continuam ausentes.

**Avaliação editorial: risco relevante de confusão na entrada direta e em recortes.** É uma inferência da apresentação, não um resultado de teste com usuários. O aviso atual ajuda, mas não acompanha o visitante desde o início e não comprova autorização.

| Ponto observado | Possível interpretação | Recomendação para futura apresentação |
|---|---|---|
| Título da aba “Fini — Abriu. Sorriu.”, favicon/logo e hero de produtos | Site/campanha oficial, sobretudo sem contexto do portfólio | No portfólio, usar título com “estudo de caso independente”; em eventual demo pública, revisar também título e identificação visível na entrada |
| Aviso apenas no rodapé; metadescrição não é um aviso visível no corpo | Visitante decide antes de chegar ao esclarecimento | Colocar o contexto antes de qualquer mídia ou botão da demo no estudo de caso; uma página intermediária sozinha não cobre acesso direto à demo |
| “Nossa história”, “nossa história” no título da seção e tom de campanha | Voz da própria marca | Apresentar como simulação de interface; se a landing vier a ser publicada, submeter contextualização visível a nova aprovação, sem reescrever agora |
| “Loja oficial”, “Onde encontrar” e links FiniStore | Integração, canal de venda ou vínculo comercial | Explicar que são destinos externos de referência/compra, sem afiliação; não converter esses links em prova de parceria |
| Logo, mascote e embalagens dominantes em thumbnails | A marca pode ser percebida como cliente da autora | Não inserir Fini numa lista de clientes; usar categoria “estudos independentes” e legenda junto à imagem |

Não foi encontrada declaração explícita de contratação ou parceria no HTML examinado. Ainda assim, o conjunto visual e a primeira pessoa podem produzir essa impressão. Trocar apenas a URL para um subdomínio do portfólio ou acrescentar “conceito” em um texto distante não resolve integralmente o contexto de entrada direta, compartilhamento e capturas.

## 5. Apresentação específica no portfólio

### Texto proposto, ainda não publicado

**Título do card:** “Landing page conceitual inspirada na Fini — estudo independente de front-end”.

**Introdução:** “Estudo de caso independente desenvolvido para demonstrar minhas habilidades em interfaces web, animações e interações responsivas. Não foi contratado pela Fini e não possui parceria, vínculo oficial ou autorização presumida da marca. A implementação é apresentada como exercício profissional; marca e materiais de terceiros são identificados separadamente.”

Enquanto os materiais continuarem pendentes, acrescentar: **“A demonstração com identidade Fini permanece local. Esta apresentação descreve o processo técnico; as imagens cuja utilização não foi esclarecida não estão disponíveis publicamente.”** Usar essa frase somente se a apresentação pública realmente não exibir tais imagens. Não escrever “usado com autorização” antes de haver documentação correspondente.

O CTA profissional deve levar ao contato da desenvolvedora e comunicar “Quero uma interface para meu negócio”, dentro do portfólio da autora. Evitar “Cliente: Fini”, “projeto para a Fini”, “campanha oficial”, “parceira” e depoimentos/indicadores atribuídos à marca. Não prometer aumento de vendas ou conversão: não houve campanha real ou medição desse resultado.

### Estrutura recomendada do estudo

1. Contexto independente e objetivo técnico, visíveis antes da primeira imagem.
2. Escopo da participação: implementação, decisões de interface, ferramentas/assistências efetivamente utilizadas e distinção dos materiais de terceiros. Revisar a redação de autoria com a autora.
3. Três problemas concretos e soluções: composição responsiva do player tablet; pausa/retomada e movimento reduzido; navegação por teclado/toque e contenção de foco.
4. Demonstrações técnicas com recursos liberados ou neutros, acompanhadas de legendas, controles de reprodução e explicação curta.
5. Validação e limites reais, seguidos de contato profissional. Créditos e registros de uso não devem ficar ocultos num documento interno como único esclarecimento.

### Como evidenciar competências sem exagerar os resultados

| Competência | Evidência técnica útil | Limite da afirmação |
|---|---|---|
| Animações | Mostrar pausa/retomada, sequência de trocas, órbitas com escala/profundidade, parallax e modo reduzido; explicar decodificação antes da apresentação | Camadas de imagens 2D; não chamar de modelo 3D. Não prometer 60 fps; a P4-D registra amostragem de frames, sem essa comprovação |
| Responsividade | Comparar 320, 768/820 e 1440 px, incluindo player, índice rolável e menu horizontal; citar a cobertura P4-D de 11 viewports e 154 estados | São amostras em navegador automatizado. Não declarar compatibilidade universal ou testes em celulares físicos |
| Acessibilidade | Demonstrar teclado, foco visível, Escape, abas e estados ARIA, pausa de movimento e `prefers-reduced-motion`; explicar a escolha de contraste de Mundo Fini | Testes específicos, não certificação WCAG. Mínimo medido de 4,561:1 refere-se à região examinada, não a todo texto em todos os frames |
| Interatividade | Vibes com setas/Home/End; Clássicos por botões/teclado/swipe; autoplay e pausa; menu com contenção de foco | Toque foi emulado; não descrevê-lo como teste em aparelho real |
| Robustez e organização | WebPs responsivos H01, fallback CSS, imagens decodificadas e saída por allowlist com 21 arquivos/1.367.571 bytes | Peso da pasta de distribuição, não transferência inicial nem métrica de Core Web Vitals |
| Verificação | Resumir testes P5-A em sete larguras e 21 acessos internos com 404; citar o processo de correção e regressão | Resultados locais existentes, não novos testes P5-B, testes de produção ou auditoria completa de segurança |

Evitar publicar logs, perfis ou ZIPs de auditoria brutos. Preparar um resumo público próprio, com os dados necessários e sem caminhos pessoais, segredos ou imagens pendentes. Toda captura/vídeo selecionado precisa da mesma revisão dos materiais que exibe.

## 6. Alternativas se certos materiais não puderem ser divulgados

| Alternativa | O que preserva da demonstração | Condição e limite |
|---|---|---|
| Estudo textual com diagramas próprios | Arquitetura, decisões de movimento, estados, responsividade e processo de testes | Revisar diagramas/trechos para não embutir logo, fotos ou detalhes internos. Não incluir automaticamente screenshots da landing |
| Demo separada com marca fictícia e assets próprios/licenciados | Hero, seleção de categorias, galeria, órbitas, parallax, teclado e movimento reduzido | Opção preferida para demo pública enquanto os direitos atuais estiverem incertos. Precisa de trabalho futuro autorizado, nova saída e regressão; não copiar personagem, embalagens ou substituir só o nome mantendo sinais identificadores |
| Exemplos técnicos isolados, com formas geométricas | Algoritmo orbital, transições, pausa, foco, toque e fallback | Revisar os trechos e a autoria; usar conteúdo neutro e recursos com condições documentadas |
| Vídeo/capturas de versão neutra | Visualização rápida de comportamento desktop/mobile | Vídeo da versão atual com materiais pendentes não resolve a pendência. Dar legendas e opção estática/reprodução controlada |
| Demonstração local conduzida, sem disponibilizar arquivos | Explicação individual de funcionamento e processo | Não é autorização automática de exibição ou de gravação/compartilhamento. Avaliar o contexto e preferir recursos neutros enquanto persistirem dúvidas |
| Adiar a publicação visual atual | Preserva integralmente a versão aprovada e o acervo | Manter o estudo local até esclarecer o uso; pode-se preparar o texto técnico para revisão sem divulgar os materiais |

Link “não listado”, `noindex`, senha, baixa resolução, marca d’água, crédito ou remoção apenas do logo não equivalem a autorização nem substituem a revisão. Um repositório público com os assets também os distribui. Essas alternativas são propostas, não foram implementadas nesta etapa.

## 7. Checklist final de publicação em portfólio

Itens marcados refletem evidência local já existente; não são aprovação de publicação. Itens abertos exigem resolução ou escolha explícita de uma alternativa que os evite.

### Técnica

- [x] P4-D aprovada pelo usuário para encerramento visual/funcional local e P5-A aprovada tecnicamente.
- [x] Saída isolada `dist/` preparada por allowlist, com recursos necessários e sem acervo interno, conforme P5-A.
- [x] Testes existentes funcionais/responsivos e acessos negativos registrados na P5-A.
- [ ] Definir qual artefato será divulgado: texto técnico, demo neutra ou versão Fini após esclarecimentos; não assumir que a saída atual será publicada.
- [ ] Revalidar a saída final escolhida e repetir os testes pertinentes se houver alterações futuras.
- [ ] Revisar destino de publicação, HTTPS, caminhos, URLs compartilhadas, tratamento de 404, dependências externas e ausência de arquivos internos antes de autorizar qualquer disponibilização.
- [ ] Revisar pacote público de código, caso desejado, separadamente da saída estática e sem arquivos internos ou assets não liberados.

### Documental

- [ ] Registrar procedência e fundamento de uso por arquivo das 16 imagens fornecidas, inclusive fotografia, arte de embalagem, logo e mascote.
- [ ] Esclarecer a utilização da marca na divulgação profissional e documentar limites; não confundir crédito com permissão.
- [ ] Esclarecer as referências e derivação H01-v02, ou excluí-las apenas de uma futura variante pública autorizada, preservando o projeto local.
- [ ] Registrar licenças das fontes e suas condições aplicáveis ao modo de fornecimento escolhido.
- [ ] Revisar textos, fatos institucionais, slogans e atribuições; não reivindicar autoria sem suporte.
- [ ] Cobrir separadamente miniaturas, capturas, vídeos, redes sociais e eventual código público nos registros de uso.

### Editorial e revisão humana

- [ ] Validar com a autora o texto de participação, ferramentas e resultados; distinguir implementação de autoria dos materiais de terceiros.
- [ ] Identificar “estudo independente” no card, início do estudo, legendas e compartilhamentos, sem apresentar a Fini como cliente.
- [ ] Se houver demo direta futura, aprovar um contexto visível de independência também na própria entrada, título/metadados e acesso por links profundos. O rodapé atual sozinho não resolve a primeira impressão.
- [ ] Pedir a uma pessoa sem contexto que examine a proposta de apresentação e diga quem parece ser o responsável, se houve contratação e para onde levam os CTAs; corrigir ambiguidades antes de disponibilizar.
- [ ] Revisar manualmente teclado, zoom de 200%, leitor de tela e pelo menos um dispositivo móvel real na versão final; definir testes adicionais de navegador conforme o público pretendido.
- [ ] Garantir que o convite comercial e os contatos são da desenvolvedora, sem aparência de atendimento/loja da Fini.
- [ ] Obter revisão e autorização expressa do usuário para o artefato final e a publicação específica. Aprovação técnica P5-A e revisão documental P5-B não substituem essa autorização.

## 8. Recomendação e encerramento

**Prosseguir agora com a redação e revisão do estudo técnico independente; manter a versão Fini atual local enquanto as pendências de divulgação estiverem abertas.** Para uma demonstração pública sem depender dessas imagens, priorizar uma variante separada com marca fictícia e materiais próprios/licenciados, ou exemplos técnicos neutros. A implementação atual pode ser preservada integralmente como referência local.

Se a autora preferir mostrar a composição Fini, primeiro esclarecer/documentar os usos pretendidos e revisar a apresentação de modo que a ausência de vínculo seja percebida desde a entrada e nos recortes de portfólio. Mesmo um aviso bem posicionado não declara direitos inexistentes. A finalidade de atrair clientes deve constar da análise dos usos, não ser omitida sob a classificação de exercício.

P5-B não publica, não autoriza juridicamente, não altera o site e não encerra pendências por inferência. Foi criado somente este relatório. Não houve remoção de arquivos, instalação de dependências, commit ou deploy. **Aguarda revisão do usuário.**
