import { normalize, schema } from "normalizr";

// let's define a schema entity for courses
const courses = new schema.Entity("courses");

// Create a function coursesNormalizer that would take data as argument and normalize the data with the schema we just created.
const coursesNormalizer = (data) => {
  const normalizedData = normalize(data, [courses]);

  return normalizedData.entities.courses;
};

const data = [
  {
    id: 1,
    type: "default",
    value: "New course available"
  },
  {
    id: 2,
    type: "urgent",
    value: "New resume available"
  },
  {
    id: 3,
    type: "urgent",
    value: "New data available"
  }
]
const norm = coursesNormalizer(data)
console.log(Object.keys(norm).map((key) => {
return norm[key];
}))
// console.log(norm)

export default coursesNormalizer;
