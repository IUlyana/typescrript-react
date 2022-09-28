const productVer = "7";
const productID_max_win = "MAXA0777-mA7A-a257-x53A-m2678A19185x";

export function generateSerial(id1:string, id2:string) {
    const product:string = productVer + '-' + productID_max_win;
    const idParam1:string = id1;
    const idParam2:string = id2;
    let param1:number = 100;
    let param2:number = 1;
    const appSerialLen:number = 29
    let appSerial:string = '';
    
    for (let i = 0; i < idParam1.length; i++){
        let codeNum:number = idParam1[i].charCodeAt(0);
        param1 += codeNum;
    }
    for (let i = 0; i < idParam2.length; i++){
        let codeNum:number = idParam2[i].charCodeAt(0);
        param2 += codeNum;
    }

    const k1:number = (Math.abs(param1 * param2) + 1);
    const k2:number = (Math.abs(param1 + param2) + 2);
    const k3:number = (Math.abs(k1 * k2) + 3);
    const k4:number = +(Math.abs((k3 * 4) / (param2 + 4)) + 4).toFixed(0);
    const k5:number = (Math.abs((k3 - k4) % (k1 * k2)) + 5);
    const k6:number = (Math.abs(k4 + k5) + 6);
    const k7:number = (Math.abs((k6 * ((k4 - k3) * (k1 + k2)) / param2) + 7));
    const k8:number = k1 + k2 + k3 + k4 + k5 + 8;
    
    const device:string = k8.toString(16) + k7.toString(16) + k6.toString(16) + k5.toString(16) + k4.toString(16) + k3.toString(16) + k2.toString(16) + k1.toString(16);

    if(device.length !== 0 || device !== null) {
        let sm:number = 1;

        for (let i = 0; i < product.length; i++){
            let codeNum:number = product[i].charCodeAt(0);
            sm += codeNum;
        }
        
        let p:number = 0;
        const productSymbol:number = product[0].charCodeAt(0);
        const v:number = Math.abs((sm - (((productSymbol + (productSymbol % product.length)) - productSymbol) * productSymbol)) * 3 / 2);
        const resProduct:string = product.replace(/[-]/g,"")
        let c5:string = '';
        for(let i = 0; i < resProduct.length - 1; i++) {

            const c1:number = product[i].charCodeAt(0);
            const c2:number = device[i].charCodeAt(0);

            const i1:number = Math.abs(c1 + 1 -v);
            const i2:number = Math.abs(c2 + 2 + v);
            const i3:number = ((i1 + i2) * Math.abs(i2 - i1));
            const i4:number = (i3 / i1) + (i3 % i2);
            const i5:number = i4 + (i + 1) * 2;
            
            const s5:string = i5.toString(16) + i4.toString(16);
                if(i % 2 === 0) {
                    c5 = c5 + s5[0]
                } else if(i % 2 !== 0) {
                    c5 = c5 + s5[1]
                }
        }
        const arrC5:string[] = c5.split('');
        for(let j = 1; j <= appSerialLen; j++) {
            if(j % 6 === 0 && j !== 0) {
                arrC5[j-1] = '-';  
            }

        }
        arrC5.length = appSerialLen
        appSerial = arrC5.join('').toUpperCase();
    }

    return appSerial
}