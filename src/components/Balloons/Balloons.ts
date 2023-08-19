import { BalloonsConfig } from './Balloons.types';
import {
  animate,
  generatePhysics,
  getRandomInt,
} from '../../functions/helpers';
import { Particle } from '../../Main.types';
const defaultColors = ['#A45BF1', '#25C6F6', '#72F753', '#F76C88', '#F5F770'];
const factors = [-0.6, -0.3, 0, 0.3, 0.6];
const balloon = `<svg width="100%" viewBox="0 0 976 3040" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M489.693 1269.49C489.773 1378.79 410.493 1466.8 389.107 1571.11C384.147 1595.33 382.893 1620.12 386.187 1644.64C389.44 1668.83 399.28 1691.16 409.04 1713.29C419.253 1736.44 429.28 1760.11 429.453 1785.83C429.64 1812.27 416.307 1836.8 408.933 1861.59C396 1905.15 409.613 1948.88 425.213 1989.73C442.04 2033.83 461.387 2077.87 456.6 2126.17C453.92 2153.15 444.147 2179.13 434.2 2204.13C424.173 2229.35 413.72 2254.28 405.507 2280.17C389.213 2331.51 379.493 2385.83 378.267 2439.72C377.693 2464.89 380.333 2490.25 388.667 2514.11C397.053 2538.09 412.6 2558.75 424.733 2580.84C449.907 2626.64 458.453 2681 451.053 2732.52C443.853 2782.56 414.227 2825.99 408.893 2876.35C404.44 2918.39 416.733 2961.63 440.08 2996.53C450.373 3011.91 463.267 3025.44 477.867 3036.75C480.773 3039 484.88 3034.95 481.947 3032.68C446.147 3004.96 423.24 2964.2 415.907 2919.71C412.107 2896.61 413.627 2872.95 419.427 2850.35C426.053 2824.51 438.067 2800.36 446.667 2775.17C462.44 2729 463.147 2678.51 450.92 2631.45C444.733 2607.64 434.453 2585.4 421.893 2564.32C407.933 2540.91 394.307 2518.68 388.32 2491.71C382.493 2465.45 383.413 2438 385.56 2411.37C387.853 2382.85 392.467 2354.56 398.827 2326.67C405 2299.61 413.253 2273.05 423.107 2247.12C432.533 2222.27 443.533 2198.05 451.867 2172.8C459.707 2149.04 464.387 2124.29 463 2099.23C461.773 2077.19 455.64 2055.65 448.467 2034.89C433.587 1991.8 411.307 1949.77 409.413 1903.37C408.36 1877.76 417.12 1854.67 425.587 1830.97C433.68 1808.33 437.44 1786.41 432.787 1762.6C428.307 1739.63 417.333 1718.23 408.12 1696.91C397.267 1671.77 390.413 1646.41 390.013 1618.89C388.387 1509.52 469.707 1420.85 490.813 1316.72C493.973 1301.19 495.467 1285.33 495.453 1269.49C495.453 1265.77 489.693 1265.77 489.693 1269.49" stroke="#7A7E82" stroke-width="4"/>
<path d="M555.653 1298.41H423.52C415.173 1298.41 408.413 1305.17 408.413 1313.52C408.413 1321.85 415.173 1328.63 423.52 1328.63H555.653C564 1328.63 570.76 1321.85 570.76 1313.52C570.76 1305.17 564 1298.41 555.653 1298.41Z" fill="currentColor"/>
<path d="M555.653 1298.41H423.52C415.173 1298.41 408.413 1305.17 408.413 1313.52C408.413 1321.85 415.173 1328.63 423.52 1328.63H555.653C564 1328.63 570.76 1321.85 570.76 1313.52C570.76 1305.17 564 1298.41 555.653 1298.41Z" fill="black" fill-opacity="0.1"/>
<path d="M975.133 528.947C975.133 820.667 756.973 1255.43 487.853 1255.43C218.733 1255.43 0.559814 820.667 0.559814 528.947C0.559814 237.227 218.733 0.733359 487.853 0.733359C756.973 0.733359 975.133 237.227 975.133 528.947Z" fill="currentColor"/>
<path d="M549.04 1298.41C531.293 1285.91 519.893 1269.95 512.587 1254.2C504.387 1255.01 496.147 1255.43 487.853 1255.43C481.04 1255.43 474.28 1255.15 467.546 1254.6C460.226 1270.21 448.867 1286.01 431.253 1298.41H549.04Z" fill="currentColor"/>
<path d="M211.413 569.213C193.787 569.213 175.947 564.4 160.92 555.24C128.133 535.293 108.133 498.56 101.147 460.827C97.0133 438.533 96.9468 415.827 99.1068 393.214C120.627 308.28 168.453 234.48 233.467 183.733C246.947 173.213 261.16 163.693 276.027 155.267C280.347 152.813 284.72 150.467 289.147 148.2C291.707 147.373 294.347 146.92 297.12 146.92C301.347 146.92 305.907 147.974 311.067 150.414C332.773 160.64 334.36 192.213 323.693 213.72C313.04 235.226 294.187 251.8 283.413 273.253C262 315.88 276.48 366.707 287.347 413.147C298.213 459.6 302.427 515.373 267.8 548.187C252.707 562.48 232.227 569.213 211.413 569.213" fill="white" fill-opacity="0.2"/>
<path d="M785.133 110.4C863.72 204.187 911.613 328.747 911.613 465.414C911.613 757.147 693.44 1191.89 424.32 1191.89C350.973 1191.89 281.413 1159.6 219.013 1106.71C296.067 1196.16 388.48 1255.43 487.853 1255.43C756.973 1255.43 975.133 820.667 975.133 528.947C975.133 358.547 900.693 206.987 785.133 110.4Z" fill="black" fill-opacity="0.1"/>
</svg>`

const handlePopBalloon = (
  event: MouseEvent,
  element: Element,
  root: Element
) => {
  if (element.parentNode === root) {
    root.removeChild(element);
  }
};

const createElements = (
  root: Element,
  elementCount: number,
  elementSize: number,
  zIndex: number,
  position: string,
  colors: string[]
) =>
  Array.from({ length: elementCount }).map((_, index) => {
    const element = document.createElement('span');
    element.innerHTML = balloon;
    element.style.width = `${elementSize}px`;
    element.style.position = position;
    element.style.color = colors[index % colors.length];
    element.style.zIndex = `${zIndex}`;
    element.addEventListener(
      'click',
      (event: MouseEvent) => {
        handlePopBalloon(event, element, root);
      },
      { once: true }
    );
    root.appendChild(element);
    return { element, differentiator: getRandomInt(0, factors.length) };
  });

const updateParticle = (
  particle: Particle,
  progress: number,
  decay: number
) => {
  const { x, y, tiltAngle, angle2D, velocity, differentiator, wobble } =
    particle.physics;

  particle.physics.x += Math.cos(angle2D) * 0.5 * velocity;
  particle.physics.y += Math.sin(angle2D) * 0.5 * velocity;
  particle.physics.wobble += 0;
  particle.physics.velocity *= decay;
  particle.physics.tiltAngle += 0.1;

  const wobbleX =
    x +
    (factors[differentiator] * progress * wobble * wobble +
      20 * Math.sin(wobble));

  particle.element.style.transform = `translate3d(${wobbleX}px, ${y}px, 0) rotate3d(0, 0, 1, ${
    differentiator % 2
      ? Math.sin(tiltAngle / 4) / 3
      : Math.cos(tiltAngle / 4) / 3
  }rad)`;
  particle.element.style.scale = `${1 - 0.2 * progress}`;

  if (progress > 0.5) {
    particle.element.style.opacity = `${2 - 2 * progress}`;
  }
};

export const balloons = (
  root: Element,
  internalAnimatingCallback: () => void,
  config?: BalloonsConfig
) => {
  const options = config || {};
  const {
    angle = 90,
    decay = 0.999,
    spread = 50,
    startVelocity = 3,
    elementCount = 10,
    elementSize = 20,
    lifetime = 600,
    zIndex = 0,
    position = 'fixed',
    colors = defaultColors,
    onAnimationComplete,
  } = options;
  const spanElements = createElements(
    root,
    elementCount,
    elementSize,
    zIndex,
    position,
    colors
  );
  const particles = spanElements.map(({ element, differentiator }) => ({
    element,
    physics: generatePhysics(angle, spread, startVelocity, differentiator),
  }));

  const onFinish = () => {
    if (typeof onAnimationComplete === 'function') {
      onAnimationComplete();
    }
    internalAnimatingCallback();
  };

  animate({ root, particles, decay, lifetime, updateParticle, onFinish });
};
