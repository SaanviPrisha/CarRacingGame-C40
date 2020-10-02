class Player {
    constructor() {
        this.name = null;
        this.distance = 0;
        this.index = 0;
        this.rank = null;
    }
    //Gets the number of players
    getCount() {
        var countRef = database.ref("playerCount")
        countRef.on("value", function(data) {
            playerCount = data.val()
        })
    }
    //updates the number of the player count
    updateCount(count) {
        database.ref("/").update({
            playerCount: count
        })
    }
    getRank() {
        database.ref("rank").on("value", (data)=>{
            this.rank = data.val()
        })
    }
    static updateRank(RANK) {
        database.ref("/").update({
            rank: RANK 
        })
    }
    //updates the name
    update() {
        var playerIndex = "players/player" + this.index
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance
        })
    }
    static getPlayerInfo() {
        database.ref("players").on("value", (data)=> {
            allPlayers = data.val(); 
        })
    }
} 