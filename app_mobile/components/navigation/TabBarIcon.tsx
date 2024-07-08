import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';

type IconProps = {
  name: ComponentProps<typeof Ionicons>['name'];
  color: string;
};

export function TabBarIcon({ name, color }: IconProps) {
  return <Ionicons name={name} size={28} style={{ marginBottom: -3 }} color={color} />;
}
