(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./src/views/sys/log/option.js":
/*!*************************************!*\
  !*** ./src/views/sys/log/option.js ***!
  \*************************************/
/*! exports provided: tableOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableOption\", function() { return tableOption; });\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _github_workspace_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n\n\nvar tableOption = {\n  rowKey: \"_id\",\n  align: \"center\",\n  index: true,\n  addBtn: false,\n  menu: false,\n  searchMenuSpan: 6,\n  column: [{\n    label: \"请求方式\",\n    prop: \"method\",\n    search: true,\n    type: \"select\",\n    dicUrl: \"/dict/type/request_method\"\n  }, {\n    label: \"请求地址\",\n    prop: \"url\",\n    search: true\n  }, {\n    label: \"操作名称\",\n    prop: \"summary\"\n  }, {\n    label: \"ip地址\",\n    prop: \"ip\",\n    search: true\n  }, {\n    label: \"请求耗时\",\n    prop: \"time\"\n  }, {\n    label: \"请求参数\",\n    prop: \"params\"\n  }, {\n    label: \"操作用户\",\n    prop: \"username\",\n    search: true\n  }, {\n    label: \"用户标识\",\n    prop: \"userAgent\"\n  }, {\n    label: \"状态\",\n    prop: \"status\",\n    type: \"select\",\n    dicData: [{\n      label: \"正常\",\n      value: 1\n    }, {\n      label: \"异常\",\n      value: 0\n    }]\n  }, // {\n  //   label: \"类型\",\n  //   prop: \"type\",\n  // },\n  {\n    label: \"错误信息\",\n    prop: \"error\"\n  }, {\n    label: \"日志时间\",\n    prop: \"createTime\",\n    type: \"date\",\n    search: true,\n    searchRange: true\n  }].map(function (item) {\n    return Object(_github_workspace_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_github_workspace_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({}, item), {}, {\n      overHidden: true\n    });\n  })\n};\n\n//# sourceURL=webpack:///./src/views/sys/log/option.js?");

/***/ })

}]);