const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const tokenKey = "lastTokenTime";
const urlToVisit = "https://shrinke.me/YOUR_URL"; // <-- Apna ad wala link daalo

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    document.getElementById("status").innerText = "Logged in as " + result.user.displayName;
    checkVerification();
  });
}

function checkVerification() {
  const last = localStorage.getItem(tokenKey);
  const now = Date.now();
  const diff = now - (last || 0);
  const unlockBtn = document.getElementById("unlockLink");
  const startBtn = document.getElementById("startTestBtn");

  if (!last || diff > 86400000) {
    unlockBtn.style.display = "inline-block";
    unlockBtn.href = urlToVisit;
    unlockBtn.onclick = () => {
      setTimeout(() => {
        localStorage.setItem(tokenKey, Date.now());
        alert("Test Unlocked!");
        startBtn.style.display = "inline-block";
        unlockBtn.style.display = "none";
      }, 10000); // simulate 10 sec visit
    };
  } else {
    startBtn.style.display = "inline-block";
  }
}

function startTest() {
  window.location.href = "test.html";
}
