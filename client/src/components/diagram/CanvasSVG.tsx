import diagram from '../../store/Diagram';
import {useEffect} from 'react';
import active from '../../store/ActiveElement';
import { observer } from 'mobx-react-lite';
import { BitArea, BitAreaValue, SignalArea } from '../../store/Areas';
import { BitSignal, BusSignal, ClkSignal, Signal, SignalType } from '../../store/Signal';
import { SVG, Svg } from '@svgdotjs/svg.js';
import { sign } from 'crypto';

const CanvasSVG = () => {

    const MIN_INTERVAL = 20;
    const MIN_HEGHT = 20;
    const GRID_PADDING_X = 100;
    const GRID_PADDING_Y = 20;
    const SIGNAL_PADDING = 20;
    const DELAY = 7;
    

    const BASIC_STEP = diagram.gridInterval+MIN_INTERVAL;
    const BASIC_HEIGHT = diagram.signalHeight + MIN_HEGHT;


    const createSvg = () => {
        const diagramWidth = diagram.gridSteps*BASIC_STEP + GRID_PADDING_X-1;
        const diagramHeight = (BASIC_HEIGHT+SIGNAL_PADDING)*diagram.signals.length + GRID_PADDING_Y;
        const svg = SVG().size(diagramWidth, diagramHeight);
        if(diagram.showGrid) {
            drawGrid(svg);
        }

        drawSignals(svg);
        drawEdit(svg);
        return svg;
    }
    
    useEffect(() => {
        const svg = createSvg();
        // Вставка созданной SVG разметки в div с id "svg-container"
        const svgContainer = document.getElementById("svg-container");
        if (svgContainer) {
            while (svgContainer.firstChild) {
                svgContainer.removeChild(svgContainer.firstChild);
            }
            svgContainer.appendChild(svg.node);
        }
      },[createSvg()]);
    


    
    return (
        <div id="svg-container">
        </div>
    );


    //Отрисовка сетки
    function drawGrid(svg: Svg) {
        const group = svg.group();
        for(let i = 0; i < diagram.gridSteps; i++) {
            const line = svg.line(i*BASIC_STEP + GRID_PADDING_X 
                                    ,GRID_PADDING_Y
                                    ,i*BASIC_STEP + GRID_PADDING_X
                                    ,(BASIC_HEIGHT+ SIGNAL_PADDING)*diagram.signals.length + GRID_PADDING_Y)
                                 .stroke({color: 'gray', width:1, dasharray: '5,5'});
            group.add(line);
        }
        svg.add(group);
    }

    //Отрисовать сигналы
    function drawSignals(svg: Svg) {
        const basicY = BASIC_HEIGHT+SIGNAL_PADDING;
        const padding = GRID_PADDING_Y + 10;
        diagram.signals.forEach((s, index) => {
            const y = index * basicY + padding;
            svg.add(drawSignalName(svg, s, y, index));
            if(s.type === SignalType.BIT) {
                return drawBitSignal(svg, y, s as BitSignal);
            } else if(s.type === SignalType.CLK) {
                return drawClkSignal(svg, y, s as ClkSignal);
            } else if(s.type === SignalType.BUS) {
               return drawBusSignal(svg, y, s as BusSignal);
            }

        });
    }

    //Отрисовать название сигнала
    function drawSignalName(svg:Svg, s: Signal, y: number, index: number) {
        return svg.text(s.name)
                    .move(GRID_PADDING_X - 10, y + diagram.signalHeight/2)
                    .font({anchor:'end',weight:'bold'})
                    .dy('hanging')
                    .fill(s.color)
                    .addClass('cursor-pointer hover:underline')
                    .on('click',()=> {
                        console.log('aboba');
                        active.setActiveSignal(index);
                    });
    }
 
    //Отрисовать битовый сигнал
     function drawBitSignal(svg: Svg, startY: number, s: BitSignal) {
         let x = GRID_PADDING_X;
         let prev : BitAreaValue;
         let bitPath = ``;
         s.areas.forEach((a, index) => {
             bitPath+=drawBitArea(svg, prev, x, startY, a, s.basicAreaLength); 
             x+=a.length * (diagram.gridInterval+MIN_INTERVAL);
             prev = a.value;
         })
         const path = svg.path(bitPath).fill('none').stroke({color: s.color, width: 2});
         svg.add(path);
     }
 
     //Отрисовать битовую область
     function drawBitArea(svg: Svg, prev: BitAreaValue, x: number, y:number, area: BitArea, basicAreaLength: number) {
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

         //Добавляем штриховку
         if(area.value === BitAreaValue.UNKNOW) {
             // создаем шаблон заполнения штриховкой
             const pattern = svg.pattern(10, 10, function(add) {
                add.line(0, 5, 10, 5).stroke({ width: 1, color: 'black' }); // рисуем линию внутри шаблона
            }).attr({
                viewBox: '0 0 10 10', // устанавливаем координаты viewBox для шаблона
                fill: 'none', // устанавливаем заполнение шаблона как пустое
                patternTransform: 'rotate(45)' // устанавливаем угол наклона шаблона
            });

            let hatPath = ``;
            if(area.value === prev || prev === BitAreaValue.HIGH || prev == null) {
                hatPath += `M ${x} ${y}`;
            }

            if(prev === BitAreaValue.LOW) {
                hatPath+= `M ${x} ${y+BASIC_HEIGHT} L ${x+DELAY} ${y}`;
            } else if(prev === BitAreaValue.Z) {
                hatPath+= `M ${x} ${y+BASIC_HEIGHT/2} L ${x+DELAY} ${y}`;
            }

            hatPath+= ` H ${x+area.length * BASIC_STEP} V ${y+BASIC_HEIGHT} H ${x}`;

            if(prev === area.value || prev == null) {
                hatPath+=` V ${y}`;
            } else if(prev === BitAreaValue.Z) {
                hatPath+= `V ${y+BASIC_HEIGHT/2}`;
            }

           const path = svg.path(hatPath).fill(pattern).stroke('none');
           svg.add(path);
         }
         
         //Рисуем линию
         areaPath+= ` H ${x+area.length * (diagram.gridInterval+MIN_INTERVAL)}`;
         return areaPath;
     }
 
     function drawClkSignal(svg: Svg, startY: number, s: ClkSignal) {
         let x = GRID_PADDING_X;
         let prev : BitAreaValue;
         let bitPath = ``;
         s.areas.forEach((a, index) => {
             bitPath+=drawClkArea(svg, prev, x, startY, a, s.basicAreaLength); 
             x+=a.length * (diagram.gridInterval+MIN_INTERVAL);
             prev = a.value;
         })
         const path = svg.path(bitPath).fill('none').stroke({color: s.color, width: 2});
         svg.add(path);
     }
 
     function drawClkArea(svg: Svg, prev: BitAreaValue, x: number, y:number, area: BitArea, basicAreaLength: number) {
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

         //Добавляем штриховку
         if(area.value === BitAreaValue.UNKNOW) {
            // создаем шаблон заполнения штриховкой
            const pattern = svg.pattern(10, 10, function(add) {
               add.line(0, 5, 10, 5).stroke({ width: 1, color: 'black' }); // рисуем линию внутри шаблона
           }).attr({
               viewBox: '0 0 10 10', // устанавливаем координаты viewBox для шаблона
               fill: 'none', // устанавливаем заполнение шаблона как пустое
               patternTransform: 'rotate(45)' // устанавливаем угол наклона шаблона
           });
           let hatPath = `M ${x} ${y} H ${x+area.length * BASIC_STEP} V ${y+BASIC_HEIGHT} H ${x} V ${y}`;
           const path = svg.path(hatPath).fill(pattern).stroke('none');
           svg.add(path);
        }
         
         //Рисуем линию
         areaPath+= ` H ${x+area.length * (diagram.gridInterval+MIN_INTERVAL)}`;
         return areaPath;
     }

    //Отрисовка шины
    function drawBusSignal(svg: Svg, y: number, s: BusSignal) {
        let x = GRID_PADDING_X;
        const pattern = svg.pattern(10, 10, function(add) {
            add.line(0, 5, 10, 5).stroke({ width: 1, color: 'black' }); // рисуем линию внутри шаблона
        }).attr({
            viewBox: '0 0 10 10', // устанавливаем координаты viewBox для шаблона
            fill: 'none', // устанавливаем заполнение шаблона как пустое
            patternTransform: 'rotate(45)' // устанавливаем угол наклона шаблона
        });

        s.areas.forEach((a, index) => {
            let path = ``;
            if(index === 0) {
                path += `M ${x} ${y}`;
            } else {
                path += `M ${x+DELAY/2} ${y+BASIC_HEIGHT/2} L ${x+DELAY} ${y}`;
            }
            path += ` H ${x+a.length*BASIC_STEP}`;
            if(s.areas.length-1 > index && index !== 0) {
                path += ` L ${x+a.length*BASIC_STEP + DELAY/2} ${y+BASIC_HEIGHT/2} L ${x+a.length*BASIC_STEP} ${y+BASIC_HEIGHT} H ${x+DELAY} L ${x+DELAY/2} ${y+BASIC_HEIGHT/2}`
            }
            if(s.areas.length-1 > index && index === 0) {
                path += ` L ${x+a.length*BASIC_STEP + DELAY/2} ${y+BASIC_HEIGHT/2} L ${x+a.length*BASIC_STEP} ${y+BASIC_HEIGHT} H ${x}`;
            }
            if(s.areas.length-1 === index && index !== 0) {
                path += ` M ${x+a.length*BASIC_STEP} ${y+BASIC_HEIGHT} H ${x+DELAY} L ${x+DELAY/2} ${y+BASIC_HEIGHT/2}`;
            }
            if(s.areas.length-1 === index && index === 0) {
                path += ` M ${x+a.length*BASIC_STEP} ${y+BASIC_HEIGHT} H ${x}`;
            }

            const line = svg.path(path)
                        .stroke({color: s.color,width:2 }) // Устанавливаем цвет обводки
                        .fill('none') // Устанавливаем цвет заливки

            if(index === 0 && s.areas.length === 1) {
                const fill = svg.rect(a.length*BASIC_STEP, BASIC_HEIGHT)
                                .move(x,y)
                                .stroke('none')
                                .fill(a.fillColor)
                                .opacity(0.3);
                if(a.hatching) {
                    fill.fill(pattern).opacity(1);
                }
                svg.add(fill);
            } else if(index !== s.areas.length - 1) {
                const fill = svg.path(path)
                                .stroke('none') // Устанавливаем цвет обводки
                                .fill(a.fillColor) // Устанавливаем цвет заливки
                                .opacity(0.3); // Устанавливаем прозрачность заливки
                if(a.hatching) {
                    fill.fill(pattern).opacity(1);
                }
                svg.add(fill);
            } else {
                let fillPath = ` M ${x + DELAY/2} ${y+BASIC_HEIGHT/2} L ${x+DELAY} ${y} H ${x+a.length*BASIC_STEP} V ${y+BASIC_HEIGHT} H ${x+DELAY} L ${x+DELAY/2} ${y+BASIC_HEIGHT/2}`;
                const fill = svg.path(fillPath)
                                .stroke('none') // Устанавливаем цвет обводки
                                .fill(a.fillColor) // Устанавливаем цвет заливки
                                .opacity(0.3);// Устанавливаем прозрачность заливки
                if(a.hatching) {
                    fill.fill(pattern).opacity(1);
                }
                svg.add(fill);
            }

            svg.add(line);

            //Добавляем текст
            if(a.value !== null) {
                let fontSize = 15;
                let localDelay = 0;
                if(index > 0) {
                    localDelay += DELAY;
                }
                const text = svg.text(a.value)
                                .move(x+(localDelay+ a.length*BASIC_STEP)/2, y+BASIC_HEIGHT/4)
                                .font({ family: 'Arial', size: 15, anchor: 'middle', weight: 900})
                                .fill("black")
                                .attr({ 'text-anchor': 'middle'});
                while(text.length() > a.length*BASIC_STEP) {
                    fontSize--;
                    text.size(fontSize);
                }
            }


            x+=a.length * BASIC_STEP;

        })
    }


    //Отрисовка для редактирования
    function drawEdit(svg: Svg) {
        const basicY = BASIC_HEIGHT+SIGNAL_PADDING;
        const padding = GRID_PADDING_Y + 10;
        diagram.signals.forEach((signal, index) => {
            const y = index * basicY + padding;
            let x = GRID_PADDING_X;
            
            //Рисуем верхние и нижние линии для рисования битовых сигналов
            if(signal.type != SignalType.BUS) {
                signal.areas.forEach((area, areaIndex) => {
                    //Рисуем линию сверху
                    drawEditLine(svg, index, areaIndex, area, x, y, BitAreaValue.HIGH);
                    //Рисуем линию снизу
                    drawEditLine(svg, index, areaIndex, area, x, y+BASIC_HEIGHT, BitAreaValue.LOW);
                     x+=area.length*BASIC_STEP;
                });
                //Рисуем для след области
                 //Рисуем линию сверху
                 drawEditLineNew(svg, index, signal, x, y, BitAreaValue.HIGH);
                 //Рисуем линию снизу
                 drawEditLineNew(svg, index, signal, x, y+BASIC_HEIGHT, BitAreaValue.LOW);
            }

            x = GRID_PADDING_X;
            //Рисуем области для выбора
            signal.areas.forEach((area, areaIndex) => {
                let editRect = svg.rect(area.length*BASIC_STEP,BASIC_HEIGHT)
                                  .move(x, y)
                                  .fill('#CCE5FF')
                                  .stroke({width:1, color: 'black'})
                                  .attr({cursor: 'pointer'})
                                  .opacity(0);
                editRect.on('mouseover', () => {
                    if(active.signalIndex != index || active.areas === undefined || active.areas?.indexOf(areaIndex) === -1) {
                        editRect.opacity(0.5);
                    }
                });
                editRect.on('mouseout', () => {
                    if(active.signalIndex != index || active.areas === undefined ||active.areas?.indexOf(areaIndex) === -1) {
                        editRect.opacity(0);
                    }
                })
                editRect.on('click', () => {
                    if(active.signalIndex != index || active.areas === undefined ||active.areas?.indexOf(areaIndex) === -1) {
                        active.setAreaToActive(index, areaIndex);
                    }
                })

                if(active.signalIndex === index && active.areas !== undefined && active.areas?.indexOf(areaIndex) !== -1) {
                    editRect.opacity(0.7);
                }

                editRect.on('contextmenu', (e:any) => {
                    e.preventDefault();
                    addCustomContextMenu(svg, x, y);
                });
                svg.add(editRect);
                x+=area.length * BASIC_STEP                  
            })
        })
    }

    function drawEditLine(svg: Svg, signalIndex: number, areaIndex: number, area: SignalArea, x: number, y: number, setValue: BitAreaValue) {
        //Рисуем саму линию для отображения
        let upperLine = svg.line(x, y, x+area.length*BASIC_STEP, y)
        .stroke({width: 1, color: 'black'})
        .opacity(0)
        //Хитбокс для линии
        let upperClick = svg.line(x,y,x+area.length*BASIC_STEP, y)
        .stroke({width:8, color: 'black'})
        .opacity(0)
        .attr('cursor', 'pointer')
        .on('mouseover', () => {
            upperLine.opacity(1);
        })
        .on('mouseout', () => {
            upperLine.opacity(0);
        })
        .on('click', () => {
            diagram.changeBitAreaValue(signalIndex, areaIndex, setValue);
        })
    }

    function drawEditLineNew(svg: Svg, signalIndex: number, signal: Signal, x: number, y: number, setValue: BitAreaValue) {
        //Рисуем саму линию для отображения
        let upperLine = svg.line(x, y, x+signal.basicAreaLength*BASIC_STEP, y)
        .stroke({width: 1, color: 'black'})
        .opacity(0)
        //Хитбокс для линии
        let upperClick = svg.line(x,y,x+signal.basicAreaLength*BASIC_STEP, y)
        .stroke({width:8, color: 'black'})
        .opacity(0)
        .attr('cursor', 'pointer')
        .on('mouseover', () => {
            upperLine.opacity(1);
        })
        .on('mouseout', () => {
            upperLine.opacity(0);
        })
        .on('click', () => {
            const newArea = new BitArea(signal.basicAreaLength, setValue);
            diagram.addAreaToSignal(signalIndex, newArea);
        })
    }

    function addCustomContextMenu(svg: Svg, x: number, y: number) {
        const customContextMenu = svg.group();

        // Добавьте пункты меню
        customContextMenu.rect(60, 60).move(x,y).stroke({width:1, color: 'black'}).fill('none');
    }

   
}

export default observer(CanvasSVG);