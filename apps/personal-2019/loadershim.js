// The setupFiles array lets you list files that will be included before all tests are run, so it’s perfect for this.
global.___loader = {
  enqueue: jest.fn(),
};
