export function drawGapMark(svg, x, y, height) {
    height+= 15;
    const waveWidth = 15;
    const sDistance = 6;
    x-=waveWidth/2;

    let wavePath = `M ${x} ${y+height/2} C ${x + waveWidth/2} ${y+height/2} ${x + waveWidth/2} ${y - height/2} ${x+waveWidth},${y - height/2}`;
    svg.path(wavePath)
        .fill('none')
        .stroke({ width: 1, color: 'black' });
    x+=sDistance
    wavePath =  `M ${x} ${y+height/2} C ${x + waveWidth/2} ${y+height/2} ${x + waveWidth/2} ${y - height/2} ${x+waveWidth},${y - height/2}`;
    svg.path(wavePath)
        .fill('none')
        .stroke({ width: 1, color: 'black' });
}