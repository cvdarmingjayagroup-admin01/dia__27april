// ================= 1. DEKLARASI VARIABEL GLOBAL & MUSIK =================
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

// Kontrol Musik Latar Manual
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '🎵 Putar Lagu';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '⏸️ Jeda Lagu';
    }
    isPlaying = !isPlaying;
});

// ================= 2. LOGIKA PRANK 5 STEP =================
function nextStep(currentStep) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep + 1}`).classList.add('active');

    if (currentStep + 1 === 4) {
        startFakeLoading();
    }
}

// Logika Tombol Kabur (Hover & Touch)
const btnRunaway = document.getElementById('btnRunaway');
btnRunaway.addEventListener('mouseover', moveRunawayButton);
btnRunaway.addEventListener('touchstart', moveRunawayButton);

function moveRunawayButton(e) {
    if (e.type === 'touchstart') e.preventDefault(); // Mencegah klik di layar sentuh
    btnRunaway.style.position = 'fixed'; 
    const maxX = window.innerWidth - btnRunaway.clientWidth - 20;
    const maxY = window.innerHeight - btnRunaway.clientHeight - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    btnRunaway.style.left = `${randomX}px`;
    btnRunaway.style.top = `${randomY}px`;
}

function checkPassword() {
    const input = document.getElementById('fakePassword').value;
    if (input.trim() === '') {
        alert('Isi dulu dong namanya! 😡');
    } else {
        alert('Nah gitu dong ngaku! 😂 Lanjut!');
        nextStep(3);
    }
}

function startFakeLoading() {
    let progress = 0;
    const loadingFill = document.getElementById('loadingFill');
    const loadingText = document.getElementById('loadingText');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 99) {
            progress = 99;
            loadingFill.style.width = progress + '%';
            loadingText.innerText = progress + '% (Duh koneksi hati putus-putus...)';
            clearInterval(interval);
            setTimeout(() => { nextStep(4); }, 3000); // Lanjut setelah 3 detik
        } else {
            loadingFill.style.width = progress + '%';
            loadingText.innerText = progress + '%';
        }
    }, 400);
}

// Spam Klik & Selesai Prank
let spamCount = 5;
const spamBtn = document.getElementById('spamBtn');

spamBtn.addEventListener('click', () => {
    spamCount--;
    if (spamCount > 0) {
        spamBtn.innerText = `Klik Aku! (${spamCount})`;
        spamBtn.style.transform = `scale(${1 - (5 - spamCount) * 0.05})`;
    } else {
        // Play Musik Otomatis saat masuk halaman utama
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.innerHTML = '⏸️ Jeda Lagu';
            }).catch((err) => console.log(err));
        }

        // Tampilkan halaman utama
        document.getElementById('prankSection').style.display = 'none';
        document.getElementById('mainSection').style.display = 'block';
        document.title = "Untuk Kamu 🌿";

        // Jalankan Efek Visual
        startFireflies();
        document.querySelectorAll('.fade-in').forEach(section => {
            observer.observe(section);
        });
    }
});

// ================= 3. FITUR KUNANG-KUNANG & TYPEWRITER =================
function startFireflies() {
    const container = document.getElementById('firefliesContainer');
    setInterval(() => {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        firefly.style.left = Math.random() * 100 + 'vw';
        
        const size = Math.random() * 4 + 3; 
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        firefly.style.animationDuration = (Math.random() * 3 + 4) + 's'; 
        
        container.appendChild(firefly);

        setTimeout(() => { firefly.remove(); }, 7000);
    }, 500); 
}

// Efek Mesin Ketik Puisi
const puisiText = "Di antara ribuan detik yang berlalu,\nAda senyummu yang selalu kutunggu.\nSederhana, tanpa banyak kata,\nNamun cukup membuat duniaku penuh warna.";
let iType = 0;
let isTypingStarted = false;

function typeWriterEffect() {
    if (iType < puisiText.length) {
        const char = puisiText.charAt(iType);
        document.getElementById("typewriterText").innerHTML += char === '\n' ? '<br>' : char;
        iType++;
        setTimeout(typeWriterEffect, 60); 
    } else {
        document.getElementById("typewriterText").style.borderRight = "none";
    }
}

// Fitur Buka Amplop
function openEnvelope() {
    document.getElementById('envelopeWrapper').classList.toggle('open');
}

// ================= 4. OBSERVER (ANIMASI SCROLL) & GAME =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger ngetik saat puisi muncul di layar
            if (entry.target.id === 'poemSection' && !isTypingStarted) {
                isTypingStarted = true;
                setTimeout(typeWriterEffect, 500); 
            }
        }
    });
}, { threshold: 0.2 });

// Logika Game Tangkap Hati
const catchBtn = document.getElementById('catchBtn');
const scoreText = document.getElementById('scoreText');
const giftSection = document.getElementById('giftSection');
let score = 0;

catchBtn.addEventListener('mouseover', moveGameButton);
catchBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveGameButton(); }); 
catchBtn.addEventListener('click', () => {
    score++;
    scoreText.innerText = `Tertangkap: ${score}/3`;
    if (score >= 3) {
        winGame();
    } else {
        moveGameButton();
    }
});

function moveGameButton() {
    const gameArea = document.querySelector('.game-area');
    const maxX = gameArea.clientWidth - catchBtn.clientWidth;
    const maxY = gameArea.clientHeight - catchBtn.clientHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    catchBtn.style.left = `${randomX}px`;
    catchBtn.style.top = `${randomY}px`;
    catchBtn.style.transform = `translate(0, 0)`; 
}

function winGame() {
    catchBtn.style.display = 'none';
    scoreText.innerHTML = '<b>Yeay! Kamu berhasil! 💚</b>';
    setTimeout(() => {
        giftSection.style.display = 'block';
        giftSection.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}