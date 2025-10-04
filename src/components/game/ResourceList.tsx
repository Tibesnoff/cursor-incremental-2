import React from 'react';
import { useAppSelector } from '@/store';
import { ResourceRow } from '@/components/ui';

const ResourceList: React.FC = () => {
  const { resources } = useAppSelector((state) => state.game);

  return (
    <div className="space-y-4">
      {resources.map((resource, index) => {
        // Check if resource is locked (previous resource not bought)
        const isLocked = index > 0 && resources[index - 1].bought === 0;
        if (isLocked) return null;

        return <ResourceRow key={resource.id} resourceId={resource.id} />;
      })}
    </div>
  );
};

export default ResourceList;
