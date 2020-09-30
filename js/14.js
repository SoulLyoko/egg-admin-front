(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./src/views/sys/menu/option.js":
/*!**************************************!*\
  !*** ./src/views/sys/menu/option.js ***!
  \**************************************/
/*! exports provided: tableOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableOption\", function() { return tableOption; });\nvar tableOption = {\n  rowKey: \"_id\",\n  align: \"center\",\n  index: true,\n  menuWidth: 300,\n  column: [{\n    label: \"上级菜单\",\n    prop: \"parentId\",\n    value: \"0\",\n    hide: true,\n    formslot: true,\n    span: 24,\n    rules: [{\n      required: true,\n      message: \"请选择上级菜单\"\n    }]\n  }, {\n    label: \"菜单名称\",\n    prop: \"title\",\n    span: 24,\n    rules: [{\n      required: true,\n      message: \"请输入菜单名称\"\n    }]\n  }, {\n    label: \"类型\",\n    prop: \"type\",\n    type: \"select\",\n    dicData: [{\n      label: \"菜单\",\n      value: \"0\"\n    }, {\n      label: \"按钮\",\n      value: \"1\"\n    }],\n    span: 24,\n    value: \"0\",\n    rules: [{\n      required: true,\n      message: \"请选择类型\"\n    }]\n  }, {\n    label: \"图标\",\n    prop: \"icon\",\n    slot: true,\n    formslot: true,\n    display: true,\n    span: 24\n  }, {\n    label: \"路由路径\",\n    prop: \"path\",\n    span: 24\n  }, {\n    label: \"路由名称\",\n    prop: \"name\",\n    span: 24\n  }, {\n    label: \"前端组件\",\n    prop: \"component\",\n    formslot: true,\n    span: 24\n  }, {\n    label: \"携带参数\",\n    prop: \"query\",\n    display: false,\n    hide: true,\n    span: 24\n  }, {\n    label: \"Iframe地址\",\n    prop: \"url\",\n    display: false,\n    hide: true,\n    span: 18\n  }, {\n    label: \"新窗口打开\",\n    prop: \"blank\",\n    type: \"switch\",\n    value: false,\n    display: false,\n    hide: true,\n    span: 6\n  }, {\n    label: \"排序\",\n    prop: \"sort\",\n    type: \"number\",\n    span: 24,\n    value: 0\n  }, {\n    label: \"权限\",\n    prop: \"permissions\",\n    span: 24\n  }, {\n    label: \"路由缓存\",\n    prop: \"cache\",\n    type: \"switch\",\n    span: 24,\n    value: true\n  }]\n};\n\n//# sourceURL=webpack:///./src/views/sys/menu/option.js?");

/***/ })

}]);