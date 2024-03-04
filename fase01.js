// definição de variáveis
var plataformas
var player
var teclado
var placar
var doves
var pontuacao
var i
var situacao


class Fase01 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase01' });
    }

    preload() {
        //carrega as imagens e sprites que serão usadas no game
        this.load.image('bg', 'assets/fundo.png')
        this.load.image('grama', 'assets/grama.png')
        this.load.image('gramaG', 'assets/gramaG.svg')
        this.load.spritesheet('boneco', 'assets/bonequinho.png', { frameWidth: 500, frameHeight: 500 });
        this.load.spritesheet('jmp', 'assets/pulo.png', { frameWidth: 500, frameHeight: 500 });
        this.load.image('dove', 'assets/dove.png')
    }

    create() {
        i = 0
        pontuacao = 0 // zera a pontuaçao
        teclado = this.input.keyboard.createCursorKeys(); // agrega a variável um gerenciador de inputs do teclado;

        this.add.image(300, 300, 'bg');// add o background

        // define a física das plataformas e add elas em suas posições
        plataformas = this.physics.add.staticGroup();
        plataformas.create(200, 150, 'grama')
        plataformas.create(500, 250, 'grama')
        plataformas.create(150, 350, 'grama')
        plataformas.create(500, 450, 'grama')
        plataformas.create(300, 570, 'gramaG')



        player = this.physics.add.sprite(50, 500, 'boneco').setScale(0.15) //add física ao personagem
        player.setBounce(0.2); // defini o fator de ressalto do personagem
        player.setCollideWorldBounds(true) // para ele somente ficar no mapa 
        this.physics.add.collider(player, plataformas); // define a colisão entre o player e a plataforma
        player.setSize(240, 460)// altera o hit box do player

        player.anims.play('idle', true);// inicia a animação do player parado

        placar = this.add.text(445, 30, 'Doves:0/15', { fontSize: '20px', fill: '#00000' }) // add o placr

        // define a física dos doves e add eles
        doves = this.physics.add.group();
        doves.create(300, 475, 'dove')
        doves.create(450, 350, 'dove')
        doves.create(495, 350, 'dove')
        doves.create(550, 350, 'dove')
        doves.create(100, 300, 'dove')
        doves.create(145, 300, 'dove')
        doves.create(190, 300, 'dove')
        doves.create(450, 200, 'dove')
        doves.create(490, 200, 'dove')
        doves.create(530, 200, 'dove')
        doves.create(580, 200, 'dove')
        doves.create(120, 100, 'dove')
        doves.create(160, 100, 'dove')
        doves.create(200, 100, 'dove')
        doves.create(240, 100, 'dove')

        // altera o tamnho e o hitbox dos doves
        doves.children.iterate((doves) => {
            doves.body.setSize(30, 20, true);
            doves.setScale(0.8)
        });
        // add colisão entre os doves e as plataformas
        this.physics.add.collider(doves, plataformas);

        // contador de pontos
        this.physics.add.overlap(player, doves.getChildren(), (player, doves) => {
            doves.disableBody(true, true); // Desativa a física e esconde o dove
            pontuacao += 1; // Incrementa a pontuação
            placar.setText('Doves:' + pontuacao + '/15'); // Atualiza o texto do placar
        });


        // animação do player
        this.anims.create({
            key: 'andar',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('boneco', { start: 0, end: 2 }),
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('boneco', { start: 4, end: 5 }),
            frameRate: 1,
            repeat: -1
        });


        this.initialTime = 20; // Tempo inicial em segundos do timer
        this.timeLeft = this.initialTime; // define a variavel de tempo restante

        // Exibindo o tempo restante na tela
        this.timerText = this.add.text(16, 16, 'Tempo: ' + this.timeLeft, { fontSize: '20px', fill: '#00000' });

        //temporizador
        this.timer = this.time.addEvent({
            delay: 1000, // Chama a função a cada 1 segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        situacao = this.add.text(200, 16, 'Você está na ' + fase[i], { fontSize: '20px', fill: '#00000' })

    }

    // método qual att o timer
    updateTimer() {
        // Atualiza o tempo restante
        this.timeLeft--;

        // Atualiza o texto na tela
        this.timerText.setText('Tempo: ' + this.timeLeft);

        // Verifica se o tempo acabou
        if (this.timeLeft === 0) {
            // Chama a função para mudar de cena de game over
            this.scene.stop()
            this.scene.start('gameOver')
        }

    }
    update() {
    
        // configuração das ações de cada tecla de movimentação
        if (teclado.left.isDown) {
            player.setVelocityX(-200);
            player.setFlip(false, false)
            player.anims.play('andar', true);
        }
        else if (teclado.right.isDown) {
            player.setVelocityX(200);
            player.setFlip(true, false)
            player.anims.play('andar', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('idle', true);
        }

        if (teclado.up.isDown && player.body.touching.down) {
            player.anims.play('idle');
            player.setVelocityY(-400);
        }

        // verifica se todos os doves foram coletados para mudar de fase
        if (pontuacao === 15) {
            this.scene.stop()
            this.scene.start('Fase02')

        }
    
    }

}