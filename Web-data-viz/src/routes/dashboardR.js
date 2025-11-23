var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// Rota para cadastrar perfil
router.post("/cadastrar", function (req, res) {
    dashboardController.cadastrarPerfil(req, res);
});

// Rota para buscar último perfil do usuário
router.get("/ultimo/:idUsuario", function (req, res) {
    dashboardController.buscarUltimoPerfil(req, res);
});

// Rota para buscar respostas de um perfil específico
router.get("/respostas/:idPerfil", function (req, res) {
    dashboardController.buscarRespostasPerfil(req, res);
});

module.exports = router;
// para renomear commit