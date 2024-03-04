class Tutorial extends Phaser.Scene{
    constructor(){
            super({key: "Tutorial"});
        };
    
        create(){
           //tela de inicio
            this.add.text(230, 250, "Seja bem vindo ao Adventure Game!", {fill:'#000000', fontSize: '20px'});
            this.add.text(300, 320, "Para jogar este game, ", {fill:'#000000', fontSize: '20px'})
            this.add.text(150, 350, "você vai precisar apenas das setas do seu teclado :) ", {fill:'#000000', fontSize: '20px'})
            this.add.text(300, 425, "Clique para começar", {fill: '#000000', fontSize: '20px'});
            this.input.on('pointerdown',() => {
                this.scene.stop('Tutorial'),
                this.scene.start('Adventure');
            
            })
        };
}