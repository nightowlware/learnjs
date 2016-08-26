// Promises are objects that represent a computation that can
// be in one of the following states:
// 1. Pending
// 2. Fulfilled
// 3. Rejected
// They solve a lot of "callback hell" issues.


// The Promise constructor takes a function that takes 2 params:
// a resolve and a reject callback, to be called to signal a "success"
// or a "failure" respectively. Both resolve and reject take just one
// param as a value.
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(true);
    console.log("p1: ", p1);
  }, 1000);
});
console.log("p1: ", p1);

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Some rejected value");
    console.log("p2: ", p2);
  }, 2000);
});
console.log("p2: ", p2);


// Promises can be chained in various ways for flow control.
// The .then() and .catch() methods return *new Promises* that will
// execute their callback when the previous Promise resolves or rejects,
// respectively. Whatever is returned in this new callback will be the fulfilled
// or rejected value of the new Promise.
let after_p1 = p1.then(() => {
  console.log("At this point, p1 must've been fulfilled");

  setTimeout(() => {
    console.log("after_p1: ", after_p1);
  }, 2000);

  return "This will be the resolved value of after_p1";
});
console.log("after_p1: ", after_p1);

let after_p2 = p2.catch(() => {
  console.log("At this point, p2 must've been fulfilled");

  setTimeout(() => {
    console.log("after_p2: ", after_p2);
  }, 2000);

  return "This will be the rejected value of after_p2";
});
console.log("after_p2:   ", after_p2);


// What if an exception is thrown inside a Promise callback?
let p3 = new Promise((resolve, reject) => {
  throw "Some exception";
});
console.log("p3: ", p3);

p3.catch((err) => {
  console.log("Handling the exception:");
  console.log("err: ", err);
});


// What if an *asynchronous* exception is thrown inside a Promise callback?
let p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw "Some exception";
  }, 2000);
});
console.log("p4: ", p4);

p4.catch((err) => {
  // This is never called.
  console.log("Trying to handle the exception:");
  console.log("err: ", err);
});

// Unfortunately, there's no way around this: we must use
// the process (Node) or window (browser) object to handle uncaughtExceptions:
process.on('uncaughtException', (err) => {
  console.log("----------------");
  console.log("Now we can handle the asynchronous exception:");
  console.log("err: ", err);
  console.log("----------------");
});
