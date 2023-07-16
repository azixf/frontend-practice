<template>
  <div class="page">
    <div class="bg"></div>
    <div class="content">
      <header class="header">
        <!-- <img
          class="logo"
          src="/logo.svg"
          alt=""
          @click="$router.push('/blog')"
        /> -->
        <div class="logo">
          <svg-icon name="logo"></svg-icon>
        </div>
        <ul class="navbar">
          <li class="nav-item">JS</li>
          <li class="nav-item">JAVA</li>
          <li class="nav-item">NODE</li>
          <li class="nav-item">PHP</li>
        </ul>
        <div class="operations">
          <span>github</span>
          <span>switch</span>
        </div>
      </header>
      <main class="main place-center">
        <div class="card-container">
          <div
            class="card place-center"
            v-for="(item, i) in 6"
            :style="{ '--i': i }"
          >
            {{ item }}
          </div>
        </div>
      </main>
      <footer class="footer">
        <p class="design">Designed By azixf&lt;azi0427@163.com&gt;</p>
        <p class="copyright">&copy;2023-Present</p>
      </footer>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: "博客",
});
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  background: #d2c7a3;
  color: #d2c7a3;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #4a7a5e;
    border-radius: 20% 0 0 0;
  }

  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    .header {
      height: 68px;
      padding: 0 48px 0 24px;
      display: flex;
      align-items: center;
      .logo {
        width: 32px;
        height: 32px;
        cursor: pointer;
        &:hover {
          filter: drop-shadow(0 4px 10px #4a7a5e);
        }
      }

      .navbar {
        flex: 1;
        display: flex;
        justify-content: center;
        gap: 16px;
        .nav-item {
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .operations {
        display: flex;
        gap: 8px;
      }
    }

    .main {
      flex: 1;
      .card-container {
        display: flex;
        gap: 12px;
        .card {
          width: 200px;
          height: 300px;
          background: #fff;
          border-radius: 12px;
          filter: drop-shadow(2px 2px 4px #2b5a41);
          transition: transform 0.2s ease-in-out;
          transform: translateX(calc(var(--i) * -80px));
          &:hover ~ .card {
            transform: translateX(calc(var(--i) * -80px + 68px));
          }
        }
      }
    }

    .footer {
      height: 80px;
      background: #2b5a41;
      color: #999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;

      .copyright {
        vertical-align: middle;
      }
    }
  }
}
</style>
