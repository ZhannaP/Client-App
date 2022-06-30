export interface Chempion{
    version: string
    id: string,
    key: number,
    name: string,
    title: string,
    blurb: string
    tags : string,
    partype: string,
    attack?: number,
    defense?:number,
    magic?: number,
    difficulty: number,
    hp?: number
    hpperlevel?: number
    mp?: number,
    mpperlevel?: number,
    movespeed?: number,
    armor?: number,
    armorperlevel?: number,
    spellblock?: number,
    spellblockperlevel?: number,
    attackrange?: number,
    hpregen?: number,
    hpregenperlevel?: number,
    mpregen?: number,
    mpregenperlevel?: number,
    crit?: number,
    critperlevel?: number,
    attackdamage?: number,
    attackdamageperlevel?: number,
    attackspeedperlevel?: number,
    attackspeed?: number,
}