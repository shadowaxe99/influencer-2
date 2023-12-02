import React, { useState } from 'react';

const SketchPad = () => {
  const [drawing, setDrawing] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleMouseDown = (event) => {
    const newLine = {
      points: [{ x: event.clientX, y: event.clientY }],
    };
    setDrawing([...drawing, newLine]);
  };

  const handleMouseMove = (event) => {
    if (drawing.length > 0) {
      const updatedDrawing = [...drawing];
      const currentLine = drawing[drawing.length - 1];
      currentLine.points.push({ x: event.clientX, y: event.clientY });
      updatedDrawing[drawing.length - 1] = currentLine;
      setDrawing(updatedDrawing);
    }
  };

  const handleMouseUp = () => {
    setShowCode(true);
  };

  const generateCode = () => {
    let code = '<html>\n';
    code += '<head>\n';
    code += '<style>\n';
    code += 'body {\n';
    code += '  margin: 0;\n';
    code += '  padding: 0;\n';
    code += '}\n';
    code += '</style>\n';
    code += '</head>\n';
    code += '<body>\n';

    for (const line of drawing) {
      code += '<div style="position: absolute; left: ' + line.points[0].x + 'px; top: ' + line.points[0].y + 'px;">\n';
      code += '<svg width="' + (line.points[line.points.length - 1].x - line.points[0].x) + '" height="' + (line.points[line.points.length - 1].y - line.points[0].y) + '">\n';
      code += '<polyline points="';
      for (const point of line.points) {
        code += (point.x - line.points[0].x) + ',' + (point.y - line.points[0].y) + ' ';
      }
      code += '" style="fill:none;stroke:black;stroke-width:2" />\n';
      code += '</svg>\n';
      code += '</div>\n';
    }

    code += '</body>\n';
    code += '</html>';

    setGeneratedCode(code);
  };

  return (
    <div>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          width: '800px',
          height: '600px',
          border: '1px solid black',
        }}
      />
      {showCode && (
        <div>
          <button onClick={generateCode}>Generate Code</button>
          <textarea value={generatedCode} readOnly rows={10} cols={80} />
        </div>
      )}
    </div>
  );
};

export default SketchPad;