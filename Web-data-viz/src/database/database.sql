CREATE DATABASE apoena;
USE apoena;	

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (30),
    email VARCHAR (255),
    senha VARCHAR(20)
);

CREATE TABLE perfil (
    idPerfil INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    tipoPerfil VARCHAR(20) NOT NULL,
    -- pontuações brutas
    pontuacaoAmbiental INT NOT NULL,
    pontuacaoAventura INT NOT NULL,
    pontuacaoCultural INT NOT NULL,
    pontuacaoConforto INT NOT NULL,
    -- percentuais
    percentualAmbiental INT NOT NULL,
    percentualAventura INT NOT NULL,
    percentualCultural INT NOT NULL,
    percentualConforto INT NOT NULL,
    dataCalculo DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
) AUTO_INCREMENT = 1;

CREATE TABLE respostaQuiz (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    fkPerfil INT NOT NULL,
    numeroQuestao INT NOT NULL,
    pergunta TEXT NOT NULL,
    respostaUsuario VARCHAR(20) NOT NULL,
    respostaCorreta VARCHAR(20) NOT NULL,
    acertou BOOLEAN NOT NULL,
    
    FOREIGN KEY (fkPerfil) REFERENCES perfil(idPerfil)
) AUTO_INCREMENT = 1;
