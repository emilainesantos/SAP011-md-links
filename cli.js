/* arquivo para manipular dom e usar promisse */

const { soma, lerArquivos } = require('./index.js');
const chalk = require ('chalk');

const resultado = soma(1,3);

console.log(chalk.bgRed("Á Soma é:"), chalk.blue(resultado));


const caminhoDoArquivo = process.argv[2];

lerArquivos(caminhoDoArquivo) /* retorna os link */
.then((conteudoArquivo) => {
  console.log(chalk.bgGrey(conteudoArquivo))
});

const inputs = process.argv
console.log(inputs);
