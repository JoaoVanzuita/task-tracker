# Como executar:
```
  npm start
```

## Comandos disponíveis:

### Criar uma tarefa

- task-description: descrição da tarefa, deve ser uma string entre aspas ( " )

```
  task-cli add <task-description>
```

### Listar tarefas

- query: argumento para a busca de strings, pode ser vazio, done, in-progress ou todo. Não deve estar entre aspas

```
  task-cli list <query>
```

### Atualizar descrição de uma tarefa

- task-id: id da tarefa, deve ser um número maior que 0
- task-description: nova descrição da tarefa, deve ser uma string entre aspas
```
  task-cli update <task-id> <task-description>
```
### Marcar tarefa como em progresso

- task-id: id da tarefa, deve ser um número maior que 0

```
  task-cli mark-in-progress <task-id>
```

### Marcar tarefa como concluída

- task-id: id da tarefa, deve ser um número maior que 0

```
  task-cli mark-done <task-id>
```

### Excluir tarefa

- task-id: id da tarefa, deve ser um número maior que 0

```
  task-cli delete <task-id>
```