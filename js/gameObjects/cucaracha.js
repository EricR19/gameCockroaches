export class Cucaracha extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed = Phaser.Math.Between(50, 150)) {
    super(scene, x, y, "cuca_1");
    this.scene = scene;
    this.speed = speed;
    this.isAttacking = false;

    // Agregar la cucaracha a la escena
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Mejorar la visibilidad de la cucaracha
    this.setScale(1.2); // Hacer la cucaracha un 20% más grande
    this.setAlpha(1); // Asegurar máxima opacidad
    this.setDepth(1); // Colocar las cucarachas por encima del fondo

    // Configurar el cuerpo físico
    this.body.setCollideWorldBounds(true);

    // Iniciar la animación
    this.play("cucaracha_walk");

    // Hacer la cucaracha interactiva
    this.setInteractive();
    this.on("pointerdown", () => {
      this.scene.cucarachaKilled();
      this.destroy();
    });
  }

  moveTo(target) {
    if (this.body && target) {
      // Obtener la dirección hacia la pizza
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        target.x,
        target.y
      );

      // Calcular la velocidad en X e Y basada en el ángulo
      const velocityX = Math.cos(angle) * this.speed;
      const velocityY = Math.sin(angle) * this.speed;

      // Establecer la velocidad de la cucaracha
      this.body.setVelocity(velocityX, velocityY);

      // Girar la cucaracha 180 grados adicionales (Math.PI)
      this.setRotation(angle + Math.PI * 1.5); // Cambiado de Math.PI/2 a Math.PI * 1.5
    }
  }
}
