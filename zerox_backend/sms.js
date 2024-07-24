const axios = require("axios");
const con = [
  {
    id: 1,
    phone: 998976078118,
  },
  {
    id: 2,
    phone: 998937481450,
  },
  {
    id: 3,
    phone: 998907135853,
  },
  {
    id: 4,
    phone: 998995015746,
  },
  {
    id: 5,
    phone: 998975153817,
  },
  {
    id: 6,
    phone: 998886008812,
  },
  {
    id: 7,
    phone: 998932849218,
  },
  {
    id: 8,
    phone: 998975141151,
  },
  {
    id: 9,
    phone: 998919120083,
  },
  {
    id: 10,
    phone: 998937477274,
  },
  {
    id: 11,
    phone: 998887920284,
  },
  {
    id: 12,
    phone: 998976052402,
  },
  {
    id: 13,
    phone: 998992820883,
  },
  {
    id: 14,
    phone: 998990450710,
  },
  {
    id: 15,
    phone: 998931327008,
  },
  {
    id: 16,
    phone: 998994113730,
  },
  {
    id: 17,
    phone: 998884520281,
  },
  {
    id: 18,
    phone: 998912778870,
  },
  {
    id: 19,
    phone: 998973560117,
  },
  {
    id: 20,
    phone: 998907063107,
  },
  {
    id: 21,
    phone: 998977810905,
  },
  {
    id: 22,
    phone: 998907190666,
  },
  {
    id: 23,
    phone: 998900822393,
  },
  {
    id: 24,
    phone: 998995051120,
  },
  {
    id: 25,
    phone: 998900908298,
  },
  {
    id: 26,
    phone: 998997336350,
  },
  {
    id: 27,
    phone: 998919953757,
  },
  {
    id: 28,
    phone: 998951094444,
  },
  {
    id: 29,
    phone: 998883533238,
  },
  {
    id: 30,
    phone: 998978595353,
  },
  {
    id: 31,
    phone: 998975114554,
  },
  {
    id: 32,
    phone: 998889090083,
  },
  {
    id: 33,
    phone: 998914303578,
  },
  {
    id: 34,
    phone: 998991395929,
  },
  {
    id: 35,
    phone: 998885262808,
  },
  {
    id: 36,
    phone: 998975124480,
  },
  {
    id: 37,
    phone: 998997549705,
  },
  {
    id: 38,
    phone: 998975172919,
  },
  {
    id: 39,
    phone: 998905571512,
  },
  {
    id: 40,
    phone: 998991138369,
  },
  {
    id: 41,
    phone: 998882010058,
  },
  {
    id: 42,
    phone: 998883534388,
  },
  {
    id: 43,
    phone: 998977901010,
  },
  {
    id: 44,
    phone: 998974351441,
  },
  {
    id: 46,
    phone: 998985160204,
  },
  {
    id: 47,
    phone: 998939220189,
  },
  {
    id: 48,
    phone: 998991890029,
  },
  {
    id: 49,
    phone: 998942361110,
  },
  {
    id: 50,
    phone: 998937558665,
  },
  {
    id: 51,
    phone: 998888560898,
  },
  {
    id: 52,
    phone: 998995627717,
  },
  {
    id: 53,
    phone: 998910910010,
  },
  {
    id: 54,
    phone: 998976003515,
  },
  {
    id: 55,
    phone: 998914216851,
  },
  {
    id: 56,
    phone: 998918628398,
  },
  {
    id: 57,
    phone: 998885139933,
  },
  {
    id: 58,
    phone: 998951811026,
  },
  {
    id: 59,
    phone: 998999666059,
  },
  {
    id: 60,
    phone: 998972118868,
  },
  {
    id: 61,
    phone: 998888250585,
  },
  {
    id: 62,
    phone: 998970504900,
  },
  {
    id: 63,
    phone: 998977490255,
  },
  {
    id: 64,
    phone: 998770918979,
  },
  {
    id: 65,
    phone: 998904361035,
  },
  {
    id: 66,
    phone: 998931504021,
  },
  {
    id: 67,
    phone: 998976050056,
  },
  {
    id: 68,
    phone: 998934360654,
  },
  {
    id: 69,
    phone: 998887242223,
  },
  {
    id: 70,
    phone: 998996285314,
  },
  {
    id: 71,
    phone: 998975114004,
  },
  {
    id: 72,
    phone: 998885106556,
  },
  {
    id: 73,
    phone: 998995794145,
  },
  {
    id: 74,
    phone: 998971800201,
  },
  {
    id: 75,
    phone: 998948746867,
  },
  {
    id: 76,
    phone: 998996686850,
  },
  {
    id: 77,
    phone: 998995007885,
  },
  {
    id: 78,
    phone: 998944512702,
  },
  {
    id: 79,
    phone: 998886029794,
  },
  {
    id: 80,
    phone: 998943261375,
  },
  {
    id: 81,
    phone: 998883621600,
  },
  {
    id: 82,
    phone: 998906490311,
  },
  {
    id: 83,
    phone: 998905787882,
  },
  {
    id: 84,
    phone: 998972012882,
  },
  {
    id: 85,
    phone: 998937526639,
  },
  {
    id: 86,
    phone: 998975153731,
  },
  {
    id: 87,
    phone: 998972211437,
  },
  {
    id: 88,
    phone: 998947424488,
  },
  {
    id: 89,
    phone: 998932950847,
  },
  {
    id: 90,
    phone: 998888904466,
  },
  {
    id: 91,
    phone: 998933605880,
  },
  {
    id: 92,
    phone: 998959170525,
  },
  {
    id: 93,
    phone: 998999642030,
  },
  {
    id: 94,
    phone: 998919939909,
  },
  {
    id: 95,
    phone: 998932870804,
  },
  {
    id: 96,
    phone: 998993380058,
  },
  {
    id: 97,
    phone: 998884529252,
  },
  {
    id: 98,
    phone: 998996268280,
  },
  {
    id: 99,
    phone: 998933619699,
  },
  {
    id: 100,
    phone: 998914088598,
  },
  {
    id: 101,
    phone: 998953739203,
  },
  {
    id: 102,
    phone: 998970156262,
  },
  {
    id: 103,
    phone: 998907991664,
  },
  {
    id: 104,
    phone: 998997479700,
  },
  {
    id: 105,
    phone: 998904361035,
  },
  {
    id: 106,
    phone: 998932860060,
  },
  {
    id: 107,
    phone: 998772553131,
  },
  {
    id: 108,
    phone: 998933861002,
  },
  {
    id: 109,
    phone: 998996667887,
  },
  {
    id: 110,
    phone: 998885101900,
  },
  {
    id: 111,
    phone: 998975092579,
  },
  {
    id: 112,
    phone: 998974530183,
  },
  {
    id: 113,
    phone: 998919980898,
  },
  {
    id: 114,
    phone: 998883601858,
  },
];
const msg = `Maktabni bitirib nima qilsam ekan?

Agar siz ham shuni o'ylayotgan bo'lsangiz Praktikum Academy Mobilografiya, SMM va Dasturlash kurslariga qabulni ochdik!

Ro'yhatdan o'tish: https://forms.gle/zs8jXNnYgrBVq4hK8

Telefon: +998781137008`
const sms = (phone, message) => {
  console.log("phone", phone);
  console.log("message", message);
  axios({
    method: "POST",
    url: "http://91.204.239.44/broker-api/send",
    headers: {
      Authorization: "Basic emVyb3g6a1MyOHUzRDloUw==",
    },
    data: {
      messages: [
        {
          recipient: `${phone}`,
          "message-id": "abc000000001",
          sms: {
            originator: "ZeroX",
            content: {
              text: message,
            },
          },
        },
      ],
    },
  })
    .then((response) => {
      console.log(response, "res");
      console.log("success");
    })
    .catch((error) => {
      return console.log(error);
    });
};

sms("+998999642412", msg);
