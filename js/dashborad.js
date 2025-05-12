document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade para alternar o tema
    const botaoTema = document.getElementById('botao-tema');
    const body = document.body;
    
    botaoTema.addEventListener('click', function() {
        if (body.classList.contains('modo-claro')) {
            body.classList.remove('modo-claro');
            body.classList.add('modo-escuro');
            localStorage.setItem('tema', 'escuro');
        } else {
            body.classList.remove('modo-escuro');
            body.classList.add('modo-claro');
            localStorage.setItem('tema', 'claro');
        }
    });
    
    // Verificar tema salvo no localStorage
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        body.classList.remove('modo-claro');
        body.classList.add('modo-escuro');
    } else {
        body.classList.add('modo-claro');
    }
    
    // Funcionalidade para abrir/fechar a área de resposta
const botoesAbrirTicket = document.getElementsByClassName('botao-abrir-ticket');

Array.from(botoesAbrirTicket).forEach(function(botao) {
    botao.addEventListener('click', function() {
        const areaResposta = this.closest('.ticket').querySelector('.area-resposta');
        if (areaResposta.style.display === 'none' || areaResposta.style.display === '') {
            areaResposta.style.display = 'block';
            this.textContent = 'Fechar Área de Resposta';
        } else {
            areaResposta.style.display = 'none';
            this.textContent = 'Abrir Ticket';
        }
    });
});

    
    // Funcionalidade para o menu mobile
    const botaoMenu = document.querySelector('.botao-menu');
    const barraLateral = document.querySelector('.barra-lateral');
    
    botaoMenu.addEventListener('click', function() {
        if (barraLateral.style.display === 'block') {
            barraLateral.style.display = 'none';
        } else {
            barraLateral.style.display = 'block';
        }
    });
    
    // Ajustar visualização da barra lateral em telas maiores
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            barraLateral.style.display = 'block';
        } else {
            barraLateral.style.display = 'none';
        }
    });
    
    // Inicializar a visualização da barra lateral
    if (window.innerWidth > 768) {
        barraLateral.style.display = 'block';
    }
    
    // Prevenir envio do formulário (apenas para demonstração)
    const formulario = document.querySelector('.formulario-resposta');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Resposta enviada com sucesso!');
        areaResposta.style.display = 'none';
        botaoAbrirTicket.textContent = 'Abrir Ticket';
    });
});