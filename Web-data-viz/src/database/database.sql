CREATE DATABASE apoena;
USE apoena;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (30),
    email VARCHAR (255),
    senha VARCHAR(20)
);
-- TABELA DE PERGUNTAS
CREATE TABLE pergunta (
    idPergunta INT NOT NULL PRIMARY KEY,
    enunciado VARCHAR(255) NOT NULL
);


-- TABELA DE RESPOSTAS (pontuacao da pergunta)
CREATE TABLE respostaQuiz (
    idResposta INT NOT NULL PRIMARY KEY,
    idPergunta INT NOT NULL,
    textoResposta VARCHAR(255) NOT NULL,
    pontuacaoAventura INT NOT NULL,
    pontuacaoRelaxamento INT NOT NULL,
    pontuacaoEcologia INT NOT NULL,
    FOREIGN KEY (idPergunta) REFERENCES pergunta(idPergunta)
);


-- TABELA DE SESSÃO DO QUIZ (pegada ecologica (KPI's))
CREATE TABLE quiz (
    idSessao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    dtHora TIMESTAMP NOT NULL,
    
    -- pontuações totais agregados
    totalAventura INT NOT NULL,
    totalRelaxamento INT NOT NULL,
    totalEcologia INT NOT NULL,
    perfilFinal VARCHAR(50) NOT NULL
);


-- TABELA DE DETALHES DAS RESPOSTAS DO USUÁRIO
CREATE TABLE respostaUsuario (
    idSessao INT NOT NULL,
    idPergunta INT NOT NULL,
    idResposta INT NOT NULL,
    
    PRIMARY KEY (idSessao, idPergunta), 
    
    FOREIGN KEY (idSessao) 
		REFERENCES quiz(idSessao),
    FOREIGN KEY (idPergunta) 
		REFERENCES pergunta(idPergunta),
    FOREIGN KEY (idResposta) 
		REFERENCES respostaQuiz(idResposta)
);

select * from usuario;
truncate usuario;