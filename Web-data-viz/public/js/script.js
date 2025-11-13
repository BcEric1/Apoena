// alguns exemplos de perguntas, não serão essas (acho)
let quizData = [
    {
        pergunta: "Para onde você viajaria agora, se pudesse?",
        respostas: [
            { texto: "Montanha íngreme e remota com trilhas desafiadoras", Aventura: 5, Relaxamento: 1, Ecologia: 3 },
            { texto: "Hotel resort na praia com piscina e serviço all-inclusive", Aventura: 1, Relaxamento: 5, Ecologia: 1 },
            { texto: "Cidade histórica com museus e culinária local autêntica", Aventura: 2, Relaxamento: 3, Ecologia: 2 },
            { texto: "Reserva natural com foco em observação da vida selvagem", Aventura: 3, Relaxamento: 4, Ecologia: 5 }
        ]
    },
    {
        pergunta: "Qual é a sua prioridade ao fazer as malas?",
        respostas: [
            { texto: "Equipamentos técnicos e botas de trilha", Aventura: 4, Relaxamento: 1, Ecologia: 3 },
            { texto: "Roupas da moda e acessórios para fotos", Aventura: 1, Relaxamento: 4, Ecologia: 1 },
            { texto: "Um bom livro e itens de conforto pessoal", Aventura: 2, Relaxamento: 5, Ecologia: 2 },
            { texto: "Garrafa reutilizável e saco de lixo pessoal", Aventura: 3, Relaxamento: 2, Ecologia: 5 }
        ]
    },
    {
        pergunta: "Em uma trilha, você encontra um recipiente plástico abandonado. Sua reação é:",
        respostas: [
            { texto: "Ignorar, não é seu problema", Aventura: 2, Relaxamento: 4, Ecologia: 1 },
            { texto: "Recolher e levar até a próxima lixeira (ou com você)", Aventura: 3, Relaxamento: 3, Ecologia: 5 },
            { texto: "Tirar uma foto e postar sobre a falta de civilidade", Aventura: 1, Relaxamento: 2, Ecologia: 3 },
            { texto: "Apenas notar e continuar, mas evitando o contato", Aventura: 4, Relaxamento: 1, Ecologia: 2 }
        ]
    },
    {
        pergunta: "Para se deslocar em longas distâncias, qual meio de transporte você prefere?",
        respostas: [
            { texto: "Avião (mais rápido, mesmo que menos ecológico)", Aventura: 3, Relaxamento: 4, Ecologia: 1 },
            { texto: "Carro próprio ou alugado (liberdade e flexibilidade)", Aventura: 4, Relaxamento: 3, Ecologia: 2 },
            { texto: "Trem ou ônibus (compartilhado e mais eficiente)", Aventura: 2, Relaxamento: 2, Ecologia: 5 },
            { texto: "Barco ou bicicleta (depende da rota, mas é a jornada)", Aventura: 5, Relaxamento: 1, Ecologia: 4 }
        ]
    }
];

let mapeamentoPerfis = {
    Aventura: "Aventureiro",
    Relaxamento: "Relax",
    Ecologia: "Ecológico"
};

let quizArea = document.getElementById('quiz-area');
let resultadoArea = document.getElementById('resultado-area');
let questoesTotais = quizData.length;


function calcularMedia(somaTotal, numeroQuestoes) {
    return somaTotal / numeroQuestoes;
}

function renderizarQuiz() {
    let htmlContent = '';
    
    for (let i = 0; i < questoesTotais; i++) {
        let questao = quizData[i];
        
        htmlContent += `<div class="questao" id="q${i}">
            <p>${i + 1}. ${questao.pergunta}</p>
        `;
        
        // laço para "completar" respostas
        for (let j = 0; j < questao.respostas.length; j++) {
            let resposta = questao.respostas[j];
            
            // ovalor do radio button em formato string JSON
            let valor = JSON.stringify({
                Aventura: resposta.Aventura,
                Relaxamento: resposta.Relaxamento,
                Ecologia: resposta.Ecologia
            });

            htmlContent += `
                <label>
                    <input type="radio" name="pergunta${i}" value='${valor}' required>
                    ${resposta.texto}
                </label>
            `;
        }
        htmlContent += `</div>`;
    }

    htmlContent += '<button class="botao-principal" onclick="finalizarQuiz()">Ver Meu Perfil</button>';
    if (quizArea) quizArea.innerHTML = htmlContent;
}

function finalizarQuiz() {
    let pontuacoes = { Aventura: 0, Relaxamento: 0, Ecologia: 0 };
    let todasRespondidas = true;

    for (let i = 0; i < questoesTotais; i++) {
        let nomeCampo = `pergunta${i}`;
        let respostaSelecionada = document.querySelector(`input[name="${nomeCampo}"]:checked`);
        
        if (!respostaSelecionada) {
            todasRespondidas = false;
            break; 
        }

        let pontuacaoResposta = JSON.parse(respostaSelecionada.value);
        
        pontuacoes.Aventura += pontuacaoResposta.Aventura;
        pontuacoes.Relaxamento += pontuacaoResposta.Relaxamento;
        pontuacoes.Ecologia += pontuacaoResposta.Ecologia;
    }

    if (!todasRespondidas) {
        alert("Por favor, responda todas as perguntas antes de finalizar.");
        return;
    }

    // geração do KPI Ecológico
    let mediaEcologia = calcularMedia(pontuacoes.Ecologia, questoesTotais);
    let pegadaTexto = "";

    if (mediaEcologia < 2.5) {
        pegadaTexto = "Baixa Consciência";
    } else if (mediaEcologia < 3.5) {
        pegadaTexto = "Consciência Média";
    } else {
        pegadaTexto = "Alta Consciência";
    }

    if (document.getElementById('perfil-resultado')) {
        document.getElementById('perfil-resultado').innerHTML = `Seu perfil predominante é: <strong>${perfil}</strong>.`;
    }
    if (document.getElementById('pegada-resultado')) {
        document.getElementById('pegada-resultado').innerHTML = `Sua avaliação de Consciência Ecológica é: <strong>${pegadaTexto}</strong>`;
    }
    if (document.getElementById('dados-brutos')) {
        document.getElementById('dados-brutos').textContent = 
            `--- DADOS PARA DASHBOARD ---\n` +
            `Perfil Predominante: ${perfil}\n` +
            `Pontuação Aventura: ${pontuacoes.Aventura}\n` +
            `Pontuação Relaxamento: ${pontuacoes.Relaxamento}\n` +
            `Pontuação Ecologia: ${pontuacoes.Ecologia}\n` +
            `KPI Média Ecológica: ${mediaEcologia.toFixed(2)} (Máximo de 5)`;
    }

    if (quizArea) quizArea.classList.add('hidden');
    if (resultadoArea) resultadoArea.classList.remove('hidden');
    
}

document.addEventListener('DOMContentLoaded', renderizarQuiz);