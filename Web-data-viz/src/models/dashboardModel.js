var database = require("../database/config");

function cadastrarPerfil(
    fkUsuario,
    tipoPerfil,
    pontuacaoAmbiental,
    pontuacaoAventura,
    pontuacaoCultural,
    pontuacaoConforto,
    percentualAmbiental,
    percentualAventura,
    percentualCultural,
    percentualConforto
) {
    console.log("ACESSEI O PERFIL MODEL \n \n\t\t >> function cadastrarPerfil()");
    
    var instrucaoSql = `
        INSERT INTO perfil (
            fkUsuario,
            tipoPerfil,
            pontuacaoAmbiental,
            pontuacaoAventura,
            pontuacaoCultural,
            pontuacaoConforto,
            percentualAmbiental,
            percentualAventura,
            percentualCultural,
            percentualConforto
        ) VALUES (
            ${fkUsuario},
            '${tipoPerfil}',
            ${pontuacaoAmbiental},
            ${pontuacaoAventura},
            ${pontuacaoCultural},
            ${pontuacaoConforto},
            ${percentualAmbiental},
            ${percentualAventura},
            ${percentualCultural},
            ${percentualConforto}
        );
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarRespostas(fkPerfil, respostas) {
    console.log("ACESSEI O PERFIL MODEL \n \n\t\t >> function cadastrarRespostas()");
    
    var valores = [];
    
    for (var i = 0; i < respostas.length; i++) {
        var resposta = respostas[i];
        valores.push(`(
            ${fkPerfil},
            ${resposta.numeroQuestao},
            '${resposta.pergunta.replace(/'/g, "''")}',
            '${resposta.respostaUsuario}',
            '${resposta.respostaCorreta}',
            ${resposta.acertou ? 1 : 0}
        )`);
    }
    
    var instrucaoSql = `
        INSERT INTO respostaQuiz (
            fkPerfil,
            numeroQuestao,
            pergunta,
            respostaUsuario,
            respostaCorreta,
            acertou
        ) VALUES ${valores.join(', ')};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoPerfil(fkUsuario) {
    console.log("ACESSEI O PERFIL MODEL \n \n\t\t >> function buscarUltimoPerfil()");
    
    var instrucaoSql = `
        SELECT 
            idPerfil,
            fkUsuario,
            tipoPerfil,
            pontuacaoAmbiental,
            pontuacaoAventura,
            pontuacaoCultural,
            pontuacaoConforto,
            percentualAmbiental,
            percentualAventura,
            percentualCultural,
            percentualConforto,
            DATE_FORMAT(dataCalculo, '%d/%m/%Y %H:%i:%s') as dataCalculo
        FROM perfil 
        WHERE fkUsuario = ${fkUsuario}
        ORDER BY dataCalculo DESC 
        LIMIT 1;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRespostasPerfil(fkPerfil) {
    console.log("ACESSEI O PERFIL MODEL \n \n\t\t >> function buscarRespostasPerfil()");
    
    var instrucaoSql = `
        SELECT 
            numeroQuestao,
            pergunta,
            respostaUsuario,
            respostaCorreta,
            acertou
        FROM respostaQuiz
        WHERE fkPerfil = ${fkPerfil}
        ORDER BY numeroQuestao ASC;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarPerfil,
    cadastrarRespostas,
    buscarUltimoPerfil,
    buscarRespostasPerfil
};