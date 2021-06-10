export const nthFib = (n: number): number => {
    if (n === 1 || n === 2)
        return 1;
    if (n <= 0 || n % 1 !== 0) {
        console.error("argument 'n' of nthFib must be an integer greater than 0v!");
        return 0;
    }
    return nthFib(n - 1) + nthFib(n - 2);
}

