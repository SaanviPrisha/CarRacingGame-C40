class Form {
    constructor() {
        //creates the title
        this.title = createElement('h2')
        this.title.html("Car Racing Game")
        this.title.position(windowWidth/2 - 50, 10)

        //creates the input button
        this.input = createInput("Name")
        this.input.position(windowWidth/2 -40, windowHeight/2 - 80)

        //creates the play button
        this.playButton = createButton("Play!")
        this.playButton.position(windowWidth/2, windowHeight/2)

        //creates the greeting
        this.greeting = createElement('h3')

        //reset button
        this.reset = createButton("Restart!")
        this.reset.position(windowWidth - 100, 30);
        this.reset.style('background-color','#71bdaf')
    }
    display() {
        //shows the game screen
        this.playButton.mousePressed(()=> {
            this.input.hide()
            this.playButton.hide()
            player.name = this.input.value()
            playerCount = playerCount + 1
            player.index = playerCount
            player.update()
            player.updateCount(playerCount)
            this.greeting.html("Hello " + player.name)
            this.greeting.position(windowWidth/2 - 60, windowHeight/4)
        })
        this.reset.mousePressed(()=> {
            player.updateCount(0)
            game.updateGameState(0)
            Player.updateRank(0)
            for(var i = 1; i < 5; i++) {
                database.ref("players/player" + i).update({
                    name: '',
                    distance: 0
                })
            }
        })
    }
    hide() {
        this.input.hide()
        this.playButton.hide()
        this.greeting.hide()
    }
}