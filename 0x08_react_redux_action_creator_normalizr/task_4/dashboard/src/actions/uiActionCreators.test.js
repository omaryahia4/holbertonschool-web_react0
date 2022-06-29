import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";

import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from "./uiActionCreators";

describe("action creators tests", function () {
  it("returns correct action for login", function () {
    const user = { email: "larry@gmail.com", password: 123456789 };

    const expectedReturn = { type: LOGIN, user };

    const result = login(user.email, user.password);

    expect(result).toEqual(expectedReturn);
  });
  it("returns correct action for logout", function () {
    const expectedReturn = { type: LOGOUT };

    const result = logout();

    expect(result).toEqual(expectedReturn);
  });
  it("returns correct action for displayNotificationDrawer", function () {
    const expectedReturn = { type: DISPLAY_NOTIFICATION_DRAWER };

    const result = displayNotificationDrawer();

    expect(result).toEqual(expectedReturn);
  });
  it("returns correct action for hideNotificationDrawer", function () {
    const expectedReturn = { type: HIDE_NOTIFICATION_DRAWER };

    const result = hideNotificationDrawer();

    expect(result).toEqual(expectedReturn);
  });
});
