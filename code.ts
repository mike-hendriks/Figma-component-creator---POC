// Show UI file when plugin is loaded
figma.showUI(__html__);

// Catch message from front-end and act accordingly
figma.ui.onmessage = async msg => {

  // Load font first or else you will have a bad time
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" }) 
  
  if (msg.type === 'create-input') {
    // Create global nodes array
    const nodes: SceneNode[] = [];

    // Set component sizes
    const inputWidth = 343;
    const inputHeight = 52;

    // Create rectangle    
    const rect = figma.createRectangle();

    // Style rectangle
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    rect.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    rect.strokeWeight = 2;
    rect.cornerRadius = 4;

    // Resize rectangle
    rect.resizeWithoutConstraints(inputWidth, inputHeight);

    // Create textNode
    const text = figma.createText();
    // Set correct X & Y values
    text.x = 19;
    text.y = 19;
    // Set input from UI as placeholder/value
    text.characters = msg.val;

    // Push items to nodes array
    nodes.push(rect, text);

    // Create component and resize to rectangles' width and height
    const component = figma.createComponent()
    component.resizeWithoutConstraints(rect.width, rect.height);

    // Add the nodes to the component
    for (const child of nodes) {
      component.appendChild(child)
    }
    
    // Add the items to the page
    figma.currentPage.selection = nodes;

    // Scroll to the freshly created component
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};