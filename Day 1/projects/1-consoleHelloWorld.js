// console.log("Hello World!");

// Try doing 
// console.log(document);
// console.log(window);
// console.log(process);
// console.log(process.env.NODE_ENV);

console.log(process.env.API_KEY);


if(process.env.NODE_ENV == 'production') {
  console.log('i am a production')
} else {
  console.log('i am development')
}