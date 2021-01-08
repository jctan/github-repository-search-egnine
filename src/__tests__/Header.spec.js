import { mount } from "vue-test-utils";
import headerComponent from "../components/Header";

describe("Testing Header Component", () => {
  it("title should be a string", () => {
    const headerTitle = headerComponent.props.title.name;
    expect(headerTitle).toMatch(/String/);
  });

  it("title return value", () => {
    const titleVal = mount(headerComponent, {
      propsData: {
        title: ""
      }
    });
    expect(titleVal.text()).toMatch(/mdi-github/);
  });
});
