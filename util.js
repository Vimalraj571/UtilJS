const readLineSync = require("readline-sync");
const crypto = require("crypto");

const util = () => {
  function hashing(algo, input) {
    return crypto.createHash(algo).update(input).digest("hex");
  }

  const utilsList = {
    fnNames: [
      {
        text: "1. URLEncode",
        meta: "uriencode",
        fnDef: (input) => encodeURIComponent(input),
      },
      {
        text: "2. URLDecod",
        meta: "uridecode",
        fnDef: (input) => decodeURIComponent(input),
      },
      {
        text: "3. StringEncode",
        meta: "stringencode",
        fnDef: (input) => Buffer.from(input).toString("base64"),
      },
      {
        text: "4. StringDecode",
        meta: "stringdecode",
        fnDef: (input) => Buffer.from(input, "base64").toString("ascii"),
      },
      {
        text: "5. MD5 Algorithm",
        meta: "md5",
        fnDef: (input) => hashing("md5", input),
      },
      {
        text: "6. SHA1 Algorithm",
        meta: "sha1",
        fnDef: (input) => hashing("sha1", input),
      },
      {
        text: "7. SHA1 Algorithm",
        meta: "sha256",
        fnDef: (input) => hashing("sha256", input),
      },
      {
        text: "8. SHA512 Algorithm",
        meta: "sha512",
        fnDef: (input) => hashing("sha512", input),
      },
      {
        text: "9. Epoc to Date",
        meta: "epocToDate",
        fnDef: (input) => {
          const tempDateObj = new Date(0);
          tempDateObj.setUTCSeconds(input);
          return {
            year: tempDateObj.getFullYear(),
            month: tempDateObj.getMonth() + 1,
            date: tempDateObj.getDate(),
            hours: tempDateObj.getHours(),
            minutes: tempDateObj.getMinutes(),
            seconds: tempDateObj.getSeconds(),
          };
        },
      },
      {
        text: "10. Dates to Epoc",
        meta: "dateToEpoc",
        fnDef: (inputArr) =>
          new Date(
            inputArr[0],
            inputArr[1],
            inputArr[2],
            inputArr[3],
            inputArr[4],
            inputArr[5]
          ).getTime() / 1000,
      },
      {
        text: "11. Binary To Decimal",
        meta: "binToDecimal",
        fnDef: (input) => parseInt(input, 2),
      },
      {
        text: "12. Binary To Hex",
        meta: "binToHex",
        fnDef: (input) => parseInt(input, 2).toString(16),
      },
      {
        text: "13. Binary To Octal",
        meta: "binToOctal",
        fnDef: (input) => parseInt(input, 2).toString(8),
      },
      {
        text: "14. Decimal To Binary",
        meta: "decToBinary",
        fnDef: (input) => parseInt(input, 10).toString(2),
      },
      {
        text: "15. Decimal To Hex",
        meta: "decToHex",
        fnDef: (input) => parseInt(input, 10).toString(16),
      },
      {
        text: "16. Decimal To Octal",
        meta: "decToOctal",
        fnDef: (input) => parseInt(input, 10).toString(8),
      },
      {
        text: "17. Hex To Binary",
        meta: "hexToBin",
        fnDef: (input) => parseInt(input, 16).toString(10),
      },
      {
        text: "18. Hex To Decimal",
        meta: "hexToDecimal",
        fnDef: (input) => parseInt(input, 16).toString(2),
      },
      {
        text: "19. Hex To Octal",
        meta: "hexToOctal",
        fnDef: (input) => parseInt(input, 16).toString(2),
      },
      {
        text: "20. Octal To Binary",
        meta: "octToBin",
        fnDef: (input) => parseInt(input, 8).toString(2),
      },
      {
        text: "21. Octal To Decimal",
        meta: "octToDecimal",
        fnDef: (input) => parseInt(input, 8).toString(2),
      },
      {
        text: "22. Octal To Hex",
        meta: "octToHex",
        fnDef: (input) => parseInt(input, 8).toString(16),
      },
      {
        text: "23. RGB To Hex",
        meta: "rgbToHex",
        fnDef: (inputArr) =>
          `#${this.util(inputArr[0])}${this.util(inputArr[1])}${this.util(
            inputArr[2]
          )}`,
        util: (color) => {
          const hexadecimal = color.toString(16);
          return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
        },
      },
      {
        text: "24. Hex To RGB",
        meta: "hexToRGB",
        fnDef: (inputArr) => {
          const r = parseInt(inputArr[1] + inputArr[2], 16);
          const g = parseInt(inputArr[3] + inputArr[4], 16);
          const b = parseInt(inputArr[5] + inputArr[6], 16);
          return `${r},${g},${b}`;
        },
      },
      {
        text: "25. KiloGram To Pounds",
        meta: "kgToPounds",
        fnDef: (input) => input * 2.2046,
      },
      {
        text: "26. Pounds To KiloGram",
        meta: "poundsToKG",
        fnDef: (input) => input / 2.2046,
      },
      {
        text: "27. KiloMeter To Miles",
        meta: "kmToMiles",
        fnDef: (input) => input * 0.621371,
      },
      {
        text: "28. Miles To KiloMeter",
        meta: "milesToKM",
        fnDef: (input) => input / 0.621371,
      },
    ],
  };

  const singleInput = (a = "") => {
    let singleIn = "";
    if (a !== "") {
      singleIn = readLineSync.question(`Enter the ${a}: `);
    } else {
      singleIn = readLineSync.question("Enter the Input:");
    }
    return singleIn;
  };

  const fnAndArg = (Fnmeta) => {
    const tempInArray = [];
    let out = "";
    if (Fnmeta.meta === "dateToEpoc") {
      // get all the date,mont,year,hr,min,sec
      const temp = ["Date", "Month", "Year", "Hour", "Minutes", "Second"];
      for (let i = 0; i < temp.length; i += 1) {
        const tempIn = singleInput(temp[i]);
        tempInArray.push(tempIn);
      }
      out = Fnmeta.fnDef(tempInArray);
    } else if (Fnmeta.meta === "rgbToHex") {
      // r g b
      const temp = ["Red", "Blue", "Green"];
      for (let i = 0; temp.length < 2; i += 1) {
        const tempIn = singleInput(temp[i]);
        tempInArray.push(tempIn);
      }
    } else {
      // single arg
      const tempIn = singleInput();
      // input  : tempIn
      // output : Fnmeta.fnDef
      out = Fnmeta.fnDef(tempIn);
    }
    return out;
  };

  const optionListAndSelectedFn = () => {
    utilsList.fnNames.forEach((element) => {
      console.log(element.text);
    });
    let selectedFn = readLineSync.question("Enter Your Option:");
    selectedFn -= 1;
    if (selectedFn > 27) {
      console.log("Invalid Option");
      return;
    }
    console.log(fnAndArg(utilsList.fnNames[selectedFn]));
  };

  optionListAndSelectedFn();
};

util();

module.exports = {
  util,
};
