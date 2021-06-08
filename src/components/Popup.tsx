interface IProps {
    children? : any;
    condition : boolean;
    onClose? : () => void;
    canClose? : boolean;
    className? : string;
    style? : any;
}

/* A popup should be used for alerts or blocking processes
The component will take a display condition, close condition, on close function and a list of children
*/
export default function Popup(props : IProps) {
    //If its not active (i.e. condition == false) dont display
    if(props.condition === false) return null;
    return <div>
        <div style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            top: 0,
            left: 0,
            zIndex: 999,
        }} 

        onClick={() => {
            //If it can close, and there is a closing function. Run it
            if((props.canClose == undefined || props.canClose) && props.onClose) {
                props.onClose();
            }
        }}>
        </div>

        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
            ...props.style
        }} className={`bg-white shadow-2xl rounded-lg ${props.className ? props.className : "p-10"}`}>
            {props.children}
        </div>
    </div>;
}