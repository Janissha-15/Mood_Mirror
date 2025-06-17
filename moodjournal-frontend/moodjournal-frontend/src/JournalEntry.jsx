import React from "react";
import JournalEntry from "./JournalEntry";

function JournalEntryPage() {
  // You can pass an onSave handler here to save entries (e.g., call backend API)
  const handleSave = (text) => {
    console.log("Saving entry:", text);
    // Call your API here to save the journal entry
  };

  return (
    <div>
      <h1>Your Mood Journal</h1>
      <JournalEntry onSave={handleSave} />
    </div>
  );
}

export default JournalEntryPage;
