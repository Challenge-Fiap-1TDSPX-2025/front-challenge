document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const tickets = document.querySelectorAll('.ticket');
    const painelDetalhes = document.getElementById('painel-detalhes');
    const botaoFecharPainel = document.getElementById('fechar-painel');
    const conteudoPrincipal = document.querySelector('.conteudo-principal');
    const botoesAbrir = document.querySelectorAll('.botao-abrir');
    const botoesEnviar = document.querySelectorAll('.botao-enviar');
    const botoesCancelar = document.querySelectorAll('.botao-cancelar');
    const tabs = document.querySelectorAll('.tab');

    // Botões do painel de detalhes
    const botaoResponder = document.querySelector('.acao-btn.responder');
    const botaoAnotar = document.querySelector('.acao-btn.anotar');
    const botaoEncaminhar = document.querySelector('.acao-btn.encaminhar');
    const botaoAtualizar = document.querySelector('.botao-atualizar');
    const botaoExcluir = document.querySelector('.botao-excluir');

   // Modal de exclusão
    const modalExcluir = document.getElementById('modal-excluir');
    const botaoFecharModal = document.querySelector('.botao-fechar-modal');
    const botaoCancelarModal = document.querySelector('.botao-cancelar-modal');
    const botaoConfirmarExcluir = document.querySelector('.botao-confirmar-excluir');


    // Áreas de ação no painel
    const areaRespostaPainel = document.querySelector('.area-resposta-painel');
    const areaAnotacao = document.querySelector('.area-anotacao');
    const areaEncaminhar = document.querySelector('.area-encaminhar');

    // Botões de ação no painel
    const botaoEnviarPainel = document.querySelector('.botao-enviar-painel');
    const botaoCancelarPainel = document.querySelector('.botao-cancelar-painel');
    const botaoSalvarAnotacao = document.querySelector('.botao-salvar-anotacao');
    const botaoCancelarAnotacao = document.querySelector('.botao-cancelar-anotacao');
    const botaoEncaminharTicket = document.querySelector('.botao-encaminhar');
    const botaoCancelarEncaminhar = document.querySelector('.botao-cancelar-encaminhar');

    // Dados dos tickets (simulação)
    const dadosTickets = {
        '1': {
            id: 'Ticket# 2023-T001',
            titulo: 'Como depositar dinheiro na minha conta?',
            descricao: 'Estou tentando fazer um depósito na minha conta, mas o sistema apresenta erro. Já tentei várias vezes e não consigo completar a operação.',
            data: '15/05/2023 às 10:45',
            status: 'andamento',
            statusTexto: 'Em andamento',
            agente: '2',
            prioridade: 'media'
        },
        '2': {
            id: 'Ticket# 2023-T002',
            titulo: 'Problema com login no aplicativo',
            descricao: 'Não consigo fazer login no aplicativo móvel. A senha está correta, mas o sistema não reconhece meu usuário.',
            data: '16/05/2023 às 14:30',
            status: 'abertos',
            statusTexto: 'Aberto',
            agente: '1',
            prioridade: 'alta'
        },
        '3': {
            id: 'Ticket# 2023-T003',
            titulo: 'Não recebi o comprovante de pagamento',
            descricao: 'Realizei um pagamento ontem, mas não recebi o comprovante por e-mail como de costume. Preciso desse documento para fins fiscais.',
            data: '14/05/2023 às 09:15',
            status: 'resolvidos',
            statusTexto: 'Resolvido',
            agente: '3',
            prioridade: 'baixa'
        }
    };

    // Função para abrir o painel de detalhes
    function abrirPainelDetalhes(ticketId) {
        const ticket = dadosTickets[ticketId];

        // Preencher os detalhes do ticket no painel
        document.getElementById('detalhe-titulo').textContent = ticket.titulo;
        document.getElementById('detalhe-id').textContent = ticket.id;
        document.getElementById('detalhe-data').textContent = 'Criado em: ' + ticket.data;
        document.getElementById('detalhe-descricao').textContent = ticket.descricao;

        // Atualizar o indicador de status
        const indicador = document.getElementById('detalhe-indicador');
        indicador.className = 'indicador ' + ticket.status;
        document.getElementById('detalhe-status').textContent = ticket.statusTexto;

        // Definir os valores dos selects
        document.getElementById('agente-responsavel').value = ticket.agente;
        document.getElementById('status-ticket').value = ticket.status;
        document.getElementById('prioridade-ticket').value = ticket.prioridade;

        // Mostrar o painel
        painelDetalhes.classList.add('aberto');
        conteudoPrincipal.classList.add('com-painel');

        // Esconder todas as áreas de ação
        areaRespostaPainel.style.display = 'none';
        areaAnotacao.style.display = 'none';
        areaEncaminhar.style.display = 'none';
    }

    // Função para fechar o painel de detalhes
    function fecharPainelDetalhes() {
        painelDetalhes.classList.remove('aberto');
        conteudoPrincipal.classList.remove('com-painel');
    }

    // Adicionar evento de clique aos tickets
    tickets.forEach(ticket => {
        ticket.addEventListener('click', function (e) {
            // Evitar que o clique no botão "Abrir Ticket" ou na área de resposta abra o painel
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

    // Fechar o painel ao clicar no botão fechar
    botaoFecharPainel.addEventListener('click', fecharPainelDetalhes);

    // Funcionalidade para abrir/fechar a área de resposta
    botoesAbrir.forEach(botao => {
        botao.addEventListener('click', function (e) {
            e.stopPropagation(); // Evitar que o clique propague para o ticket

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

    // Funcionalidade para os botões de resposta
    botoesEnviar.forEach(botao => {
        botao.addEventListener('click', function (e) {
            e.stopPropagation(); // Evitar que o clique propague para o ticket

            const areaResposta = this.closest('.area-resposta');
            const textarea = areaResposta.querySelector('textarea');

            if (textarea.value.trim() !== '') {
                alert('Resposta enviada com sucesso!');
                textarea.value = '';
                areaResposta.style.display = 'none';

                // Atualizar o texto do botão
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
            e.stopPropagation(); // Evitar que o clique propague para o ticket

            const areaResposta = this.closest('.area-resposta');
            const textarea = areaResposta.querySelector('textarea');

            if (confirm('Tem certeza que deseja cancelar o rascunho?')) {
                textarea.value = '';
                areaResposta.style.display = 'none';

                // Atualizar o texto do botão
                const ticketId = areaResposta.id.split('-')[1];
                const botaoAbrir = document.querySelector(`.botao-abrir[data-ticket="${ticketId}"]`);
                botaoAbrir.textContent = 'Abrir Ticket';
            }
        });
    });

    // Funcionalidade para as abas de status
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remover classe ativo de todas as abas
            tabs.forEach(t => t.classList.remove('ativo'));

            // Adicionar classe ativo à aba clicada
            this.classList.add('ativo');

            // Filtrar tickets
            const status = this.getAttribute('data-status');
            filtrarTickets(status);
        });
    });

    // Função para filtrar tickets
    function filtrarTickets(status) {
        const tickets = document.querySelectorAll('.ticket');

        if (status === 'todos') {
            tickets.forEach(ticket => {
                ticket.style.display = 'block';
            });
            return;
        }

        tickets.forEach(ticket => {
            const indicador = ticket.querySelector('.indicador');

            if (indicador.classList.contains(status)) {
                ticket.style.display = 'block';
            } else {
                ticket.style.display = 'none';
            }
        });
    }

    // Funcionalidades do painel de detalhes

    // Botão Responder
    if (botaoResponder) {
        botaoResponder.addEventListener('click', function () {
            areaRespostaPainel.style.display = 'block';
            areaAnotacao.style.display = 'none';
            areaEncaminhar.style.display = 'none';
            areaRespostaPainel.querySelector('textarea').focus();
        });
    }

    // Botão Adicionar Anotação
    if (botaoAnotar) {
        botaoAnotar.addEventListener('click', function () {
            areaAnotacao.style.display = 'block';
            areaRespostaPainel.style.display = 'none';
            areaEncaminhar.style.display = 'none';
            areaAnotacao.querySelector('textarea').focus();
        });
    }

    // Botão Encaminhar
    if (botaoEncaminhar) {
        botaoEncaminhar.addEventListener('click', function () {
            areaEncaminhar.style.display = 'block';
            areaRespostaPainel.style.display = 'none';
            areaAnotacao.style.display = 'none';
        });
    }

    // Botão Atualizar Propriedades
    if (botaoAtualizar) {
        botaoAtualizar.addEventListener('click', function () {
            const agente = document.getElementById('agente-responsavel').value;
            const status = document.getElementById('status-ticket').value;
            const prioridade = document.getElementById('prioridade-ticket').value;

            alert('Propriedades do ticket atualizadas com sucesso!');
        });
    }

    // Botões de ação no painel
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

    // Função para abrir o modal
    function abrirModal() {
        modalExcluir.classList.add('ativo');
        // Impedir o scroll da página enquanto o modal estiver aberto
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar o modal
    function fecharModal() {
        modalExcluir.classList.remove('ativo');
        // Restaurar o scroll da página
        document.body.style.overflow = 'auto';
    }

    // Adicionar eventos aos botões do modal
    if (botaoExcluir) {
        botaoExcluir.addEventListener('click', function(e) {
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
        botaoConfirmarExcluir.addEventListener('click', function() {
            // Aqui você adicionaria a lógica para excluir o ticket
            alert('Ticket excluído com sucesso!');
            fecharModal();
            fecharPainelDetalhes(); // Fechar o painel de detalhes após excluir
        });
    }

    // Fechar o modal ao clicar fora dele
    if (modalExcluir) {
        modalExcluir.addEventListener('click', function(e) {
            if (e.target === modalExcluir) {
                fecharModal();
            }
        });
    }

    // Fechar o modal ao pressionar a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalExcluir && modalExcluir.classList.contains('ativo')) {
            fecharModal();
        }
    });

    // Adicionar funcionalidade ao botão de sair
    const botaoSair = document.querySelector('.botao-sair');
    if (botaoSair) {
        botaoSair.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja sair do sistema?')) {
               
            }
        });
    }



});





