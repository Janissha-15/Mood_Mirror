import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL =
  "https://0a8027a8-5101-4ea7-a058-14df90716a40-00-blwls7y3w3ni.pike.replit.dev";

const moodEmojis = {
  happy: "😊",
  sad: "😢",
  neutral: "😐",
  angry: "😠",
  excited: "🤩",
  anxious: "😰",
  love: "😍",
};

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

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("neutral");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchEntries();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  // Mood detection based on keywords
  function detectMood(text) {
    const lowerText = text.toLowerCase();
    const moodScores = {};

    // Initialize scores for all moods
    Object.keys(moodKeywords).forEach((mood) => {
      moodScores[mood] = 0;
    });

    // Score each mood based on keyword matches
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      for (const word of keywords) {
        // Use word boundaries for more accurate matching
        const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, "i");
        if (regex.test(text)) {
          moodScores[mood]++;
        }
      }
    }

    // Find the mood with highest score
    let maxScore = 0;
    let detectedMood = "neutral";

    for (const [mood, score] of Object.entries(moodScores)) {
      if (score > maxScore) {
        maxScore = score;
        detectedMood = mood;
      }
    }

    // Only return a mood if we have at least 2 matches (adjust threshold as needed)
    return maxScore >= 1 ? detectedMood : "neutral";
  }

  // Update entry AND mood on text change
  function handleEntryChange(e) {
    const text = e.target.value;
    setEntry(text);
    setMood(detectMood(text));
  }
  async function fetchEntries() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/journal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load entries");
      const data = await res.json();
      console.log("Fetched entries:", data); // Debug log
      setEntries(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function saveEntry() {
    if (!entry.trim()) return;
    setLoading(true);
    setError("");
    try {
      const detectedMood = detectMood(entry);
      const res = await fetch(`${BACKEND_URL}/api/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: entry,
          mood: detectedMood, // Send the detected mood
        }),
      });
      if (!res.ok) throw new Error("Failed to save entry");
      const saved = await res.json();
      console.log("Saved entry:", saved); // Debug log
      setEntries([{ ...saved, mood }, ...entries]);
      setEntry("");
      setMood("neutral");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setEntries([]);
    setEntry("");
    navigate("/");
  }

  return (
    <div className="app-wrapper">
      <header className="app-header" style={{ padding: "1rem" }}>
        <h1
          className="app-title"
          style={{
            background: "linear-gradient(to right, #6b21a8, #db2777)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          MoodMirror
        </h1>

        <p
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 3rem",
            fontSize: "1.1rem",
            color: "#6b21a8",
            fontWeight: "500",
            lineHeight: "1.4",
          }}
        >
          Capture your daily thoughts effortlessly with MoodMirror — save
          entries securely, revisit past feelings, and track your mood over
          time.
        </p>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="btn btn-charts"
            onClick={() => navigate("/charts")}
            style={{
              background: "linear-gradient(to right, #ec4899, #db2777)",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              marginRight: "10px",
              width: "100px",
              textAlign: "center", // This centers the text horizontally
              display: "flex",     // These two lines center vertically
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Charts
          </button>

          <button
            className="btn btn-logout"
            onClick={handleLogout}
            style={{
              background: "linear-gradient(to right, #ec4899, #db2777)",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              width: "100px",
              textAlign: "center", // This centers the text horizontally
              display: "flex",     // These two lines center vertically
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <section
          className="entry-box"
          style={{
            maxWidth: "700px",
            margin: "3rem auto 5rem",
            position: "relative",
            padding: "3rem",
            background: "white",
            borderRadius: "1.5rem",
            boxShadow: "0 10px 30px rgb(219 39 119 / 0.2)",
            border: "4px solid #fce7f3",
          }}
        >
          {/* Decorative images */}
          <img
            src="https://illustrations.popsy.co/pink/woman-holding-a-heart.svg"
            alt="Top Left"
            style={{
              position: "absolute",
              top: "-60px",
              left: "-200px",
              width: "130px",
              height: "auto",
            }}
          />

          <img
            src="https://illustrations.popsy.co/pink/student-going-to-school.svg"
            alt="Top Right"
            style={{
              position: "absolute",
              top: "-60px",
              right: "-200px",
              width: "130px",
              height: "auto",
            }}
          />

          <img
            src="https://illustrations.popsy.co/pink/keynote-presentation.svg"
            alt="Bottom Left"
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "-300px",
              width: "150px",
              height: "auto",
            }}
          />

          <img
            src="https://illustrations.popsy.co/pink/man-holding-a-heart.svg"
            alt="Bottom Right"
            style={{
              position: "absolute",
              bottom: "-50px",
              right: "-300px",
              width: "150px",
              height: "auto",
            }}
          />

          <img
            src="https://illustrations.popsy.co/pink/traveling-with-a-suitcase.svg"
            alt="Left Center"
            style={{
              position: "absolute",
              top: "40%",
              left: "-350px",
              transform: "translateY(-50%)",
              width: "130px",
              height: "auto",
            }}
          />

          <img
            src="https://illustrations.popsy.co/pink/hitchhiking.svg"
            alt="Right Center"
            style={{
              position: "absolute",
              top: "40%",
              right: "-350px",
              transform: "translateY(-50%)",
              width: "130px",
              height: "auto",
            }}
          />
          {/* Mood emoji display above textarea */}
          <div
            style={{
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
            aria-label={`Current mood: ${mood}`}
            title={`Detected mood: ${mood}`}
          >
            {moodEmojis[mood] || "❓"}
          </div>

          <div className="textarea-container" style={{ marginTop: "2rem" }}>
            <label
              htmlFor="entry-text"
              className="entry-label"
              style={{
                marginTop: "-2.0rem",
                display: "block",
                marginBottom: "3.5rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #6b21a8, #db2777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                cursor: "default",
              }}
            >
              Write your thoughts
            </label>

            <>
              <style>
                {`
                  .pink-placeholder::placeholder {
                    color: #FFC0CB;
                    opacity: 1;
                  }
                `}
              </style>

              <textarea
                id="entry-text"
                className="pink-placeholder"
                rows="6"
                placeholder="Write your feelings here..."
                value={entry}
                onChange={handleEntryChange}
                disabled={loading}
                style={{
                  width: "95%",
                  padding: "1rem",
                  marginBottom: "1rem",
                  fontSize: "1rem",
                  background: "white",
                  borderRadius: "1.5rem",
                  border: "4px solid #fce7f3",
                  boxShadow: "0 10px 30px rgb(219 39 119 / 0.2)",
                  resize: "vertical",
                }}
              />
            </>

            <button
              onClick={saveEntry}
              disabled={loading || !entry.trim()}
              style={{
                background: "linear-gradient(to right, #ec4899, #db2777)",
                color: "white",
                border: "none",
                padding: "0.5rem 1.5rem",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "0",
              }}
            >
              {loading ? "Saving..." : "Save Entry"}
            </button>

            {error && (
              <p
                className="error-msg"
                style={{ color: "red", marginTop: "1rem" }}
              >
                {error}
              </p>
            )}
          </div>
        </section>

        <section
          className="entries-box"
          style={{
            maxWidth: "700px",
            margin: "5rem auto 3rem",
            padding: "1rem",
            background: "#fff0f6",
            borderRadius: "1rem",
            boxShadow: "0 4px 15px rgba(219, 39, 119, 0.15)",
            maxHeight: "350px",
            overflowY: "auto",
          }}
        >
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: "700",
              background: "linear-gradient(to right, #6b21a8, #db2777)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
              textAlign: "center",
              letterSpacing: "0.05em",
            }}
          >
            Your Mood Moments
          </h2>

          {loading && <p style={{ textAlign: "center" }}>Loading entries...</p>}
          {!loading && entries.length === 0 && (
            <p style={{ textAlign: "center", color: "#9f1239" }}>
              No entries yet. Write something to get started!
            </p>
          )}
          <ul
            className="entries"
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {!loading &&
              entries.map(({ _id, text, createdAt, mood: entryMood }) => {
                // Convert mood to lowercase for consistent matching
                const normalizedMood = (entryMood || "neutral").toLowerCase();
                return (
                  <li
                    key={_id}
                    style={{
                      background: "white",
                      padding: "1rem 1.5rem",
                      borderRadius: "0.75rem",
                      boxShadow: "0 3px 12px rgb(219 39 119 / 0.15)",
                      position: "relative",
                      fontSize: "1.05rem",
                      color: "#4b1540",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "1rem",
                        fontSize: "1.6rem",
                        textAlign: "center",
                      }}
                    >
                      {moodEmojis[normalizedMood] || "❓"}
                      <small
                        style={{
                          display: "block",
                          fontSize: "1.0rem",
                          color: "#9d174d",
                          textTransform: "capitalize",
                          marginTop: "0.2rem",
                        }}
                      >
                        {normalizedMood}
                      </small>
                    </div>
                    <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
                    <small
                      style={{
                        fontSize: "0.8rem",
                        color: "#9d174d",
                        marginTop: "0.25rem",
                        display: "block",
                      }}
                    >
                      {new Date(createdAt).toLocaleString()}
                    </small>
                  </li>
                );
              })}
          </ul>
        </section>
      </main>
    </div>
  );
}
