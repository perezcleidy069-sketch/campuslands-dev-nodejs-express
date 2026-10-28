const players= [
    { id: 1, name: "Aragorn", class: "Guerrero", level: 10},
    { id: 2, name: " Escarlata",  class: "Mago", level: 20},
    { id: 3, name: "Dragón", class: "Defensor", lever: 2}
];

export const getAllPlayers=()=>{
    return players;
};

export const createPLayer=(data)=>{
    const newPlayer ={
        id:players.length +1,
        name:data.name,
        class:data.class || "Novato",
        level:data.level || 1
    };
    players.push(newPlayer);
    return newPlayer
}