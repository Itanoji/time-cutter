interface ContextMenuProps {
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
    onAddRight: () => void;
    onAddLeft: () => void;
    onDelete: () => void;
  }

const AreaContextMenu = ({ x, y, isOpen, onClose, onAddRight, onAddLeft, onDelete }:ContextMenuProps) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className={"absolute flex flex-col bg-slate-50 p-2 rounded-lg border-2 border-indigo-600 shadow-lg"} style={{ left: x, top: y }}>
        <button className={"rounded-lg hover:bg-slate-200 w-24"}onClick={onAddRight}>Insert right</button>
        <button className={"rounded-lg hover:bg-slate-200 w-24"} onClick={onAddLeft}>Insert left</button>
        <button className={"rounded-lg hover:bg-slate-200 w-24"} onClick={onDelete}>Remove</button>
      </div>
    );
  };

  export default AreaContextMenu;
  