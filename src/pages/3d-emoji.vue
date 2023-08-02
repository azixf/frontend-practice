<template>
  <div class="page place-center">
    <div class="container">
      <div ref="emojiRef" class="g-emoji">
        <div class="g-foo"></div>
        <div class="g-bar"></div>
        <div class="g-baz"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, shallowRef } from "vue";

defineOptions({
  name: "3D emoji表情",
});

const emojiRef = shallowRef();
let curTranslate = 0,
  lastTranslate = 0,
  diff = 0;

let handler = null;
onMounted(() => {
  handler = window.requestAnimationFrame(aniFun);
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(handler);
});

function aniFun() {
  if (!emojiRef.value) return;
  curTranslate =
    window
      .getComputedStyle(emojiRef.value, null)
      .getPropertyValue("translate")
      .split(" ")[1]
      .slice(0, -2) - 0;

  if (diff > 0 && curTranslate - lastTranslate < 0) {
    emojiRef.value.style.setProperty("--emoji", `"${generateRandomEmoji()}"`);
  }

  window.requestAnimationFrame(aniFun);
  diff = curTranslate - lastTranslate;
  lastTranslate = curTranslate;
}

function generateRandomEmoji() {
  const emojiStart = 0x1f600;
  const emojiStart2 = 0x1f900;

  const emojiEnd = 0x1f64f;
  const emojiEnd2 = 0x1f9ff;

  const randomCode =
    Math.random() < 0.5
      ? Math.floor(Math.random() * (emojiEnd - emojiStart + 1) + emojiStart)
      : Math.floor(Math.random() * (emojiEnd2 - emojiStart2 + 1) + emojiStart2);
  const emoji = String.fromCodePoint(randomCode);
  return emoji;
}
</script>
<style scoped lang="scss">
.container {
  width: 800px;
  height: 600px;
  background-color: #454454;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  .g-emoji {
    position: relative;
    width: 200px;
    height: 200px;
    perspective: 2000px;
    transform-style: preserve-3d;
    font-size: 200px;
    animation: rotate 2s alternate infinite ease-in-out,
      fall 0.6s alternate infinite forwards cubic-bezier(0.22, 0.16, 0.04, 0.99);

    &::before,
    &::after {
      display: block;
      content: var(--emoji, "\1F600");
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
    }

    &::after {
      transform: translate3D(-50%, -50%, -4px);
    }

    .g-foo,
    .g-bar,
    .g-baz {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
    }

    .g-foo::before,
    .g-foo::after,
    .g-bar::before,
    .g-bar::after,
    .g-baz::before,
    .g-baz::after {
      display: block;
      content: var(--emoji, "\1F600");
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
    }

    .g-foo::before {
      transform: translate(-50%, -50%) translateZ(-8px);
      opacity: 0.95;
    }
    .g-foo::after {
      transform: translate(-50%, -50%) translateZ(-12px);
      opacity: 0.9;
    }
    .g-bar::before {
      transform: translate(-50%, -50%) translateZ(-16px);
      opacity: 0.85;
    }
    .g-bar::after {
      transform: translate(-50%, -50%) translateZ(-20px);
      opacity: 0.8;
    }
    .g-baz::before {
      transform: translate(-50%, -50%) translateZ(-24px);
      opacity: 0.75;
    }
    .g-baz::after {
      transform: translate(-50%, -50%) translateZ(-28px);
      opacity: 0.7;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotateY(-45deg);
  }
  100% {
    transform: rotateY(45deg);
  }
}

@keyframes fall {
  0% {
    scale: 1.25 0.75;
    translate: 0 150px;
  }
  25% {
    scale: 1 1;
  }
  100% {
    scale: 1 1;
    translate: 0 0;
  }
}
</style>
