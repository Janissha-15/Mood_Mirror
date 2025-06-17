const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET =
  process.env.JWT_SECRET || "Janissha_personal_project_27_05_2025";

const mongoURI =
  "mongodb+srv://janissha1506:Kuty1215@janissha.ibo9dly.mongodb.net/?retryWrites=true&w=majority&appName=Janissha";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied, no token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// Journal Schema
const journalEntrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: String,
  createdAt: { type: Date, default: Date.now },
});
const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

// Mood keywords dictionary (extended)
const moodKeywords = {
  happy: [
    "accomplished",
    "achieved",
    "adequate",
    "affectionate",
    "agreeable",
    "airy",
    "amazed",
    "amped",
    "animated",
    "appreciative",
    "astonished",
    "at ease",
    "awed",
    "beaming",
    "beatific",
    "blessed",
    "blissful",
    "bouncy",
    "bright",
    "bubbly",
    "carefree",
    "captivated",
    "celebratory",
    "charmed",
    "cheerful",
    "chipper",
    "chuffed",
    "chuckling",
    "comfortable",
    "confident",
    "content",
    "copacetic",
    "delighted",
    "dynamic",
    "eager",
    "easygoing",
    "ecstatic",
    "elated",
    "electrified",
    "enchanted",
    "energized",
    "enlightened",
    "enthusiastic",
    "euphoric",
    "exhilarated",
    "exuberant",
    "exultant",
    "favored",
    "felicitous",
    "festive",
    "fine",
    "fortunate",
    "fulfilled",
    "giddy",
    "giggling",
    "gleeful",
    "glorious",
    "good",
    "graceful",
    "grateful",
    "gratified",
    "happy",
    "holy",
    "honored",
    "hunky-dory",
    "in seventh heaven",
    "inspired",
    "jolly",
    "jovial",
    "joyous",
    "jubilant",
    "laughing",
    "lighthearted",
    "lively",
    "lucky",
    "merry",
    "nice",
    "on cloud nine",
    "over the moon",
    "overjoyed",
    "peaceful",
    "peppy",
    "perky",
    "pleasant",
    "playful",
    "pleased",
    "positive",
    "privileged",
    "proud",
    "pumped",
    "radiant",
    "rapturous",
    "reverent",
    "sacred",
    "sanguine",
    "satisfactory",
    "satisfied",
    "serene",
    "smiling",
    "sparkling",
    "spirited",
    "sprightly",
    "stoked",
    "successful",
    "sunny",
    "thankful",
    "thrilled",
    "tickled",
    "tranquil",
    "transcendent",
    "triumphant",
    "twinkling",
    "untroubled",
    "upbeat",
    "validated",
    "victorious",
    "vibrant",
    "vivacious",
    "walking on air",
    "worthy",
    "zealous",
    "zippy",
  ],
  sad: [
    "abandoned",
    "aching",
    "alienated",
    "anguished",
    "apologetic",
    "ashamed",
    "bawling",
    "beaten",
    "bereaved",
    "bitter",
    "blue",
    "broken",
    "compunctious",
    "contrite",
    "crestfallen",
    "crushed",
    "crying",
    "defeated",
    "dejected",
    "depressed",
    "desolate",
    "despairing",
    "despondent",
    "detached",
    "disappointed",
    "disconnected",
    "discouraged",
    "disheartened",
    "dismayed",
    "dissatisfied",
    "doleful",
    "down",
    "downcast",
    "drained",
    "drooping",
    "embittered",
    "exhausted",
    "fatigued",
    "forlorn",
    "forsaken",
    "gloomy",
    "glum",
    "grieving",
    "guilty",
    "heartache",
    "heartbroken",
    "heavy-hearted",
    "hopeless",
    "inconsolable",
    "isolated",
    "lachrymose",
    "languishing",
    "let down",
    "lethargic",
    "listless",
    "lonely",
    "lonesome",
    "low",
    "melancholy",
    "miserable",
    "moody",
    "morose",
    "mourning",
    "neglected",
    "pensive",
    "penitent",
    "regretful",
    "rejected",
    "remorseful",
    "resigned",
    "rueful",
    "sad",
    "self-reproachful",
    "sighing",
    "slumped",
    "sniffling",
    "sobbing",
    "somber",
    "sorrowful",
    "subdued",
    "tearful",
    "tormented",
    "unhappy",
    "weary",
    "weeping",
    "weepy",
    "woeful",
    "wretched",
  ],
  angry: [
    "acrimonious",
    "aggravated",
    "aggressive",
    "angry",
    "annoyed",
    "antagonistic",
    "belligerent",
    "bellicose",
    "berserk",
    "bitter",
    "boiling",
    "bothered",
    "brooding",
    "cantankerous",
    "combative",
    "confrontational",
    "contentious",
    "crabby",
    "cranky",
    "destructive",
    "disgruntled",
    "displeased",
    "dour",
    "embittered",
    "enraged",
    "exasperated",
    "explosive",
    "fed up",
    "flaring",
    "frustrated",
    "fuming",
    "furious",
    "glowering",
    "grouchy",
    "growling",
    "grudge-bearing",
    "grumpy",
    "harried",
    "hassled",
    "hostile",
    "hot under collar",
    "incensed",
    "infuriated",
    "irate",
    "irritated",
    "irked",
    "livid",
    "mad",
    "malicious",
    "maniacal",
    "miffed",
    "murderous",
    "ornery",
    "outraged",
    "peeved",
    "petulant",
    "pugnacious",
    "rabid",
    "rampaging",
    "rancorous",
    "resentful",
    "seething",
    "seeing red",
    "spiteful",
    "steaming",
    "stormy",
    "sulky",
    "sullen",
    "testy",
    "truculent",
    "uncontrollable",
    "vengeful",
    "vexed",
    "vindictive",
    "violent",
    "wrathful",
  ],
  anxious: [
    "afraid",
    "agitated",
    "alarmed",
    "ambivalent",
    "anxious",
    "apprehensive",
    "awkward",
    "bedeviled",
    "breathless",
    "choking",
    "compulsive",
    "conflicted",
    "consumed",
    "dizzy",
    "doubtful",
    "dread",
    "edgy",
    "fearful",
    "feverish",
    "fidgety",
    "fixated",
    "flustered",
    "foreboding",
    "frightened",
    "haunted",
    "hesitant",
    "horrified",
    "hounded",
    "hyperventilating",
    "insecure",
    "jittery",
    "lightheaded",
    "nauseous",
    "nervous",
    "obsessive",
    "on edge",
    "overwhelmed",
    "palpitating",
    "panicked",
    "petrified",
    "plagued",
    "preoccupied",
    "rattled",
    "reticent",
    "scared",
    "self-conscious",
    "shaking",
    "shy",
    "snowed under",
    "stressed",
    "swamped",
    "tense",
    "terrified",
    "terror-stricken",
    "timid",
    "tormented",
    "torn",
    "trembling",
    "uncertain",
    "uneasy",
    "unsure",
    "vacillating",
    "wavering",
    "worried",
  ],
  excited: [
    "agog",
    "amped",
    "animated",
    "antsy",
    "ardent",
    "astonished",
    "astounded",
    "awestruck",
    "bouncing",
    "buzzing",
    "celebratory",
    "delirious",
    "dazzled",
    "dynamic",
    "eager",
    "ecstatic",
    "electric",
    "elated",
    "energized",
    "enthusiastic",
    "euphoric",
    "exhilarated",
    "exuberant",
    "exultant",
    "fervent",
    "feverish",
    "fired up",
    "fiery",
    "flabbergasted",
    "fluttering",
    "frenzied",
    "giddy",
    "gleaming",
    "gleeful",
    "glorious",
    "hyper",
    "impatient",
    "intense",
    "itching",
    "jittery",
    "jubilant",
    "jumping",
    "keen",
    "keyed up",
    "merry",
    "passionate",
    "psyched",
    "pumped",
    "quivering",
    "rapturous",
    "restless",
    "raring",
    "spirited",
    "stoked",
    "thrilled",
    "tingling",
    "triumphant",
    "victorious",
    "vibrant",
    "vivacious",
    "wired",
    "wound up",
    "zealous",
  ],
  love: [
    "adore",
    "adoring",
    "affection",
    "amour",
    "angel",
    "apple of my eye",
    "ardor",
    "beloved",
    "besotted",
    "blessed",
    "boundless",
    "beau",
    "benevolence",
    "best friend",
    "blood bond",
    "boundless",
    "bromance",
    "buttercup",
    "butterflies in stomach",
    "butterfly",
    "captivated",
    "care for",
    "caress",
    "cherish",
    "companion",
    "compassion",
    "confidant",
    "consort",
    "courtly",
    "crush",
    "cupcake",
    "cuddle",
    "darling",
    "dear",
    "dearest",
    "desire",
    "devoted",
    "devotion",
    "enamored",
    "endearment",
    "enthralled",
    "eternal",
    "fidelity",
    "filial",
    "flames of passion",
    "fond",
    "fondle",
    "forbidden",
    "friendship",
    "glow",
    "goodwill",
    "harmony",
    "head over heels",
    "heart",
    "heartfelt",
    "heartthrob",
    "honey",
    "hold dear",
    "hug",
    "humanity",
    "idolize",
    "ineffable",
    "infatuation",
    "inamorata",
    "inamorato",
    "intimacy",
    "kindred spirit",
    "kiss",
    "kinship",
    "longing",
    "lovable",
    "love",
    "love at first sight",
    "love of my life",
    "lovemaking",
    "lover",
    "matrimony",
    "motherly",
    "paramour",
    "partner",
    "partner in crime",
    "passion",
    "passionate",
    "pen pal",
    "pining",
    "platonic",
    "pop the question",
    "prize",
    "profound",
    "puppy love",
    "ride or die",
    "romance",
    "saccharine",
    "sacred",
    "self-acceptance",
    "self-care",
    "self-compassion",
    "self-esteem",
    "self-kindness",
    "self-love",
    "self-respect",
    "self-validation",
    "self-worth",
    "serenade",
    "smitten",
    "snuggle",
    "soul bond",
    "soulmate",
    "spellbound",
    "spouse",
    "squad",
    "star-crossed",
    "suitor",
    "sunshine",
    "sweet",
    "sweetheart",
    "sweetie",
    "tie the knot",
    "treasure",
    "true love",
    "unbreakable",
    "unconditional",
    "union",
    "unrequited",
    "vows",
    "wedding",
    "whirlwind romance",
    "womance",
    "worship",
    "yearning",
  ],
};
// Root test
app.get("/", (req, res) => {
  res.send("MoodJournal Backend is running!");
});

// ✅ GET All entries
app.get("/api/journal", authenticateToken, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST Create with Mood Detection using keyword dictionary
// ✅ POST Create with Mood Detection using keyword dictionary
app.post("/api/journal", authenticateToken, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  // In your backend POST /api/journal endpoint:
  const lowerText = text.toLowerCase();
  let mood = "Neutral";

  // Check each mood category with case-insensitive matching
  const checkMood = (keywords) =>
    keywords.some((word) => {
      const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, "i");
      return regex.test(text);
    });

  if (checkMood(moodKeywords.happy)) {
    mood = "Happy";
  } else if (checkMood(moodKeywords.angry)) {
    mood = "Angry";
  } else if (checkMood(moodKeywords.sad)) {
    mood = "Sad";
  } else if (checkMood(moodKeywords.love)) {
    mood = "Love";
  } else if (checkMood(moodKeywords.anxious)) {
    mood = "Anxious";
  } else if (checkMood(moodKeywords.excited)) {
    mood = "Excited";
  }

  try {
    const newEntry = new JournalEntry({
      text,
      userId: req.user.userId,
      mood,
    });

    await newEntry.save();

    // ✅ Update user's mood history (if mood is not Neutral)
    if (mood !== "Neutral") {
      await User.findByIdAndUpdate(req.user.userId, {
        $push: { moodHistory: mood },
      });
    }

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE Entry
app.delete("/api/journal/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await JournalEntry.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    if (!deletedEntry)
      return res
        .status(404)
        .json({ error: "Entry not found or not authorized" });
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ token, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
