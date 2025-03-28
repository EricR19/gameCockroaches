import { CardsManager } from "./cardsManager.js";
import { Game } from "./game.js";
import { Stats } from "./libs/stats.js";

export class GameManager {
  constructor() {
    if (GameManager.instance) {
      return GameManager.instance;
    } else {
      GameManager.instance = this;
    }

    this.width = window.outerWidth;
    this.height = window.outerHeight;
    this.cardsManager = new CardsManager();
    this.game = new Game(this.width, this.height);

    let isShowingStats = false;
    if (isShowingStats) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom);

      this.game.events.on("step", (time, delta) => {
        this.stats.begin();
      });

      this.game.events.on("poststep", (time, delta) => {
        this.stats.end();
      });
    }
  }
}

// scene.transition({
//     target: target,
//     duration: 100
// });

// export const LOADER_SCENE = 'LoaderScene';
// export const MENU_SCENE = 'MenuScene';
// export const PLAY_SCENE = 'PlayScene';
// export const END_SCENE = 'EndScene';
// export const SETTINGS_SCENE = 'SettingsScene';
// export const DRAWING_SELECTION_SCENE = 'DrawingSelectionScene';
// export const PALLETE_SELECTION_SCENE = 'PalleteSelectionScene';
// export const DIFFICULTY_SCENE = 'DifficultyScene';
