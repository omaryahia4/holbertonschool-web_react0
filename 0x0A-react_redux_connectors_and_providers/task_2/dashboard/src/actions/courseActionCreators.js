import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "./courseActionTypes";

export const selectCourse = (index) => {
  return {
    type: SELECT_COURSE,
    index,
  };
};

export const boundSelectCourse = (index) => dispatch(selectCourse(index));

export const unSelectCourse = (index) => {
  return {
    type: UNSELECT_COURSE,
    index,
  };
};

export const boundUnSelectCourse = (index) => dispatch(unSelectCourse(index));

export const fetchCourseSuccess =  () => {
  return ({
    type: FETCH_COURSE_SUCCESS,
    data: [
      {
        id: 1,
        name: "ES6",
        credit: 60,
      },
      {
        id: 2,
        name: "Webpack",
        credit: 20,
      },
      {
        id: 3,
        name: "React",
        credit: 40,
      },
    ],
  });
};

export const boundfetchCourseSuccess = () => dispatch(fetchCourseSuccess());