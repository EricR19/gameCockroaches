import { PlayScene } from "./scenes/playScene.js";
import { EndScene } from "./scenes/endScene.js";

export class Game extends Phaser.Game {
  constructor(width, height) {
    let config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      backgroundColor: "#E6E7E8",
    };

    super(config);

    this.scene.add("PlayScene", PlayScene);
    this.scene.add("EndScene", EndScene);
    this.scene.start("PlayScene");
    // let game = new Phaser.Game(config);
  }
}
