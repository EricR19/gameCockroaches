import { PlayScene } from "./scenes/playScene.js";

export class GameManager {
  static instance = null;

  constructor() {
    if (GameManager.instance) {
      return GameManager.instance; // Asegurarse de que solo haya una instancia
    }

    GameManager.instance = this;

    // Configuración global del juego
    this.width = window.innerWidth; // Ancho dinámico basado en la ventana
    this.height = window.innerHeight; // Alto dinámico basado en la ventana
    this.game = null; // Inicializar la propiedad game

    // Método para obtener dimensiones
    this.getGameSize = () => {
      return {
        width: this.width,
        height: this.height,
      };
    };
  }

  createGame() {
    const config = {
      type: Phaser.AUTO,
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
      scene: [PlayScene],
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT, // Ajustar el juego para que se adapte al contenedor
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centrar el juego en la pantalla
      },
    };

    // Crear y devolver la instancia del juego
    return new Phaser.Game(config);
  }
}
