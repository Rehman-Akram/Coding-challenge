// importing fs
const fs = require('fs')

// reading file synchronously
const inputData = JSON.parse(fs.readFileSync('./input/nodes.json', 'utf8'));

// preparing main obj
const mainObj = inputData.reduce((obj, currentValue)=>{
    obj[currentValue.nodeId] = currentValue
    currentValue.children = []
    return obj
},{})

// adding parent and siblings data
inputData.forEach(node=>{
  const parent = mainObj[node.parentId]
  if (parent) {
      mainObj[node.parentId].children.push(node)
      parent.children.splice(node.previousSiblingId ? 
        parent.children.findIndex((child)=>child.nodeId === node.previousSiblingId)+1 : 
        0, 
        node )
  }
})

// getting nodes with no parents
const outputData = inputData.filter(node => !node.parentId);

// Output
const finalOutput = outputData.map(node => mainObj[node.nodeId]);

// Write the tree structure to a JSON file
fs.writeFileSync('./output/assessment-output.json', JSON.stringify(finalOutput, null, 2), 'utf8');

