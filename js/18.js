(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./src/views/sys/user/option.js":
/*!**************************************!*\
  !*** ./src/views/sys/user/option.js ***!
  \**************************************/
/*! exports provided: tableOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableOption\", function() { return tableOption; });\nvar tableOption = {\n  rowKey: \"_id\",\n  align: \"center\",\n  index: true,\n  searchMenuSpan: 6,\n  column: [{\n    label: \"用户名\",\n    prop: \"username\",\n    search: true,\n    rules: [{\n      required: true,\n      message: \"请输入用户名\",\n      trigger: \"change\"\n    }]\n  }, {\n    label: \"密码\",\n    prop: \"password\",\n    type: \"password\",\n    hide: true,\n    editDisplay: false,\n    rules: [{\n      required: true,\n      message: \"请输入密码\",\n      trigger: \"change\"\n    }]\n  }, {\n    label: \"部门\",\n    prop: \"deptId\",\n    slot: true,\n    formslot: true,\n    search: true,\n    searchslot: true\n  }, {\n    label: \"角色\",\n    prop: \"roleIds\",\n    slot: true,\n    formslot: true\n  }, {\n    label: \"真实姓名\",\n    prop: \"realName\"\n  }, {\n    label: \"性别\",\n    prop: \"gender\",\n    type: \"select\",\n    dicUrl: \"/dict/type/gender\"\n  }, {\n    label: \"邮箱\",\n    prop: \"email\"\n  }, {\n    label: \"手机号\",\n    prop: \"mobile\"\n  }, {\n    label: \"状态\",\n    prop: \"status\",\n    type: \"switch\",\n    value: \"1\",\n    dicUrl: \"/dict/type/status\"\n  }]\n};\n\n//# sourceURL=webpack:///./src/views/sys/user/option.js?");

/***/ })

}]);