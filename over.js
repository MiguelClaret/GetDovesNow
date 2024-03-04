

class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        //carrega as imagens a serem usadas nessa cena
        this.load.image('tela', 'assets/telaOver.png')
        this.load.image('dnv', 'assets/again.png')
    }

    create() {
        this.add.image(300, 300, 'tela') // add a imagem de fundo
        let botao = this.add.image(300, 500, 'dnv').setScale(1.75) // add o botão

        //define o botão como interativo e sua ação quando clicado
        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('telaInicial');
        })
    };
}