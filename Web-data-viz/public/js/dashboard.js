const perfis = {
    aventureiro: {
        //novos emojis para cada perfil
        nome: "Eco-Aventureiro",
        icone: "🌿",
        descricao: "Você busca experiências autênticas com consciência ambiental"
    },
    sustentavel: {
        nome: "Viajante Sustentável",
        icone: "♻️",
        descricao: "Sua prioridade é viajar de forma consciente e responsável"
    },
    confortavel: {
        nome: "Explorador Confortável",
        icone: "✨",
        descricao: "Você valoriza experiências com equilíbrio entre aventura e conforto"
    },
    cultural: {
        nome: "Descobridor Cultural",
        icone: "🏛️",
        descricao: "Você busca imersão cultural e autenticidade local"
    }
};

let dadosQuiz;
let graficoPizza;
let graficoBarras;

window.onload = inicializarDashboard();

function inicializarDashboard() {
    console.log('Dashboard carregada');

    var dadosArmazenados = sessionStorage.getItem('dadosQuizApoena');

    if (dadosArmazenados == null) {
        console.log('Nenhum dado encontrado');
        alert('Nenhum dado encontrado. Faça o quiz primeiro!');
        setTimeout(() => {
            window.location.href = '../quiz/quiz.html';
        }, 2000);
        return;
    }

    dadosQuiz = JSON.parse(dadosArmazenados);
    console.log('Dados carregados:', dadosQuiz);

    if (!dadosQuiz.respostasDetalhadas || dadosQuiz.respostasDetalhadas.length == 0) {
        console.error('Dados incompletos');
        alert('Dados do quiz incompletos. Redirecionando...');
        setTimeout(() => {
            window.location.href = '../quiz/quiz.html';
        }, 2000);
        return;
    }

    calcularPerfil();
}

function calcularPerfil() {
    console.log('Calculando perfil...');

    var caracteristicas = {
        ambiental: 0,
        aventura: 0,
        cultural: 0,
        conforto: 0
    };

    for (var i = 0; i < dadosQuiz.respostasDetalhadas.length; i++) {
        var resposta = dadosQuiz.respostasDetalhadas[i];
        var valor = resposta.respostaUsuario;

        if (resposta.numeroQuestao == 1) {
            if (valor == 'alternativaA') caracteristicas.aventura += 3;
            if (valor == 'alternativaB') caracteristicas.conforto += 3;
            if (valor == 'alternativaC') caracteristicas.cultural += 3;
            if (valor == 'alternativaD') caracteristicas.ambiental += 3;
        }

        if (resposta.numeroQuestao == 2) {
            if (valor == 'alternativaA') caracteristicas.aventura += 2;
            if (valor == 'alternativaB') caracteristicas.conforto += 2;
            if (valor == 'alternativaC') caracteristicas.cultural += 2;
            if (valor == 'alternativaD') caracteristicas.ambiental += 3;
        }

        if (resposta.numeroQuestao == 3) {
            if (valor == 'alternativaA') caracteristicas.conforto += 2;
            if (valor == 'alternativaB') caracteristicas.ambiental += 3;
            if (valor == 'alternativaC') caracteristicas.cultural += 1;
            if (valor == 'alternativaD') caracteristicas.aventura += 0;
        }

        if (resposta.numeroQuestao == 4) {
            if (valor == 'alternativaA') caracteristicas.conforto += 2;
            if (valor == 'alternativaB') caracteristicas.aventura += 2;
            if (valor == 'alternativaC') caracteristicas.ambiental += 3;
            if (valor == 'alternativaD') caracteristicas.cultural += 2;
        }

        if (resposta.numeroQuestao == 5) {
            if (valor == 'alternativaA') caracteristicas.ambiental += 3;
            if (valor == 'alternativaB') caracteristicas.ambiental += 1;
            if (valor == 'alternativaC') caracteristicas.conforto += 1;
            if (valor == 'alternativaD') caracteristicas.conforto += 3;
        }

        if (resposta.numeroQuestao == 6) {
            if (valor == 'alternativaA') caracteristicas.conforto += 1;
            if (valor == 'alternativaB') caracteristicas.cultural += 2;
            if (valor == 'alternativaC') caracteristicas.conforto += 2;
            if (valor == 'alternativaD') caracteristicas.ambiental += 3;
        }

        if (resposta.numeroQuestao == 7) {
            if (valor == 'alternativaA') caracteristicas.ambiental += 3;
            if (valor == 'alternativaB') caracteristicas.ambiental += 2;
            if (valor == 'alternativaC') caracteristicas.conforto += 2;
            if (valor == 'alternativaD') caracteristicas.ambiental += 3;
        }

        if (resposta.numeroQuestao == 8) {
            if (valor == 'alternativaA') caracteristicas.aventura += 2;
            if (valor == 'alternativaB') caracteristicas.ambiental += 3;
            if (valor == 'alternativaC') caracteristicas.aventura += 1;
            if (valor == 'alternativaD') caracteristicas.ambiental += 2;
        }

        if (resposta.numeroQuestao == 9) {
            if (valor == 'alternativaA') caracteristicas.conforto += 3;
            if (valor == 'alternativaB') caracteristicas.cultural += 2;
            if (valor == 'alternativaC') caracteristicas.aventura += 1;
            if (valor == 'alternativaD') caracteristicas.ambiental += 3;
        }

        if (resposta.numeroQuestao == 10) {
            if (valor == 'alternativaA') caracteristicas.conforto += 3;
            if (valor == 'alternativaB') caracteristicas.conforto += 2;
            if (valor == 'alternativaC') caracteristicas.conforto += 1;
            if (valor == 'alternativaD') caracteristicas.ambiental += 3;
        }
    }

    console.log('Características:', caracteristicas);

    var total = caracteristicas.ambiental + caracteristicas.aventura +
        caracteristicas.cultural + caracteristicas.conforto;

    var percentuais = {
        ambiental: Math.round((caracteristicas.ambiental / total) * 100),
        aventura: Math.round((caracteristicas.aventura / total) * 100),
        cultural: Math.round((caracteristicas.cultural / total) * 100),
        conforto: Math.round((caracteristicas.conforto / total) * 100)
    };

    console.log('Percentuais:', percentuais);

    var perfilPredominante = 'aventureiro';
    var maiorValor = caracteristicas.aventura;

    if (caracteristicas.ambiental > maiorValor) {
        perfilPredominante = 'sustentavel';
        maiorValor = caracteristicas.ambiental;
    }
    if (caracteristicas.conforto > maiorValor) {
        perfilPredominante = 'confortavel';
        maiorValor = caracteristicas.conforto;
    }
    if (caracteristicas.cultural > maiorValor) {
        perfilPredominante = 'cultural';
    }

    console.log('Perfil:', perfilPredominante);

    window.perfilCalculado = {
        tipo: perfilPredominante,
        caracteristicas: caracteristicas,
        percentuais: percentuais,
        perfil: perfis[perfilPredominante]
    };

    enviarParaBackend();
}

function enviarParaBackend() {
    console.log('Enviando para backend...');

    var idUsuario = sessionStorage.ID_USUARIO || sessionStorage.getItem('ID_USUARIO');

    if (!idUsuario) {
        console.error('ID do usuário não encontrado no sessionStorage');
        console.log('sessionStorage completo:', sessionStorage);
        alert('Aviso: ID do usuário não encontrado. Continuando sem salvar no banco.');
        exibirDashboard();
        return;
    }

    var dados = {
        idUsuario: idUsuario,
        tipoPerfil: window.perfilCalculado.tipo,
        pontuacaoAmbiental: window.perfilCalculado.caracteristicas.ambiental,
        pontuacaoAventura: window.perfilCalculado.caracteristicas.aventura,
        pontuacaoCultural: window.perfilCalculado.caracteristicas.cultural,
        pontuacaoConforto: window.perfilCalculado.caracteristicas.conforto,
        percentualAmbiental: window.perfilCalculado.percentuais.ambiental,
        percentualAventura: window.perfilCalculado.percentuais.aventura,
        percentualCultural: window.perfilCalculado.percentuais.cultural,
        percentualConforto: window.perfilCalculado.percentuais.conforto,
        respostasDetalhadas: dadosQuiz.respostasDetalhadas
    };

    fetch('/perfil/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao salvar perfil');
            }
        })
        .then(function (resultado) {
            console.log('Perfil salvo:', resultado);
            exibirDashboard();
        })
        .catch(function (erro) {
            console.error('Erro:', erro);
            alert('Erro ao salvar perfil. Mas você pode ver seus resultados!');
            exibirDashboard();
        });
}

function exibirDashboard() {
    console.log('Exibindo dashboard...');

    exibirPerfil();
    exibirBarras();
    criarGraficoPizza();
    criarGraficoBarras();
    exibirCaracteristicas();
    exibirRespostas();
}

function exibirPerfil() {
    var perfil = window.perfilCalculado.perfil;

    document.getElementById('perfilIcone').innerHTML = perfil.icone;
    document.getElementById('perfilNome').innerHTML = perfil.nome;
    document.getElementById('perfilDescricao').innerHTML = perfil.descricao;
}

function exibirBarras() {
    var percentuais = window.perfilCalculado.percentuais;

    atualizarBarra('barraAmbiental', 'nivelAmbiental', percentuais.ambiental);
    atualizarBarra('barraAventura', 'nivelAventura', percentuais.aventura);
    atualizarBarra('barraCultural', 'nivelCultural', percentuais.cultural);
    atualizarBarra('barraConforto', 'nivelConforto', percentuais.conforto);
}

function atualizarBarra(idBarra, idTexto, percentual) {
    var barra = document.getElementById(idBarra);
    var texto = document.getElementById(idTexto);

    if (!barra || !texto) return;

    setTimeout(() => {
        barra.style.width = percentual + '%';

        var nivel = 'Baixo';
        if (percentual >= 60) nivel = 'Alto';
        else if (percentual >= 30) nivel = 'Moderado';

        texto.innerHTML = nivel + ' (' + percentual + '%)';
    }, 300);
}

// gráfico de pizza
function criarGraficoPizza() {
    var ctx = document.getElementById('graficoDistribuicao').getContext('2d');
    var percentuais = window.perfilCalculado.percentuais;

    graficoPizza = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Consciência Ambiental', 'Espírito de Aventura', 'Interesse Cultural', 'Preferência por Conforto'],
            datasets: [{
                data: [percentuais.ambiental, percentuais.aventura, percentuais.cultural, percentuais.conforto],
                backgroundColor: ['#4caf50', '#ff9800', '#9c27b0', '#3498db'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// gráfico de barras
function criarGraficoBarras() {
    var ctx = document.getElementById('graficoTendencias').getContext('2d');
    var percentuais = window.perfilCalculado.percentuais;

    graficoBarras = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ambiental', 'Aventura', 'Cultural', 'Conforto'],
            datasets: [{
                label: 'Intensidade (%)',
                data: [percentuais.ambiental, percentuais.aventura, percentuais.cultural, percentuais.conforto],
                backgroundColor: ['#4caf50', '#ff9800', '#9c27b0', '#3498db'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function exibirCaracteristicas() {
    var container = document.getElementById('listaCaracteristicas');

    //emojis de acordo com a característica
    var caracteristicas = [
        { icone: '🌱', texto: 'Valoriza práticas sustentáveis' },
        { icone: '🎒', texto: 'Busca experiências únicas' },
        { icone: '♻️', texto: 'Responsabilidade com o meio ambiente' },
        { icone: '🚶', texto: 'Prefere mobilidade consciente' }
    ];

    container.innerHTML = '';

    for (var i = 0; i < caracteristicas.length; i++) {
        container.innerHTML += `
            <div class="item-caracteristica">
                <span class="icone">${caracteristicas[i].icone}</span>
                <p>${caracteristicas[i].texto}</p>
            </div>
        `;
    }
}

function exibirRespostas() {
    var lista = document.getElementById('listaQuestoes');

    lista.innerHTML = '';

    for (var i = 0; i < dadosQuiz.respostasDetalhadas.length; i++) {
        var resposta = dadosQuiz.respostasDetalhadas[i];
        var textoResposta = resposta.alternativas[resposta.respostaUsuario];

        lista.innerHTML += `
            <div class="questao-item">
                <span class="questao-numero">Questão ${resposta.numeroQuestao}</span>
                <div class="questao-pergunta">${resposta.pergunta}</div>
                <div class="questao-resposta">
                    <strong>Sua escolha:</strong> ${textoResposta}
                </div>
            </div>
        `;
    }
}

function refazerQuiz() {
    sessionStorage.removeItem('dadosQuizApoena');
    window.location.href = '../quiz/quiz.html';
}

function voltarHome() {
    window.location.href = '../principal.html';
}

function mostrarDetalhes() {

    const conteudo = document.getElementById('conteudo-oculto');
    if (conteudo.style.display == 'none') {
        conteudo.style.display = 'block';
    } else {
        conteudo.style.display = 'none';
    }
}