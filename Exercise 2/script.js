const elemJson = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }
  `;
  
  const data = JSON.parse(elemJson);
  const person = data.list;
  
  person.forEach((e) => {
    const resultA = {
      name: e.name,
      age: e.age,
      prof: e.prof,
    };
    console.log(resultA);
  });