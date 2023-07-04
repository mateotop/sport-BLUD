// Your updated data
const exercises = {
    en: [
      { title: 'Squat', subtitle: 'right hand', order: '1/4', image: 'imgs/sitting_right_hand_up.jpg', duration: 60, description: 'Sit on your heels and slightly lift your pelvis about 10cm, at the same time raise your right hand up'},
      { title: 'Squat', subtitle: 'left hand', order: '2/4', image: 'imgs/squat_left_hand_up.jpg', duration: 60, description: 'Sit on your heels and slightly lift your pelvis about 10cm, at the same time raise your left hand up' },
      { title: 'Rider', subtitle: 'panda on a log', order: '3/4', image: 'imgs/panda_sitting.jpg', duration: 120, description: 'Spread your legs wider than your shoulders and sit down, imagine that you are wrapping your legs around a large horse or log' },
      { title: 'Chair', subtitle: 'comfortable air chair', order: '4/4', image: 'imgs/sitting_on_air_chair.jpg', duration: 120, description: 'There is a chair on any wall. It is invisible. Just believe that it is there sit on it. Remember the chair is at 90 degrees' },
    ],
    ru: [
      { title: 'Присид', subtitle: 'правая рука', order: '1/4', image: 'imgs/sitting_right_hand_up.jpg', duration: 60, description: 'Сесть на корточки и немного приподнять таз примерно на 10см, при этом поднять правую руку вверх'},
      { title: 'Присид', subtitle: 'левая рука', order: '2/4', image: 'imgs/sitting_left_hand_up.jpg', duration: 60, description: 'Сесть на корточки и немного приподнять таз примерно на 10см, при этом поднять левую руку вверх' },
      { title: 'Всадник', subtitle: 'панда на бревне', order: '3/4', image: 'imgs/panda_sitting.jpg', duration: 120, description: 'Расставить ноги шире плечь и присесть, предствить что обхватили ногами большую лошадь или бревно' },
      { title: 'Стульчик', subtitle: 'удобный воздушный стул', order: '4/4', image: 'imgs/sitting_on_air_chair.jpg', duration: 120, description: 'У любой стены есть стул. Он невидим. Просто поверьте, что он есть сядьте на него. Помните стул 90 градусов' },
    ],
    // Add more languages if needed
  };

  
  

let currentLanguage = 'ru';
let currentExercise = 0;
let intervalId = null;
const countdownCircle = document.querySelector('#countdownCircle circle');

// Caeusel creation
function createExerciseCarousel() {
    const carousel = document.getElementById('exercise-carousel');
    carousel.innerHTML = ''; // clear existing exercises if any

    exercises[currentLanguage].forEach((exercise, index) => {
        const exercisePreview = document.createElement('div');
        exercisePreview.className = 'exercise-preview';

        if (index === currentExercise) {
            exercisePreview.classList.add('current');
        }

        const img = document.createElement('img');
        img.src = exercise.image;

        const title = document.createElement('p');
        title.textContent = exercise.title;

        exercisePreview.append(img, title);
        carousel.appendChild(exercisePreview);
    });
}

// Update Exercise Info
function updateExerciseInfo() {
//   const exercise = exercises[currentExercise];
  const exercise = exercises[currentLanguage][currentExercise];
  document.getElementById('title').textContent = exercise.title;
  document.getElementById('subtitle').textContent = exercise.subtitle;
  document.getElementById('order').textContent = exercise.order;
  document.getElementById('image').src = exercise.image;
  document.getElementById('countdown').textContent = exercise.duration;
  document.getElementById('tooltip').textContent = exercise.description;

  // Reset countdown circle
  countdownCircle.style.strokeDashoffset = 0;

  createExerciseCarousel();
  
}

// Start Countdown
function startCountdown(seconds) {
  const initialSeconds = seconds;

  intervalId = setInterval(function() {
    seconds--;
    document.getElementById('countdown').textContent = seconds;

    // Update countdown circle
    // круг заполняется во время отсчета
    // const offset = (seconds / initialSeconds) * 282.74334;
    // countdownCircle.style.strokeDashoffset = offset;

    // Кург уже есть и исчезает во время отсчета
    const offset = ((initialSeconds - seconds) / initialSeconds) * 282.74334;
    countdownCircle.style.strokeDashoffset = offset;

    // Move to next exercise when countdown reaches 0
    if (seconds === 0) {
      clearInterval(intervalId);
      currentExercise++;
      createExerciseCarousel();

      if (currentExercise < exercises[currentLanguage].length) {
        updateExerciseInfo();
        startCountdown(exercises[currentLanguage][currentExercise].duration);
      }
    }
  }, 1000);
}

// Pause/Play Button
document.getElementById('pause-play-btn').addEventListener('click', function() {
  const btn = document.getElementById('pause-play-btn');

  if (btn.firstChild.className === 'fas fa-play') {
    startCountdown(parseInt(document.getElementById('countdown').textContent));
    btn.firstChild.className = 'fas fa-pause';
  } else {
    clearInterval(intervalId);
    btn.firstChild.className = 'fas fa-play';
  }
});

// Listen for language change
document.getElementById('lang').addEventListener('change', function() {
    currentLanguage = this.value;
    updateExerciseInfo();
  });



// Initial Setup
updateExerciseInfo();

