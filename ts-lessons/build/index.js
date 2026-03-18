var Branch;
(function (Branch) {
    Branch["Army"] = "Army";
    Branch["Air_Force"] = "Air Force";
    Branch["Navy"] = "Navy";
    Branch["Marines"] = "Marines";
    Branch["Space_Force"] = "Space Force";
    Branch["Coast_Guard"] = "Coast Guard";
})(Branch || (Branch = {}));
var PayGrade;
(function (PayGrade) {
    PayGrade[PayGrade["E1"] = 1] = "E1";
    PayGrade[PayGrade["E2"] = 2] = "E2";
    PayGrade[PayGrade["E3"] = 3] = "E3";
    PayGrade[PayGrade["E4"] = 4] = "E4";
    PayGrade[PayGrade["E5"] = 5] = "E5";
    PayGrade[PayGrade["E6"] = 6] = "E6";
    PayGrade[PayGrade["E7"] = 7] = "E7";
    PayGrade[PayGrade["E8"] = 8] = "E8";
    PayGrade[PayGrade["E9"] = 9] = "E9";
})(PayGrade || (PayGrade = {}));
const soldier = {
    name: `Tairrque Baker`,
    branch: Branch.Army,
    payGrade: PayGrade.E7
};
const bad = {
    name: "Test",
    branch: "Army",
    payGrade: 7
};
console.log(soldier);
console.log(`Pay Grade: ${soldier.payGrade}`);
