/*
  Site content, kept apart from markup and behaviour.
  Each collection maps 1:1 to a future CMS content type (Experience, DayMoment,
  MapPlace, ItineraryBlock, JournalNote), so a headless CMS (Sanity, Strapi,
  WordPress REST) can replace this file without touching layout or scripts.
*/
window.SITE = {
  experiences: [
    { id: 'drives', group: 'land', tag: 'On the land', title: 'Guided nature drives', text: 'Open vehicles, wide plains and guides who read the reserve like a book. Oryx, springbok and the small lives most people miss.', img: 'assets/game-drive.jpg', size: 'wide' },
    { id: 'walks', group: 'land', tag: 'On the land', title: 'Walks into open country', text: 'Slow walks over red sand and through the boulders, at the pace of whatever you stop to look at.', img: 'assets/walking.jpg', pos: '72% center', size: 'tall' },
    { id: 'bikes', group: 'land', tag: 'On the land', title: 'E-fat biking the dunes', text: 'Quiet electric fat bikes that glide over sand and gravel plains, with no engine noise.', img: 'assets/fat-biking.jpg' },
    { id: 'picnic', group: 'slow', tag: 'Slow time', title: 'Picnics in the dunes', text: 'A table set where the red dunes meet the plains, so lunch can run as long as you like.', img: 'assets/dune-picnic.jpg' },
    { id: 'deck', group: 'slow', tag: 'Slow time', title: 'Long afternoons on the deck', text: 'Shade, a book and a view that changes colour every hour. Doing very little is part of the plan.', img: 'assets/enjoying.jpg' },
    { id: 'sundowners', group: 'dark', tag: 'After dark', title: 'Sundowners on the ridge', text: 'Climb a little higher as the light turns gold, then watch the plains go pink and violet.', img: 'assets/sundowners.jpg', size: 'wide' },
    { id: 'stars', group: 'dark', tag: 'After dark', title: 'A sky full of stars', text: 'NamibRand is an International Dark Sky Reserve. After dark, the Milky Way stretches from one horizon to the other.', img: null }
  ],

  day: [
    { time: '05:45', label: 'First light', title: 'Coffee before the sun', text: 'Wrapped in a blanket, a hot cup on the bonnet, watching the plains turn from grey to gold.', img: 'assets/morning-coffee.jpg', bg: '#f3d9c4', ink: '#2a1a12' },
    { time: '08:30', label: 'Morning', title: 'Out across the sand', text: 'A drive, a walk or a ride over the dunes while the air is still cool and the tracks are fresh.', img: 'assets/fat-biking.jpg', bg: '#f6e3b4', ink: '#2a1f0d' },
    { time: '13:00', label: 'Midday', title: 'Back to the boulders', text: 'Lunch in camp, then the shade of your tent and the soft sound of canvas in the wind.', img: 'assets/room-deck.jpg', bg: '#efe6d6', ink: '#1f2a2c' },
    { time: '18:10', label: 'Golden hour', title: 'The ridge at sunset', text: 'The granite glows orange, the mountains turn violet and everyone goes quiet.', img: 'assets/sundowners.jpg', bg: '#d9622b', ink: '#fff6ec' },
    { time: '21:30', label: 'Night', title: 'Look up', text: 'No light pollution for miles. The sky is so full of stars that it hardly looks real.', img: null, bg: '#0f1d2b', ink: '#f4ead8' }
  ],

  places: [
    { id: 'camp', x: 58, y: 56, title: 'Boulders Camp', kind: 'Your base', text: 'A small cluster of canvas tents tucked into a granite outcrop, far from any other lodge.', img: 'assets/aerial-boulders.jpg' },
    { id: 'dunes', x: 22, y: 30, title: 'The red dunes', kind: 'Morning & picnics', text: 'Long rust-coloured dune lines are a favourite place for picnics and slow walks.', img: 'assets/dune-picnic.jpg' },
    { id: 'circles', x: 40, y: 72, title: 'Fairy circle plains', kind: 'Drives & walks', text: 'Thousands of bare rings in the grass, and scientists still argue about what causes them.', img: 'assets/fairy-circle-camp.jpg' },
    { id: 'mountains', x: 78, y: 24, title: 'Mountain ridges', kind: 'Sundowners', text: 'Ridges on the horizon catch the last light. This is where sundowners happen.', img: 'assets/solitude.jpg' },
    { id: 'plains', x: 30, y: 52, title: 'Open grass plains', kind: 'Wildlife', text: 'Wide grass plains where oryx, springbok and ostrich roam freely.', img: 'assets/aerial-plains.jpg' }
  ],

  // Planner building blocks. Arrival and departure days are fixed; middle days draw from the chosen mood.
  planner: {
    moods: {
      quiet: { label: 'Quiet', line: 'Slow mornings, long views, nothing to rush.' },
      adventure: { label: 'A little adventure', line: 'Out on the land each day, with time to recover.' },
      wonder: { label: 'Wonder after dark', line: 'Days that build towards golden hour and the stars.' }
    },
    arrive: { title: 'Arrive into the silence', text: 'Settle into your tent, take a first walk through the boulders, then sundowners.', img: 'assets/boulders-sunset.jpg' },
    depart: { title: 'One last sunrise', text: 'Coffee at first light and a slow breakfast before you leave.', img: 'assets/morning-coffee.jpg' },
    days: {
      quiet: [
        { title: 'A day without plans', text: 'Breakfast on the deck, a book in the shade and a short guided walk when the heat breaks.', img: 'assets/enjoying.jpg' },
        { title: 'Lunch in the dunes', text: 'A picnic where the red sand meets the plains, then a slow drive back.', img: 'assets/dune-picnic.jpg' },
        { title: 'Space to breathe', text: 'A guided walk at dawn, then time alone with the landscape.', img: 'assets/space-to-breathe.jpg' }
      ],
      adventure: [
        { title: 'Dunes by fat bike', text: 'Ride over sand and gravel plains on quiet e-fat bikes, then have lunch back in camp.', img: 'assets/fat-biking.jpg' },
        { title: 'Tracking the plains', text: 'A long nature drive across the fairy circle plains looking for oryx and springbok.', img: 'assets/game-drive.jpg' },
        { title: 'Walk the red sand', text: 'A guided morning walk that reads tracks, plants and stories in the sand.', img: 'assets/walking.jpg' }
      ],
      wonder: [
        { title: 'Golden hour on the ridge', text: 'An afternoon drive that ends with sundowners as the mountains turn violet.', img: 'assets/sundowners.jpg' },
        { title: 'The Milky Way', text: 'Supper under the open sky, then a guided tour of the Southern Hemisphere stars.', img: null },
        { title: 'Solitude at dusk', text: 'A quiet walk to a lookout as the light fades over the plains.', img: 'assets/solitude.jpg' }
      ]
    }
  },

  journal: [
    { tag: 'Nature', date: 'Field note', title: 'What are fairy circles?', text: 'The bare rings in the NamibRand grass are one of the desert’s great mysteries. Termites and plants competing for water are the two leading explanations, and you can see both from camp.', img: 'assets/fairy-circles.jpg' },
    { tag: 'Night sky', date: 'Field note', title: 'Why the stars feel closer here', text: 'With dry air, high altitude and no towns nearby, the NamibRand has some of the darkest skies in Africa. Bring a jacket and stay up late.', img: null },
    { tag: 'Planning', date: 'Travel guide', title: 'When to visit the Namib', text: 'Winter (May–August) brings crisp nights and warm days. Spring and early summer bring long golden evenings. The desert is beautiful all year round.', img: 'assets/space-to-breathe.jpg' }
  ]
};
