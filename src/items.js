class Items {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'item');
    let itemImage = globalItemImg; // Ensure globalItemImg is defined globally
    this.node.setAttribute('src', itemImage);

    el.appendChild(this.node);

    this.currentDirection = 'down';
    this.SPEED = 350;
    this.node.style.top = '0px';
    this.node.style.left = `${Math.floor(Math.random() * 1000) + 500}px`; // Position item randomly horizontally

    this.boundMove = this.move.bind(this);

    this.node.addEventListener('mouseover', this.handleCollision.bind(this));

    this.timeout = setTimeout(this.boundMove, this.SPEED);
  }

  move() {
    if (this.node !== null) {
      let topPosition = Number(this.node.style.top.replace('px', ''));
      let leftPosition = Number(this.node.style.left.replace('px', ''));

      const moveArray = [50, 100, 150];
      let index = Math.floor(Math.random() * 2);

      topPosition += moveArray[index];
      this.node.style.top = `${topPosition}px`;

      if (topPosition < window.innerHeight) {
        this.timeout = setTimeout(this.boundMove, this.SPEED); // Continue moving if not at the bottom
      } else {
        this.removeNode();
        const score = document.getElementById('increasescore');
        globalScore -= 1;
        let scoreTrack = globalScore;
        score.innerText = `Your Score: ${scoreTrack}`;
        // Remove the node when it reaches the bottom
      }
    }
  }

  handleCollision() {
    const clickSound = document.getElementById('click-sound');

    console.log('collide');
    globalScore += 10;
    console.log(globalScore);

    const score = document.getElementById('increasescore');

    let scoreTrack = globalScore;

    score.innerText = `Your Score: ${scoreTrack}`;

    this.removeNode();
    clickSound.play();
  }

  removeNode() {
    if (this.node) {
      clearTimeout(this.timeout); // Clear the timeout
      this.node.remove(); // Remove the node from the DOM
      this.node = null; // Nullify the reference
    }
  }
}
