var perfilModel = require("../models/dashboardModel");

function cadastrarPerfil(req, res) {
    var idUsuario = req.body.idUsuario;
    var tipoPerfil = req.body.tipoPerfil;
    var pontuacaoAmbiental = req.body.pontuacaoAmbiental;
    var pontuacaoAventura = req.body.pontuacaoAventura;
    var pontuacaoCultural = req.body.pontuacaoCultural;
    var pontuacaoConforto = req.body.pontuacaoConforto;
    var percentualAmbiental = req.body.percentualAmbiental;
    var percentualAventura = req.body.percentualAventura;
    var percentualCultural = req.body.percentualCultural;
    var percentualConforto = req.body.percentualConforto;
    var respostasDetalhadas = req.body.respostasDetalhadas;

    // algumas validações
    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }
    if (tipoPerfil == undefined) {
        res.status(400).send("Tipo de perfil está undefined!");
        return;
    }
    if (pontuacaoAmbiental == undefined || pontuacaoAventura == undefined || 
        pontuacaoCultural == undefined || pontuacaoConforto == undefined) {
        res.status(400).send("Pontuações estão incompletas!");
        return;
    }
    if (percentualAmbiental == undefined || percentualAventura == undefined || 
        percentualCultural == undefined || percentualConforto == undefined) {
        res.status(400).send("Percentuais estão incompletos!");
        return;
    }

    // cadastra o perfil
    perfilModel.cadastrarPerfil(
        idUsuario,
        tipoPerfil,
        pontuacaoAmbiental,
        pontuacaoAventura,
        pontuacaoCultural,
        pontuacaoConforto,
        percentualAmbiental,
        percentualAventura,
        percentualCultural,
        percentualConforto
    )
    .then(function (resultado) {
        console.log("Perfil cadastrado com sucesso!");
        
        var idPerfil = resultado.insertId;
        
        // Se tiver respostas detalhadas, salva também
        if (respostasDetalhadas && respostasDetalhadas.length > 0) {
            return perfilModel.cadastrarRespostas(idPerfil, respostasDetalhadas)
                .then(function() {
                    res.json({
                        mensagem: "Perfil e respostas cadastrados com sucesso!",
                        idPerfil: idPerfil
                    });
                });
        } else {
            res.json({
                mensagem: "Perfil cadastrado com sucesso!",
                idPerfil: idPerfil
            });
        }
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao cadastrar o perfil! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimoPerfil(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
        return;
    }

    perfilModel.buscarUltimoPerfil(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).json({ mensagem: "Nenhum perfil encontrado para este usuário" });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o perfil! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRespostasPerfil(req, res) {
    var idPerfil = req.params.idPerfil;

    if (idPerfil == undefined) {
        res.status(400).send("ID do perfil está undefined!");
        return;
    }

    perfilModel.buscarRespostasPerfil(idPerfil)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar as respostas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrarPerfil,
    buscarUltimoPerfil,
    buscarRespostasPerfil
};