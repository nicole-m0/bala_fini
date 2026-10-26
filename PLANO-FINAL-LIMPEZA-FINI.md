# Plano final de limpeza — aguardando autorização

Data: 26/10/2026. **Nenhum arquivo foi apagado fisicamente. Não foi feito commit, push ou deploy nesta execução.** Este documento apresenta o backup concluído e a lista proposta para uma etapa futura.

## 1. Git e preservação

Na abertura desta etapa, o Git estava limpo, com **56 arquivos rastreados**, no HEAD `222ac137698e2d54762902a36e7dfeaa34bc386b`. O estado mudou desde a auditoria anterior: as 5.119 retiradas já estavam incorporadas ao estado atual do repositório, não aparecendo mais como exclusões preparadas. Nenhum commit foi criado por esta execução.

Os **5.119 caminhos** da lista anterior foram reconferidos: nenhum voltou ao índice e **todas as 5.119 cópias locais continuam presentes**. A lista de referência está em `.local-cleanup/index-before.json` e `.local-cleanup/untrack-paths.txt`.

Foram conferidos e preservados os 21 arquivos da allowlist do site, README, configurações Git/publicação, ferramentas de build e validação, documentação permanente, referências, registros de origem e mestres. Não se alterou HTML, CSS, JS ou assets. Os arquivos protegidos tiveram SHA-256 registrado no plano e foram reconferidos após a criação do backup.

### Conferência documental

- `RESUMO-TECNICO-FINI.md`: consolida P1–P5, implementação, configuração, validações e limites. Distingue encerramento técnico de autorização de publicação.
- `PENDENCIAS-AUTORIZACAO-FINI.md`: mantém abertas as pendências de marca, fotografias/embalagens, mascote e H01-v02. Não houve encerramento automático.
- `RELATORIO-P5-B-FINI.md`: mantém o enquadramento como estudo independente para portfólio, sem contratação/parceria presumida, com inventário, riscos de confusão, alternativas e checklist. A aprovação documental não é licença de uso público.

Os três documentos estão coerentes com as decisões do usuário e não precisaram ser modificados. Créditos, origem pública e aviso conceitual continuam distintos de comprovação de direitos.

## 2. Backup externo concluído e verificado

Pasta fora do repositório:

```text
C:\Users\Nicole\Documents\Backups-Fini\bala-fini-limpeza-20261026-01
```

Arquivo: `fini-documentos-e-evidencias.zip`.

- **3.093 arquivos arquivados**, correspondentes a **695.535.583 bytes originais**.
- Tamanho do ZIP: **671.434.215 bytes**.
- SHA-256 do ZIP: `6b40da38586b2e9a929e49b11b2999db6dbca5f51585118dfddef9c92aed5f9a`.
- Cada entrada do ZIP foi reaberta e teve seu SHA-256 comparado ao conteúdo-fonte; todos passaram. As fontes também foram verificadas durante a cópia para detectar alterações.

O backup inclui **todos os 3.032 arquivos candidatos que não são de perfis de navegador**: documentos históricos, oito ZIPs de revisão, evidências de auditoria (capturas, sequências, logs, resultados, scripts e backups), provas de produção, capturas da ferramenta e a distribuição gerada. Também contém os 56 arquivos atualmente rastreados e cinco inventários/registros locais, para preservar contexto, fontes, mestres, referências e documentos permanentes.

Arquivos auxiliares na pasta externa:

- `manifest-sha256.json`: caminho relativo, tamanho e SHA-256 de cada arquivo arquivado.
- `backup-verification.json`: resultado da verificação e hash do ZIP.
- `final-deletion-plan.json`: cópia do plano com os caminhos propostos e os arquivos protegidos.
- `RESTORE.txt`: instruções de restauração. Extrair primeiro em uma pasta nova, conferir o manifesto e restaurar seletivamente, sem sobrescrever automaticamente o repositório ou seu índice.

**Fora do backup:** 7.805 arquivos de perfis/caches de navegador, cujo descarte futuro será irreversível na ausência de outra cópia. Foram excluídos do backup por não serem evidências técnicas essenciais; não foram apagados. Não se copiaram `.git/`, arquivos `.env*` ou configurações locais `.vercel/` diretamente. Os ZIPs históricos foram preservados como arquivos, sem republicação ou inspeção individual de seu conteúdo nesta etapa; este backup não é certificado como pacote público sanitizado.

O backup é local, em outra pasta do mesmo computador; não equivale a uma cópia em outro dispositivo ou em armazenamento remoto. Nenhum upload foi realizado.

## 3. Grupos propostos para exclusão futura

Novo levantamento feito após o build. Os números substituem o inventário anterior de 10.832 arquivos: houve crescimento em perfis de navegador, não expansão do escopo para fontes ou documentos permanentes.

| Grupo | Arquivos | Bytes lógicos | Situação do backup |
|---|---:|---:|---|
| `auditoria/` | 10.046 | 1.987.164.260 | 2.973 arquivos arquivados; 7.073 de perfis não arquivados |
| Oito ZIPs `REVISAO*.zip` da lista | 8 | 233.622.870 | Todos arquivados |
| `tools/browser-profile/` | 732 | 135.009.019 | Perfil/cache não arquivado |
| `tools/screenshots/` | 7 | 6.232.573 | Todos arquivados |
| `design/p3-candies/provas/` | 8 | 4.647.407 | Todos arquivados; não inclui mestres/referências |
| `dist/`, somente cópia gerada | 21 | 1.367.571 | Todos arquivados e regeneráveis; fontes/assets originais preservados |
| Quinze documentos históricos da lista | 15 | 256.316 | Todos arquivados |
| **Total proposto** | **10.837** | **2.368.300.016** | **3.032 candidatos arquivados; 7.805 arquivos de perfis não arquivados** |

Total aproximado: **2,21 GiB**. São tamanhos lógicos num instante de levantamento, não espaço físico garantido de recuperação. Perfis ativos podem mudar; os caminhos e tamanhos devem ser novamente conferidos na execução que vier a ser autorizada.

Listas exatas, sem comandos de exclusão:

- [Plano final por arquivo — CSV](.local-cleanup/final-deletion-plan.csv).
- [Plano final — JSON](.local-cleanup/final-deletion-plan.json), com raiz absoluta, HEAD, tamanhos, datas de modificação, grupos, indicação de backup e hashes dos arquivos protegidos.
- [Recibo local do backup externo](.local-cleanup/external-backup-receipt.json).

Os quinze documentos históricos são `AUDITORIA-P4-FINI.md`, `AUDITORIA-VISUAL-FINI.md`, `BUSCA-REFERENCIA-H02-FINI.md`, `PLANO-P3-FINI.md`, relatórios P1/P2, P3-D-H01/P3-H01-V02/P3-H02/P3-PILOTO, P4-A/B/C/D e P5-A. Os oito ZIPs são P1, P2, P3-H01, P3-H01-V02, P3-D-H01, P3-H02, P4-B e P4-D, identificados pelos nomes completos no CSV/JSON.

## 4. Exclusões proibidas e controles da futura execução

**Fora da lista de exclusão:** `design/p3-candies/referencias/`, `design/p3-candies/masters/`, registros de origem e prompts preservados, todos os arquivos em `assets/`, código-fonte, ferramentas, README, `.gitignore`, `.vercelignore`, `vercel.json`, `.gitattributes`, resumo consolidado, pendências, P5-B e relatórios/planos permanentes de limpeza.

Também ficam fora `.git/`, `.env*`, `.vercel/`, `.local-cleanup/` e a pasta externa de backup. A eventual remoção de `dist/` se refere somente à cópia gerada; nenhum asset original usado pelo site está proposto para remoção.

Antes de executar qualquer exclusão física numa etapa autorizada:

1. Confirmar autorização para a lista específica, incluindo o descarte dos perfis não arquivados.
2. Revalidar existência e hash do backup, integridade dos protegidos e diferenças em relação ao inventário; arquivos novos ou alterados exigem nova conferência.
3. Resolver e conferir os caminhos absolutos dentro da raiz correta; rejeitar links/junções e qualquer alvo protegido ou externo ao repositório.
4. Identificar/encerrar apenas processos de automação que utilizem os perfis candidatos, antes de remover esses diretórios. Não encerrar navegadores pessoais indiscriminadamente.
5. Aplicar somente a lista autorizada, sem limpeza genérica por extensão ou comandos que alterem o histórico Git.
6. Regenerar `dist/`, validar a saída e conferir o Git após a exclusão.

Esses passos são condições da execução futura, não ações realizadas agora.

## 5. Build e estado de encerramento

`node tools/build_dist.mjs` passou: **21 arquivos, 1.367.571 bytes**. `node --check js/script.js` e `python tools/validate_files.py` também passaram; caminhos, imagens dinâmicas, IDs, alt e CSS foram validados e os 21 WebPs históricos da pasta principal decodificaram. Não foram instaladas dependências. O runtime não mudou e não foi repetida uma rodada completa de navegador nesta etapa documental/de backup.

O Git começou limpo; este plano é o novo documento permanente criado para revisão. Os inventários, script de backup e recibo em `.local-cleanup/` continuam ignorados. Nenhuma retirada adicional do índice foi necessária.

**Backup preparado e verificado. Plano entregue para autorização; nenhuma exclusão física, commit, push ou deploy foi executado.**
