# Ficha técnica final de produção — H01

**Atualização da execução:** piloto produzido com base em referência oficial; mestre real de 2172 × 724 px. A ficha abaixo é a especificação-alvo, não uma certificação de que a geração a cumpriu integralmente. Ver diferenças de curva, margens e alfa em `RELATORIO-P3-PILOTO-FINI.md` na raiz. Não integrado e não aprovado.

Data: 25/10/2026. Especificação técnica definida; forma, cor e material exatos dependem da referência individual. Nenhum asset foi produzido ou aprovado.

| Campo | Especificação |
|---|---|
| Identidade | Uma unidade real de Minhoca Azedinha da variante comprovada pelas referências; ID H01; sem olhos, rosto, mascote, embalagem ou elementos inventados |
| Pose | Corpo inteiro horizontal, com sinuosidade natural suave; pontas separadas e visíveis; sem nó, estiramento artificial ou curva fechada para caber na caixa |
| Câmera | Projeção quase superior, aproximadamente 20° fora da perpendicular (faixa de trabalho 15–25°); espessura visível e perspectiva discreta, sem grande-angular |
| Orientação | Eixo longo horizontal; a inclinação orbital virá do wrapper em futura integração. Preservar direção das cores e assimetrias observadas na foto, sem espelhar arbitrariamente |
| Proporção | Canvas-alvo 3:1, mestre 1536 × 512 px; ajustar a altura se a pose real exigir. Sem deformar a silhueta para atingir a proporção. Registrar dimensões finais e área ocupada |
| Margens/pivô | 4–6% por borda como ponto de partida; todos os grãos preservados. Centro óptico próximo de 50%/50%; registrar compensação estática se necessária, sem alterar geometria orbital |
| Transparência | PNG RGBA com alfa real e sRGB; fundo alfa 0, sem matte ou checkerboard gravado. Grãos periféricos e semitransparência natural preservados. Não reduzir alfa do corpo inteiro para simular gelatina |
| Luz | Fonte ampla difusa superior esquerda, preenchimento suave oposto, balanço de branco neutro; contraste suficiente para volume sem reflexos duros que pareçam girar como farol |
| Material | Açúcar e gelatina segundo F01–F03; grãos irregulares na escala observada, brilho e espessura reais. Não inventar estrias, segmentação, cores ou uniformizar a superfície |
| Sombra | Sombreado próprio do doce; sem sombra de chão, elipse, reflexo de superfície ou sombra projetada externa incorporada ao PNG |
| Cor | Combinação e ponto de transição determinados pela unidade real aprovada. Sem escolher azul/rosa a partir do gradiente CSS, atribuir sabor à cor ou aumentar saturação para combinar com o site |
| Mestre previsto | `masters/minhoca-a-view01-v01.png`; somente H01, original de referência separado |
| Derivados previstos | `assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v01-256.webp` e `minhoca-a-view01-v01-512.webp`, mantendo alfa e proporção. Alturas determinadas pelo mestre; metas de até 25/50 KiB respectivamente |
| Uso de referência | Edição/recorte fiel da foto ou render offline fundamentado nela. Ferramenta generativa disponível não dispensa comparação humana nem comprova fidelidade comercial |

## Tamanho de revisão

H01 tem caixa de 100 × 33 px no desktop e 65 × 23 px no mobile. P2 aplica escala de 0,68 a 1,16 e opacidade de 0,62 a 1. Avaliar o mesmo sprite em caixas desktop de aproximadamente 68 × 22,4 e 116 × 38,3 px, e mobile de 44,2 × 15,6 e 75,4 × 26,7 px, sempre com contenção proporcional. São caixas, não promessa de preenchimento integral da silhueta.

512 px no lado maior cobre 100 × 1,16 × DPR 3 = 348 pixels físicos com margem para recorte. Não servir o mestre de 1536 px ao site. Nesta etapa nenhuma fonte será ligada ao hero.

## Produção e aceite

1. Conferir variante, origem e suficiência de F01–F04; selecionar uma única combinação real para H01.
2. Preservar o original; produzir somente um mestre H01 e seus derivados.
3. Gerar as provas conforme `provas/PROTOCOLO-PROVAS.md`, usando exatamente o mesmo arquivo nos três fundos.
4. Conferir textura, geometria, cores, alfa e nitidez em comparação direta com as fotos. Registrar alterações e limitações da ferramenta utilizada.
5. Submeter o piloto à revisão da pessoa solicitante. Integração, H02 e argolas continuam fora desta autorização.

Sem referência individual adequada, a etapa 1 não está atendida. Não criar um “piloto genérico” para preencher os diretórios.
