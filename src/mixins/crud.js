export default {
  data() {
    return {
      // 设置属性
      crudOption: {
        rowKey: "_id", // 删除使用的key(id/_id/uuid/...)
        created: true, // 此页面是否在激活（进入）时，查询数据列表?
        getList: null, // 获取数据列表方法
        create: null, // 添加数据方法
        update: null, // 编辑数据方法
        remove: null // 删除单条数据方法
      },
      // 默认属性
      pageDefault: {
        total: 0, // 总条数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      page: null,
      sortDefault: { order: "descending", prop: "createTime" }, // 排序
      sort: null,
      searchForm: {}, // 查询条件
      tableData: [], // 数据列表
      formData: {},
      tableLoading: false, // 数据列表，loading状态
      dataSelections: [] // 数据列表，多选项
    };
  },
  created() {
    if (this.crudOption.created) {
      this.getDataList();
    }
  },
  methods: {
    /**
     * @description 获取数据列表
     */
    async getDataList() {
      this.beforeGetList && (await this.beforeGetList());
      this.tableLoading = true;
      if (!this.page) {
        this.page = this.pageDefault || {};
      }
      if (!this.sort) {
        this.sort = this.sortDefault || {};
      }
      return this.crudOption
        .getList({
          ...this.page,
          ...this.sort,
          ...this.searchForm
        })
        .then(res => {
          console.log("getDataList -> res", res);
          this.tableData = res.data || [];
          this.page.total = res.total || 0;
        })
        .catch(e => {
          this.tableData = [];
          this.page.total = 0;
        })
        .finally(async () => {
          this.$refs.crud?.selectClear?.();
          this.tableLoading = false;
          this.afterGetList && (await this.afterGetList());
        });
    },
    /**
     * @description 数据添加
     * @param {Object} row 为当前的数据
     * @param {Function} done 为表单关闭函数
     * @param {Function} loading 为表单停止loading函数
     **/
    async handleSave(row, done, loading) {
      this.beforeSave && (await this.beforeSave());
      let obj = this.filterObj(row);
      delete obj[this.crudOption.rowKey];
      return this.crudOption
        .create(obj)
        .then(res => {
          this.$message.success("保存成功");
          this.getDataList();
          done?.();
        })
        .catch(e => {
          loading?.();
        })
        .finally(async () => {
          this.afterSave && (await this.afterSave());
        });
    },
    /**
     * @description 数据更新
     * @param {Object} row 为当前的数据
     * @param {Number} index 为当前更新数据的行数
     * @param {Function} done 为表单关闭函数
     * @param {Function} loading 为表单停止loading函数
     **/
    async handleUpdate(row, index, done, loading) {
      this.beforeUpdate && (await this.beforeUpdate());
      let obj = this.filterObj(row);
      return this.crudOption
        .update(obj[this.crudOption.rowKey], obj)
        .then(res => {
          this.$message.success("保存成功");
          this.getDataList();
          done?.();
        })
        .catch(e => {
          loading?.();
        })
        .finally(async () => {
          this.afterUpdate && (await this.afterUpdate());
        });
    },
    /**
     * @description 删除行
     * @param {Object} row 行数据
     */
    async rowDel(row) {
      this.beforeRowDel && (await this.beforeRowDel());
      return this.$confirm("确认进行删除操作？", "提示", {
        type: "warning"
      })
        .then(() => {
          return this.crudOption.remove(row[this.crudOption.rowKey]);
        })
        .then(res => {
          this.$message.success("删除成功");
          this.getDataList();
        })
        .finally(async () => {
          this.afterRowDel && (await this.afterRowDel());
        });
    },
    /**
     * @description 搜索
     * @param {Object} form 搜索表单数据(不含自定义项)
     */
    searchChange(form, done) {
      const crudSearchForm = this.$refs.crud?.$refs.headerSearch?.searchForm ?? {};
      this.searchForm = Object.assign(this.searchForm, crudSearchForm, form);
      this.getDataList();
      done?.();
    },
    /**
     * @description 搜索重置
     */
    searchReset() {
      this.searchForm = {};
      this.page = this.pageDefault;
      this.getDataList();
    },
    /**
     * @description 多选
     * @param {Array} row 选中行数据
     */
    selectionChange(row) {
      this.dataSelections = row;
    },
    /**
     * @description 批量删除
     */
    async batchDel() {
      this.beforeBatchDel && (await this.beforeBatchDel());
      const length = this.dataSelections.length;
      if (!length) {
        return this.$message.warning("请选择删除项");
      }
      return this.$confirm(`确认删除所选的${length}条数据？`, "提示", {
        type: "warning"
      })
        .then(() => {
          const ids = this.dataSelections
            .map(item => item[this.crudOption.rowKey])
            // 根据后端接口传数组或者逗号拼接的字符串
            .join(",");
          return this.crudOption.remove(ids);
        })
        .then(res => {
          this.$message.success("删除成功");
          this.getDataList();
        })
        .finally(async () => {
          this.afterBatchDel && (await this.afterBatchDel());
        });
    },
    /**
     * @description 分页, 每页条数
     * @param {Number} size 每页条数
     */
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.getDataList();
    },
    /**
     * @description 分页, 当前页
     * @param {Number} current 当前页
     */
    pageCurrentChange(current) {
      this.page.currentPage = current;
      this.getDataList();
    },
    /**
     * @description 排序
     * @param {Object} column 列数据
     * @param {String} order 排序顺序
     * @param {String} prop 排序字段
     */
    sortChange({ column, order, prop }) {
      if (order && prop) {
        this.sort = { order, prop };
      } else {
        this.sort = this.sortDefault;
      }
      this.getDataList();
    },
    /**
     * @description 过滤对象空值
     * @param {Object} row 被过滤对象
     * @param {Array} value 过滤的值
     */
    filterObj(row) {
      let temp = {};
      for (const key in row) {
        if ([undefined, null].every(val => row[key] !== val) && !key.includes("$")) {
          temp[key] = row[key];
        }
      }
      return temp;
    }
  }
};
