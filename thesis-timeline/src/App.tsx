import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Edit3, Move, Plus, Trash2, Download, RotateCcw, BookOpen, X, Save, ZoomIn, ZoomOut } from 'lucide-react';

const ScatteredThesisTimeline = () => {
  const [tasks, setTasks] = useState([
    // Chapter 1
    { id: 1, title: "Bioacústica - Más allá del antropocentrismo sonoro", chapter: 1, startWeek: 1, duration: 1, color: "#3B82F6", priority: "high", x: 150, y: 120, notes: "", scale: 1 },
    { id: 2, title: "Encuentro Entre Especies y Espectros [e4]", chapter: 1, startWeek: 2, duration: 1, color: "#3B82F6", priority: "high", x: 320, y: 80, notes: "", scale: 1 },
    { id: 3, title: "Artes de la Transmisión (Full spectrum radio)", chapter: 1, startWeek: 3, duration: 1, color: "#3B82F6", priority: "medium", x: 480, y: 140, notes: "", scale: 1 },
    { id: 4, title: "Inteligencia de máquinas y arte (Google AMI)", chapter: 1, startWeek: 4, duration: 1, color: "#3B82F6", priority: "high", x: 680, y: 100, notes: "", scale: 1 },
    { id: 5, title: "Monitoreo y Sonificación (Wildlabs)", chapter: 1, startWeek: 5, duration: 1, color: "#3B82F6", priority: "medium", x: 820, y: 160, notes: "", scale: 1 },
    
    // Chapter 2
    { id: 6, title: "Sub/culturas - Reinventar/reconstruir", chapter: 2, startWeek: 6, duration: 1, color: "#10B981", priority: "high", x: 180, y: 280, notes: "", scale: 1 },
    { id: 7, title: "Tec-sincretismo (EGS)", chapter: 2, startWeek: 7, duration: 1, color: "#10B981", priority: "medium", x: 350, y: 320, notes: "", scale: 1 },
    { id: 8, title: "Espectros sonoros", chapter: 2, startWeek: 8, duration: 1, color: "#10B981", priority: "medium", x: 520, y: 260, notes: "", scale: 1 },
    { id: 9, title: "De IAP a DAO", chapter: 2, startWeek: 9, duration: 1, color: "#10B981", priority: "high", x: 720, y: 300, notes: "", scale: 1 },
    { id: 10, title: "Parlamento de lo vivo - Édouard Glissant", chapter: 2, startWeek: 10, duration: 1, color: "#10B981", priority: "high", x: 890, y: 240, notes: "", scale: 1 },
    { id: 11, title: "Agenciamientos multiespecie", chapter: 2, startWeek: 11, duration: 1, color: "#10B981", priority: "medium", x: 1000, y: 320, notes: "", scale: 1 },
    
    // Chapter 3
    { id: 12, title: "Biocracia - Nueva Gobernanza Inter-especies", chapter: 3, startWeek: 12, duration: 1, color: "#F59E0B", priority: "high", x: 120, y: 450, notes: "", scale: 1 },
    { id: 13, title: "Sistemas de información geográfica (SIG)", chapter: 3, startWeek: 13, duration: 1, color: "#F59E0B", priority: "high", x: 300, y: 480, notes: "", scale: 1 },
    { id: 14, title: "El jaguar y el ocelote", chapter: 3, startWeek: 14, duration: 1, color: "#F59E0B", priority: "medium", x: 480, y: 420, notes: "", scale: 1 },
    { id: 15, title: "Redes de comunicación interespecífica", chapter: 3, startWeek: 15, duration: 1, color: "#F59E0B", priority: "medium", x: 650, y: 460, notes: "", scale: 1 },
    { id: 16, title: "Archivos híbridos", chapter: 3, startWeek: 16, duration: 1, color: "#F59E0B", priority: "high", x: 820, y: 400, notes: "", scale: 1 },
    { id: 17, title: "Arte y Sensibilización Ecológica", chapter: 3, startWeek: 17, duration: 1, color: "#F59E0B", priority: "medium", x: 980, y: 480, notes: "", scale: 1 },
    { id: 18, title: "Tokenización de participación ecosistémica", chapter: 3, startWeek: 18, duration: 1, color: "#F59E0B", priority: "high", x: 150, y: 580, notes: "", scale: 1 },
    { id: 19, title: "LiquidIce - Desarrollo y programación", chapter: 3, startWeek: 19, duration: 1, color: "#F59E0B", priority: "high", x: 380, y: 600, notes: "", scale: 1 },
    { id: 20, title: "Sistema PAM como base para DAO", chapter: 3, startWeek: 20, duration: 1, color: "#F59E0B", priority: "high", x: 580, y: 540, notes: "", scale: 1 },
    { id: 21, title: "Espacialización sonora", chapter: 3, startWeek: 21, duration: 1, color: "#F59E0B", priority: "medium", x: 750, y: 580, notes: "", scale: 1 },
    { id: 22, title: "Monitoreo, IA y análisis de redes", chapter: 3, startWeek: 22, duration: 1, color: "#F59E0B", priority: "high", x: 920, y: 620, notes: "", scale: 1 },
    
    // Review phases
    { id: 23, title: "Revisión integral Capítulo 1", chapter: 4, startWeek: 23, duration: 1, color: "#EF4444", priority: "high", x: 200, y: 720, notes: "", scale: 1 },
    { id: 24, title: "Revisión integral Capítulo 2", chapter: 4, startWeek: 24, duration: 1, color: "#EF4444", priority: "high", x: 450, y: 750, notes: "", scale: 1 },
    { id: 25, title: "Revisión integral Capítulo 3", chapter: 4, startWeek: 25, duration: 1, color: "#EF4444", priority: "high", x: 700, y: 720, notes: "", scale: 1 },
    { id: 26, title: "Integración y conclusiones generales", chapter: 4, startWeek: 26, duration: 1, color: "#EF4444", priority: "high", x: 500, y: 820, notes: "", scale: 1 },
    { id: 27, title: "Revisión final y preparación de presentación", chapter: 4, startWeek: 27, duration: 1, color: "#EF4444", priority: "high", x: 750, y: 800, notes: "", scale: 1 }
  ]);

  const [dynamicConnections, setDynamicConnections] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [notesText, setNotesText] = useState('');
  const [hoveredLine, setHoveredLine] = useState(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const chapters = {
    1: { name: "Encuentro Entre Especies y Espectros", color: "#3B82F6" },
    2: { name: "Poéticas de la relación", color: "#10B981" },
    3: { name: "Mediaciones e interfaces", color: "#F59E0B" },
    4: { name: "Revisión y Consolidación", color: "#EF4444" }
  };

  // Helper functions
  const getWeekDate = (weekNumber) => {
    const startDate = new Date('2025-06-23');
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return targetDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  const getTaskSize = (priority) => {
    switch (priority) {
      case 'high': return 80;
      case 'medium': return 65;
      case 'low': return 50;
      default: return 65;
    }
  };

  // Color blending function
  const blendColors = (color1, color2) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round((r1 + r2) / 2);
    const g = Math.round((g1 + g2) / 2);
    const b = Math.round((b1 + b2) / 2);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Line intersection detection
  const isPointOnLine = (px, py, x1, y1, x2, y2, threshold = 10) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    
    if (lenSq === 0) return false;
    
    const param = dot / lenSq;
    
    if (param < 0 || param > 1) return false;
    
    const xx = x1 + param * C;
    const yy = y1 + param * D;
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy) <= threshold;
  };

  // Check if task is over any connection line
  const checkLineIntersection = (task) => {
    const filteredTasks = selectedChapter === 'all' 
      ? tasks 
      : tasks.filter(t => t.chapter === parseInt(selectedChapter));

    for (let i = 0; i < filteredTasks.length; i++) {
      const task1 = filteredTasks[i];
      if (task1.id === task.id) continue;
      
      const relatedTasks = filteredTasks.filter(t => 
        t.chapter === task1.chapter && 
        Math.abs(t.startWeek - task1.startWeek) === 1
      );
      
      for (let j = 0; j < relatedTasks.length; j++) {
        const task2 = relatedTasks[j];
        if (task2.id === task.id) continue;
        
        if (isPointOnLine(task.x, task.y, task1.x, task1.y, task2.x, task2.y)) {
          return { task1, task2 };
        }
      }
    }
    
    // Check dynamic connections
    for (let conn of dynamicConnections) {
      const t1 = tasks.find(t => t.id === conn.from);
      const t2 = tasks.find(t => t.id === conn.to);
      if (t1 && t2 && t1.id !== task.id && t2.id !== task.id) {
        if (isPointOnLine(task.x, task.y, t1.x, t1.y, t2.x, t2.y)) {
          return { task1: t1, task2: t2 };
        }
      }
    }
    
    return null;
  };

  // Mouse event handlers
const handleMouseDown = (e, task) => {
  e.preventDefault();
  const rect = canvasRef.current.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  dragOffset.current = {
    x: mouseX - task.x,
    y: mouseY - task.y
  };
  
  // Add a small delay to distinguish between click and drag
  setTimeout(() => {
    setDraggedTask(task);
    isDragging.current = true;
  }, 150);
};

  const handleMouseMove = (e) => {
    if (!isDragging.current || !draggedTask) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const newX = mouseX - dragOffset.current.x;
    const newY = mouseY - dragOffset.current.y;
    
    const updatedTask = { 
      ...draggedTask, 
      x: Math.max(50, Math.min(newX, 1100)), 
      y: Math.max(50, Math.min(newY, 850)) 
    };
    
    // Check for line intersection
    const intersection = checkLineIntersection(updatedTask);
    let newScale = 1;
    let newColor = draggedTask.color;
    
    if (intersection) {
      newScale = 1.5;
      newColor = blendColors(intersection.task1.color, intersection.task2.color);
      setHoveredLine({ from: intersection.task1.id, to: intersection.task2.id });
    } else {
      setHoveredLine(null);
    }
    
    setTasks(tasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, x: updatedTask.x, y: updatedTask.y, scale: newScale, color: newColor }
        : task
    ));
  };

const handleMouseUp = () => {
  if (draggedTask && hoveredLine) {
    // Create new dynamic connection
    const newConnection = {
      id: Date.now(),
      from: draggedTask.id,
      to: hoveredLine.from,
      color: blendColors(draggedTask.color, tasks.find(t => t.id === hoveredLine.from)?.color || '#000000')
    };
    
    setDynamicConnections(prev => [...prev, newConnection]);
    
    // Add another connection to the second task
    const newConnection2 = {
      id: Date.now() + 1,
      from: draggedTask.id,
      to: hoveredLine.to,
      color: blendColors(draggedTask.color, tasks.find(t => t.id === hoveredLine.to)?.color || '#000000')
    };
    
    setDynamicConnections(prev => [...prev, newConnection2]);
  }
  
  // Reset drag state
  isDragging.current = false;
  setDraggedTask(null);
  setHoveredLine(null);
};

const handleTaskClick = (task, e) => {
  if (!isDragging.current && !draggedTask) {
    setSelectedTask(task);
    setNotesText(task.notes || '');
  }
};

  const handleWheel = (e, task) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    
    setTasks(tasks.map(t => 
      t.id === task.id 
        ? { ...t, scale: Math.max(0.5, Math.min(2.5, t.scale + delta)) }
        : t
    ));
  };

  // Other handlers
  const saveNotes = () => {
    setTasks(tasks.map(task => 
      task.id === selectedTask.id 
        ? { ...task, notes: notesText }
        : task
    ));
    setSelectedTask(null);
    setNotesText('');
  };

  const addNewTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        title: newTaskTitle,
        chapter: 1,
        startWeek: Math.max(...tasks.map(t => t.startWeek)) + 1,
        duration: 1,
        color: "#8B5CF6",
        priority: "medium",
        x: 300 + Math.random() * 400,
        y: 300 + Math.random() * 200,
        notes: "",
        scale: 1
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setDynamicConnections(dynamicConnections.filter(conn => 
      conn.from !== taskId && conn.to !== taskId
    ));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  const changePriority = (taskId) => {
    const priorities = ['low', 'medium', 'high'];
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
  };

  const randomizePositions = () => {
    setTasks(tasks.map(task => ({
      ...task,
      x: 100 + Math.random() * 900,
      y: 100 + Math.random() * 700,
      scale: 1
    })));
    setDynamicConnections([]);
  };

  const clearConnections = () => {
    setDynamicConnections([]);
  };

  const exportToCSV = () => {
    const csv = tasks.map(task => 
      `"${task.title}","${getWeekDate(task.startWeek)}","${task.duration}","Chapter ${task.chapter}","${task.priority}","${task.notes.replace(/"/g, '""')}","${task.scale}","${task.color}"`
    ).join('\n');
    
    const blob = new Blob([`Title,Start Date,Duration (weeks),Chapter,Priority,Notes,Scale,Color\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis_timeline_scattered.csv';
    a.click();
  };

  const filteredTasks = selectedChapter === 'all' 
    ? tasks 
    : tasks.filter(task => task.chapter === parseInt(selectedChapter));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Visualización Dispersa - Tesis Doctoral (Enhanced)
        </h1>
        <p className="text-gray-600">
          Explora tu investigación de forma no-lineal. Arrastra sobre líneas para crear conexiones, usa scroll para escalar círculos.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Capítulo:</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">Todos</option>
            {Object.entries(chapters).map(([num, chapter]) => (
              <option key={num} value={num}>Cap. {num}: {chapter.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nueva tarea..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            className="border rounded px-3 py-1"
          />
          <button
            onClick={addNewTask}
            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex space-x-2 ml-auto">
          <button
            onClick={clearConnections}
            className="flex items-center space-x-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
            <span>Limpiar conexiones</span>
          </button>
          <button
            onClick={randomizePositions}
            className="flex items-center space-x-1 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reorganizar</span>
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        {Object.entries(chapters).map(([num, chapter]) => (
          <div key={num} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: chapter.color }}
            />
            <span>Cap. {num}: {chapter.name}</span>
          </div>
        ))}
        <div className="ml-4 flex items-center space-x-4 text-xs text-gray-600">
          <span>Tamaño: Prioridad + Escala (scroll sobre círculos)</span>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative border rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-sm overflow-hidden">
        <svg 
          ref={canvasRef}
          width="1200" 
          height="900"
          className="cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Original connection lines */}
          {filteredTasks.map(task => {
            const relatedTasks = filteredTasks.filter(t => 
              t.chapter === task.chapter && 
              Math.abs(t.startWeek - task.startWeek) === 1
            );
            return relatedTasks.map(related => (
              <line
                key={`${task.id}-${related.id}`}
                x1={task.x}
                y1={task.y}
                x2={related.x}
                y2={related.y}
                stroke={task.color}
                strokeWidth={hoveredLine && 
                  ((hoveredLine.from === task.id && hoveredLine.to === related.id) ||
                   (hoveredLine.from === related.id && hoveredLine.to === task.id)) ? "4" : "1"}
                opacity="0.3"
                className="transition-all duration-200"
              />
            ));
          })}

          {/* Dynamic connections */}
          {dynamicConnections.map(conn => {
            const fromTask = tasks.find(t => t.id === conn.from);
            const toTask = tasks.find(t => t.id === conn.to);
            if (!fromTask || !toTask) return null;
            
            return (
              <line
                key={`dynamic-${conn.id}`}
                x1={fromTask.x}
                y1={fromTask.y}
                x2={toTask.x}
                y2={toTask.y}
                stroke={conn.color}
                strokeWidth="3"
                opacity="0.8"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            );
          })}

          {/* Tasks as circles */}
          {filteredTasks.map(task => {
            const baseSize = getTaskSize(task.priority);
            const scaledSize = baseSize * task.scale;
            
            return (
              <g key={task.id}>
                {/* Task circle */}
                <circle
                  cx={task.x}
                  cy={task.y}
                  r={scaledSize / 2}
                  fill={task.color}
                  stroke="white"
                  strokeWidth="3"
                  className={`cursor-pointer transition-all duration-200 ${
                    draggedTask?.id === task.id ? 'opacity-80' : 'hover:opacity-80'
                  } ${task.priority === 'high' ? 'drop-shadow-lg' : ''}`}
                  style={{ 
                    filter: task.scale > 1 ? 'drop-shadow(0 0 10px rgba(0,0,0,0.3))' : '',
                    mixBlendMode: task.scale > 1 ? 'multiply' : 'normal'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, task)}
                  onClick={(e) => handleTaskClick(task, e)}
                  onWheel={(e) => handleWheel(e, task)}
                />
                
                {/* Week number */}
                <text
                  x={task.x}
                  y={task.y - 5}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white pointer-events-none"
                  style={{ fontSize: `${Math.max(10, 12 * task.scale)}px` }}
                >
                  {task.startWeek}
                </text>
                
                {/* Priority indicator */}
                <circle
                  cx={task.x + (scaledSize/3)}
                  cy={task.y - (scaledSize/3)}
                  r={4 * task.scale}
                  fill={task.priority === 'high' ? '#EF4444' : 
                        task.priority === 'medium' ? '#F59E0B' : '#10B981'}
                  stroke="white"
                  strokeWidth="1"
                />

                {/* Notes indicator */}
                {task.notes && (
                  <circle
                    cx={task.x - (scaledSize/3)}
                    cy={task.y - (scaledSize/3)}
                    r={3 * task.scale}
                    fill="#8B5CF6"
                    stroke="white"
                    strokeWidth="1"
                  />
                )}
                
                {/* Scale indicator */}
                {task.scale !== 1 && (
                  <text
                    x={task.x}
                    y={task.y + (scaledSize/2) + 15}
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-600 pointer-events-none"
                  >
                    {task.scale.toFixed(1)}x
                  </text>
                )}
                
                {/* Task title on hover */}
                <title>{task.title}</title>
              </g>
            );
          })}
        </svg>

{/* Task labels overlay */}
<div className="absolute inset-0 pointer-events-none">
  {filteredTasks.map(task => {
    const baseSize = getTaskSize(task.priority);
    const scaledSize = baseSize * task.scale;
    
    return (
      <div
        key={`label-${task.id}`}
        className="absolute text-xs font-medium text-gray-700 bg-white/90 px-2 py-1 rounded shadow-sm text-center transition-all duration-200 whitespace-nowrap"
        style={{
          left: `${task.x - 80}px`,
          top: `${task.y + scaledSize/2 + 10}px`,
          fontSize: task.priority === 'high' ? '11px' : '10px',
          transform: `scale(${Math.min(1.2, task.scale)})`,
          maxWidth: '160px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {task.title}
      </div>
    );
  })}
</div>
</div>      

      {/* Notes Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: selectedTask.color }}
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedTask.title}</h3>
                  <p className="text-sm text-gray-600">
                    Capítulo {selectedTask.chapter} • Semana {selectedTask.startWeek} • 
                    Prioridad: {selectedTask.priority} • Escala: {selectedTask.scale.toFixed(1)}x
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => changePriority(selectedTask.id)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                >
                  Cambiar prioridad
                </button>
                <button
                  onClick={() => deleteTask(selectedTask.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <label className="block text-sm font-medium mb-2">
                Notas (Markdown soportado)
              </label>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Escribe tus notas aquí... Puedes usar Markdown para formatear el texto."
                className="w-full h-64 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Monaco, Consolas, monospace' }}
              />
              <div className="mt-3 text-xs text-gray-500">
                Consejos: Usa **negrita**, *cursiva*, `código`, - listas, ## títulos
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={saveNotes}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar notas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
          <div className="text-sm text-blue-800">Total de tareas</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {tasks.filter(t => t.priority === 'high').length}
          </div>
          <div className="text-sm text-green-800">Alta prioridad</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {tasks.filter(t => t.notes && t.notes.trim()).length}
          </div>
          <div className="text-sm text-purple-800">Con notas</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {dynamicConnections.length}
          </div>
          <div className="text-sm text-orange-800">Conexiones creadas</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">27</div>
          <div className="text-sm text-yellow-800">Semanas totales</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Instrucciones de uso (Versión mejorada):</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Explorar:</strong> Cada círculo representa una tarea. El tamaño indica la prioridad.</li>
          <li>• <strong>Escalar:</strong> Usa la rueda del mouse sobre cualquier círculo para cambiar su escala (0.5x - 2.5x)</li>
          <li>• <strong>Mover:</strong> Arrastra círculos para reorganizar. Cuando pases sobre líneas, el círculo se escalará y cambiará de color</li>
          <li>• <strong>Conexiones dinámicas:</strong> Suelta un círculo sobre una línea para crear nuevas conexiones (líneas punteadas)</li>
          <li>• <strong>Mezcla de colores:</strong> Los círculos sobre líneas mezclan colores automáticamente</li>
          <li>• <strong>Notas:</strong> Haz clic en cualquier tarea para abrir el editor de notas con soporte Markdown</li>
          <li>• <strong>Indicadores:</strong> Círculo pequeño = prioridad, círculo morado = tiene notas, número = escala actual</li>
          <li>• <strong>Filtros:</strong> Usa "Limpiar conexiones" para eliminar las conexiones dinámicas creadas</li>
        </ul>
      </div>
    </div>
  );
};

export default ScatteredThesisTimeline;
