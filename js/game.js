var game = new Phaser.Game(1368, 656, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.atlas('scooby', 'assets/scooby.png', 'assets/scooby.json');
    game.load.image('red', 'assets/red.png');
    game.load.image('planet1', 'assets/planet1.png');
    game.load.image('mineral', 'assets/mineral.png');
    game.load.image('wood', 'assets/wood.png');
    game.load.image('spaceship', 'assets/spaceship.png');
    game.load.image('building', 'assets/building.png');
}

var Py = {};


function create() {
    Py.BSU = 80; //Basic Slot Unit
    
    Py.point = game.add.sprite(250, 250, 'red');
//    Py.planet1sprite = game.add.sprite(250, 250, 'planet1');
//    Py.planet1sprite.anchor.setTo(0.5, 0.5);
//    Py.planet1sprite.scale.setTo(1.5,1.4);
    Py.planets = new Array();
    Py.planets[0] = new Phaser.Circle(250, 250, 200);
    Py.planets[1] = new Phaser.Circle(600, 200, 120);
    Py.planets[2] = new Phaser.Circle(1000, 300, 260);
    game.stage.backgroundColor = 0x02B5F0;
    
    var i, j, point;
    for (j = 0; j < Py.planets.length; j++) {
        var planet = Py.planets[j];
        var slots = Math.floor(planet.circumference() / Py.BSU);
        for (i = 0; i < slots; i++) {
            point = planet.circumferencePoint(360/slots * i, true);
            var aux = game.add.sprite(point.x, point.y, 'mineral'); 
            aux.anchor.setTo(0.5, 0.9);
            aux.rotation = game.physics.arcade.angleBetween(aux, planet) - Math.PI/2;
        }
    }
    
    Py.scooby = game.add.sprite(100, 380, 'scooby');
    Py.scooby.animations.add('idle', Phaser.Animation.generateFrameNames('Scooby', 0, 30, '', 4), 30, true, false);
    Py.scooby.animations.add('walk', Phaser.Animation.generateFrameNames('Scooby', 31, 63, '', 4), 30, true, false);
    Py.scooby.anchor.setTo(0.5, 0.88);
    Py.scooby.scale.setTo(0.7, 0.7);
    
    Py.scooby.play('walk');
    Py.scooby.inputEnabled = true;
    Py.scooby.input.enableDrag(true);
    Py.angulo = 0.1; //TODO replace
    
    //TODO create planet group - for each planet, add slots, make them visible
    
    
}

function update() {
    var aux;
    if (Py.scooby.animations.currentAnim.name == 'walk') {
        Py.angulo += 0.3;
    }
    aux = Py.planets[0].circumferencePoint(Py.angulo, true);
    Py.scooby.x = aux.x;
    Py.scooby.y = aux.y;
    Py.scooby.rotation = game.physics.arcade.angleBetween(Py.scooby, Py.planets[0]) - Math.PI/2;
    
//    Py.scooby.x += 0.5;
    if (Py.point.x < -Py.point.width) {
        Py.point.x = game.world.width;
    }
}


function render() {
//    game.debug.geom(Py.planets[0],'rgba(34,177,76,1)');
//    game.debug.geom(Py.planets[1],'rgba(255,127,39,1)');
//    game.debug.geom(Py.planets[2],'rgba(237,28,36,1)');
    var i, j, point;
    for (j = 0; j < Py.planets.length; j++) {
        var planet = Py.planets[j];
        game.debug.geom(planet,'rgba(255,127,39,1)');
        var slots = Math.floor(planet.circumference() / Py.BSU);
//        for (i = 0; i < slots; i++) {
//            console.log(i);
//            point = planet.circumferencePoint(360/slots * i, true);
//            game.debug.pixel(point.x, point.y);
//        }
        game.debug.pixel(planet.x, planet.y);
    }
//    var slots = Math.floor(Py.planets[0].circumference() / Py.BSU);
//    var i;
//    var point;
//    for (i = 0; i < slots; i++) {
//        console.log(i);
//        point = Py.planets[0].circumferencePoint(360/slots * i, true);
//        //game.add.sprite(point.x, point.y, 'red');
//        game.debug.pixel(point.x, point.y);
//    }
//    game.debug.pixel(Py.planets[0].x, Py.planets[0].y);
}