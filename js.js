const limite = 200;
let intervaloAutosave;

// Contador principal
function contar() {
    let texto = document.getElementById("texto").value;
    let caracteres = texto.length;
    let palavras = texto.trim().split(/\s+/).filter(word => word !== "").length;
    let linhas = texto.split(/\n/).length;
    let tempoLeitura = Math.ceil(palavras / 200); // média de 200 palavras por minuto

    document.getElementById("contador").textContent = caracteres;
    document.getElementById("contadorPalavras").textContent = palavras;
    document.getElementById("contadorLinhas").textContent = linhas;
    document.getElementById("tempoLeitura").textContent = tempoLeitura + " min";

    document.getElementById("mensagem").textContent = caracteres >= limite ? "Limite de caracteres atingido!" : "";
    document.getElementById("mensagem").className = caracteres >= limite ? "alerta" : "";

    localStorage.setItem("texto", texto);
    atualizarUltimaEdicao();
}

// Alternância de modo claro/escuro
function alternarModo() {
    document.body.classList.toggle("modo-escuro");
}

// Limpa o conteúdo
function limparTexto() {
    document.getElementById("texto").value = "";
    contar();
    localStorage.removeItem("texto");
    document.getElementById("ultimaEdicao").textContent = "";
}

// Copiar para a área de transferência
function copiarTexto() {
    const textarea = document.getElementById("texto");
    textarea.select();
    document.execCommand("copy");
    alert("Texto copiado!");
}

// Atualiza a info de última edição
function atualizarUltimaEdicao() {
    const agora = new Date();
    const horario = agora.toLocaleTimeString();
    document.getElementById("ultimaEdicao").textContent = "Última edição às " + horario;
    localStorage.setItem("ultimaEdicao", horario);
}

// Restaura dados do localStorage ao carregar
window.onload = function() {
    let textoSalvo = localStorage.getItem("texto");
    let ultima = localStorage.getItem("ultimaEdicao");

    if (textoSalvo) {
        document.getElementById("texto").value = textoSalvo;
        contar();
    }
    if (ultima) {
        document.getElementById("ultimaEdicao").textContent = "Última edição às " + ultima;
    }

    // Inicia salvamento automático
    intervaloAutosave = setInterval(contar, 5000); // a cada 5 segundos
}
