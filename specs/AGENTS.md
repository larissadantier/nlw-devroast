# Specs — Formato de Especificação

## Estrutura

```
# Nome da feature — Specification

## Resumo
Breve descrição do que será implementado e por quê.

---

## Pesquisa realizada
Opcional. Opções avaliadas com tabela de prós/contras e veredicto final.

---

## Decisões de design
Explique as escolhas técnicas e o porquê de cada uma.

---

## Especificação de implementação

### Componentes a criar/modificar
Liste arquivos novos e existentes com mudanças planejadas.

### API / Tipos
Defina interfaces, props, e comportamentos esperados.

### Estrutura de arquivos
```
src/
  ...
```

---

## Dependências novas
| Pacote | Motivo |
|---|---|
| ... | ... |

---

## Riscos e considerações
Liste possíveis problemas e mitigações.

---

## TODOs de implementação
- [ ] Tarefa 1
- [x] Tarefa concluída
```

## Regras

- Toda spec começa com um `#` (heading 1) seguido do nome da feature
- Use `---` para separar seções principais
- Inclua código quando necessário (schema, interfaces, exemplos)
- Use tabelas para comparações e estrutura de dados
- Marque TODOs com `[ ]` para pendente e `[x]` para concluído
- Mantenha o arquivo autocontido — quem ler deve conseguir implementar sem consultar outras fontes
