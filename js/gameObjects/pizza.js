export class Pizza extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, radius = 50, color = 0xffcc00) {
    super(scene, x, y, radius * 2, radius * 2, color);
    this.scene = scene;
    this.life = 10; // Vida inicial de la pizza

    // Agregar la pizza a la escena
    this.scene.add.existing(this);

    // Hacer que la pizza tenga un cuerpo físico
    this.scene.physics.add.existing(this);
    this.body.setCircle(radius); // Ajustar el cuerpo físico al tamaño de la pizza
    this.body.setImmovable(true); // Hacer que la pizza no se mueva
  }

  reduceLife(amount) {
    // Reducir la vida de la pizza
    this.life -= amount;
    return this.life;
  }
}
