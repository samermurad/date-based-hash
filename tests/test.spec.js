const m = require('moment');
const numCipher = require('../src');
describe('Main Test', () => {
  test('Test Cipher && Decipher', () => {
    const [year, month, date] = m().format('YYYY-MM-DD').split('-');
    const chiper = numCipher.cipher(year, month, date);
    const {
      year: dYear,
      month: dMonth,
      date: dDate,
    } = numCipher.decipher(chiper);

    expect(year).toBe(dYear);
    expect(month).toBe(dMonth);
    expect(date).toBe(dDate);
  })
});
