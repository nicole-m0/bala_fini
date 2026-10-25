# Relatório P3 — revisão H01-v02

Data: 25/10/2026. **H01-v02 produzido para revisão; não aprovado e não integrado ao site.**

## Resultado entregue

- [Mestre PNG RGBA v02](design/p3-candies/masters/minhoca-a-view01-v02.png).
- [Saída original da ferramenta, sem reenquadramento](design/p3-candies/masters/minhoca-a-view01-v02-gerado-original.png).
- Derivados WebP de [256 px](assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-256.webp) e [512 px](assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-512.webp).
- Provas sobre [creme](design/p3-candies/provas/h01-v02/h01-v02-creme.png), [azul](design/p3-candies/provas/h01-v02/h01-v02-azul.png) e [rosa](design/p3-candies/provas/h01-v02/h01-v02-rosa.png).
- [Comparação lado a lado R06 / v01 / v02](design/p3-candies/provas/h01-v02/comparacao-r06-v01-v02.png), incluindo as mesmas caixas de apresentação desktop/mobile.
- Pacote de revisão: `REVISAO-VISUAL-FINI-P3-H01-V02.zip`.

## Referências e processo

Foram usadas as fotografias oficiais já preservadas no projeto:

- **R06:** `design/p3-candies/referencias/oficial/MINHOCACITRICA_U3_1000X1000.jpg`. Alvo: a unidade verde com pontas laranja, inteira, diagonal e em primeiro plano.
- **R07:** `design/p3-candies/referencias/oficial/MINHOCACITRICA_C_1000X1000.jpg`. Apoio para observação da superfície açucarada, sem tratar o conjunto como nova vista da mesma unidade.

Origem e URLs permanecem em [ORIGEM.json](design/p3-candies/referencias/oficial/ORIGEM.json). As referências não foram retocadas, nem substituídas por imagens de outro produto. Não houve nova busca externa ou uso da impressão da embalagem como fonte de recorte.

Foi aplicada a skill [imagegen](C:/Users/Nicole/.codex/skills/.system/imagegen/SKILL.md), usando a ferramenta integrada `image_gen`, em uma chamada com R06 e R07. A instrução priorizou a curva, assimetria, pontas e açúcar da unidade real. A v01 foi examinada como comparação, mas não foi enviada como modelo de geometria à ferramenta, para evitar repetir seu formato cilíndrico.

Prompt completo: [H01-V02-PROMPT.txt](design/p3-candies/H01-V02-PROMPT.txt). O resultado é uma **edição generativa baseada em fotografias**, não uma extração fotográfica exata ou comprovação automática de fidelidade comercial.

## Ajustes e diferenças observadas

| Aspecto | v01 | v02 e limite ainda existente |
|---|---|---|
| Curva | Corpo quase reto, com aparência de bastão | Curva suave, ponta esquerda elevada e lados menos paralelos. Aproxima o gesto de R06, mas não reproduz exatamente sua linha central |
| Pontas | Extremidades arredondadas com aparência de cápsula | Esquerda mais estreita e assimétrica; direita mais larga. A ponta direita ainda parece mais bulbosa que a referência e precisa de avaliação |
| Geometria | Corpo e relevo bastante regulares | Variações de largura e contorno mais naturais; ainda há simplificação de detalhes locais em relação à fotografia |
| Açúcar | Distribuição visualmente uniforme | Grãos e aglomerados mais variados, com regiões de cobertura diferente. Parte dos cristais parece maior/mais contrastada que em R06; não se afirma correspondência grão a grão |
| Cores/luz | Verde e laranja fundamentados na referência | Mesma família cromática observada em R06 e luz suave. Saturação, transições e brilho continuam sujeitos à revisão; não houve recoloração por fundo |
| Área útil | Margens verticais amplas; doce fino na caixa de uso | Canvas ajustado à silhueta, com margens próximas de 5% por lado; maior altura aparente nas caixas reais |

As três provas e a comparação foram abertas e inspecionadas visualmente. Não aparece retângulo branco de fundo. A superfície continua muito detalhada na ampliação; no tamanho mobile a granulação se torna sutil. A borda clara em torno de alguns grãos merece conferência a 100%, principalmente sobre azul. **Não se declara halo zero ou aprovação final da translucidez.**

## Enquadramento e preservação da silhueta

A ferramenta entregou um PNG RGBA de **1774 × 887 px**, ainda com área transparente vertical excessiva. Esse arquivo foi preservado integralmente como `minhoca-a-view01-v02-gerado-original.png`.

Para o mestre de entrega, foi ajustado somente o canvas: caixa de referência do alfa acima de 1/255, com margem adicional de 5% em cada eixo. A caixa de recorte na saída original foi `(-33, 231, 1831, 714)`, com preenchimento transparente nas áreas externas. O resultado é **1864 × 483 px**, sem deformação, rotação adicional, interpolação do produto ou alteração de seus pixels internos. O aumento de largura vem da margem transparente adicionada, não de upscale do doce.

Foram excluídos apenas resíduos externos de alfa igual a 1/255, afastados da silhueta principal. Não se aplicou limiar ao interior da imagem nem removedor de fundo por cor; os grãos de açúcar visíveis e a semitransparência interna permaneceram. A saída bruta está no ZIP para auditoria dessa decisão.

Na v02, a caixa com alfa acima de 1 ocupa cerca de **91% da largura e 91% da altura** do mestre. Na v01, a silhueta principal anteriormente medida acima de 16/255 ocupava cerca de **93% da largura e 48% da altura**. São limiares registrados para identificar a silhueta principal e não uma métrica de fidelidade do produto.

Na caixa desktop de 100 × 33 px, a altura estimada da silhueta passa de aproximadamente 16 px para 24 px, por contenção proporcional. A proporção nativa do novo arquivo é aproximadamente 3,86:1; ela não foi forçada a 3:1 nem alongada para preencher a caixa CSS.

## Arquivos e verificação técnica

| Arquivo v02 | Dimensões | Bytes |
|---|---|---|
| Saída bruta PNG RGBA | 1774 × 887 | 1.245.825 |
| Mestre reenquadrado PNG RGBA | 1864 × 483 | 1.144.555 |
| WebP com alfa | 256 × 66 | 8.824 |
| WebP com alfa | 512 × 133 | 28.570 |
| Cada prova de fundo | 1600 × 1200 | Registrado no manifesto de resultados |
| Comparação R06/v01/v02 | 1800 × 1300 | 414.109 |

Mestre e WebPs têm alfa real, incluindo pixels totalmente transparentes. As imagens foram decodificadas e os derivados respeitam as metas de 25/50 KiB. Não houve retoque por fundo nem filtros de cor nos derivados. Os perfis de prova usam os valores RGB do site; não houve ensaio colorimétrico em monitor calibrado.

Resultados, dimensões, hashes e preservação: [h01-v02-arquivos.json](auditoria/p3-h01-v02/resultados/h01-v02-arquivos.json). Processamento reproduzível com Pillow já disponível: [preparar-v02.py](auditoria/p3-h01-v02/resultados/preparar-v02.py). Não foram instaladas dependências.

## Provas em tamanho de uso

Cada prova usa o mesmo mestre sobre creme `#fbf6e9`, azul `#292074` e rosa `#eb3477`, e apresenta:

- Ampliação para inspeção de material e contorno.
- Rotações estáticas de -40°, -12° e +16°.
- Caixas de 100 × 33 px desktop e 65 × 23 px mobile, além de extremos arredondados de escala: 116 × 38, 68 × 22, 75 × 27 e 44 × 16 px.
- Amostra com opacidade 0,62, correspondente ao recurso gráfico de profundidade de P2.

As caixas estão representadas a DPR 1 na imagem. Abrir a prova a 100% para conferir tamanho em pixels; o zoom do visualizador pode alterar sua percepção. São composições fora do site, não screenshots de uma integração. A comparação mantém R06 inteira e identifica a unidade-alvo; v01 e v02 são apresentadas com largura de canvas equivalente e também nas mesmas caixas reais.

## Preservação e pacote para revisão

Uma comparação SHA-256 confirmou **35 arquivos preservados**, incluindo HTML, CSS, JavaScript, plano P3, configurações de publicação, 21 imagens originais, referências e mestre/derivados/provas v01. A v01 não foi sobrescrita. O ZIP anterior continua preservado.

O novo ZIP reúne:

```text
referencias/      R06, R07 e registro de origem
piloto/v01/      mestre e WebPs originais
piloto/v02/      saída bruta, mestre reenquadrado e WebPs
provas/v01/      três provas anteriores
provas/v02/      três provas novas
comparacao/      prancha R06 / v01 / v02
documentacao/    relatório, prompt, resultados e instruções de revisão
```

Não foram produzidos H02 ou argolas, nem modificados componentes do site. Nenhuma integração, commit ou publicação foi realizada.

**A v02 está entregue para revisão visual. Curva, ponta direita, granulação, contorno e ocupação óptica ainda exigem sua aprovação antes de qualquer integração.**
