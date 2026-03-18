// //FUNCTION WITH TYPES
//
// function getSoldierInfo(name: String, rank: number) : String{
//     return `${name} is a 0-${rank}`;
// }
//
// console.log(getSoldierInfo(`Tairrque`, 2));

//Lesson 6: Optional Parameters & Default Values

//OPTIONAL PARAMETER?
/*
USE OPTIONAL WHEN YOU DON'T REALLY KNOW STATUS
 */

// function getSoldierInfo(name: String, rank: number, isDeployed? : boolean) : String{
//     if (isDeployed){
//         return `${name} 0-${rank} - DEPLOYED`;
//     } else {
//         return `${name} 0-${rank} - CONUS;`
//     }
// }
//
// console.log(getSoldierInfo('Baker', 2));
// console.log(getSoldierInfo(`Baker`, 2, true));
// console.log(getSoldierInfo(`Baker`, 2, false));

// //DEFAULT VALUE = USE WHEN YOU ARE SURE
// function getSoldierInfo(name: string, rank: number, status: string = "CONUS"): string {
//     return `${name} (E-${rank}) - ${status}`;
// }
//
// console.log(getSoldierInfo("Baker", 7));
// console.log(getSoldierInfo("Baker", 7, "DEPLOYED"));

// LESSON 7- ARRAYS
// let squad: String[] = [`Baker`, `Keno`, `James`];
// let scores: number[] = [1,2,3];
//
// squad.push(`Cam`); //Push adds
// scores.push(99); //Push adds
//
// console.log(squad);
// console.log(scores);

//Lesson 8: Objects & Type Aliases

// type Soldier = {
//     name: String
//     rank: String;
//     dodId: number;
//     isDeployable: boolean;
//     mos?:String
// };
//
// const soldier1: Soldier ={
//     name: `Tairrque Baker`,
//     rank: `0-2`,
//     dodId: 1542846786,
//     isDeployable: true,
//     mos: `Software Operations`
// };
//
// const soldier2: Soldier ={
//     name: `Maxwell George`,
//     rank: `0-3`,
//     dodId: 1234567,
//     isDeployable: false,
// };
//
// console.log(soldier1);
// console.log(soldier2);

//LESSON 9-UNION TYPES

//union types restrict a value to a defined set of possibilities, and TypeScript enforces it at compile time.

// type EnlistedRank = "PV1" | "PV2" | "PFC" | "SPC" | "CPL" | "SGT" | "SSG" | "SFC" | "MSG" | "1SG" | "SGM" | "CSM" | "SMA";
// type OfficerRank = "2LT" | "1LT" | "CPT" | "MAJ" | "LTC" | "COL" | "BG" | "MG" | "LTG" | "GEN";
// type WarrantRank = "WO1" | "CW2" | "CW3" | "CW4" | "CW5";
//
// type Rank = EnlistedRank | OfficerRank | WarrantRank;
//
// function getCategory(rank: Rank): string {
//     if (rank === "WO1" || rank === "CW2" || rank === "CW3" || rank === "CW4" || rank === "CW5") {
//         return `${rank} - Warrant Officer`;
//     }
//     if (rank === "2LT" || rank === "1LT" || rank === "CPT" || rank === "MAJ" || rank === "LTC" || rank === "COL" || rank === "BG" || rank === "MG" || rank === "LTG" || rank === "GEN") {
//         return `${rank} - Commissioned Officer`;
//     }
//     return `${rank} - Enlisted`;
// }
//
// console.log(getCategory("SFC"));
// console.log(getCategory("CPT"));
// console.log(getCategory("CW3"));
// console.log(getCategory("banana"));


//Lesson 10: Interfaces - Similar to Inheritance in JAVA

// interface Soldier {
//     name: String;
//     rank: String;
//     dodId: number;
//     mos?: String;
// }
//
// interface Officer extends Soldier{
//     command: String;
//     commissionSource: String;
// }
//
// const enlisted: Soldier= {
//     name: `Blake Deines`,
//     rank: `SFC`,
//     dodId: 1234567,
//     mos: `Signal Operator`
// }
//
// const officer: Officer = {
//     name: "Karch Swaylik",
//     rank: `CPT`,
//     command: `Software Factory`,
//     commissionSource:`ROTC`,
//     dodId:123864,
//
// }
//
// console.log(enlisted);
// console.log(officer);

//LESSON 11: ENUMS

/*
An enum groups related constants under one name, gives them readable labels, and TypeScript enforces that only valid members are used.
There are two kinds:
String enums — each member has an explicit string value. Clear and readable.
Numeric enums — each member gets a number, auto-incrementing from 0 (or a starting value you set). Useful when you need numeric codes.
 */

// enum Branch{
//     Army = `Army`,
//     Air_Force = `Air Force`,
//     Navy = `Navy`,
//     Marines = `Marines`,
//     Space_Force = `Space Force`,
//     Coast_Guard = `Coast Guard`
// }
//
// enum PayGrade{
//     E1= 1,
//     E2= 2,
//     E3=3,
//     E4=4,
//     E5=5,
//     E6=6,
//     E7=7,
//     E8=8,
//     E9=9,
//
// }
//
// interface Soldier {
//     name: String;
//     branch:Branch;
//     payGrade:PayGrade;
// }
//
// const soldier: Soldier ={
//     name:`Tairrque Baker`,
//     branch: Branch.Army,
//     payGrade: PayGrade.E7
//
// }
//
// console.log(soldier);
// console.log(`Pay Grade: ${soldier.payGrade}`);