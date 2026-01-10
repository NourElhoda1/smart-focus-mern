import { useState, useMemo, useCallback, useEffect } from 'react';
import { DEFAULT_FILTERS } from '../constants/constants';
import { filterTasks as filterTasksHelper } from '../utils/helpers';

const useFilters = (tasks) => {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_FILTERS.SEARCH);
  const [filterPriority, setFilterPriority] = useState(DEFAULT_FILTERS.PRIORITY);
  const [filterState, setFilterState] = useState(DEFAULT_FILTERS.STATE);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = useMemo(() => {
    return filterTasksHelper(tasks, {
      searchQuery,
      priority: filterPriority,
      state: filterState
    });
  }, [tasks, searchQuery, filterPriority, filterState]);

  const hasActiveFilters = useMemo(() => {
    return searchQuery !== DEFAULT_FILTERS.SEARCH ||
           filterPriority !== DEFAULT_FILTERS.PRIORITY ||
           filterState !== DEFAULT_FILTERS.STATE;
  }, [searchQuery, filterPriority, filterState]);

  const clearFilters = useCallback(() => {
    setSearchQuery(DEFAULT_FILTERS.SEARCH);
    setFilterPriority(DEFAULT_FILTERS.PRIORITY);
    setFilterState(DEFAULT_FILTERS.STATE);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[placeholder*="Rechercher"]')?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        toggleFilters();
      }
      if (e.key === 'Escape' && hasActiveFilters) {
        clearFilters();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasActiveFilters, clearFilters, toggleFilters]);

  return {
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    filterState,
    setFilterState,
    showFilters,
    toggleFilters,
    filteredTasks,
    hasActiveFilters,
    clearFilters
  };
};

export default useFilters;