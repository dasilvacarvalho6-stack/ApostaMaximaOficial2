let selecoes = [];

async function carregarJogos() {
  const res = await fetch("../data/api_jogos.json");
  const jogos = await res.json();
  const container = document.getElementById("jogos-container");
  container.innerHTML = "";
  jogos.forEach(jogo => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${jogo.timeA} x ${jogo.timeB}</h3>` +
      jogo.odds.map(odd =>
        `<button onclick="selecionar('${jogo.timeA} x ${jogo.timeB}', ${odd})">${odd}</button>`
      ).join(" ");
    container.appendChild(div);
  });
}

function selecionar(jogo, odd) {
  selecoes.push({ jogo, odd });
  atualizarBoletim();
}

function atualizarBoletim() {
  const ul = document.getElementById("selecoes");
  ul.innerHTML = selecoes.map(s => `<li>${s.jogo} @ ${s.odd}</li>`).join("");
  atualizarRetorno();
}

function atualizarRetorno() {
  const valor = parseFloat(document.getElementById("valorAposta").value || 0);
  const totalOdd = selecoes.reduce((acc, s) => acc * s.odd, 1);
  document.getElementById("retornoPotencial").innerText = (valor * totalOdd).toFixed(2);
}

function finalizarAposta() {
  document.getElementById("pagamento").style.display = "block";
}

function gerarCodigoPagamento() {
  document.getElementById("codigoPagamento").innerText = "Código: " + Math.random().toString(36).substr(2, 8).toUpperCase();
}

function gerarQRCodePix() {
  document.getElementById("codigoPagamento").innerText = "Pix: chavepix@apostamaxima.com";
}

function filtrarDia(dia) {
  // implementar quando integrar com API real
}

function filtrarEsporte(esporte) {
  // implementar quando integrar com API real
}

carregarJogos();
