
import React from 'react';
import { X, MapPin, Calendar, BookOpen, Clock, Globe, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Landmark } from '../types/landmark';

interface LandmarkModalProps {
  landmark: Landmark;
  onClose: () => void;
}

export const LandmarkModal: React.FC<LandmarkModalProps> = ({ landmark, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-amber-700 hover:text-amber-900"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex items-start space-x-4">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${landmark.category === 'literary' ? 'bg-emerald-500' : 'bg-blue-500'}
            `}>
              {landmark.category === 'literary' ? (
                <BookOpen className="h-6 w-6 text-white" />
              ) : (
                <MapPin className="h-6 w-6 text-white" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-amber-900 font-serif">{landmark.title}</h2>
                <Badge 
                  variant="secondary"
                  className={`${
                    landmark.category === 'literary' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {landmark.category}
                </Badge>
              </div>
              
              <div className="flex items-center text-amber-700 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {landmark.city}, {landmark.country}
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          {/* Main content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{landmark.description}</p>
            </div>

            {/* Literary info */}
            {landmark.literaryWork && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-900 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Literary Connection
                </h3>
                <p className="text-emerald-800">
                  Featured in <span className="font-semibold italic">"{landmark.literaryWork}"</span> by {landmark.author}
                </p>
              </div>
            )}

            {/* Historical info */}
            {landmark.historicalPeriod && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Historical Information
                </h3>
                <div className="space-y-1 text-blue-800">
                  <p>Period: {landmark.historicalPeriod}</p>
                  {landmark.yearBuilt && <p>Built: {landmark.yearBuilt}</p>}
                </div>
              </div>
            )}

            {/* Fun facts */}
            {landmark.funFacts.length > 0 && (
              <div>
                <h3 className="font-semibold text-amber-900 mb-3">Did You Know?</h3>
                <div className="space-y-2">
                  {landmark.funFacts.map((fact, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visiting information */}
            {landmark.visitingInfo && (
              <div>
                <h3 className="font-semibold text-amber-900 mb-3">Visiting Information</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-600">{landmark.visitingInfo.address}</p>
                    </div>
                  </div>
                  
                  {landmark.visitingInfo.openingHours && (
                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Opening Hours</p>
                        <p className="text-sm text-gray-600">{landmark.visitingInfo.openingHours}</p>
                      </div>
                    </div>
                  )}
                  
                  {landmark.visitingInfo.website && (
                    <div className="flex items-start space-x-2">
                      <Globe className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Website</p>
                        <a 
                          href={landmark.visitingInfo.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Visit website
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {landmark.visitingInfo.ticketPrice && (
                    <div className="flex items-start space-x-2">
                      <Ticket className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Ticket Price</p>
                        <p className="text-sm text-gray-600">{landmark.visitingInfo.ticketPrice}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Contributor info */}
            <div className="text-xs text-gray-500">
              {landmark.contributedBy && (
                <p>Contributed by {landmark.contributedBy}</p>
              )}
              <p>Added on {new Date(landmark.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
