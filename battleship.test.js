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

test('recieveAttack function works when ship is hit', () => {
    const newBoard = new Gameboard(3);
    const myShip = new Ship(2, 0, false);
    newBoard.placeShip(myShip, 1, 1, "horizontal");
    newBoard.receiveAttack(1,1);
    expect(myShip.hitCount).toBe(1);
});

test('recieveAttack function works when ship is sunk', () => {
    const newBoard = new Gameboard(3);
    const myShip = new Ship(2, 0, false);
    newBoard.placeShip(myShip, 1, 1, "horizontal");
    newBoard.receiveAttack(1,1);
    newBoard.receiveAttack(1,2);
    expect(myShip.sunk).toBe(true);
});

test('recieveAttack function works when ship is missed', () => {
    const newBoard = new Gameboard(3);
    const myShip = new Ship(2, 0, false);
    newBoard.placeShip(myShip, 1, 1, "horizontal");
    newBoard.receiveAttack(2,2);
    expect(myShip.hitCount).toBe(0);
});