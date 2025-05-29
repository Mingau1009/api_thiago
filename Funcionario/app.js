$(document).ready(function () {
    $(".botao-selecionar-matricula").on("click", function () {
        let {
            id,
            nome, 
            data_nascimento, 
            cpf,
            telefone, 
            endereco, 
            turno_disponivel,
            data_matricula,
            ativo
        } = $(this).data();

        $("#editar").modal("show");

        $("#formulario-editar input[name='id']").val(id);
        $("#formulario-editar input[name='nome']").val(nome);
        $("#formulario-editar input[name='data_nascimento']").val(data_nascimento);
        $("#formulario-editar input[name='cpf']").val(cpf);
        $("#formulario-editar input[name='telefone']").val(telefone);
        $("#formulario-editar input[name='endereco']").val(endereco);
        $("#formulario-editar input[name='turno_disponivel']").val(turno_disponivel);
        $("#formulario-editar input[name='data_matricula']").val(data_matricula);
        $("#formulario-editar select[name='ativo']").val(ativo);
    });
    document.querySelectorAll('.botao-deletar-funcionario').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const nome = this.getAttribute('data-nome');
        
        if(confirm(`Tem certeza que deseja excluir o funcionário ${nome}?`)) {
            // Fazer requisição AJAX para excluir
            fetch(`excluir_funcionario.php?id=${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert('Funcionário excluído com sucesso!');
                    // Recarregar a página ou remover a linha da tabela
                    location.reload();
                } else {
                    alert('Erro ao excluir funcionário: ' + data.message);
                }
            })
            .catch(error => {
                alert('Erro na requisição: ' + error);
            });
        }
    });
    // No seu app.js ou script principal
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há um token expirado na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('expirou')) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        localStorage.removeItem('token');
    }
    
    // Intercepta requisições AJAX para verificar erros 401
    $(document).ajaxComplete(function(event, xhr) {
        if (xhr.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '../Login/login.php?expirou=1';
        }
    });
});
});

    $(".botao-gerar-pdf").on("click", function(){
        window.print();
    });
});
