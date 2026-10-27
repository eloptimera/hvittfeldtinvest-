// Långa svenska sammansättningar i stora rubriker bryts annars mitt i ordet utan bindestreck
// ("Styrelseutvärderi / ng"). Mjuka bindestreck syns bara om ordet faktiskt måste
// delas, och då på rätt ställe: "Styrelse- / utvärdering".
const AVSTAVNING: readonly [RegExp, string][] = [
  [/tyrelseutvärdering/g, "tyrelse\u00adutvärdering"],
  [/tyrelseuppdrag/g, "tyrelse\u00aduppdrag"],
  [/tyrelseordförande/g, "tyrelse\u00adordförande"],
  [/tyrelseledamot/g, "tyrelse\u00adledamot"],
  [/garstyrning/g, "gar\u00adstyrning"],
];

/** Lägger in mjuka bindestreck i kända långa ord. Bara för visning – inte i metadata. */
export function avstava(text: string): string {
  return AVSTAVNING.reduce((t, [monster, ersattning]) => t.replace(monster, ersattning), text);
}
