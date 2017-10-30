import { isEmpty, keys } from 'lodash';
import Readline from 'readline';
import minimist from 'minimist';
import RaeClient from 'index';

const dictionary = {};

function readLine(prompt, cb) {
  const rl = Readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt(`${prompt}>> `);
  rl.prompt();
  rl.on('line', (line) => {
    cb(line.trim());
    rl.close();
  });
}

function printResult(result) {
  console.log();
  if (!result.multipleMatches) {
    result.items.forEach(({ match }) => console.log(match));
    return process.exit(0);
  }
  console.log('Hemos encontrados varios resultados para esta entrada\n');
  result.items.forEach(({ id }, i) => {
    dictionary[String(i + 1)] = id;
  });
  result.items.forEach(({ match }, i) =>
    console.log(`\t${i + 1}. ${String(match).replace(/\./g, '')}`));
  console.log('\nIntroduzca el número del termino que desee consultar y pulse Enter');
  console.log('Escriba cualquier otro caracter para salir o pulse Ctrl+C\n');
  const processLine = (wordIndex) => {
    if (dictionary[wordIndex]) return fetch(dictionary[wordIndex]);
    return process.exit(0);
  };
  return readLine('', processLine);
}

export function fetch(id) {
  return RaeClient.create()
    .fetch(id)
    .then(printResult)
    .catch(printHelp);
}

export function getOptions() {
  return minimist(process.argv.slice(2));
}

export function areOptionsValid(options) {
  const word = options.w || options.word || options._[0];
  if (isEmpty(word)) {
    return false;
  }
  return true;
}

export function printHelp(logger = console, exit = true) {
  logger.log(
    '\n',
    'Descripcion:\tDiccionario RAE',
    '\n\n Uso:',
    '\n\trae <palabra>',
    '\n\trae -p <palabra>',
    '\n\trae --palabra <palabra>',
    '\n\n Opciones:',
    '\n\t-p, --palabra\n\t\tEl término/palabra a buscar en el diccionario',
    '\n\n',
  );
  if (exit) {
    process.exit(0);
  }
}

export function shouldDisplayHelp(options) {
  return (
    (isEmpty(options._) && keys(options).length === 1) ||
    (typeof options._[0] === 'string' && options._[0].toLowerCase() === 'help')
  );
}

export function search(options) {
  const word = options.w || options.word || options._[0];
  RaeClient.create()
    .search(word)
    .then(printResult)
    .catch(printHelp);
}
