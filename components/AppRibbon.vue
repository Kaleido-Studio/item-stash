<!-- eslint-disable no-bitwise -->
<template>
  <canvas
    ref="canvas"
    class="h-screen w-screen top-0 left-0 fixed opacity-60 -z-1"
    :height="wh.height * pr"
    :width="wh.width * pr"
  />
</template>

<script setup lang="ts">
interface Point {
  x: number;
  y: number;
}

const config = {
  s: 90, // size
};

const pi = Math.PI * 2;

const drawRibbon = (
  wh: { width: number; height: number },
  g2d: CanvasRenderingContext2D
) => {
  let q: Point[];
  let r = 0;

  const line: (p: number) => number = (p) => {
    const t = p + (Math.random() * 2 - 1.1) * config.s;
    return t > wh.height || t < 0 ? line(p) : t;
  };

  const reDraw = () => {
    q = [
      { x: 0, y: wh.height * 0.7 + config.s },
      { x: 0, y: wh.height * 0.7 - config.s },
    ];
    while (q[1].x < wh.width + config.s) draw(q[0], q[1]);
  };

  const draw = (i: Point, j: Point) => {
    if (!g2d) return;
    g2d.beginPath();
    g2d.moveTo(i.x, i.y);
    g2d.lineTo(j.x, j.y);
    const k = j.x + (Math.random() * 2 - 0.25) * config.s,
      n = line(j.y);
    g2d.lineTo(k, n);
    g2d.closePath();
    r -= pi / -50;
    g2d.fillStyle =
      "#" +
      (
        ((Math.cos(r) * 127 + 128) << 16) |
        ((Math.cos(r + pi / 3) * 127 + 128) << 8) |
        (Math.cos(r + (pi / 3) * 2) * 127 + 128)
      ).toString(16);
    g2d.fill();
    q[0] = q[1];
    q[1] = { x: k, y: n };
  };
  reDraw();
};

const canvas = shallowRef<HTMLCanvasElement | null>(null);
const getWh = () => ({ width: window.innerWidth, height: window.innerHeight });
const wh = reactive(getWh());
const pr = ref(window.devicePixelRatio || 1);
const drawCanv = () => {
  pr.value = window.devicePixelRatio || 1;
  const newWh = getWh();
  wh.height = newWh.height;
  wh.width = newWh.width;
  if (!canvas.value) {
    console.log("asfkdug");
    return;
  }
  const g2d = canvas.value.getContext("2d");
  if (!g2d) {
    console.log("oioh");
    return;
  }
  g2d.scale(pr.value, pr.value);
  drawRibbon(wh, g2d);
};
onMounted(() => {
  drawCanv();
});
window.addEventListener("resize", () => {
  drawCanv();
});
</script>
