const FRONT = 'http://localhost:5500/';
const API = 'http://localhost:8081/api/funcionarios/';

window.onload = function (e) {
    listarFuncionarios();
};

function criarTabela(funcionarios) {
    const corpoTabela = document.querySelector('#funcionarios');
    corpoTabela.innerHTML = '';

    if (funcionarios) {
        const linhas = funcionarios.map(funcionario => {
            const tdId = document.createElement('td');
            tdId.innerHTML = funcionario.id;
    
            const tdNome = document.createElement('td');
            tdNome.innerHTML = funcionario.nome;
    
            const tdDependentes = document.createElement('td');
            if (funcionario.dependentes) {
                tdDependentes.innerHTML = funcionario.dependentes;
            } else {
                tdDependentes.innerHTML = '-';
            }

            const tdSalario = document.createElement('td');
            if (funcionario.salario) {
            tdSalario.innerHTML = funcionario.salario.toLocaleString('pt-BR', 
                                                            { 
                                                                currency: 'BRL', 
                                                                style: 'currency'
                                                            });
            } else {
                tdSalario.innerHTML = '-';
            }

            const tdNascimento = document.createElement('td');

            var data = dataFormatada(funcionario.nascimento);
            if (funcionario.nascimento) {
                tdNascimento.innerHTML = data;
            } else {
                tdNascimento.innerHTML = '-';
            }
            
            const acaoAlterar = document.createElement('a');
            acaoAlterar.innerHTML = 'Alterar';
            acaoAlterar.setAttribute('href', FRONT+ '/front-end/' + 'alterar.html?id=' + funcionario.id);
            acaoAlterar.classList.add('btn', 'btn-primary', 'me-2');
    
            const acaoExcluir = document.createElement('a');
            acaoExcluir.innerHTML = 'Excluir';
            acaoExcluir.classList.add('btn', 'btn-danger');

            acaoExcluir.addEventListener('click', function (event) {
                if (confirm('Tem certeza que deseja excluir?')) {
                    axios.delete(API + funcionario.id, { })
                        .then(res => {
                            //alert(res.data.mensagem);
                            listarFuncionarios();
                        });
                } 
            }, false);
    
            const tdAcoes = document.createElement('td');
            tdAcoes.appendChild(acaoAlterar);
            tdAcoes.appendChild(acaoExcluir);
    
            const tr = document.createElement('tr');
            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdDependentes);
            tr.appendChild(tdSalario);
            tr.appendChild(tdNascimento);
            tr.appendChild(tdAcoes);
    
            return tr;
        });
        
        linhas.forEach(linha => corpoTabela.appendChild(linha));
    }
}

async function listarFuncionarios() {
    const res = await axios.get(API, {});

    console.log('Resposta do servidor:', res);
    criarTabela(res.data);
}

function dataFormatada(d) {
    var data = new Date(d);
    var dia = ("0" + (data.getDate() + 1)).slice(-2) + '/';
    var mes = ("0" + (data.getMonth() + 1)).slice(-2) + '/';
    var ano = data.getFullYear();
    return [dia, mes, ano].join('');
}