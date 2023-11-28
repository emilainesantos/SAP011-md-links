// Importa o módulo 'fs' (file system) para trabalhar com sistema de arquivos
const fs = require("fs");

// Função mdLinks que lê um arquivo e extrai os links encontrados no formato [texto](link)
function mdLinks(caminhoDoArquivo) {
  // Retorna uma Promise para lidar com operações assíncronas
  return new Promise(function (resolve, reject) {
    // Lê o conteúdo do arquivo no caminho especificado como utf-8
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      // Se houver um erro ao ler o arquivo, imprime o erro no console e rejeita a Promise
      if (err) {
        console.error(err);
        reject(new Error('Erro ao ler o arquivo'));
        return;
      }

      // Expressão regular para encontrar todos os links no formato [texto](link)
      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/g;
      // Obtém todos os matches (correspondências) usando a expressão regular
      const matches = [...data.matchAll(regex)];

      // Extrai os links e os títulos dos matches
      const links = matches.map(match => match[2]);
      const titulos = matches.map(match => match[1]);

      // Se existirem links, cria um array de objetos com informações sobre cada link
      if (links.length > 0) {
        const linksInfo = links.map((link, index) => ({
          text: titulos[index],
          href: link,
          file: caminhoDoArquivo,
          broken: false
        }));
        // Resolve a Promise com as informações dos links
        resolve(linksInfo);
      } else {
        // Se não houver links, resolve a Promise com um array vazio
        resolve([]);
      }
    });
  });
}

// Função validarLinks que recebe um array de objetos de links e verifica o status de cada link
function validarLinks(links) {
  // Função interna requisicao que faz uma requisição HTTP para verificar o status do link
  function requisicao(link) {
    // Usa a função fetch para fazer uma requisição ao link
    return fetch(link.href)
      // Processa a resposta da requisição
      .then((response) => {
        // Retorna um objeto com informações sobre o link, incluindo o status da resposta
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          ok: response.ok ? 'ok' : 'fail',
          broken: !response.ok,
        };
      })
      // Se ocorrer um erro na requisição, imprime o erro no console e lança uma exceção
      .catch((error) => {
        console.error(error);
        throw error; // ou trate o erro de outra forma, se necessário
      });
  }

  // Mapeia a função requisicao para cada link, criando um array de Promises
  const promessas = links.map(requisicao);

  // Retorna uma Promise que é resolvida quando todas as Promises no array promessas são resolvidas
  return Promise.all(promessas);
}

// Exporta as funções mdLinks e validarLinks para serem utilizadas em outros módulos
module.exports = { mdLinks, validarLinks };
