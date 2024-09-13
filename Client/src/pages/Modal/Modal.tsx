import "./Modal.css";

interface IModalProps {
  isVisible: boolean;
  whatToDelete: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal(props: IModalProps) {
  if (!props.isVisible) return null;

  return (
    <div className="Modal">
      <div className="modalContent">
        <h2>האם אתה בטוח?</h2>
        <p>האם אתה בטוח שברצונך למחוק את ה{props.whatToDelete}?</p>
        <div className="modalButtons">
          <button className="btn btn-danger" onClick={props.onConfirm}>
            כן, מחק
          </button>
          <button className="btn btn-secondary" onClick={props.onClose}>
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}
