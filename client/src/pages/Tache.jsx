import React, { useState } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import useTasks from '../hooks/useTasks';
import useFilters from '../hooks/useFilters';
import useTheme from '../hooks/useTheme';
import useNotifications from '../hooks/useNotifications';
import useTimer from '../hooks/useTimer';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import NotificationPanel from '../components/NotificationPanel';
import { Plus, CheckSquare } from 'lucide-react'; 


const Taches = () => {
    const { 
        tasks, loading, addTask, saveTaskFull, updateTask, 
        deleteTask, toggleTimer, extendTime, changeState 
    } = useTasks();

    const { 
        searchQuery, setSearchQuery, 
        filterPriority, setFilterPriority, 
        filterState, setFilterState, 
        showFilters, toggleFilters, 
        filteredTasks, hasActiveFilters, clearFilters 
    } = useFilters(tasks);

    const { theme, darkMode } = useTheme();
    
    const { 
        notifications, enabled: notifEnabled, 
        toggleNotifications, removeNotification, addNotification 
    } = useNotifications(tasks);

    useTimer(tasks, updateTask);

    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleSubmit = async (taskData) => {
        let success;
        if (editingTask) {
            success = await saveTaskFull(editingTask.id, taskData);
            if (success) addNotification("Tâche mise à jour !", "success", taskData.name);
        } else {
            const newTask = await addTask(taskData);
            success = !!newTask;
            if (success) addNotification("Tâche créée avec succès !", "success", taskData.name);
        }
        
        if (success) {
            setShowForm(false);
            setEditingTask(null);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette tâche ?")) {
            await deleteTask(id);
            addNotification("Tâche supprimée", "info");
        }
    };


    return (
        <SidebarLayout>
            <div style={{ 
                minHeight: '100vh', 
                paddingBottom: '2rem',
                background: darkMode ? theme.background : '#fff',
                transition: 'background 0.3s'
            }}>
                <NotificationPanel 
                    notifications={notifications}
                    enabled={notifEnabled}
                    onToggle={toggleNotifications}
                    onRemove={removeNotification}
                    theme={theme}
                />
                
                {/* --- NOUVEAU HEADER (Style Bloc-notes) --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
                            <CheckSquare className="text-green-500" size={32} />
                            Gestionnaire de Tâches 
                        </h1>
                        <p style={{ color: theme.textSecondary }}>Organisez votre temps efficacement.</p>
                    </div>
                    <button
                        onClick={() => { setEditingTask(null); setShowForm(true); }}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30">
                        <Plus size={20} />
                        Nouvelle Tâche
                    </button>
                </div>

                <SearchBar 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterPriority={filterPriority}
                    onPriorityChange={setFilterPriority}
                    filterState={filterState}
                    onStateChange={setFilterState}
                    showFilters={showFilters}
                    onToggleFilters={toggleFilters}
                    hasActiveFilters={hasActiveFilters}
                    onClearFilters={clearFilters}
                    filteredCount={filteredTasks.length}
                    totalCount={tasks.length}
                    theme={theme}
                />

                {loading ? (
                    <div className="text-center p-10 text-gray-500">Chargement...</div>
                ) : (
                    <TaskList 
                        tasks={filteredTasks}
                        onToggleTimer={toggleTimer}
                        onExtendTime={extendTime}
                        onChangeState={changeState}
                        onEdit={(task) => { setEditingTask(task); setShowForm(true); }}
                        onDelete={handleDelete}
                        theme={theme}
                    />
                )}

                {showForm && (
                    <TaskForm 
                        task={editingTask}
                        onSubmit={handleSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                )}
            </div>
        </SidebarLayout>
    );
};

export default Taches;