<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current':item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >{{item.txt}}</li>
      </ul>
      <!--表单 start-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" size="medium"></el-input>
          <!-- v-model数据双向绑定input select textarea component -->
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <!-- 如果model的值等于rigister的话，那么将显示重复密码的模块 -->
        <el-form-item prop="repassword" class="item-from" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.repassword"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//@直接指向src，在vue.config.js里面配置好了
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVcode
} from "@/utils/validate.js";
export default {
  name: "login",
  data() {
    //验证用户名
    var validateUsername = (rule, value, callback) => {
      //调用validate.js里面验证邮箱的正则表达式函数
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateEmail(value)) {
        callback(new Error("输入的邮箱有误"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      //绑定过滤后的数据
      this.ruleForm.password = stripscript(value);
      //重新赋值给value
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };

    //验证重复密码
    var validaterePassword = (rule, value, callback) => {
      //如果模块值为login，直接通过
      if(this.model ==='login') {
        callback();
      }
      //绑定过滤后的数据
      this.ruleForm.repassword = stripscript(value);
      //重新赋值给value
      value = this.ruleForm.repassword;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        //判断值是否与第一次输入相同
        callback(new Error("两次输入的密码不一样"));
      } else {
        callback();
      }
    };
    //验证验证码
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (!validateVcode(value)) {
        return callback(new Error("密码输入有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      //模块的值
      model: "login",
      //表单的数据
      ruleForm: {
        username: "",
        password: "",
        repassword: "",
        code: ""
      },
      rules: {
        //触发事件
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        repassword: [{ validator: validaterePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  //挂在完成后自动执行
  mounted() {},
  //写函数的地方
  methods: {
    toggleMneu(data) {
      //ES6的写法
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      //高光
      data.current = true;
      //修改模块的值
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

    //  vue:数据驱动视图渲染
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer; //给li标签悬浮的时候变成可点击的小手
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1); //给li加上阴影
  }
}
.login-form {
  margin-top: 20px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
