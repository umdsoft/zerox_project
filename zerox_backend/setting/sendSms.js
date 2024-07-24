const axios = require("axios");

exports.SMS = (phone, message) => {
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
      console.log("success");
    })
    .catch((error) => {
      return console.log(error);
    });
};
