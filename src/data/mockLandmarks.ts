
import { Landmark } from '../types/landmark';

export const mockLandmarks: Landmark[] = [
  {
    id: '1',
    title: 'Martello Tower Sandycove',
    description: 'The opening location of James Joyce\'s Ulysses, where Buck Mulligan shaves. This Napoleonic tower now houses the James Joyce Museum.',
    category: 'literary',
    latitude: 53.2902,
    longitude: -6.1175,
    city: 'Dublin',
    country: 'Ireland',
    literaryWork: 'Ulysses',
    author: 'James Joyce',
    images: [],
    contributedBy: 'Literary Dublin Society',
    createdAt: '2024-01-15T10:00:00Z',
    funFacts: [
      'Joyce actually lived in this tower for a brief period in 1904',
      'The tower appears in the very first chapter of Ulysses',
      'Oliver St. John Gogarty, the inspiration for Buck Mulligan, rented the tower'
    ],
    visitingInfo: {
      address: 'Sandycove Point, Dublin, Ireland',
      openingHours: 'Apr-Oct: Mon-Sat 10am-6pm, Sun 11am-6pm',
      website: 'https://jamesjoyce.ie',
      ticketPrice: '€10 adults, €8 students'
    }
  },
  {
    id: '2',
    title: 'Sweny\'s Pharmacy',
    description: 'The historic pharmacy where Leopold Bloom buys lemon soap in Ulysses. Still operating and now a Joyce cultural center.',
    category: 'literary',
    latitude: 53.3415,
    longitude: -6.2539,
    city: 'Dublin',
    country: 'Ireland',
    literaryWork: 'Ulysses',
    author: 'James Joyce',
    images: [],
    contributedBy: 'Bloomsday Festival',
    createdAt: '2024-01-16T14:30:00Z',
    funFacts: [
      'You can still buy the same lemon soap that Bloom purchased',
      'The pharmacy hosts daily readings from Ulysses',
      'The original Victorian fittings remain intact'
    ],
    visitingInfo: {
      address: '1 Lincoln Place, Dublin 2, Ireland',
      openingHours: 'Mon-Sat 11am-5pm',
      website: 'https://sweny.ie',
      ticketPrice: 'Free (donations welcome)'
    }
  },
  {
    id: '3',
    title: 'Trinity College Library',
    description: 'Home to the Book of Kells and the inspiration for the Jedi Archives in Star Wars. Contains over 200,000 of Trinity\'s oldest books.',
    category: 'historical',
    latitude: 53.3438,
    longitude: -6.2546,
    city: 'Dublin',
    country: 'Ireland',
    historicalPeriod: 'Medieval-Modern',
    yearBuilt: 1732,
    images: [],
    contributedBy: 'Historical Dublin',
    createdAt: '2024-01-10T09:15:00Z',
    funFacts: [
      'The Long Room is 65 meters long and houses 200,000 books',
      'It was a filming location for Star Wars and Harry Potter films',
      'Brian Boru\'s harp, symbol of Ireland, is displayed here'
    ],
    visitingInfo: {
      address: 'College Green, Dublin 2, Ireland',
      openingHours: 'Daily 9:30am-5pm (May-Sep until 6pm)',
      website: 'https://www.tcd.ie/visitors/book-of-kells/',
      ticketPrice: '€16 adults, €14 students'
    }
  },
  {
    id: '4',
    title: 'Globe Theatre',
    description: 'Reconstruction of Shakespeare\'s original theatre where many of his greatest plays were first performed.',
    category: 'literary',
    latitude: 51.5081,
    longitude: -0.0972,
    city: 'London',
    country: 'England',
    literaryWork: 'Various Shakespeare plays',
    author: 'William Shakespeare',
    images: [],
    contributedBy: 'Shakespeare Society',
    createdAt: '2024-01-12T16:45:00Z',
    funFacts: [
      'The original theatre burned down during a performance of Henry VIII in 1613',
      'This reconstruction uses traditional materials and techniques',
      'Performances are held in natural light, just as in Shakespeare\'s time'
    ],
    visitingInfo: {
      address: '21 New Globe Walk, London SE1 9DT, UK',
      openingHours: 'Daily 9am-5:30pm (performance days vary)',
      website: 'https://www.shakespearesglobe.com',
      ticketPrice: '£17 adults, £15.50 concessions'
    }
  },
  {
    id: '5',
    title: 'Café de Flore',
    description: 'Historic Parisian café frequented by existentialist philosophers Sartre, de Beauvoir, and Camus. A center of intellectual life.',
    category: 'literary',
    latitude: 48.8542,
    longitude: 2.3347,
    city: 'Paris',
    country: 'France',
    literaryWork: 'Various existentialist works',
    author: 'Jean-Paul Sartre, Simone de Beauvoir',
    images: [],
    contributedBy: 'Paris Literary Tours',
    createdAt: '2024-01-14T11:20:00Z',
    funFacts: [
      'Sartre and de Beauvoir had their regular table upstairs',
      'The café has been operating since 1887',
      'It was a meeting place for the French Resistance during WWII'
    ],
    visitingInfo: {
      address: '172 Boulevard Saint-Germain, 75006 Paris, France',
      openingHours: 'Daily 7am-2am',
      website: 'https://cafedeflore.fr',
      ticketPrice: 'No entry fee (café prices apply)'
    }
  },
  {
    id: '6',
    title: 'Machu Picchu',
    description: 'Ancient Incan citadel perched high in the Andes Mountains, one of the New Seven Wonders of the World.',
    category: 'historical',
    latitude: -13.1631,
    longitude: -72.5450,
    city: 'Cusco Region',
    country: 'Peru',
    historicalPeriod: 'Inca Empire',
    yearBuilt: 1450,
    images: [],
    contributedBy: 'Andean Heritage Foundation',
    createdAt: '2024-01-08T13:00:00Z',
    funFacts: [
      'It was never discovered by Spanish conquistadors',
      'Built without mortar, the stones fit so perfectly a knife blade can\'t fit between them',
      'It\'s aligned with astronomical events like solstices'
    ],
    visitingInfo: {
      address: 'Machu Picchu, Cusco Region, Peru',
      openingHours: 'Daily 6am-5:30pm (advance booking required)',
      website: 'https://www.machupicchu.gob.pe',
      ticketPrice: '$47 USD (foreigners), advance booking required'
    }
  }
];
