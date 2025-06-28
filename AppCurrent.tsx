import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, RotateCcw, Filter, Eye, EyeOff } from 'lucide-react';

const ResearchProjectTracker = () => {
  // ===========================================
  // PART 1: STATE MANAGEMENT & INITIAL DATA
  // ===========================================
  
  // Core state variables
  const [scalingTask, setScalingTask] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dynamicConnections, setDynamicConnections] = useState([]);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [notesText, setNotesText] = useState('');
  
  // Refs for drag and drop functionality
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Initial tasks data with all properties needed
  const [tasks, setTasks] = useState([
    // Chapter 1 - Blue theme
    { id: 1, title: "Bioacústica - Más allá del antropocentrismo sonoro", chapter: 1, startWeek: 1, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "high", x: 150, y: 120, notes: "", scale: 1 },
    { id: 2, title: "Encuentro Entre Especies y Espectros [e4]", chapter: 1, startWeek: 2, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "high", x: 320, y: 80, notes: "", scale: 1 },
    { id: 3, title: "Artes de la Transmisión (Full spectrum radio)", chapter: 1, startWeek: 3, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "medium", x: 480, y: 140, notes: "", scale: 1 },
    { id: 4, title: "Inteligencia de máquinas y arte (Google AMI)", chapter: 1, startWeek: 4, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "high", x: 680, y: 100, notes: "", scale: 1 },
    { id: 5, title: "Monitoreo y Sonificación (Wildlabs)", chapter: 1, startWeek: 5, duration: 1, color: "#3B82F6", originalColor: "#3B82F6", priority: "medium", x: 820, y: 160, notes: "", scale: 1 },
    
    // Chapter 2 - Green theme
    { id: 6, title: "Sub/culturas - Reinventar/reconstruir", chapter: 2, startWeek: 6, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "high", x: 180, y: 280, notes: "", scale: 1 },
    { id: 7, title: "Tec-sincretismo (EGS)", chapter: 2, startWeek: 7, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "medium", x: 350, y: 320, notes: "", scale: 1 },
    { id: 8, title: "Espectros sonoros", chapter: 2, startWeek: 8, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "medium", x: 520, y: 260, notes: "", scale: 1 },
    { id: 9, title: "De IAP a DAO", chapter: 2, startWeek: 9, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "high", x: 720, y: 300, notes: "", scale: 1 },
    { id: 10, title: "Parlamento de lo vivo - Édouard Glissant", chapter: 2, startWeek: 10, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "high", x: 890, y: 240, notes: "", scale: 1 },
    { id: 11, title: "Agenciamientos multiespecie", chapter: 2, startWeek: 11, duration: 1, color: "#10B981", originalColor: "#10B981", priority: "medium", x: 1000, y: 320, notes: "", scale: 1 },
    
    // Chapter 3 - Orange theme
    { id: 12, title: "Biocracia - Nueva Gobernanza Inter-especies", chapter: 3, startWeek: 12, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 120, y: 450, notes: "", scale: 1 },
    { id: 13, title: "Sistemas de información geográfica (SIG)", chapter: 3, startWeek: 13, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 300, y: 480, notes: "", scale: 1 },
    { id: 14, title: "El jaguar y el ocelote", chapter: 3, startWeek: 14, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 480, y: 420, notes: "", scale: 1 },
    { id: 15, title: "Redes de comunicación interespecífica", chapter: 3, startWeek: 15, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 650, y: 460, notes: "", scale: 1 },
    { id: 16, title: "Archivos híbridos", chapter: 3, startWeek: 16, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 820, y: 400, notes: "", scale: 1 },
    { id: 17, title: "Arte y Sensibilización Ecológica", chapter: 3, startWeek: 17, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 980, y: 480, notes: "", scale: 1 },
    { id: 18, title: "Tokenización de participación ecosistémica", chapter: 3, startWeek: 18, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 150, y: 580, notes: "", scale: 1 },
    { id: 19, title: "LiquidIce - Desarrollo y programación", chapter: 3, startWeek: 19, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 380, y: 600, notes: "", scale: 1 },
    { id: 20, title: "Sistema PAM como base para DAO", chapter: 3, startWeek: 20, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 580, y: 540, notes: "", scale: 1 },
    { id: 21, title: "Espacialización sonora", chapter: 3, startWeek: 21, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "medium", x: 750, y: 580, notes: "", scale: 1 },
    { id: 22, title: "Monitoreo, IA y análisis de redes", chapter: 3, startWeek: 22, duration: 1, color: "#F59E0B", originalColor: "#F59E0B", priority: "high", x: 920, y: 620, notes: "", scale: 1 },
    
    // Chapter 4 - Review phases (Red theme)
    { id: 23, title: "Revisión integral Capítulo 1", chapter: 4, startWeek: 23, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 200, y: 720, notes: "", scale: 1 },
    { id: 24, title: "Revisión integral Capítulo 2", chapter: 4, startWeek: 24, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 450, y: 750, notes: "", scale: 1 },
    { id: 25, title: "Revisión integral Capítulo 3", chapter: 4, startWeek: 25, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 700, y: 720, notes: "", scale: 1 },
    { id: 26, title: "Integración y conclusiones generales", chapter: 4, startWeek: 26, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 500, y: 820, notes: "", scale: 1 },
    { id: 27, title: "Revisión final y preparación de presentación", chapter: 4, startWeek: 27, duration: 1, color: "#EF4444", originalColor: "#EF4444", priority: "high", x: 750, y: 800, notes: "", scale: 1 }
  ]);

  // ===========================================
  // HELPER FUNCTIONS
  // ===========================================
  
  // Get task size based on priority
  const getTaskSize = (priority) => {
    switch(priority) {
      case 'high': return 60;
      case 'medium': return 45;
      case 'low': return 35;
      default: return 45;
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

  // Filter tasks based on search and chapter selection
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === 'all' || task.chapter.toString() === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  // ===========================================
  // PART 2: EVENT HANDLERS & INTERACTIVE FUNCTIONS
  // ===========================================
  
  // Task scaling functions
  const scaleTask = (taskId, delta) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, scale: Math.max(0.5, Math.min(2.5, t.scale + delta)) }
        : t
    ));
  };

  // Reset task to original state
  const resetTaskToOriginal = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, color: task.originalColor, scale: 1 }
        : task
    ));
  };

  // Check if dragged task intersects with any connection line
  const checkLineIntersection = (draggedTask) => {
    const threshold = 20; // Distance threshold for intersection
    
    // Check intersections with existing task connections (based on sequential weeks)
    for (let i = 0; i < tasks.length - 1; i++) {
      const task1 = tasks[i];
      const task2 = tasks[i + 1];
      
      if (task1.id === draggedTask.id || task2.id === draggedTask.id) continue;
      
      // Calculate distance from point to line
      const A = draggedTask.x - task1.x;
      const B = draggedTask.y - task1.y;
      const C = task2.x - task1.x;
      const D = task2.y - task1.y;
      
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      
      if (lenSq === 0) continue;
      
      const param = dot / lenSq;
      
      let xx, yy;
      if (param < 0) {
        xx = task1.x;
        yy = task1.y;
      } else if (param > 1) {
        xx = task2.x;
        yy = task2.y;
      } else {
        xx = task1.x + param * C;
        yy = task1.y + param * D;
      }
      
      const dx = draggedTask.x - xx;
      const dy = draggedTask.y - yy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < threshold) {
        return { task1, task2, distance };
      }
    }
    
    return null;
  };

  // Mouse event handlers
  const handleMouseDown = (e, task) => {
    e.preventDefault();
    e.stopPropagation();
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
    let newScale = draggedTask.scale;
    let newColor = draggedTask.color;
    
    if (intersection) {
      newScale = Math.max(draggedTask.scale, 1.5);
      newColor = blendColors(draggedTask.originalColor, intersection.task1.color);
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
        color: blendColors(draggedTask.originalColor, tasks.find(t => t.id === hoveredLine.from)?.originalColor || '#000000')
      };
      
      setDynamicConnections(prev => [...prev, newConnection]);
      
      // Add another connection to the second task
      const newConnection2 = {
        id: Date.now() + 1,
        from: draggedTask.id,
        to: hoveredLine.to,
        color: blendColors(draggedTask.originalColor, tasks.find(t => t.id === hoveredLine.to)?.originalColor || '#000000')
      };
      
      setDynamicConnections(prev => [...prev, newConnection2]);
      
      // Keep the blended color and scale
      setTasks(tasks.map(task => 
        task.id === draggedTask.id 
          ? { ...task, color: blendColors(draggedTask.originalColor, tasks.find(t => t.id === hoveredLine.from)?.originalColor || '#000000'), scale: Math.max(task.scale, 1.5) }
          : task
      ));
    }
    
    // Reset drag state
    isDragging.current = false;
    setDraggedTask(null);
    setHoveredLine(null);
  };

  // Task click handler
  const handleTaskClick = (task, e) => {
    if (!isDragging.current && !draggedTask) {
      e.stopPropagation();
      setSelectedTask(task);
      setNotesText(task.notes || '');
    }
  };

  // Mouse wheel handler for scaling
  const handleWheel = (e, task) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scaleTask(task.id, delta);
  };

  // Line click handler for deleting connections
  const handleLineClick = (e, connectionId) => {
    e.stopPropagation();
    deleteDynamicConnection(connectionId);
  };

  // Connection management
  const deleteDynamicConnection = (connectionId) => {
    setDynamicConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  // Utility functions
  const randomizePositions = () => {
    setTasks(tasks.map(task => ({
      ...task,
      x: 100 + Math.random() * 900,
      y: 100 + Math.random() * 700,
      scale: 1,
      color: task.originalColor
    })));
    setDynamicConnections([]);
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
        originalColor: "#8B5CF6",
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

  const saveNotes = () => {
    if (selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id 
          ? { ...task, notes: notesText }
          : task
      ));
      setSelectedTask(null);
      setNotesText('');
    }
  };

  // Setup mouse event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseUp);
      
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [draggedTask, hoveredLine, tasks]);

  // ===========================================
  // PART 3: COMPLETE UI & VISUALIZATION
  // ===========================================
  
  return (
    <div className="w-full h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Investigación Interactiva: Monitoreo Acústico Pasivo y Gobernanza Ecosistémica
      </h1>
      
      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
        {/* Search */}
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          />
        </div>

        {/* Chapter Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">Todos los capítulos</option>
            <option value="1">Capítulo 1</option>
            <option value="2">Capítulo 2</option>
            <option value="3">Capítulo 3</option>
            <option value="4">Revisión</option>
          </select>
        </div>

        {/* Toggle Labels */}
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`flex items-center space-x-1 px-3 py-1 border rounded text-sm ${
            showLabels ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
        >
          {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>Etiquetas</span>
        </button>

        {/* Randomize */}
        <button
          onClick={randomizePositions}
          className="flex items-center space-x-1 px-3 py-1 border rounded text-sm hover:bg-gray-100"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reorganizar</span>
        </button>

        {/* Add Task */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nueva tarea..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            className="px-3 py-1 border rounded text-sm"
          />
          <button
            onClick={addNewTask}
            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        {/* SVG Canvas */}
        <svg
          ref={canvasRef}
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ cursor: isDragging.current ? 'grabbing' : 'default' }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Chapter Connection Lines */}
          {filteredTasks.map((task, index) => {
            const nextTask = filteredTasks[index + 1];
            if (!nextTask || task.chapter !== nextTask.chapter) return null;
            
            const isHovered = hoveredLine && 
              ((hoveredLine.from === task.id && hoveredLine.to === nextTask.id) ||
               (hoveredLine.from === nextTask.id && hoveredLine.to === task.id));
            
            return (
              <line
                key={`line-${task.id}-${nextTask.id}`}
                x1={task.x}
                y1={task.y}
                x2={nextTask.x}
                y2={nextTask.y}
                stroke={isHovered ? '#FF6B6B' : '#E5E7EB'}
                strokeWidth={isHovered ? "4" : "2"}
                opacity={isHovered ? "0.8" : "0.3"}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Dynamic Connections */}
          {dynamicConnections.map(conn => {
            const fromTask = tasks.find(t => t.id === conn.from);
            const toTask = tasks.find(t => t.id === conn.to);
            if (!fromTask || !toTask) return null;
            
            return (
              <g key={`dynamic-${conn.id}`}>
                <line
                  x1={fromTask.x}
                  y1={fromTask.y}
                  x2={toTask.x}
                  y2={toTask.y}
                  stroke={conn.color}
                  strokeWidth="8"
                  opacity="0.1"
                  className="cursor-pointer"
                  onClick={(e) => handleLineClick(e, conn.id)}
                />
                <line
                  x1={fromTask.x}
                  y1={fromTask.y}
                  x2={toTask.x}
                  y2={toTask.y}
                  stroke={conn.color}
                  strokeWidth="3"
                  opacity="0.8"
                  strokeDasharray="5,5"
                  className="animate-pulse cursor-pointer"
                  onClick={(e) => handleLineClick(e, conn.id)}
                />
              </g>
            );
          })}

          {/* Task Circles */}
          {filteredTasks.map(task => {
            const baseSize = getTaskSize(task.priority);
            const scaledSize = baseSize * task.scale;
            
            return (
              <g key={task.id}>
                {/* Task Circle */}
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
                
                {/* Scale Controls */}
                <g className="scale-controls opacity-0 hover:opacity-100 transition-opacity">
                  <circle
                    cx={task.x - (scaledSize/2) - 15}
                    cy={task.y}
                    r="8"
                    fill="#EF4444"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      scaleTask(task.id, -0.2);
                    }}
                  />
                  <text
                    x={task.x - (scaledSize/2) - 15}
                    y={task.y + 3}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none"
                  >
                    -
                  </text>
                  
                  <circle
                    cx={task.x + (scaledSize/2) + 15}
                    cy={task.y}
                    r="8"
                    fill="#10B981"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      scaleTask(task.id, 0.2);
                    }}
                  />
                  <text
                    x={task.x + (scaledSize/2) + 15}
                    y={task.y + 3}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none"
                  >
                    +
                  </text>
                </g>
                
                {/* Week Number */}
                <text
                  x={task.x}
                  y={task.y - 5}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white pointer-events-none"
                  style={{ fontSize: `${Math.max(10, 12 * task.scale)}px` }}
                >
                  {task.startWeek}
                </text>
                
                {/* Priority Indicator */}
                <circle
                  cx={task.x + (scaledSize/3)}
                  cy={task.y - (scaledSize/3)}
                  r={4 * task.scale}
                  fill={task.priority === 'high' ? '#EF4444' : 
                        task.priority === 'medium' ? '#F59E0B' : '#10B981'}
                  stroke="white"
                  strokeWidth="1"
                />

                {/* Notes Indicator */}
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
                
                {/* Scale Indicator */}
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
                
                <title>{task.title}</title>
              </g>
            );
          })}
        </svg>

        {/* Task Labels Overlay */}
        {showLabels && (
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
                    textOverflow: 'ellipsis',
                    zIndex: 10
                  }}
                >
                  {task.title}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Notes Panel */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{selectedTask.title}</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Semana {selectedTask.startWeek} • Capítulo {selectedTask.chapter} • Prioridad: {selectedTask.priority}
              </p>
            </div>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Agregar notas (soporta Markdown)..."
              className="w-full h-32 p-3 border rounded resize-none"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={saveNotes}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Panel */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Instrucciones de uso:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Explorar:</strong> Cada círculo representa una tarea. El tamaño indica la prioridad.</li>
          <li>• <strong>Escalar:</strong> Usa la rueda del mouse sobre círculos O usa los botones +/- que aparecen al pasar el cursor</li>
          <li>• <strong>Mover:</strong> Arrastra círculos para reorganizar. Al pasar sobre líneas, mantienen el color y escala mezclados permanentemente</li>
          <li>• <strong>Conexiones dinámicas:</strong> Suelta un círculo sobre una línea para crear nuevas conexiones (líneas punteadas)</li>
          <li>• <strong>Eliminar conexiones:</strong> Haz clic en cualquier línea punteada para eliminarla</li>
          <li>• <strong>Etiquetas:</strong> Usa el botón "Etiquetas" para activar/desactivar las etiquetas de texto</li>
          <li>• <strong>Notas:</strong> Haz clic en cualquier tarea para abrir el editor de notas con soporte Markdown</li>
          <li>• <strong>Indicadores:</strong> Círculo pequeño = prioridad, círculo morado = tiene notas, número = escala actual</li>
        </ul>
      </div>
    </div>
  );
};

export default ResearchProjectTracker;