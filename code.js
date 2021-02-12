// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
function clone(val) {
    return JSON.parse(JSON.stringify(val));
}
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //   const nodes: SceneNode[] = [];
    //   for (let i = 0; i < msg.count; i++) {
    //     const rect = figma.createRectangle();
    //     rect.x = i * 150;
    //     rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //     figma.currentPage.appendChild(rect);
    //     nodes.push(rect);
    //   }
    //   figma.currentPage.selection = nodes;
    //   figma.viewport.scrollAndZoomIntoView(nodes);
    // }
    if (msg.type === 'create-input') {
        const inputWidth = 343;
        const inputHeight = 52;
        const nodes = [];
        const rect = figma.createRectangle();
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        rect.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
        rect.strokeWeight = 2;
        rect.cornerRadius = 4;
        rect.resizeWithoutConstraints(inputWidth, inputHeight);
        nodes.push(rect);
        const text = figma.createText();
        text.characters = msg.val;
        text.x = 19;
        text.y = 19;
        nodes.push(text);
        console.log(rect);
        const component = figma.createComponent();
        component.resizeWithoutConstraints(rect.width, rect.height);
        for (const child of nodes) {
            component.appendChild(child);
        }
        // figma.currentPage.appendChild(rect);
        // }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
});
// function turnFrameIntoComponent() {
//   const selection: SceneNode = figma.currentPage.selection[0]
//   if (!selection) { return }
//   const component = figma.createComponent()
//   component.x = selection.x
//   component.y = selection.y
//   component.resize(selection.width, selection.height)
//   // Copy children into new node
//   for (const child of selection.children) {
//     component.appendChild(child)
//   }
//   selection.remove()
// }
