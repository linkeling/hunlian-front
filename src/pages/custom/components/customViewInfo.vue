<template>
  <div>
    <a-modal title='基本信息' :visible="customViewInfo" @cancel="closeModal"
             @ok="submitData" :maskClosable="false" width="60%">
      <a-form-model ref="formRef" :model="formData" :rules="formRules"
                    :labelCol="{span:6}" :wrapperCol="{span:12}">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="姓名" prop="customName">
              <a-input placeholder="请输入姓名" v-model="formData.customName"></a-input>
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
              <a-input placeholder="" v-model="formData.reject"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-model-item label="联系电话" prop="telphone">
              <a-input placeholder="" v-model="formData.telphone"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="微信号" prop="wechat">
              <a-input placeholder="" v-model="formData.wechat"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="照片" prop="picture">
              <a-input placeholder="" v-model="formData.picture"></a-input>
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
  export default {
    name: "customViewInfo.vue",
    data() {
      return {
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
      this.getData();
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
      getData() {

      },
      // 关闭弹窗
      closeModal() {
        this.customViewInfo = false;
        this.$refs.formRef.resetFields();
      },

      rowClick(record, index) {
        return {
          on: {
            click: () => {
              console.log(record, index)
              this.formData = record;
              this.isDrawerShow = true;
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
