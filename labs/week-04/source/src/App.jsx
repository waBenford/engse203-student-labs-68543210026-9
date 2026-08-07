import { useState } from 'react';
import { initialTasks } from './data/initialTasks.js';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TaskList from './components/TaskList.jsx';
import FilterBar from './components/FilterBar.jsx';

function App() {
  const [tasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('all');

  const summary = {
    total: initialTasks.length,
    todo: initialTasks.filter((task) => task.status === 'todo').length,
    doing: initialTasks.filter((task) => task.status === 'doing').length,
    done: initialTasks.filter((task) => task.status === 'done').length,
  };
  const filteredTasks = statusFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);
  
  return (
    <>
      <AppHeader title="&nbsp;Study Task Board" subtitle="&nbsp;&nbsp;&nbsp;CP03 — State, derived data และ filter" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <section className="panel">
          <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
          <hr />
          <h2>รายการฝึกของฉัน</h2>
          <TaskList tasks={filteredTasks} />
        </section>
      </main>
    </>
  );
}

export default App;