/**
 * @description crudMixin 用于avue-crud的混入
 * @hooks 钩子函数，xxxx前的钩子函数可以是Promise:
 * beforeGetList获取数据前,afterGetList获取数据后,
 * beforeSave新增数据前,afterSave新增数据后,
 * beforeUpdate更新数据前,afterUpdate更新数据后,
 * beforeDel删除数据前,afterDel删除数据后,
 * beforeBatchDel批量删除前,afterBatchDel批量删除后,
 * beforeSearch(isReset)搜索前(是否重置),afterSearch(isReset)搜索后(是否重置)
 */
export default {
  data() {
    return {
      // 设置属性
      crudOption: {
        rowKey: "_id", // 行键值(id/_id/uuid/...)
        created: true, // 此页面是否在进入时，查询数据列表?
        getList: null, // 获取数据列表方法
        create: null, // 添加数据方法
        update: null, // 编辑数据方法
        remove: null, // 删除单条数据方法
        dataPath: "res.data", // 接口返回数据的路径
        totalPath: "res.total" // 接口返回总数的路径
      },
      // 分页
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      // 排序
      sort: {
        order: "descending", // desc降序，asc升序
        prop: "createTime" // 排序字段
      },
      tableLoading: false, // 数据加载状态
      tableOption: {}, // 表格配置项
      tableData: [], // 数据列表
      dataSelections: [], // 已选择数据列表
      searchForm: {}, // 查询条件
      formData: {} // 表单数据
    };
  },
  computed: {
    bindVal() {
      return {
        ref: "crud",
        value: this.formData,
        tableLoading: this.tableLoading,
        option: this.tableOption,
        data: this.tableData,
        page: this.page,
        search: this.searchForm
      };
    },
    onEvent() {
      return {
        "row-save": this.handleSave,
        "row-update": this.handleUpdate,
        "row-del": this.handleDel,
        "refresh-change": this.getDataList,
        "selection-change": this.selectionChange,
        "current-change": this.pageCurrentChange,
        "size-change": this.pageSizeChange,
        "sort-change": this.sortChange,
        "search-change": this.searchChange,
        "search-reset": this.searchReset,
        input: form => (this.formData = form)
      };
    }
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
      await this.beforeGetList?.();
      this.tableLoading = true;
      return this.crudOption
        .getList({
          ...this.page,
          ...this.sort,
          ...this.searchForm
        })
        .then(res => {
          console.log("getDataList -> res", res);
          this.tableData = eval(this.crudOption.dataPath) || [];
          this.page.total = eval(this.crudOption.totalPath) || 0;
          this.afterGetList?.();
        })
        .catch(() => {
          this.tableData = [];
          this.page.total = 0;
        })
        .finally(() => {
          this.$refs.crud?.selectClear?.();
          this.tableLoading = false;
        });
    },
    /**
     * @description 数据添加
     * @param {Object} row 为当前的数据
     * @param {Function} done 为表单关闭函数
     * @param {Function} loading 为表单停止loading函数
     **/
    async handleSave(row, done, loading) {
      await this.beforeSave?.();
      let obj = this.filterObj(row);
      delete obj[this.crudOption.rowKey];
      return this.crudOption
        .create(obj)
        .then(() => {
          this.$message.success("保存成功");
          this.getDataList();
          done?.();
          this.afterSave?.();
        })
        .catch(() => {
          loading?.();
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
      await this.beforeUpdate?.();
      let obj = this.filterObj(row);
      return this.crudOption
        .update(obj[this.crudOption.rowKey], obj)
        .then(() => {
          this.$message.success("保存成功");
          this.getDataList();
          done?.();
          this.afterUpdate?.();
        })
        .catch(() => {
          loading?.();
        });
    },
    /**
     * @description 删除行
     * @param {Object} row 行数据
     */
    async handleDel(row) {
      await this.beforeDel?.();
      return this.$confirm("确认进行删除操作？", "提示", {
        type: "warning"
      })
        .then(() => {
          return this.crudOption.remove(row[this.crudOption.rowKey]);
        })
        .then(() => {
          this.$message.success("删除成功");
          this.getDataList();
          this.afterDel?.();
        })
        .catch(() => {});
    },
    /**
     * @description 批量删除
     */
    async batchDel() {
      await this.beforeBatchDel?.();
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
        .then(() => {
          this.$message.success("删除成功");
          this.getDataList();
          this.afterBatchDel?.();
        })
        .catch(() => {});
    },
    /**
     * @description 搜索
     * @param {Object} form 搜索表单数据
     */
    async searchChange(form, done, isReset = false) {
      this.searchForm = form;
      this.page.currentPage = 1;
      await this.beforeSearch?.(isReset);
      this.getDataList();
      done?.();
      this.afterSearch?.(isReset);
    },
    /**
     * @description 搜索重置
     */
    searchReset(form, done) {
      this.searchChange(form, done, true);
    },
    /**
     * @description 多选
     * @param {Array} row 选中行数据
     */
    selectionChange(row) {
      this.dataSelections = row;
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
     * @param {String} order 排序顺序
     * @param {String} prop 排序字段
     */
    sortChange({ order, prop }) {
      if (order && prop) {
        this.sort = { order, prop };
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
        if (
          [undefined, null].every(val => row[key] !== val) &&
          !key.includes("$")
        ) {
          temp[key] = row[key];
        }
      }
      return temp;
    }
  }
};
