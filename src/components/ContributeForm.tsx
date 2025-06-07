
import React, { useState } from 'react';
import { Plus, X, Upload, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContributeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ContributeForm: React.FC<ContributeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    literaryWork: '',
    author: '',
    significance: '',
    address: '',
    latitude: '',
    longitude: '',
    quotes: [''],
    tags: [],
    newTag: ''
  });

  const categories = [
    { id: 'literary', label: 'Literature', emoji: '📚' },
    { id: 'historical', label: 'History', emoji: '🏛️' },
    { id: 'art', label: 'Art', emoji: '🎨' },
    { id: 'philosophy', label: 'Philosophy', emoji: '🧠' },
    { id: 'myths', label: 'Myths & Legends', emoji: '🗿' }
  ];

  const addQuote = () => {
    setFormData(prev => ({
      ...prev,
      quotes: [...prev.quotes, '']
    }));
  };

  const updateQuote = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      quotes: prev.quotes.map((quote, i) => i === index ? value : quote)
    }));
  };

  const removeQuote = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quotes: prev.quotes.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag],
        newTag: ''
      }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-amber-900">Contribute a Landmark</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Joyce Tower, Martello Tower..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the historical or literary significance of this location..."
              rows={3}
            />
          </div>

          {formData.category === 'literary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Literary Work</label>
                <Input
                  value={formData.literaryWork}
                  onChange={(e) => setFormData(prev => ({ ...prev, literaryWork: e.target.value }))}
                  placeholder="Ulysses, Crime and Punishment..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Author</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="James Joyce, Fyodor Dostoevsky..."
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Full address of the location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Latitude</label>
              <Input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                placeholder="53.4084"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Longitude</label>
              <Input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                placeholder="-6.1754"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Quotes</label>
              <Button variant="outline" size="sm" onClick={addQuote}>
                <Plus className="h-3 w-3 mr-1" />
                Add Quote
              </Button>
            </div>
            {formData.quotes.map((quote, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Textarea
                  value={quote}
                  onChange={(e) => updateQuote(index, e.target.value)}
                  placeholder="Add a relevant quote from the work..."
                  rows={2}
                  className="flex-1"
                />
                {formData.quotes.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeQuote(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={formData.newTag}
                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                placeholder="Add tags..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button variant="outline" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={() => onSubmit(formData)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Submit Contribution
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
