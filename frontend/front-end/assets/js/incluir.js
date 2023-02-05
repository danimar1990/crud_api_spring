let idForm, nomeForm, dependentesForm, salarioForm, nascimentoForm;
const sURL = 'http://localhost:8081/api/funcionarios/';

window.onload = function (e) {
    idForm = document.querySelector('#iID');
    nomeForm = document.querySelector('#iNome');
    dependentesForm = document.querySelector('#iDependentes');
    salarioForm = document.querySelector('#iSalario');
    nascimentoForm = document.querySelector('#iNascimento');
};

async function incluirFuncionario() {
    const id = idForm.value;
    const nome = nomeForm.value; 
    const dependentes = dependentesForm.value;
    const salario = salarioForm.value;
    const nascimento = nascimentoForm.value;

    axios.post(sURL, { id, nome, dependentes, salario, nascimento })
        .then(res => {
            res.data.toString = function() {
                return 'ID: ' + this.id + '\nNome: ' + this.nome +
                    '\nDependentes: ' + this.dependentes + '\nSalário: ' + this.salario +
                    '\nNascimento:' + this.nascimento;
                }

            alert(res.data.toString());
            console.log(res.data);
            setTimeout(() => window.location.href = '/', 100);
        })
        .catch(res => console.log(res.response.data));
}