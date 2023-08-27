import diagram from '../../store/Diagram';
import active from '../../store/ActiveElement';
import { observer } from 'mobx-react-lite';

const Canvas = () => {

    const MIN_INTERVAL = 20;
    const MIN_HEGHT = 20;
    const GRID_PADDING_X = 100;
    const GRID_PADDING_Y = 20;

    
    return (
        <svg width={diagram.gridSteps*(diagram.gridInterval+MIN_INTERVAL) + GRID_PADDING_X} height={(diagram.signalHeight+MIN_HEGHT)*diagram.signals.length + GRID_PADDING_Y}>
           {diagram.showGrid? drawGrid() : ''}
           {drawSignalNames()}
        </svg>
    );

    //Отрисовка сетки
    function drawGrid() {
        return Array.from({length: diagram.gridSteps}).map((it, index) => 
            <line key={index} x1={index*(diagram.gridInterval+MIN_INTERVAL)+GRID_PADDING_X}
              x2={index*(diagram.gridInterval+MIN_INTERVAL)+GRID_PADDING_X}
              y1={GRID_PADDING_Y}
              y2={(diagram.signalHeight+MIN_HEGHT)*diagram.signals.length + GRID_PADDING_Y}
              stroke='black'
              strokeDasharray="5,5"
            />
        )
    }

    //отрисовка имён
    function drawSignalNames() {
       return diagram.signals.map((s,index) => {
            const x = GRID_PADDING_X - 10;
            const y = (diagram.signalHeight+MIN_HEGHT) * (index) + GRID_PADDING_Y;
            return <text x={x} y={y} 
                        textAnchor='end' 
                        dominantBaseline={'hanging'} 
                        fontWeight={'bold'} 
                        fill="blue"
                        className={"cursor-pointer hover:underline"}
                        onClick={()=>active.setActiveSignal(index)}>
                            {s.name}
                    </text>;
        })
    }

}

export default observer(Canvas);