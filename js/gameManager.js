export class GameManager {
  static instance = null;

  constructor() {
    if (GameManager.instance) {
      return GameManager.instance; // Asegurarse de que solo haya una instancia
    }

    GameManager.instance = this;

    // Configuración global del juego
    this.width = 800; // Ancho del juego
    this.height = 600; // Alto del juego
    this.backgroundColor = "white"; // Color de fondo
  }

  // Método para obtener el tamaño del juego
  getGameSize() {
    return { width: this.width, height: this.height };
  }
}
