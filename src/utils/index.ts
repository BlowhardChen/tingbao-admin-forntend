/**
 * 设置 css 变量
 * @param prop css 变量名
 * @param val css 变量值
 * @param dom 操作的 dom 元素，默认 document.documentElement
 */
export const setProperty = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val);
};

/**
 *  颜色混合
 *   传入两个颜色值，和混合权重，得到混合后的颜色值
 *   颜色值格式为 #ffffff
 *   权重值范围为 0 - 1
 *   权重值越大，颜色1的占比越大，颜色2的占比越小
 *   权重值越小，颜色1的占比越小，颜色2的占比越大
 *   权重值为 0.5 时，颜色1和颜色2的占比相等
 *   权重值为 0 时，只使用颜色1
 *   权重值为 1 时，只使用颜色2
 *   权重值为 0.1 时，颜色1的占比为 0.1，颜色2的占比为 0.9
 *   权重值为 0.9 时，颜色1的占比为 0.9，颜色2的占比为 0.1
 * @param color1
 * @param color2
 * @param weight
 * @returns
 */
export const mix = (color1: string, color2: string, weight: number = 0.5): string => {
  let color = "#";
  for (let i = 0; i <= 2; i++) {
    const c1 = parseInt(color1.substring(1 + i * 2, 3 + i * 2), 16);
    const c2 = parseInt(color2.substring(1 + i * 2, 3 + i * 2), 16);
    const c = Math.round(c1 * weight + c2 * (1 - weight));
    color += c.toString(16).padStart(2, "0");
  }
  return color;
};
