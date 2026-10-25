# Provas visuais H01 — protocolo preparado

Estado atualizado: as três provas foram produzidas em `fundos-creme-azul-rosa/`, a partir do piloto H01 fundamentado nas fotografias oficiais preservadas em `referencias/oficial/`. Aprovação visual pendente. O protocolo abaixo documenta as condições de revisão.

Quando houver H01, produzir três pranchas PNG sRGB de 1600 × 1000 px:

- `h01-v01-creme.png`: fundo `#fbf6e9`.
- `h01-v01-azul.png`: fundo `#292074`.
- `h01-v01-rosa.png`: fundo `#eb3477`.

Cada prancha usará o mesmo mestre/derivado, sem recoloração nem ajustes de contraste por fundo, com identificação do nome e hash do arquivo-fonte. Mostrar uma ampliação de inspeção e amostras em tamanho de uso desktop/mobile, identificando escala e DPR para que o zoom do visualizador não seja confundido com nitidez real. Não incluir uma forma CSS ou uma minhoca inventada como substituto do piloto.

Incluir poses de -40°, -12° e +16°, que cobrem o balanço de H01 em P2; testar separadamente opacidades 1 e 0,62. Esses testes são composições estáticas fora do site e não alteram a animação aprovada. A relação entre fase, escala e opacidade será validada no navegador somente em etapa de integração autorizada.

Conferir nos três fundos: contorno sem halo, ausência de fundo residual, açúcar preservado, volume sem plástico/vidro artificial, transparência sem buracos e luz suave nas três rotações. Conferir escala mínima/máxima usando a ficha H01. Comparar um recorte a 100% do derivado com o mestre para identificar perdas de compressão.

Os fundos e rótulos são elementos de apresentação das provas, nunca parte do asset transparente. Não gerar pranchas vazias e chamá-las de provas aprovadas.
