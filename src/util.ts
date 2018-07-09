async function benchmark(operation: () => any, message: string) {
  try {
    const start = new Date().getTime();
    await Promise.resolve(operation());
    const timeDiff = new Date().getTime() - start;
    console.log(`${message}: ${timeDiff}ms`);
  } catch (err) {
    console.log('benchmark: ', err);
  }
}

export { benchmark };
