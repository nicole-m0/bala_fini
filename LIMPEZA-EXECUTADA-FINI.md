# Relatório final — limpeza física controlada Fini

Data: 26/10/2026. Execução autorizada exclusivamente pela lista de `.local-cleanup/final-deletion-plan.json`. **Limpeza dos itens validados concluída; seis caches divergentes preservados. Sem commit, push ou deploy. Aguarda revisão do usuário.**

## 1. Verificações antes da exclusão

O HEAD permaneceu em `222ac137698e2d54762902a36e7dfeaa34bc386b`, igual ao plano. Havia 56 arquivos rastreados; `PLANO-FINAL-LIMPEZA-FINI.md` já estava presente como novo documento não rastreado. Nenhum dos 5.119 caminhos retirados do índice voltou a ser rastreado.

Foram conferidos os hashes dos arquivos protegidos do plano e, adicionalmente, registrados os hashes dos 56 arquivos rastreados e do plano permanente: **57 arquivos protegidos conferidos antes e depois da execução, sem diferenças**.

Backup externo confirmado em:

```text
C:\Users\Nicole\Documents\Backups-Fini\bala-fini-limpeza-20261026-01\fini-documentos-e-evidencias.zip
```

- Tamanho: **671.434.215 bytes**.
- SHA-256: `6b40da38586b2e9a929e49b11b2999db6dbca5f51585118dfddef9c92aed5f9a`.
- Manifesto externo: `manifest-sha256.json`; **3.093 entradas reabertas e verificadas individualmente por SHA-256 e tamanho**.
- `backup-verification.json` e a cópia externa de `final-deletion-plan.json` conferem com os registros locais.
- Os arquivos históricos/evidências candidatos não pertencentes a perfis foram também comparados ao manifesto antes de autorizar sua remoção. O backup não foi alterado ou removido.

## 2. Perfis e processos

Os 11 diretórios de perfil candidatos estavam sob as pastas locais de auditoria P0–P5-A e `tools/browser-profile/`, separados dos diretórios pessoais de navegador. A documentação histórica registra Chrome headless/perfis isolados para os testes; foram verificadas as linhas de comando dos processos presentes. Links simbólicos, junções e saídas da raiz foram rejeitados na validação dos caminhos.

A única instância ativa identificada usando um desses perfis era o Chrome headless P5-A, com `--remote-debugging-port=9235` e `--user-data-dir` apontando exatamente para `auditoria/p5-a-20261026/chrome-profile`. **Oito processos Chrome vinculados explicitamente a esse perfil foram encerrados.** Não houve encerramento global por nome do executável; os navegadores pessoais e os demais perfis não foram alvo da operação. O servidor HTTP local foi mantido para validar a distribuição.

A consulta aos processos exigiu permissão do ambiente Windows. A primeira tentativa de executar o script de exclusão foi bloqueada pela política de scripts, sem apagar arquivos; a execução autorizada posterior usou liberação limitada ao processo, sem alterar a política permanente.

## 3. Divergências e itens preservados

Dos 10.837 arquivos inventariados, **10.830 passaram na comparação de caminho, grupo, tamanho, data de modificação e, para os arquivados, SHA-256**. Não foram encontrados arquivos novos dentro dos grupos candidatos na conferência anterior à exclusão.

Seis caches tinham data de modificação diferente do inventário e **não foram excluídos**. Todos estão sob `auditoria/p5-a-20261026/chrome-profile/`:

```text
Default/Cache/Cache_Data/data_1
Default/DawnGraphiteCache/data_1
Default/DawnWebGPUCache/data_1
Default/GPUCache/data_1
GrShaderCache/data_1
ShaderCache/data_1
```

Cada um tinha 270.336 bytes na conferência, totalizando **1.622.016 bytes preservados**. Esses arquivos continuam fora do backup de evidências, conforme a exclusão documental dos perfis. Seu descarte dependerá de nova revisão/autorização dos itens divergentes.

O `lockfile` desse perfil, de zero bytes no inventário, desapareceu ao encerrar a automação. Não foi removido pelo script de limpeza e não foi contado como exclusão executada.

## 4. Arquivos efetivamente removidos

| Grupo | Arquivos removidos | Bytes lógicos |
|---|---:|---:|
| `auditoria/`, exceto divergências | 10.039 | 1.985.542.244 |
| Oito ZIPs históricos listados | 8 | 233.622.870 |
| `tools/browser-profile/` | 732 | 135.009.019 |
| `tools/screenshots/` | 7 | 6.232.573 |
| `design/p3-candies/provas/` | 8 | 4.647.407 |
| Cópia gerada em `dist/` | 21 | 1.367.571 |
| Quinze documentos históricos listados | 15 | 256.316 |
| **Total** | **10.830** | **2.366.678.000** |

Aproximadamente **2,20 GiB de conteúdo lógico removido**, antes de regenerar a saída e as evidências dos testes. Não é uma medição exata de espaço físico recuperado no volume. Os 21 arquivos da distribuição foram recriados depois, portanto não constituem redução permanente de ocupação.

**Falhas de exclusão: zero.** Nenhum item adicional mudou entre a segunda validação e sua remoção. A exclusão utilizou PowerShell, `Remove-Item -LiteralPath`, um arquivo validado por vez, sem curingas ou remoção recursiva. Pastas vazias foram mantidas; não houve limpeza genérica de diretórios.

Foram preservados integralmente código-fonte, todo o acervo em `assets/`, ferramentas, mestres, referências, registros de origem, prompts, README, documentos permanentes, configurações Git/Vercel, `.git/`, `.env*`, `.vercel/`, `.local-cleanup/` e a pasta externa do backup. Pendências de autorização e status de publicação permanecem inalterados.

## 5. Build e validações após a limpeza

| Verificação | Resultado |
|---|---|
| `node tools/build_dist.mjs` | Passou: 21 arquivos, 1.367.571 bytes, cópias verificadas por SHA-256 |
| `node --check js/script.js` | Passou |
| `node --check tools/build_dist.mjs` | Passou |
| `python tools/validate_files.py` | Passou: caminhos locais/dinâmicos, IDs, alt e chaves CSS; 21 WebPs históricos da pasta principal decodificados |
| `python tools/check_dist.py` | Passou em `http://127.0.0.1:8015/`: 21 recursos com bytes iguais aos originais, lista exata da distribuição e 21 tentativas de acesso interno com 404 |
| HEAD e 57 hashes protegidos | Iguais ao estado anterior à execução |
| `git diff --check` | Passou |

O build e o verificador HTTP recriaram somente suas saídas normais: `dist/`, `auditoria/p5-a-20261026/distribution-inventory.json` e `auditoria/p5-a-20261026/isolation-tests.json`. Esses arquivos continuam ignorados pelo Git. O teste HTTP funcionou sem os backups históricos, usando o caminho negativo de backup previsto para um checkout limpo.

Não houve alteração no comportamento do site e não foi repetida a suíte visual/funcional completa de navegador. Foram executadas as validações de sintaxe, arquivos e recursos HTTP solicitadas para esta limpeza.

## 6. Evidências e Git final

Registros locais preservados em `.local-cleanup/`:

- `execution-preflight.json`: candidatos validados, divergências, HEAD e hashes protegidos.
- `execution-result.json`: lista exata dos 10.830 removidos, bytes, grupos e ausência de falhas.
- `stopped-automation-processes.json`: processos de automação identificados e encerrados.
- `post-cleanup-verification.json`: conferência final dos arquivos protegidos e das saídas recriadas.
- Plano autorizado e recibo do backup externo, mantidos sem alteração.

O índice e os 56 arquivos rastreados permaneceram inalterados. O estado final contém apenas dois documentos novos não rastreados: `PLANO-FINAL-LIMPEZA-FINI.md`, já presente no início, e este `LIMPEZA-EXECUTADA-FINI.md`. Não há exclusões ou alterações em arquivos protegidos. Nenhum arquivo foi adicionado ao índice automaticamente.

**Execução encerrada para revisão. Seis caches divergentes foram preservados e não serão apagados por inferência. Nenhum commit, push ou deploy foi realizado.**
