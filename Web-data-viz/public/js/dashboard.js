// Dados do quiz
let dadosQuiz = null;
const perfis = {
    aventureiro: {
        nome: "Eco-Aventureiro",
        icone: "",
        descricao: "Você busca experiências autênticas com consciência ambiental"
    },
    sustentavel: {
        nome: "Viajante Sustentável",
        icone: "",
        descricao: "Sua prioridade é viajar de forma consciente e responsável"
    },
    confortavel: {
        nome: "Explorador Confortável",
        icone: "",
        descricao: "Você valoriza experiências com equilíbrio entre aventura e conforto"
    },
    cultural: {
        nome: "Descobridor Cultural",
        icone: "",
        descricao: "Você busca imersão cultural e autenticidade local"
    }
};

window.onload = function () {
    console.log('Dashboard carregada');
    carregarDados();
};

function carregarDados() {
    console.log('Tentando carregar dados...');
    var dadosArmazenados = sessionStorage.getItem('dadosQuizApoena');

    // verificação de storage vazio
    if (dadosArmazenados == null) {
        console.log('Nenhum dado encontrado');
        alert('Nenhum dado encontrado. Faça o quiz primeiro!');
        setTimeout(() => {
            window.location.href = '../quiz/quiz.html';
        }, 2000);
        return;
    }

    var dadosQuiz = JSON.parse(dadosArmazenados);
    console.log('Dados carregados com sucesso:', dadosQuiz);

    // validação de conteúdo
    if (dadosQuiz.respostasDetalhadas && dadosQuiz.respostasDetalhadas.length > 0) {
        definirPerfil();
        preencherCaracteristicas();
        preencherRespostas();
    } else {
        // não funfou, passou ->
        console.error('Dados incompletos');
        alert('Dados do quiz incompletos. Redirecionando...');
        setTimeout(() => {
            window.location.href = '../quiz/quiz.html';
        }, 2000);
    }
}

function definirPerfil() {
    console.log('Definindo perfil...');

    if (!dadosQuiz || !dadosQuiz.respostasDetalhadas) {
        console.error('Dados inválidos');
        return;
    }

    const caracteristicas = {
        ambiental: 0,
        aventura: 0,
        cultural: 0,
        conforto: 0
    };

    dadosQuiz.respostasDetalhadas.forEach(resposta => {
        const valor = resposta.respostaUsuario;


        //possível mudanças nos perfis
        // questão 1
        if (resposta.numeroQuestao === 1) {
            if (valor === 'alternativaA') caracteristicas.aventura += 3;
            if (valor === 'alternativaB') caracteristicas.conforto += 3;
            if (valor === 'alternativaC') caracteristicas.cultural += 3;
            if (valor === 'alternativaD') caracteristicas.ambiental += 3;
        }

        // questão 2
        if (resposta.numeroQuestao === 2) {
            if (valor === 'alternativaA') caracteristicas.aventura += 2;
            if (valor === 'alternativaB') caracteristicas.conforto += 2;
            if (valor === 'alternativaC') caracteristicas.cultural += 2;
            if (valor === 'alternativaD') caracteristicas.ambiental += 3;
        }

        // questão 3
        if (resposta.numeroQuestao === 3) {
            if (valor === 'alternativaB') caracteristicas.ambiental += 3;
            if (valor === 'alternativaC') caracteristicas.cultural += 1;
        }

        // questão 4
        if (resposta.numeroQuestao === 4) {
            if (valor === 'alternativaA') caracteristicas.conforto += 2;
            if (valor === 'alternativaB') caracteristicas.aventura += 2;
            if (valor === 'alternativaC') caracteristicas.ambiental += 3;
            if (valor === 'alternativaD') caracteristicas.aventura += 2;
        }
    });

    console.log('Características calculadas:', caracteristicas);

    //  calcula percentuais doos perfis
    const total = caracteristicas.ambiental + caracteristicas.aventura +
        caracteristicas.cultural + caracteristicas.conforto;

    const percentuais = {
        ambiental: Math.round((caracteristicas.ambiental / total) * 100),
        aventura: Math.round((caracteristicas.aventura / total) * 100),
        cultural: Math.round((caracteristicas.cultural / total) * 100),
        conforto: Math.round((caracteristicas.conforto / total) * 100)
    };

    console.log('Percentuais:', percentuais);

    // perfil predominante
    let perfilPredominante = 'aventureiro';
    let maiorValor = caracteristicas.aventura;

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

    console.log('Perfil predominante:', perfilPredominante);

    // atualiza o card principal
    const perfil = perfis[perfilPredominante];
    document.getElementById('perfilIcone').textContent = perfil.icone;
    document.getElementById('perfilNome').textContent = perfil.nome;
    document.getElementById('perfilDescricao').textContent = perfil.descricao;

    // atualiza as barras
    atualizarBarra('barraAmbiental', 'nivelAmbiental', percentuais.ambiental);
    atualizarBarra('barraAventura', 'nivelAventura', percentuais.aventura);
    atualizarBarra('barraCultural', 'nivelCultural', percentuais.cultural);
    atualizarBarra('barraConforto', 'nivelConforto', percentuais.conforto);

    // salva para gráficos
    window.percentuaisCaracteristicas = percentuais;
}

function atualizarBarra(idBarra, idTexto, percentual) {
    const barra = document.getElementById(idBarra);
    const texto = document.getElementById(idTexto);

    if (!barra || !texto) {
        console.error('Elemento não encontrado:', idBarra, idTexto);
        return;
    }

    setTimeout(() => {
        barra.style.width = percentual + '%';
        let nivel = 'Baixo';
        if (percentual >= 60) nivel = 'Alto';
        else if (percentual >= 30) nivel = 'Moderado';

        texto.textContent = `${nivel} (${percentual}%)`;
    }, 300);
}

function preencherCaracteristicas() {
    console.log('Preenchendo características...');

    const container = document.getElementById('listaCaracteristicas');
    if (!container) {
        console.error('Container de características não encontrado');
        return;
    }
    // colocarei imagens ou emojis para identificação
    const caracteristicas = [
        { icone: '', texto: 'Valoriza práticas sustentáveis' },
        { icone: '', texto: 'Busca experiências autênticas' },
        { icone: '', texto: 'Responsabilidade com o meio ambiente' },
        { icone: '', texto: 'Prefere mobilidade consciente' }
    ];

    caracteristicas.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-caracteristica';
        div.innerHTML = `
            <span class="icone">${item.icone}</span>
            <p>${item.texto}</p>
        `;
        container.appendChild(div);
    });
}

function preencherRespostas() {
    console.log('Preenchendo respostas...');

    if (!dadosQuiz || !dadosQuiz.respostasDetalhadas) {
        console.error('Sem dados de respostas');
        return;
    }

    const listaQuestoes = document.getElementById('listaQuestoes');
    if (!listaQuestoes) {
        console.error('Container de questões não encontrado');
        return;
    }

    listaQuestoes.innerHTML = '';

    dadosQuiz.respostasDetalhadas.forEach((resposta) => {
        const questaoDiv = document.createElement('div');
        questaoDiv.className = 'questao-item';

        const textoResposta = resposta.alternativas[resposta.respostaUsuario] || 'Resposta não encontrada';

        questaoDiv.innerHTML = `
            <span class="questao-numero">Questão ${resposta.numeroQuestao}</span>
            <div class="questao-pergunta">${resposta.pergunta}</div>
            <div class="questao-resposta">
                <strong>Sua escolha:</strong> ${textoResposta}
            </div>
        `;

        listaQuestoes.appendChild(questaoDiv);
    });

    console.log('Respostas preenchidas com sucesso');
}

function refazerQuiz() {
    console.log('Refazendo quiz...');
    sessionStorage.removeItem('dadosQuizApoena');
    window.location.href = '../quiz/quiz.html';
}

function voltarHome() {
    console.log('Voltando para home...');
    window.location.href = '../principal.html';
}