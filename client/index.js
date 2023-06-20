import bot from './assets/bot.svg';
import user from './assets/user.svg';

let userArr = [];

const formIa = document.querySelector('#formIa');
const chatContainer = document.querySelector('#chat_container');

//Control del ThemeMode
const toggle = document.getElementById('viewMode');
//Inputs
const inputName = document.querySelector("#inputName");
const inputEmail = document.querySelector("#inputEmail");
const genre = getGenre();
const artist1 = document.querySelector("#artist1");
const record1 = document.querySelector("#record1");
const artist2 = document.querySelector("#artist2");
const record2 = document.querySelector("#record2");
const artist3 = document.querySelector("#artist3");
const record3 = document.querySelector("#record3");
const artist4 = document.querySelector("#artist4");
const record4 = document.querySelector("#record4");
const artist5 = document.querySelector("#artist5");
const record5 = document.querySelector("#record5");
//Form para ingresar usuario, género, artista y discos favoritos. 
const formUser = document.querySelector("#formUser");
//Manejo de pantalla de opciones
const recommendRecord = document.querySelector("#recommendRecord");//Botón para recomendar discos
//Botones
const goBackBtn3 = document.querySelector("#goBackBtn3");//Botón para volver de la pantalla de recomendar
const goBackBtn = document.querySelector("#goBackBtn");//Botón para retroceder de la sección de favoritos
const backBtn = document.querySelector("#backBtn");// Botón para retroceder de la sección para modificar artistas
const changeArtists = document.querySelector("#changeArtists");//Botón para modificar los artistas favoritos
    //Botones para reemplazar artistas y discos
const replaceBtn1 = document.querySelector("#replaceBtn1");//Botón para reempalzar el artist1
const replaceBtn2 = document.querySelector("#replaceBtn2");//Botón para reemplazar el artist2
const replaceBtn3 = document.querySelector("#replaceBtn3");//Botón para reemplazar el artist3
const replaceBtn4 = document.querySelector("#replaceBtn4");//Botón para reemplazar el artist4
const replaceBtn5 = document.querySelector("#replaceBtn5");//Botón para reemplazar el artist5
    //Botones sección recommend
const like = document.querySelector("#like");//Botón de like en la sección recommend
const dislike = document.querySelector("#dislike");//Botón de dislike en la sección recommend
const recommendRandom = document.querySelector("#recommendRandom");//Botón para recomendar disco aleatorio
const clearData = document.querySelector("#clearData");//Botón para borrar los datos del usuario
const exit = document.querySelector("#exit");//Botón para salir de la aplicación
//Sección para recomendar discos
const recommendedRecordSection = document.querySelector('#recommendedRecordSection');
//Sección favoritos
const favoritesList = document.querySelector("#favoritesList");
const favoriteArtist1 = document.querySelector("#favoriteArtist1");
const favoriteArtist2 = document.querySelector("#favoriteArtist2");
const favoriteArtist3 = document.querySelector("#favoriteArtist3");
const favoriteArtist4 = document.querySelector("#favoriteArtist4");
const favoriteArtist5 = document.querySelector("#favoriteArtist5");
const favoriteRecord1 = document.querySelector("#favoriteRecord1");
const favoriteRecord2 = document.querySelector("#favoriteRecord2");
const favoriteRecord3 = document.querySelector("#favoriteRecord3");
const favoriteRecord4 = document.querySelector("#favoriteRecord4");
const favoriteRecord5 = document.querySelector("#favoriteRecord5");
//Sección para modificar Artistas favoritos
    //Muestra los artistas favoritos
const showFavoriteArtist1 = document.querySelector("#showFavoriteArtist1");
const showFavoriteArtist2 = document.querySelector("#showFavoriteArtist2");
const showFavoriteArtist3 = document.querySelector("#showFavoriteArtist3");
const showFavoriteArtist4 = document.querySelector("#showFavoriteArtist4");
const showFavoriteArtist5 = document.querySelector("#showFavoriteArtist5"); 
    //Muestra los discos favoritos
const showFavoriteRecord1 = document.querySelector("#showFavoriteRecord1");
const showFavoriteRecord2 = document.querySelector("#showFavoriteRecord2");
const showFavoriteRecord3 = document.querySelector("#showFavoriteRecord3");
const showFavoriteRecord4 = document.querySelector("#showFavoriteRecord4");
const showFavoriteRecord5 = document.querySelector("#showFavoriteRecord5"); 
    //ID para modificar los artistas y discos faoritos
const inputNewArtist1 = document.querySelector("#inputNewArtist1");
const inputNewArtist2 = document.querySelector("#inputNewArtist2");
const inputNewArtist3 = document.querySelector("#inputNewArtist3");
const inputNewArtist4 = document.querySelector("#inputNewArtist4");
const inputNewArtist5 = document.querySelector("#inputNewArtist5");
const inputNewRecord1 = document.querySelector("#inputNewRecord1");
const inputNewRecord2 = document.querySelector("#inputNewRecord2");
const inputNewRecord3 = document.querySelector("#inputNewRecord3");
const inputNewRecord4 = document.querySelector("#inputNewRecord4");
const inputNewRecord5 = document.querySelector("#inputNewRecord5");



//Modifica el viewMode
const savedViewMode = localStorage.getItem('viewMode'); //Obtiene el valor de viewMode del local storage
if (savedViewMode) {
  document.body.classList.add(savedViewMode);//Verifica el valor guardado de viewMode y lo agrega a la class del body
}
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light'); //Ejecuta el botón para modificar el viewMode
  const currentViewMode = document.body.classList.contains('light') ? 'light' : 'dark';//verifica y establece el viewMode de light a dark o viceversa
  localStorage.setItem('viewMode', currentViewMode);//Guarda en el localStorage el último viewMode elegido
});

//Chequea si hay un array guardado en el localStorage, Si lo hay comienza la app desde el menú de acciones. 
const savedUser = localStorage.getItem('userArr');
userArr = savedUser ? JSON.parse(savedUser) : [];

if (userArr.length > 0) {
  userInput.classList.add('disable');
  userActions();
} else {
  userInput.classList.remove('disable');
}

//Sección para manejar el formulario inicial

formUser.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = {
    name: inputName.value,
    email: inputEmail.value,
    genre: getGenre(),
    artist1: artist1.value,
    record1: record1.value,
    artist2: artist2.value,
    record2: record2.value,
    artist3: artist3.value,
    record3: record3.value,
    artist4: artist4.value,
    record4: record4.value,
    artist5: artist5.value,
    record5: record5.value,
  };
  
  createUser(user);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: "let's listen to music!"
  })
});


//Función para para conseguir el genre del listado
function getGenre () {
const genres = document.getElementsByName("flexRadioDefault");
for (let i = 0; i < genres.length; i++) {
  if (genres[i].checked){
    return genres[i].value;
  }
}
return "";
}
//función para pushear el objeto user al array userArr
function createUser(user){

userArr = [user];
userInput.classList.add('disable');
localStorage.setItem('userArr', JSON.stringify(userArr));

userActions();
}

//Control de la pantalla de acciones a realizar del usuario
function userActions(){
actions.classList.remove('disable');
}


recommendRecord.addEventListener('click', () => {
actions.classList.add('disable')
recommendedRecordSection.classList.remove('disable')
handleSubmit();

})


//Sección para manejar la interacción con la IA

let loadInterval;

    //Función para generar el efecto de los '.' cuando carga una respuesta.
function loader (element) {
  element.textContent = '';

  loadInterval = setInterval (() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)
}
    //Función para simular el efecto de escribir cuando la IA da una respuesta. 
function typeText (element, text){
  let index = 0;

  let interval = setInterval (() => {
    if(index < text.length) {
      element.innerHTML += text.charAt(index)
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}
    //Función para generar un id único. Combina la marca de tiempo, con un número random y una cadena hexadecimal.
function generatUniqueId() {
  const timeStamp = Date.now();
  const randomNumer = Math.random();
  const hexadecimalString = randomNumer.toString(16);

  return `id-${timeStamp}-${hexadecimalString}`;
}
    //función que genera y retorna un html para mostrar la conversación con el chat. 
function chatStripe (isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'} ">
      <div class="chat">
        <div class="profile">
          <img
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>

    `
  )
}
    //
const handleSubmit = async (e) => {
  e.preventDefault();

  //Funcion para generar el prompt
  const favoriteRecords = {
    artist1: userArr.find(item => item.hasOwnProperty('artist1')).artist1,
    artist2: userArr.find(item => item.hasOwnProperty('artist2')).artist2,
    artist3: userArr.find(item => item.hasOwnProperty('artist3')).artist3,
    artist4: userArr.find(item => item.hasOwnProperty('artist4')).artist4,
    artist5: userArr.find(item => item.hasOwnProperty('artist5')).artist5,

    record1: userArr.find(item => item.hasOwnProperty('record1')).record1,
    record2: userArr.find(item => item.hasOwnProperty('record2')).record2,
    record3: userArr.find(item => item.hasOwnProperty('record3')).record3,
    record4: userArr.find(item => item.hasOwnProperty('record4')).record4,
    record5: userArr.find(item => item.hasOwnProperty('record5')).record5
  };
  const favoriteGenre = userArr.find(item => item.genre)?.genre;
  
  // Genera el prompt
  const prompt = `
  These are my 5 favorite records:
  ${favoriteRecords.artist1} - ${favoriteRecords.record1}
  ${favoriteRecords.artist2} - ${favoriteRecords.record2}
  ${favoriteRecords.artist3} - ${favoriteRecords.record3}
  ${favoriteRecords.artist4} - ${favoriteRecords.record4}
  ${favoriteRecords.artist5} - ${favoriteRecords.record5}
  This is my favorite genre: ${favoriteGenre}

  Recommend one record to listen to, based on my favorite records
  Only answer with the name of the artist and record.
  NO EXTRA TEXT.
  `;  

  const data = new FormData(formIa);

  //ingreso del usuario
  chatContainer.innerHTML += chatStripe(false, data.get('prompt') || ' ');

  formIa.reset();

  //respuesta del bot
  const uniqueId = generatUniqueId();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch datos del servidor
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  })
  console.log(prompt);
console.log(response);
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something is wrong";

    alert(err);
    
  }
}

formIa.addEventListener('submit', handleSubmit); //ejecuta el submit
formIa.addEventListener('keyup', (e) => {//ejecuta el submit con un enter
  if (e.keyCode === 13){
    handleSubmit(e);
  }
})

//Control del botón like
const handleLike = async (e) => {
  e.preventDefault();

  const prompt = `I loved that record! Recommend me another record based on my 5 favorite records!`;  
  const data = new FormData(formIa);

  //ingreso de data del usuario
  chatContainer.innerHTML += chatStripe(false, data.get('prompt') || ' ');

  formIa.reset();

  //respuesta del bot
  const uniqueId = generatUniqueId();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch datos del servidor
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  })
  console.log(prompt);
console.log(response);
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something is wrong";

    alert(err);
    
  }
}
like.addEventListener('click', handleLike);

//Control del botón dislike
const handleDislike = async (e) => {
  e.preventDefault();

  const prompt = `I didn't liked that record! Recommend me another record yo haven't recommend me yet.`;  
  const data = new FormData(formIa);

  //ingreso del usuario
  chatContainer.innerHTML += chatStripe(false, data.get('prompt') || ' ');

  formIa.reset();

  //respuesta del bot
  const uniqueId = generatUniqueId();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch datos del servidor
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  })
  console.log(prompt);
console.log(response);
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something is wrong";

    alert(err);
    
  }
}
dislike.addEventListener('click', handleDislike);

//Control del botón Surprise Me!
const handleSurpriseMe = async (e) => {
  e.preventDefault();
  const favoriteGenre = userArr.find(item => item.genre)?.genre;
  const prompt = `My favorite genre is ${favoriteGenre}. Recommend me one record to listen to based on my favorite genre`;
  const data = new FormData(formIa);

  //ingreso de data del usuario
  chatContainer.innerHTML += chatStripe(false, data.get('prompt') || ' ');

  formIa.reset();

  //respuesta del bot
  const uniqueId = generatUniqueId();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch datos del servidor
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt
    })
  })
  console.log(prompt);
console.log(response);
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something is wrong";

    alert(err);
    
  }
}
recommendRandom.addEventListener('click', handleSurpriseMe);

//botón para volver de Recommend Record
goBackBtn3.addEventListener('click', () => { 
  actions.classList.remove('disable')
recommendedRecordSection.classList.add('disable')
})

//Control de la sección que muestra el Top 5
  //Muestra nuestra lista de favoritos. Artist & Records
  favoritesList.addEventListener('click', () => {
    const storedUserArr = JSON.parse(localStorage.getItem('userArr'));
    actions.classList.add('disable');
    favorites.classList.remove('disable');
    
    favoriteArtist1.textContent = `${storedUserArr[0].artist1}`
    favoriteArtist2.textContent = `${storedUserArr[0].artist2}`
    favoriteArtist3.textContent = `${storedUserArr[0].artist3}`
    favoriteArtist4.textContent = `${storedUserArr[0].artist4}`
    favoriteArtist5.textContent = `${storedUserArr[0].artist5}`
    
    favoriteRecord1.textContent = `${storedUserArr[0].record1}`
    favoriteRecord2.textContent = `${storedUserArr[0].record2}`
    favoriteRecord3.textContent = `${storedUserArr[0].record3}`
    favoriteRecord4.textContent = `${storedUserArr[0].record4}`
    favoriteRecord5.textContent = `${storedUserArr[0].record5}`
    
    goBackBtn.addEventListener('click', (event) => {
      event.preventDefault();
      actions.classList.remove('disable');
      favorites.classList.add('disable');
    
    })  
  })

  //Control de la sección que modifica el listado del Top 5
  //Muestra los artistas y discos favoritos y permite modificarlos. 
changeArtists.addEventListener('click', () => {
  const storedUserArr = JSON.parse(localStorage.getItem('userArr'));
  actions.classList.add('disable');
  newArtists.classList.remove('disable');
  showFavoriteArtist1.textContent = `${storedUserArr[0].artist1}`
  showFavoriteArtist2.textContent = `${storedUserArr[0].artist2}`
  showFavoriteArtist3.textContent = `${storedUserArr[0].artist3}`
  showFavoriteArtist4.textContent = `${storedUserArr[0].artist4}`
  showFavoriteArtist5.textContent = `${storedUserArr[0].artist5}`
  
  showFavoriteRecord1.textContent = `${storedUserArr[0].record1}`
  showFavoriteRecord2.textContent = `${storedUserArr[0].record2}`
  showFavoriteRecord3.textContent = `${storedUserArr[0].record3}`
  showFavoriteRecord4.textContent = `${storedUserArr[0].record4}`
  showFavoriteRecord5.textContent = `${storedUserArr[0].record5}`

  inputNewArtist1.value = '';
  inputNewRecord1.value = '';
  inputNewArtist2.value = '';
  inputNewRecord2.value = '';
  inputNewArtist3.value = '';
  inputNewRecord3.value = '';
  inputNewArtist4.value = '';
  inputNewRecord4.value = '';
  inputNewArtist5.value = '';
  inputNewRecord5.value = '';

  replace1();
  replace2();
  replace3();
  replace4();
  replace5();
  backBtn.addEventListener('click', (event) => {
    event.preventDefault();
    actions.classList.remove('disable');
    newArtists.classList.add('disable');
  
  })  
})

  //Funciones para modificar artistas y records
    //Modifica línea 1
function replace1(){
  replaceBtn1.addEventListener('click', () => {
    const newArtist1 = inputNewArtist1.value;
    const newRecord1 = inputNewRecord1.value;
    let storedUserArr = JSON.parse(localStorage.getItem('userArr'));
    if (Array.isArray(storedUserArr) && storedUserArr.length > 0) {
      storedUserArr[0].artist1 = newArtist1;
      storedUserArr[0].record1 = newRecord1;
      localStorage.setItem('userArr', JSON.stringify(storedUserArr));
      showFavoriteArtist1.textContent = newArtist1;
      showFavoriteRecord1.textContent = newRecord1;      
    }
  })
}
    //Modifica línea 2
function replace2(){
  replaceBtn2.addEventListener('click', () => {
    const newArtist2 = inputNewArtist2.value;
    const newRecord2 = inputNewRecord2.value;
    const storedUserArr = JSON.parse(localStorage.getItem('userArr'));
    storedUserArr[0].artist2 = newArtist2;
    storedUserArr[0].record2 = newRecord2;
    localStorage.setItem('userArr', JSON.stringify(storedUserArr));
    showFavoriteArtist2.textContent = `${newArtist2}`;
    showFavoriteRecord2.textContent = `${newRecord2}`;
    
  })
}
    //Modifica línea 3
function replace3(){
  replaceBtn3.addEventListener('click', () => {
    const newArtist3 = inputNewArtist3.value;
    const newRecord3 = inputNewRecord3.value;
    const storedUserArr = JSON.parse(localStorage.getItem('userArr'));
    storedUserArr[0].artist3 = newArtist3;
    storedUserArr[0].record3 = newRecord3;
    localStorage.setItem('userArr', JSON.stringify(storedUserArr));
    showFavoriteArtist3.textContent = `${newArtist3}`;
    showFavoriteRecord3.textContent = `${newRecord3}`;
  })
}
    //Modifica línea 4
function replace4(){
  replaceBtn4.addEventListener('click', () => {
    const newArtist4 = inputNewArtist4.value;
    const newRecord4 = inputNewRecord4.value;
    const storedUserArr = JSON.parse(localStorage.getItem('userArr'));
    storedUserArr[0].artist4 = newArtist4;
    storedUserArr[0].record4 = newRecord4;
    localStorage.setItem('userArr', JSON.stringify(storedUserArr));
    showFavoriteArtist4.textContent = `${newArtist4}`;
    showFavoriteRecord4.textContent = `${newRecord4}`;
   
  })
}
    //Modifica línea 5
function replace5(){
  replaceBtn5.addEventListener('click', () => {
    const newArtist5 = inputNewArtist5.value;
    const newRecord5 = inputNewRecord5.value;
    const storedUserArr = JSON.parse(localStorage.getItem('userArr'));
    storedUserArr[0].artist5 = newArtist5;
    storedUserArr[0].record5 = newRecord5;
    localStorage.setItem('userArr', JSON.stringify(storedUserArr));
    showFavoriteArtist5.textContent = `${newArtist5}`;
    showFavoriteRecord5.textContent = `${newRecord5}`;
    
  })
}

//Borra el userArr
clearData.addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('userArr');
    formUser.reset();
    actions.classList.add('disable');
    userInput.classList.remove('disable');
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  // localStorage.removeItem();
  // formUser.reset();
  // actions.classList.add('disable');
  // userInput.classList.remove('disable');
});

//Salida de la app.
exit.addEventListener("click", () => {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, exit!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Bye bye',
        
      )
      window.close();
    }
  })
  // window.close();  

});
