import { GameManager } from "../gameManager.js";

export class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  create() {
    const width = GameManager.instance.width;
    const height = GameManager.instance.height;

    // Add "Game Over" text
    this.add
      .text(width / 2, height / 2 - 150, "Game Over", {
        fontSize: "40px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Add "Play Again" button
    const playAgainBtn = this.add
      .text(width / 2, height / 2 - 50, "Play Again", {
        fontSize: "30px",
        color: "#ffffff",
        backgroundColor: "#007bff",
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playAgainBtn.on("pointerdown", () => {
      this.scene.stop("EndScene"); // Stop the EndScene
      this.scene.stop("PlayScene"); // Stop the PlayScene
      this.scene.start("PlayScene"); // Restart the PlayScene
    });

    // Add "Menu" button
    const menuBtn = this.add
      .text(width / 2, height / 2 + 50, "Menu", {
        fontSize: "30px",
        color: "#ffffff",
        backgroundColor: "#007bff",
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    menuBtn.on("pointerdown", () => {
      this.scene.start("MenuScene"); // Navigate to the MenuScene (if implemented)
    });
  }
}
