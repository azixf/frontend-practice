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
      <img ref="img" class="img" src="/logo.svg" alt="" @click="preview" />
      <div ref="overlay" class="overlay" @click="hide">
        <div ref="imgBox" class="img-box">
          <img ref="previewImg" src="" alt="" />
        </div>
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
      duration: 500,
      easing: "cubic-bezier(0.68,-0.6,0.32,1.6)",
    }
  );
}

const img = shallowRef();
const overlay = shallowRef();
const imgBox = shallowRef();
const previewImg = shallowRef();

let start, end;

function preview() {
  start = img.value.getBoundingClientRect();

  previewImg.value.setAttribute("src", img.value.getAttribute("src"));
  overlay.value.style.display = "grid";
  img.value.style.opacity = 0;

  end = imgBox.value.getBoundingClientRect();

  previewAnimation(imgBox);
}

function previewAnimation(imgBox) {
  const x = start.left - end.left;
  const y = start.top - end.top;
  const w = start.width / end.width;
  const h = start.height / end.height;

  imgBox.value.animate(
    [
      {
        transform: `translate(${x}px, ${y}px) scale(${w})`,
      },
      {
        transform: `translate(0, 0) scale(1)`,
      },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.2,0,0.2,1)",
    }
  );
}

function hide() {
  start = imgBox.value.getBoundingClientRect();

  overlay.value.style.display = "none";
  img.value.style.opacity = 1;

  end = img.value.getBoundingClientRect();

  previewAnimation(img);
}
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

.img {
  width: 200px;
  height: 200px;
  cursor: pointer;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
  place-content: center;
  transition: opacity 0.36s ease-in-out;
  z-index: 1000;
  .img-box {
    width: 50vw;
    height: 70vh;
    transform-origin: top left;
    // display: flex;
    // flex-direction: column;
    // margin: 100px auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
