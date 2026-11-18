let tarefas = [];   // cada item: { texto: "...", concluida: false }

let filtroAtual = "todas";

const lista = document.querySelector("#lista-tarefas");
const contador = document.querySelector("#contador");
const aplicarFiltro = () => {
  if (filtroAtual === "pendentes") return tarefas.filter((t) => !t.concluida);
  if (filtroAtual === "concluidas") return tarefas.filter((t) => t.concluida);
  return tarefas;
};

 const renderizar = () => {
  lista.innerHTML = "";

  const visiveis = aplicarFiltro();
  visiveis.forEach((tarefa) => {

    const li = document.createElement("li");
    li.textContent = tarefa.texto;
    if (tarefa.concluida) li.classList.add("concluida");
    li.addEventListener("click", () => {
      tarefa.concluida = !tarefa.concluida;
      renderizar();
    });
    lista.appendChild(li);

const btnRemover = document.createElement("button");
btnRemover.textContent = "✕";
btnRemover.classList.add("btn-remover");
btnRemover.addEventListener("click", (e) => {
  e.stopPropagation();          // impede que o clique também "conclua" a tarefa
 tarefas.splice(tarefas.indexOf(tarefa), 1);    // remove 1 item na posição indice
  renderizar();
});
li.appendChild(btnRemover);

  });

  const pendentes = tarefas.filter((t) => !t.concluida).length;
  contador.textContent = `${pendentes} pendente(s) de ${tarefas.length}`;
};

    const campo = document.querySelector("#campo-tarefa");
const btnAdicionar = document.querySelector("#btn-adicionar");

const adicionar = () => {
  const texto = campo.value.trim();
  if (texto === "") return;                          // guard clause

  tarefas.push({ texto, concluida: false });         // altera o ESTADO
  campo.value = "";
  campo.focus();
  renderizar();                                      // redesenha
};

btnAdicionar.addEventListener("click", adicionar);
campo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionar();
});

const botoesFiltro = document.querySelectorAll(".filtros button");

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;
    botoesFiltro.forEach((b) => b.classList.toggle("ativo", b === botao));
    renderizar();
  });
});

const btnLimpar = document.querySelector("#btn-limpar");

const limparConcluidas = () => {
  tarefas = tarefas.filter((t) => !t.concluida);   // fica só quem NÃO está concluída
  renderizar();
};

btnLimpar.addEventListener("click", limparConcluidas);
renderizar();   // primeira renderização (lista vazia + contador)

   
    
