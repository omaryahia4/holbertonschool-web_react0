import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

const courseReducer = (state = [], action) => {
  switch (action.type) {
    // when action type is FETCH_COURSE_SUCCESS the reducer returns action data with isSelected state set to false for every course
    case FETCH_COURSE_SUCCESS:
      return action.data.map((course) => {
        return {
          ...course,
          isSelected: false,
        };
      });

    // when action type is SELECT_COURSE the reducer returns the action data with isSelected state set to true to the course that matches to action index
    case SELECT_COURSE:
      return state.map((course) => {
        const current = {
          ...course,
        };
        if (course.id == action.index) current.isSelected = true;

        return current;
      });

    //  when action type is UNSELECT_COURSE the reducer returns the action data with isSelected state set to false to the course that matches to action index
    case UNSELECT_COURSE:
      return state.map((course) => {
        const current = {
          ...course,
        };
        if (course.id == action.index) current.isSelected = false;

        return current;
      });
      // otherwise it returns the current state
    default:
      return state;
  }
};

export default courseReducer;
