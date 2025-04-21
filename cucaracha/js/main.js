import { GameManager } from "./gameManager.js";
import { PlayScene } from "./scenes/playScene.js";
import { MenuScene } from "./scenes/menuScene.js";

window.addEventListener("load", () => {
  // Verify Phaser is available
  if (typeof Phaser === "undefined") {
    console.error("Phaser is not loaded!");
    return;
  }

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [MenuScene, PlayScene], // Make sure MenuScene is imported correctly
    // Add fallback renderer options
    render: {
      pixelArt: false,
      antialias: true,
      autoResize: true,
    },
  };

  // Initialize GameManager first
  const gameManager = new GameManager();

  try {
    // Create the game instance
    const game = new Phaser.Game(config);
    // Store game instance in GameManager if needed
    gameManager.game = game;
  } catch (error) {
    console.error("Failed to create game:", error);
  }
});
