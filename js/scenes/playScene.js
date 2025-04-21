import { GameManager } from "../gameManager.js";
import { Cucaracha } from "../gameObjects/cucaracha.js";
import { Pizza } from "../gameObjects/pizza.js";
import { Potenciador } from "../gameObjects/potenciador.js";

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "playScene" }); // Changed to lowercase to match the reference
    this.backgroundMusic = null;
  }

  preload() {
    // Verificar que las rutas sean correctas
    console.log("Iniciando preload...");

    // Cargar la imagen de fondo
    this.load.image("backGround", "assets/images/backGround.png");

    // Cargar las imágenes de la pizza
    this.load.image("pizza", "assets/images/pizza.png");
    this.load.image("pizza1", "assets/images/pizza1.png");
    this.load.image("pizza2", "assets/images/pizza2.png");

    // Cargar las imágenes de la cucaracha
    this.load.image("cuca_1", "assets/images/cuca/cuca_1.png");
    this.load.image("cuca_2", "assets/images/cuca/cuca_2.png");
    this.load.image("cuca_3", "assets/images/cuca/cuca_3.png");

    // Cargar la imagen de explosión
    this.load.image("explosion", "assets/images/explosion.png");

    // Cargar los sonidos
    this.load.audio("explosionSound", "assets/sounds/explosion.mp3");
    this.load.audio("iceSound", "assets/sounds/breaking-ice.mp3");

    // Cargar la canción de fondo
    this.load.audio(
      "backgroundMusic",
      "assets/sounds/TarantellaNapoletana.mp3"
    );

    // Add error handler for asset loading
    this.load.on("loaderror", (file) => {
      console.error("Error loading asset:", file.src);
    });

    console.log("Preload completado");
  }

  create() {
    console.log("Iniciando create...");

    const gameManager = GameManager.instance;
    if (!gameManager) {
      console.error("GameManager no está inicializado");
      return;
    }

    const { width, height } = gameManager.getGameSize();

    // Crear el fondo primero
    this.background = this.add.image(width / 2, height / 2, "backGround");
    this.background.setDisplaySize(width, height);

    // Configurar físicas
    this.cucarachas = this.physics.add.group();

    // Crear la pizza
    this.pizzaObject = new Pizza(this, width / 2, height - 100);

    // Crear animación de cucaracha
    this.anims.create({
      key: "cucaracha_walk",
      frames: [{ key: "cuca_1" }, { key: "cuca_2" }, { key: "cuca_3" }],
      frameRate: 10,
      repeat: -1,
    });

    console.log("Create completado");

    // Crear una cucaracha de prueba
    const cucaracha = new Cucaracha(this, 100, 100);

    // Escalar la imagen de fondo manteniendo su proporción
    const scaleX = width / this.background.width;
    const scaleY = height / this.background.height;
    const scale = Math.max(scaleX, scaleY); // Escalar para cubrir toda la pantalla

    this.background.setScale(scale);
    this.background.setPosition(width / 2, height / 2); // Centrar la imagen

    // Crear el potenciador
    this.potenciador = new Potenciador(this);

    // Crear el botón para activar el potenciador
    const button = this.add
      .text(width - 100, height - 50, "Activar", {
        fontSize: "20px",
        fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setVisible(false) // El botón es invisible al inicio
      .on("pointerdown", () => {
        this.potenciador.activate(); // Activar el potenciador al presionar el botón
      });

    // Asignar el botón al potenciador
    this.potenciador.button = button;

    // Texto de vida de la pizza con fondo negro
    this.pizzaLifeText = this.add.text(
      10,
      10,
      `Pizza Life: ${this.pizzaObject.life}`,
      {
        fontSize: "20px",
        fill: "#fff",
        backgroundColor: "#000", // Fondo negro
        padding: { x: 5, y: 5 }, // Espaciado interno
      }
    );

    // Texto del temporizador con fondo negro
    this.timeLeft = 45;
    this.timerText = this.add.text(width - 150, 10, `Time: ${this.timeLeft}`, {
      fontSize: "20px",
      fill: "#fff",
      backgroundColor: "#000", // Fondo negro
      padding: { x: 5, y: 5 }, // Espaciado interno
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.spawnCucarachaEvent = this.time.addEvent({
      delay: 900,
      callback: this.spawnCucaracha,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(
      this.cucarachas,
      this.pizzaObject,
      this.cucarachaHitsPizza,
      null,
      this
    );

    // Asegurarse de que no haya música reproduciéndose antes de crear una nueva
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.backgroundMusic.destroy();
    }

    // Reproducir la canción de fondo
    this.backgroundMusic = this.sound.add("backgroundMusic", {
      volume: 0.2, // Volumen moderado bajo
      loop: true, // Repetir la canción en bucle
    });
    this.backgroundMusic.play();

    // Agregar listeners para limpiar la música
    this.events.on("shutdown", this.cleanup, this);
    this.events.on("destroy", this.cleanup, this);
  }

  updateTimer() {
    this.timeLeft -= 1;
    this.timerText.setText(`Time: ${this.timeLeft}`);

    if (this.timeLeft <= 0 && this.pizzaObject.life > 0) {
      this.scene.start("menuScene", { gameResult: "win" });
    }
  }

  spawnCucaracha() {
    const gameManager = GameManager.instance;
    const { width } = gameManager.getGameSize(); // Obtener el ancho correctamente
    const x = Phaser.Math.Between(0, width); // Posición aleatoria en X
    const y = 0; // Las cucarachas comienzan en la parte superior
    const speed = Phaser.Math.Between(100, 250); // Velocidad aleatoria

    // Crear nueva cucaracha
    const cucaracha = new Cucaracha(this, x, y, speed);
    this.cucarachas.add(cucaracha);

    // Mover la cucaracha hacia la pizza
    cucaracha.moveTo(this.pizzaObject);
  }

  cucarachaHitsPizza(cucaracha, pizza) {
    // Verificar si la cucaracha puede atacar
    if (
      !cucaracha.lastAttackTime ||
      this.time.now - cucaracha.lastAttackTime >= 1000
    ) {
      // Reducir la vida de la pizza
      const remainingLife = this.pizzaObject.reduceLife(1);
      this.pizzaLifeText.setText(`Pizza Life: ${remainingLife}`);

      // Actualizar el tiempo del último ataque
      cucaracha.lastAttackTime = this.time.now;

      // Verificar si la pizza se destruyó
      if (remainingLife <= 0) {
        this.scene.start("menuScene", { gameResult: "lose" });
      }
    }
  }

  cucarachaKilled() {
    this.potenciador.incrementKillCount();
  }

  update() {
    const pizzaRadius = 150; // Radio de la pizza (debe coincidir con el tamaño en `Pizza`)

    this.cucarachas.getChildren().forEach((cucaracha) => {
      if (cucaracha.body) {
        // Calcular la distancia entre la cucaracha y el centro de la pizza
        const distance = Phaser.Math.Distance.Between(
          cucaracha.x,
          cucaracha.y,
          this.pizzaObject.x,
          this.pizzaObject.y
        );

        // Si la cucaracha está dentro del radio de la pizza, detenerla
        if (distance <= pizzaRadius) {
          cucaracha.body.setVelocity(0, 0); // Detener el movimiento
        }
      }
    });
  }

  cleanup() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.backgroundMusic.destroy();
      this.backgroundMusic = null;
    }
  }

  shutdown() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop(); // Detener la música
      this.backgroundMusic.destroy(); // Liberar recursos de la música
    }
  }
}
