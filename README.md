
# Cucaracha Game 🪳

A browser-based game built with Phaser 3 where you defend a pizza from invading cockroaches.


# Description

In this game, you must protect a pizza from waves of hungry cockroaches. Use power-ups and quick reflexes to eliminate the threats and keep your pizza safe.

## Features
 - ### Real-time gameplay: 
    - Dynamic cockroach movement and interactions
-  ### Power-up system: 
    - Freeze: Temporarily stops all cockroaches
    - Explosion: Eliminates all cockroaches on screen
- ### Progressive difficulty: 
    - Cockroaches become more numerous as time passes
- ### Sound effects:
    - Explosion sounds for blast power-up
    - Ice breaking sound for freeze power-up

## Technologies Used
   - Phaser 3.86.0
   - JavaScript (ES6+)
   - HTML5

## Project Structure

    cucaracha/
    ├── assets/
    │   ├── images/
    │   │   ├── backGround.png
    │   │   ├── pizza.png
    │   │   ├── pizza1.png
    │   │   ├── pizza2.png
    │   │   ├── explosion.png
    │   │   └── cuca/
    │   │       ├── cuca_1.png
    │   │       ├── cuca_2.png
    │   │       └── cuca_3.png
    │   └── sounds/
    │       ├── explosion.mp3
    │       └── breaking-ice.mp3
    ├── js/
    │   ├── gameObjects/
    │   │   ├── cucaracha.js
    │   │   ├── pizza.js
    │   │   └── potenciador.js
    │   ├── scenes/
    │   │   ├── menuScene.js
    │   │   └── playScene.js
    │   ├── gameManager.js
    │   └── main.js
    └── index.html

## How to play

1. Click "JUGAR" to start the game
2. Defend your pizza from approaching cockroaches
3. Click on cockroaches to eliminate them
4. Collect power-ups by eliminating cockroaches
5. Use power-ups strategically to protect your pizza
6. Survive until the timer runs out to win

## Game Controls
- Mouse Click: Eliminate cockroaches
- Power-up Button: Activate collected power-up

## Installation

1. Clone the repository:

        git clone [repository-url]

2. Navigate to the project directory:

        cd cucaracha

3. Open Live Server:

        http://localhost:8000


## Credits

- Game Engine: Phaser 3
- Sound Effects: Custom audio files
- Sprites: Custom artwork
