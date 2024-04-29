// Função que defini o tema de dia e noite com base no horário
dayNightTheme = () => {
  // Recebe a hora atual
  let date = new Date();
  let hour = date.getHours();

  // Verifica se é de dia (entre 7h e 19h) ou de noite
  if(hour >= 7 && hour < 19){
    // Definindo o fundo e a cor do texto como branco durante o dia
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
  else{
    // Definindo o fundo e a cor do texto como preto durante a noite
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }
}

// Adiciona evento para carregar a função 'dayNightTheme' quando a página é carregada
window.addEventListener('load', dayNightTheme);

// Adiciona evento ao campo de entrada para fazer uma solicitação quando a tecla 'Enter' é pressionada
document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    apiRequest();
});

// Adiciona evento ao botão de pesquisa para fazer uma solicitação quando é clicado
document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

// Função para fazer uma solicitação a 'API' do 'Unsplash' e carregar as imagens
apiRequest = () => {

  // Limpa o conteúdo da grade de imagens antes de carregar novas imagens
  document.querySelector("#grid").textContent = "";

  // Constrói a 'URL' da 'API' com base na entrada do usuário
  const url = 'https://api.unsplash.com/search/photos?query='+input.value+'&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

  // Faz a solicitação a API do 'Unsplash'
  fetch(url)

  // Manipula a resposta da solicitação
  .then(response => {
    // Verifica se a resposta é boa
    if (!response.ok) throw Error(response.statusText);
      // Converte a resposta para 'JSON'
      return response.json();
  })

   // Manipula os dados recebidos da 'API'
  .then(data => {
      // Carrega as imagens usando os dados recebidos
      loadImages(data);
  })

   // Manipula erros durante a solicitação
  .catch(error => console.log(error));   
}

// Função para carregar as imagens na grade
loadImages = (data) => {
  // Loop através dos resultados da API
  for(let i = 0;i < data.results.length;i++){
    // Cria um elemento div para cada imagem
    let image = document.createElement("div");
    image.className = "img";
    // Define o plano de fundo do elemento div como a URL da imagem
    image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
    // Adiciona um ouvinte de evento de clique duplo para abrir a imagem em uma nova guia
    image.addEventListener("dblclick", function(){
      window.open(data.results[i].links.download, '_blank');
    })
    // Adiciona o elemento div à grade de imagens
    document.querySelector("#grid").appendChild(image);
  }
}
