const fs = require("fs"); /*biblioteca nativa do Node n precisa de instalação */

function soma(a, b) {
  return a + b;
}

function lerArquivos(caminhoDoArquivo){
  fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
    if(err) throw err; /*se tiver erro, vai lançar error */
    console.log(data); /* se ñ, data*/
  })

}
module.exports = { soma, lerArquivos };
