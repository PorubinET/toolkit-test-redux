"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDate = exports.deleteAll = exports.completedAll = exports.updateChecker = exports.updateDesc = exports.updateText = exports.createTask = exports.inputDelete = exports.taskLoad = exports["default"] = exports.decrement = exports.increment = exports.updateFilter = exports.todoSlice = exports.initialState = void 0;

var _taskServices = require("../../src/services/taskServices");

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  todos: [],
  filter: 'all',
  value: 0
};

exports.initialState = initialState;
var todoSlice = (0, _toolkit.createSlice)({
  name: 'todos',
  initialState: initialState,
  reducers: {
    updateFilter: function updateFilter(state, action) {
      state.filter = action.payload;
    },
    increment: function increment(state, action) {
      state.value = state.value + 1;
    },
    decrement: function decrement(state, action) {
      state.value = state.value - 1;
    } // createTask: (state, action) => {
    //     state.todos = state.todos.concat(action.payload);
    // }

  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(taskLoad.fulfilled, function (state, action) {
      state.todos = action.payload;
    }).addCase(createTask.fulfilled, function (state, action) {
      state.todos = state.todos.concat(action.payload);
    }).addCase(inputDelete.fulfilled, function (state, action) {
      state.todos = state.todos.filter(function (todo) {
        return todo._id !== action.payload;
      });
    }).addCase(updateText.fulfilled, function (state, action) {
      state.todos = state.todos.map(function (todo) {
        return _objectSpread({}, todo, {
          text: todo._id === action.payload._id ? action.payload.input : todo.text
        });
      });
    }).addCase(updateChecker.fulfilled, function (state, action) {
      state.todos = state.todos.map(function (todo) {
        return _objectSpread({}, todo, {
          done: todo._id !== action.payload._id ? todo.done : !todo.done
        });
      });
    }).addCase(completedAll.fulfilled, function (state, action) {
      state.todos.every(function (todo) {
        return todo.done;
      }) ? state.todos.map(function (todo) {
        return todo.done = !todo.done;
      }) : state.todos.map(function (todo) {
        return todo.done = true;
      });
    }).addCase(deleteAll.fulfilled, function (state, action) {
      state.todos = state.todos.filter(function (todo) {
        return !todo.done;
      });
    });
  }
});
exports.todoSlice = todoSlice;
var _todoSlice$actions = todoSlice.actions,
    updateFilter = _todoSlice$actions.updateFilter,
    increment = _todoSlice$actions.increment,
    decrement = _todoSlice$actions.decrement;
exports.decrement = decrement;
exports.increment = increment;
exports.updateFilter = updateFilter;
var _default = todoSlice.reducer;
exports["default"] = _default;
var taskLoad = (0, _toolkit.createAsyncThunk)('todos/load', function _callee() {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _taskServices.getTasks)());

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.data);

        case 6:
          data = _context.sent;
          console.log(data);
          return _context.abrupt("return", data);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
exports.taskLoad = taskLoad;
var inputDelete = (0, _toolkit.createAsyncThunk)('users/inputDelete', function _callee2(_id) {
  var res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _taskServices.deleteTask)(_id));

        case 3:
          res = _context2.sent;

          if (!(res.status === 200)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", _id);

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
exports.inputDelete = inputDelete;
var createTask = (0, _toolkit.createAsyncThunk)('users/createTask', function _callee3(payload) {
  var res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _taskServices.addTask)({
            text: payload.trim()
          }));

        case 3:
          res = _context3.sent;
          console.log(payload);

          if (!(res.status === 200)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.data);

        case 7:
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.createTask = createTask;
var updateText = (0, _toolkit.createAsyncThunk)('users/updateText', function _callee4(payload) {
  var res;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap((0, _taskServices.updateTask)(payload._id, {
            text: payload.input
          }));

        case 3:
          res = _context4.sent;

          if (!(res.status === 200)) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", {
            _id: payload._id,
            input: payload.input
          });

        case 6:
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
exports.updateText = updateText;
var updateDesc = (0, _toolkit.createAsyncThunk)('users/updateDesc', function _callee5(payload) {
  var res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log(payload, 'users/updateDesc');
          _context5.next = 4;
          return regeneratorRuntime.awrap((0, _taskServices.updateTask)(payload._id, {
            desc: payload.input
          }));

        case 4:
          res = _context5.sent;

          if (!(res.status === 200)) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", {
            payload: payload
          });

        case 7:
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.updateDesc = updateDesc;
var updateChecker = (0, _toolkit.createAsyncThunk)('users/updateChecker', function _callee6(payload) {
  var res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap((0, _taskServices.updateCheck)(payload._id, {
            done: !payload.done
          }));

        case 3:
          res = _context6.sent;

          if (!(res.status === 200)) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", {
            _id: payload._id,
            done: payload.done
          });

        case 6:
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
exports.updateChecker = updateChecker;
var completedAll = (0, _toolkit.createAsyncThunk)('users/completedAll', function _callee7(payload) {
  var res, _res;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;

          if (!payload) {
            _context7.next = 10;
            break;
          }

          console.log(payload, "true");
          _context7.next = 5;
          return regeneratorRuntime.awrap((0, _taskServices.updateTasks)({
            done: false
          }));

        case 5:
          res = _context7.sent;

          if (!(res.status === 200)) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", {
            done: payload
          });

        case 8:
          _context7.next = 15;
          break;

        case 10:
          _context7.next = 12;
          return regeneratorRuntime.awrap((0, _taskServices.updateTasks)({
            done: true
          }));

        case 12:
          _res = _context7.sent;

          if (!(_res.status === 200)) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", {
            done: payload
          });

        case 15:
          _context7.next = 20;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 20:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 17]]);
});
exports.completedAll = completedAll;
var deleteAll = (0, _toolkit.createAsyncThunk)('users/deleteAll', function _callee8(payload) {
  var res;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap((0, _taskServices.deleteTaskAll)(payload));

        case 3:
          res = _context8.sent;

          if (!(res.status === 200)) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", {
            payload: payload
          });

        case 6:
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
exports.deleteAll = deleteAll;
var updateDate = (0, _toolkit.createAsyncThunk)('users/updateDate', function _callee9(payload) {
  var res;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          console.log(payload, 'users/updateDate');
          _context9.next = 4;
          return regeneratorRuntime.awrap((0, _taskServices.updateTask)(payload._id, {
            date: payload.time
          }));

        case 4:
          res = _context9.sent;

          if (!(res.status === 200)) {
            _context9.next = 7;
            break;
          }

          return _context9.abrupt("return", {
            payload: payload
          });

        case 7:
          _context9.next = 12;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.updateDate = updateDate;