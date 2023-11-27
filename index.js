const fs = require("fs"); /*biblioteca nativa do Node n precisa de instalação */

function soma(a, b) {
  return a + b;
}

function lerArquivos(caminhoDoArquivo){
  return new Promise(function(resolve, reject){
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => { /*re
    ad file ler o arquivo*/
    if(err) reject(err); /*se der erro, chama o  reject */


    resolve(data); /* se der certo, retorna o resolve com arq DATA*/
  });
  });

}
module.exports = { soma, lerArquivos };
