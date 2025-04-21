export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" });
  }

  init(data) {
    this.gameResult = data.gameResult; // 'win', 'lose', or undefined for first game
  }

  create() {
    const { width, height } = this.cameras.main;

    // Add background
    this.add
      .rectangle(0, 0, width, height, 0x000000)
      .setOrigin(0)
      .setAlpha(0.8);

    // Show game result if exists
    if (this.gameResult) {
      const resultText = this.gameResult === "win" ? "¡GANASTE!" : "GAME OVER";
      const resultColor = this.gameResult === "win" ? "#00ff00" : "#ff0000";

      this.add
        .text(width / 2, height / 4, resultText, {
          fontSize: "64px",
          fill: resultColor,
          fontStyle: "bold",
          shadow: {
            offsetX: 2,
            offsetY: 2,
            color: "#000",
            blur: 2,
            fill: true,
          },
        })
        .setOrigin(0.5);
    }

    // Title
    this.add
      .text(width / 2, height / 2 - 50, "CUCARACHA GAME", {
        fontSize: "48px",
        fill: "#fff",
        fontStyle: "bold",
        padding: { x: 20, y: 10 },
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000",
          blur: 2,
          fill: true,
        },
      })
      .setOrigin(0.5);

    // Play button with hover effects
    const playText = this.gameResult ? "JUGAR DE NUEVO" : "JUGAR";
    const playButton = this.add
      .text(width / 2, height / 2 + 50, playText, {
        fontSize: "32px",
        fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        playButton.setStyle({ fill: "#ff0" });
        playButton.setScale(1.1);
      })
      .on("pointerout", () => {
        playButton.setStyle({ fill: "#fff" });
        playButton.setScale(1);
      })
      .on("pointerdown", () => this.startGame());
  }

  startGame() {
    this.scene.start("playScene");
  }
}
