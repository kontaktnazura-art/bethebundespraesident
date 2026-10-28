// Alle Fälle des Spiels: echte Gesetze und Gesetzentwürfe aus den Amtszeiten von Merkel, Scholz und Merz.
// Pro Runde werden zufällig 6 davon gezogen.
// kanzler: "merkel" | "scholz" | "merz" (wer die Akte bringt)
// loesung: "unterschreiben" | "ablehnen" | "beides" (Streitfall, beides gilt als richtig)
// fehler: woran das Gesetz scheitert (nur bei "ablehnen")
// wirklich: was in echt passiert ist
const FAELLE = [
  // ---------- Angela Merkel (2005 bis 2021) ----------
  {
    id: "flugsicherung",
    kanzler: "merkel",
    jahr: 2006,
    titel: "Gesetz zur Neuregelung der Flugsicherung",
    kurztitel: "Flugsicherung",
    worum: "Die Deutsche Flugsicherung, die den Luftverkehr über Deutschland lenkt, soll zu 74,9 Prozent an private Investoren verkauft werden.",
    umstaende: "Bundestag und Bundesrat haben zugestimmt. Die Regierung erhofft sich Milliarden für den Haushalt.",
    hinweise: [
      "Art. 87d GG: Die Luftverkehrsverwaltung wird in bundeseigener Verwaltung geführt.",
      "Wenn das Grundgesetz eine Aufgabe ausdrücklich dem Staat zuweist, kann ein einfaches Gesetz sie nicht einfach verkaufen.",
      "Dass Bundestag und Bundesrat zugestimmt haben, ersetzt keine Grundgesetzänderung."
    ],
    loesung: "ablehnen",
    fehler: "Verstoß gegen das Grundgesetz (Art. 87d GG)",
    begruendung: "Die Flugsicherung muss laut Grundgesetz in Bundesverwaltung bleiben. Für einen Verkauf hätte man erst das Grundgesetz ändern müssen.",
    wirklich: "Horst Köhler verweigerte im Oktober 2006 die Unterschrift. 2009 wurde Art. 87d GG geändert."
  },
  {
    id: "verbraucherinformation",
    kanzler: "merkel",
    jahr: 2006,
    titel: "Verbraucherinformationsgesetz",
    kurztitel: "Verbraucherinformation",
    worum: "Nach dem Gammelfleisch-Skandal sollen Bürger bei Behörden erfragen können, welche Mängel bei Lebensmitteln festgestellt wurden. Das Bundesgesetz verpflichtet dafür direkt die Städte und Gemeinden.",
    umstaende: "Kaum jemand ist gegen mehr Transparenz bei Lebensmitteln. Die Föderalismusreform ist erst seit wenigen Wochen in Kraft.",
    hinweise: [
      "Seit der Föderalismusreform 2006 darf der Bund den Gemeinden keine Aufgaben mehr übertragen (Art. 84 Abs. 1 Satz 7 GG).",
      "Das Ziel des Gesetzes ist erlaubt. Die Frage ist, wer die Arbeit machen soll.",
      "Prüfe nicht nur den Inhalt, sondern auch die Zuständigkeit."
    ],
    loesung: "ablehnen",
    fehler: "Falsche Zuständigkeit (Art. 84 GG)",
    begruendung: "Das Gesetz überträgt den Gemeinden direkt neue Aufgaben. Genau das verbietet das Grundgesetz seit der Föderalismusreform.",
    wirklich: "Horst Köhler verweigerte im Dezember 2006 die Unterschrift. Ein überarbeitetes Gesetz trat 2008 in Kraft."
  },
  {
    id: "betreuungsgeld",
    kanzler: "merkel",
    jahr: 2013,
    titel: "Betreuungsgeldgesetz",
    kurztitel: "Betreuungsgeld",
    worum: "Eltern, die ihr Kleinkind nicht in eine staatlich geförderte Kita geben, bekommen vom Bund monatlich Geld (zuerst 100, später 150 Euro).",
    umstaende: "Kritiker nennen es „Herdprämie“. Das Gesetz regelt etwas, das sonst oft die Länder regeln.",
    hinweise: [
      "Bei der öffentlichen Fürsorge darf der Bund nur Gesetze machen, wenn eine bundeseinheitliche Regelung erforderlich ist (Art. 72 Abs. 2 GG).",
      "Frage dich: Gäbe es ohne dieses Gesetz unzumutbare Unterschiede zwischen den Bundesländern?",
      "Politischer Streit wie „Herdprämie“ ist kein Rechtsargument, weder dafür noch dagegen."
    ],
    loesung: "ablehnen",
    fehler: "Der Bund war nicht zuständig (Art. 72 GG)",
    begruendung: "Eine bundesweite Regelung war nicht nötig, um gleichwertige Lebensverhältnisse herzustellen. Deshalb durfte der Bund das Gesetz nicht machen.",
    wirklich: "Joachim Gauck unterschrieb, weil der Fehler nicht offensichtlich war. 2015 erklärte das Bundesverfassungsgericht das Gesetz für nichtig."
  },
  {
    id: "ehefueralle",
    kanzler: "merkel",
    jahr: 2017,
    titel: "Gesetz zur Einführung des Rechts auf Eheschließung für Personen gleichen Geschlechts",
    kurztitel: "Ehe für alle",
    worum: "Auch zwei Männer oder zwei Frauen dürfen heiraten. Das Grundgesetz wird dafür nicht geändert, nur das Bürgerliche Gesetzbuch.",
    umstaende: "Die Abstimmung wurde als Gewissensentscheidung freigegeben. Merkel selbst stimmte mit Nein.",
    hinweise: [
      "Art. 6 GG schützt Ehe und Familie, sagt aber nicht ausdrücklich, wer heiraten darf.",
      "Das Bundesverfassungsgericht hat die Ehe früher als Verbindung von Mann und Frau beschrieben, aber nie verboten, sie zu öffnen.",
      "Der Bundespräsident lehnt nur bei offensichtlichen Verstößen ab, nicht bei offenen Streitfragen."
    ],
    loesung: "unterschreiben",
    begruendung: "Ein offensichtlicher Verstoß gegen das Grundgesetz liegt nicht vor. Wer das anders sieht, kann in Karlsruhe klagen.",
    wirklich: "Frank-Walter Steinmeier unterschrieb im Juli 2017. Seit Oktober 2017 dürfen gleichgeschlechtliche Paare heiraten. Eine Verfassungsklage gab es nie."
  },
  {
    id: "notbremse",
    kanzler: "merkel",
    jahr: 2021,
    titel: "Viertes Gesetz zum Schutz der Bevölkerung bei einer epidemischen Lage („Bundesnotbremse“)",
    kurztitel: "Bundesnotbremse",
    worum: "Ab einer Corona-Inzidenz von 100 gelten automatisch nächtliche Ausgangssperren und Kontaktbeschränkungen, ab 165 schließen die Schulen.",
    umstaende: "Ausgangssperren gab es in der Bundesrepublik noch nie bundesweit. Hunderte Verfassungsbeschwerden sind angekündigt.",
    hinweise: [
      "Grundrechte dürfen eingeschränkt werden, wenn die Maßnahme verhältnismäßig ist: geeignet, erforderlich und angemessen.",
      "Der Schutz von Leben und Gesundheit ist ein sehr gewichtiges Ziel (Art. 2 Abs. 2 GG).",
      "Achte darauf, ob die Maßnahmen befristet sind."
    ],
    loesung: "unterschreiben",
    begruendung: "Harte Einschränkungen, aber befristet und zum Schutz von Leben. Das ist kein offensichtlicher Verfassungsverstoß.",
    wirklich: "Steinmeier unterschrieb im April 2021. Im November 2021 entschied das Bundesverfassungsgericht: Ausgangssperren und Schulschließungen waren verfassungsgemäß."
  },
  {
    id: "hasskriminalitaet",
    kanzler: "merkel",
    jahr: 2020,
    titel: "Gesetz zur Bekämpfung des Rechtsextremismus und der Hasskriminalität",
    kurztitel: "Hasskriminalität",
    worum: "Soziale Netzwerke müssen Morddrohungen und Volksverhetzung mit IP-Adresse an das Bundeskriminalamt melden. Behörden dürfen dazu Name und Adresse der Nutzer abfragen.",
    umstaende: "Kurz nachdem der Bundestag das Gesetz beschlossen hat, veröffentlicht das Bundesverfassungsgericht eine Entscheidung: Ähnliche Regeln zur Abfrage von Nutzerdaten gehen zu weit.",
    hinweise: [
      "Entscheidungen des Bundesverfassungsgerichts binden alle Staatsorgane, auch den Gesetzgeber.",
      "Der Bundespräsident kann die Unterschrift zurückhalten, bis ein Fehler repariert ist.",
      "Ein gutes Ziel heilt keinen Verfassungsfehler."
    ],
    loesung: "ablehnen",
    fehler: "Verstoß gegen eine Entscheidung des Bundesverfassungsgerichts",
    begruendung: "Die Regeln zur Datenabfrage entsprachen genau dem, was Karlsruhe gerade für verfassungswidrig erklärt hatte. Erst reparieren, dann unterschreiben.",
    wirklich: "Steinmeier unterschrieb zunächst nicht. Nach einem Reparaturgesetz unterschrieb er im März 2021."
  },

  // ---------- Olaf Scholz (2021 bis 2025) ----------
  {
    id: "nachtragshaushalt",
    kanzler: "scholz",
    jahr: 2022,
    titel: "Zweites Nachtragshaushaltsgesetz 2021",
    kurztitel: "Nachtragshaushalt 2021",
    worum: "60 Milliarden Euro Kredite, die für die Corona-Notlage genehmigt, aber nicht gebraucht wurden, sollen in den Klima- und Transformationsfonds für die nächsten Jahre wandern.",
    umstaende: "Das Geld ist ja schon genehmigt, argumentiert die Regierung. Man nutze es nur sinnvoller.",
    hinweise: [
      "Die Schuldenbremse erlaubt Notlagen-Kredite nur, um die Notlage zu bewältigen (Art. 115 Abs. 2 GG).",
      "Kredite gehören grundsätzlich zu dem Haushaltsjahr, für das sie genehmigt wurden.",
      "Frage dich: Hat der neue Zweck noch etwas mit der Notlage zu tun?"
    ],
    loesung: "ablehnen",
    fehler: "Verstoß gegen die Schuldenbremse (Art. 109, 115 GG)",
    begruendung: "Notlagen-Kredite dürfen nicht für spätere, andere Zwecke geparkt werden.",
    wirklich: "Steinmeier unterschrieb. Im November 2023 erklärte das Bundesverfassungsgericht das Gesetz für nichtig. Die Haushaltskrise trug zum Ende der Ampel-Koalition bei."
  },
  {
    id: "cannabis",
    kanzler: "scholz",
    jahr: 2024,
    titel: "Cannabisgesetz",
    kurztitel: "Cannabisgesetz",
    worum: "Erwachsene dürfen bis zu 25 Gramm Cannabis besitzen, zu Hause drei Pflanzen anbauen und in Anbauvereinen gemeinsam anbauen.",
    umstaende: "Viele Länder protestieren im Bundesrat und wollen den Vermittlungsausschuss anrufen. Dafür findet sich am Ende keine Mehrheit.",
    hinweise: [
      "Bei einem Einspruchsgesetz kann der Bundesrat Einspruch einlegen. Der Bundestag kann ihn überstimmen (Art. 77 GG).",
      "Wenn der Bundesrat den Vermittlungsausschuss nicht anruft, ist das Gesetz zustande gekommen (Art. 78 GG).",
      "Bedenken zu Gesundheit und Jugendschutz sind Politik, kein Verfassungsverstoß."
    ],
    loesung: "unterschreiben",
    begruendung: "Lauter Protest, aber kein Einspruch. Das Verfahren ist sauber, ein offensichtlicher Verfassungsverstoß liegt nicht vor.",
    wirklich: "Steinmeier unterschrieb im März 2024. Das Gesetz trat am 1. April 2024 in Kraft."
  },
  {
    id: "heizungsgesetz",
    kanzler: "scholz",
    jahr: 2023,
    titel: "Gebäudeenergiegesetz (Novelle, „Heizungsgesetz“)",
    kurztitel: "Heizungsgesetz",
    worum: "Neue Heizungen müssen schrittweise zu 65 Prozent mit erneuerbaren Energien laufen. Es gibt Übergangsfristen und staatliche Förderung.",
    umstaende: "Im Juli 2023 hat das Bundesverfassungsgericht die Abstimmung gestoppt, weil die Abgeordneten zu wenig Zeit zum Lesen hatten. Nach der Sommerpause wurde in Ruhe beraten und beschlossen.",
    hinweise: [
      "Abgeordnete müssen genug Zeit haben, ein Gesetz zu beraten (Art. 38 Abs. 1 GG).",
      "Prüfe, ob der Fehler vom Juli noch besteht oder behoben wurde.",
      "Eingriffe ins Eigentum sind erlaubt, wenn sie verhältnismäßig sind. Übergangsfristen und Förderung helfen dabei."
    ],
    loesung: "unterschreiben",
    begruendung: "Der Verfahrensfehler wurde behoben: neue Beratung, neue Abstimmung. Inhaltlich ist das Gesetz umstritten, aber nicht offensichtlich verfassungswidrig.",
    wirklich: "Steinmeier unterschrieb im Oktober 2023. Das Gesetz gilt seit dem 1. Januar 2024."
  },
  {
    id: "wahlrecht",
    kanzler: "scholz",
    jahr: 2023,
    titel: "Gesetz zur Änderung des Bundeswahlgesetzes",
    kurztitel: "Wahlrechtsreform",
    worum: "Der Bundestag wird auf 630 Sitze begrenzt, Überhangmandate fallen weg. Außerdem fällt die Grundmandatsklausel weg: Parteien unter 5 Prozent kommen nicht mehr über drei Direktmandate in den Bundestag.",
    umstaende: "CSU und Linke sehen sich direkt bedroht und kündigen Klagen an.",
    hinweise: [
      "Jede Stimme muss möglichst gleich zählen (Art. 38 Abs. 1 GG).",
      "Eine 5-Prozent-Hürde ist erlaubt, muss aber gut begründet sein.",
      "Der Bundespräsident lehnt nur bei offensichtlichen Verstößen ab."
    ],
    loesung: "beides",
    begruendung: "Das ist der Streitfall. Die Verkleinerung des Bundestags ist in Ordnung. Ob die 5-Prozent-Hürde ohne Grundmandatsklausel zu streng ist, war nicht offensichtlich.",
    wirklich: "Steinmeier unterschrieb. 2024 entschied das Bundesverfassungsgericht: Die 630 Sitze sind in Ordnung, aber die 5-Prozent-Hürde ohne Grundmandatsklausel ist verfassungswidrig. Die Klausel gilt deshalb vorerst weiter."
  },
  {
    id: "sondervermoegen",
    kanzler: "scholz",
    jahr: 2025,
    titel: "Gesetz zur Änderung des Grundgesetzes (Art. 109, 115 und 143h)",
    kurztitel: "Sondervermögen 2025",
    worum: "Das Grundgesetz wird geändert: 500 Milliarden Euro Sondervermögen für Infrastruktur, und Verteidigungsausgaben über 1 Prozent der Wirtschaftsleistung zählen nicht mehr zur Schuldenbremse.",
    umstaende: "Beschlossen vom alten Bundestag nach der Wahl, kurz bevor der neue zusammentritt. Im Bundestag und im Bundesrat stimmten jeweils mehr als zwei Drittel zu.",
    hinweise: [
      "Eine Grundgesetzänderung braucht zwei Drittel im Bundestag und im Bundesrat (Art. 79 Abs. 2 GG).",
      "Der alte Bundestag bleibt voll im Amt, bis der neue zum ersten Mal zusammentritt (Art. 39 Abs. 1 GG).",
      "Ob man so viele Schulden politisch gut findet, ist für deine Prüfung egal."
    ],
    loesung: "unterschreiben",
    begruendung: "Zwei Drittel in beiden Kammern, und der alte Bundestag durfte noch abstimmen. Ungewöhnlich, aber verfassungsgemäß.",
    wirklich: "Das Bundesverfassungsgericht lehnte Eilanträge gegen die Abstimmung ab. Steinmeier unterschrieb im März 2025."
  },

  // ---------- Friedrich Merz (seit 2025) ----------
  {
    id: "zustrombegrenzung",
    kanzler: "merz",
    jahr: 2025,
    titel: "Zustrombegrenzungsgesetz",
    kurztitel: "Zustrombegrenzung",
    worum: "Der Familiennachzug zu subsidiär Schutzberechtigten soll gestoppt werden, die Bundespolizei bekommt mehr Befugnisse.",
    umstaende: "Im Januar 2025 stimmte der Bundestag ab: 338 Ja, 349 Nein. Trotzdem liegt die Akte jetzt auf deinem Tisch.",
    hinweise: [
      "Ein Gesetz kommt nur zustande, wenn der Bundestag es beschließt (Art. 77 Abs. 1 GG).",
      "Der Bundespräsident prüft zuerst das Verfahren, dann den Inhalt.",
      "Zähl die Stimmen."
    ],
    loesung: "ablehnen",
    fehler: "Kein Beschluss des Bundestags",
    begruendung: "Der Bundestag hat den Entwurf abgelehnt. Was nicht beschlossen ist, kann man nicht ausfertigen, egal was drinsteht.",
    wirklich: "Der Entwurf, den Merz als Oppositionsführer eingebracht hatte, scheiterte im Bundestag und kam nie beim Bundespräsidenten an. Ein Teil davon wurde später als eigenes Gesetz beschlossen."
  },
  {
    id: "familiennachzug",
    kanzler: "merz",
    jahr: 2025,
    titel: "Gesetz zur Aussetzung des Familiennachzugs zu subsidiär Schutzberechtigten",
    kurztitel: "Familiennachzug",
    worum: "Für zwei Jahre dürfen Angehörige von subsidiär Schutzberechtigten nicht mehr nach Deutschland nachziehen. Härtefälle bleiben möglich.",
    umstaende: "Bundestag beschlossen, der Bundesrat hat das Gesetz passieren lassen. Kirchen und Verbände protestieren.",
    hinweise: [
      "Art. 6 GG schützt die Familie, gibt aber keinen unbedingten Anspruch auf Nachzug nach Deutschland.",
      "Befristung und Härtefallregel sprechen für Verhältnismäßigkeit.",
      "Eine ähnliche Aussetzung gab es schon von 2016 bis 2018."
    ],
    loesung: "unterschreiben",
    begruendung: "Befristet, mit Härtefallregel und ordentlich beschlossen. Politisch umstritten, aber nicht offensichtlich verfassungswidrig.",
    wirklich: "Steinmeier unterschrieb. Das Gesetz trat im Juli 2025 in Kraft."
  },
  {
    id: "wehrdienst",
    kanzler: "merz",
    jahr: 2025,
    titel: "Wehrdienst-Modernisierungsgesetz",
    kurztitel: "Neuer Wehrdienst",
    worum: "Alle jungen Männer müssen ab 18 einen Fragebogen zu ihrer Bereitschaft ausfüllen und werden gemustert. Der Dienst selbst bleibt freiwillig, für eine Pflicht müsste der Bundestag extra entscheiden.",
    umstaende: "Schülervertretungen protestieren, dass über ihren Kopf hinweg entschieden wird. Frauen dürfen den Fragebogen freiwillig ausfüllen.",
    hinweise: [
      "Männer können ab 18 zum Wehrdienst verpflichtet werden (Art. 12a Abs. 1 GG).",
      "Frauen dürfen nicht zum Dienst an der Waffe verpflichtet werden (Art. 12a Abs. 4 GG).",
      "Ein Pflicht-Fragebogen ist ein milderer Eingriff als eine Dienstpflicht."
    ],
    loesung: "unterschreiben",
    begruendung: "Das Grundgesetz erlaubt sogar eine Wehrpflicht für Männer. Ein Fragebogen mit Musterung ist erst recht zulässig.",
    wirklich: "Bundestag und Bundesrat stimmten Ende 2025 zu, das Gesetz gilt seit Anfang 2026."
  }
];

const KANZLER = {
  merkel: { name: "Angela Merkel", video: "assets/intro_merkel.mp4" },
  scholz: { name: "Olaf Scholz", video: "assets/intro_scholz.mp4" },
  merz: { name: "Friedrich Merz", video: "assets/intro_merz.mp4" }
};
