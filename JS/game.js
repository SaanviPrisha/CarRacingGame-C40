class Game {
    constructor() {

    }
    getGameState() {
        var countRef = database.ref("gameState")
        countRef.on("value", function(data) {
            gameState = data.val()
        })
    }
    //updates the number of the player count
    updateGameState(State) {
        database.ref("/").update({
            gameState: State
        })
    }
    start() {
        if(gameState == 0) {
            player = new Player()
            player.getCount()

            form = new Form()
            form.display(); 
        }
        car1 = createSprite(100, 300)
        car1.addImage(carImage1)

        car2 = createSprite(300, 300)
        car2.addImage(carImage2)

        car3 = createSprite(500, 300)
        car3.addImage(carImage3)

        car4 = createSprite(700, 300)
        car4.addImage(carImage4)

        cars = [car1, car2, car3, car4]
    }
    play() {
        form.hide();
        Player.getPlayerInfo();
        player.getRank();

        if(allPlayers != undefined) {
            image(track, 0, -windowHeight*4, windowWidth, 5*windowHeight)
            var yPosition = 130
            var index = 0
            var x = 180
            var y = 0
            for(var plr in allPlayers) {
                index = index + 1
                x = x + 220
                y = windowHeight - allPlayers[plr].distance
                cars[index-1].x = x
                cars[index-1].y = y
                if(index == player.index) {
                    stroke("purple")
                    fill("white")
                    ellipse(x,y,60,60);
                    camera.position.x = windowWidth/2
                    camera.position.y = cars[index-1].y
                } else {
                    cars[index-1].shapeColor = "blue"
                }
            }
        }
        if(keyDown(UP_ARROW) && player.index != null) {
            player.distance = player.distance + 10;
            player.update()
            console.log(player.distance)
        }
        if(player.distance > 3680) {
            gameState = 2
            player.rank = player.rank + 1;
            Player.updateRank(player.rank);
            console.log(player.rank);
        }
        drawSprites()
    }
    end() {
        image(track, 0, -windowHeight*4, windowWidth, 5*windowHeight)
        textSize(30)
        text("Game Over!", windowWidth/2, -windowHeight*4)
        var index = 0;
        for(var plr in allPlayers) {
            if(index + 1 == player.index) {
                switch(player.rank){
                    case 1: text("1st Place! Congratulations!", cars[index].x, cars[index].y - 80)
                    break;
                    case 2: text("2nd place! Not too shabby!", cars[index].x, cars[index].y - 80)
                    break;
                    case 3: text("3rd Place! Try again to see if you can win...", cars[index].x, cars[index].y - 80)
                    break;
                    case 4: text("Last place! Better luck next time!!", cars[index].x, cars[index].y - 80)
                    break;
                }
            }
            index = index + 1
        }
        drawSprites()
    }
}