# Relatório P3-D — integração experimental local de H01-v02

Data: 25/10/2026. **Somente H01-v02 integrado localmente. Entrega para revisão; sem autorização de publicação ou expansão.**

## 1. Resultado e limites da autorização

A minhoca H01 do hero passa a apresentar o WebP H01-v02 após carregamento e decodificação válidos. O desenho CSS permanece como fallback. H02, H03, demais argolas, Mundo Fini, embalagens e animações P2 foram preservados.

A aprovação visual do piloto autorizou somente esta experiência local. Ela não representa aprovação definitiva da fidelidade comercial, licença de publicação das fotografias de referência ou autorização de deploy. Nenhuma imagem nova foi gerada nesta etapa.

Prévia local: **http://127.0.0.1:8003/** enquanto o servidor iniciado para esta revisão permanecer ativo. O servidor está vinculado a `127.0.0.1`; não foi publicada hospedagem externa.

## 2. Backup verificável antes da alteração

Foi criado [backup-p2/](auditoria/p3-d-h01/backup-p2/) com **32 arquivos**, incluindo HTML, CSS, JavaScript, configurações estáticas, ferramentas, relatório P2, plano P3, 21 imagens originais e os dois WebPs H01-v02. Cada cópia foi conferida com SHA-256 antes da edição.

- [Hashes do backup](auditoria/p3-d-h01/backup-sha256.json).
- [Estado inicial do Git](auditoria/p3-d-h01/git-inicial.txt).
- [Verificação final](auditoria/p3-d-h01/delivery-verification.json).

A referência é o estado atual aprovado de P2, que já continha o trabalho P1/P2 sem commit. Não foi usada restauração ao último commit. As alterações anteriores do plano e os artefatos de P3 permaneceram preservados.

## 3. Alterações efetivamente realizadas

| Arquivo | Mudança |
|---|---|
| `js/script.js` | Carregador isolado de H01, iniciado após `window.load`; `srcset` 256/512 px, decodificação, inserção da filha decorativa e tratamento de falha |
| `css/style.css` | Três regras locais para a imagem de H01, apresentação somente quando pronta e remoção localizada de gradiente, sombra interna, outline e borda sintéticos |
| `index.html` | **Nenhuma alteração** |

Diferença exata contra o backup: [alteracoes-p2-p3.patch](auditoria/p3-d-h01/alteracoes-p2-p3.patch).

### Contratos preservados

- O mesmo nó `.hero-art .w1.satellite` continua no array `satellites`, com `data-period=12`, `data-phase=3.8` e `data-track=0`.
- Caixa externa de 100 × 33 px desktop e 65 × 23 px mobile preservada.
- `measureOrbit()`, `drawOrbits()`, relógio, velocidades, repousos, escala 0,68–1,16, opacidade 0,62–1 e camadas 2/5 sem alteração.
- Todo o JavaScript original a partir de `const motionEase` foi comparado com P2 e é idêntico. Isso inclui campanha, WAAPI, pausa/retomada, Vibes, Clássicos e Mundo Fini.
- O CSS original também é idêntico quando se remove o bloco novo exclusivo de H01.

O novo filho tem `alt=""`, `aria-hidden`, dimensões intrínsecas, posição absoluta, `object-fit:contain`, centro fixo e `pointer-events:none`. Não cria área clicável nem anúncio de doce em leitor de tela.

### Fallback, sombra e carregamento

A imagem nasce desacoplada do DOM. Após `decode()`, a inserção e o modificador `has-h01-asset` são aplicados na mesma tarefa. Nenhum `transform`, posição orbital ou opacidade é escrito pelo carregador.

Em falha de rede, 404 ou decodificação, o modificador é removido e a filha é descartada. O desenho CSS original volta sem mudar o wrapper. Um erro posterior à apresentação também restaura esse fallback. Não foi criado retry infinito; uma nova visita recarrega a tentativa.

O wrapper conserva o único `drop-shadow` externo de `.candy`. A imagem não recebe filtro ou sombra extra; a sombra interna sintética é retirada apenas quando H01 está pronta. Não se mexeu nas sombras das embalagens ou de outros doces.

O `sizes` usa 76 px mobile e 117 px desktop, cobrindo a escala orbital máxima. O navegador escolhe 256/512 px conforme DPR. O início após `window.load`, com prioridade baixa, evita que esse detalhe decorativo participe do evento de carregamento principal. Durante a espera, o CSS permanece visível. Se outro recurso atrasar `load`, o doce continua em CSS até esse evento.

O PNG mestre não é referenciado pelo carregador, HTML ou CSS. Nenhum PNG ou arquivo de `masters/` apareceu nas requisições monitoradas. Isso significa **fora do carregamento da página**, não proteção de acesso a arquivos por uma futura hospedagem: a exclusão de `design/` e materiais de auditoria precisará ser resolvida antes de qualquer publicação autorizada. Configurações de deploy não foram alteradas aqui.

## 4. Testes da versão final

Ambiente: Windows, Node.js 22.19.0, Python/Pillow já disponíveis e Chrome headless em perfil isolado, servidor local em 8003, cache desativado nos testes de navegador. Nenhuma dependência instalada.

### H01 e responsividade

Foram verificados **1440 × 900 DPR 1**, **1920 × 1080 DPR 2**, **768 × 900 DPR 2**, **1024 × 900 DPR 1**, **320 × 900 DPR 3**, **375 × 900 DPR 3**, **430 × 900 DPR 2** e **667 × 375 DPR 2**.

Resultados nos cenários amostrados:

- Imagem válida, uma única filha H01, proporção contida e sombra externa única.
- Sem overflow horizontal global novo.
- H02 continua oculta no mobile e todos os outros doces continuam sem novas imagens.
- Mudança mobile → desktop com DPR 3 seleciona o WebP 512 sem substituir o wrapper nem reiniciar o relógio.
- Pausa no meio de uma troca congela órbita e tempos WAAPI; retomada continua o movimento.
- Sete avanços rápidos chegam ao destino esperado e terminam com uma imagem de embalagem.
- Movimento reduzido desde a entrada e ativado durante a transição mantém conteúdo final e avanço manual, sem trabalhos de animação remanescentes.
- Menu 667 × 375 preservado: primeiro link em y=87 px e fim do último link em y=315 px, dentro do viewport.

Resultados detalhados: [results.json](auditoria/p3-d-h01/results.json).

### Falhas deliberadas

Foram injetados bloqueio de rede, HTTP 404, arquivo inválido com resposta 200, atraso controlado e erro após a imagem já estar pronta. Em todos, o fallback esperado funcionou; o hero continuou navegável e a órbita continuou ativa quando permitida.

No atraso, a composição teve a mesma altura antes/depois do decode. Também foi ativado movimento reduzido durante a espera: a imagem apareceu sem reativar a órbita. Registro: [fault-results.json](auditoria/p3-d-h01/fault-results.json).

A primeira tentativa do script auxiliar de falhas aguardava um tempo fixo e tentou ler `orbitTime` antes da inicialização. Foi corrigido o teste para observar o estado do documento, sem mudança do movimento do site. A execução final passou.

### Regressão de P2

A suite existente foi executada por cópia de auditoria, alterando somente porta, URL, pasta de captura e configuração de cache. **Resultado final: código 0.** O arquivo original `tools/check_site.mjs` foi preservado.

Cobertura: larguras 320/375/430/768/1024/1440/1920; quatro Vibes; cinco Clássicos; teclado; swipe sintético; menu e `inert`; hero automático; pausa orbital; camadas; cinco trocas com altura estável; parallax desktop variável e mobile estático; imagens válidas e ausência de exceções nos cenários cobertos.

Log: [tests-existing/log.txt](auditoria/p3-d-h01/tests-existing/log.txt). A suite original enumera os 21 WebPs da raiz; os dois novos derivados foram cobertos pelos testes específicos de H01, não por essa enumeração antiga.

Também passaram `node --check js/script.js`, `python -B tools/validate_files.py`, `git diff --check` e o verificador de integridade da entrega. Avisos LF/CRLF do Git não foram erros de whitespace.

## 5. Comparação visual P2/P3 e evidências

**[Abrir visualizador local de revisão](auditoria/p3-d-h01/revisao/index.html).** No ZIP, extrair tudo e abrir `revisao/index.html`; não requer servidor ou serviços externos.

Foram salvas **28 comparações pareadas / 56 screenshots** com a mesma embalagem, viewport, DPR, relógio e fase:

- Desktop 1440: cinco produtos × quatro fases × P2/P3.
- Mobile 375: Minhocas e Tubes × quatro fases × P2/P3.
- Fases: frente/escala máxima, trás/escala mínima e dois estados próximos de cruzamento entre camadas.

Em todos os pares, caixa, matriz de transformação, opacidade, camada e atributos orbitais coincidiram exatamente. Os estilos/filhos dos doces fora de H01 também foram comparados e permaneceram iguais.

**As fases fixas foram impostas somente pelo script de teste ao DOM da sessão de captura. Não foram adicionadas ao site nem usadas para alterar sua órbita.** O produto e o relógio automático ficam pausados nessas comparações para permitir enquadramentos equivalentes; o ticker não é sincronizado e pode diferir entre frames.

Também foram gravadas três sequências de movimento natural de H01, com as embalagens mantidas em cena:

| Sequência | Frames reais | Intervalo observado de `orbitTime` |
|---|---|---|
| Desktop / Minhocas | 25 | 12,620 s |
| Desktop / Tubes | 26 | 12,633 s |
| Mobile / Tubes | 30 | 12,383 s |

São **81 frames reais**, cobrindo mais de um período de H01 em cada sequência. Há amostras nas camadas 2 e 5 e capturas fixas nos extremos exatos de escala. H01 pode ficar parcialmente ou completamente escondida atrás de uma embalagem; isso é a oclusão aprovada, não falha de carregamento.

As [folhas de sequência](auditoria/p3-d-h01/revisao/) e o visualizador permitem inspeção frame a frame. O intervalo entre capturas é amostral e varia com o custo da própria captura; não comprova 60 fps. As capturas da suite que forçam reveal são auxiliares de layout, não evidência de disparo natural de entradas.

Na inspeção das capturas principais, H01 fica subordinada à embalagem, mantém sua curva sem esticar e não acrescenta colisão com título/CTA/controles. A granulação perde detalhe em escala pequena, especialmente atrás da embalagem e sob opacidade 0,62. Não foi alterada a órbita para compensar isso.

## 6. Transferência, estabilidade e custo observado

### Arquivos e rede

- WebP 256: **8.824 bytes de corpo**, `transferSize` observado de **9.124 bytes** incluindo a contabilização de cabeçalhos do Resource Timing.
- WebP 512: **28.570 bytes de corpo**, `transferSize` observado de **28.870 bytes** no teste de resize/DPR 3.
- Uma imagem foi solicitada na entrada normal por viewport. Na passagem DPR 3 mobile → desktop houve o upgrade de 256 para 512, esperado para nitidez, sem PNG ou novos doces.

Além do bitmap, os arquivos locais aumentaram 1.528 bytes em JavaScript e 463 bytes em CSS frente ao backup P2. Esses valores são diferenças de arquivo sem compressão; não devem ser confundidos com tamanho transferido em uma hospedagem com gzip/Brotli.

Nas execuções normais, não foram registradas exceções JavaScript, mensagens de erro de console pelo domínio Runtime ou falhas de rede inesperadas nos eventos monitorados. `results.json` inclui uma falha identificada como modo `blocked`, gerada intencionalmente. Os 404 e arquivos inválidos dos testes de falha também são esperados; não são evidência de erro normal do site.

### Comparação laboratorial de três execuções por versão

Após o ajuste para carregar H01 depois de `load`, foram feitas três execuções P2 e três P3 no mesmo Chrome, 1440 × 900, DPR 1, cache desativado, sem throttling de CPU/rede:

| Medição | P2 | P3 |
|---|---|---|
| Mediana do evento load | 246,8 ms | 244,1 ms |
| Mediana das médias de intervalo rAF durante 2,2 s | 19,13 ms | 17,60 ms |
| Soma de layout shifts sem entrada recente | 0,007462 em três execuções | 0,005928–0,007462 |

Nenhuma fonte de layout shift registrada apontou H01 ou o wrapper orbital; a caixa permaneceu 100 × 33 px. Os deslocamentos observados envolveram textos, navegação, ticker e seções já existentes. Não se declara CLS global zero.

A diferença de intervalos rAF não deve ser interpretada como melhoria causada pelo asset. Não apareceu regressão repetida nesse ensaio curto; variação de agendamento, fontes e ambiente interfere. As medições anteriores ao adiamento de `load` ficaram como histórico em `performance-before-load-deferral.json`, não como resultado da versão final.

Dados finais: [performance-results.json](auditoria/p3-d-h01/performance-results.json). Não houve medição de Core Web Vitals de usuários reais, memória/energia ou aparelho físico; não há garantia de FPS a partir dessas amostras.

## 7. Limitações de fidelidade e cobertura

- H01-v02 é uma edição generativa fundamentada em R06/R07, aprovada apenas para experimento local. Ponta direita, granulação e pequenas diferenças geométricas continuam registradas no relatório v02.
- A cor verde/laranja é da unidade referenciada; o doce permanece o mesmo durante as cinco embalagens. Não comunica associação de sabor/SKU com cada produto exibido.
- Alfa e luz são recursos de um bitmap; não há refração ou mudança real de face tridimensional.
- Testes em Chrome headless/emulação; sem Safari/iOS, Firefox, toque físico, aparelho modesto ou auditoria completa de leitor de tela.
- Capturas e asserções de overflow são amostrais. O teste horizontal inclui layout e menu; não substitui uso físico com barras móveis do navegador.
- Não foram alteradas regras de hospedagem. Materiais de produção continuam exigindo exclusão explícita antes de qualquer deploy futuro.

## 8. Entrega e estado para revisão

ZIP: **`REVISAO-VISUAL-FINI-P3-D-H01.zip`**, com capturas, 81 frames, três folhas de sequência, visualizador offline, logs, medições, hashes, diff e os WebPs usados. Não contém perfil de navegador ou credenciais. O backup completo permanece no projeto, com manifesto incluído no pacote.

**Somente H01 está em experimento local. Sem H02, substituição de argolas, alteração de Mundo Fini, commit ou deploy. A expansão aguarda sua aprovação.**
