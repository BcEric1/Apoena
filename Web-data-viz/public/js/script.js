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

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none";
    document.getElementById('jogo').style.display = "none";
    // botão de concluir fica invisível no início
    document.getElementById('btnConcluir').style.display = "none"; 
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex";
    document.getElementById('jogo').style.display = "flex";
    document.getElementById('btnIniciarQuiz').style.display = "none";
    
    document.getElementById('spanCertas').innerHTML = certas;
    document.getElementById('spanErradas').innerHTML = erradas;

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes;

    preencherHTMLcomQuestaoAtual(0);

    btnSubmeter.disabled = false;
    btnProx.disabled = true;
    btnTentarNovamente.disabled = true;
    
    if (quantidadeDeQuestoes === 1) {
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
    const options = document.getElementsByName("option");
    let hasChecked = Array.from(options).some(option => option.checked);

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.");
        return;
    } 

    habilitarAlternativas(false);

    // checa resposta e incrementa o novo numero da questão
    checarResposta();

    // verifica o estado do quiz
    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        // botão avançar enquanto existir questões
        btnProx.disabled = false;
        btnSubmeter.disabled = true;

        // botão finalizar está escondido/desabilitado
        document.getElementById('btnConcluir').style.display = "none";
        btnConcluir.disabled = true;
        
    } else {
        // quando finalizada as questões, o botao de finalizar é habilitado 
        btnProx.disabled = true;
        btnSubmeter.disabled = true;

        document.getElementById('btnConcluir').style.display = "block";
        btnConcluir.disabled = false;
    }
}

function habilitarAlternativas(trueOrFalse) {
    const options = document.getElementsByName("option");
    options.forEach(option => {
        option.disabled = !trueOrFalse;
    });
}

function avancar() {
    btnProx.disabled = true;
    btnSubmeter.disabled = false;

    desmarcarRadioButtons();
    limparCoresBackgroundOpcoes();

    // índice atual ainda é válido?
    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
        
        // alert para a última questão
        if (numeroDaQuestaoAtual === quantidadeDeQuestoes - 1) {
            alert("Atenção... esta é a última questão!");
        }

    } else {
        // ee o quiz terminou, chama a finalização
        finalizarJogo();
    }
}

function tentarNovamente() {
    window.location.reload();
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual];
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta;
    const options = document.getElementsByName("option");

    const alternativaCorretaLabelId = mapLabelId[respostaQuestaoAtual];

    let respostaFoiChecada = false;
    
    options.forEach((option) => {
        if (option.checked) {
            respostaFoiChecada = true;
            
            const labelChecadaId = mapLabelId[option.value];

            if (option.value === respostaQuestaoAtual) {
                document.getElementById(labelChecadaId).classList.add("feedback-sucesso");
                pontuacaoFinal++;
                certas++;
            } else {
                document.getElementById(labelChecadaId).classList.add("feedback-perigo");
                
                document.getElementById(alternativaCorretaLabelId).classList.add("feedback-sucesso");
                
                tentativaIncorreta++;
                erradas++;
            }
        }
    });
    
    if (respostaFoiChecada) {
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
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
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
        textoParaMensagemFinal = "Parece que você não estudou...";
        classComCoresParaMensagemFinal = "feedback-perigo";
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "Pode melhorar na próxima, hein!";
        classComCoresParaMensagemFinal = "feedback-alerta"; 
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "Uau, parabéns!";
        classComCoresParaMensagemFinal = "feedback-sucesso";
    }

    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal;

    let textoCompleto = textoParaMensagemFinal;
    textoCompleto += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões.";

    // aplica o texto no span interno
    document.getElementById('msgFinal').innerHTML = textoCompleto;
    
    // aplica a classe de cor no novo container
    document.getElementById('msgFinalContainer').classList.add(classComCoresParaMensagemFinal);
    document.getElementById('msgFinalContainer').style.borderRadius = "4px"; 


    document.getElementById('jogo').style.display = "none"; 
    document.getElementById('btnConcluir').style.display = "none";

    btnTentarNovamente.disabled = false;
}