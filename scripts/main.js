// check if user is using a mobile browser
function isMobileDevice() {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

if (isMobileDevice()) {
  console.log("L'utilisateur utilise un navigateur mobile.")
} else {
  console.log("L'utilisateur n'utilise pas un navigateur mobile.")
}

////////////////////////////////////////////////// UMAMI ANALYTICS //////////////////////////////////////////////////

const buttons = document.querySelectorAll('a');

buttons.forEach(button => {
  button.onclick = () => umami.track(button.getAttribute('href'));
})


////////////////////////////////////////////////// DESCRIPTION BOX //////////////////////////////////////////////////

const box = document.querySelector('.description-box')
const mediaItems = document.querySelectorAll('.media img')
const mediaItemsDesc = document.querySelectorAll('.media-item-desc')

mediaItems.forEach((mediaItem, index) => {
  const desc = document.createElement('p');

  mediaItem.addEventListener('mousemove', event => {
    box.style.visibility = 'visible'
    box.style.left = event.pageX + 50 + 'px'
    box.style.top = event.pageY + -25 + 'px'

    desc.textContent = mediaItemsDesc[index].textContent;
    if (!box.contains(desc)) {
      box.appendChild(desc); // Append only if not already added
    }

  })

  mediaItem.addEventListener('mouseleave', event => {
    box.style.visibility = 'hidden'
    box.style.left = 0
    box.style.top = 0

    if (box.contains(desc)) {
      box.removeChild(desc); // Remove if added
    }

  })
})


////////////////////////////////////////////////// COLLAPSE CATEGORIES //////////////////////////////////////////////////

const anchorButton = document.querySelectorAll('li a')
const collapseButton = document.querySelectorAll('.collapse-button')
const collapseContent = document.querySelectorAll('.collapse-content')

const rollAndCollapseIcon = document.getElementById('roll-collapse-icon')
let isCollapsed = false

collapseCategories()
rollAndCollapseAll()
anchorOpenCategories()

function rollAndCollapseAll() {
  const rollAndCollapseButton = document.querySelector('.roll-collapse')
  

  if (rollAndCollapseButton === null) {
    return
  }
  rollAndCollapseButton.addEventListener('click', () => {
    if (isCollapsed === true) {
      expandAll()
      isCollapsed = false;
      rollAndCollapseIcon.classList.remove('fa-expand')
      rollAndCollapseIcon.classList.add('fa-compress')
    } else {
      collapseAll()
      isCollapsed = true;
      rollAndCollapseIcon.classList.remove('fa-compress')
      rollAndCollapseIcon.classList.add('fa-expand')
    }  
  })
}

function collapseAll() {
    for (i = 0; i < collapseContent.length; i++) {
      collapse(collapseContent[i])
      collapseButton[i].classList.replace('open', 'close')
      collapseButton[i].classList.add('collapse-button--active')
    }
}

function expandAll() {
    for (i = 0; i < collapseContent.length; i++) {
      roll(collapseContent[i])
      collapseButton[i].classList.replace('close', 'open')
      collapseButton[i].classList.remove('collapse-button--active')
    }
}

function collapseCategories() {

  collapseButton.forEach(button => {
    const collapseContent = button.nextElementSibling
    button.addEventListener('click', () => {
      button.classList.toggle('collapse-button--active')
      if (button.classList.contains('collapse-button--active')) {
        collapse(collapseContent)
      } else {
        roll(collapseContent)
      }
    })
  })
}

function anchorOpenCategories() {
  anchorButton.forEach((anchor, index) => {
    anchor.addEventListener('click', () => {
      if (collapseButton[index].classList.contains('collapse-button--active')) {
        const videoCategoryIndex = collapseButton[index].parentNode.classList.contains('collapse-video')
        const gamingCategoryIndex = collapseButton[index].parentNode.classList.contains('collapse-gaming')
        const audioCategoryIndex = collapseButton[index].parentNode.classList.contains('collapse-podcast')
        const socialCategoryIndex = collapseButton[index].parentNode.classList.contains('collapse-social')

        collapseButton[index].classList.toggle('collapse-button--active')

        if (videoCategoryIndex || gamingCategoryIndex || audioCategoryIndex || socialCategoryIndex) {
          const collapseMediaButton = document.querySelector('.collapse-media-button')
          const collapseMediaContent = document.querySelector('.collapse-media-content')

          if (collapseMediaButton.classList.contains('collapse-button--active')) {
            collapseMediaButton.classList.remove('collapse-button--active')
          }
          
          roll(collapseMediaContent)

          console.log('Media Rolled')
        }

        roll(collapseContent[index])
      }
    })
  })
}

function roll(collapseContent) {

  const collapseMedia = document.querySelector('.collapse-media .collapse-content')
  const collapsePodcast = document.querySelector('.collapse-podcast .collapse-content')
  const collapseSocial = document.querySelector('.collapse-social .collapse-content')
  const collapseVideo = document.querySelector('.collapse-video .collapse-content')
  const collapseGaming = document.querySelector('.collapse-gaming .collapse-content')

  isCollapsed = false
  rollAndCollapseIcon.classList.remove('fa-expand')
  rollAndCollapseIcon.classList.add('fa-compress')

  collapseContent.style.maxHeight = collapseContent.scrollHeight + collapseMedia.scrollHeight + collapseVideo.scrollHeight + collapseGaming.scrollHeight + collapsePodcast.scrollHeight + collapseSocial.scrollHeight + 'px'

  collapseContent.style.opacity = 1
  collapseContent.style.marginTop = 10 + 'px'
  collapseContent.style.marginBottom = 30 + 'px'
  collapseContent.style.overflowY = 'visible'

  collapseContent.style.userSelect = 'unset'

  if (collapseContent.style.maxHeight !== 0) {
    window.addEventListener('resize', () => {
      collapseContent.style.maxHeight = collapseContent.scrollHeight + collapseMedia.scrollHeight + collapseVideo.scrollHeight + collapseGaming.scrollHeight + collapsePodcast.scrollHeight + collapseSocial.scrollHeight + 'px'
    })
  }
}

function collapse(collapseContent) {
  collapseContent.style.maxHeight = 0
  collapseContent.style.opacity = 0
  collapseContent.style.marginTop = 0
  collapseContent.style.marginBottom = 10 + 'px'
  collapseContent.style.overflowY = 'hidden'

  collapseContent.style.userSelect = 'none'

  window.addEventListener('resize', () => {
    collapseContent.style.maxHeight = 0
  })

}

////////////////////////////////////////////////// PREVENT ANCHOR LINKS BEING ADDED TO THE URL //////////////////////////////////////////////////

document.querySelectorAll("a[href*='#']").forEach(function (current) {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  if (current.origin + current.pathname != self.location.href) {
    return
  }

  ; (function (anchorPoint) {
    if (anchorPoint) {
      current.addEventListener('click', function (e) {
          anchorPoint.scrollIntoView({ behavior: 'smooth' })
          e.preventDefault()
        },
        false
      )
    }
  })
  
  (document.querySelector(current.hash))
})

////////////////////////////////////////////////// BACK TO TOP BUTTON //////////////////////////////////////////////////

const backToTopButton = document.getElementById('back-to-top')
const footer = document.getElementById('footer')

window.onscroll = function () {
  scrollFunction()
}

backToTopButton.addEventListener('click', backToTop)

backToTopButton.addEventListener('scoll', event => {
  console.log(backToTopButton.scrollTop)
})

function isFooterVisible() {
  const rect = footer.getBoundingClientRect()
  return rect.top <= window.innerHeight + 50
}

function scrollFunction() {
  if (
    document.body.scrollTop > 150 ||
    (document.documentElement.scrollTop > 150 && !isFooterVisible())
  ) {
    backToTopButton.style.opacity = 1
    backToTopButton.style.zIndex = 99
  } else {
    backToTopButton.style.opacity = 0
    backToTopButton.style.zIndex = -99
  }
}

function backToTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

////////////////////////////////////////////////// DAY/NIGHT MODE //////////////////////////////////////////////////

darkTheme()

function darkTheme() {
  const html = document.getElementById('body')
  const themeSwitch = document.getElementById('theme-logo')
  const autoDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const tareqitoscomIcon = document.getElementById('tareqitos-favico')
  const buttonCollapseAll = document.querySelector('.img-coll')
  const buttonExpandAll = document.querySelector('.img-roll')

  // Fonction pour définir le thème et enregistrer la préférence de l'utilisateur
  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.toggle('night-mode')
      themeSwitch.innerHTML = '🔆'
      if (tareqitoscomIcon != null) {
        tareqitoscomIcon.style.filter = 'none'
      }
      if (buttonCollapseAll != null || buttonExpandAll != null) {
        buttonCollapseAll.style.filter = 'brightness(100)'
        buttonExpandAll.style.filter = 'brightness(100)'
      }
      localStorage.setItem('themePreference', 'dark')
    } else {
      html.classList.remove('night-mode')
      themeSwitch.innerHTML = '🌙'
      if (tareqitoscomIcon != null) {
        tareqitoscomIcon.style.filter = 'invert(1)'
      }
      if (buttonCollapseAll != null || buttonExpandAll != null) {
        buttonCollapseAll.style.filter = 'none'
        buttonExpandAll.style.filter = 'none'
      }
      localStorage.setItem('themePreference', 'light')
    }
  }

  // Vérifie s'il y a une préférence de thème enregistrée dans localStorage
  const userThemePreference = localStorage.getItem('themePreference')

  if (userThemePreference) {
    setTheme(userThemePreference) // Si une préférence utilisateur est enregistrée, utilisez-la
  } else if (autoDarkTheme.matches) {
    setTheme('dark') // Sinon, utilisez le thème automatique
  } else {
    setTheme('light')
  }

  themeSwitch.addEventListener('click', () => {
    html.classList.contains('night-mode')
    if (html.classList.contains('night-mode')) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  })
}
