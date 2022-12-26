const parser = new DOMParser();

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
    </student>
  </list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");

/*получаем количество студентов*/
const quantityOfStudents = xmlDOM.documentElement.childElementCount;
/*получаем количество студентов*/

/*создаем объект для вывода в консоль*/
let result = new Object;
/*создаем объект для вывода в консоль*/

/*в цикле дописываем в result результат чтения xml-объекта student*/
for (let i = 0; i < quantityOfStudents; i++) {

  let studentNode = listNode.getElementsByTagName("student")[i];
  let nameNode = studentNode.querySelector("name");
  let firstNode = nameNode.querySelector("first");
  let secondNode = nameNode.querySelector("second");
  let ageNode = studentNode.querySelector("age");
  let profNode = studentNode.querySelector("prof");
  let nameAttr = nameNode.getAttribute('lang');

  Object.assign(result, { [i]: { name: firstNode.textContent + " " + secondNode.textContent, age: ageNode.textContent, prof: profNode.textContent, lang: nameAttr} });

}
/*в цикле дописываем в result результат чтения xml-объекта student*/

console.log('result', result);