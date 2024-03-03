var config = {
    type: Phaser.AUTO, // defini o tipo de renderização
    width: 600, // largura da tela do game
    height: 600, // altura da tela do game
    // define a física do game
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },

    //defini as funções executadas no game
    scene: [telaInicial, Fase01, Fase02, GameOver, telaWinner]
}


var game = new Phaser.Game(config); // defini a variável game e "guarda" nela as configurações que colocamos no config
var platforms; // variável para identificar o chão
var player; // variável para identifcar o boneco
var cursors; // variável para identificar o teclado
var fase = ['Fase01', 'Fase02']


