

class telaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaInicial' });
    }

    preload() {
        //carrega as imagens a serem usadas nessa cena
        this.load.image('cena', 'assets/telaInicial.png')
        this.load.image('play', 'assets/botao-play.png')
    }

    create() {
        this.add.image(300, 300, 'cena') // add a imagem de fundo
        let botao = this.add.image(300, 500, 'play').setScale(0.7) // add o botão
        // define o botão como interativo e define sua função ao clicar
        botao.setInteractive()
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('Fase01');
        })
    };
}