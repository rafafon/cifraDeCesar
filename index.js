//const FormData = require('form-data'); - usei em uma das tentativas, se nao me engano ta ai embaixo comentada tb
//const request = require("request")
const axios = require('axios')



const fs = require('fs');

const answer = require("./answer.json");

const sha1 = require("sha1");

function charCodeToChar(letter) {
    const charCode = letter.charCodeAt(letter) - answer.numero_casas

    if (charCode >= 97) {
        return String.fromCharCode(charCode);
    }

    else {
        return String.fromCharCode(charCode+26);
    }
    

}

function decifrar(str) {
    return str.toLowerCase().replace(/[a-z]/g, charCodeToChar);
       
}



const resumo_criptografico = sha1(answer.cifrado);

const decifrado = decifrar(answer.cifrado);

const output = {...answer, resumo_criptografico, decifrado};


console.log(output);

try {
    fs.writeFileSync('src/answer.json',
    JSON.stringify(output))
} catch (err) {
    console.error(err)
}

//enviando resposta para a URL
/*

const formData = new FormData();
formData.append('answer', JSON.stringify(output));

formData.submit('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=a924f2cc1108aafaa4acf1d67b40dda1dffc65bf', function(err, res) {
    console.log(res.statusCode);
  });

*/

/*
url = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=a924f2cc1108aafaa4acf1d67b40dda1dffc65bf';

request ({
    url: url,
    json: true,
    multipart: {
        chunked: false,
        data: [
            {
                'content-type': 'application/json',
                body: answer
            }
        ]
    }
}, function (error, response, body){
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
    else {
        console.log("error: " + error); 
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusText)
    }
})
*/

axios
  .post('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=a924f2cc1108aafaa4acf1d67b40dda1dffc65bf', {
    todo: 'answer'},{
    'Content-Type': 'application/json'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })
