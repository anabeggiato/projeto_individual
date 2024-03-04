// declaração de variáveis
var player;
var teclado;
var fogo;
var plataforma1, plataforma2, plataforma3, plataforma4, plataforma5, plataforma6, plataforma7, plataforma8;
var moeda;
var pontuacao = 0;
var placar;
var coracao;

// criando uma lista com as dimensões da tela
const TamTela = [700, 850]

class Adventure extends Phaser.Scene {

    constructor() {
        super({
            key: 'Adventure',
            // Configurações específicas da cena podem ser adicionadas aqui
            physics: {
               arcade: {
                    debug: false,
                    gravity: { y: 500 }
               } 
            } 
        });
    }

    preload() { // carregar os recursos do jogo
        this.load.image('background', 'assets/bg.png'); //carregando o fundo
        this.load.image('player', 'assets/SteamMan.png') //carregando a imagem do player
        this.load.image('plataforma1', 'assets/plataforma1.png') // carregando o primeiro tijolo
        this.load.image('plataforma2', 'assets/plataforma2.png') // carregando o segundo tijolo
        this.load.image('plataforma3', 'assets/plataforma3.png') // carregando o terceiro tijolo
        this.load.image('moeda', 'assets/moeda.png') // carregando a moeda
        this.load.image('coracao', 'assets/coracao.png') // carregando o coração
        this.load.spritesheet('andando', 'assets/SteamMan_walk.png', { frameWidth: 48, frameHeight: 48 }) // carregando o personagem andando
        this.load.spritesheet('pulando', 'assets/SteamMan_jump.png', { frameWidth: 48, frameHeight: 48 }) // carregando o personagem pulando
    }

    create() {
        // adiciona a tela inicial, definindo seu tamanho
        this.add.image('background');

        this.anims.create({
            key: 'andar', // nome para chamar a animação
            frames: this.anims.generateFrameNumbers('andando', {start: 0, end: 5}), // definição das sprites a serem usadas na animação
            frameRate: 10, // velocidade da animação
            repeat: -1 //definição da repetição em loop
        });

        this.anims.create({
            key: 'pular',
            frames: this.anims.generateFrameNumbers('pulando', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        })

        
        //criação do player
        player = this.physics.add.sprite(TamTela[0]/2, 0, 'player');
        player.setCollideWorldBounds(true);

        teclado = this.input.keyboard.createCursorKeys();

        //Adiciona as plataformas
        plataforma1 = this.physics.add.staticImage(175, 283.3, 'plataforma1').setSize(368, 33).setScale(2, 1);
        this.physics.add.collider(player, plataforma1);

        plataforma2 = this.physics.add.staticImage(150, 531.25, 'plataforma2').setSize(244, 31).setScale(4, 1);
        this.physics.add.collider(player, plataforma2);

        plataforma3 = this.physics.add.staticImage(600, 320, 'plataforma3').setSize(246, 34).setScale(2, 1);
        this.physics.add.collider(player, plataforma3);

        plataforma4 = this.physics.add.staticImage(350, 430, 'plataforma1').setSize(368, 33).setScale(2, 1);
        this.physics.add.collider(player, plataforma4);

        plataforma5 = this.physics.add.staticImage(450, 195, 'plataforma2').setSize(244, 31).setScale(4, 1);
        this.physics.add.collider(player, plataforma5);

        plataforma6 = this.physics.add.staticImage(620, 506, 'plataforma3').setSize(246, 34).setScale(2, 1);
        this.physics.add.collider(player, plataforma6);

        plataforma7 = this.physics.add.staticImage(175, 690, 'plataforma1').setSize(1500, 33).setScale(8, 1);
        this.physics.add.collider(player, plataforma7);
        
        plataforma8 = this.physics.add.staticImage(350, 600, 'plataforma2').setSize(244, 31).setScale(4, 1);
        this.physics.add.collider(player, plataforma8);

        //Adicionando moeda
        moeda = this.physics.add.sprite(TamTela[0]/3, 0, 'moeda').setScale(.5);
        moeda.setCollideWorldBounds(true);
        moeda.setBounce(0.7);
        this.physics.add.collider(moeda, plataforma1);
        this.physics.add.collider(moeda, plataforma2);
        this.physics.add.collider(moeda, plataforma3);
        this.physics.add.collider(moeda, plataforma4);
        this.physics.add.collider(moeda, plataforma5);
        this.physics.add.collider(moeda, plataforma6);
        this.physics.add.collider(moeda, plataforma7);
        this.physics.add.collider(moeda, plataforma8);

        //Adicionando coração
        coracao = this.physics.add.sprite(TamTela[0]/3, 0, 'coracao').setScale(.5);
        coracao.setCollideWorldBounds(true);
        coracao.setBounce(0.7);
        this.physics.add.collider(coracao, plataforma1);
        this.physics.add.collider(coracao, plataforma2);
        this.physics.add.collider(coracao, plataforma3);
        this.physics.add.collider(coracao, plataforma4);
        this.physics.add.collider(coracao, plataforma5);
        this.physics.add.collider(coracao, plataforma6);
        this.physics.add.collider(coracao, plataforma7);
        this.physics.add.collider(coracao, plataforma8);

        // adicionando placar 
        placar = this.add.text(50, 50, 'Pontos:' + pontuacao, {fontSize:'20px', fill:'#495613'});

        // Ações a serem executadas quando o player encostar na moeda
        this.physics.add.overlap(player, moeda, function (){

            moeda.setVisible(false); // moeda fica 'invisível

            var posicaoMoeda_X = Phaser.Math.RND.between(50, 650); //sorteia um numero
            var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650); //sorteia um numero

            moeda.setPosition(posicaoMoeda_X, posicaoMoeda_Y); 

            pontuacao += 1; //soma pontuação
            placar.setText('Pontos: ' + pontuacao); //atualiza texto do placar

            moeda.setVisible(true); //ativa a visão da "nova moeda"
        });

        // Ações a serem executadas quando o player encostar no coração
        this.physics.add.overlap(player, coracao, function (){

            coracao.setVisible(false); // coração fica 'invisível

            var posicaoCoracao_X = Phaser.Math.RND.between(50, 650); //sorteia numero
            var posicaoCoracao_Y = Phaser.Math.RND.between(50, 650); //sorteia numero
            coracao.setPosition(posicaoCoracao_X, posicaoCoracao_Y); //ajusta a posição do coração

            pontuacao += 2; //soma pontuação
            placar.setText('Pontos: ' + pontuacao); //atualiza texto do placar

            coracao.setVisible(true); //ativa a visão do "novo coração"
        });
        
    }

    update() {

        //Movimento para esquerda [<-]
        if (teclado.left.isDown) {
            player.setVelocityX(-150); 
            player.setFlip(true)
            player.anims.play('andar', true)
        }


        //Movimento para a direita [->]
        else if (teclado.right.isDown) {
            player.setVelocityX(150); 
            player.setFlip(false)
            player.anims.play('andar', true)
        }
        
        //Sem moviemnto horizontal [x=0]
        else {
            player.setVelocityX(0);
            player.anims.play('andar', false)
        }

        //Movimento para cima [^]
        if (teclado.up.isDown && player.body.touching.down) {
            player.setVelocityY(-350);
            player.anims.play('pular', true)
        } 
    }
}
