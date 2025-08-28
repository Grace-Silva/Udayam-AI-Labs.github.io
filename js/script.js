// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.service-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  animatedElements.forEach(element => {
    observer.observe(element);
    element.classList.add('pre-animation');
  });
});
// Training highlights card details
const cardData = [
{
  image: {
  src: "assets/images/training3.webp",
  alt: "School Trainings Img"
  },
  title: "School Trainings",
  description: "Introducing young learners to the word of artificial intelligence.",
  reviewer: {
    comment: "\"Amazing program! My daughter loves the hands-on robotics sessions and has learned so much about technology.\"",
    name: "anonymous",
    designation: "",
    location: "",
  }
  },
  {
  image: {
  src: "assets/images/training1.webp",
  alt: "Faculty Development Programs Img"
  },
  title: "Faculty Development Programs",
  description: "Faculty learning practical Al implementation through guided exercises.",
  reviewer: {
    comment: "\"Really this workshop builds confidence to make creative ideas for teaching process.\"",
    name: "Priyanka M",
    designation: "TGT Science",
    location: "PPS Bengaluru"
  }
  }, 
  {
  image: {
  src: "assets/images/training2.webp",
  alt: "Corporate Trainings Img"
  },
  title: "Corporate Trainings",
  description: "Professioanls enchancing thier AI skills in an interactive setting.",
  reviewer: {
    comment: "\"Transformed our team's productivity! The AI training was practical and immediately applicable to our work.\"",
    name: "anonymous",
    designation: "",
    location: "",
  }
  },
  {
  image: {
  src: "assets/images/training4.webp",
  alt: "Advanced Techniques Img"
  },
  title: "Advanced Techniques",
  description: "Exploring cutting-edge AI methodologies with our expert trainers.",
  reviewer: {
    comment: "\"It was a good opportunity to learn AI in Pharma and i am interested to apply it in my future research.\"",
    name: "Ayesha S",
    designation:  "Pharmaceutical Analysis Dept",
    location: "NIPER-Kolkata"
  }
  }
]
const dotsContainer = document.getElementById('dotsContainer');
let currentTrainingCardIndex = 0;

function renderCard(index) {
  const data = cardData[index];

  document.getElementById("cardImage").src = data.image.src;
  document.getElementById("cardImage").alt = data.image.alt;
  document.getElementById("cardTitle").textContent = data.title;
  document.getElementById("cardDescription").textContent = data.description;

  let formattedName = data.reviewer.name;
  if (data.reviewer.designation && data.reviewer.location) {
    formattedName += `, ${data.reviewer.designation} (${data.reviewer.location})`;
  } else if (data.reviewer.designation) {
    formattedName += `, ${data.reviewer.designation}`;
  } else if (data.reviewer.location) {
    formattedName += ` (${data.reviewer.location})`;
  }

  document.getElementById("userName").textContent = formattedName;
  document.getElementById("userComment").textContent = data.reviewer.comment;

  document.getElementById("userInitials").textContent = data.reviewer.name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join("");
  
  renderDots();
}

function renderDots() {
  dotsContainer.innerHTML = '';
  cardData.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === currentTrainingCardIndex ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
    currentTrainingCardIndex = i;
    renderCard(currentTrainingCardIndex);
    });
    dotsContainer.appendChild(dot);
  });
}
document.getElementById("prevBtn").addEventListener("click", () => {
  currentTrainingCardIndex = (currentTrainingCardIndex - 1 + cardData.length) % cardData.length;
  renderCard(currentTrainingCardIndex);
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentTrainingCardIndex = (currentTrainingCardIndex + 1) % cardData.length;
  renderCard(currentTrainingCardIndex);
});
document.addEventListener("DOMContentLoaded", () => {
  renderCard(currentTrainingCardIndex);
});
// Accordion-toggle
document.addEventListener("DOMContentLoaded",()=>{
  const firstItem = document.querySelector('.accordion-item');
  if(firstItem){
    firstItem.classList.add('active')
  }
    document.querySelectorAll('.accordion-header').forEach(header=>{
      header.addEventListener('click', ()=>{
      toggleAccordion(header);
      });

      header.addEventListener('keydown', (e)=>{
      if(e.key === "Enter" || e.key === ''){
        e.preventDefault();
        toggleAccordion(header);
      }
      })
    });
    
    function toggleAccordion(header){
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.accordion-item').forEach(i=> i.classList.remove('active'));
    if(!isActive){
      item.classList.add('active');
    }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();

const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);

setTimeout(() => {
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: 'smooth'
  });      
}, 150);

});
});

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function () {
const animatedElements = document.querySelectorAll('.service-card, .photo-card, .about-content p');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
  entry.target.classList.add('animate-in');
  observer.unobserve(entry.target);
  }
});
}, {
threshold: 0.2
});

animatedElements.forEach(element => {
observer.observe(element);
element.classList.add('pre-animation');
});
});

// go up function:
document.addEventListener('DOMContentLoaded',   function () {
const btnUp = document.getElementById("btnUp");
// Show or hide the button depending on the scroll position:
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) 
      {
        btnUp.classList.add('show');
      } 
    else {
      btnUp.classList.remove('show');
    }
});

// Smooth upward scroll with delay
  btnUp.addEventListener('click', function () {
    setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });          
    }, 150);
  });
});

/* send emails 

const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("submitBtn");


contactForm.addEventListener("submit", submitData);

  function submitData(event) /*->submit {
    /*const submitText = sendBtn.innerHTML;
    sendBtn.innerHTML= '<i class="fas fa-spinner fa-spin"></i>'; /* sending animation */
    //submitBtn.disabled = true; /* disable user click  */
    
    /*setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = submitText;
        submitBtn.disabled = false; 
    }, 3000);
  }*/
  
function showAlert(event) {
    // Solo prevenir default si quieres control total
    event.preventDefault();
    
    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.innerHTML;
    
    // Feedback visual inmediato
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Alert rápido
    alert('Thank you! Your message is being sent...');
    
    // Re-enviar el formulario después de 1 segundo
    setTimeout(() => {
        // Enviar de forma tradicional
        event.target.submit();
        
        // Opcional: resetear después de enviar
        setTimeout(() => {
            event.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
    
    return false;
}