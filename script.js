function calcular() {
    // Captura os valores dos campos
    var capital = Number(document.getElementById("capital").value);
    var taxaPorcentagem = Number(document.getElementById("juros").value);
    var tempoInput = Number(document.getElementById("tempo").value);
    var periodoTempo = document.getElementById("periodoTempo").value;
    var tipo = document.getElementById("tipo").value;
    var aporte = Number(document.getElementById("aporte").value);
    
    // Verifica se os campos obrigatórios estão preenchidos
    if (!capital || !taxaPorcentagem || !tempoInput) {
        document.getElementById("resultado").innerHTML = `
            <div class="error-card">Preencha todos os campos!</div>
        `;
        return;
    }

    // CONVERSÃO: Se o usuário escolheu Anos, multiplica o tempo por 12 para calcular em meses
    var tempoEmMeses = periodoTempo === "anos" ? tempoInput * 12 : tempoInput;

    // Converte a taxa de porcentagem para decimal
    var i = taxaPorcentagem / 100;
    var montante = 0;
    var totalInvestido = 0;

    if (tipo === "simples") {
        // Juros Simples usando o tempo convertido em meses
        var totalJuros = capital * i * tempoEmMeses;
        montante = capital + totalJuros;
        totalInvestido = capital;
    } else {
        // Juros Compostos usando o tempo convertido em meses
        montante = capital;
        totalInvestido = capital;

        for (var mes = 1; mes <= tempoEmMeses; mes++) {
            montante = montante * (1 + i);
            montante += aporte;
            totalInvestido += aporte;
        }
    }

    var totalJuros = montante - totalInvestido;

    // Exibe o resultado formatado
    document.getElementById("resultado").innerHTML = `
        <div class="result-card">
            <p><strong>Resultados do cálculo (${tipo === "simples" ? "Juros Simples" : "Juros Compostos"}):</strong></p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 12px; margin-top: 8px;">
            <p>Tempo total calculado: <strong>${tempoEmMeses} meses</strong></p>
            <p>Total Investido (Sem Juros): <strong>R$ ${totalInvestido.toFixed(2)}</strong></p>
            <p>Total em Juros Ganhos: <strong>R$ ${totalJuros.toFixed(2)}</strong></p>
            <p class="highlight">Total Acumulado (Montante): <strong>R$ ${montante.toFixed(2)}</strong></p>
        </div>
    `;
}

// Controla o comportamento visual e botões
document.addEventListener("DOMContentLoaded", () => {
    const selectTipo = document.getElementById("tipo");
    const containerAporte = document.getElementById("container-aporte");
    const botaoLimpar = document.getElementById("btn-limpar");

    selectTipo.addEventListener("change", () => {
        if (selectTipo.value === "composto") {
            containerAporte.style.display = "block";
        } else {
            containerAporte.style.display = "none";
            document.getElementById("aporte").value = "0";
        }
    });

    botaoLimpar.addEventListener("click", () => {
        document.getElementById("capital").value = "";
        document.getElementById("juros").value = "";
        document.getElementById("tempo").value = "";
        document.getElementById("aporte").value = "0";
        document.getElementById("periodoTempo").value = "meses";
        selectTipo.value = "simples";
        containerAporte.style.display = "none";
        document.getElementById("resultado").innerHTML = "";
    });
});
