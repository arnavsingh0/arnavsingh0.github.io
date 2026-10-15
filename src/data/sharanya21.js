// Edit the words in this file. The book reads everything from here.
// Photos live in public/sharanya21/photos. Clips, when added, use public/sharanya21/clips.

const photo = (id, caption, hiddenNote, fit) => ({
  src: `/sharanya21/photos/${id}.webp`,
  caption,
  hiddenNote: hiddenNote || null,
  fit: fit || "cover",
});

export const cover = {
  kicker: "for my shansu",
  title: "Happy 21st",
  name: "Shansu",
  subtitle: "21 reasons I love ju",
};

export const chapters = [
  {
    id: "i",
    kicker: "chapter i",
    title: "the beginning",
    line: "Ju said yes, and I had no idea what I was holding.",
  },
  {
    id: "ii",
    kicker: "chapter ii",
    title: "the middle of us",
    line: "The years we got good at this. The ordinary days I brag about.",
  },
  {
    id: "iii",
    kicker: "chapter iii",
    title: "all grown up",
    line: "Scrubs, graduations, and the girl from prom turning 21.",
  },
];

export const credits = [
  { role: "starring", name: "Sharanya Srivastava" },
  { role: "written and directed by", name: "Arnu" },
  { role: "filmed on", name: "four years of us" },
  { role: "shot on location in", name: "Vischer Ferry, Boston, Hanover, Cancun" },
  { role: "soundtrack", name: "every song ju put on in the car" },
  { role: "next scene", name: "Miami" },
];

export const backCover = {
  title: "I love ju",
  subtitle: "21, and counting",
  action: "one more thing, cutessuu",
};

// The tickets come after the book, right before the credits.
export const closing = {
  title: "and one more thing",
  text: "Four years, Shansu. Countless memories, and so many more to come. Thank ju for all of it, my cutessuu. These are not just tickets. They are places. With ju.",
  aside: "Scratch the first ticket. The gold one is jur dream, and I am not wiggling out of it.",
  next: "the dream one",
  action: "roll the credits",
};

export const tickets = [
  {
    id: "miami",
    airline: "Shansu Air",
    flight: "S21",
    from: "Wherever ju are",
    to: "Miami",
    scratch: true,
    passenger: "Sharanya",
    seat: "beside me",
    gate: "whenever ju say yes",
    valid: "whenever, forever",
    note: "First stop. Screenshot it, or just look at me and say Miami.",
    redeemedText: "It's a date, Shansu. Miami is ours.",
  },
  {
    id: "switzerland",
    airline: "Shansu Air",
    flight: "DREAM",
    from: "After Miami",
    to: "Switzerland",
    scratch: false,
    dream: true,
    passenger: "Sharanya",
    seat: "window, with me",
    gate: "jur dream, written down",
    valid: "whenever, forever",
    note: "Jur dream place. I wrote it on a ticket so it is real.",
    redeemedText: "Dream locked in. Switzerland, ju and me.",
  },
];

export const stickers = [
  { id: "heart", label: "heart" },
  { id: "jellycat", label: "jellycat" },
  { id: "matcha", label: "matcha" },
  { id: "heytea", label: "heytea" },
  { id: "seal", label: "seal" },
  { id: "sloth", label: "sloth" },
];

export const reasons = [
  {
    id: 1,
    title: "Ju actually said yes",
    text: "I shot my shot in 2021, all nervous, no idea what I was doing. And my cutessuu Shansu said yes. Look at us now. Best risk I ever took.",
    photos: [
      photo(
        "pickup",
        "sept 2021",
        "I was shoo nervous sending that first message. I still cannot believe ju wrote back.",
        "contain"
      ),
    ],
  },
  {
    id: 2,
    title: "Jur prom dress",
    text: "My favorite prom photo. Ju looking so beautiful in that dress, and the two of us all fitted up and so naive. I had no idea I was standing next to the gorguu girl I would get to love for years.",
    photos: [photo("prom-dress", "june 2022"), photo("prom-together", "prom night")],
  },
  {
    id: 3,
    title: "Our first kiss",
    text: "Vischer Ferry. Iconic, and the site of our first kiss. We keep finding our way back, and every time ju look so happy, like it is our first time there all over again.",
    photos: [
      photo("vischer-kiss", "june 2022", "I would do that first kiss again. Every time."),
      photo("vischer-return", "back again, 2026"),
    ],
  },
  {
    id: 4,
    title: "How shy we were",
    text: "The photobooth at Great Escape. I was so sho shy back then, and we looked shooo zooted, and I would not trade that day for anything.",
    photos: [photo("photobooth", "aug 2022")],
  },
  {
    id: 5,
    title: "How strong ju are",
    text: "Kayaking like ju were born on the water. Then canoeing, where ju literally carried me across the river. Strong and cutessuu. Completely unfair, Shansu.",
    photos: [photo("kayak", "aug 2022"), photo("canoe", "july 2024")],
  },
  {
    id: 6,
    title: "Ju show up",
    text: "South station pickups. Crazy how much has changed since freshman year, but ju still show up for me. Homecoming, the bus, the late one. That is my Shansu.",
    photos: [photo("south-station", "sept 2022"), photo("homecoming", "dartmouth")],
    clip: "us",
  },
  {
    id: 7,
    title: "Roaming with ju",
    text: "Boston marathon day. Shoo much fun to just wander with ju. Cherry blossoms, the long way around, nowhere we had to be. Maybe one day we run it together.",
    photos: [photo("marathon", "april 2023"), photo("west-village", "new york, the long way around")],
    clip: "citgo",
  },
  {
    id: 8,
    title: "That iconic picture",
    text: "I never knew how iconic this one was going to be. Now it is just us. My favorite kind of picture: ju, and the feeling that we were already a forever thing.",
    photos: [photo("iconic", "april 2023")],
    clip: "anniversary-faces",
  },
  {
    id: 9,
    title: "Our peace",
    text: "Welcome to Killy Billy. We were shoo chubuu and somehow so at peace. I love that version of us. I love this one too.",
    photos: [photo("killy", "sept 2023"), photo("killy-peace", "the chubuu era")],
  },
  {
    id: 10,
    title: "Birthdays with ju",
    text: "Gile hike for my Shansu day. Newport last year, looking shoo good with ju. Every birthday I just want to be next to ju. This one, jur 21st, most of all.",
    photos: [photo("gile", "oct 2023"), photo("newport", "oct 2025")],
    clip: "birthday-2022",
  },
  {
    id: 11,
    title: "Valentines, every version",
    text: "Happy Valentinesss. The food was so filling, yummm, and the aquarium, and the cafe after. I love a whole day that is just about ju.",
    photos: [photo("valentines", "feb 2024"), photo("aquarium", "feb 2026")],
  },
  {
    id: 12,
    title: "Holi haiiii",
    text: "Holiii haiiiii. Ju covered in color is one of my favorite versions of my Shans. Loud, bright, and still the cutest person there.",
    photos: [photo("holi", "march 2024")],
  },
  {
    id: 13,
    title: "Every anniversary",
    text: "Two years, then everything after. I love juu so much, Shansu. Thank ju for saying yes to another year, every single time.",
    photos: [photo("anniversary", "two years")],
    clip: "anniversary-2025",
  },
  {
    id: 14,
    title: "My cheepsuu babe",
    text: "Ju cheep so peacefully. At SOJ, on the couch, passing out like the day is allowed to be soft. My happy cheepsuu babe. I love ju most when ju are just resting.",
    photos: [
      photo(
        "cheepsu",
        "SOJ",
        "I could watch ju nap forever. Do not tell anyone I said it this soft."
      ),
      photo("cheepsu-happy", "my happy babe"),
    ],
  },
  {
    id: 15,
    title: "Jur smile",
    text: "Flume Gorge. That gorguuu black dress. Jur gorgeous smile. I can never get over it. Ju look shoo good from every angle and it is honestly not fair.",
    photos: [
      photo("flume", "aug 2024", "I still think about this dress. A lot. Ju know."),
    ],
    clip: "birthday-2023",
  },
  {
    id: 16,
    title: "Chef Shans",
    text: "She make the best flatbread everrrr. And ju dress up shoo nice just to feed us. My favorite chef, and it is not close.",
    photos: [photo("flatbread", "sept 2025")],
  },
  {
    id: 17,
    title: "Our ordinary days",
    text: "Cafe Landwer. Our classics, plus the revelation of free iced coffee. The after moments, the walking, the nothing-special days. Those are the ones I brag about.",
    photos: [photo("landwer", "our classic"), photo("car-snap", "car snaps, every drive")],
  },
  {
    id: 18,
    title: "My stargirl",
    text: "My stargirl. Concerts, Salem looking shoo aesthetic, nights that feel like a movie because ju are in them. I am just happy I get to stand next to ju.",
    photos: [photo("stargirl", "june 2025")],
  },
  {
    id: 19,
    title: "How proud ju make me",
    text: "Shoo cutessu in jur scrubs. And that surprise bouquet for jur first day on the MA job. I am so proud of ju, Shansu. Ju worked for all of it.",
    photos: [
      photo("scrubs", "jan 2026"),
      photo(
        "bouquet",
        "first day",
        "I was so nervous hiding those flowers. Worth every second."
      ),
    ],
  },
  {
    id: 20,
    title: "Ju on an adventure",
    text: "Cancun. The Mayan temple, but ju would be the only thing I would pray for. Captain Shans. Ju looking shoo wonderful, like every trip is better because ju are in it.",
    photos: [photo("cancun", "march 2026"), photo("cancun-sun", "captain shans")],
  },
  {
    id: 21,
    title: "How far ju have come",
    text: "Jur graduation. Our most grown-up photo, of the girl from prom who is now 21. Always big congratss, my cutessuu. Happy birthday, Shansu. I love ju. I am so lucky it is ju.",
    photos: [
      photo(
        "graduation",
        "june 2026",
        "Turn the page, cutessuu. Jur present is waiting."
      ),
    ],
  },
];

// Soundtrack, one song per scene. Drop the files into public/sharanya21/audio
// and point each scene at one. Scenes that share a file keep the song playing
// across the cut; different files crossfade. If a file is missing, the piano
// score plays instead, so nothing breaks while you're still collecting songs.
//   volume: resting level (0 to 1)    swell: level at the big moment
//   start: seconds to skip into the song, for getting straight to the good bit
//   loop: false plays the song once, then `after` (or the piano score) takes over
export const music = {
  titles: { src: "/sharanya21/audio/score.mp3", volume: 0.4 },
  trace: { src: "/sharanya21/audio/score.mp3", volume: 0.4 },
  shots: { src: "/sharanya21/audio/score.mp3", volume: 0.4 },
  // the singing from her 2022 birthday clip, once, then the piano comes back
  candles: {
    src: "/sharanya21/audio/birthday-2022.m4a",
    volume: 0.85,
    swell: 0.85,
    loop: false,
    after: "/sharanya21/audio/score.mp3",
  },
  book: { src: "/sharanya21/audio/book.mp3", volume: 0.4, start: 0 },
  tickets: { src: "/sharanya21/audio/book.mp3", volume: 0.4 },
  credits: { src: "/sharanya21/audio/credits.mp3", volume: 0.6, start: 0 },
};

export const clips = {
  us: {
    src: "/sharanya21/clips/us.mp4",
    poster: "/sharanya21/clips/us.jpg",
    label: "a cool girlfriend",
  },
  citgo: {
    src: "/sharanya21/clips/citgo.mp4",
    poster: "/sharanya21/clips/citgo.jpg",
    label: "brighter than the citgo",
  },
  "anniversary-faces": {
    src: "/sharanya21/clips/anniversary-faces.mp4",
    poster: "/sharanya21/clips/anniversary-faces.jpg",
    label: "she joined me",
    vertical: true,
  },
  "birthday-2023": {
    src: "/sharanya21/clips/birthday-2023.mp4",
    poster: "/sharanya21/clips/birthday-2023.jpg",
    label: "that face",
    vertical: true,
  },
  "anniversary-2025": {
    src: "/sharanya21/clips/anniversary-2025.mp4",
    poster: "/sharanya21/clips/anniversary-2025.jpg",
    label: "three years",
    vertical: true,
  },
  "birthday-2022": {
    src: "/sharanya21/clips/birthday-2022.mp4",
    poster: "/sharanya21/clips/birthday-2022.jpg",
    label: "a film for ju",
  },
};

// Small jokes that live outside the pages. All yours to edit.
export const extras = {
  // the footnote on the dream ticket
  dreamTerms: "terms & conditions: none. seriously. arnu is not getting out of this one.",
  // the sloth that hangs around the book. slow talker, so keep these short.
  sloth: {
    tap: [
      "hi Shansu",
      "slow down, i'm still reading",
      "ju look gorguu today",
      "arnu made me do this",
      "i'm the heavily featured one",
      "pet me again. slowly.",
      "cutessuu",
      "it's jur birthday?? no way",
    ],
    chapter: ["ooh, new chapter", "this is the good part", "keep going, keep going"],
    pages: {
      cover: "open it, open it",
      letter: "i'm not crying. ju are.",
      back: "that's the book. i'm staying though.",
    },
    sleepy: "zzz",
  },
};
