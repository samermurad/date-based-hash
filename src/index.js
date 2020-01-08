function reverseString(str) {
    const splitString = str.split("");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("");
    return joinArray;
}
const obscureStr = str => {
	const news = reverseString(str)
	.replace(/e/g,"3")
	.replace(/E/g,"€")
	.replace(/A/g,"4")
	.replace(/s/ig,"$")
	.replace(/i/ig,"!o")
	.replace(/B/ug, "&ß")
	.replace(/o/ig, "-0")
	.replace(/W/ig, "w")
	.replace(/w/g, "mM")
	.replace(/C/ig, "+zz^")
	.replace(/\s/ig, "");
	return news
};
const numbersToHash = {
	0: obscureStr('Ochoseon Kingdom'),
	1: obscureStr('Craloryn Destulux'),
	2: obscureStr('Iwromeanyth Dynasty'),
	3: obscureStr('Ograenugalla Empire'),
	4: obscureStr('Destulux Phubougalla'),
	5: obscureStr('Phubougalla Kingdom'),
	6: obscureStr('Khuqavalon Yixuiborg'),
	7: obscureStr('Grosrutopia Rirrupan'),
	8: obscureStr('Eslimeontis Awroyadian'),
	9: obscureStr('Rirrupan Wripia'),
};

const COMB_ID = '@:::@';
const HASH_COMB_ID = '@;;;@';


function rot13Fast(str) {
  return str.split('').map(x => rot13Fast.lookup[x] || x).join('')
}
rot13Fast.input  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
rot13Fast.output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'.split('');
rot13Fast.lookup = rot13Fast.input.reduce((m,k,i) => Object.assign(m, {[k]: rot13Fast.output[i]}), {});

const hashNumber = (num) => {
  let str = '';
  const numArr = `${num}`.split('');
  numArr.forEach((_num, index) => {
    str += `${index > 0 ? HASH_COMB_ID : ''}${numbersToHash[_num]}`
  });
  return str
};

const numberifyHash = (hash) => {
  let numStr = '';
  const values = Object.values(numbersToHash);
  const numArr = hash.split(HASH_COMB_ID);
  numArr.forEach((_num) => {
    const index = values.indexOf(_num);
    if (index !== -1 && numbersToHash[index] === _num) {
      numStr += index
    }
  });
  return numStr;
};

exports.cipher = (year, month, date) => {
  const _0 = hashNumber(year);
  const _1 = hashNumber(month);
  const _2 = hashNumber(date);

  return rot13Fast(_0 + COMB_ID + _1 + COMB_ID + _2);
};
exports.decipher = (hash) => {
    const comp = rot13Fast(hash).split(COMB_ID);
    let year = numberifyHash(comp[0]);
    let month = numberifyHash(comp[1]);
    let date = numberifyHash(comp[2]);
    return {
      date,
      month,
      year,
    }

};
