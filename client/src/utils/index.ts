// let firstName: string = "John";
// let age: number = 22;

// type ConsFuncParamType = string | number;

// const consFunc = (param: ConsFuncParamType) => {
//   console.log(param);
// };

// interface ObjectType {
//   id: number;
//   title: string;
//   category: string;
//   price: number;
// }

// const obj = {
//   id: 1,
//   title: "Perfume",
//   category: "Beauty",
//   price: 9.99,
// };

// const consFunc2 = (obj: ObjectType) => {
//   console.log(obj.id);
//   console.log(obj.title);
//   console.log(obj.category);
//   console.log(obj.price);
// };

type ConsFuncProductType = {
  id: number;
  title: string;
  category: string;
  price?: number;
};

const consFunc = (param1: ConsFuncProductType[]): void => {
  console.log();
};

const array = [
  {
    id: 1,
    title: "Perfume",
    category: "Beauty",
    price: 9.99,
  },
  {
    id: 2,
    title: "Perfum2",
    category: "Beauty2",
  },
];

consFunc(array);
