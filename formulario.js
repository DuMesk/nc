const tipoRequisicao = document.getElementById('tipoRequisicao');
  const opcoesExtras = document.getElementById('opcoesExtras');
  const listaItens = document.getElementById('listaItens');
  const descricaoServico = document.getElementById('descricaoServico');
  const subtipoRequisicao = document.getElementById('subtipoRequisicao');
  const quantidadeInput = document.getElementById('quantidadeInput');
  const addItemBtn = document.getElementById('addItemBtn');
  const itensAdicionados = document.getElementById('itensAdicionados');

  // Subtipos para mat.consumo e embalagens
  const subtipos = {
    'mat.consumo': [
      { value: 'resma', text: 'Resma' },
      { value: 'caneta', text: 'Caneta' },
      { value: 'grampo', text: 'Grampo' },
      { value: 'envelope', text: 'Envelope' },
      { value: 'detergente', text: 'Detergente' },
      { value: 'papel higienico', text: 'Papel higiênico' },
      { value: 'acucar', text: 'Açucar' }, 
      { value: 'cafe', text: 'Café' },
      { value: 'copo descartavel', text: 'Copo descartável' },
      { value: 'desinfetante', text: 'Desinfetante' },
      { value: 'luva latex', text: 'luva latex' }
    ],
    'embalagens': [
      { value: 'papelao', text: 'Papelão' },
      { value: 'filme stretch', text: 'Filme stretch' },
      { value: 'etiquetas', text: 'Etiquetas' }
    ]
  };

  // Mostrar opções dinâmicas com base na escolha do tipo de requisição
  tipoRequisicao.addEventListener('change', () => {
    const selectedValue = tipoRequisicao.value;

    // Mostrar opções dinâmicas para "mat.consumo" e "embalagens"
    if (subtipos[selectedValue]) {
      subtipoRequisicao.innerHTML = '';
      subtipos[selectedValue].forEach(option => {
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.textContent = option.text;
        subtipoRequisicao.appendChild(newOption);
      });
      opcoesExtras.style.display = 'block';
      listaItens.style.display = 'block'; // Mostrar a lista de itens
      descricaoServico.style.display = 'none'; // Ocultar descrição de serviço
    } else {
      opcoesExtras.style.display = 'none';
      listaItens.style.display = 'none';
      descricaoServico.style.display = 'block'; // Mostrar descrição de serviço para outros casos
    }
  });

  // Adicionar item à lista
  addItemBtn.addEventListener('click', () => {
    const subtipo = subtipoRequisicao.value;
    const subtipoText = subtipoRequisicao.options[subtipoRequisicao.selectedIndex].text;
    const quantidade = quantidadeInput.value;

    if (subtipo && quantidade > 0) {
      // Criar um novo item na lista
      const listItem = document.createElement('li');
      listItem.textContent = `${subtipoText} - ${quantidade} unidade(s)`;
      
      // Adicionar botão de remoção ao item
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.style.marginLeft = '10px';
      removeBtn.addEventListener('click', () => {
        listItem.remove(); // Remover o item da lista
      });

      listItem.appendChild(removeBtn);
      itensAdicionados.appendChild(listItem);

      // Resetar os campos
      subtipoRequisicao.selectedIndex = 0;
      quantidadeInput.value = '1';
    } else {
      alert('Por favor, selecione um subtipo e insira uma quantidade válida.');
    }
  });

  const filialSelect = document.getElementById('filial');
  const compradorContainer = document.getElementById('compradorContainer');
  const compradorInput = document.getElementById('comprador');

  // Função para atualizar o comprador responsável com base na filial
  filialSelect.addEventListener('change', () => {
    const filial = filialSelect.value;
    
    if (filial === 'Brasília' || filial === 'Goiânia' || filial === 'Maranhão') {
      compradorInput.value = 'Margarete';  // Definir comprador para essas filiais
      compradorContainer.style.display = 'block';  // Exibir campo do comprador
    } else if (filial === 'Bahia' || filial === 'Minas Gerais' || filial === 'Pará') {
      compradorInput.value = 'Jonatã';  // Definir comprador para essas filiais
      compradorContainer.style.display = 'block';  // Exibir campo do comprador
    } else {
      compradorContainer.style.display = 'none';  // Ocultar campo do comprador se filial não se encaixar
    }
  });

  