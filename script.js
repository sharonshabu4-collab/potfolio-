document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenuIcon && navLinks) {
    mobileMenuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Intersection Observer for Scroll Animations
  const animElements = document.querySelectorAll('.scroll-anim, .fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: Stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animElements.forEach(el => observer.observe(el));

  triggerHeroAnimations();

  function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('#hero .fade-in');
    heroElements.forEach(el => el.classList.add('is-visible'));
  }

  // Certificate Modal Logic
  const certCards = document.querySelectorAll('.cert-card');
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModalBtn = document.getElementById('close-modal');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-cert-src');
      if (src && modal && modalImg) {
        modalImg.src = src;
        modal.style.display = 'block';
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      setTimeout(() => { modalImg.src = ''; }, 300); // clear after animation
    });

    // click outside to close
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Chatbot Logic
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatBody = document.getElementById('chat-body');
  const chatOptionBtns = document.querySelectorAll('.chat-opt-btn');

  if (chatToggle && chatWindow && closeChat) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.add('active');
      chatToggle.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
      chatWindow.classList.remove('active');
      setTimeout(() => {
        chatToggle.style.display = 'flex';
      }, 300);
    });
  }

  const botResponses = {
    'skills': "I'm proficient in SolidWorks, C Programming, Python, and currently learning Web Development!",
    'contact': "You can easily reach me via the Contact section below, or connect on LinkedIn (sharon-shabu-8a7084376)."
  };

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg');
    msgDiv.classList.add(sender === 'bot' ? 'bot-msg' : 'user-msg');
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  chatOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msgType = btn.getAttribute('data-msg');
      const userText = btn.innerText;

      // Add User Message
      addMessage(userText, 'user');

      // Add Bot Response with slight delay
      setTimeout(() => {
        const reply = botResponses[msgType] || "I don't have an answer for that right now.";
        addMessage(reply, 'bot');
      }, 600);
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const ogText = btn.innerText;
      btn.innerText = "Sending...";
      
      const formData = new FormData(contactForm);

      fetch("https://formsubmit.co/ajax/sharonshabu4@gmail.com", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        btn.innerText = "Message Sent! \u2713"; // Checkmark
        btn.style.background = "#22c55e"; // Green
        contactForm.reset();
        setTimeout(() => {
          btn.innerText = ogText;
          btn.style.background = ""; // revert 
        }, 3000);
      })
      .catch(error => {
        btn.innerText = "Error!";
        btn.style.background = "#ef4444"; // Red
        setTimeout(() => {
          btn.innerText = ogText;
          btn.style.background = ""; // revert 
        }, 3000);
      });
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
      header.style.background = 'rgba(11, 17, 32, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(11, 17, 32, 0.8)';
    }
  });

});
