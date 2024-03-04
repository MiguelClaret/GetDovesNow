

class telaWinner extends Phaser.Scene {
    constructor() {
        super({ key: 'telaWinner' });
    }

    preload() {
        // carega as imagens a serem usadas nessa cena
        this.load.image('win', 'assets/win.png')
        this.load.image('dnv1', 'assets/again.png')
    }

    create() {
        this.add.image(300, 300, 'win')// add o fundo dessa cena
        let botao = this.add.image(300, 500, 'dnv1').setScale(1.5) // add o botão

        //define o botão como interativo e sua ação quando clicado
        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('telaInicial');
        })
    };
}