export type Amenity = {
  slug: string; title: string; tagline: string; intro: string; image?: string; imageAlt?: string;
  benefits: { title: string; text: string }[]; enjoy: string; care: string; evidence: string;
  sources: { label: string; url: string }[];
};

export const amenities: Amenity[] = [
  {
    slug: "dry-sauna", title: "Dry Sauna", tagline: "Deep warmth. A slower pace.",
    intro: "Settle into the wood-lined sauna and let the warmth become the focus. It is a simple way to step away from a busy day and enjoy a few quiet minutes.",
    image: "/images/shvitz-09.png", imageAlt: "Wooden benches and stone heater in The Shvitz dry sauna.",
    benefits: [
      { title: "Time to relax", text: "A warm, quiet setting can feel soothing and give you space to unwind." },
      { title: "A warming experience", text: "Sauna heat increases sweating and changes heart rate and circulation while you are inside." },
      { title: "A comfortable pause", text: "Enjoy the heat at your own pace, with rest and water between sessions." },
    ],
    enjoy: "Begin with a short stay. Sit comfortably, drink water, and cool down gradually afterward. Follow posted guidance and leave before the heat becomes uncomfortable.",
    care: "Avoid alcohol and skip the sauna when ill. Leave if you feel dizzy, faint or unwell. Ask your clinician first if you have heart disease, blood-pressure problems, are pregnant, or take medicines that affect heat tolerance.",
    evidence: "Sauna is a leisure activity, not a replacement for exercise or medical care. Sweating does not establish a detox or lasting weight-loss benefit.",
    sources: [{ label: "Harvard Health: Saunas and your health", url: "https://www.health.harvard.edu/healthy-aging-and-longevity/saunas-and-your-health" }],
  },
  {
    slug: "wet-sauna", title: "Wet Sauna", tagline: "Warm steam. A softer kind of stillness.",
    intro: "Our wet sauna surrounds you with humid heat, stone seating and atmospheric lighting. Choose it when you prefer the feel of steam to the drier warmth of the wood sauna.",
    image: "/images/steam-room.png", imageAlt: "Inside The Shvitz wet sauna with blue lighting and stone benches.",
    benefits: [
      { title: "Humid warmth", text: "Steam creates a different heat experience: moist air can feel very warm even at a lower temperature than a dry sauna." },
      { title: "Room to unwind", text: "Sit back and enjoy a quiet break, without a workout or a task to complete." },
      { title: "Your choice of heat", text: "Some guests prefer humid heat. Choose the setting that feels comfortable rather than pushing for a longer session." },
    ],
    enjoy: "Start briefly, stay hydrated and take a seated rest afterward. Cool down gradually; you do not need to follow a hot session with an abrupt cold plunge.",
    care: "Humidity does not remove the risk of overheating. Leave if dizzy or uncomfortable. Get medical advice before heat exposure if pregnant or if you have heart or blood-pressure conditions.",
    evidence: "Steam is not a treatment for lung disease or infection. Research on dry saunas cannot automatically be applied to steam rooms, and long-term health benefits remain uncertain.",
    sources: [{ label: "Harvard Health: Sauna variations, evidence and safety", url: "https://www.health.harvard.edu/heart-health/can-regular-sauna-sessions-support-a-healthy-heart" }],
  },
  {
    slug: "cold-plunge", title: "Cold Plunge", tagline: "A refreshing change of pace.",
    intro: "A dip in the cold plunge brings a very different sensation from the saunas. Our tiled plunge has entry steps; enter carefully and keep the experience within your comfort level.",
    image: "/images/cold-plunge-photo.jpeg", imageAlt: "The Shvitz cold plunge with pink lighting and tiled entry steps.",
    benefits: [
      { title: "A refreshing sensation", text: "Some people feel more alert after cold-water immersion. The response varies from person to person." },
      { title: "Possible soreness relief", text: "Cold-water immersion may temporarily reduce muscle soreness after demanding exercise." },
      { title: "An optional experience", text: "You can enjoy a visit without plunging. Colder water or a longer stay is not automatically better." },
    ],
    enjoy: "Ask staff about the current temperature and suitability for beginners. Enter slowly, keep your head above water and breathe normally. Never hyperventilate, hold your breath or plunge alone. Dry off and warm up gradually afterward.",
    care: "Cold shock can cause gasping and raise heart rate and blood pressure. Check with a clinician first, especially with heart, circulation or blood-pressure conditions, diabetes or pregnancy. Exit immediately if dizzy, numb or struggling to breathe.",
    evidence: "Claims about immunity, fat loss and lasting mood improvements are not established. Regular cold immersion immediately after strength training may reduce muscle-building adaptations.",
    sources: [{ label: "Cleveland Clinic: Cold plunge benefits and risks", url: "https://health.clevelandclinic.org/what-to-know-about-cold-plunges" }, { label: "Harvard Health: Cold-water immersion evidence and safety", url: "https://www.health.harvard.edu/healthy-aging-and-longevity/can-ice-baths-improve-your-health" }],
  },
  {
    slug: "jacuzzi", title: "Jacuzzi", tagline: "Warm water. An easier moment.",
    intro: "Let the warm water and bubbling jets set the pace. The hot tub offers a comfortable place to settle in, chat quietly and enjoy a break from the day.",
    image: "/images/shvitz-calm-1.jpg", imageAlt: "The Shvitz hot tub beside warm wood walls.",
    benefits: [
      { title: "Ease everyday tension", text: "Warm water and jets can feel soothing and may help you relax." },
      { title: "Comfort for tired muscles", text: "A warm soak may temporarily ease muscle aches and stiffness." },
      { title: "Support from the water", text: "Buoyancy reduces the load on joints while you soak." },
    ],
    enjoy: "Shower before entering, keep your stay comfortable and take regular breaks. Drink water and stand up slowly when leaving.",
    care: "Avoid alcohol, do not swallow the water and stay out if you have diarrhea. Hot-tub water should not exceed 104°F (40°C). Seek medical guidance before use during pregnancy or with heart or blood-pressure conditions. Leave if lightheaded or overheated.",
    evidence: "A soak can offer short-term comfort, but it is not a treatment for an injury or a substitute for exercise or medical care.",
    sources: [
      { label: "Cleveland Clinic: Hot tub benefits", url: "https://health.clevelandclinic.org/benefits-of-hot-tubs" },
      { label: "CDC: Healthy and safe hot-tub use", url: "https://www.cdc.gov/healthy-swimming/safety/what-you-can-do-to-stay-healthy-in-hot-tubs.html" },
    ],
  },
  {
    slug: "lounge", title: "Lounge", tagline: "The pause is part of the experience.",
    intro: "Take a seat between sessions, catch up with friends or enjoy a quiet moment on your own. The lounge gives you somewhere comfortable to slow down without adding more heat or cold.",
    image: "/images/shvitz-01.jpg", imageAlt: "Lounge seating and tables at The Shvitz.",
    benefits: [
      { title: "Space to rest", text: "A seated break lets you check how you feel before deciding what to do next." },
      { title: "A moment of calm", text: "Comfortable, unforced breathing and quiet attention can be part of a relaxation practice." },
      { title: "Time together", text: "Enjoy conversation or simply a change of surroundings. Your visit does not have to follow a fixed circuit." },
    ],
    enjoy: "Use the lounge whenever you want a break. Sip water, sit comfortably and allow your breathing to settle naturally. Massage chairs, when available, are for comfort; stop if they cause pain.",
    care: "If you feel faint, unwell or unusually short of breath after heat or cold, stop the session and tell staff. Rest should not be used to ignore worsening symptoms.",
    evidence: "Relaxation practices may help with stress, but sitting in a lounge or using a massage chair is not a medical treatment or a guaranteed sleep benefit.",
    sources: [{ label: "NIH NCCIH: Relaxation techniques", url: "https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know" }],
  },
  {
    slug: "outdoor-pool", title: "Outdoor Pool", tagline: "Fresh air, at your own pace.",
    intro: "Our outdoor pool adds another way to enjoy The Shvitz during the season. Contact us before visiting to confirm current availability and pool conditions.",
    benefits: [
      { title: "Gentle movement", text: "When conditions allow, moving in water offers a lower-impact way to be active." },
      { title: "Activity you enjoy", text: "Swimming and water-based exercise can support physical fitness and well-being when practiced regularly." },
      { title: "A seasonal change of scene", text: "Enjoy time outdoors as part of your visit. You can choose a relaxed pace rather than a workout." },
    ],
    enjoy: "Confirm the pool is open, follow posted rules and stay within your swimming ability. Shower first, walk on wet surfaces and use appropriate sun protection outdoors.",
    care: "Do not swim alone, dive into unknown depths or enter while impaired. Stay out when sick with diarrhea and avoid swallowing pool water. Ask staff about depth and conditions before getting in.",
    evidence: "Exercise benefits come from regular movement; simply sitting in a pool does not provide the same benefits. Seasonal availability is not guaranteed, and the pool is not described as heated.",
    sources: [{ label: "CDC: Swimming and your health", url: "https://www.cdc.gov/healthy-swimming/about/" }],
  },
];
