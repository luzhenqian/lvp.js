<template>
  <form ref="personalInfoForm" class="form">
    <div>
      <label>姓名</label>
      <input type="text" v-model="name" />
    </div>
    <div>
      <label>性别</label>
      <span>
        <input type="radio" id="radioMale" :checked="sex===1" value="1" @click="sex=1" />
        <!-- <label class="radio" for="radioMale"></label> -->
        <label>男</label>
        <input type="radio" id="radioFemale" :checked="sex===0" value="0" @click="sex=0" />
        <!-- <label class="radio" for="radioFemale"></label> -->
        <label>女</label>
      </span>
    </div>
    <div>
      <label>年龄</label>
      <input type="number" v-model="age" />
    </div>
    <div>
      <label>电子邮箱</label>
      <input type="text" v-model="email" />
    </div>
    <div>
      <input type="submit" value="注册" />
    </div>
  </form>
</template>

<script>
export default {
  name: "NativeForm",
  data() {
    return {
      name: "",
      sex: "",
      age: "",
      email: ""
    };
  },
  mounted() {
    const personalInfoForm = this.$refs["personalInfoForm"];
    personalInfoForm.addEventListener("submit", this.submitHandler);
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      const testResult = this.$lvp.test([
        {
          value: this.name,
          rules: [
            {
              required: true,
              name: "isCnName",
              message: "姓名不合规"
            }
          ]
        },
        {
          value: Number.parseInt(this.age), // input 的 value 默认都是 string 类型，所以要转换成 number 类型
          rules: [
            {
              min: 18,
              message: "未成年不可注册"
            }
          ]
        }
      ]);
      if (testResult.status) {
        // 校验成功，发送数据
        console.log("校验成功，发送数据");
      } else {
        // 校验失败，提示用户失败原因
        console.log(testResult.message);
      }
    }
  }
};
</script>

<style scoped>
/* TODO:修改默认radio样式 */
.form {
  width: 400px;
  margin: auto;
}
.form div {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.form div:last-child input {
  margin: auto;
}
input[type="text"],
input[type="number"] {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
}
input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #409eff;
}

input[type="submit"] {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #409eff;
  color: #fff;
  background-color: #409eff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  width: 100%;
}
input[type="submit"]:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
input[type="submit"]:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}

label {
  padding: 10px;
}
</style>