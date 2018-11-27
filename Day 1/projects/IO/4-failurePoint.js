// Mixing Blocking and Non-blocking - Oops code!
// const fs = require('fs');

// fs.readFile('/file.md', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// findout what fs.unlinkSync and fs.unlink does?
// fs.unlinkSync('/file.md');


// // read
// const data = fs.readFileSync('./File.md');

// // console
// console.log(data);

// // delete
//  fs.unlinkSync('./File.md');


// Entirely Non-blocking - Good code!
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});