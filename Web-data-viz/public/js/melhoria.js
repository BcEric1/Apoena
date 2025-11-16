function saibaMais(elemento) {
    var descricao = elemento.querySelector('.descricao');
    
    if (descricao.style.display === 'block') {
        descricao.style.display = 'none'; 
    } else {
        descricao.style.display = 'block'; 
    }
}