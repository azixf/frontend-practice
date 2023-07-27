<template>
  <div class="page place-center">
    <div class="box">
      <span class="borderline"></span>
      <form class="login-form">
        <p class="title">Sign in</p>
        <div class="input-box">
          <input type="text" required />
          <label class="label">Username</label>
          <i class="underline"></i>
        </div>
        <div class="input-box">
          <input type="password" required />
          <label class="label">Password</label>
          <i class="underline"></i>
        </div>
        <div class="forget-register">
          <a href="javascript:void(0)">Forget password?</a>
          <a href="javascript:void(0)">Register</a>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "流光登陆框",
});
</script>

<style lang="scss" scoped>
@mixin center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page {
  background: #222;
  color: #fff;
}

.box {
  position: relative;
  overflow: hidden;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  .borderline {
    position: absolute;
    top: 0;
    inset: 0;
    &::before {
      content: "";
      position: absolute;
      left: -60%;
      top: -60%;
      width: 100%;
      height: 100%;
      background-color: #45f3ff;
      transform-origin: bottom right;
      animation: rotate 3s linear infinite;
    }

    &::after {
      content: "";
      position: absolute;
      left: 60%;
      top: 60%;
      width: 100%;
      height: 100%;
      background-color: #ff2770;
      transform-origin: top left;
      animation: rotate 3s linear infinite;
    }
  }

  .login-form {
    position: relative;
    background-color: #222;
    margin: 2px;
    width: 328px;
    padding: 40px 30px;
    border-radius: 8px;

    @include center;
    .title {
      text-align: center;
      margin-bottom: 30px;
    }

    .input-box {
      position: relative;
      @include center;
      margin-bottom: 28px;

      input {
        outline: none;
        border: none;
        height: 32px;
        background-color: transparent;
        padding: 0 8px;
        border-radius: 4px;
        &:focus,
        &:valid {
          background-color: #fff;
          & ~ .underline {
            transform: scale(0);
          }

          & ~ .label {
            font-size: 12px;
            transform: translateY(-16px);
          }
        }
      }

      .label {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(0, 8px);
        pointer-events: none;
        transition: transform 0.3s ease;
      }
      .underline {
        width: 100%;
        height: 3px;
        background-color: #ddd;
        transition: transform 0.3s ease-in;
        transform-origin: center;
      }
    }

    .forget-register {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      a {
        color: #ccc;
        &:hover {
          opacity: 0.6;
        }
        &:active {
          opacity: 0.8;
        }
      }
    }

    button {
      padding: 8px 0;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }
}

@keyframes rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>
