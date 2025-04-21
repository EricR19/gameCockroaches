export class Pizza extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "pizza"); // Usar la imagen "pizza" como textura inicial
    scene.add.existing(this); // Agregar la pizza a la escena
    scene.physics.add.existing(this); // Habilitar físicas para la pizza

    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(300, 300); // Ajustar el tamaño de la pizza
    this.setImmovable(true); // Hacer que la pizza no se mueva al colisionar

    this.life = 15; // Vida inicial de la pizza
    this.scene = scene; // Guardar referencia a la escena
    this.currentTexture = "pizza"; // Guardar la textura actual
  }

  // Método para reducir la vida de la pizza
  reduceLife(amount) {
    this.life -= amount;
    if (this.life < 0) {
      this.life = 0;
    }

    // Cambiar la textura si la vida llega a 5 y aún no se ha cambiado a "pizza1"
    if (this.life === 10 && this.currentTexture !== "pizza1") {
      console.log("Cambiando textura a pizza1");
      this.setTexture("pizza1"); // Cambiar directamente la textura
      this.setDisplaySize(300, 300); // Asegurar que el tamaño sea consistente
      this.currentTexture = "pizza1"; // Actualizar la textura actual
    }

    // Cambiar la textura si la vida llega a 3 y aún no se ha cambiado a "pizza2"
    if (this.life === 5 && this.currentTexture !== "pizza2") {
      console.log("Cambiando textura a pizza2");
      this.setTexture("pizza2"); // Cambiar directamente la textura
      this.setDisplaySize(300, 300); // Asegurar que el tamaño sea consistente
      this.currentTexture = "pizza2"; // Actualizar la textura actual
    }

    console.log(
      `Textura actual: ${this.currentTexture}, Tamaño: ${this.displayWidth}x${this.displayHeight}`
    );
    return this.life;
  }
}
