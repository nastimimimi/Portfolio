const { createApp, ref, watch, onMounted, nextTick } = Vue

const PROJECTS = [
  {
    num: '001', eyebrow: 'Personal Project — AI / ML',
    title: 'Lip Reading Web Application',
    period: 'March — April 2026', type: 'Web App + ML',
    github: 'https://github.com/nastimimimi/lipreader.git', hasGithub: true,
    stack: ['Python','Web Development', 'Machine Learning','Video Processing','Neural Networks'],
    desc: 'An artificial intelligence project focused on lip reading using machine learning. Built a complete web interface where users upload video content and receive real-time predictions from the trained model.',
    detail: 'The system processes video frames, extracts lip region features, and passes them through a neural network trained on lip movement datasets. The web app provides an intuitive upload interface with instant prediction results.',
    highlights: ['Video frame extraction pipeline','Lip region feature detection','Neural network inference','Web interface for video uploads','Real-time prediction display'],
    images: [
      { label: 'Live Detection Demo', note: '<img src="lip.png" alt="Main Page">' },
    ]
  },
  {
    num: '002', eyebrow: 'ED.PRACTICE Register of Shipping of Ukraine',
    title: 'Documentation Automation Desktop App',
    period: 'February — March 2026', type: 'Desktop Application',
    github: '', hasGithub: false,
    stack: ['Python','Desktop Development','Database Management','Workflow Automation'],
    desc: 'A comprehensive desktop application built for automating documentation workflows within the ED.PRACTICE Register of Shipping of Ukraine. Features multiple interface screens and integrated database management.',
    detail: 'Implemented automation processes to significantly reduce manual documentation work. The app handles data entry, validation, storage, and document generation workflows with a clean multi-screen interface.',
    highlights: ['Multi-screen workflow interface','Integrated database management','Automated document generation','Data validation & error handling','Optimised for daily operational use'],
    images: [
      { label: 'Confidential Information', note: 'Confidential Information' },
      { label: 'Confidential Information', note: 'Confidential Information' }
    ]
  },
  {
    num: '003', eyebrow: 'Personal Project — Computer Vision',
    title: 'Eye Gaze Detection Application',
    period: 'December 2025 — January 2026', type: 'Computer Vision',
    github: 'https://github.com/nastimimimi/Eye-Gaze-Tracking.git', hasGithub: true,
    stack: ['Python','OpenCV','Computer Vision','Facial Landmark Detection','Algorithm Design'],
    desc: 'A computer vision application that detects and analyses eye movement patterns in real time via webcam, predicting gaze direction using custom algorithmic approaches.',
    detail: 'The system processes each webcam frame, detects facial landmarks to isolate eye regions, then applies custom algorithms to determine where the user is looking. Achieves real-time performance suitable for HCI and accessibility applications.',
    highlights: ['Real-time webcam feed processing','Facial landmark detection','Eye region isolation & analysis','Gaze direction prediction','HCI / accessibility use cases'],
  },
  {
    num: '004', eyebrow: 'Personal Project — iOS / IoT',
    title: 'Smart Home iOS Application',
    period: 'September — November 2025', type: 'iOS App + Embedded',
    github: 'https://github.com/nastimimimi/smart-home.git', hasGithub: true,
    stack: ['Swift','SwiftUI','Backend/Server','Arduino','Embedded Systems','IoT'],
    desc: 'A full-featured iOS smart home app built in Swift and SwiftUI. Includes a custom server backend bridging the iOS app to Arduino microcontroller hardware for real-time device control.',
    detail: 'The app communicates with a custom server that translates commands into ESP32 signals, enabling real-time control of physical home devices. The SwiftUI interface provides a clean, native iOS experience.',
    highlights: ['Native SwiftUI interface design','Custom REST server backend','ESP32 hardware integration','Real-time device control & monitoring','iOS-to-hardware communication pipeline'],
    images: [
      { label: 'Working with lighting', note: '<img src="Simulator Screenshot 1.png" alt="iOS App Home Screen">' },
      { label: 'iOS App Home Screen', note: '<img src="Simulator Screenshot 2.png" alt="Device Control Panel">' },
      { label: 'RFID Security System', note: '<img src="Simulator Screenshot 3.png" alt="Arduino Hardware Setup">' }
    ]
  }
]

createApp({
  setup() {
    const currentPage = ref('home')
    const currentProject = ref(null)
    const tgName = ref('')
    const tgContact = ref('')
    const tgMsg = ref('')
    const tgStatus = ref('')

    const rvName    = ref('')
    const rvRole    = ref('')
    const rvStars   = ref(0)
    const rvHover   = ref(0)
    const rvText    = ref('')
    const rvStatus  = ref('')
    const rvStarLabel = ref('')

    const lightboxSrc = ref(null)

    function openLightbox(html) {
      const match = html.match(/src="([^"]+)"/)
      if (match) lightboxSrc.value = match[1]
    }

    watch(rvStars, v => {
      rvStarLabel.value = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][v] || ''
    })

    async function submitReview() {
      const BOT_TOKEN = '8714688543:AAFwq45s0X9fLF0hJaMqxChgoGkH64E5284'
      const CHAT_ID   = '701135988'
      const stars = '✦'.repeat(rvStars.value) + '✧'.repeat(5 - rvStars.value)
      const text = `⭐️ New review for approval!\n\n👤 ${rvName.value}${rvRole.value ? ' · ' + rvRole.value : ''}\n${stars}\n\n💬 ${rvText.value}\n\n✅ Add to site: copy to REVIEWS array in main.js`
      rvStatus.value = 'Sending...'
      try {
        const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text })
        })
        const d = await r.json()
        if (d.ok) {
          rvStatus.value = '✓ Thank you! Your review will appear after approval.'
          rvName.value = rvRole.value = rvText.value = ''
          rvStars.value = rvHover.value = 0
        } else {
          rvStatus.value = '✗ Something went wrong. Please try again.'
        }
      } catch {
        rvStatus.value = '✗ Network error. Please try again.'
      }
    }


    function showPage(id) {
      currentPage.value = id
      currentProject.value = null
      window.scrollTo(0, 0)
      nextTick(() => initReveal())
    }

    function showProject(idx) {
      currentProject.value = PROJECTS[idx]
      currentPage.value = 'project-detail'
      window.scrollTo(0, 0)
      nextTick(() => initReveal())
    }

    function backToProjects() {
      currentProject.value = null
      showPage('projects')
    }

    // Telegram form 
    async function sendTelegram() {
      const BOT_TOKEN = '8714688543:AAFwq45s0X9fLF0hJaMqxChgoGkH64E5284' 
      const CHAT_ID   = '701135988'  
      const text = `📩 New message from portfolio!\n\n👤 Name: ${tgName.value}\n📬 Contact: ${tgContact.value || '—'}\n\n💬 Message:\n${tgMsg.value}`
      tgStatus.value = 'Sending...'
      try {
        const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text })
        })
        const d = await r.json()
        if (d.ok) {
          tgStatus.value = '✓ Sent! I will reply within 24 hours.'
          tgName.value = tgContact.value = tgMsg.value = ''
        } else {
          tgStatus.value = '✗ Error. Please reach out via email.'
        }
      } catch {
        tgStatus.value = '✗ Network error. Please try again.'
      }
    }

    // Cursor
    function initCursor() {
      const star = document.getElementById('cur')
      document.addEventListener('mousemove', e => {
        star.style.left = e.clientX + 'px'
        star.style.top  = e.clientY + 'px'
      })
      document.querySelectorAll('a, button, .proj-card').forEach(el => {
        el.addEventListener('mouseenter', () => star.style.transform = 'translate(-50%,-50%) scale(1.6)')
        el.addEventListener('mouseleave', () => star.style.transform = 'translate(-50%,-50%) scale(1)')
      })
    }

    // Background particles 
    function initCanvas() {
      const cv = document.getElementById('bg-canvas')
      const cx = cv.getContext('2d')
      let W, H, pts = []

      function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight }
      resize()
      window.addEventListener('resize', resize)

      class Pt {
        constructor() { this.reset(true) }
        reset(init) {
          this.x = Math.random() * W
          this.y = init ? Math.random() * H : H + 10
          this.r = Math.random() * 2.5 + .8
          this.vy = Math.random() * .4 + .12
          this.vx = (Math.random() - .5) * .2
          this.a = Math.random() * .28 + .06
          this.c = Math.random() < .5 ? '184,96,78' : '74,31,46'
        }
        step() { this.y -= this.vy; this.x += this.vx; if (this.y < -8) this.reset(false) }
        draw() { cx.beginPath(); cx.arc(this.x, this.y, this.r, 0, Math.PI * 2); cx.fillStyle = `rgba(${this.c},${this.a})`; cx.fill() }
      }
      for (let i = 0; i < 50; i++) pts.push(new Pt());
      (function loop() { cx.clearRect(0, 0, W, H); pts.forEach(p => { p.step(); p.draw() }); requestAnimationFrame(loop) })()
    }

    // Scroll reveal 
    function initReveal() {
      const els = document.querySelectorAll('.page.active .reveal')
      const obs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 70)
            obs.unobserve(e.target)
          }
        })
      }, { threshold: 0.1 })
      els.forEach(el => { el.classList.remove('visible'); obs.observe(el) })
    }

    // Reviews marquee
    function initReviews() {
      const REVIEWS = [
  {
    name: 'Artem S.',
    role: 'Desktop App',
    initials: 'AS',
    stars: 5,
    text: 'Needed an autoclicker with some custom logic — Nastya figured out exactly what I meant even when I couldn\'t explain it properly. Fast, clean, works perfectly.'
  },
  {
    name: 'Olena M.',
    role: 'Web',
    initials: 'OM',
    stars: 5,
    text: 'We needed a website for our local museum—one that was functional, clean, and easy to update. Nastya completed the project without a single major revision. At one point, she started offering recommendations to our designer, and, to be honest... she was right every time. We’ll continue working with her as needed. Thank you, Nastya—we highly recommend her as a professional!'
  },
  {
    name: 'Sofia K.',
    role: 'Web',
    initials: 'SK',
    stars: 5,
    text: 'I have a small coffee and sweets shop. I didn’t give any specific instructions I just told her I needed an online store. What can I say: the site loads quickly, works well, and looks great on a phone. Nastya also set it up so that orders placed on the site are sent to me via a Telegram bot. It’s very convenient for me; from time to time, Nastya checks and maintains the site for me (since I’m self-employed, I don’t have anyone to do this on a regular basis). Customers are actually using it, and to be honest, I’ve really seen an increase in revenue since the site was launched)))'
  },
  {
    name: 'Danylo R.',
    role: 'iOS App',
    initials: 'DR',
    stars: 5,
    text: 'Asked for a personal tracker for meds and water intake. Simple idea but I\'m bad at explaining — Nastya asked the right questions and built something I actually use every day.'
  },
]

      const track = document.getElementById('reviews-track')
      if (!track) return

      const doubled = [...REVIEWS, ...REVIEWS]
      track.innerHTML = doubled.map(r => `
        <div class="rev-card">
          <div class="rev-top">
            <div class="rev-avatar">${r.initials}</div>
            <div>
              <div class="rev-name">${r.name}</div>
              <div class="rev-role">${r.role}</div>
            </div>
          </div>
          <div class="rev-stars">${'✦'.repeat(r.stars)}</div>
          <div class="rev-text">${r.text}</div>
        </div>
      `).join('')

      track.addEventListener('mouseenter', () => track.classList.add('paused'))
      track.addEventListener('mouseleave', () => track.classList.remove('paused'))
    }

    onMounted(() => {
      initCursor()
      initCanvas()
      initReveal()
      initReviews()
    })

    return {
      currentPage, currentProject, PROJECTS,
      tgName, tgContact, tgMsg, tgStatus,
      rvName, rvRole, rvStars, rvHover, rvText, rvStatus, rvStarLabel,
      showPage, showProject, backToProjects, sendTelegram, submitReview,
      lightboxSrc, openLightbox
    }
  }
}).mount('#app')
