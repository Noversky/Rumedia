// Запись данных
function writeData() {
  set(ref(database, 'users/user1'), {
    name: 'Иван',
    age: 30
  });
}

// Чтение данных
function readData() {
  const userRef = ref(database, 'users/user1');
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    // Обновляйте интерфейс здесь
  });
}
// Массивы данных
const channels = [];
const videos = [];
let currentChannelId = null;

// Обновление списка каналов в селекторе
function updateChannelSelect() {
  const select = document.getElementById('channelSelect');
  select.innerHTML = '<option value="">-- Выберите канал --</option>';
  
  channels.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = c.name;
    select.appendChild(option);
  });
}

// Создание канала
document.getElementById('createChannelForm').addEventListener('submit', e => {
  e.preventDefault();
  
  const nameInput = document.getElementById('channelName');
  const name = nameInput.value.trim();
  
  if (!name) {
    alert('Введите название канала');
    return;
  }

  // Создаем новый канал
  const newChannel = {
    id: Date.now(),
    name,
  };
  
  channels.push(newChannel);
  
  // Обновляем список каналов
  updateChannelSelect();
  
  // Сообщение
  document.getElementById('channelMessage').textContent = `Канал "${name}" создан!`;
  
  // Очистка поля
  nameInput.value = '';

});

// Обработка выбора канала
document.getElementById('channelSelect').addEventListener('change', e => {
  currentChannelId = e.target.value ? Number(e.target.value) : null;
});

// Загрузка видео
document.getElementById('videoUploadForm').addEventListener('submit', e => {
  e.preventDefault();

 if (!currentChannelId) {
   alert('Создайте или выберите канал перед загрузкой видео.');
   return;
 }

 const fileInput = document.getElementById('videoFile');
 const title = document.getElementById('videoTitle').value.trim();
 const desc = document.getElementById('videoDescription').value.trim();

 if (!fileInput.files[0]) {
   alert('Выберите файл.');
   return;
 }

 const url = URL.createObjectURL(fileInput.files[0]);
 const videoID = Date.now();

 const newVideo = {
   id: videoID,
   title,
   desc,
   url,
   likes: {},
   countLikes:0,
   channelId: currentChannelId,
 };

 videos.push(newVideo);
 renderVideos();

 // Очистка формы
 document.getElementById('videoUploadForm').reset();
});

// Отрисовка видео
function renderVideos() {
 const container = document.getElementById('videosContainer');
 container.innerHTML='';

 for (let v of videos) {
   // Проверка по выбранному каналу (если выбран)
   if (currentChannelId && v.channelId !== currentChannelId) continue;

   // Получение названия канала
   let channelName='Общий раздел';
   if (v.channelId) {
     const ch=channels.find(c=>c.id===v.channelId);
     if (ch) channelName=ch.name;
   }

   const div=document.createElement('div');
   div.className='video';

   div.innerHTML=`
     <h4>${v.title}</h4>
     <p><strong>Канал:</strong> ${channelName}</p>
     <p>${v.desc}</p>
     <video src="${v.url}" width=400 controls></video><br/>
     <button class='like-btn' data-id='${v.id}'>👍</button> 
     <span class='like-count'>${v.countLikes}</span> лайков
     `;

   // Лайк кнопка
   div.querySelector('.like-btn').onclick=()=>{
     if(!currentUser){
       alert("Войдите чтобы ставить лайки");
       return;
     }
     if(v.likes[currentUser.email]){
       alert("Вы уже поставили лайк этому видео");
       return;
     }
     v.likes[currentUser.email]=true;
     v.countLikes++;
     renderVideos();
   };

   container.appendChild(div);
 }
}

// Для теста — текущий пользователь (можете убрать или изменить)
const currentUser={email:'test@example.com'};

// Изначально обновляем список каналов (если есть)
updateChannelSelect();