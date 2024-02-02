import { Map, fromJS } from "immutable";

import notificationReducer, {
  initialNotificationState,
} from "./notificationReducer";

import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "../actions/notificationActionTypes";

import notificationsNormalizer from "../schema/notifications";

describe("courseReducer tests", function () {
  it("Tests that the default state returns an initial state", function () {
    const state = notificationReducer(undefined, {});

    expect(state).toEqual(Map(initialNotificationState));
  });

  it("Tests that FETCH_NOTIFICATIONS_SUCCESS returns the data passed", function () {
    // create action 
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        {
          id: 1,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    // let's normalize our state data
    const data = [
      {
        id: 1,
        type: "default",
        value: "New course available",
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available",
      },
      {
        id: 3,
        type: "urgent",
        value: "New data available",
      },
    ];
    // use  notificationsNormalizer function to normalize data
    const normalizedData = notificationsNormalizer(data);

    const expectedData = {
      filter: "DEFAULT",
      ...normalizedData,
    };
    // set the isRead property to false for all notifications
    expectedData.notifications[1].isRead = false;
    expectedData.notifications[2].isRead = false;
    expectedData.notifications[3].isRead = false;

    // let's get our state
    const state = notificationReducer(undefined, action);

    // 
    expect(state.toJS()).toEqual(expectedData);
  });

  it("Tests that MARK_AS_READ returns the data with the right item updated", function () {


    const initialState = {
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };

    // normalize our initialstate notifications
    initialState.notifications = notificationsNormalizer(initialState.notifications).notifications;

    const action = {
      type: MARK_AS_READ,
      index: 2,
    };

    const data = [
      {
        id: 1,
        type: "default",
        value: "New course available",
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available",
      },
      {
        id: 3,
        type: "urgent",
        value: "New data available",
      },
    ];

    const normalizedData = notificationsNormalizer(data);

    const expectedData = {
      filter: "DEFAULT",
      ...normalizedData,
    };
    expectedData.notifications[1].isRead = false;
    expectedData.notifications[2].isRead = true;
    expectedData.notifications[3].isRead = false;

    const state = notificationReducer(fromJS(initialState), action);

    expect(state.toJS()).toEqual(expectedData);
  });
  
  it("Tests that SET_TYPE_FILTER returns the data with the right item updated", function () {
    const initialState = {
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };

    initialState.notifications = notificationsNormalizer(
      initialState.notifications
    ).notifications;

    const action = {
      type: SET_TYPE_FILTER,
      filter: "URGENT",
    };

    const data = [
      {
        id: 1,
        isRead: false,
        type: "default",
        value: "New course available",
      },
      {
        id: 2,
        type: "urgent",
        isRead: false,
        value: "New resume available",
      },
      {
        id: 3,
        type: "urgent",
        isRead: false,
        value: "New data available",
      },
    ];

    const normalizedData = notificationsNormalizer(data);

    const expectedData = {
      filter: "URGENT",
      ...normalizedData,
    };

    const state = notificationReducer(fromJS(initialState), action);

    expect(state.toJS()).toEqual(expectedData);
  });
});
