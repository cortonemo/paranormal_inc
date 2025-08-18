
export const PIN = {archetypes:{
scientist:{label:"Scientist",partial:"systems/paranormal_inc/templates/archetypes/scientist.html",
vibeSuggestions:["tidy","disheveled","professional","dated","frazzled","calm","excitable","moody"],
moves:[
{key:"experimentalTech",name:"Experimental Technology",text:"You have a piece of untested technology in your Backpack. Name it, describe what it does, and add it to your Backpack. When you attempt to use the experimental technology, roll +Science. On a 10+, the technology works flawlessly and is not consumed. On a 7–9, the technology works once and then fizzles; mark it as used as normal. On a miss, it breaks; repair only between mysteries with special equipment."},
{key:"newHypothesis",name:"A New Hypothesis",text:"Once per mystery, when you miss on a Theorize Move, you may suggest a new theory. If the table agrees, you may attempt the Theorize roll a second time without searching for new Clues."},
{key:"ghostbuster",name:"Ghostbuster",text:"Ghosts are terrified of you and your machines. Once per mystery, when you do the Discovery Move in the presence of a ghost, you may find an additional Clue, even on a miss."}
],
hauntings:[
{key:"failedExperiment",name:"Failed Experiment",text:"Gain the condition 'fear of failure'. It cannot be removed."},
{key:"obsessedWithScience",name:"Obsessed with Science",text:"Flashback: how did you first become interested in proving/disproving ghosts?"},
{key:"sellOut",name:"Sell-out",text:"Flashback: a corporation wooed you. What did they offer and what did you give up? Gain the condition 'untrustworthy'."},
{key:"labRats",name:"Lab Rats",text:"Scene: you used another Investigator as a test subject without their knowledge."},
{key:"scrapParts",name:"Scrap Parts",text:"Scene: you disassembled something for parts. Then remove one item from your Backpack."}
]},
bookworm:{label:"Bookworm",partial:"systems/paranormal_inc/templates/archetypes/bookworm.html",
vibeSuggestions:["nervous","confident","easy-going","quirky","boisterous","colourful","chatty","always online"],
moves:[
{key:"iveReadAboutThis",name:"I've Read About This!",text:"You may take the Handbook of the Recently Deceased Move one additional time."},
{key:"iknowJustThePerson",name:"I know just the person!",text:"You can call a contact who will help, but it creates a complication described by another player."},
{key:"hacker",name:"Hacker",text:"For rolls related to computers, roll with advantage."}
],
hauntings:[
{key:"theUnknown",name:"The Unknown",text:"Narrate a time you didn't have the answer."},
{key:"geekedOut",name:"Geeked Out",text:"Narrate a time you were mocked for being smart; then +1 a relevant stat (max +2)."},
{key:"opposingTheories",name:"Opposing theories",text:"Gain condition 'plagued by indecision' (cannot be removed)."},
{key:"brokenConnection",name:"Broken Connection",text:"Narrate using someone for info that hurt the relationship; reduce Wits by 1."},
{key:"knowItAll",name:"Know-It-All",text:"Narrate speaking down to an Investigator; gain 'compulsive explainer'."}
]},
ghost:{label:"Ghost",partial:"systems/paranormal_inc/templates/archetypes/ghost.html",
vibeSuggestions:["nonplussed","desperate","lonely","absent-minded","joyous","pious","exasperated","ineffable"],
moves:[
{key:"filledWithRegret",name:"Filled with Regret",text:"Let yourself be possessed; narrate a regret; mark a Personal Haunting to discover a Clue."},
{key:"bodySwap",name:"Body Swap",text:"Effects of last possession linger; gain 1 extra Special Investigator Move from a playbook not in play."},
{key:"ghostlyVisage",name:"Ghostly Visage",text:"Change your appearance; when beneficial, roll with advantage."}
],
hauntings:[
{key:"memoriesOfDeath",name:"Memories of Death",text:"Flashback your death; reduce Wits by 1."},
{key:"hijacked",name:"Hijacked",text:"Flashback the first time you possessed someone without consent."},
{key:"absorbMemories",name:"Absorb Memories",text:"Touch an item and narrate a Scene it witnessed; +1 Intuition."},
{key:"friendsOnOtherSide",name:"Friends on the Other Side",text:"Flashback hanging with other ghosts; how is it different from the team?"},
{key:"familialHaunting",name:"Familial Haunting",text:"Scene trying to reach loved ones after death; gain 'lonely' (cannot be removed)."}
]},
intern:{label:"Intern",partial:"systems/paranormal_inc/templates/archetypes/intern.html",
vibeSuggestions:["tired","eager","disinterested","overly friendly","detail-oriented","distracted","accident-prone","suave"],
moves:[
{key:"underAppreciated",name:"Under-appreciated",text:"After seeing your roll result, you can add +1."},
{key:"coffeeRunner",name:"Coffee runner",text:"Once per turn, take 12+ on a quick-thinking/quick-acting roll."},
{key:"collector",name:"Collector",text:"Choose any three items and add them to your Backpack."}
],
hauntings:[
{key:"sacrificed",name:"Sacrificed",text:"Narrate the team risking you; +1 Wits."},
{key:"lifeGoals",name:"Life Goals",text:"Scene: why did you choose an internship at Paranormal Inc?"},
{key:"invisible",name:"Invisible",text:"Narrate being ignored; gain 'self-doubt'."},
{key:"bigShoes",name:"Big Shoes",text:"Scene failing family expectations; gain 'fear of disappointing people' (cannot be removed)."},
{key:"desperate",name:"Desperate",text:"Scene doing something risky to meet basic needs; remove a Backpack item."}
]},
medium:{label:"Medium",partial:"systems/paranormal_inc/templates/archetypes/medium.html",
vibeSuggestions:["flighty","grounded","technophobe","mysterious","matter-of-fact","warm","contrarian","haunted"],
moves:[
{key:"iSenseAPresence",name:"I Sense a Presence",text:"Announce sensing a presence and draw a card; roll +Intuition: 10+ discover a Clue; 7–9 mark a Personal Haunting then +1 next Discovery."},
{key:"friendToAll",name:"Friend to All",text:"When you take Ghostly Encounters, choose an additional outcome."},
{key:"toolsOfTheTrade",name:"Tools of the Trade",text:"Add your divination tool to your Backpack; when used for advantage, don't mark it off."}
],
hauntings:[
{key:"ghostTherapist",name:"Ghost Therapist",text:"Describe constant haunting; reduce Wits by 1."},
{key:"premonitionsOfDeath",name:"Premonitions of Death",text:"Narrate premonitions; gain 'risk-averse'."},
{key:"newTalents",name:"New Talents",text:"Narrate a new sporadic ability; +1 Intuition (no max)."},
{key:"aQuietPlace",name:"A Quiet Place",text:"Narrate your last true silence."},
{key:"senseOfReality",name:"Sense of Reality",text:"Narrate mistaking a ghost for a person; reduce Science by 1."}
]},
skeptic:{label:"Skeptic",partial:"systems/paranormal_inc/templates/archetypes/skeptic.html",
vibeSuggestions:["put-together","sloppy","passionate","highly caffeinated","know-it-all","fearful","disorganized","steady"],
moves:[
{key:"reasonInFaceOfDanger",name:"Reason in the Face of Danger",text:"When a Paranormal Event would give you a condition, explain why it can't be true; if players agree, avoid it."},
{key:"seeingIsntBelieving",name:"Seeing Isn't Believing",text:"Describe how science grounds you; then unmark Personal Hauntings equal to Science +1 (once per mystery)."},
{key:"documentarian",name:"Documentarian",text:"Add a recorder/camera to Backpack; once per mystery, on an ally miss, playback turns it into a 12 (narrate what really happened)."}],
hauntings:[
{key:"longLost",name:"Long Lost",text:"Flashback trying to reach a loved one who never returned."},
{key:"delusional",name:"Delusional",text:"Gain 'head in the sand'."},
{key:"suspicious",name:"Suspicious",text:"Suspicion put someone at risk; -1 Wits."},
{key:"questionOfFaith",name:"A Question of Faith",text:"Reason failed you; add a token to Backpack."},
{key:"theFiveSenses",name:"The 5 Senses",text:"Narrate doubting your senses; what still lingers?"}
]}
}};
