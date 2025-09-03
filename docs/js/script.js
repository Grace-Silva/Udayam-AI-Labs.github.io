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
    name: "Ananya G",
    designation: "Baldwin Girls' High School",
    location: "Bangalore",
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
  description: "Professionals enchancing their AI skills in an interactive setting.",
  reviewer: {
    comment: "\"The corporate training by Udayam AI Labs was highly engaging and practical. Mr. Udayraj Patare delivered complex AI concepts with clarity, real-world examples, and hands-on activities. Our team walked away with future-ready skills that we can apply immediately in our work.\"",
    name: "MR.TEJAS INAGALE",
    designation: "KAIZEN ENGINEERING",
    location: "Ahilyanagar, Maharashtra",
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
    if(i === currentTrainingCardIndex){
      dot.setAttribute('aria-current', 'true');
    }
    dot.addEventListener('click', () => {
    currentTrainingCardIndex = i;
    renderCard(currentTrainingCardIndex);
    });
    dot.addEventListener('keydown', (e)=>{
      if(e.key === "ArrowRight") {
        const next = (i + 1) % cardData.length;
        dotsContainer.children[next].focus();
        currentTrainingCardIndex = next;
        renderCard(next);
      }else if(e.key === "ArrowLeft"){
        const prev = (i - 1 + cardData.length) % cardData.length;
        dotsContainer.children[prev].focus();
        currentTrainingCardIndex = prev;
        renderCard(prev);
      }
    })
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

/* starts send emails function with EmailJS: */
// Inicialite emailJS:
emailjs.init("9QTiwXB7EElSgyWrN"); // public key

// Variables to manage the number of submission attempts for the form and a delay while checking:
const maxRetries = 2;
const delay = 1000;

  // Use the above counters to assist in debugging errors:
  async function sendEmailWithRetry(formData, retries = maxRetries) {
      // We initially attempted to send the form (without the user noticing):
      try{
        // const response = await emailjs.sendForm('service_ID', 'template_ID', form data);
        const response = await emailjs.sendForm('service_hyjqhbc', 'template_z994w15BORRAME', formData);
        return response;
      }
      // If the delivery fails, start using the retry counter (1 successful delivery + 2 additional attempts):
      catch(error){
        if(retries>0){
          console.log("Reintentando envío... (${maxRetries - retries + 1} / ${maxRetries})");
          // count 1 second before attempting another send attempt:
          await new Promise(resolve => setTimeout(resolve, delay));
          return sendEmailWithRetry(formData, retries - 1); 
        }
        //
        throw error; // if resending attempts fail, a message is displayed to users
      }
      //------
  }
 
  /* send email without retries or errors */
  async function showAlert(event) {

    event.preventDefault(); // website will not reload, post method blocked
      
      const submitBtn = document.getElementById("submitBtn"); // cta button
      const originalText = submitBtn.innerHTML; // cta inner text
      const form = event.target; // get form data

        // "sending" animation in the submit button:
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
          submitBtn.classList.add('loading');
          submitBtn.disabled = true;
          submitBtn.style.opacity = "0.5";
          submitBtn.style.pointerEvents = "none";
          submitBtn.style.cursor = "not-allowed";
        //
        try{
          const response = await sendEmailWithRetry(form); // check that there are no errors
          console.log("success", response.status, response.text);
          alert("Your message was sent!!");
          form.reset(); // clean all input fields

            // If the email is sent successfully, redirect to the home page:
            setTimeout(() => {
              window.location.href = "https://grace-silva.github.io/Udayam-AI-Labs.github.io/index.html#contact";
            }, 1000);
        }
        // show error messages
        catch(error){
          console.log("failed", error);
          let errorMessage = "Sorry, there was an error sending your message. ";
          
          if (error?.status === 0 || error?.toString().includes('Network')) {
              errorMessage += "Please check your internet connection and try again.";
          } else if (error?.status >= 500) {
              errorMessage += "Our server is having issues. Please try again in a few minutes.";
          } else {
              errorMessage += "Please try again or contact us directly at support@udayam.co.in";
          }
          
          alert(errorMessage);
        }
          finally{
            // Restore original styles to the button submit (in case of success or error):
            setTimeout(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
              submitBtn.style.opacity = "1";
              submitBtn.style.pointerEvents = "auto";
              submitBtn.style.cursor = "pointer";
              submitBtn.classList.remove("loading");
            }, 500);
          }

    return false;
  }

document.getElementById('contact-form').addEventListener('submit', showAlert);
/* ends send emails function */

// const menuToggle = document.getElementById("menu-toggle");
//   const navLinks = document.getElementById("nav-links");

//   menuToggle.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
//     menuToggle.innerHTML = navLinks.classList.contains("active") 
//         ? '<i class="fa-solid fa-xmark"></i>' 
//         : '<i class="fa-solid fa-bars"></i>';
// });

