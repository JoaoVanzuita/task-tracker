const readline = require('node:readline');

const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })

function getTaskDescription(args) {

  const hasTwoQuotes = args.match(/"/g).length == 2

  if (!hasTwoQuotes) {
    console.log('Argumento inválido')
    return
  }

  return args.substring(args.indexOf('"') + 1, args.length - 1)
}

function getTaskId(args) {

  const taskId = args.split(' ')[0]

  if(!typeof taskId == 'number'){
    console.log('Argumento inválido')
    return
  }

  return taskId
}

function add(args) {

  console.log('executando "add"')

  const taskDescription = getTaskDescription(args)

  console.log(taskDescription)
}

function list() {
  console.log('Executando "list"')

}

function update(args) {

  console.log('Executando "update"')

  const taskId = getTaskId(args)

  const taskDescription = getTaskDescription(args)

  console.log(taskId)
  console.log(taskDescription)
}

const commandMap = {
  add,
  list,
  update
}

rl.on('line', input => {

  if (!input.startsWith('task-cli')) {
    return
  }

  const command = input.split(' ')[1]

  const func = commandMap[command]

  const indexArgsStart = input.indexOf(' ', input.indexOf(' ') + 1)
  let args = null

  if(indexArgsStart > 0){
    args = input.substring(indexArgsStart).trim()
  }

  if (func) {
    func(args)
    return
  }

  console.log('Comando não encontrado')
})