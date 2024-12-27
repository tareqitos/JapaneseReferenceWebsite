async function fetchData () {
  try {
    const reponse = await fetch('scripts/list-links.json')
    const links = await reponse.json()

    ////////////////////////////////////////////////// SIDEBAR //////////////////////////////////////////////////

    
    const stickyNav = document.querySelector('.nav-sticky')

    const sidebarDisplay = (stickyNav, width) => {
      const sidebarNav = document.querySelector('.sidebar-nav')

      if ($(window).width() < width) {
        document.body.appendChild(stickyNav)
      } else {
        sidebarNav.appendChild(stickyNav)
      }
    }

    window.addEventListener('resize', () => {
      sidebarDisplay(stickyNav, 1024)
    })
    sidebarDisplay(stickyNav, 1024)


    ////////////////////////////////////////////////// PODCAST FLOATING WINDOWS //////////////////////////////////////////////////

    const body = document.getElementById('body')
    const podcastButtons = document.querySelectorAll('.podcast-button') // Select all buttons

    podcastButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const audioPlayer = document.querySelector('.audio-player') // Find existing audio player

        // Create new audio player
        const audioPlayerDiv = document.createElement('div')
        const iframeElement = document.createElement('iframe')
        const closePodcast = document.createElement('i')

        audioPlayerDiv.setAttribute('class', 'audio-player')
        closePodcast.setAttribute(
          'class',
          'button pod-button fa-solid fa-xmark'
        )

        // Get the URL from the button's data attribute
        const podcasts = [
          'https://open.spotify.com/embed/episode/2Br6kFlZDCCizEV9cpy81B?utm_source=generator',
          'https://open.spotify.com/embed/episode/4qjerzMw8jfD30VOG0tjpK?utm_source=generator',
          'https://open.spotify.com/embed/episode/3UcFXYPz3Gs0RGb0p1bU6R?utm_source=generator',
          'https://open.spotify.com/embed/episode/0AINRiHlZf72aKp87lhDTr?utm_source=generator',
          'https://open.spotify.com/embed/episode/19erZTAnA2yi5WET81rvfh?utm_source=generator'
        ]

        let podcastHeight = 152

        if (window.innerWidth < 750) {
          podcastHeight = 100
        }

        // Set attributes for the iframe
        setAttributes(iframeElement, {
          style: 'border-radius:12px',
          src: podcasts[index], // Use the URL from the button
          width: '100%',
          height: podcastHeight,
          frameBorder: '0',
          allowfullscreen: '',
          allow:
            'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"',
          loading: 'lazy'
        })

        body.appendChild(audioPlayerDiv)
        audioPlayerDiv.appendChild(closePodcast)
        audioPlayerDiv.appendChild(iframeElement)

        audioPlayerDiv.style.display = 'block'
        setTimeout(() => {
          audioPlayerDiv.style.opacity = 1
        }, 500)

        // Remove existing audio player if it exists
        if (audioPlayer !== null) {
          audioPlayer.remove()
          console.log('audio player has been removed')
        }

        // Add event listener for the close button after it has been created
        closePodcast.addEventListener('click', () => {
          audioPlayerDiv.remove() // Remove the audio player div
          console.log('audio player has been closed')
        })
      })
    })

    // Function to set attributes on an element
    function setAttributes (element, attr) {
      for (let key in attr) {
        element.setAttribute(key, attr[key])
      }
    }

    ////////////////////////////////////////////////// BACKGROUND //////////////////////////////////////////////////

    const characters = ["人", "一", "日", "大", "年", "出", "本", "中", "子", "見", "国", "言", "上", "分", "生", "手", "自", "行", "者", "二", "間", "事", "思", "時", "気", "会", "十", "家", "女", "三", "前", "的", "方", "入", "小", "地", "合", "後", "目", "長", "場", "代", "私", "下", "立", "部", "学", "物", "月", "田", "何", "来", "彼", "話", "体", "動", "社", "知", "理", "山", "内", "同", "心", "発", "高", "実", "作", "当", "新", "世", "今", "書", "度", "明", "五", "戦", "力", "名", "金", "性", "対", "意", "用", "男", "主", "通", "関", "文", "屋", "感", "郎", "業", "定", "政", "持", "道", "外", "取", "所", "現"];
    const container = document.querySelector('.background')
    const numCharacters = 20 // Adjust this number as needed

    for (let i = 0; i < numCharacters; i++) {
      const charElement = document.createElement('div')
      charElement.classList.add('character')
      charElement.textContent =
        characters[Math.floor(Math.random() * characters.length)]

      // Random positions
      const top = Math.random() * 100
      const left = Math.random() * 100

      // Random delays
      const delay = Math.random() * 30

      // Random displacements
      const translateX = (Math.random() - 0.5) * 40 // Random value between -20 and 20
      const translateY = (Math.random() - 0.5) * 40
      const translateXEnd = (Math.random() - 0.5) * 80 // Random value between -40 and 40
      const translateYEnd = (Math.random() - 0.5) * 80

      // Random scales
      const scaleMid = 1 + Math.random() * 1 // Random value between 1 and 2
      const scaleEnd = 1 + Math.random() * 1 // Random value between 1 and 2

      charElement.style.top = `${top}%`
      charElement.style.left = `${left}%`
      charElement.style.animationDelay = `${delay}s`
      charElement.style.setProperty('--translate-x', `${translateX}px`)
      charElement.style.setProperty('--translate-y', `${translateY}px`)
      charElement.style.setProperty('--translate-x-end', `${translateXEnd}px`)
      charElement.style.setProperty('--translate-y-end', `${translateYEnd}px`)
      charElement.style.setProperty('--scale-mid', scaleMid)
      charElement.style.setProperty('--scale-end', scaleEnd)

      container.appendChild(charElement)
    }

    ////////////////////////////////////////////////// SUGGESTION FORM //////////////////////////////////////////////////

    const suggestionForms = document.querySelectorAll('.suggestion-form')
    const suggestionTexts = document.querySelectorAll('.suggestion-text')
    const suggButtons = document.querySelectorAll('.suggestion-button')
    const thanksTexts = document.querySelectorAll('.thanks-text')
    const errorTexts = document.querySelectorAll('.error-text')

    suggButtons.forEach((suggButton, index) => {
      suggButton.addEventListener('click', () => {
        const suggestionForm = suggestionForms[index]
        const suggestionText = suggestionTexts[index]
        const thanksText = thanksTexts[index]
        const errorText = errorTexts[index]

        suggestionForm.classList.toggle('suggestion-form--active')

        if (suggestionForm.classList.contains('suggestion-form--active')) {
          suggestionText.style.opacity = 0
          setTimeout(() => {
            suggestionText.style.display = 'none'
            suggestionForm.style.display = 'flex'
            suggestionForm.style.gap = 5 + 'px'
            setTimeout(() => {
              suggestionForm.style.opacity = 1
            }, 50)
          }, 50)
        } else {
          suggestionForm.classList.toggle('suggestion-form')
          suggestionForm.style.opacity = 0
          thanksText.style.opacity = 0
          errorText.style.opacity = 0
          setTimeout(() => {
            suggestionForm.style.display = 'none'
            suggestionText.style.display = 'block'
            thanksText.style.display = 'none'
            errorText.style.display = 'none'
            setTimeout(() => {
              suggestionText.style.opacity = 1
            }, 50)
          }, 50)

          thanksText.style.opacity = 0
          errorText.style.opacity = 0
          setTimeout(() => {
            thanksText.style.display = 'none'
            errorText.style.display = 'none'
          }, 50)
        }
      })
    })

    ////// INPUT VALIDATOR //////

    let inputs = document.querySelectorAll('.input')
    let buttonSends = document.querySelectorAll('.submit')

    let inputValidator = {
      name: false,
      title: false,
      link: false
    }

    inputs.forEach(input => {
      input.addEventListener('input', event => {
        let name = event.target.getAttribute('name')
        if (event.target.value.length > 0) {
          inputValidator[name] = true
        } else {
          inputValidator[name] = false
        }

        let allTrue = Object.keys(inputValidator).every(item => {
          return inputValidator[item] === true
        })

        buttonSends.forEach(buttonSend => {
          if (allTrue) {
            buttonSend.disabled = false
            buttonSend.style.pointerEvents = 'unset'
          } else {
            buttonSend.disabled = true
            buttonSend.style.pointerEvents = 'none'
          }
        })
      })
    })

    function suggestionIsValid (suggestionForm, thanksTexts, form) {
      suggestionForm.classList.toggle('suggestion-form')
      suggestionForm.style.display = 'none'

      thanksTexts.style.display = 'block'
      thanksTexts.style.opacity = 1

      form.reset()
    }

    buttonSends.forEach((buttonSend, index) => {
      buttonSend.addEventListener('click', event => {
        event.preventDefault()

        let form = event.target.closest('form')
        let loadingAnimation = form.querySelector('.lds-ellipsis')
        let submitButtonText = form.querySelector('.submit-text')
        const thanksText = thanksTexts[index]
        const errorText = errorTexts[index]
        const suggestionForm = suggestionForms[index]
        const suggButton = suggButtons[index]

        if (!form.checkValidity()) {
          suggButton.style.pointerEvents = 'unset'
          return
        }

        form.classList.add('sending')
        /*
          Use the "sending" class that will be added to the form
          to setup the CSS files accordingly instead of having
          the style changes below as JS scripts.
        */

        submitButtonText.style.display = 'none'
        loadingAnimation.style.display = 'inline-block'

        buttonSend.disabled = true
        buttonSend.style.pointerEvents = 'none'

        suggButton.style.pointerEvents = 'none'

        let formData = Object.fromEntries(new FormData(form))
        $.ajax({
          url: 'https://formsubmit.co/ajax/social@tareqitos.com',
          method: 'POST',
          data: formData,
          dataType: 'json',

          success: function (response) {
            submitButtonText.style.display = 'block'
            loadingAnimation.style.display = 'none'

            suggButton.style.pointerEvents = 'unset'

            suggestionIsValid(suggestionForm, thanksText, form)
            console.log(response)

            form.classList.remove('sending')
          },

          error: function (error) {
            suggestionForm.classList.toggle('suggestion-form')
            suggestionForm.style.display = 'none'

            submitButtonText.style.display = 'block'
            loadingAnimation.style.display = 'none'

            suggButton.style.pointerEvents = 'unset'

            errorText.style.display = 'block'

            form.classList.remove('sending')

            setTimeout(() => {
              errorText.style.opacity = 1
            })

            console.error(error)
          }
        })
      })
    })
  } catch (erreur) {
    console.error(erreur)
  }
}

fetchData()
