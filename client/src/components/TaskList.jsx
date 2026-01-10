import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({
  tasks,
  onToggleTimer,
  onExtendTime,
  onChangeState,
  onEdit,
  onDelete,
}) => {
  return (
    <div style={{
      animation: 'fadeIn 0.5s ease-out'
    }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleTimer={onToggleTimer}
          onExtendTime={onExtendTime}
          onChangeState={onChangeState}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskList;