import { THEME_TYPE } from "../cardsManager.js";
import { GameManager } from "../gameManager.js";
import { Card } from "../gameObjects/card.js";

export class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
    console.log(this);
    this.gameTime = 0;
    this.gameClicks = 0;
    this.timer = null;
    this.card1 = null;
    this.card2 = null;
    this.showingTimer = null;
    this.showingTime = 1000;
    this.cards = [];
  }

  preload() {
    this.load.image("cardBg", "../assets/images/cardBg.png");
    this.load.image("starBlue", "../assets/images/starBlue.png");
    this.load.image("starRed", "../assets/images/starRed.png");
    this.load.image("starWhite", "../assets/images/starWhite.png");
    this.load.image("starYellow", "../assets/images/starYellow.png");
    this.load.image("resetBtn", "../assets/images/resetBtn.png");

    // Load the background music
    this.load.audio("backgroundMusic", "../assets/sounds/backGroundSound.mp3");

    // Load the click sound
    this.load.audio("clickSound", "../assets/sounds/clickSound.mp3");

    // Load the match sound
    this.load.audio("matchSound", "../assets/sounds/pick.mp3");

    // Load the wrong sound
    this.load.audio("wrongSound", "../assets/sounds/wrong.mp3");
  }

  create() {
    const width = GameManager.instance.width;
    const height = GameManager.instance.height;

    // Play the background music
    this.backgroundMusic = this.sound.add("backgroundMusic", { loop: true });
    this.backgroundMusic.play();

    // Existing code...
    this.counter = 0;
    this.stars = [];
    this.counterText = this.add.text(0, 0, "Time: 0", {
      fontSize: "30px",
      backgroundColor: "red",
      align: "center",
      fixedWidth: width / 2,
      fixedHeight: 50,
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
    });
    this.counterText.setDepth(2);
    this.counterText.width = width;

    this.clicksText = this.add.text(width / 2, 0, "Clicks: 0", {
      fontSize: "30px",
      backgroundColor: "red",
      align: "center",
      fixedWidth: width / 2,
      fixedHeight: 50,
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
      },
    });
    this.clicksText.setDepth(2);
    this.clicksText.width = width;

    this.resetBtn = this.add.sprite(10, 60, "resetBtn");
    this.resetBtn.setOrigin(0);
    this.resetBtn.setDepth(3);
    this.resetBtn.setInteractive({ useHandCursor: true });
    this.resetBtn.on("pointerdown", this.getCards.bind(this));

    this.getCards();
  }

  getCards() {
    this.gameTime = 0;
    this.gameClicks = 0;
    this.timer?.reset();
    this.counterText.setText(`Time: ${this.gameTime}`);
    this.clicksText.setText(`Clicks: ${this.gameClicks}`);

    // let request = new XMLHttpRequest()
    // request.open('GET', 'https://epadilla-memory-game-be.vercel.app/cards/8/FOOD')
    // request.onload = (event) => {
    //     let data = JSON.parse(event.target.response);
    //     this.addCards(data.cards);
    // }
    // request.send();

    let data = JSON.parse(
      GameManager.instance.cardsManager.getCards(THEME_TYPE.FACES, 8)
    );
    console.log(data);
    this.addCards(data.cards);
  }

  addCards(cardsData) {
    if (this.cards.length > 0) {
      this.cards.forEach((card) => {
        card.destroy();
      });
    }

    const width = GameManager.instance.width;
    const height = GameManager.instance.height;

    let xpos = (width - 415) / 2;
    let ypos = (height - 615) / 2;
    let counter = 0;

    cardsData.forEach((cardData) => {
      let card = new Card(
        this,
        { x: xpos, y: ypos },
        this.onCardClick.bind(this),
        cardData
      );
      this.cards.push(card);

      counter += 1;
      xpos += 100 + 5;
      if (counter == 4) {
        counter = 0;
        xpos = (width - 415) / 2;
        ypos += 155;
      }
    });

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.gameTime += 1;
        this.counterText.setText(`Time: ${this.gameTime}`);
      },
      loop: true,
    });

    console.log(this.timer);
  }

  onCardClick(card) {
    if (this.card1 !== null && this.card2 !== null) return;

    // Play the click sound
    this.sound.play("clickSound");

    if (this.card1 === null) {
      this.card1 = card;
      this.card1.text.visible = true;
      this.gameClicks += 1;
    } else if (this.card2 === null) {
      this.card2 = card;
      this.card2.text.visible = true;
      this.gameClicks += 1;
    }

    this.clicksText.setText(`Clicks: ${this.gameClicks}`);

    if (this.card1 !== null && this.card2 !== null) {
      this.showingTimer = this.time.addEvent({
        delay: this.showingTime,
        callback: () => {
          if (this.card1.cardData.id === this.card2.cardData.id) {
            this.card1.cardData.isDiscovered = true;
            this.card2.cardData.isDiscovered = true;

            // Play the match sound
            this.sound.play("matchSound");

            if (this.checkGameComplete()) {
              console.log("GAME COMPLETE");
              const score = this.gameClicks * this.gameTime;
              console.log("Score:", score);
              this.timer.paused = true;
            }
          } else {
            // Play the wrong sound
            this.sound.play("wrongSound");

            this.card1.text.visible = false;
            this.card2.text.visible = false;
          }

          this.card1 = null;
          this.card2 = null;
        },
        loop: false,
      });
    }
  }

  checkGameComplete() {
    let isComplete = true;
    this.cards.forEach((card) => {
      if (!card.cardData.isDiscovered) {
        isComplete = false;
      }
    });

    if (isComplete) {
      console.log("GAME COMPLETE");
      this.backgroundMusic.stop(); // Stop the background music
      this.scene.start("EndScene"); // Transition to the EndScene
    }

    return isComplete;
  }

  update() {}

  addStar() {
    let type = this.getRandomArbitrary(1, 5);
    let key = "";
    switch (type) {
      case 1:
        key = "starBlue";
        break;
      case 2:
        key = "starRed";
        break;
      case 3:
        key = "starWhite";
        break;
      case 4:
        key = "starYellow";
        break;
      default:
        key = "starYellow";
        break;
    }

    let x = this.getRandomArbitrary(64, 336);
    let star = this.add.sprite(x, -100, key);
    this.stars.push(star);
    star.setInteractive({ useHandCursor: true });
    star.on("pointerdown", (value) => {
      star.destroy();
      this.counter += 1;
      this.counterText.setText(`Stars: ${this.counter}`);
    });
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
