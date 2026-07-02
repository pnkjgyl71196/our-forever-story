function reveal(el, text){
  if(el.classList.contains('revealed')) return;
  el.classList.add('revealed');
  el.innerHTML = "<strong>" + text + "</strong>";
}

function createHeartBurst(count = 25){
  for(let i=0;i<count;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['❤️','💖','💕','💗'][Math.floor(Math.random()*4)];
    heart.style.left = Math.random()*100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.fontSize = (16 + Math.random()*24) + 'px';
    heart.style.animationDuration = (4 + Math.random()*3) + 's';
    document.getElementById('hearts').appendChild(heart);

    setTimeout(()=>heart.remove(),7000);
  }
}

function acceptProposal(){
  createHeartBurst(60);
  document.getElementById('result').innerHTML =
    "🎉 She Said YES! ❤️ Forever Begins Today! 🎉";
}

function showHug(){
  createHeartBurst(20);
  document.getElementById('result').innerHTML =
    "🤗 Sending the biggest virtual hug! Now... will you marry me? ❤️";
}

function saveResponse(){
  const data = {
    name: document.getElementById('name').value || "My Love",
    message: document.getElementById('message').value,
    accepted: document.getElementById('result').innerText.includes('YES'),
    date: new Date().toLocaleString()
  };

  localStorage.setItem('ourForeverStory', JSON.stringify(data));

  document.getElementById('saveStatus').innerText =
    "Response saved successfully ❤️";
}

function downloadResponse(){
  const saved = localStorage.getItem('ourForeverStory');

  if(!saved){
    alert('Please save a response first.');
    return;
  }

  const blob = new Blob([saved], {type:'application/json'});
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'our-forever-memory.json';
  a.click();

  URL.revokeObjectURL(url);
}

// Auto-load previous response if available
window.onload = function(){
  const saved = localStorage.getItem('ourForeverStory');

  if(saved){
    const data = JSON.parse(saved);
    document.getElementById('name').value = data.name || '';
    document.getElementById('message').value = data.message || '';
  }

  // Gentle floating hearts
  setInterval(()=>createHeartBurst(3),3000);
};