<template>
  <div class="login-container">
    <el-form class="login-form">
      <!-- 用户名输入框 -->
      <el-form-item>
        <div class="input-group">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="username"
            placeholder="用户名"
            name="username"
            type="text"
            auto-complete="on"
            class="custom-input"
          />
        </div>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item>
        <div class="input-group">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="password"
            placeholder="密码"
            name="password"
            type="password"
            auto-complete="on"
            class="custom-input"
          />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;

  .login-form {
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .input-group {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px 0;

    .svg-container {
      margin-right: 10px;
      color: #889aa4;
      display: flex;
      align-items: center;
    }

    .custom-input {
      flex: 1;
      border: none;
      font-size: 16px;
      color: #333;

      ::v-deep .el-input__inner {
        border: none;
        box-shadow: none;
      }

      ::v-deep .el-input__inner:focus {
        border: none;
        box-shadow: none;
      }
    }
  }
}
</style>
