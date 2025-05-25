document.addEventListener('DOMContentLoaded', function () {
    const tickets = document.querySelectorAll('.ticket');
    const painelDetalhes = document.getElementById('painel-detalhes');
    const botaoFecharPainel = document.getElementById('fechar-painel');
    const conteudoPrincipal = document.querySelector('.conteudo-principal');
    const botoesAbrir = document.querySelectorAll('.botao-abrir');
    const botoesEnviar = document.querySelectorAll('.botao-enviar');
    const botoesCancelar = document.querySelectorAll('.botao-cancelar');
    const tabs = document.querySelectorAll('.tab');

    const botaoResponder = document.querySelector('.acao-btn.responder');
    const botaoAnotar = document.querySelector('.acao-btn.anotar');
    const botaoEncaminhar = document.querySelector('.acao-btn.encaminhar');
    const botaoAtualizar = document.querySelector('.botao-atualizar');
    const botaoExcluir = document.querySelector('.botao-excluir');

    const modalExcluir = document.getElementById('modal-excluir');
    const botaoFecharModal = document.querySelector('.botao-fechar-modal');
    const botaoCancelarModal = document.querySelector('.botao-cancelar-modal');
    const botaoConfirmarExcluir = document.querySelector('.botao-confirmar-excluir');

    const areaRespostaPainel = document.querySelector('.area-resposta-painel');
    const areaAnotacao = document.querySelector('.area-anotacao');
    const areaEncaminhar = document.querySelector('.area-encaminhar');

    const botaoEnviarPainel = document.querySelector('.botao-enviar-painel');
    const botaoCancelarPainel = document.querySelector('.botao-cancelar-painel');
    const botaoSalvarAnotacao = document.querySelector('.botao-salvar-anotacao');
    const botaoCancelarAnotacao = document.querySelector('.botao-cancelar-anotacao');
    const botaoEncaminharTicket = document.querySelector('.botao-encaminhar');
    const botaoCancelarEncaminhar = document.querySelector('.botao-cancelar-encaminhar');

    const dadosTickets = {
        '1': {
            id: 'Ticket# 2023-T001',
            titulo: 'Como depositar dinheiro na minha conta?',
            descricao: 'Estou tentando fazer um depósito na minha conta, mas o sistema apresenta erro.',
            data: '15/05/2023 às 10:45',
            status: 'andamento',
            statusTexto: 'Em andamento',
            agente: '2'
        },
        '2': {
            id: 'Ticket# 2023-T002',
            titulo: 'Problema com login no aplicativo',
            descricao: 'Não consigo fazer login no aplicativo móvel.',
            data: '16/05/2023 às 14:30',
            status: 'abertos',
            statusTexto: 'Aberto',
            agente: '1'
        },
        '3': {
            id: 'Ticket# 2023-T003',
            titulo: 'Não recebi o comprovante de pagamento',
            descricao: 'Realizei um pagamento ontem, mas não recebi o comprovante.',
            data: '14/05/2023 às 09:15',
            status: 'resolvidos',
            statusTexto: 'Resolvido',
            agente: '3'
        }
    };

    function abrirPainelDetalhes(ticketId) {
        const ticket = dadosTickets[ticketId];

        document.getElementById('detalhe-titulo').textContent = ticket.titulo;
        document.getElementById('detalhe-id').textContent = ticket.id;
        document.getElementById('detalhe-data').textContent = 'Criado em: ' + ticket.data;
        document.getElementById('detalhe-descricao').textContent = ticket.descricao;

        const indicador = document.getElementById('detalhe-indicador');
        indicador.className = 'indicador ' + ticket.status;
        document.getElementById('detalhe-status').textContent = ticket.statusTexto;

        document.getElementById('agente-responsavel').value = ticket.agente;
        document.getElementById('status-ticket').value = ticket.status;

        painelDetalhes.classList.add('aberto');
        conteudoPrincipal.classList.add('com-painel');

        areaRespostaPainel.style.display = 'none';
        areaAnotacao.style.display = 'none';
        areaEncaminhar.style.display = 'none';
    }

    function fecharPainelDetalhes() {
        painelDetalhes.classList.remove('aberto');
        conteudoPrincipal.classList.remove('com-painel');
    }

    tickets.forEach(ticket => {
        ticket.addEventListener('click', function (e) {
            if (e.target.classList.contains('botao-abrir') ||
                e.target.closest('.area-resposta') ||
                e.target.classList.contains('botao-enviar') ||
                e.target.classList.contains('botao-cancelar')) {
                return;
            }

            const ticketId = this.getAttribute('data-ticket-id');
            abrirPainelDetalhes(ticketId);
        });
    });

    botaoFecharPainel.addEventListener('click', fecharPainelDetalhes);

    botoesAbrir.forEach(botao => {
        botao.addEventListener('click', function (e) {
            e.stopPropagation();

            const ticketId = this.getAttribute('data-ticket');
            const areaResposta = document.getElementById(`resposta-${ticketId}`);

            if (areaResposta.style.display === 'none') {
                areaResposta.style.display = 'block';
                this.textContent = 'Fechar Ticket';
            } else {
                areaResposta.style.display = 'none';
                this.textContent = 'Abrir Ticket';
            }
        });
    });

    botoesEnviar.forEach(botao => {
        botao.addEventListener('click', function (e) {
            e.stopPropagation();

            const areaResposta = this.closest('.area-resposta');
            const textarea = areaResposta.querySelector('textarea');

            if (textarea.value.trim() !== '') {
                alert('Resposta enviada com sucesso!');
                textarea.value = '';
                areaResposta.style.display = 'none';

                const ticketId = areaResposta.id.split('-')[1];
                const botaoAbrir = document.querySelector(`.botao-abrir[data-ticket="${ticketId}"]`);
                botaoAbrir.textContent = 'Abrir Ticket';
            } else {
                alert('Por favor, digite uma resposta antes de enviar.');
            }
        });
    });

    botoesCancelar.forEach(botao => {
        botao.addEventListener('click', function (e) {
            e.stopPropagation();

            const areaResposta = this.closest('.area-resposta');
            const textarea = areaResposta.querySelector('textarea');

            if (confirm('Tem certeza que deseja cancelar o rascunho?')) {
                textarea.value = '';
                areaResposta.style.display = 'none';

                const ticketId = areaResposta.id.split('-')[1];
                const botaoAbrir = document.querySelector(`.botao-abrir[data-ticket="${ticketId}"]`);
                botaoAbrir.textContent = 'Abrir Ticket';
            }
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('ativo'));
            this.classList.add('ativo');

            const status = this.getAttribute('data-status');
            filtrarTickets(status);
        });
    });

    function filtrarTickets(status) {
        const tickets = document.querySelectorAll('.ticket');

        if (status === 'todos') {
            tickets.forEach(ticket => ticket.style.display = 'block');
            return;
        }

        tickets.forEach(ticket => {
            const indicador = ticket.querySelector('.indicador');
            ticket.style.display = indicador.classList.contains(status) ? 'block' : 'none';
        });
    }

    if (botaoResponder) {
        botaoResponder.addEventListener('click', function () {
            areaRespostaPainel.style.display = 'block';
            areaAnotacao.style.display = 'none';
            areaEncaminhar.style.display = 'none';
            areaRespostaPainel.querySelector('textarea').focus();
        });
    }

    if (botaoAnotar) {
        botaoAnotar.addEventListener('click', function () {
            areaAnotacao.style.display = 'block';
            areaRespostaPainel.style.display = 'none';
            areaEncaminhar.style.display = 'none';
            areaAnotacao.querySelector('textarea').focus();
        });
    }

    if (botaoEncaminhar) {
        botaoEncaminhar.addEventListener('click', function () {
            areaEncaminhar.style.display = 'block';
            areaRespostaPainel.style.display = 'none';
            areaAnotacao.style.display = 'none';
        });
    }

    if (botaoAtualizar) {
        botaoAtualizar.addEventListener('click', function () {
            const agente = document.getElementById('agente-responsavel').value;
            const status = document.getElementById('status-ticket').value;

            alert('Propriedades do ticket atualizadas com sucesso!');
        });
    }

    if (botaoEnviarPainel) {
        botaoEnviarPainel.addEventListener('click', function () {
            const textarea = areaRespostaPainel.querySelector('textarea');

            if (textarea.value.trim() !== '') {
                alert('Resposta enviada com sucesso!');
                textarea.value = '';
                areaRespostaPainel.style.display = 'none';
            } else {
                alert('Por favor, digite uma resposta antes de enviar.');
            }
        });
    }

    if (botaoCancelarPainel) {
        botaoCancelarPainel.addEventListener('click', function () {
            if (confirm('Tem certeza que deseja cancelar a resposta?')) {
                areaRespostaPainel.querySelector('textarea').value = '';
                areaRespostaPainel.style.display = 'none';
            }
        });
    }

    if (botaoSalvarAnotacao) {
        botaoSalvarAnotacao.addEventListener('click', function () {
            const textarea = areaAnotacao.querySelector('textarea');

            if (textarea.value.trim() !== '') {
                alert('Anotação salva com sucesso!');
                textarea.value = '';
                areaAnotacao.style.display = 'none';
            } else {
                alert('Por favor, digite uma anotação antes de salvar.');
            }
        });
    }

    if (botaoCancelarAnotacao) {
        botaoCancelarAnotacao.addEventListener('click', function () {
            if (confirm('Tem certeza que deseja cancelar a anotação?')) {
                areaAnotacao.querySelector('textarea').value = '';
                areaAnotacao.style.display = 'none';
            }
        });
    }

    if (botaoEncaminharTicket) {
        botaoEncaminharTicket.addEventListener('click', function () {
            const departamento = document.getElementById('encaminhar-para').value;
            const mensagem = areaEncaminhar.querySelector('textarea').value;

            if (departamento) {
                alert('Ticket encaminhado com sucesso!');
                areaEncaminhar.querySelector('textarea').value = '';
                document.getElementById('encaminhar-para').selectedIndex = 0;
                areaEncaminhar.style.display = 'none';
            } else {
                alert('Por favor, selecione um departamento para encaminhar o ticket.');
            }
        });
    }

    if (botaoCancelarEncaminhar) {
        botaoCancelarEncaminhar.addEventListener('click', function () {
            if (confirm('Tem certeza que deseja cancelar o encaminhamento?')) {
                areaEncaminhar.querySelector('textarea').value = '';
                document.getElementById('encaminhar-para').selectedIndex = 0;
                areaEncaminhar.style.display = 'none';
            }
        });
    }

    function abrirModal() {
        modalExcluir.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    }

    function fecharModal() {
        modalExcluir.classList.remove('ativo');
        document.body.style.overflow = 'auto';
    }

    if (botaoExcluir) {
        botaoExcluir.addEventListener('click', function (e) {
            e.stopPropagation();
            abrirModal();
        });
    }

    if (botaoFecharModal) {
        botaoFecharModal.addEventListener('click', fecharModal);
    }

    if (botaoCancelarModal) {
        botaoCancelarModal.addEventListener('click', fecharModal);
    }

    if (botaoConfirmarExcluir) {
        botaoConfirmarExcluir.addEventListener('click', function () {
            alert('Ticket excluído com sucesso!');
            fecharModal();
            fecharPainelDetalhes();
        });
    }

    if (modalExcluir) {
        modalExcluir.addEventListener('click', function (e) {
            if (e.target === modalExcluir) {
                fecharModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalExcluir && modalExcluir.classList.contains('ativo')) {
            fecharModal();
        }
    });

    const botaoSair = document.querySelector('.botao-sair');
    if (botaoSair) {
        botaoSair.addEventListener('click', function () {
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                // lógica de logout
            }
        });
    }
});
