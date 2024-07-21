const RU = 'RU';
const EN = 'EN';

const appCardsDomElem = document.getElementById('apps');

const appCards = [
  {
    imageUrl: {
      [RU]: '/assets/2048.png',
      [EN]: '/assets/2048.png',
    },
    title: {
      [RU]: '2048',
      [EN]: '2048',
    },
    description: {
      [RU]: 'Собери плитку номиналом «2048»!',
      [EN]: 'Join the numbers and get to the 2048 tile!',
    },
    link: {
      [RU]: 'https://t.me/PlayGame2048Bot',
      [EN]: 'https://t.me/PlayGame2048Bot',
    },
  },

  {
    imageUrl: {
      [RU]: '/assets/flappy_bird.png',
      [EN]: '/assets/flappy_bird.png',
    },
    title: {
      [RU]: 'Flappy Bird',
      [EN]: 'Flappy Bird',
    },
    description: {
      [RU]: 'Помоги птичке пролететь через трубы!',
      [EN]: 'Help the bird fly through the pipes!',
    },
    link: {
      [RU]: 'https://t.me/PlayFlappyBirdBot',
      [EN]: 'https://t.me/PlayFlappyBirdBot',
    },
  },

  {
    imageUrl: {
      [RU]: '/assets/tower_blocks.png',
      [EN]: '/assets/tower_blocks.png',
    },
    title: {
      [RU]: 'Tower Blocks',
      [EN]: 'Tower Blocks',
    },
    description: {
      [RU]: 'Построй самую высокую башню!',
      [EN]: 'Build a tower higher than everyone else!',
    },
    link: {
      [RU]: 'https://t.me/TowerBlocksBot',
      [EN]: 'https://t.me/TowerBlocksBot',
    },
  },

  {
    imageUrl: {
      [RU]: '/assets/crafter.png',
      [EN]: '/assets/crafter.png',
    },
    title: {
      [RU]: 'Crafter',
      [EN]: 'Crafter',
    },
    description: {
      [RU]: 'Объединяй простые элементы чтобы создать мир заново (только английский язык)!',
      [EN]: 'What happens if you combine 🔥Fire and 💧Water?',
    },
    link: {
      [RU]: 'https://t.me/CrafterXBot',
      [EN]: 'https://t.me/CrafterXBot',
    },
  },

  {
    imageUrl: {
      [RU]: '/assets/croc_ru.png',
      [EN]: '/assets/croc_en.png',
    },
    title: {
      [RU]: 'Крокодил Croc',
      [EN]: 'Charades (Mimica)',
    },
    description: {
      [RU]: 'Отгадывайте слова или фразы при помощи жестов, движений и мимики!',
      [EN]: 'Guess words or phrases using gestures, movements, and facial expressions!',
    },
    link: {
      [RU]: 'https://t.me/CrocodileCrocBot',
      [EN]: 'https://t.me/CharadesGameBot',
    },
  },

  // {
  //   imageUrl: {
  //     [RU]: '/assets/crossy_road.png',
  //     [EN]: '/assets/crossy_road.png',
  //   },
  //   title: {
  //     [RU]: 'Crossy Road',
  //     [EN]: 'Crossy Road',
  //   },
  //   description: {
  //     [RU]: 'Зачем Курочка перешла дорогу?',
  //     [EN]: 'Why did the chicken cross the road?',
  //   },
  //   link: {
  //     [RU]: 'https://t.me/ChickenCrossyRoadBot',
  //     [EN]: 'https://t.me/ChickenCrossyRoadBot',
  //   },
  // },
]

function getLanguage() {
  try {
    if ('Telegram' in window) {
      const language = window.Telegram.WebApp.initDataUnsafe.user.language_code;
      return language.toUpperCase() === RU ? RU : EN;
    } else {
      return EN;
    }
  } catch {
    return EN;
  }
}

function injectAppCards() {
  console.log('injectAppCards');
  appCardsDomElem.textContent = '';

  const language = getLanguage();

  for (const app of appCards) {
    console.log('injectAppCards app:', app);
    // Create the main app item div
    const appItem = document.createElement('div');
    appItem.classList.add('apps__item');

    // Create the img element
    const appLogo = document.createElement('img');
    appLogo.classList.add('apps__item__logo');
    appLogo.src = app.imageUrl[language];
    appLogo.alt = app.title[language];

    // Create the info div
    const appInfo = document.createElement('div');
    appInfo.classList.add('apps__item__info');

    // Create the name div
    const appName = document.createElement('div');
    appName.classList.add('apps__item__info__name');
    appName.textContent = app.title[language];

    // Create the description div
    const appDescription = document.createElement('div');
    appDescription.classList.add('apps__item__info__description');
    appDescription.textContent = app.description[language];

    // Append the name and description to the info div
    appInfo.appendChild(appName);
    appInfo.appendChild(appDescription);

    // Create the link button
    const appButton = document.createElement('a');
    appButton.classList.add('apps__item__button');
    appButton.href = app.link[language];
    appButton.textContent = 'Play';

    // Append the img, info div, and button to the main app item div
    appItem.appendChild(appLogo);
    appItem.appendChild(appInfo);
    appItem.appendChild(appButton);

    // Append the main app item div to the app cards container
    console.log('injectAppCards appCardsDomElem.appendChild(appItem)');
    appCardsDomElem.appendChild(appItem);
  }
}

function expandMiniApp() {
  console.log('expandMiniApp');
  try {
    if (!window.Telegram.WebApp.isExpanded) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');

      // Part of fix scroll top
      window.scrollTo(0, 0);
    }
  } catch {
    /* noop */
  }
}

document.addEventListener('DOMContentLoaded', () => {
  expandMiniApp();
  setInterval(() => expandMiniApp(), 1000);

  injectAppCards();
});
