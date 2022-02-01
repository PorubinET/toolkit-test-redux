"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _expect = _interopRequireDefault(require("expect"));

var _react = require("@testing-library/react");

var _taskServices = require("../../src/services/taskServices");

var _todoSlice = _interopRequireWildcard(require("../store/todoSlice"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import createMockStore from '../../test-utils';
// import fakeFetch from './fakeFetch';
describe('extraReducers', function () {
  it('returns initial state', function () {
    var nextState = (0, _todoSlice["default"])(undefined, {});
    (0, _expect["default"])(nextState).toBe(_todoSlice.initialState);
  });
  it('filter', function () {
    var nextState = (0, _todoSlice["default"])(_todoSlice.initialState, (0, _todoSlice.updateFilter)('compleated'));
    (0, _expect["default"])(nextState.filter).toBe('compleated');
  }); // it('createTask', () => {
  //     console.log(createTask.payload)
  //     const nextState = todoReducer(initialState, createTask({_id: '86dasaiud8732ngf78t', done: false, text: 'bla-bla'}));
  //     expect(nextState.todos).toStrictEqual([{_id: '86dasaiud8732ngf78t', done: false, text: 'bla-bla'}]);
  // });

  test('getTasks', function _callee() {
    var res, data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap((0, _taskServices.getTasks)());

          case 2:
            res = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(res.data);

          case 5:
            data = _context.sent;
            (0, _expect["default"])(true).toEqual(data.length > 0);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test('deleteTask', function _callee2() {
    var _id, res;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = "61f6ab244ad6820d94474232";
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _taskServices.deleteTask)(_id));

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap((0, _taskServices.getTasks)());

          case 5:
            res = _context2.sent;
            _context2.t0 = _expect["default"];
            _context2.next = 9;
            return regeneratorRuntime.awrap(res.data.filter(function (todo) {
              return todo._id === _id;
            }));

          case 9:
            _context2.t1 = _context2.sent;
            _context2.t2 = [];
            (0, _context2.t0)(_context2.t1).toEqual(_context2.t2);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});