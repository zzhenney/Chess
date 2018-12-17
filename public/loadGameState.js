import api from '/scripts/api/index.js';

const idArray = {};

idArray["00"] = "A1";
idArray["10"] = "B1";
idArray["20"] = "C1";
idArray["30"] = "D1";
idArray["40"] = "E1";
idArray["50"] = "F1";
idArray["60"] = "G1";
idArray["70"] = "H1";

idArray["01"] = "A2";
idArray["11"] = "B2";
idArray["21"] = "C2";
idArray["31"] = "D2";
idArray["41"] = "E2";
idArray["51"] = "F2";
idArray["61"] = "G2";
idArray["71"] = "H2";

idArray["02"] = "A3";
idArray["12"] = "B3";
idArray["22"] = "C3";
idArray["32"] = "D3";
idArray["42"] = "E3";
idArray["52"] = "F3";
idArray["62"] = "G3";
idArray["72"] = "H3";

idArray["03"] = "A4";
idArray["13"] = "B4";
idArray["23"] = "C4";
idArray["33"] = "D4";
idArray["43"] = "E4";
idArray["53"] = "F4";
idArray["63"] = "G4";
idArray["73"] = "H4";

idArray["04"] = "A5";
idArray["14"] = "B5";
idArray["24"] = "C5";
idArray["34"] = "D5";
idArray["44"] = "E5";
idArray["54"] = "F5";
idArray["64"] = "G5";
idArray["74"] = "H5";

idArray["05"] = "A6";
idArray["15"] = "B6";
idArray["25"] = "C6";
idArray["35"] = "D6";
idArray["45"] = "E6";
idArray["55"] = "F6";
idArray["65"] = "G6";
idArray["75"] = "H6";

idArray["06"] = "A7";
idArray["16"] = "B7";
idArray["26"] = "C7";
idArray["36"] = "D7";
idArray["46"] = "E7";
idArray["56"] = "F7";
idArray["66"] = "G7";
idArray["76"] = "H7";

idArray["07"] = "A8";
idArray["17"] = "B8";
idArray["27"] = "C8";
idArray["37"] = "D8";
idArray["47"] = "E8";
idArray["57"] = "F8";
idArray["67"] = "G8";
idArray["77"] = "H8";

const imgsrc = {};
imgsrc[1] = "/images/rWhite.png";
imgsrc[2] = "/images/kWhite.png";
imgsrc[3] = "/images/bWhite.png";
imgsrc[4] = "/images/qWhite.png";
imgsrc[5] = "/images/kingWhite.png";
imgsrc[6] = "/images/bWhite.png";
imgsrc[7] = "/images/kWhite.png";
imgsrc[8] = "/images/rWhite.png";
imgsrc[9] = "/images/pWhite.png";
imgsrc[10] = "/images/pWhite.png";
imgsrc[11] = "/images/pWhite.png";
imgsrc[12] = "/images/pWhite.png";
imgsrc[13] = "/images/pWhite.png";
imgsrc[14] = "/images/pWhite.png";
imgsrc[15] = "/images/pWhite.png";
imgsrc[16] = "/images/pWhite.png";
imgsrc[17] = "/images/rBlack.png";
imgsrc[18] = "/images/kBlack.png";
imgsrc[19] = "/images/bBlack.png";
imgsrc[20] = "/images/qBlack.png";
imgsrc[21] = "/images/kingBlack.png";
imgsrc[22] = "/images/bBlack.png";
imgsrc[23] = "/images/kBlack.png";
imgsrc[24] = "/images/rBlack.png";
imgsrc[25] = "/images/pBlack.png";
imgsrc[26] = "/images/pBlack.png";
imgsrc[27] = "/images/pBlack.png";
imgsrc[28] = "/images/pBlack.png";
imgsrc[29] = "/images/pBlack.png";
imgsrc[30] = "/images/pBlack.png";
imgsrc[31] = "/images/pBlack.png";



const start = ()  => {
    const gameId = document.getElementById('game-id').value;

    api.getGameInfo(gameId)
        .then(data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
            console.log("img_src: " + data[i].piece_id);
            console.log("col: " + data[i].col + " row: " + data[i].row);
            const key = data[i].col + "" + data[i].row;
            const id = idArray[key];
            const element = document.querySelector("#" + id);

            if(element != null)
                element.setAttribute("style", "background-image: url("+ imgsrc[data[i].piece_id] + ")");
        }
    }).catch(err => {
        // handle error
        console.log('Error loading gamestate: ' + err);
    });

};

document.addEventListener('DOMContentLoaded', start);
