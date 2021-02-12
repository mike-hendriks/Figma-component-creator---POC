// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

figma.showUI(__html__);

function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

figma.ui.onmessage = async msg => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" }) 
  
  if (msg.type === 'create-input') {
    const inputWidth = 343;
    const inputHeight = 52;

    const nodes: SceneNode[] = [];
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

    const component = figma.createComponent()
    component.resizeWithoutConstraints(rect.width, rect.height);
    for (const child of nodes) {
      component.appendChild(child)
    }
    
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  
  figma.closePlugin();
};