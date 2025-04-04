export class Potenciador {
  constructor(scene) {
    this.scene = scene;
    this.isActive = false; // Indica si el potenciador está activo
    this.killCount = 0; // Contador de cucarachas eliminadas
  }

  incrementKillCount() {
    this.killCount += 1;

    // Activar el potenciador si se han matado 8 cucarachas
    if (this.killCount >= 8 && !this.isActive) {
      this.activate();
    }
  }

  activate() {
    this.isActive = true;

    // Congelar todas las cucarachas
    this.scene.cucarachas.getChildren().forEach((cucaracha) => {
      if (cucaracha.body) {
        cucaracha.body.setVelocity(0, 0);
      }
    });

    // Detener la generación de nuevas cucarachas
    this.scene.time.removeEvent(this.scene.spawnCucarachaEvent);

    // Después de 3 segundos, reanudar el juego
    this.scene.time.delayedCall(3000, () => {
      this.isActive = false;
      this.killCount = 0; // Reiniciar el contador de cucarachas eliminadas

      // Reanudar la generación de cucarachas
      this.scene.spawnCucarachaEvent = this.scene.time.addEvent({
        delay: 1000,
        callback: this.scene.spawnCucaracha,
        callbackScope: this.scene,
        loop: true,
      });

      // Reanudar el movimiento de las cucarachas
      this.scene.cucarachas.getChildren().forEach((cucaracha) => {
        if (cucaracha.moveTo) {
          cucaracha.moveTo(this.scene.pizza); // Volver a mover hacia la pizza
        }
      });
    });
  }
}
