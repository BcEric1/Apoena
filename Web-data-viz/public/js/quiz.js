let listaDeQuestoes = [
    {
        pergunta: "Para onde você viajaria agora, se pudesse?",
        alternativaA: "Montanha íngreme e remota com trilhas desafiadoras",
        alternativaB: "Hotel resort na praia com piscina e serviço all-inclusive",
        alternativaC: "Cidade histórica com museus e culinária local autêntica",
        alternativaD: "Reserva natural com foco em observação da vida selvagem",
        alternativaCorreta: "alternativaA"
    },
    {
        pergunta: "Qual é a sua prioridade ao fazer as malas?",
        alternativaA: "Equipamentos técnicos e botas de trilha",
        alternativaB: "Roupas da moda e acessórios para fotos",
        alternativaC: "Um bom livro e itens de conforto pessoal",
        alternativaD: "Garrafa reutilizável e saco de lixo pessoal",
        alternativaCorreta: "alternativaD"
    },
    {
        pergunta: "Em uma trilha, você encontra um recipiente plástico abandonado. Sua reação é:",
        alternativaA: "Ignorar, não é seu problema",
        alternativaB: "Recolher e levar até a próxima lixeira (ou com você)",
        alternativaC: "Tirar uma foto e postar sobre a falta de civilidade",
        alternativaD: "Apenas notar e continuar, mas evitando o contato",
        alternativaCorreta: "alternativaB"
    },
    {
        pergunta: "Para se deslocar em longas distâncias, qual meio de transporte você prefere?",
        alternativaA: "Avião (mais rápido, mesmo que menos ecológico)",
        alternativaB: "Carro próprio ou alugado (liberdade e flexibilidade)",
        alternativaC: "Trem ou ônibus (compartilhado e mais eficiente)",
        alternativaD: "Barco ou bicicleta (depende da rota, mas é a jornada)",
        alternativaCorreta: "alternativaC"
    },
    {
        pergunta: "Qual a sua atitude em relação ao consumo de carne?",
        alternativaA: "Não como carne. Minha alimentação é totalmente baseada em vegetais.",
        alternativaB: "Compro carne apenas de fornecedores locais e com foco em bem-estar animal.",
        alternativaC: "Reduzi bastante o consumo, mas ainda como algumas vezes na semana.",
        alternativaD: "Não me preocupo com isso e como quando tenho vontade.",
        alternativaCorreta: "alternativaA"
    },
    {
        pergunta: "Ao comprar um produto novo (roupa, eletrônico, etc.), qual o fator mais importante?",
        alternativaA: "O preço mais baixo, buscando a melhor promoção.",
        alternativaB: "A reputação da marca e o design moderno.",
        alternativaC: "A durabilidade e a garantia de longo prazo do item.",
        alternativaD: "A informação sobre a origem dos materiais e a ética de produção (fair trade).",
        alternativaCorreta: "alternativaD"
    },
    {
        pergunta: "Em casa, como você lida com o lixo e a separação de resíduos?",
        alternativaA: "Separo todo o lixo reciclável e orgânico em recipientes próprios.",
        alternativaB: "Separo apenas o que é muito fácil (plástico, papel), o resto vai junto.",
        alternativaC: "Não tenho tempo para separar o lixo, coloco tudo no mesmo saco.",
        alternativaD: "Eu compostagem meu lixo orgânico e reciclo todo o restante.",
        alternativaCorreta: "alternativaD"
    },
    {
        pergunta: "Durante uma caminhada na natureza ou na praia, você vê uma espécie de animal silvestre (não doméstica). Qual a sua reação?",
        alternativaA: "Tento me aproximar para tirar uma foto ou tocar.",
        alternativaB: "Observo de longe e respeito o espaço do animal.",
        alternativaC: "Se for perigoso, dou a volta e ignoro. Se for fofo, tento interagir.",
        alternativaD: "Observo de longe e tento pesquisar no meu celular sobre a espécie e seu habitat.",
        alternativaCorreta: "alternativaB"
    },
    {
        pergunta: "Qual tipo de hospedagem você prefere em uma viagem?",
        alternativaA: "Grandes redes hoteleiras que oferecem muitos serviços e luxo.",
        alternativaB: "Hotéis-boutique ou pousadas que valorizam a arquitetura local.",
        alternativaC: "Airbnb ou casa de amigos, para ter mais liberdade e economizar.",
        alternativaD: "Hospedagens que possuem certificação de sustentabilidade ou utilizam energia renovável.",
        alternativaCorreta: "alternativaD"
    },
    {
        pergunta: "Seu smartphone quebrou. O que você faz?",
        alternativaA: "Compro o modelo mais recente imediatamente, sem pensar duas vezes.",
        alternativaB: "Pesquiso opções de conserto, tentando prolongar a vida útil do aparelho.",
        alternativaC: "Compro um modelo mais antigo ou recondicionado para economizar.",
        alternativaD: "Conserto, e se não for possível, busco uma loja que recicle o aparelho antigo.",
        alternativaCorreta: "alternativaD"
    }
];

// mapeamento para obter o id da label a partir do valor do radio button
const mapLabelId = {
    alternativaA: "labelRespostaA",
    alternativaB: "labelRespostaB",
    alternativaC: "labelRespostaC",
    alternativaD: "labelRespostaD"
};

let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let tentativaIncorreta = 0;
let certas = 0;
let erradas = 0;
let quantidadeDeQuestoes = listaDeQuestoes.length;

let respostasDetalhadas = [];

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none";
    document.getElementById('jogo').style.display = "none";
    document.getElementById('btnConcluir').style.display = "none";
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex";
    document.getElementById('jogo').style.display = "flex";
    document.getElementById('btnIniciarQuiz').style.display = "none";

    document.getElementById('spanCertas').innerHTML = certas;
    document.getElementById('spanErradas').innerHTML = erradas;

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes;

    // limpa respostas anteriores
    respostasDetalhadas = [];

    preencherHTMLcomQuestaoAtual(0);

    btnSubmeter.disabled = false;
    btnProximo.disabled = true;
    btnTentarNovamente.disabled = true;

    if (quantidadeDeQuestoes == 1) {
        document.getElementById('btnConcluir').style.display = "block";
    }
}

function preencherHTMLcomQuestaoAtual(index) {
    numeroDaQuestaoAtual = index;

    habilitarAlternativas(true);
    limparCoresBackgroundOpcoes();
    desmarcarRadioButtons();

    const questaoAtual = listaDeQuestoes[index];

    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = index + 1;
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const opcoes = document.getElementsByName("option");
    let checagemQuestoes = Array.from(opcoes).some(option => option.checked);

    if (!checagemQuestoes) {
        alert("Não há alternativas escolhidas. Escolha uma opção.");
        return;
    }

    habilitarAlternativas(false);

    // checa resposta e incrementa o novo numero da questão
    checarResposta();

    // verifica o estado do quiz
    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        // botão avançar enquanto existir questões
        btnProximo.disabled = false;
        btnSubmeter.disabled = true;

        // botão finalizar está escondido/desabilitado
        document.getElementById('btnConcluir').style.display = "none";
        btnConcluir.disabled = true;

    } else {
        // quando finalizada as questões, o botao de finalizar é habilitado 
        btnProximo.disabled = true;
        btnSubmeter.disabled = true;

        document.getElementById('btnConcluir').style.display = "block";
        btnConcluir.disabled = false;
    }
}

function habilitarAlternativas(trueOrFalse) {
    const opcoes = document.getElementsByName("option");
    opcoes.forEach(option => {
        option.disabled = !trueOrFalse;
    });
}

function avancar() {
    btnProximo.disabled = true;
    btnSubmeter.disabled = false;

    desmarcarRadioButtons();
    limparCoresBackgroundOpcoes();

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {

        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);

        // alert para a última questão
        if (numeroDaQuestaoAtual === quantidadeDeQuestoes - 1) {
            alert("Atenção... esta é a última questão!");
        }

    } else {
        // se o quiz terminou, chama a finalização
        finalizarJogo();
    }
}

function tentarNovamente() {
    window.location.reload();
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual];
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta;
    const opcoes = document.getElementsByName("option");

    const alternativaCorretaLabelId = mapLabelId[respostaQuestaoAtual];

    let respostaFoiChecada = false;
    let respostaUsuario = null;
    let acertou = false;

    opcoes.forEach((option) => {
        if (option.checked) {
            respostaFoiChecada = true;
            respostaUsuario = option.value;

            const labelChecadaId = mapLabelId[option.value];

            if (option.value === respostaQuestaoAtual) {
                document.getElementById(labelChecadaId).classList.add("feedback-sucesso");
                pontuacaoFinal++;
                certas++;
                acertou = true;
            } else {
                document.getElementById(labelChecadaId).classList.add("feedback-perigo");

                document.getElementById(alternativaCorretaLabelId).classList.add("feedback-sucesso");

                tentativaIncorreta++;
                erradas++;
                acertou = false;                                                    
            }
        }
    });

    if (respostaFoiChecada) {
        // salva os detalhes da resposta
        respostasDetalhadas.push({
            numeroQuestao: numeroDaQuestaoAtual + 1,
            pergunta: questaoAtual.pergunta,
            respostaUsuario: respostaUsuario,
            respostaCorreta: respostaQuestaoAtual,
            acertou: acertou,
            alternativas: {
                alternativaA: questaoAtual.alternativaA,
                alternativaB: questaoAtual.alternativaB,
                alternativaC: questaoAtual.alternativaC,
                alternativaD: questaoAtual.alternativaD
            }
        });

        document.getElementById("spanCertas").innerHTML = certas;
        document.getElementById("spanErradas").innerHTML = erradas;
        numeroDaQuestaoAtual++;
    }
}

function limparCoresBackgroundOpcoes() {
    document.getElementById("labelRespostaA").classList.remove("feedback-perigo", "feedback-sucesso");
    document.getElementById("labelRespostaB").classList.remove("feedback-perigo", "feedback-sucesso");
    document.getElementById("labelRespostaC").classList.remove("feedback-perigo", "feedback-sucesso");
    document.getElementById("labelRespostaD").classList.remove("feedback-perigo", "feedback-sucesso");
}

function desmarcarRadioButtons() {
    const opcoes = document.getElementsByName("option");
    for (let i = 0; i < opcoes.length; i++) {
        opcoes[i].checked = false;
    }
}

function finalizar() {
    finalizarJogo();
}

function finalizarJogo() {
    let textoParaMensagemFinal = null;
    let classComCoresParaMensagemFinal = null;
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes;

    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemFinal = "Parece que você não é consciente";
        classComCoresParaMensagemFinal = "feedback-perigo";
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "Pode melhorar na próxima, hein!";
        classComCoresParaMensagemFinal = "feedback-alerta";
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "Parabéns, você é uma pessoa consciente!";
        classComCoresParaMensagemFinal = "feedback-sucesso";
    }

    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal;

    let textoCompleto = textoParaMensagemFinal;
    textoCompleto += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões.";

    document.getElementById('msgFinal').innerHTML = textoCompleto;
    document.getElementById('msgFinalContainer').classList.add(classComCoresParaMensagemFinal);
    document.getElementById('msgFinalContainer').style.borderRadius = "4px";


    // dados para o fetch
    const dadosQuiz = {
        pontuacaoFinalServer: pontuacaoFinal,
        idServer: sessionStorage.ID_USUARIO,
        certas: certas,
        erradas: erradas,
        quantidadeDeQuestoes: quantidadeDeQuestoes,
        porcentagemAcertos: Math.round((porcentagemFinalDeAcertos) * 100),
        respostasDetalhadas: respostasDetalhadas,
    };


    sessionStorage.setItem('dadosQuizApoena', JSON.stringify(dadosQuiz));
    console.log('Dados salvos:', dadosQuiz);

    fetch("/usuarios/quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosQuiz)
    })
        .then(resposta => {
            if (resposta.ok) {
                console.log("Dados salvos com sucesso!");
            } else {
                console.error("Houve um erro ao tentar realizar o cadastro do quiz!");
            }
        })
        .catch(erro => {
            console.log(`#ERRO: ${erro}`);
        });

    document.getElementById('jogo').style.display = "none";
    if (document.getElementById('btnConcluir')) {
        document.getElementById('btnConcluir').style.display = "none";
    }

    if (typeof btnTentarNovamente !== 'undefined') {
        btnTentarNovamente.disabled = false;
    }

    setTimeout(() => {
        alert("Redirecionando para a Dashboard...");
        window.location.href = '../dashboard/dashboard.html';
    }, 2000);
}