import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "./config/setupTest";

Enzyme.configure({ adapter: new Adapter() });
