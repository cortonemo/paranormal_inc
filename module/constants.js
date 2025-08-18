// module/constants.js
export const PIN = {
  archetypes: {
    scientist: {
      label: "Scientist",
      partial: "systems/paranormal_inc/templates/archetypes/scientist.html",
      imageHint: "systems/paranormal_inc/assets/scientist.png",
      vibeSuggestions: ["tidy","disheveled","professional","dated","frazzled","calm","excitable","moody"],
      moves: [
        {
          key: "experimentalTech",
          name: "Experimental Technology",
          text: "You have a piece of untested technology in your Backpack. Name it, describe what it does, and add it to your Backpack. When you attempt to use the experimental technology, roll +Science. On a 10+, the technology works flawlessly and is not consumed. On a 7–9, the technology works once and then fizzles; mark it as used as normal. On a miss, it breaks; repair only between mysteries with special equipment."
        },
        {
          key: "newHypothesis",
          name: "A New Hypothesis",
          text: "Once per mystery, when you miss on a Theorize Move, you may suggest a new theory. If the table agrees, you may attempt the Theorize roll a second time without searching for new Clues."
        },
        {
          key: "ghostbuster",
          name: "Ghostbuster",
          text: "Ghosts are terrified of you and your machines. Once per mystery, when you do the Discovery Move in the presence of a ghost, you may find an additional Clue, even on a miss."
        }
      ],
      hauntings: [
        { key: "failedExperiment",    name: "Failed Experiment",     text: "Gain the condition “fear of failure.” It cannot be removed." },
        { key: "obsessedWithScience", name: "Obsessed with Science", text: "Flashback: how did you first become interested in proving/disproving ghosts?" },
        { key: "sellOut",             name: "Sell-out",              text: "Flashback: a corporation wooed you. What did they offer and what did you give up? Gain the condition “untrustworthy.”" },
        { key: "labRats",             name: "Lab Rats",              text: "Scene: you used another Investigator as a test subject without their knowledge." },
        { key: "scrapParts",          name: "Scrap Parts",           text: "Scene: you disassembled something for parts. Then remove one item from your Backpack." }
      ]
    },

    // Placeholders to be filled later
    medium:   { label: "Medium",   partial: "systems/paranormal_inc/templates/archetypes/medium.html",   moves: [], hauntings: [] },
    skeptic:  { label: "Skeptic",  partial: "systems/paranormal_inc/templates/archetypes/skeptic.html",  moves: [], hauntings: [] },
    intern:   { label: "Intern",   partial: "systems/paranormal_inc/templates/archetypes/intern.html",   moves: [], hauntings: [] },
    bookworm: { label: "Bookworm", partial: "systems/paranormal_inc/templates/archetypes/bookworm.html", moves: [], hauntings: [] },
    ghost:    { label: "Ghost",    partial: "systems/paranormal_inc/templates/archetypes/ghost.html",    moves: [], hauntings: [] }
  }
};