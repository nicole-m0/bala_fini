# Relatório P3-C — verificação de referências para H02

Data: 25/10/2026. **Produção de H02 não iniciada: não foi identificada uma segunda unidade inteira verificável em R06/R07.** H01-v02 e sua integração local aprovada permanecem intactas.

## 1. Resultado efetivamente obtido

As duas fotografias oficiais locais foram abertas e examinadas. Há combinações cromáticas diferentes da H01, mas as unidades correspondentes não mostram o contorno completo. Não foi produzida uma minhoca por reconstrução de partes ocultas, pois a solicitação exige preservar a geometria observada e identificar uma unidade inteira.

Este relatório registra a inspeção realizada e a imagem adicional necessária. **Não é uma entrega de piloto H02 aprovado, nem uma nova revisão do plano P3.**

## 2. Inspeção das fotografias

### R06 — três minhocas sobre fundo branco

Arquivo: [MINHOCACITRICA_U3_1000X1000.jpg](design/p3-candies/referencias/oficial/MINHOCACITRICA_U3_1000X1000.jpg), 1000 × 1000 px.

| Unidade observada | Informação verificável | Limitação para H02 |
|---|---|---|
| Verde com pontas laranja, diagonal em primeiro plano | Duas pontas e contorno inteiro visíveis | Já fundamenta H01. Não oferece a segunda combinação própria solicitada |
| Azul/turquesa e vermelho/rosa, transversal superior | Pontas azuis e trechos vermelhos visíveis | A minhoca verde/laranja encobre parte do corpo e do contorno. Não é uma unidade com silhueta integralmente visível |
| Vermelho/rosa e amarelo/laranja, transversal inferior | Trechos das cores e extremidades visíveis | O corpo central e parte do contorno estão encobertos pela unidade em primeiro plano |

Os nomes das cores descrevem a aparência na fotografia, sem atribuir sabor ou declarar um SKU distinto. A presença das cores **não resolve a geometria ausente**. Extrair uma dessas unidades exigiria decidir como o corpo se curva, varia de espessura e recebe açúcar sob a sobreposição.

### R07 — macro de várias unidades

Arquivo: [MINHOCACITRICA_C_1000X1000.jpg](design/p3-candies/referencias/oficial/MINHOCACITRICA_C_1000X1000.jpg), 1000 × 1000 px.

A imagem permite observar açúcar irregular, gelatina, brilho e cores. Porém, no conjunto examinado, não foi identificada uma segunda unidade com ambas as pontas e todo o contorno visíveis: as minhocas se sobrepõem ou ultrapassam as bordas da foto.

Não há documentação de que uma unidade de R07 seja a mesma unidade física de R06 em outro ângulo. Portanto, não foi usada para preencher partes ocultas de R06 por suposição.

Origem oficial e URLs já documentadas: [ORIGEM.json](design/p3-candies/referencias/oficial/ORIGEM.json). Os hashes conferidos continuam iguais ao registro de procedência. Inspeção registrada em [inspecao-referencias.json](auditoria/p3-h02/inspecao-referencias.json).

## 3. Por que não foi gerado um piloto

A ferramenta `image_gen` está disponível, mas não foi acionada. Uma geração poderia criar uma minhoca plausível azul/vermelha ou vermelho/amarela; isso não preservaria de maneira verificável as partes não fotografadas da unidade original.

Também não foi recolorida H01, duplicada sua pose ou alterado seu mestre para simular uma segunda variante. Nenhuma dessas ações atenderia à combinação de pose própria e geometria observada exigida para H02.

## 4. Imagem adicional necessária

Fornecer **uma fotografia original de uma segunda Minhoca Azedinha inteira e isolada**, preferencialmente de uma das combinações azul/vermelho ou vermelho/amarelo já observadas em R06:

- Duas pontas e todo o contorno visíveis, sem outros doces em cima, sem corte pelas bordas.
- Curva natural suave e câmera quase superior, permitindo perceber alguma espessura.
- Fundo neutro contrastante, foco no doce inteiro e luz difusa compatível com as referências.
- Preferencialmente pelo menos **2000 px no comprimento ocupado pelo doce**, sem filtros ou compressão de mensageiro.
- Identificação de origem e confirmação da variante Minhocas Azedinhas. Não basta uma fotografia da embalagem ou de uma minhoca lisa da versão comum.

R07 já fornece apoio de textura; não é necessário repetir uma sessão macro apenas para retomar o piloto se a nova foto inteira tiver qualidade suficiente. Um recorte profissional com alfa, origem identificada e silhueta completa também pode atender a essa necessidade.

## 5. Entregas e pendências

| Item solicitado | Resultado desta execução |
|---|---|
| Examinar R06/R07 e identificar candidatos | Executado; oclusões e cortes registrados |
| Identificar uma segunda unidade inteira | Não atendido pelas referências disponíveis |
| Mestre H02 PNG RGBA | Não produzido |
| H02 WebP 256/512 | Não produzidos |
| Provas creme, azul e rosa em 85 × 30 px | Não produzidas, pois não existe piloto H02 fundamentado |
| Comparação visual H01-v02/H02 | Pendente; não foi feita comparação fictícia com placeholder |
| Relatório e ZIP | Produzidos com as evidências disponíveis e a limitação explicitada |

ZIP: **`REVISAO-VISUAL-FINI-P3-H02.zip`**. Contém R06, R07, origem, este relatório, registro da inspeção, verificação de integridade e uma cópia inalterada de H01-v02 apenas como contexto. O `LEIA-ME.txt` identifica claramente a ausência de H02. Não contém provas vazias ou imagens genéricas apresentadas como piloto.

## 6. Preservação

Foram registrados e comparados por SHA-256 **37 arquivos existentes**: HTML, CSS/JavaScript da integração H01 aprovada, plano, configurações estáticas, imagens originais, derivados e mestres já existentes, além das referências oficiais. Resultado: [verificacao-final.json](auditoria/p3-h02/verificacao-final.json).

Não foram alterados H01-v02, sua integração, H02 CSS, argolas, Mundo Fini ou animações P2. Não houve instalação de dependências, commit ou deploy. As alterações de site já presentes no Git pertencem à P3-D aprovada, não a esta execução.

**Próxima condição para produzir H02: receber uma foto individual inteira da segunda unidade. Sem essa evidência, a produção permanece interrompida para não inventar a geometria oculta.**
