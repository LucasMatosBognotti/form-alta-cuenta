const matchUsers = [
  {
    "awsService": "SNS",
    "furyService": "BIGQ",
    "question": "Why don't use BIGQ insted of SNS?",
    "reason": "Porque nao"
  },
  {
    "awsService": "SQS",
    "furyService": "STREAMS",
    "question": "Why don't use STREAMS insted of SQS?",
    "reason": "Porque si"
  },
]

const services = ["SQS", "SNS", "EC2"]

const result1 = matchUsers
  .concat(services
    .map(service => {
      return {
        awsService: service,
        furyService: null,
        question: null,
        reason: null,
      }
    })
  )
  .filter((value, index, self) => index === self.findIndex((service) => (service.awsService === value.awsService)))
  .map((service) => { return { name: service.awsService, reason: service.reason } })

console.log(result1)

const resources = [
  {"name":"SQS", "reason":"Porque si", "service":"STREAMS"}
]

// 1 - COMPRAR IMOVEL
// 2 - RECONSTROI
// 3 - ALUGA
// 4 - REFINANCIAMENTO
// 5 - REPETE

const array = []

array.push({place:"here",name:"stuff"});
array.push({place:"here",name:"stuff"});

array.push({place:"there",name:"morestuff"});
array.push({place:"there",name:"morestuff"});
array.push({place:"there",name:"morestuff"});


const result2 = array.filter((value, index, self) => index === self.findIndex((t) => (t.place === value.place && t.name === value.name)))
console.log(result2)
