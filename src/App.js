import React from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [components, setComponents] = React.useState([
    // Default company component
    {
      id: 'our-company',
      text: '🚀 Our Company',
      color: '#fde68a', // yellow
      isDefault: true
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [xAxisTitle, setXAxisTitle] = React.useState('X Axis');
  const [yAxisTitle, setYAxisTitle] = React.useState('Y Axis');
  const [newXAxisTitle, setNewXAxisTitle] = React.useState('');
  const [newYAxisTitle, setNewYAxisTitle] = React.useState('');
  const captureRef = React.useRef(null);

  const colors = [
    '#bfdbfe', '#bbf7d0', '#fecaca', '#fed7aa', 
    '#e9d5ff', '#ddd6fe', '#99f6e4'  // Removed yellow as it's used for default component
  ];

  const addComponent = () => {
    if (inputText.trim()) {
      const colorIndex = components.length % colors.length;
      setComponents([...components, { 
        id: Date.now(), 
        text: inputText,
        color: colors[colorIndex],
        isDefault: false
      }]);
      setInputText('');
    }
  };

  const updateXAxis = () => {
    if (newXAxisTitle.trim()) {
      setXAxisTitle(newXAxisTitle);
      setNewXAxisTitle('');
      toast.success('X-axis title updated!');
    }
  };

  const updateYAxis = () => {
    if (newYAxisTitle.trim()) {
      setYAxisTitle(newYAxisTitle);
      setNewYAxisTitle('');
      toast.success('Y-axis title updated!');
    }
  };

  const deleteComponent = (id) => {
    setComponents(components.filter(comp => !comp.isDefault && comp.id !== id));
  };

  const captureScreen = async () => {
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#f3f4f6',
        windowWidth: captureRef.current.scrollWidth + 200,
        windowHeight: captureRef.current.scrollHeight + 200,
        x: -100,
        y: -20,
        width: captureRef.current.scrollWidth + 200,
        height: captureRef.current.scrollHeight + 40,
        logging: false,
      });
      
      canvas.toBlob(async (blob) => {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        toast.success('Screenshot copied to clipboard!');
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to capture screenshot');
    }
  };

  return (
    <div className="app-container" style={{ padding: '40px' }}>
      <Toaster position="top-right" />
      
      {/* Axis Title Inputs */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newYAxisTitle}
            onChange={(e) => setNewYAxisTitle(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '150px' }}
            placeholder="Enter Y-axis name"
          />
          <button
            onClick={updateYAxis}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update Y-axis
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newXAxisTitle}
            onChange={(e) => setNewXAxisTitle(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '150px' }}
            placeholder="Enter X-axis name"
          />
          <button
            onClick={updateXAxis}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update X-axis
          </button>
        </div>
      </div>

      {/* Component Input */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addComponent()}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
          placeholder="Enter competitor name"
        />
        <button
          onClick={addComponent}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Competitor
        </button>
        <button
          onClick={captureScreen}
          style={{
            padding: '8px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          📸 Capture Matrix
        </button>
      </div>

      <div className="matrix-container" ref={captureRef} style={{ position: 'relative', margin: '60px 100px 80px 100px' }}>
        {/* Y-axis label container with fixed width */}
        <div style={{ 
          position: 'absolute', 
          left: '-100px', 
          top: '50%',
          width: '200px',  // Fixed width container
          height: '40px',  // Fixed height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'rotate(-90deg) translateX(50%)',
          transformOrigin: 'right center'
        }}>
          <div style={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {yAxisTitle}
          </div>
        </div>
        
        {/* Y-axis values */}
        <div style={{ position: 'absolute', left: '-45px', top: '0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span>High</span>
          <span>Medium</span>
          <span>Low</span>
        </div>

        {/* X-axis label */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-60px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          fontWeight: 'bold'
        }}>
          {xAxisTitle}
        </div>

        {/* X-axis values */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-35px', 
          left: '0', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between',
        }}>
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '600px',
          border: '2px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
        }}>
          {/* Grid without quadrant labels */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            pointerEvents: 'none'
          }}>
            <div style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' }}></div>
            <div style={{ borderBottom: '1px solid #ccc' }}></div>
            <div style={{ borderRight: '1px solid #ccc' }}></div>
            <div></div>
          </div>

          {components.map(comp => (
            <Draggable key={comp.id} bounds="parent" defaultPosition={comp.isDefault ? { x: 280, y: 280 } : { x: 10, y: 10 }}>
              <div style={{
                position: 'absolute',
                padding: '12px',
                backgroundColor: comp.color,
                borderRadius: '4px',
                cursor: 'move',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {comp.text}
                {!comp.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteComponent(comp.id);
                    }}
                    className="delete-button"
                    style={{
                      padding: '2px 6px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;