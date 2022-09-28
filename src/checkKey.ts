const productVer = "7";
const productID_max_win = "MAXA0777-mA7A-a257-x53A-m2678A19185x";

export function addKey(lisence:string) {
    const product:string = productVer + '-' + productID_max_win;
    const appSerial:string = lisence
    let appKey:string = '';
    let smk:number = 1;
    const appKeyLen:number = 41;
    let sk5:string = '';
    let ck5:string[] = [];
    ck5.length = appKeyLen;

    for (let i = 0; i < product.length; i++){
        let codeNum:number = product[i].charCodeAt(0);
        smk = smk + codeNum + i;
    }
    let arrSerial:string[] = appSerial.split('');
    for(let k = appSerial.length - 1; k >= 0; k--){
        if(arrSerial[k] !== '-') {
            const codeSerial:number = arrSerial[k].charCodeAt(0);
            const vk:number = Math.abs((smk - (((codeSerial + (codeSerial % appSerial.length)) - codeSerial) * codeSerial)) * 3 / 2);

            const ck1:number = product[k].charCodeAt(0);
            const ck2:number = codeSerial;

            const ik1:number = Math.abs(ck1 + 1 + k + vk);
            const ik2:number = Math.abs(ck2 + 2 - k - vk);
            const ik3:number = (((ik1 * ik2 / 2) * Math.abs(ik1 - ik2)) % (ik1)) + 3;
            const ik4:number = (((ik1 + ik3) / ik1) + (ik2 % ik1) + (ik3 % ik1)) + 4;
            const ik5:number = ((ik3 * (k + 1)) / ik2) + ((ik3 + ik2) / ik4) * (k + 1) + ((ik3 + ik1) % ik4) + (ik4 / (k + ik3));

            sk5 = ik5.toString(16) + ik4.toString(16);

            if(k % 2 === 0) {
                ck5.push(sk5[1])
            } else if(k % 2 !== 0) {
                ck5.push(sk5[0]);
            }
        }
    }
    const regExp = /([0-9a-zA-Z]{5})([\.\-\s]*)([0-9a-zA-Z]{5})([\.\-\s]*)([0-9a-zA-Z]{5})([\.\-\s]*)([0-9a-zA-Z]{5})([\.\-\s]*)([0-9a-zA-Z]{5})/gi
    appKey = ck5.join('').replace(regExp, '$1-$3-$5-$7-$9').toUpperCase();
    return appKey



}