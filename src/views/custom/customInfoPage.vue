<template>
  <div class="customInfoPage">
    <a-form layout="inline" class="search_form">
      <a-form-item label="姓名">
        <a-input v-model="searchForm.residentName" placeholder="姓名"></a-input>
      </a-form-item>
      <a-form-item label="编号">
        <a-input v-model="searchForm.orId" placeholder="编号"></a-input>
      </a-form-item>
      <a-form-item label="性别">
        <a-select v-model="searchForm.gender" placeholder="请选择" style="width: 150px">
          <a-select-option value="">全部</a-select-option>
          <a-select-option :value="1">男</a-select-option>
          <a-select-option :value="2">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-button type="primary" class="search_btn" @click="searchList">查 询</a-button>
      <a-button class="search_btn btnfloat" @click="showAddNew">新增</a-button>
      <div style="clear: both"></div>
    </a-form>

    <a-table :dataSource="tableData"
             :columns="columns"
             rowKey="id"
             :loading="loading"
             :pagination="false"
             :scroll="{x: 10}">
      <template slot="index" slot-scope="text, record, index">
        {{(pagination.pageIndex - 1) * pagination.pageSize +index+ 1}}
      </template>
    </a-table>
    <a-pagination
            v-if="pagination.total > 0"
            :total="pagination.total"
            show-size-changer
            show-quick-jumper
            v-model="pagination.pageIndex"
            :page-size="pagination.pageSize"
            :page-size-options="pagination.pageSizeOptions"
            @showSizeChange="showSizeChange"
            @change="change"
            :showTotal="() => `共 ${pagination.total} 条`"
    />

    <a-modal title='基本信息' :visible="customViewInfo" @cancel="closeModal"
             @ok="submitData" :maskClosable="false" width="60%">
      <a-form-model ref="formRef" :model="formData" :rules="formRules"
                    :labelCol="{span:6}" :wrapperCol="{span:12}">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="姓名" prop="residentName">
              <a-input placeholder="请输入姓名" v-model="formData.residentName"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="性别" prop="gender">
              <a-select v-model="formData.gender" placeholder="请选择">
                <a-select-option v-for="item in genderList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="出生日期" prop="dateBirth">
              <a-date-picker v-model="formData.dateBirth"/>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="现居地" prop="livingPlace">
              <a-input placeholder="" v-model="formData.livingPlace"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="家乡所在地" prop="nativePlace">
              <a-input placeholder="" v-model="formData.nativePlace"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="身高" prop="height">
              <a-input placeholder="请输入身高" v-model="formData.height"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="体重" prop="weight">
              <a-input placeholder="请输入体重" v-model="formData.weight"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="学历" prop="education">
              <a-select v-model="formData.education" placeholder="请选择">
                <a-select-option v-for="item in educationList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="职业" prop="profession">
              <a-select v-model="formData.profession" placeholder="请选择职业">
                <a-select-option v-for="item in professionList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="月收入" prop="monthIncome">
              <a-input placeholder="" v-model="formData.monthIncome"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="房产情况" prop="house">
              <a-input placeholder="" v-model="formData.house"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="车辆情况" prop="isCar">
              <a-input placeholder="" v-model="formData.isCar"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="有无婚史" prop="marriage">
              <a-select v-model="formData.marriage" placeholder="请选择有无婚史">
                <a-select-option v-for="item in yesAndNoList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="有无小孩" prop="children">
              <a-select v-model="formData.children" placeholder="请选择有无小孩">
                <a-select-option v-for="item in yesAndNoList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="是否接受离异" prop="divorce">
              <a-select v-model="formData.divorce" placeholder="请选择学历请选择">
                <a-select-option v-for="item in genderList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item label="个人介绍" prop="personal" :labelCol="{span:2}" :wrapperCol="{span: 20}">
              <a-input placeholder="" v-model="formData.personal"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item label="家庭介绍" prop="family" :labelCol="{span:2}" :wrapperCol="{span: 20}">
              <a-input placeholder="" v-model="formData.family"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="择偶标准" prop="standard" :labelCol="{span:2}" :wrapperCol="{span: 20}">
              <a-input placeholder="" v-model="formData.standard"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item label="不接受情况" prop="reject" :labelCol="{span:2}" :wrapperCol="{span: 20}">
              <a-input placeholder="请输入不接受情况" v-model="formData.reject"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="联系电话" prop="telphone">
              <a-input placeholder="请输入联系电话" v-model="formData.telphone"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="微信号" prop="wechat">
              <a-input placeholder="请输入微信号" v-model="formData.wechat"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="照片" prop="picture">
              <a-input placeholder="请选择照片" v-model="formData.picture"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="介绍次数" prop="number">
              <a-input placeholder="" v-model="formData.number"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="审核状态" prop="auditStatus">
              <a-select v-model="formData.auditStatus" placeholder="请选择审核状态">
                <a-select-option v-for="item in auditList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="婚恋状态" prop="status">
              <a-select v-model="formData.status" placeholder="请选择婚恋状态">
                <a-select-option v-for="item in genderList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
  import {getCustomBaseInfoPage,insertCustomBaseInfo} from "../../api/index";
  import {isEmptyParams} from "../utils/common";

  const columns = [{
      title: '编号',
      dataIndex: 'orId',
  },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '年龄',
      dataIndex: '',
    },
    {
      title: '身高',
      dataIndex: 'height',
    },
    {
      title: '体重',
      dataIndex: 'weight',
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
    data() {
      return {
        // 表格
        loading: false,
        searchForm:[],
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
        },
        columns,
        tableData: [],

        formData: {},
        customViewInfo: false,
        formRules: {},
        genderList:[{id:'1',name:'男'},{id:'2',name:'女'}],
        educationList:[{id: '1', name: '博士'}, {id: '2', name: '硕士'},
          {id: '3', name: '本科'}, {id: '4', name: '大专'}, {id: '5', name: '中专'},
          {id: '6', name: '初中及以下'},{id: '7', name: '文盲或半文盲'}],
        professionList:[{id: '1', name: '公务员'},{id: '2', name: '事业单位'},],
        yesAndNoList:[{id:'1',name:'有'},{id:'2',name:'无'}],
        auditList:[{id:'1',name:'待审核'},{id:'2',name:'通过'},{id:'3',name:'拒绝'}],
        statusList:[{id:'1',name:'待介绍'},{id:'2',name:'已介绍'}],
      }
    },
    mounted() {
      this.pagination.pageIndex = 1
      this.searchList();
    },
    methods: {
      showAddNew() {
        this.customViewInfo = true;
      },

      // 分页
      showSizeChange(pageNum, pageSize) {
        this.pagination.pageIndex = pageNum;
        this.pagination.pageSize = pageSize;
        this.searchList()
      },
      change(pageNum, pageSize) {
        this.pagination.pageIndex = pageNum;
        this.pagination.pageSize = pageSize;
        this.searchList()
      },

      searchList(){
        this.loading = true;
        let par= isEmptyParams(this.searchForm);
        const {...other} = par
        let params = {
          ...other,
          pageIndex: this.pagination.pageIndex,
          pageSize: this.pagination.pageSize
        }
        this.$api.common.getCustomBaseInfoPage(params).then(({code, data}) => {
          this.loading = false;
          if (code === 'SUCCESS') {
            const {dataList, total} = data;
            this.tableData = dataList;
            this.pagination.total = total;
          }
        });
      },


      // 关闭弹窗
      closeModal() {
        this.customViewInfo = false;
        this.$refs.formRef.resetFields();
      },

      submitData() {
        let vm = this
        this.$refs.formRef.validate(valid => {
          if (valid) {
            let pars = {}
            Object.assign(pars,vm.formData)
            let par = {
              ...pars
            }
            vm.$api.common.insertCustomBaseInfo(par).then(({code}) => {
              if (code === 'SUCCESS') {
                this.$message.success('新增成功！')
                this.customViewInfo = false
                vm.searchList()
              }
            })
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
