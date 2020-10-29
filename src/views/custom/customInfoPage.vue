<template>
  <div class="customInfoPage">
    <a-form layout="horizontal" :labelCol="{span:8}" :wrapperCol="{span:14}">
      <a-row>
        <a-col :span="18">
          <a-button type="primary" class="search_btn" @click="searchList">查 询</a-button>
          <a-button class="search_btn btnfloat" @click="showAddNew">新增</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table bordered :row-key="record => record.UserID" :data-source="tableData" :columns="columns"
             :customRow="rowClick">
      <img class="tableImg" :onerror="$global.defaultImg" slot="pic" slot-scope="text" :src="text"/>
    </a-table>
    <a-pagination
      v-if="pagination.total > 0"
      :total="pagination.total"
      show-size-changer
      show-quick-jumper
      v-model="searchForm.pageIndex"
      :page-size="searchForm.pageSize"
      :page-size-options="pagination.pageSizes"
      @showSizeChange="showSizeChange"
      @change="change"
      :showTotal="() => `共 ${pagination.total} 条`"
    />

    <custom-view-info ref="viewChild"></custom-view-info>
  </div>
</template>

<script>
  import customViewInfo from "./components/customViewInfo";
  import {getCustomBaseInfoPage} from "../../api/index";
  import {isEmptyParams} from "../utils/common";

  const columns = [{
    title: '编号',
    dataIndex: 'HeadImg',
  },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'age',
    },
    {
      title: '年龄',
      dataIndex: '',
    },
    {
      title: '身高',
      dataIndex: '',
    },
    {
      title: '体重',
      dataIndex: '',
    },
    {
      title: '职业',
      dataIndex: '',
    },
    {
      title: '月收入',
      dataIndex: '',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];

  export default {
    components:{customViewInfo},
    data() {
      const tableData = [];
      return {
        // 表格
        tableData,
        columns,
        loading: false,
        // 分页对象
        pagination: {
          total: 0,
          pageSizes: ['10', '20', '30', '40', '50'],
        },
      }
    },
    mounted() {
      this.getCustomBaseInfoData();
    },
    methods: {
      submitData() {
        this.$refs.checkForm.validate(valid => {
          if (valid) {
            console.log('check ok, to submit');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      showAddNew() {
        this.$refs.viewChild.customViewInfo = true;
      },

      rowClick(record, index) {
        return {
          on: {
            click: () => {
              console.log(record, index)
              this.formData = record;
            }
          }
        }
      },

      getCustomBaseInfoData(){
        this.loading = true;
        let params={};
        this.$api.common.getCustomBaseInfoPage(params).then(({code, data}) => {
          this.loading = false;
          if (code === 'SUCCESS') {
            const {dataList, total} = data;
            this.tableData = dataList;
            this.pagination.total = total;
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  .btnfloat {
    float: right;
    right: 20px;
  }
</style>
