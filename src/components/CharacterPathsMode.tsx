
import React, { useState } from 'react';
import { Route, Navigation, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CharacterPathsModeProps {
  isActive: boolean;
  onToggle: () => void;
  onPathSelect: (pathId: string) => void;
  selectedPathId?: string;
}

const characterPaths = [
  {
    id: 'bloom-ulysses',
    character: 'Leopold Bloom',
    work: 'Ulysses by James Joyce',
    city: 'Dublin',
    estimatedTime: 240,
    difficulty: 'moderate',
    description: 'Follow Bloom\'s journey through Dublin on June 16, 1904',
    pointsCount: 15
  },
  {
    id: 'raskolnikov-crime',
    character: 'Raskolnikov',
    work: 'Crime and Punishment by Dostoevsky',
    city: 'St. Petersburg',
    estimatedTime: 180,
    difficulty: 'challenging',
    description: 'Walk through the psychological landscape of guilt and redemption',
    pointsCount: 12
  },
  {
    id: 'pip-expectations',
    character: 'Pip',
    work: 'Great Expectations by Charles Dickens',
    city: 'London',
    estimatedTime: 150,
    difficulty: 'easy',
    description: 'From the marshes to London society - Pip\'s transformation',
    pointsCount: 10
  }
];

export const CharacterPathsMode: React.FC<CharacterPathsModeProps> = ({
  isActive,
  onToggle,
  onPathSelect,
  selectedPathId,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'challenging': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="absolute top-20 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-amber-200 z-20">
      <div className="p-4 border-b border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Route className="h-5 w-5 text-amber-700" />
            <h3 className="font-semibold text-amber-900">Character Paths</h3>
          </div>
          <Button
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={onToggle}
            className={isActive ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-300 text-amber-700'}
          >
            {isActive ? 'Exit Path Mode' : 'Enable Paths'}
          </Button>
        </div>
      </div>

      {isActive && (
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {characterPaths.map((path) => (
              <Card 
                key={path.id}
                className={`cursor-pointer transition-all ${
                  selectedPathId === path.id 
                    ? 'ring-2 ring-amber-500 bg-amber-50' 
                    : 'hover:bg-amber-50'
                }`}
                onClick={() => onPathSelect(path.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-amber-900">
                    {path.character}
                  </CardTitle>
                  <p className="text-xs text-gray-600">{path.work}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-700 mb-2">{path.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {Math.floor(path.estimatedTime / 60)}h {path.estimatedTime % 60}m
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {path.pointsCount} stops
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
