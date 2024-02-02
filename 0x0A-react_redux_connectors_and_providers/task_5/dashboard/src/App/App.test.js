import { shallow, mount } from "enzyme";
import React from "react";
import App, { listNotificationsInitialState } from "./App";
import { StyleSheetTestUtils } from "aphrodite";
import AppContext, { user, logOut } from "./AppContext";

describe("<App />", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("App renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("should contain the Notifications component", () => {
    const wrapper = shallow(<App />);
    wrapper.update();
    expect(wrapper.find("Notifications")).toHaveLength(1);
  });
  it("should contain the Header component", () => {
    const wrapper = shallow(<App />);
    wrapper.update();
    expect(wrapper.find("Header")).toHaveLength(1);
  });
  it("should contain the Login component", () => {
    const wrapper = shallow(<App />);
    wrapper.update();
    expect(wrapper.find("Login")).toHaveLength(1);
  });
  it("should contain the Footer component", () => {
    const wrapper = shallow(<App />);
    wrapper.update();
    expect(wrapper.find("Footer")).toHaveLength(1);
  });
  it("CourseList is not displayed with isLoggedIn false by default", () => {
    const wrapper = shallow(<App />);
    wrapper.update();
    expect(wrapper.find("CourseList")).toHaveLength(0);
  });
  it("isLoggedIn is true", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      user: {
        ...user,
        isLoggedIn: true,
      },
    });

    expect(wrapper.find("Login")).toHaveLength(0);
    expect(wrapper.find("CourseList")).toHaveLength(1);
  });

  it("when the keys control and h are pressed the logOut function, passed as a prop, is called and the alert function is called with the string Logging you out", () => {
    const events = {};
    const logOutSpy = jest.fn();

    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb;
    });

    window.alert = jest.fn();

    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );

    wrapper.setState({ logOut: logOutSpy });

    events.keydown({ key: "h", ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith("Logging you out");
    expect(logOutSpy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it("Has default state for displayDrawer false", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);
  });

  it("displayDrawer changes to true when calling handleDisplayDrawer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);

    const instance = wrapper.instance();

    instance.handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toEqual(true);
  });

  it("displayDrawer changes to false when calling handleHideDrawer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);

    const instance = wrapper.instance();

    instance.handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toEqual(true);

    instance.handleHideDrawer();

    expect(wrapper.state().displayDrawer).toEqual(false);
  });

  it("test to verify that the logIn function updates the state correctly", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );

    const loggedUser = {
      email: "Larry@hudson.com",
      password: "123456789",
      isLoggedIn: true,
    };

    const instance = wrapper.instance();

    expect(wrapper.state().user).toEqual(user);

    instance.logIn(loggedUser.email, loggedUser.password);

    expect(wrapper.state().user).toEqual(loggedUser);
  });

  it("test to verify that the logOut function updates the state correctly", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );

    const loggedUser = {
      email: "Larry@hudson.com",
      password: "123456789",
      isLoggedIn: true,
    };

    const instance = wrapper.instance();

    expect(wrapper.state().user).toEqual(user);

    instance.logIn(loggedUser.email, loggedUser.password);

    expect(wrapper.state().user).toEqual(loggedUser);

    instance.logOut();

    expect(wrapper.state().user).toEqual(user);
  });

  it("verify that markNotificationAsRead works as intended", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );

    const instance = wrapper.instance();

    expect(wrapper.state().listNotifications).toEqual(
      listNotificationsInitialState
    );

    instance.markNotificationAsRead(4);

    expect(wrapper.state().listNotifications).toEqual(
      listNotificationsInitialState
    );

    instance.markNotificationAsRead(3);

    expect(wrapper.state().listNotifications).toEqual(
      listNotificationsInitialState.slice(0, 2)
    );

    instance.markNotificationAsRead(1);

    expect(wrapper.state().listNotifications).toEqual(
      listNotificationsInitialState.slice(1, 2)
    );
  });
});
