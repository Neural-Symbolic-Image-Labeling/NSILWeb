import { Tool } from "../Tool";

export class DeleteTool extends Tool { 
    name = "DeleteTool";

    configureCanvas = (props) => { 
        console.log('DeleteTool.configureCanvas');

        let canvas = this.fbCanvas;
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.forEachObject(obj => {
            obj.set('selectable', true );
            obj.set('evented', true);
            obj.set('hasControls', true);
            console.log(obj);
            // obj.selectable = true;
            // obj.evented = true;
        });
        canvas.remove(canvas.getActiveObject());
        canvas.renderAll();
    }

    onMouseDown = (e) => { console.log("SelectedTool.onMouseDown"); }
    
    onMouseMove = (e) => { console.log("SelectedTool.onMouseMove"); }

    onMouseUp = (e) => { console.log("SelectedTool.onMouseUp"); }

    onMouseLeave = (e) => { console.log("SelectedTool.onMouseLeave"); }
}