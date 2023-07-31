<template>
  <div class="page">
    <el-space direction="vertical">
      <el-space direction="vertical">
        <div ref="box" class="box place-center">FLIP</div>
        <el-space>
          <el-button type="primary" @click="move">移动500px</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-space>
      </el-space>

      <div class="img-box">
        <img ref="img" src="/hand.png" alt="" @click="preview" />
        <div ref="overlay" class="overlay" @click="hide"></div>
      </div>
    </el-space>
  </div>
</template>

<script setup>
import { shallowRef } from "vue";

defineOptions({
  name: "FLIP动画",
});

const box = shallowRef();

let first, last;

function move() {
  first = box.value.getBoundingClientRect();

  box.value.style.position = "relative";
  box.value.style.left = "500px";

  last = box.value.getBoundingClientRect();

  flipPlay();
}

function reset() {
  first = box.value.getBoundingClientRect();

  box.value.style.left = "0px";
  box.value.style.position = "static";

  last = box.value.getBoundingClientRect();

  flipPlay();
}

function flipPlay() {
  const x = first.left - last.left;

  box.value.animate(
    [
      {
        transform: `translateX(${x}px)`,
      },
      {
        transform: "none",
      },
    ],
    {
      duration: 300,
      easing: "cubic-bezier(0.68,-0.6,0.32,1.6)",
    }
  );
}

const img = shallowRef();
const overlay = shallowRef();


let start, end

function preview() {
  img.value.style.position = "absolute";
  img.value.style.top = "50%";
  img.value.style.left = "50%";
  img.value.style.transform = "translate3D(-50%, -50%, 0) scale(1.5)";
}

function hide() {}
</script>

<style lang="scss" scoped>
.page {
  padding: 40px;
}
.box {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: hsl(19, 87%, 48%);
}

.img-box {
  width: 150px;
  height: 120px;
  border-radius: 20px;
  border: 1px solid hsl(331, 87%, 48%);
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    display: none;
  }
}
</style>
