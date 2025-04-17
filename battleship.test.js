const { Ship, Gameboard } = require('./script');

//testing hit and isSunk function inside ship
test('isSunk function inside ship class', () => {
    const myShip = new Ship(3, 0, false);

    myShip.hit();
    myShip.hit();
    myShip.hit();

    expect(myShip.isSunk()).toBe(true); 
});


test('a grid is created when boardSize is defined', () => {
    const newBoard = new Gameboard(3);
    expect(newBoard.boardGrid).toEqual([[null,null,null],
                                     [null,null,null],
                                     [null,null,null],
                                    ]);
});

test('placeShip function places a ship in a coordinate- vertical ship size 2', () => {
    const newBoard = new Gameboard(3);
    const myShip = new Ship(2, 0, false);
    newBoard.placeShip(myShip, 1, 1, "vertical");
    expect(newBoard.boardGrid).toEqual([[null,null,null],
                                        [null,myShip,null],
                                        [null,myShip,null],
                                        ]);
});

test('placeShip function places a ship in a coordinate- horizontal ship size 2', () => {
    const newBoard = new Gameboard(3);
    const myShip = new Ship(2, 0, false);
    newBoard.placeShip(myShip, 1, 1, "horizontal");
    expect(newBoard.boardGrid).toEqual([[null,null,null],
                                        [null,myShip,myShip],
                                        [null,null,null],
                                        ]);
});
