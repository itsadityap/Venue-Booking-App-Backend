exports.generateRandomId = () => {

    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
        "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    const randomNo = Math.floor(Math.random()*100000);

    const randomStrNo1 = Math.floor(Math.random()*26);

    const randomStr1 = alphabet[randomStrNo1];

    const randomStrNo2 = Math.floor(Math.random()*26);

    const randomStr2 = alphabet[randomStrNo2];

    const randomStrNo3 = Math.floor(Math.random()*26);

    const randomStr3 = alphabet[randomStrNo3];

    return randomStr1 + randomNo + randomStr2 + randomStr3;
}