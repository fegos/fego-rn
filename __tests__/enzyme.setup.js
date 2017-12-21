// enzyme 3.x
// https://github.com/airbnb/enzyme#upgrading-from-enzyme-2x-or-react--16
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
