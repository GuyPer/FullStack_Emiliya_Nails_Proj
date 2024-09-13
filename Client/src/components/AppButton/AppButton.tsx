interface IAppButton {
  content: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  classname?: string;
  fnHandleBtn?: (param?: string | undefined) => void;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  type: "submit" | undefined;
  bootstarpButton?: string;
}

export default function AppButton(props: IAppButton) {
  const handleClickOnBtn = () => {
    if (props.fnHandleBtn) {
      props.fnHandleBtn();
    }
  };

  return (
    <div className="AppButton">
      <button
        onClick={handleClickOnBtn}
        className={`${props.bootstarpButton} ${props.classname}`}
        style={{
          color: props.color,
          backgroundColor: props.backgroundColor,
          width: props.width,
          height: props.height,
          fontFamily: props.fontFamily,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        }}
      >
        {props.content}
      </button>
    </div>
  );
}
