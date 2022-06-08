import App from "./App";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Home from "./Home";
import Data from "./Data";
import News from "./News";
import GetInvolved from "./GetInvolved";
import { shallow } from "enzyme";
import "./setupTests.js";

//https://www.npmjs.com/package/enzyme

describe("renders app", () => {
  it("renders with footer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).toBeTruthy();
  });
  it("renders with nav bar", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavBar)).toBeTruthy();
  });
  it("renders with all pages", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Home)).toBeTruthy();
    expect(wrapper.find(Data)).toBeTruthy();
    expect(wrapper.find(GetInvolved)).toBeTruthy();
    expect(wrapper.find(News)).toBeTruthy();
  });
});
