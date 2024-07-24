// function padTo2Digits(num) {
//   return num.toString().padStart(2, "0");
// }
// function formatDate(date) {
//   return [
//     padTo2Digits(date.getDate()),
//     padTo2Digits.apply(date.getMonth() + 1),
//     date.getFullYear(),
//   ].join("/");
// }

// console.log(formatDate(new Date()));
const date = new Date();

console.log(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
