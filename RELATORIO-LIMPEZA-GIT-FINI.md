# Organização segura do Git — Fini

Data: 26/10/2026. **Nenhum arquivo foi excluído fisicamente. Sem commit, push ou deploy.**

## Resultado

O índice tinha **5.168 arquivos rastreados**, incluindo **5.095 em `auditoria/`**, com capturas, logs, backups, scripts e perfis/caches de navegador. Não havia alterações previamente preparadas no índice. Havia modificações de etapas anteriores em HTML, CSS, JS, README e configuração, preservadas nesta organização.

Após revisão das regras e arquivos, foi executado `git rm --cached --pathspec-from-file=.local-cleanup/untrack-paths.txt --pathspec-file-nul --quiet`, com lista explícita previamente verificada. **5.119 arquivos deixaram o índice; todas as 5.119 cópias locais continuam presentes.**

| Grupo retirado do índice | Arquivos |
|---|---:|
| `auditoria/` | 5.095 |
| Provas em `design/p3-candies/provas/` | 8 |
| Relatórios/documentos históricos na raiz | 10 |
| ZIPs de revisão antes rastreados | 6 |
| **Total** | **5.119** |

O índice passou a conter **49 arquivos**, antes de qualquer futura inclusão dos documentos e ferramentas novos. Os arquivos de auditoria/revisão que já eram não rastreados passaram a ser ignorados, sem remoção local.

**No GitHub Desktop haverá uma transição:** as 5.119 remoções do índice aparecem como exclusões preparadas para um eventual commit. Isso é esperado e não indica apagamento no disco. Sem realizar commit, não é possível registrar definitivamente essa retirada e ao mesmo tempo zerar as alterações pendentes. Nenhum commit foi feito. O histórico existente e o espaço ocupado em `.git/` não foram reescritos ou reduzidos.

## Preservações e regras

Foram preservados código-fonte, todos os assets existentes em `assets/`, README, `.gitattributes`, `.gitignore`, `vercel.json`, `.vercelignore` e ferramentas. Os arquivos novos `tools/build_dist.mjs`, `tools/publication-allowlist.json` e `tools/check_dist.py` continuam presentes e elegíveis ao versionamento; não foram adicionados ao índice automaticamente.

Também permanecem elegíveis:

- [Pendências de autorização](PENDENCIAS-AUTORIZACAO-FINI.md), sem encerramento presumido dos direitos.
- [Resumo técnico consolidado P1–P5](RESUMO-TECNICO-FINI.md), criado nesta organização.
- [Revisão de prontidão para portfólio P5-B](RELATORIO-P5-B-FINI.md), mantida como registro permanente por conter inventário de terceiros e recomendações específicas.
- Este relatório de organização.

Mestres PNG, referências originais, `ORIGEM.json`, registros de procedência e prompts em `design/p3-candies/` continuam rastreados, com exceção das provas de revisão. Embora não sejam necessários ao runtime, são úteis à rastreabilidade e não foram tratados como lixo descartável. Nenhuma imagem histórica em `assets/` foi retirada do índice ou incluída na proposta de exclusão física.

`.gitignore` agora cobre `/auditoria/`, `/dist/`, `/.local-cleanup/`, provas, ZIPs `REVISAO*.zip`, relatórios históricos e documentos de planejamento/busca específicos, além de logs, temporários, backups com extensões convencionais e caches. Há exceções explícitas para P5-B e este relatório. Foram mantidas as regras para `.env*`, `.vercel`, capturas e perfil da ferramenta. Não se usou uma regra geral `*.md` ou `*.png`.

README atualizado para apontar ao resumo permanente e explicar que os relatórios/links históricos são do acervo local, indisponível em um checkout limpo. A configuração de publicação continua apontando exclusivamente para `dist/` e não foi alterada nesta execução.

## Proposta de exclusão física futura — não autorizada

Inventário local de **10.832 arquivos**, **2.350.736.272 bytes**, aproximadamente **2,19 GiB**. São bytes lógicos dos arquivos no momento do levantamento, não uma medição de espaço alocado ou garantia exata de espaço recuperável. Perfis ativos podem mudar; conferir novamente antes de qualquer exclusão futura.

| Grupo proposto | Arquivos | Bytes | Tratamento futuro |
|---|---:|---:|---|
| `auditoria/` | 10.041 | 1.969.600.516 | Evidências, capturas, logs, cópias e perfis; arquivar o que se desejar guardar antes de autorizar descarte |
| ZIPs de revisão na raiz | 8 | 233.622.870 | Pacotes históricos; não são distribuição pública |
| `tools/browser-profile/` | 732 | 135.009.019 | Perfil/cache de automação; encerrar o processo que o utilize antes de uma eventual exclusão |
| `tools/screenshots/` | 7 | 6.232.573 | Capturas reproduzíveis; arquivar se forem evidência desejada |
| `design/p3-candies/provas/` | 8 | 4.647.407 | Pranchas/protocolo de revisão; mestres e referências não estão incluídos |
| `dist/` | 21 | 1.367.571 | Saída regenerável com `node tools/build_dist.mjs` |
| Relatórios/documentos históricos na raiz | 15 | 256.316 | Resumidos no consolidado; descarte implica perder o detalhamento local, salvo cópia externa |
| **Total** | **10.832** | **2.350.736.272** | **Somente proposta** |

Lista exata, por arquivo, tamanho e grupo: [CSV de exclusão proposta](.local-cleanup/proposed-deletion.csv). [JSON com caminhos, tamanhos e datas de modificação](.local-cleanup/proposed-deletion.json). Esses inventários são locais e ignorados pelo Git, não contêm conteúdo dos arquivos e não executam exclusões.

Os 15 documentos históricos propostos são: `AUDITORIA-P4-FINI.md`, `AUDITORIA-VISUAL-FINI.md`, `BUSCA-REFERENCIA-H02-FINI.md`, `PLANO-P3-FINI.md`, relatórios P1/P2, P3-D-H01/P3-H01-V02/P3-H02/P3-PILOTO, P4-A/B/C/D e P5-A. Os oito ZIPs são P1, P2, P3-H01, P3-H01-V02, P3-D-H01, P3-H02, P4-B e P4-D.

**Não fazem parte da proposta:** `.git/`, segredos/configuração local, fonte e assets, ferramentas, README, pendências, P5-B, resumo consolidado, este relatório, mestres e referências de produção. `/.local-cleanup/` também não integra esse total: contém os inventários desta execução e uma cópia de teste isolada, mantidos para revisão e ignorados. Nem pastas nem arquivos foram fisicamente removidos.

## Verificações

- Build principal passou: 21 arquivos, 1.367.571 bytes, com cópias verificadas por SHA-256.
- `node --check js/script.js` e `node --check tools/build_dist.mjs` passaram.
- `python tools/validate_files.py` passou: caminhos, imagens dinâmicas, IDs, alt e chaves CSS; 21 WebPs da pasta original principal decodificados.
- `python tools/check_dist.py` passou contra `http://127.0.0.1:8015/`: 21 recursos com conteúdo íntegro e 21 tentativas de acesso interno com 404, incluindo backup real ainda presente.
- Uma cópia isolada em `.local-cleanup/clean-build/`, somente com os insumos de build/validação necessários, gerou a mesma saída sem relatórios históricos, backups ou perfis. Validação de arquivos e sintaxe também passou. Nessa cópia, a pasta principal contém somente os 16 WebPs necessários; os dois H01 ficam na subpasta.
- O verificador `tools/check_dist.py` foi ajustado para não exigir backups históricos em um checkout limpo e para criar seu diretório de evidências quando necessário. Não houve alteração em HTML/CSS/JS ou assets.
- Verificado que não restam arquivos rastreados alcançados pelas regras atuais de ignore e que nenhum caminho protegido está na lista retirada do índice.
- Confirmada a presença local dos 5.119 arquivos retirados do índice e a correspondência exata entre o índice final e o índice inicial menos essa lista.

A suíte funcional/responsiva de navegador da P5-A não foi repetida integralmente: não houve alteração no runtime. Foram executados build, validações estáticas e testes HTTP pertinentes à organização e à independência do acervo. Os resultados funcionais anteriores estão consolidados no resumo P1–P5.

## Estado final e próximo passo

Contagem final de `git status`: **5.119 exclusões preparadas (`D `), sete arquivos modificados fora do índice (` M`) e sete arquivos novos elegíveis (`??`)**. Os novos são pendências de autorização, relatório de limpeza, P5-B, resumo consolidado, build, verificador HTTP e allowlist. As modificações são `.gitignore`, `.vercelignore`, README, HTML, CSS, JS e `vercel.json`; as mudanças em fonte e configuração de publicação já existiam antes desta organização. O acervo ignorado continua no disco.

Os 21 arquivos-fonte usados pela distribuição também foram comparados diretamente aos hashes P4-D e permaneceram idênticos. `git diff --check` passou, com avisos de normalização LF/CRLF; a verificação do diff preparado também foi executada.

O plano e o estado anterior do índice constam em `.local-cleanup/index-before.json`; a lista exata retirada do índice está em `.local-cleanup/untrack-paths.txt` (separada por NUL). Nenhum segredo local foi aberto para essa auditoria.

**Aguardando autorização do usuário antes de apagar qualquer arquivo. Não houve commit, push ou deploy.**
