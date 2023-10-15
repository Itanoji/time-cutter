import diagram from '../../store/Diagram';
import active from '../../store/ActiveElement';
import { observer } from 'mobx-react-lite';
import { BitArea, BitAreaValue } from '../../store/Areas';
import { BitSignal, BusSignal, ClkSignal, SignalType } from '../../store/Signal';

const Canvas = () => {

    const MIN_INTERVAL = 20;
    const MIN_HEGHT = 20;
    const GRID_PADDING_X = 100;
    const GRID_PADDING_Y = 20;
    const SIGNAL_PADDING = 20;
    const DELAY = 5;

    const basicStep = diagram.gridInterval+MIN_INTERVAL;
    const basicHeight = diagram.signalHeight + MIN_HEGHT;
    


    
    return (
        <svg width={diagram.gridSteps*(diagram.gridInterval+MIN_INTERVAL) + GRID_PADDING_X-1} height={(diagram.signalHeight+MIN_HEGHT+SIGNAL_PADDING)*diagram.signals.length + GRID_PADDING_Y}>
           {diagram.showGrid? drawGrid() : ''}
           {drawSignalNames()}
           {drawSignals()}
        </svg>
    );

    //Отрисовка сетки
    function drawGrid() {
        return Array.from({length: diagram.gridSteps}).map((it, index) => 
            <line key={index} x1={index*(diagram.gridInterval+MIN_INTERVAL)+GRID_PADDING_X}
              x2={index*(diagram.gridInterval+MIN_INTERVAL)+GRID_PADDING_X}
              y1={GRID_PADDING_Y}
              y2={(diagram.signalHeight+MIN_HEGHT + SIGNAL_PADDING)*diagram.signals.length + GRID_PADDING_Y}
              stroke='gray'
              stroke-width={1}
              strokeDasharray="5,5"
            />
        )
    }

    //отрисовка имён
    function drawSignalNames() {
       return diagram.signals.map((s,index) => {
            const x = GRID_PADDING_X - 10;
            const y = (diagram.signalHeight+MIN_HEGHT+SIGNAL_PADDING) * (index) + diagram.signalHeight/2+ GRID_PADDING_Y + 10;
            return <text x={x} y={y} 
                        textAnchor='end' 
                        dominantBaseline={'hanging'} 
                        fontWeight={'bold'} 
                        fill={s.color}
                        className={"cursor-pointer hover:underline"}
                        onClick={()=>active.setActiveSignal(index)}>
                            {s.name}
                    </text>;
        })
    }

    function drawSignals() {
       return diagram.signals.map((s, index) => {
            const startY = index * (diagram.signalHeight+MIN_HEGHT+SIGNAL_PADDING) + GRID_PADDING_Y + 10;
            if(s.type === SignalType.BIT) {
                return drawBitSignal(startY, s as BitSignal);
            } else if(s.type === SignalType.CLK) {
                return drawClkSignal(startY, s as ClkSignal);
            } else if(s.type === SignalType.BUS) {
               return drawBusSignal(startY, s as BusSignal);
            }

        })
    }

    function drawBitSignal(startY: number, s: BitSignal) {
        let x = GRID_PADDING_X;
        let prev : BitAreaValue;
        let bitPath = ``;
        s.areas.map((a, index) => {
            bitPath+=drawBitArea(prev, x, startY, a, s.basicAreaLength); 
            x+=a.length * (diagram.gridInterval+MIN_INTERVAL);
            prev = a.value;
        })

        return <path d={bitPath} stroke={s.color} fill="none" stroke-width={2}/>
    }

    function drawBitArea(prev: BitAreaValue, x: number, y:number, area: BitArea, basicAreaLength: number) {
        let areaPath = ``;
        if(prev == null) {
             if(area.value === BitAreaValue.HIGH || BitAreaValue.UNKNOW) {
                areaPath += `M ${x} ${y}`;
             } else if(area.value === BitAreaValue.LOW) {
                areaPath += `M ${x} ${y+diagram.signalHeight + MIN_HEGHT}`;
             } else if(area.value === BitAreaValue.Z) {
                areaPath += `M ${x} ${y + (diagram.signalHeight + MIN_HEGHT)/2}`;
             }
        } else { //Рисуем задержку
            if(area.value !== prev) {
               if(area.value === BitAreaValue.HIGH || area.value === BitAreaValue.UNKNOW) {
                areaPath+= ` L ${x+DELAY} ${y}`;
               } else if(area.value === BitAreaValue.LOW) {
                    areaPath+= ` L ${x+DELAY} ${y + diagram.signalHeight + MIN_HEGHT}`;
               } else if(area.value === BitAreaValue.Z) {
                    areaPath+= ` L ${x+DELAY} ${y + (diagram.signalHeight + MIN_HEGHT)/2}`;
               }
            }
        }
        if(area.value === BitAreaValue.UNKNOW) {
            
        }
        
        //Рисуем линию
        areaPath+= ` H ${x+area.length * (diagram.gridInterval+MIN_INTERVAL)}`;
        return areaPath;
    }

    function drawClkSignal(startY: number, s: ClkSignal) {
        let x = GRID_PADDING_X;
        let prev : BitAreaValue;
        let bitPath = ``;
        s.areas.map((a, index) => {
            bitPath+=drawClkArea(prev, x, startY, a, s.basicAreaLength); 
            x+=a.length * (diagram.gridInterval+MIN_INTERVAL);
            prev = a.value;
        })

        return <path d={bitPath} stroke={s.color} fill="none" stroke-width={2}/>
    }

    function drawClkArea(prev: BitAreaValue, x: number, y:number, area: BitArea, basicAreaLength: number) {
        let areaPath = ``;
        if(prev == null) {
             if(area.value === BitAreaValue.HIGH || BitAreaValue.UNKNOW) {
                areaPath += `M ${x} ${y}`;
             } else if(area.value === BitAreaValue.LOW) {
                areaPath += `M ${x} ${y+diagram.signalHeight + MIN_HEGHT}`;
             } else if(area.value === BitAreaValue.Z) {
                areaPath += `M ${x} ${y + (diagram.signalHeight + MIN_HEGHT)/2}`;
             }
        } else { //Рисуем переход
            if(area.value !== prev) {
               if(area.value === BitAreaValue.HIGH || area.value === BitAreaValue.UNKNOW) {
                areaPath+= ` L ${x} ${y}`;
               } else if(area.value === BitAreaValue.LOW) {
                    areaPath+= ` L ${x} ${y + diagram.signalHeight + MIN_HEGHT}`;
               } else if(area.value === BitAreaValue.Z) {
                    areaPath+= ` L ${x} ${y + (diagram.signalHeight + MIN_HEGHT)/2}`;
               }
            }
        }
        
        //Рисуем линию
        areaPath+= ` H ${x+area.length * (diagram.gridInterval+MIN_INTERVAL)}`;
        return areaPath;
    }

    function drawBusSignal(y: number, s: BusSignal) {
        let x = GRID_PADDING_X;
        return (<g>{
            s.areas.map((a,index) => {
                let path = ``;
                let res = ``;
                if(index === 0) {
                    res = `<g><line stroke={s.color} fill="none" stroke-width={2} x1={x} x2={x+a.length*(diagram.gridInterval+MIN_INTERVAL)} y1={y} y2={y}/>
                              <line stroke={s.color} fill="none" stroke-width={2} x1={x} x2={x+a.length*(diagram.gridInterval+MIN_INTERVAL)} y1={y+diagram.signalHeight + MIN_HEGHT} y2={y+diagram.signalHeight + MIN_HEGHT}/>
                              <rect fill={a.fillColor} fill-opacity="0.3" stroke="none" x={x} width={a.length*(diagram.gridInterval+MIN_INTERVAL)} y={y} height={diagram.signalHeight + MIN_HEGHT}/> 
                            </g>`;
                }
                else {
                    res = `<g>
                            <line stroke={s.color} fill="none" stroke-width={2} x1={x} y1={y} x2={x+DELAY/2} y2={y + (diagram.signalHeight + MIN_HEGHT)/2}/>
                            <line stroke={s.color} fill="none" stroke-width={2} x1={x} y1={y + diagram.signalHeight + MIN_HEGHT} x2={x+DELAY/2} y2={y + (diagram.signalHeight + MIN_HEGHT)/2} />
                            <path stroke={s.color} fill={a.fillColor} fill-opacity="0.3"stroke-width={2} d={"M ${x+DELAY/2} ${y + (diagram.signalHeight + MIN_HEGHT)/2} L ${x+DELAY} ${y} H ${x+DELAY+ a.length*basicStep} M ${x+DELAY/2} ${y + (diagram.signalHeight + MIN_HEGHT)/2} L ${x+DELAY} ${y + basicHeight} H ${x+DELAY+ a.length*basicStep}"}
                          </g>`
                }
                return res;
            })
            }

            </g>);
    }

}

export default observer(Canvas);