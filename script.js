// Recupera as vendas armazenadas ou cria um array vazio
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

// Garante que todos os valores armazenados no localStorage sejam números
vendas = vendas.map(v => ({
    valor: parseFloat(v.valor),
    formaPagamento: v.formaPagamento
}));

function adicionarVenda() {
    let valorInput = document.getElementById("valor");
    let formaPagamento = document.getElementById("formaPagamento").value;
    let valor = parseFloat(valorInput.value);

    // Verifica se o valor da venda é válido
    if (!isNaN(valor) && valor > 0) {
        vendas.push({ valor, formaPagamento });
        salvarDados();
        atualizarTotais();
    } else {
        alert("Por favor, insira um valor válido para a venda.");
    }

    // Limpa o campo de entrada
    valorInput.value = "";
}

function atualizarTotais() {
    // Inicializa os totais corretamente
    let totais = {
        credito: 0,
        debito: 0,
        pix: 0,
        dinheiro: 0,
        totalGeral: 0,
    };

    // Atualiza os totais por forma de pagamento
    vendas.forEach((v) => {
        let valorVenda = parseFloat(v.valor);

        if (!isNaN(valorVenda)) {
            if (totais.hasOwnProperty(v.formaPagamento)) {
                totais[v.formaPagamento] += valorVenda;
            }
            totais.totalGeral += valorVenda;
        }
    });

    // Atualiza os totais na interface
    document.getElementById("total").textContent = totais.totalGeral.toFixed(2);
    document.getElementById("totalCredito").textContent = totais.credito.toFixed(2);
    document.getElementById("totalDebito").textContent = totais.debito.toFixed(2);
    document.getElementById("totalPix").textContent = totais.pix.toFixed(2);
    document.getElementById("totalDinheiro").textContent = totais.dinheiro.toFixed(2);
}

function zerarVendas() {
    if (confirm("Tem certeza que deseja apagar todas as vendas do dia?")) {
        vendas = [];
        salvarDados();
        atualizarTotais();
    }
}

function salvarDados() {
    localStorage.setItem("vendas", JSON.stringify(vendas));
}

// Atualiza os totais ao carregar a página
atualizarTotais();
