# Relatório P3-A/P3-B — piloto visual H01 executado

Data: 25/10/2026. Estado: **piloto e três provas produzidos; fidelidade e aprovação visual pendentes da revisão da pessoa solicitante. Sem integração ao site.**

## 1. Resultado efetivamente obtido

A nova busca encontrou fotografias de doces soltos na loja oficial Fini, além das embalagens locais já verificadas. Foi produzido **somente um piloto H01**, com centro verde e extremidades laranja, combinação observada na unidade em primeiro plano da fotografia oficial. Não foi criada H02 nem substituída qualquer argola.

Entregas reais:

- [Mestre H01 PNG RGBA](design/p3-candies/masters/minhoca-a-view01-v01.png).
- [WebP 256 px](assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v01-256.webp).
- [WebP 512 px](assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v01-512.webp).
- Provas PNG sobre [creme](design/p3-candies/provas/fundos-creme-azul-rosa/h01-v01-creme.png), [azul](design/p3-candies/provas/fundos-creme-azul-rosa/h01-v01-azul.png) e [rosa](design/p3-candies/provas/fundos-creme-azul-rosa/h01-v01-rosa.png).

O `PLANO-P3-FINI.md` não foi revisado ou alterado nesta execução. HTML, CSS, JavaScript e animações permaneceram intactos. Não houve dependências instaladas, commit ou deploy.

## 2. Referências encontradas e origem

O acervo local continua sem foto individual: seus 21 WebPs são embalagens/displays, logo e mascote; os backups repetem esse acervo e as imagens de auditoria são capturas do site. `balafini6.webp` serviu somente como identidade inicial, sem extrair doces da impressão da embalagem.

A busca externa identificou a página oficial de [Minhocas Azedinhas 500g, referência 315500M13003](https://www.finistore.com.br/balas-de-gelatina/minhocas-azedinhas-500g---fini/500g/315500M13003.html), cuja galeria disponibiliza as duas fotografias usadas:

| Referência | Evidência e uso |
|---|---|
| [R06 — três doces soltos](design/p3-candies/referencias/oficial/MINHOCACITRICA_U3_1000X1000.jpg) | 1000 × 1000 px. A unidade diagonal verde com extremidades laranja está inteira em primeiro plano, sobre os outros doces. Foi o alvo da edição H01 |
| [R07 — macro de conjunto](design/p3-candies/referencias/oficial/MINHOCACITRICA_C_1000X1000.jpg) | 1000 × 1000 px. Referência complementar de açúcar, superfície e volume; não constitui uma nova vista da mesma unidade |

URLs dos arquivos originais: [R06 oficial](https://www.finistore.com.br/dw/image/v2/BHBX_PRD/on/demandware.static/-/Sites-fini-master-catalog/default/dw1c91962d/images/swatch/MINHOCACITRICA_U3_1000X1000.jpg?sh=1000&sm=fit&sw=1000) e [R07 oficial](https://www.finistore.com.br/dw/image/v2/BHBX_PRD/on/demandware.static/-/Sites-fini-master-catalog/default/dwe41325d7/images/swatch/MINHOCACITRICA_C_1000X1000.jpg?sh=1000&sm=fit&sw=1000).

As cópias locais foram preservadas sem retoques. Origem documentada: galeria da FiniStore, consultada nesta execução. Não se conhece o fotógrafo original. A disponibilidade pública não foi tratada como licença de publicação; o piloto permanece para revisão local. Registro de procedência e hashes: [ORIGEM.json](design/p3-candies/referencias/oficial/ORIGEM.json).

Essas referências foram consideradas suficientes para um **piloto visual fundamentado**, pois mostram a unidade inteira e sua superfície. Não comprovam precisão dimensional, todas as faces, escala real ou fidelidade de uma edição automática. Não se atribuiu sabor à combinação de cores.

## 3. Produção executada

Foi utilizada a skill [imagegen](C:/Users/Nicole/.codex/skills/.system/imagegen/SKILL.md), com a ferramenta integrada `image_gen`, em uma chamada de edição com transparência solicitada. R06 foi o alvo e R07 foi referência complementar. A instrução pediu isolar somente a unidade verde/laranja, retirar os demais doces e fundo branco, orientar horizontalmente e preservar forma, cores e açúcar, sem criar outra minhoca.

Prompt exato: [H01-PROMPT.txt](design/p3-candies/H01-PROMPT.txt).

O arquivo gerado foi copiado para o workspace, sem substituir nenhum original. A ferramenta entregou **2172 × 724 px**, mantendo razão 3:1, acima do alvo mínimo de 1536 px. A resolução maior é saída generativa; não equivale a detalhe fotográfico originalmente capturado nessa resolução.

Pillow já disponível foi usado somente para exportação de tamanho/compressão, composição determinística das provas e inspeção do alfa. Não foi usado para desenhar, retocar ou inventar o produto. As três provas usam o mesmo mestre sem recoloração por fundo.

## 4. Validação técnica dos arquivos

| Arquivo | Dimensões | Peso |
|---|---|---|
| Mestre PNG RGBA | 2172 × 724 | 1.682.465 bytes |
| Derivado WebP | 256 × 85 | 8.734 bytes, aproximadamente 8,53 KiB |
| Derivado WebP | 512 × 171 | 28.752 bytes, aproximadamente 28,08 KiB |
| Três provas PNG | 1600 × 1000 cada | Arquivos locais de revisão, fora do carregamento do site |

O mestre tem alfa real de 0 a 255, com 1.014.370 pixels totalmente transparentes e pixels semitransparentes; não é um retângulo branco. Ambos os WebPs foram exportados preservando alfa e decodificados na verificação. As metas de 25/50 KiB do plano foram atendidas. Isso não constitui medição de performance no navegador.

Dimensões, hashes e contagens de alfa: [h01-arquivos.json](auditoria/p3-20261025-01/resultados/h01-arquivos.json). Exportação reproduzível: [exportar-provas-h01.py](auditoria/p3-20261025-01/resultados/exportar-provas-h01.py).

## 5. Provas visuais produzidas e limites observados

Os fundos são creme `#fbf6e9`, azul `#292074` e rosa `#eb3477`. Cada prancha mostra ampliação, rotações -40°/-12°/+16°, amostras desktop/mobile e opacidade 0,62. Nome, dimensões e hash do mestre estão impressos nas provas. As composições são estáticas e não alteram a P2.

Na inspeção visual das três pranchas, o açúcar e o volume são legíveis na ampliação e não há retângulo branco de fundo. Nos tamanhos pequenos, a textura se torna mais sutil. Não se declara recorte perfeito nem fidelidade comercial aprovada.

Pontos que **ainda precisam de revisão**:

1. **Geometria:** a edição ficou mais reta que a unidade fotografada. Portanto, o resultado não deve ser descrito como recorte fotográfico exato, mesmo tendo sido solicitado preservar a silhueta.
2. **Textura:** a geração reinterpretou a granulação. Comparar com R06/R07 antes de considerar o açúcar fiel; a aparência realista, sozinha, não comprova correspondência ao produto.
3. **Enquadramento:** o canvas tem margens verticais maiores que as pretendidas. A área com alfa acima de 16 ocupa aproximadamente x=71–2101 e y=198–543, cerca de 93% da largura e 48% da altura do canvas. Isso faz o doce parecer mais fino dentro das caixas do hero. O mestre original foi preservado; o enquadramento requer ajuste e revisão antes da integração.
4. **Alfa:** há pixels de alfa muito baixo além da silhueta principal. Conferir halo e eventual contaminação de borda a 100% nos três fundos antes de liberar produção final.
5. **Luz/translucidez:** o piloto sugere volume, mas uma imagem RGBA não reproduz refração física nem comprova resposta de luz em todas as rotações.

Não foi feita integração provisória para mascarar essas diferenças. O estado do manifesto é `pilot_generated_pending_review`, com aprovação visual falsa e integração não autorizada.

## 6. O que falta para aprovação

O piloto já pode ser revisado pelos arquivos entregues. Não é necessário fornecer imagens apenas para visualizar esta proposta.

Para uma versão final mais fiel, o material mais útil é **uma fotografia individual em alta resolução da mesma variante e combinação escolhida**, inteira, em fundo neutro contrastante, com pelo menos 2000 px no comprimento ocupado pelo doce e sem sobreposições. Uma vista oblíqua da mesma unidade, um macro do açúcar e uma referência de escala/cor permitem conferir espessura, granulação e proporções. Isso reduz a necessidade de reconstrução generativa.

Antes de integrar, é necessário aprovar a combinação real verde/laranja e revisar as diferenças de geometria, textura, margens e alfa descritas acima; confirmar também a procedência/autorização para eventual publicação dos materiais. Não há aprovação automática de produto por ter sido usada uma fonte oficial.

## 7. Preservação e estado final

A checagem SHA-256 contra a referência inicial confirma preservação de HTML, CSS, JavaScript, plano P3, configurações de publicação e dos 21 WebPs originais: [integridade-final.json](auditoria/p3-20261025-01/resultados/integridade-final.json). O diretório de argolas permanece vazio; não existe arquivo H02.

**Etapa executada: referências oficiais obtidas, um piloto H01 e três provas reais produzidos. Aguarda revisão; nenhuma imagem foi integrada e nenhum deploy foi realizado.**
