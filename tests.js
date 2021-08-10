let tests = 0;
const test = (subject, name, result, expected) => {
    tests++;
    console.debug(`${subject}: ${name}`);
    if (result !== expected) {
        console.error(
            `Invalid result for test ${tests} in ${subject}.\nGot:\n${result}\n`,
            `When expected:\n${expected}`
            )
        process.exit(1);
    } else console.debug(`Test ${tests} passed successfully.`)
}

function testOn(s, a) {
    test(s, `Normal addition`, a('125 + 125'), '250');
    test(s, `Normal subtraction`, a('125 - 25'), '100');
    test(s, `Normal multiplication`, a('125 * 5'), '625');
    test(s, `Normal division`, a('200 / 2'), '100');
    test(s, `Normal brackets`, a('(100 + 10) / 2'), '55');
    test(s, `Normal indices`, a('10 ^ 2'), '100');
    
    test(s, `Long number`, a(`${Number.MAX_SAFE_INTEGER} ^ 2`), '8.1129638414606663681390495662081e+31');
    test(s, `Long number (using alternate syntax)`, a(`${Number.MAX_SAFE_INTEGER} ** 2`), '8.1129638414606663681390495662081e+31');
    test(s, `All operations`, a(`5+6-7*8/9^10`), '10.99999998393935685159'); // should be 10.999999983939356851562328645395 but some precision is lost & max D.P.
    
    test(s, `Negative numbers`, a('-12 * 2'), '-24');
    test(s, `Negative addition`, a('5+-2'), '3');
    test(s, `Negative addition 2`, a('-5+2'), '-3');
    test(s, `Negative subtraction`, a('5--2'), '7');
    test(s, `Negative subtraction 2`, a('-5-2'), '-7');
    test(s, `Negative multiplication`, a('5*-2'), '-10');
    test(s, `Negative multiplication 2`, a('-5*2'), '-10');
    test(s, `Negative division`, a('5/-2'), '-2.5');
    test(s, `Negative division 2`, a('-5/2'), '-2.5');
    test(s, `Negative brackets`, a('-(5)'), '-5');
    test(s, `Negative indices`, a('2^-4'), '0.0625');
    test(s, `Negative indices 2`, a('-2^4'), '-16');
}

testOn('Source', require('./index'));
eval(require('fs').readFileSync('./index.min.js', { encoding: 'utf8' }));
testOn('Build', calculateString);

console.debug('All tests passed successfully.');
process.exit(0)