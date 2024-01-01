import "./style.css";
import Phaser from "phaser";

const dimension = getDimensions();

let player;

function getDimensions() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width < height) {
    return width;
  } else {
    return height;
  }
}

const sizes = {
  width: dimension * 1.35,
  height: dimension * 0.99,
};

const speedDown = 300;

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
  }

  preload() {
    this.load.image("background", "assets/hi.png");
    this.load.image("ship", "assets/ship.png");
    // this.load.image("ground", "assets/platform.png");
    // this.load.image("star", "assets/star.png");
    // this.load.image("bomb", "assets/bomb.png");
    // this.load.spritesheet("dude", "assets/dude.png", {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // });
  }

  create() {
    this.add.image(400, 300, "background");

    let { width, height } = this.sys.game.canvas;

    player = this.physics.add.sprite(width / 2, height / 2, "ship");

    player.setScale(1);
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    let x = player.copyPosition(player).x;
    let y = player.copyPosition(player).y;
    // object.x = object.x + distance * Math.cos(object.rotation);
    // object.y = object.y + distance * Math.sin(object.rotation);

    if (cursors.left.isDown) {
      player.rotation -= 0.02;
    }
    if (cursors.right.isDown) {
      player.rotation += 0.02;
    }

    console.log(player.rotation);
    if (cursors.up.isDown) {
      player.setVelocity(
        x + 1 * Math.cos(player.rotation),
        y + 1 * Math.sin(player.rotation)
      );

      // player.setVelocityY(3);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
