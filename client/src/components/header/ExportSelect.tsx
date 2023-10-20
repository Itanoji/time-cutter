import { observer } from "mobx-react-lite";
import svgStore from "../../store/SvgStore";
import diagram from "../../store/Diagram";
import { toPng, toJpeg } from 'html-to-image';
const ExportSelect = () => {

    const handleExport = (format: string) => {
        if(!svgStore.svgContent) return;
        const svgData = svgStore.svgContent;
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        if(format === 'svg') {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${diagram.name}.svg`;
            a.click();
        } else if(format !== 'json') {
            downloadImg(format);
        } else {
            const json = JSON.stringify(diagram, null, 2); // null, 2 - для красивого форматирования JSON
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
          
            const a = document.createElement('a');
            a.href = url;
            a.download = `${diagram.name}.json`;
            a.style.display = 'none';
            a.click();
          
            window.URL.revokeObjectURL(url);
        }
    }

    const downloadImg = async (format: string) => {
        const parser = new DOMParser();
        const el = parser.parseFromString(svgStore.svgContent, 'image/svg+xml').documentElement;
        document.body.appendChild(el);
        switch (format) {
            case 'png':
                {
                    const pngDataUrl = await toPng(el);
                    const link = document.createElement('a');
                    link.download = `${diagram.name}.png`;
                    link.href = pngDataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;
                }
            case 'jpeg':
                {
                    const jpegDataUrl = await toJpeg(el, {backgroundColor: '#ffffff' });
                    const link = document.createElement('a');
                    link.download = `${diagram.name}.jpeg`;
                    link.href = jpegDataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;
                }
        }
        document.body.removeChild(el);   
    }

    

    return (
        <div className="absolute w-22 bg-white border border-gray-300 shadow-md rounded-lg left-28 top-12">
                <ul>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-t-lg"  onClick={()=>handleExport('json')}>
                        JSON
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100"  onClick={()=>handleExport('png')}>
                        PNG
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={()=>handleExport('jpeg')}>
                        JPEG
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-b-lg" onClick={()=>handleExport('svg')}>
                        SVG
                    </li>
                </ul>
        </div>
    );
}

export default observer(ExportSelect);