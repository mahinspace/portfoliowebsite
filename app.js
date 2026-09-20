/* ==========================================================================
   SHADAT RONY - INTERACTIVE JS LOGIC & DYNAMIC CONTENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPricingTabs();
  initTestimonialCarousel();
  initScrollAnimations();
  initCursorGlow();
  initLiveCounters();
  initKeyboardNav();
});

/* Ambient Cursor Glow Follower */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* Intersection Observer Scroll Animations */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* Animated Statistics Counter */
function initLiveCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = target / 30;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            el.textContent = Math.ceil(count) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target + suffix;
          }
        };

        updateCount();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* Mobile Menu Handling */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const overlay = document.getElementById('mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    closeBtn && closeBtn.focus();
  }

  function closeMenu() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Pricing Tab Switcher */
function switchPricingTab(tab) {
  const tabWL = document.getElementById('tab-whitelabel');
  const tabPB = document.getElementById('tab-personalbrand');

  if (tab === 'whitelabel') {
    tabWL.classList.add('active');
    tabWL.setAttribute('aria-selected', 'true');
    tabPB.classList.remove('active');
    tabPB.setAttribute('aria-selected', 'false');
  } else {
    tabPB.classList.add('active');
    tabPB.setAttribute('aria-selected', 'true');
    tabWL.classList.remove('active');
    tabWL.setAttribute('aria-selected', 'false');
  }
}

/* Billing Cycle Pricing Toggle */
function toggleBillingCycle(isCommitment) {
  const starter = document.getElementById('price-starter');
  const growth = document.getElementById('price-growth');
  const scale = document.getElementById('price-scale');

  if (isCommitment) {
    if (starter) starter.textContent = '$4,499';
    if (growth) growth.textContent = '$7,039';
    if (scale) scale.textContent = '$8,499';
  } else {
    if (starter) starter.textContent = '$4,999';
    if (growth) growth.textContent = '$7,999';
    if (scale) scale.textContent = '$9,999';
  }
}

/* Testimonials Carousel */
const testimonials = [
  {
    quote: "“I recently discovered SquidX, and I'm absolutely blown away by the quality and variety of designs they offer. Whether you're looking for website templates, graphic assets, or even inspiration for your next project, this is a site you need to check out.”",
    author: "Muneeb",
    title: "Founder — Marketing Agency"
  },
  {
    quote: "“Shadat and his team transformed our website speed and conversion rate within 4 weeks. Up 35% in revenue month over month!”",
    author: "Sarah Jenkins",
    title: "CEO — Personal Brand Coach"
  },
  {
    quote: "“The white-label partnership cut our design costs by over 30% while improving client retention across all accounts.”",
    author: "Tariq Al-Mansoor",
    title: "Partner — Growth Agency"
  },
  {
    quote: "“Responsive, strategic, and hyper-focused on revenue growth. SquidX is our secret weapon for web design.”",
    author: "David Ross",
    title: "Founder — SaaS Platform"
  }
];

let currentSlideIndex = 0;

function initTestimonialCarousel() {
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonialUI();
  });

  nextBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % testimonials.length;
    updateTestimonialUI();
  });
}

function updateTestimonialUI() {
  const quoteElem = document.getElementById('testimonial-quote-text');
  const authorElem = document.getElementById('testimonial-author-name');
  const titleElem = document.getElementById('testimonial-author-title');
  const counterElem = document.getElementById('current-slide');

  if (!quoteElem) return;

  quoteElem.style.opacity = '0';
  setTimeout(() => {
    const item = testimonials[currentSlideIndex];
    quoteElem.textContent = item.quote;
    authorElem.textContent = item.author;
    titleElem.textContent = item.title;
    if (counterElem) counterElem.textContent = currentSlideIndex + 1;
    quoteElem.style.opacity = '1';
  }, 200);
}

/* Modals & Dynamic Data (Case Studies, Blogs, Legals) */
const caseStudies = {
  bloc: {
    title: "Bloc — Brand Identity & High-Converting Website",
    category: "Branding & Web Architecture",
    deliverables: "Brand Strategy, Figma UI/UX, Framer Development, Conversion Copywriting",
    description: "Bloc needed a brand refresh and high-converting marketing site to position themselves as leaders in the agency space. We overhauled their visual identity, built an intuitive design system, and engineered a performance-focused Framer site.",
    results: "35% increase in lead conversion within 60 days of launch."
  },
  salesroad: {
    title: "Sales Road — B2B Agency Sales Funnel & Web Architecture",
    category: "B2B Agency Growth & Web Design",
    deliverables: "B2B Sales Funnel, Webflow CMS, Animated UI Components, Lead Magnet Integration",
    description: "Sales Road is a B2B sales development firm. We redesigned their web architecture around client acquisition and trust signals, creating an engaging storytelling flow that turns visitors into qualified demo calls.",
    results: "40% reduction in bounce rate & 2.4x more booked strategy sessions."
  },
  optimix: {
    title: "Optimix — Multi-Platform Agency Design System",
    category: "Design System & Template Development",
    deliverables: "Cross-Builder UI Kit, Bricks/Breakdance/Framer Imports, Custom Animations",
    description: "OptimiX is a premium agency design system crafted to work seamlessly across Bricks, Breakdance, Elementor, and Framer. Includes pre-built pages, lightweight animations, and CMS structure.",
    results: "Over 500+ agency downloads and 5-star community ratings."
  },
  genz: {
    title: "GENZ — Next-Gen E-Commerce Brand Experience",
    category: "E-Commerce & Lifestyle",
    deliverables: "Shopify/Figma Design System, Product Showcase, Micro-Interactions",
    description: "GENZ is a vibrant e-commerce brand targeted at next-gen shoppers. Built with trend-driven visuals, product-first layouts, and fast mobile-first checkout flows.",
    results: "18% increase in average order value (AOV)."
  }
};

const blogPosts = {
  blog1: {
    title: "After 3 Failed Ventures, I Learned What Works—Then Built a Sustainable Agency From Scratch!",
    meta: "Marketing • Jun 19, 2025 • 5 min read",
    content: `
      <p>I failed my first three startups in the last seven years. Now, I run a growing agency called Squidx Agency. With everything I've learned about the design business, I know for a fact that anyone can build a $5K-$10K/month agency within 3-5 months if they follow the right steps.</p>
      <h3>1. Pick a Niche That Pays (and Feels Right)</h3>
      <p>When we started Squidx, we weren't chasing every client out there. We picked a niche that aligned with our strengths and had the budget to pay for real results. Depth beats width.</p>
      <h3>2. Build Portfolio First</h3>
      <p>Authority doesn't come from who you've worked with—it comes from what you can show. When we had zero case studies, we built fake brands, designed real solutions, and published them like we were already in the game.</p>
      <h3>3. Build a Network & Simple Proposals</h3>
      <p>Don't drop a 30-page PDF. Speak their language: call out the problem, show 2 options with clear pricing, and close deals with short Loom videos.</p>
    `
  },
  blog2: {
    title: "Be the One Who Moves First — Or Get Left Behind by the Ones Who Move with Purpose.",
    meta: "Strategy • Jun 18, 2025 • 4 min read",
    content: `
      <p>You need two things to build something powerful: a master craftsman and a growth strategist. At Squidx, Saber Ali handles clean UI, slick animations, and brand consistency, while I build sales channels, automated outreach, and strategic content.</p>
      <h3>Purity Is Everything</h3>
      <p>If your work isn't world-class, you're just another name in the Fiverr race to the bottom. When people see your designs and immediately recognize the standard, the question isn't "how much?" It becomes "when can you start?"</p>
    `
  },
  blog3: {
    title: "How I Run Squidx Agency Without a Sales Team (And Still Keep Winning)",
    meta: "Operations • Jun 2, 2025 • 5 min read",
    content: `
      <p>When people hear I run SquidX Agency without a single salesperson, they look at me like I'm joking. No SDRs, no cold callers, no sliding into DMs day and night. Just me, a few powerful tools, and a system that works even when I sleep.</p>
      <h3>The Tech Stack</h3>
      <p><strong>Screen Studio:</strong> High-quality demo walkthroughs.<br><strong>Buffer & Instantly:</strong> Automated content and targeted cold outreach.<br><strong>Notion:</strong> All-in-one agency SOPs, client boards, and deliverables.</p>
    `
  }
};

const legals = {
  privacy: {
    title: "Privacy Policy",
    meta: "Last Updated: May 13, 2025",
    content: "<p>We respect your privacy. All information collected through contact forms or strategy audit bookings is stored securely and used solely for business communication between you and Shadat Rony / Squidx Agency.</p>"
  },
  terms: {
    title: "Terms of Service",
    meta: "Last Updated: May 12, 2025",
    content: "<p>By accessing or using our services at Shadat.co, you agree to be bound by these terms. All design work, custom systems, and branding assets delivered under our agency packages belong to the respective clients upon final payment.</p>"
  }
};

function openProjectModal(id) {
  const data = caseStudies[id];
  if (!data) return;

  const container = document.getElementById('modal-body-container');
  container.innerHTML = `
    <span class="badge badge-orange">${data.category}</span>
    <h2 class="modal-article-title mt-3">${data.title}</h2>
    <div class="modal-article-body">
      <p><strong>Deliverables:</strong> ${data.deliverables}</p>
      <h3>Project Overview</h3>
      <p>${data.description}</p>
      <h3>Measured Results</h3>
      <p><strong>${data.results}</strong></p>
      <button class="btn btn-primary btn-lg w-full mt-4" onclick="closeModal('content-modal'); openAuditModal('Case Study Audit: ${id}');">Book a Call for a Similar Project &rarr;</button>
    </div>
  `;

  openModal('content-modal');
}

function openBlogModal(id) {
  const data = blogPosts[id];
  if (!data) return;

  const container = document.getElementById('modal-body-container');
  container.innerHTML = `
    <h2 class="modal-article-title">${data.title}</h2>
    <p class="modal-article-meta">${data.meta}</p>
    <div class="modal-article-body">${data.content}</div>
    <button class="btn btn-secondary btn-md w-full mt-6" onclick="closeModal('content-modal')">Close Article</button>
  `;

  openModal('content-modal');
}

function openLegalModal(type) {
  const data = legals[type];
  if (!data) return;

  const container = document.getElementById('modal-body-container');
  container.innerHTML = `
    <h2 class="modal-article-title">${data.title}</h2>
    <p class="modal-article-meta">${data.meta}</p>
    <div class="modal-article-body">${data.content}</div>
  `;

  openModal('content-modal');
}

function openAuditModal(planName = '') {
  const select = document.getElementById('user-plan');
  if (planName && select) {
    select.value = planName;
  }
  openModal('audit-modal');
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function handleAuditSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('user-name').value;
  const plan = document.getElementById('user-plan').value;

  alert(`Thank you, ${name}! Your 30-minute strategy call request for "${plan}" has been received. Shadat Rony will contact you shortly.`);
  closeModal('audit-modal');
}

/* Global Keyboard Navigation */
function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('audit-modal');
      closeModal('content-modal');
    }
  });
}
