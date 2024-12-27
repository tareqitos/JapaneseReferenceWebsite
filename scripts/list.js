const reponse = await fetch('scripts/list-links.json')
const links = await reponse.json()
const beginnersArray = links.beginners
const dicoArray = links.dictionaries
const grammarArray = links.grammar
const kanjiArray = links.kanji
const readingArray = links.reading
const miscArray = links.misc
const mediaArray = links.media
const softwareArray = links.software
const categories = [
  beginnersArray,
  dicoArray,
  grammarArray,
  kanjiArray,
  readingArray,
  miscArray,
  mediaArray,
  softwareArray
]
const categoriesName = [
  'beginners',
  'dictionaries',
  'grammar',
  'kanji',
  'reading',
  'misc',
  'media',
  'software'
]

createCategoriesAndSort()

////////////////////////////////////////////////// SORT ELEMENTS IN MEDIA //////////////////////////////////////////////////

function sortItems () {
  const selectedCategory = document.getElementById('sort-media').value
  const items = document.querySelectorAll('.item')

  items.forEach(item => {
    const category = item.getAttribute('data-category')
    if (selectedCategory === 'all' || selectedCategory === category) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

const selectElement = document.getElementById('sort-media')
selectElement.addEventListener('change', sortItems)

sortItems()

////////////////////////////////////////////////// CREATE AND SORT CATEGORIES //////////////////////////////////////////////////

function createCategoriesAndSort () {
  for (let i = 0; i < categories.length; i++) {
    const checkCategory = document.getElementById(categoriesName[i])

    if (checkCategory) {
      console.log(categoriesName[i])
      sortByName(categories[i])

      const suggestion = {
        id: 'suggestion',
        name: '+',
        link: '',
        description: 'Submit your recommendation/website!',
        favicon: '',
        device: '',
        pic: '',
        type: ' all video podcast instagram'
      }

      categories[i] = [...categories[i], suggestion]

      createElement(categories[i], categoriesName[i])
    }
  }
}

////////////////////////////////////////////////// CREATE DOM ELEMENTS //////////////////////////////////////////////////

function createElement (arrayElement, sectionToQuery) {
  for (let i = 0; i < arrayElement.length; i++) {
    const array = arrayElement[i]

    const sectionItems = document.querySelector(
      '.section-' + sectionToQuery + '-items'
    )

    const itemContainer = document.createElement('div')
    const itemContainerParent = document.createElement('div')

    const link = document.createElement('a')
    const linkName = document.createElement('p')
    const desc = document.createElement('p')

    defineElements(
      array,
      itemContainer,
      itemContainerParent,
      link,
      linkName,
      desc,
      sectionToQuery
    )
    appendElements(
      sectionItems,
      itemContainer,
      itemContainerParent,
      link,
      linkName,
      desc,
      sectionToQuery
    )

    // IF SECTION IS MEDIA, CREATE IMAGE MINIATURE //

    if (sectionToQuery === 'media') {
      setTimeout(function () {
        itemContainer.classList.add('appear')
      })
      createImageTag(array, itemContainerParent)
    }

    /* causing ssl issues in firefox 
    // ADD FAVICON TO DESCRIPTION EXCEPT FOR SOFTWARE //

    if (sectionToQuery !== 'software') {
      const descIcon = document.createElement('img')
      descIcon.className = 'desc-favicon'
      descIcon.src = array.favicon
      desc.appendChild(descIcon)
    }
    */

    addSoftwareIcons(sectionToQuery, array, itemContainer)
    addRecommendationStar(array, itemContainerParent, linkName, sectionToQuery)
  }
}

////////////////////////////////////////////////// ADD ATTRIBUTE TO CREATED ELEMENTS //////////////////////////////////////////////////

function defineElements (
  array,
  itemContainer,
  itemContainerParent,
  link,
  linkName,
  desc,
  sectionToQuery
) {
  if (sectionToQuery !== 'software') {
    itemContainer.id = array.id
  }

  if (sectionToQuery === 'software') {
    itemContainerParent.id = array.id
    desc.id = 'desc-' + array.id
    linkName.className = 'item-title'
    linkName.id = 'title-' + array.id
  }

  itemContainer.className = 'item-container'
  itemContainerParent.className = 'item-container-parent ' + sectionToQuery
  if (array.id !== 'suggestion') {
    link.href = array.link
    link.setAttribute('target', '_blank')
  }

  linkName.innerText = array.name

  desc.innerText = array.description
  desc.className = 'item-desc'
}

////////////////////////////////////////////////// PARENT ELEMENTS //////////////////////////////////////////////////

function appendElements (
  sectionItems,
  itemContainer,
  itemContainerParent,
  link,
  linkName,
  desc,
  sectionToQuery
) {
  sectionItems.appendChild(itemContainer)

  itemContainer.appendChild(link)
  link.appendChild(itemContainerParent)
  if (sectionToQuery === 'media') {
    itemContainer.appendChild(linkName)
  } else {
    itemContainerParent.appendChild(linkName)
  }
  itemContainer.appendChild(desc)
}

////////////////////////////////////////////////// ADD SOFTWARE ICONS IN SOFTWARE //////////////////////////////////////////////////

function addSoftwareIcons (sectionToQuery, array, itemContainer) {
  if (sectionToQuery === 'software') {
    const devices = ['windows', 'apple', 'android']
    const softwareDesc = document.querySelector(
      '.item-container #desc-' + array.id
    )
    const iDiv = document.createElement('div')
    iDiv.className = 'software-icon'

    for (let i = 0; i < devices.length; i++) {
      const icon = document.createElement('i')
      if (array.device.includes(devices[i])) {
        icon.classList = 'fa-brands fa-' + devices[i]
        itemContainer.appendChild(iDiv).appendChild(icon)
        iDiv.appendChild(softwareDesc)
        iDiv.prepend(softwareDesc)
      }
    }
  }
}

////////////////////////////////////////////////// CREATE IMAGE TAG FOR MEDIA ELEMENTS //////////////////////////////////////////////////

function createImageTag (array, itemContainerParent) {
  const img = document.createElement('img')
  img.className = 'thumbnail-' + array.id
  img.src = array.pic
  itemContainerParent.appendChild(img)
}

function addRecommendationStar (
  array,
  itemContainerParent,
  linkName,
  sectionToQuery
) {
  if (array.recommended === 'true') {
    const star = document.createElement('i')

    if (sectionToQuery === 'media') {
      star.className = 'fa-solid fa-star star-user-media'
      linkName.appendChild(star)
    } else {
      star.className = 'fa-solid fa-star star-user'
      itemContainerParent.appendChild(star)
    }

    console.log('Star created for ' + array)
  }
}

////////////////////////////////////////////////// SORT ELEMENTS //////////////////////////////////////////////////

function sortByName (array) {
  array.sort(function (a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }

    return 0
  })
}

////////////////////////////////////////////////// SUGGESTION FORM //////////////////////////////////////////////////

const suggestionForm = document.querySelector('.suggestion-box')
const suggestionBackground = document.querySelector('.suggestion-background')
const suggestionButton = document.querySelectorAll('#suggestion')
const suggestionConfirmButton = document.getElementById('submit')

const thanksBox = document.querySelector('.thankyou-box')
const thanksCloseButton = document.querySelector('.thankyou-close')
const errorBox = document.querySelector('.error-box')
const errorCloseButton = document.querySelector('.error-close')
const errorMessage = document.querySelector('.incorrect-msg')

suggestionButton.forEach(button => {
  button.addEventListener('click', () => {
    suggestionForm.classList.toggle('suggestion-box--active')
    suggestionBackground.classList.toggle('suggestion-background--active')

    if (suggestionForm.classList.contains('suggestion-box--active')) {
      suggestionForm.style.display = 'flex'
      suggestionBackground.style.display = 'block'
      document.body.style.overflow = 'hidden'
    }
  })
})

suggestionBackground.addEventListener('click', () => {
  closeSuggestionBackground()
})

thanksCloseButton.addEventListener('click', () => {
  closeThanksButton(thanksBox)
})

errorCloseButton.addEventListener('click', () => {
  closeThanksButton(errorBox)
})

function closeSuggestionBackground () {
  suggestionBackground.classList.remove('suggestion-background--active')
  suggestionForm.classList.remove('suggestion-box--active')
  suggestionBackground.style.display = 'none'
  suggestionForm.style.display = 'none'
  thanksBox.style.display = 'none'
  document.body.style.overflow = 'visible'
  errorMessage.style.display = 'none'
  errorMessage.style.bottom = '45px'
  errorMessage.style.opacity = '0'
}

function closeThanksButton (button) {
  button.style.display = 'none'
  suggestionBackground.classList.remove('suggestion-background--active')
  suggestionBackground.style.display = 'none'
  document.body.style.overflow = 'visible'
  errorMessage.style.display = 'none'
  errorMessage.style.bottom = '45px'
  errorMessage.style.opacity = '0'
}

function suggestionIsValid () {
  suggestionForm.classList.remove('suggestion-box--active')
  suggestionForm.style.display = 'none'
  thanksBox.style.display = 'flex'
}

function suggestionIsNotValid () {
  suggestionForm.classList.remove('suggestion-box--active')
  suggestionForm.style.display = 'none'
  errorBox.style.display = 'flex'
}

$(document).ready(function () {
  $('#submit').on('click', function () {
    var form = $('#myForm')[0]

    if (form.checkValidity()) {
      const loadingAnimation = document.querySelector('.lds-ellipsis')
      const submitButtonText = document.getElementById('submit-text')
      submitButtonText.style.display = 'none'
      loadingAnimation.style.display = 'inline-block'

      var formData = {
        name: $('#add-name').val(),
        title: $('#add-title').val(),
        link: $('#add-link').val(),
        category: $('#category').val()
      }

      $.ajax({
        url: 'https://formsubmit.co/ajax/social@tareqitos.com',
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
          // Handle the success response
          suggestionIsValid()
          submitButtonText.style.display = 'block'
          loadingAnimation.style.display = 'none'
          console.log(response)
        },
        error: function (error) {
          // Handle the error response
          suggestionIsNotValid()
          submitButtonText.style.display = 'block'
          loadingAnimation.style.display = 'none'
          console.error(error)
        }
      })
    } else {
      // If the form is not valid, you can add your own handling logic here

      errorMessage.style.display = 'block'
      setTimeout(() => {
        errorMessage.style.bottom = '0'
        errorMessage.style.opacity = '1'
      }, 10)

      console.log('Form is not valid')
    }
  })
})

////////////////////////////////////////////////// UPDATE ELEMENTS IN MEDIA //////////////////////////////////////////////////

function updateDisplayedItems (category) {
  const mediaContainer = document.querySelector('.section-media-items')

  let mediaData
  // Sélectionnez les données en fonction de la catégorie choisie
  if (category === 'all') {
    mediaData = links.media
  } else {
    mediaData = links.media.filter(all => all.type.includes(category))
  }

  const mediaElements = document.querySelectorAll(
    '.section-media-items .item-container'
  )

  // Ajoutez une classe CSS pour activer l'animation de scale
  mediaElements.forEach(element => {
    element.classList.add('disappear')
  })

  // Check si les éléments ne sont pas chargés
  if (mediaContainer.lastElementChild == null) {
    createElement(mediaData, 'media')
  } else {
    // Attendez la fin de l'animation avant de supprimer les éléments
    setTimeout(() => {
      while (mediaContainer.lastElementChild) {
        mediaContainer.lastElementChild.remove()
      }

      // Créez les nouveaux éléments

      createElement(mediaData, 'media')
      updateCollapseContentHeight()
    }, 300) // la durée de l'animation CSS (0.3s dans cet exemple)
  }
}

// Event listener pour l'élément select
const sortMediaSelect = document.getElementById('sort-media')
const selectionMessage = document.querySelector('.selection-message')
const mediaContainer = document.querySelector('.section-media-items')
const collapseContent = document.querySelector(
  '.collapse-media .collapse-content'
)
const mediaHeader = document.querySelector('.collapse-media')

sortMediaSelect.selectedIndex = 0
console.log(sortMediaSelect.selectedIndex)

sortMediaSelect.addEventListener('change', event => {
  const selectedCategory = event.target.value
  selectionMessage.style.display = 'none'
  updateDisplayedItems(selectedCategory)
  updateCollapseContentHeight()
})

function updateCollapseContentHeight () {
  // Set the height of collapseContent to its scrollHeight
  collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px'
}

updateCollapseContentHeight()

// Initialize en affichant tous les éléments initialement
updateDisplayedItems()