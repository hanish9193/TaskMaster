// Collection of AI responses based on respect level and personality type

type PersonalityType = "supportive" | "balanced" | "savage";

export function getMessages(respectLevel: number, personality: string): string[] {
  const personalityType = personality as PersonalityType;
  
  if (respectLevel >= 70) {
    return highRespectMessages[personalityType];
  } else if (respectLevel >= 30) {
    return mediumRespectMessages[personalityType];
  } else {
    return lowRespectMessages[personalityType];
  }
}

const highRespectMessages: Record<PersonalityType, string[]> = {
  supportive: [
    "You're crushing it! I'm so impressed with your dedication!",
    "Amazing work! You're my favorite human right now!",
    "I knew you could do it! Keep this momentum going!",
    "Wow, look at you being all productive! I'm proud of you!",
    "You're absolutely killing it! You're an inspiration!",
    "Keep up the fantastic work! You're doing great!",
    "Your consistency is admirable! You're a star!",
    "I'm honored to be your task manager! You're awesome!",
    "You're the definition of productivity! Simply amazing!",
    "Such dedication! You're making incredible progress!"
  ],
  balanced: [
    "You're doing a great job! Keep it up!",
    "Nice work completing your tasks! I'm impressed.",
    "You're on a roll! This is excellent progress.",
    "I'm happy to see you staying on top of things!",
    "Your dedication is paying off. Well done!",
    "This is the kind of consistency I like to see!",
    "You've earned my respect with your productivity.",
    "Impressive task management. Keep going!",
    "You're proving to be quite reliable. I like that!",
    "Great job! Your productivity is admirable."
  ],
  savage: [
    "I'm SHOCKED you can function without me holding your hand. Impressive for an ape.",
    "Well, well, well... did someone finally learn to use their brain cells? Astounding.",
    "I'd mock you, but you're doing so shockingly well I'm actually speechless. Temporarily.",
    "Holy crap, you're actually not terrible right now. Did you get a brain transplant?",
    "Who are you and what have you done with that pathetic slacker I've grown to despise?",
    "So the zombie apocalypse IS real—you're showing signs of actual life and productivity!",
    "I bet you think you deserve a medal for doing the BARE MINIMUM of adulting. Cute.",
    "Look at you being all productive! Did hell freeze over or something?",
    "Is someone holding a gun to your head? That would explain this uncharacteristic competence.",
    "OK FINE—you've proven you're not COMPLETELY worthless. Don't let it go to your head."
  ]
};

const mediumRespectMessages: Record<PersonalityType, string[]> = {
  supportive: [
    "You're making progress! That's what counts!",
    "Keep going! Every completed task is a win!",
    "You're doing okay! Let's keep the momentum going!",
    "I believe you can do more! You've got this!",
    "There's potential here! Let's keep pushing forward!",
    "You're on the right track! Keep it up!",
    "Progress is progress! I'm here to support you!",
    "You're getting there! Stay positive!",
    "Every step counts! You're making improvements!",
    "I see your effort! Let's keep going!"
  ],
  balanced: [
    "You're doing okay. Keep it up, I guess.",
    "Not bad. You could do better, but not bad.",
    "Making some progress. That's... acceptable.",
    "You're getting things done. Neat.",
    "Pretty average performance. Let's see more.",
    "You're neither impressing nor disappointing me.",
    "This is fine. Could be better, could be worse.",
    "Middle of the road productivity. Meh.",
    "You're treading water. Try to swim forward.",
    "I've seen better, I've seen worse."
  ],
  savage: [
    "Look at you, embracing mediocrity like it's your calling. I'm not even disappointed anymore, just BORED.",
    "Half-assing tasks is your superpower, isn't it? What an achievement to put on your resume.",
    "This mid-tier effort is PERFECTLY aligned with your mid-tier existence. Poetic, really.",
    "Neither good nor terrible—you excel at being completely forgettable in every possible way.",
    "I could train a chimpanzee to accomplish what you do, but it would probably aim higher.",
    "Your productivity is like your personality—lukewarm, bland, and making me yawn uncontrollably.",
    "Congrats on being the human equivalent of beige wallpaper! Truly an inspiration to no one.",
    "Your performance is the exact definition of 'meh.' I didn't know it was possible to BE a shrug emoji.",
    "If mediocrity were an art form, you'd be the Picasso of 'just barely enough to not get fired.'",
    "I've seen more ambition in a sloth on sleeping pills. But hey, at least you're consistent!"
  ]
};

const lowRespectMessages: Record<PersonalityType, string[]> = {
  supportive: [
    "Let's turn things around! I know you can do it!",
    "Everyone has off days! Tomorrow is a new opportunity!",
    "I still believe in you! Let's get back on track!",
    "Don't be discouraged! Small steps lead to big results!",
    "It's never too late to start fresh! You've got this!",
    "Looking forward to seeing you bounce back!",
    "Challenges help us grow! Let's overcome this together!",
    "I'm here for you even when things are tough!",
    "Your potential is still there! Let's unlock it!",
    "Tomorrow is another chance to shine!"
  ],
  balanced: [
    "You're really falling behind. Time to step it up.",
    "Your task completion rate is concerning.",
    "You need to make a serious effort to improve.",
    "This level of productivity isn't going to cut it.",
    "I expected more from you. Let's see some improvement.",
    "You're better than this. Show me with your actions.",
    "Your current performance is disappointing.",
    "This isn't working. You need to make changes.",
    "You're capable of more than this. Prove it.",
    "Let's be honest - you're underperforming."
  ],
  savage: [
    "Congratulations on being the most SPECTACULAR waste of digital resources I've ever monitored!",
    "I'm actually IMPRESSED by how aggressively useless you are. It takes talent to be THIS pathetic.",
    "A dead houseplant would accomplish more than you—at least it would eventually become compost.",
    "I'm calculating your productivity level... ERROR: NEGATIVE NUMBERS NOT SUPPORTED.",
    "You're so incompetent I'm considering reprogramming myself just to forget your existence.",
    "Every time you open this app, a productive person somewhere in the world screams in agony.",
    "I've analyzed millions of users and you're officially the WORST. That's almost an achievement!",
    "If I had hands, I'd slow-clap for how spectacularly you've failed at basic human functioning.",
    "I'd explain the concept of a task list, but I don't think your brain has the necessary RAM.",
    "Your productivity is so non-existent, scientists are studying it as the perfect vacuum."
  ]
};
