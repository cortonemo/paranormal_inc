// Create or update example museum NPCs (Paranormal Inc)
const npcs = [
  { name: "George Pollard", system: { role: "Museum Owner", look: ["anxious","comb-over","ill-fitting suit"], quote: "This place is a money pit... the finances are tough.", where: "Whaling Museum", status: "neutral", biography: "Owner; financially stressed; tied to the Deep Reaver lineage." } },
  { name: "Dr. Katherine Berko", system: { role: "Curator", look: ["bespectacled","tired","easily annoyed"], quote: "In a just world, I’d be making my name at the Smithsonian.", where: "Curator’s Office", status: "neutral", biography: "19th-century industry whaling expert; frustrated with the job." } },
  { name: "Cornelius Absalom", system: { role: "Philanthropist", look: ["warm smile","well-dressed","distracted"], quote: "As if George’s mismanagement wasn’t enough, now ghosts?", where: "Around town / Museum", status: "neutral", biography: "Old money; ex finance lawyer; supports museum, doubts management." } },
  { name: "Percy Underwood", system: { role: "Docent", look: ["young","good-looking","nautical costumes","uninformed"], quote: "Whales? Really big. You’d need a monstrous net, huh?", where: "Museum Lobby / Exhibits", status: "neutral", biography: "Town social node; hears a bit of everything." } },
  { name: "Lara Sanchez", system: { role: "Podcaster (Small Town: Big Crime!)", look: ["trendy","gutsy","black clothing"], quote: "Before you say anything, could you sign this waiver?", where: "Snowdrop House / Museum", status: "ally", biography: "Chasing Snowdrop House angle; now on missing staff rumors." } },
  { name: "Zak Thomas", system: { role: "Ghost Bro (YouTube)", look: ["chiseled","oversized hoodie","fuckboy haircut"], quote: "Hey guys! The paranormal activity is, like, so high!", where: "Museum (filming)", status: "neutral", biography: "Ghost Bro Mystery Show star; dramatic on camera." } },
  { name: "Eleanor Ripley", system: { role: "Curator (Lighthouse Museum)", look: ["costume jewelry","streak of gray","colorful scarf"], quote: "You haven’t seen creepy until a night in Mucky Point.", where: "Visiting the Museum", status: "neutral", biography: "Scouting ideas for her upcoming lighthouse museum." } },
  { name: "Wallace Codswallop", system: { role: "Security Guard", look: ["vacant eyes","smells of the sea","speaks in riddles"], quote: "I have dined at the table of Lord Poseidon.", where: "Museum (odd hours)", status: "neutral", biography: "Hired by no one; remembered only when asked about." } },
  { name: "Magdalena Hawthorne", system: { role: "Spiritualist", look: ["knowing smile","shuffling tarot","huge silver cross"], quote: "I drew the Moon as I entered the lobby.", where: "Museum / Snowdrop House", status: "ally", biography: "From LA; visiting family; here to calm the spirits." } },
  { name: "Sheriff Wyman Dalrymple", system: { role: "Local Authority", look: ["jowly","paunchy","permanently exasperated"], quote: "At least it’s not another murder.", where: "Around town", status: "neutral", biography: "Old Brindlewood Bay; keeps the town's reputation intact." } }
];

(async () => {
  for (const n of npcs) {
    const existing = game.actors.getName(n.name);
    if (existing) {
      await existing.update({ type: "npc", system: n.system });
      ui.notifications.info(`Updated NPC: ${n.name}`);
    } else {
      await Actor.create({ name: n.name, type: "npc", img: "icons/svg/mystery-man.svg", system: n.system });
      ui.notifications.info(`Created NPC: ${n.name}`);
    }
  }
})();
