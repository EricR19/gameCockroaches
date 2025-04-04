export class Cucaracha extends Phaser.GameObjects.Rectangle {
  constructor(
    scene,
    x,
    y,
    color = 0xff0000,
    speed = Phaser.Math.Between(50, 150)
  ) {
    super(scene, x, y, 50, 50, color); // Crear un rectángulo de 50x50 con el color especificado
    this.scene = scene;
    this.speed = speed; // Velocidad personalizada o aleatoria
    this.isAttacking = false; // Bandera para evitar múltiples ataques

    // Agregar la cucaracha a la escena
    this.scene.add.existing(this);

    // Hacer que la cucaracha tenga un cuerpo físico
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true); // Evitar que salga de los límites del mundo

    // Hacer la cucaracha interactiva
    this.setInteractive();
    this.on("pointerdown", () => {
      this.scene.cucarachaKilled(); // Notificar a la escena que una cucaracha fue eliminada
      this.destroy(); // Eliminar la cucaracha
    });
  }

  moveTo(target) {
    // Mover la cucaracha hacia el objetivo (pizza)
    if (this.body) {
      this.scene.physics.moveToObject(this, target, this.speed);
    }
  }

  destroy() {
    // Eliminar la cucaracha
    if (this.body) {
      this.body.destroy(); // Eliminar el cuerpo físico
    }
    super.destroy(); // Eliminar el objeto de la escena
  }
}
