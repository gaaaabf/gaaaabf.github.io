// === Git Icon Dropdown for CV Downloads ===
document.addEventListener('DOMContentLoaded', () => {
  const gitIcon = document.querySelector('.hero-icons .fa-git-alt');
  if (!gitIcon) return;

  // Create dropdown container
  const dropdown = document.createElement('div');
  dropdown.className = 'git-dropdown';
  dropdown.style.display = 'none';

  // Dynamically fetch CVS files from the directory
  async function loadCVSFiles() {
    // List of files from server (hardcoded for now, but can be fetched via API or server endpoint)
    const files = [
      'cv_automation_qa.html',
      'cv_drupal_dev.html',
      'cv_drupal_dev_full.html'
    ];
    // Remove existing items
    dropdown.innerHTML = '';
    files.forEach(file => {
      // Display name (remove extension, replace underscores)
      const name = file.replace('.html', '').replace(/_/g, ' ').replace('cv ', '').replace('drupal', 'Drupal').replace('qa', 'QA').replace('dev', 'Dev').replace('full', 'Full').replace('automation', 'Automation').replace('CV', 'CV').replace(/\s+/g, ' ').trim();
      const item = document.createElement('div');
      item.className = 'git-dropdown-item';
      item.textContent = name || file;
      item.addEventListener('click', async () => {
        dropdown.style.display = 'none';
        // Fetch HTML file
        try {
          if (typeof html2pdf === 'undefined') {
            alert('PDF library not loaded.');
            return;
          }
          const response = await fetch(`cvs/${file}`);
          if (!response.ok) throw new Error('File not found');
          const html = await response.text();
          // Create a hidden container
          const container = document.createElement('div');
          container.className = 'pdf-export';
          container.style.position = 'fixed';
          container.style.left = '-9999px';
          container.innerHTML = html;
          document.body.appendChild(container);
          let content = container.querySelector('.cv-container') || container.querySelector('body') || container;
          if (content) content.classList.add('pdf-export');
          html2pdf().set({
            margin: 0.5,
            filename: name + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
          }).from(content).save().then(() => {
            document.body.removeChild(container);
          }).catch(err => {
            document.body.removeChild(container);
            alert('PDF generation failed.');
            console.error('html2pdf error:', err);
          });
        } catch (err) {
          alert('Failed to generate PDF.');
          console.error('Fetch or conversion error:', err);
        }
      });
      dropdown.appendChild(item);
    });
  }

  // Position dropdown relative to icon
  gitIcon.style.position = 'relative';
  gitIcon.parentElement.style.position = 'relative';
  gitIcon.parentElement.appendChild(dropdown);

  gitIcon.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (dropdown.style.display === 'none') {
      await loadCVSFiles();
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  });
  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });
});
/* =====================================================
   DIGITAL CANVAS - Portfolio JavaScript
   Author: Gabriel Fernandez
   ===================================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initThemeToggle();
  initNavigation();
  initScrollAnimations();
  initSkillBars();
  initCounters();
  initTiltEffect();
  initContactForm();
  initBackToTop();
  initTypingEffect();
});

/* =====================================================
   PARTICLES.JS INITIALIZATION
   ===================================================== */
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#00d4ff', '#ff00aa', '#7b2dff']
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00d4ff',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.6
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

/* =====================================================
   THEME TOGGLE
   ===================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Animate the toggle button
    anime({
      targets: themeToggle,
      rotate: '+=360',
      duration: 500,
      easing: 'easeInOutQuad'
    });
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (theme === 'light') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
  });

  // Close mobile menu on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.querySelector('i').className = 'fas fa-bars';
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });
}

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate project cards with stagger
        if (entry.target.classList.contains('project-card')) {
          const cards = document.querySelectorAll('.project-card');
          anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(100),
            duration: 800,
            easing: 'easeOutQuad'
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .about-content, .contact-content, .section-title'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

/* =====================================================
   SKILL PROGRESS BARS
   ===================================================== */
function initSkillBars() {
  const skillsSection = document.querySelector('.skills');
  const skills = document.querySelectorAll('.skill');
  const progressBars = document.querySelectorAll('.progress-bar');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        // Animate skills appearing
        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.classList.add('animate');
          }, index * 100);
        });

        // Animate progress bars
        progressBars.forEach((bar, index) => {
          const progress = bar.getAttribute('data-progress');
          setTimeout(() => {
            bar.style.width = progress + '%';
          }, index * 100 + 300);
        });
      }
    });
  }, observerOptions);

  observer.observe(skillsSection);
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const aboutSection = document.querySelector('.about');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;

        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
        });
      }
    });
  }, observerOptions);

  observer.observe(aboutSection);
}

/* =====================================================
   TILT EFFECT FOR PROJECT CARDS
   ===================================================== */
function initTiltEffect() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.2
    });
  }
}

/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    // Simulate form submission
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';

      // Reset form
      form.reset();

      // Reset button after delay
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 2000);
  });

  // Input focus animations
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

/* =====================================================
   BACK TO TOP BUTTON
   ===================================================== */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =====================================================
   TYPING EFFECT
   ===================================================== */
function initTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const text = typingText.textContent;
  typingText.textContent = '';
  typingText.style.opacity = '1';

  let charIndex = 0;

  function type() {
    if (charIndex < text.length) {
      typingText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, 50);
    }
  }

  // Start typing after hero animations
  setTimeout(type, 1500);
}

/* =====================================================
   HERO ICONS ANIMATION
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const heroIcons = document.querySelectorAll('.hero-icons i');

  heroIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
      anime({
        targets: icon,
        scale: [1, 1.3, 1.1],
        rotate: [0, -10, 10, 0],
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
    });
  });
});

/* =====================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =====================================================
   PROJECT CARD HOVER EFFECTS
   ===================================================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    anime({
      targets: card.querySelector('.project-info h3'),
      color: '#00d4ff',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });

  card.addEventListener('mouseleave', () => {
    anime({
      targets: card.querySelector('.project-info h3'),
      color: '#ffffff',
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
});

/* =====================================================
   PRELOADER (OPTIONAL)
   ===================================================== */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Initial hero animation
  anime.timeline({
    easing: 'easeOutExpo'
  })
  .add({
    targets: '.hero-image-wrapper',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 1000
  })
  .add({
    targets: '.hero-icons i',
    scale: [0, 1],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 600
  }, '-=500');
});
