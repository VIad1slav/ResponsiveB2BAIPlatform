import { useState, useEffect, useCallback } from 'react';

interface DashboardWidget {
  id: string;
  type: string;
  order: number;
}

interface UseDashboardLayoutOptions<T extends DashboardWidget> {
  storageKey: string;
  defaultWidgets: T[];
}

interface UseDashboardLayoutReturn<T extends DashboardWidget> {
  widgets: T[];
  setWidgets: React.Dispatch<React.SetStateAction<T[]>>;
  isEditMode: boolean;
  draggedId: string | null;
  handleEditToggle: () => void;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, targetId: string) => void;
}

/**
 * Custom hook for managing dashboard layout with drag & drop functionality
 * Handles state, localStorage persistence, and drag & drop logic for dashboard widgets
 */
export function useDashboardLayout<T extends DashboardWidget>({
  storageKey,
  defaultWidgets,
}: UseDashboardLayoutOptions<T>): UseDashboardLayoutReturn<T> {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [widgets, setWidgets] = useState<T[]>(defaultWidgets);

  // Load saved layout from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem(storageKey);
    if (savedLayout) {
      try {
        const parsed = JSON.parse(savedLayout);
        setWidgets(parsed);
      } catch (e) {
        console.error(`Failed to load saved layout for ${storageKey}`, e);
      }
    }
  }, [storageKey]);

  // Toggle edit mode and save layout when exiting edit mode
  const handleEditToggle = useCallback(() => {
    if (isEditMode) {
      // Save layout to localStorage
      localStorage.setItem(storageKey, JSON.stringify(widgets));
    }
    setIsEditMode(!isEditMode);
  }, [isEditMode, storageKey, widgets]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop and reorder widgets
  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();

      if (!draggedId || draggedId === targetId) return;

      setWidgets((prevWidgets) => {
        const draggedIndex = prevWidgets.findIndex((w) => w.id === draggedId);
        const targetIndex = prevWidgets.findIndex((w) => w.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return prevWidgets;

        const newWidgets = [...prevWidgets];
        const [removed] = newWidgets.splice(draggedIndex, 1);
        newWidgets.splice(targetIndex, 0, removed);

        // Update order property
        const reorderedWidgets = newWidgets.map((widget, index) => ({
          ...widget,
          order: index,
        })) as T[];

        return reorderedWidgets;
      });

      setDraggedId(null);
    },
    [draggedId]
  );

  return {
    widgets,
    setWidgets,
    isEditMode,
    draggedId,
    handleEditToggle,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}
