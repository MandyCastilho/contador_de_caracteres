const limite = 200;
let intervaloAutosave;

// Contador principal
function contar() {
    const texto = document.getElementById("texto").value;
    const caracteres = texto.length;
    const palavras = texto.trim().split(/\s+/).filter(word => word !== "").length;
    const linhas = texto.split(/\n/).length;
    const tempoLeitura = palavras < 40 
        ? "menos de 1 min" 
        : Math.ceil(palavras / 200) + " min";

    document.getElementById("contador").textContent = caracteres;
    document.getElementById("contadorPalavras").textContent = palavras;
    document.getElementById("contadorLinhas").textContent = linhas;
    document.getElementById("tempoLeitura").textContent = tempoLeitura;

    const mensagem = document.getElementById("mensagem");
    if (caracteres >= limite) {
        mensagem.textContent = "Limite de caracteres atingido!";
        mensagem.className = "alerta";
    } else {
        mensagem.textContent = "";
        mensagem.className = "";
    }

    localStorage.setItem("texto", texto);
    atualizarUltimaEdicao();
}

// Limpa o conteúdo
function limparTexto() {
    document.getElementById("texto").value = "";
    contar();
    localStorage.removeItem("texto");
    document.getElementById("ultimaEdicao").textContent = "";
}

// Copiar para a área de transferência (moderno)
function copiarTexto() {
    const texto = document.getElementById("texto").value;
    navigator.clipboard.writeText(texto)
        .then(() => alert("Texto copiado!"))
        .catch(err => alert("Erro ao copiar: " + err));
}

// Atualiza a info de última edição
function atualizarUltimaEdicao() {
    const agora = new Date();
    const horario = agora.toLocaleTimeString();
    document.getElementById("ultimaEdicao").textContent = "Última edição às " + horario;
    localStorage.setItem("ultimaEdicao", horario);
}

// Restaura dados do localStorage ao carregar
window.onload = function () {
    const textoSalvo = localStorage.getItem("texto");
    const ultima = localStorage.getItem("ultimaEdicao");

    if (textoSalvo) {
        document.getElementById("texto").value = textoSalvo;
        contar();
    }
    if (ultima) {
        document.getElementById("ultimaEdicao").textContent = "Última edição às " + ultima;
    }

    // Inicia salvamento automático a cada 5 segundos
    intervaloAutosave = setInterval(contar, 5000);
}

// Alternância de modo claro/escuro
function alternarModo() {
    document.body.classList.toggle("modo-escuro");
}


