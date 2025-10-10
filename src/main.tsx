import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Font Awesome Configuration
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube, faXTwitter, faGithub, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faBars, faXmark, faHeart, faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faArrowUp, faCheckCircle, faArrowRight, faUsers, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons'

library.add(faInstagram, faFacebook, faTwitter, faLinkedin, faYoutube, faXTwitter, faGithub, faTiktok, faBars, faXmark, faHeart, faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faArrowUp, faCheckCircle, faArrowRight, faUsers, faStar, faTrophy)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
