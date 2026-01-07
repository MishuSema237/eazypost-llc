import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
  size?: number;
}

const Icon = ({ icon: IconComponent, className, size }: IconProps): any => {
  const Component = IconComponent as any;
  return <Component className={className} size={size} />;
};

export default Icon; 