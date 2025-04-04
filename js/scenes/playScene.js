import { GameManager } from "../gameManager.js";
import { Cucaracha } from "../gameObjects/cucaracha.js";
import { Pizza } from "../gameObjects/pizza.js";
import { Potenciador } from "../gameObjects/potenciador.js";

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
  }

  create() {
    const gameManager = GameManager.instance;
    const { width, height } = gameManager.getGameSize();

    this.pizza = new Pizza(this, width / 2, height - 50);
    this.pizzaLifeText = this.add.text(
      10,
      10,
      `Pizza Life: ${this.pizza.life}`,
      {
        fontSize: "20px",
        fill: "#fff",
      }
    );

    this.timeLeft = 45;
    this.timerText = this.add.text(width - 150, 10, `Time: ${this.timeLeft}`, {
      fontSize: "20px",
      fill: "#fff",
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.cucarachas = this.physics.add.group();
    this.potenciador = new Potenciador(this);

    this.spawnCucarachaEvent = this.time.addEvent({
      delay: 1000,
      callback: this.spawnCucaracha,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(
      this.cucarachas,
      this.pizza,
      this.cucarachaHitsPizza,
      null,
      this
    );
  }

  updateTimer() {
    this.timeLeft -= 1;
    this.timerText.setText(`Time: ${this.timeLeft}`);

    if (this.timeLeft <= 0 && this.pizza.life > 0) {
      this.scene.pause();
      this.add.text(100, 200, "You Win!", {
        fontSize: "40px",
        fill: "#00ff00",
      });
    }
  }

  spawnCucaracha() {
    const gameManager = GameManager.instance;
    const x = Phaser.Math.Between(0, gameManager.width); // Posición aleatoria en X
    const y = 0; // Las cucarachas comienzan en la parte superior de la pantalla
    const speed = Phaser.Math.Between(50, 150); // Velocidad aleatoria

    const cucaracha = new Cucaracha(this, x, y, 0xff0000, speed);
    this.cucarachas.add(cucaracha); // Agregar la instancia completa de Cucaracha al grupo

    cucaracha.moveTo(this.pizza); // Mover la cucaracha hacia la pizza
  }

  cucarachaHitsPizza(cucaracha, pizza) {
    if (!cucaracha.isAttacking) {
      cucaracha.isAttacking = true;
      const remainingLife = this.pizza.reduceLife(1);
      this.pizzaLifeText.setText(`Pizza Life: ${remainingLife}`);

      if (remainingLife <= 0) {
        this.scene.pause();
        this.add.text(100, 200, "Game Over!", {
          fontSize: "40px",
          fill: "#ff0000",
        });
      }

      this.time.delayedCall(1000, () => {
        cucaracha.isAttacking = false;
      });
    }
  }

  cucarachaKilled() {
    this.potenciador.incrementKillCount();
  }

  update() {
    const pizzaRadius = 50; // Radio de la pizza (debe coincidir con el tamaño en `Pizza`)

    this.cucarachas.getChildren().forEach((cucaracha) => {
      if (cucaracha.body) {
        // Calcular la distancia entre la cucaracha y el centro de la pizza
        const distance = Phaser.Math.Distance.Between(
          cucaracha.x,
          cucaracha.y,
          this.pizza.x,
          this.pizza.y
        );

        // Si la cucaracha está dentro del radio de la pizza, detenerla
        if (distance <= pizzaRadius) {
          cucaracha.body.setVelocity(0, 0); // Detener el movimiento
        }
      }
    });
  }
}
