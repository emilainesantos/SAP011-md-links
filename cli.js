#!/usr/bin/env node

// Importa o módulo 'fs' (File System) para trabalhar com sistema de arquivos
const fs = require('fs');
// Importa as funções mdLinks e validarLinks do arquivo 'index.js'
const { mdLinks, validarLinks } = require('./index.js');
// Obtém o caminho do arquivo a ser processado a partir do primeiro argumento da linha de comando
const caminhoDoArquivo = process.argv[2];
// Verifica se a opção --validate está presente nos argumentos da linha de comando
const validacao = process.argv.includes('--validate');
// Importa a biblioteca 'chalk' para colorir a saída no console
const chalk = require('chalk');

// Verifica se a opção --validate está presente nos argumentos da linha de comando
if (validacao) {
    // Chama a função mdLinks para obter informações sobre os links no arquivo
    mdLinks(caminhoDoArquivo)
        // Chama a função validarLinks para verificar o status de cada link
        .then(links => validarLinks(links))
        // Manipula os resultados obtidos após a validação dos links
        .then(resultados => {
            // Se não houver links, exibe uma mensagem indicando que nenhum link foi encontrado
            if (resultados.length === 0) {
                console.log(chalk.bgRed.black('Link não encontrado'));
                return;
            }
            // Itera sobre os resultados e exibe informações formatadas para cada link
            resultados.forEach(resultado => {
                const urlColor = resultado.ok === 'ok' ? chalk.green : chalk.red;

                console.log('🔍 '+chalk.white(`Title: ${resultado.text}`));
                console.log(urlColor(`URL: ${resultado.href}`));
                console.log(chalk.gray(`File: ${resultado.file}`));
                // Exibe o status do link, destacando-o em verde se estiver OK e em vermelho se falhou
                if (resultado.ok === 'ok') {
                    console.log(chalk.blue(`Status: ${chalk.green('ok')} ${resultado.status}`));
                } else {
                    console.log(chalk.blue(`Status: ${chalk.red('fail')} ${resultado.status}`));
                }
                console.log();
            });
        })
        // Captura e trata erros que possam ocorrer durante o processo
        .catch(error => {
            console.error(error);
        });
} else {
    // Se a opção --validate não estiver presente, apenas exibe informações sobre os links
    mdLinks(caminhoDoArquivo)
        .then(links => {
            // Se não houver links, exibe uma mensagem indicando que nenhum link foi encontrado
            if (links.length === 0) {
                console.log(chalk.bgRed.black('Link não encontrado'));
                return;
            }
            // Itera sobre os links e exibe informações formatadas para cada um
            links.forEach(link => {
                console.log('🔍 '+chalk.white(`Title: ${link.text}`));
                console.log(chalk.blue(`URL: ${link.href}`));
                console.log(chalk.gray(`File: ${link.file}`));
                console.log();
            });
        })
        // Captura e trata erros que possam ocorrer durante o processo
        .catch(error => {
            console.error(error);
        });
}
