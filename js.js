const limite = 200;

        function contar() {
            let texto = document.getElementById("texto").value;
            let caracteres = texto.length;
            let palavras = texto.trim().split(/\s+/).filter(word => word !== "").length;
            document.getElementById("contador").textContent = caracteres;
            document.getElementById("contadorPalavras").textContent = palavras;
            document.getElementById("mensagem").textContent = caracteres >= limite ? "Limite de caracteres atingido!" : "";
            document.getElementById("mensagem").className = caracteres >= limite ? "alerta" : "";
            localStorage.setItem("texto", texto);
        }

        function alternarModo() {
            document.body.classList.toggle("modo-escuro");
        }

        function limparTexto() {
            document.getElementById("texto").value = "";
            contar();
            localStorage.removeItem("texto");
        }

        window.onload = function() {
            let textoSalvo = localStorage.getItem("texto");
            if (textoSalvo) {
                document.getElementById("texto").value = textoSalvo;
                contar();
            }
        }