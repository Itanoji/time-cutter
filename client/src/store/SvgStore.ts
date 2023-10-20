import { Svg } from '@svgdotjs/svg.js';

class SvgStore {
    svgContent = '';

    setSvgContent(svg: Svg) {
        this.svgContent = svg.svg();
    }
}

const svgStore = new SvgStore();

export default svgStore;