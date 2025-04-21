export class Potenciador {
  constructor(scene) {
    this.scene = scene;
    this.isActive = false; // Indica si el potenciador está activo
    this.killCount = 0; // Contador de cucarachas eliminadas
    this.button = null; // Referencia al botón del potenciador
    this.selectedPowerUp = null; // Potenciador seleccionado

    // Arreglo de potenciadores con nombres
    this.powerUps = [
      { name: "Freeze", action: this.freezeCucarachas.bind(this) }, // Congelar cucarachas
      { name: "Explode", action: this.explodeCucarachas.bind(this) }, // Matar todas las cucarachas
    ];
  }

  incrementKillCount() {
    this.killCount += 1;

    // Si ya hay un potenciador seleccionado y el botón está visible, no hacer nada
    if (this.selectedPowerUp && this.button.visible) {
      return;
    }

    // Mostrar el botón si se han matado 7 cucarachas
    if (this.killCount >= 7 && !this.isActive && this.button) {
      // Seleccionar un potenciador aleatorio
      const randomPowerUp = Phaser.Math.RND.pick(this.powerUps);

      // Actualizar el texto del botón con el nombre del potenciador
      this.button.setText(randomPowerUp.name);

      // Guardar el potenciador seleccionado
      this.selectedPowerUp = randomPowerUp;

      // Mostrar el botón
      this.button.setVisible(true);
    }
  }

  activate() {
    if (this.isActive) {
      console.warn("El potenciador ya está activo.");
      return;
    }

    this.isActive = true;

    // Ocultar el botón
    if (this.button) {
      this.button.setVisible(false);
    }

    // Ejecutar el potenciador seleccionado
    if (this.selectedPowerUp) {
      this.selectedPowerUp.action();
    }

    // Reiniciar el estado del potenciador después de 3 segundos
    this.scene.time.delayedCall(3000, () => {
      this.isActive = false;
      this.killCount = 0; // Reiniciar el contador de cucarachas eliminadas
      this.selectedPowerUp = null; // Reiniciar el potenciador seleccionado
    });
  }

  // Potenciador: Congelar todas las cucarachas
  freezeCucarachas() {
    console.log("Potenciador: Congelar cucarachas");

    // Reproducir el sonido de hielo
    if (this.scene.cache.audio.exists("iceSound")) {
      this.scene.sound.play("iceSound", { volume: 0.5 });
    }

    // Congelar todas las cucarachas
    this.scene.cucarachas.getChildren().forEach((cucaracha) => {
      if (cucaracha.body) {
        // Guardar la velocidad original
        cucaracha.originalVelocity = {
          x: cucaracha.body.velocity.x,
          y: cucaracha.body.velocity.y,
        };

        // Detener la cucaracha
        cucaracha.body.setVelocity(0, 0);

        // Pausar la animación de la cucaracha
        cucaracha.anims.pause();

        // Opcional: Añadir un tinte azulado para efecto visual de congelamiento
        cucaracha.setTint(0x00ffff);
      }
    });

    // Reanudar el movimiento de las cucarachas después de 3 segundos
    this.scene.time.delayedCall(3000, () => {
      this.scene.cucarachas.getChildren().forEach((cucaracha) => {
        if (cucaracha.body && cucaracha.originalVelocity) {
          // Restaurar la velocidad original
          cucaracha.body.setVelocity(
            cucaracha.originalVelocity.x,
            cucaracha.originalVelocity.y
          );

          // Reanudar la animación
          cucaracha.anims.resume();

          // Quitar el tinte de congelamiento
          cucaracha.clearTint();

          // Eliminar la propiedad originalVelocity
          delete cucaracha.originalVelocity;
        }
      });
    });
  }

  // Potenciador: Matar todas las cucarachas (explosión)
  explodeCucarachas() {
    console.log("Potenciador: Explosión de cucarachas");

    // Reproducir el sonido de explosión
    this.scene.sound.play("explosionSound", { volume: 0.5 });

    // Obtener dimensiones directamente de la escena
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;

    // Crear la explosión en el centro
    const explosion = this.scene.add.image(width / 2, height / 2, "explosion");

    // Hacer que la explosión aparezca pequeña y crezca
    explosion.setScale(0.1);

    // Animar la explosión
    this.scene.tweens.add({
      targets: explosion,
      scale: 1,
      alpha: { from: 1, to: 0 },
      duration: 1000,
      ease: "Power2",
      onComplete: () => {
        explosion.destroy();
      },
    });

    // Hacer una copia del arreglo de cucarachas antes de iterar
    const cucarachas = [...this.scene.cucarachas.getChildren()];

    // Eliminar todas las cucarachas de la pantalla
    cucarachas.forEach((cucaracha) => {
      if (cucaracha.body) {
        this.scene.cucarachas.remove(cucaracha, true, true);
      }
    });
  }
}
