import { mount } from "vue-test-utils";
import repoComp from "../components/Repositories";

let wrapper;

beforeEach(() => {
  wrapper = mount(repoComp, {
    propsData: {
      repoItems: Array
    },
    methods: {
      tagFilter: jest.fn()
    }
  });
  const spy = jest.fn();
});

afterEach(() => {
  wrapper.destroy();
});

describe("Testing Repositories Component", () => {
  it("should trigger tag-filter-x event when user filter by language", () => {
    const spy = jest.fn();
    wrapper.vm.$emit("tag-filter-x", spy);
    let button = wrapper.findAll(".ui.tag.label");
    button.trigger("click");

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
