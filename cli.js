/* arquivo para manipular dom e usar promisse */

const { soma, lerArquivos } = require('./index.js');
const chalk = require ('chalk');

const resultado = soma(1,3);

console.log(chalk.bgRed("Á Soma é:"), chalk.blue(resultado));

lerArquivos('./test/files/oneFile.md'); /* retorna os link */
