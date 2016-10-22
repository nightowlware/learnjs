for (let i = 1; i <= 100; i++) {
  let fizzed = false;

  if (i % 3 === 0) {
    process.stdout.write("Fizz");
    fizzed = true;
  }

  if (i % 5 === 0) {
    process.stdout.write("Buzz");
    fizzed = true;
  }

  if (!fizzed) {
    process.stdout.write(""+i);
  }

  console.log();
}
