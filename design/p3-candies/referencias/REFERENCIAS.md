# Referências H01 e pedido de imagens

**Atualização de execução:** foram encontradas e baixadas duas fotografias oficiais em `oficial/`: R06 `MINHOCACITRICA_U3_1000X1000.jpg` (unidade verde/laranja inteira no primeiro plano) e R07 `MINHOCACITRICA_C_1000X1000.jpg` (macro). Elas sustentaram um piloto H01, sujeito a revisão. Procedência em `oficial/ORIGEM.json`. O diagnóstico de insuficiência abaixo descreve somente o acervo local anterior à busca externa; o pedido F01–F04 passa a orientar uma eventual produção final mais fiel, não a impedir a revisão do piloto produzido.

## Disponíveis no projeto

| ID | Arquivo original | Uso permitido no piloto | Limite |
|---|---|---|---|
| R01 | `assets/images/balafini6.webp` | Identidade inicial de Minhocas Azedinhas; embalagem examinada visualmente | Não é foto individual; impressão, plástico, reflexos e sobreposição impedem extrair uma unidade fiel |
| R02 | `assets/images/caixafini2.webp` | Contexto de outra apresentação da família Minhocas; examinado visualmente | Rótulo visível “Minhocas”, sem identificação “Azedinhas”; não comprova variante, açúcar ou cores de H01 |
| R03 | Capturas e sequências P0/P1/P2 e `tools/screenshots/` | Composição e movimento aprovados | Mostram o site e seus doces CSS; não são fotografias de produto |
| R04 | Backups de assets P1/P2 | Rastreabilidade | Repetem as embalagens existentes; não acrescentam fotografia individual |
| R05 | `REVISAO-VISUAL-FINI-P1.zip` e `REVISAO-MOTION-FINI-P2.zip` | Evidências de revisão | Entradas inventariadas sem extração; conjuntos de capturas, HTML e README |

Nenhum original foi modificado. A origem de R01/R02 nesta entrega é o acervo local do projeto; fotógrafo, fornecedor e autorização de uso não estão documentados nesses arquivos. Não atribuir autoria oficial apenas pela presença da marca na embalagem. Hashes em `auditoria/p3-20261025-01/resultados/integridade-inicial.json`.

## Imagens necessárias antes de produzir H01

Fornecer os arquivos originais, sem filtros de cor, modo retrato com desfoque artificial ou compressão de mensageiro. Pode ser fotografia própria de uma amostra física ou acervo autorizado, identificado como **Minhocas Azedinhas**. Uma foto de minhoca lisa/da versão comum não substitui essa confirmação.

| Pedido | Enquadramento exato | Resolução e finalidade |
|---|---|---|
| F01 — unidade inteira | Uma única minhoca real, isolada e sem sobreposições; horizontal, curva natural suave; câmera quase superior, cerca de 20° fora da perpendicular; ambas as pontas e todos os grãos periféricos em foco | Preferir pelo menos 2000 px no comprimento ocupado pelo doce. Fundo neutro fosco contrastante, sem estourar açúcar. Define silhueta, combinação cromática e transição entre cores |
| F02 — volume | A mesma unidade em vista oblíqua de aproximadamente 35–45° acima do plano de apoio; mostrar lateral, espessura e pontas; mesma luz e balanço de branco | Pelo menos 2000 px no lado maior, com doce ocupando a maior parte útil. Não usar essa foto para inventar faces ausentes em F01 |
| F03 — textura macro | Close nítido da mesma unidade, incluindo superfície açucarada, transição de cores e uma borda iluminada | Pelo menos 1200 px na região útil; verificar granulação, brilho e translucidez. Não molhar ou untar para intensificar brilho |
| F04 — identificação e escala | Embalagem da amostra com nome/variante e código legíveis; foto adicional do doce ao lado de régua, com iluminação neutra e referência cinza/branca | Identifica procedência e dimensões; régua/cartão ficam apenas na referência, nunca no asset |

Informar junto: fonte/autor ou fornecedor, permissão de utilização, data aproximada e confirmação de que F01–F03 mostram a variante correta. Se a cor desejada para H01 não corresponder à combinação do CSS, prevalece o produto documentado; submeter a combinação real à revisão, sem recoloração.

Um recorte profissional RGBA já existente pode substituir F01 se tiver detalhe e procedência suficientes. F02/F03 podem ser atendidas por outra foto que mostre claramente os mesmos detalhes; avaliar o material recebido antes de solicitar nova sessão. Fotografias do pacote ou screenshots de loja, sozinhas, continuam insuficientes.

## Entrada e preservação futuras

Guardar os originais em `referencias/recebidas/` quando forem fornecidos, sem sobrescrever R01/R02. Registrar nome original, SHA-256, fonte, direitos informados e quais decisões cada foto sustenta. Criar derivados em `masters/`, sem alterar os originais. Não há referências recebidas nesta entrega.
