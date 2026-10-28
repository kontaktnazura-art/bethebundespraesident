// Alle Fälle des Spiels. Pro Runde werden zufällig 6 davon gezogen.
// loesung: "unterschreiben" | "ablehnen" | "beides" (Streitfall, beides gilt als richtig)
// art: "formal" (scheitert am Verfahren) | "inhaltlich" | null
const FAELLE = [
  {
    id: 1,
    titel: "Gebäudeenergieeffizienzfortschreibungsgesetz",
    kurztitel: "GEEFG",
    drucksache: "21/1180",
    worum: "Ab 2030 müssen neue Heizungen einen Mindestanteil erneuerbarer Energien nutzen. Bundestag hat beschlossen, Bundesrat hat zugestimmt.",
    umstaende: "Der Name passt nicht auf den Aktendeckel, das Kabinett sagt stolz „GEEFG“. In der Mappe liegen 340 Seiten Stellungnahmen und ein Zettel: „Herr Bundespräsident, bitte zügig.“",
    hinweise: [
      "Das Grundgesetz schreibt keine Heizungsart vor.",
      "Eingriffe in Eigentum und Berufsfreiheit müssen verhältnismäßig sein. Teuer ist nicht gleich unverhältnismäßig (Art. 12, Art. 14 GG).",
      "Der Bundespräsident prüft das Verfahren und offensichtliche Verfassungsverstöße. Er ist keine dritte Kammer."
    ],
    loesung: "unterschreiben",
    art: null,
    begruendung: "Politisch umkämpft, verfassungsrechtlich sauber. Das „bitte zügig“ ist kein Ablehnungsgrund."
  },
  {
    id: 2,
    titel: "Digitalpakt III",
    kurztitel: "Digitalpakt III",
    drucksache: "21/1204",
    worum: "Der Bund zahlt 6 Milliarden Euro für Schul-IT. In § 4 steht außerdem: Ab Klasse 7 gibt es bundesweit das Fach „Digitalkunde“ mit einheitlichem Lehrplan.",
    umstaende: "Die Kultusministerkonferenz hat protestiert, in sechzehn getrennten Schreiben, drei davon als Fax.",
    hinweise: [
      "Schulen und Lehrpläne sind Ländersache (Art. 30, Art. 70 GG).",
      "Der Bund darf Geld geben, aber keine Unterrichtsinhalte vorschreiben.",
      "Wenn ein Gesetz beides mischt, kippt der unzulässige Teil das Ganze."
    ],
    loesung: "ablehnen",
    art: "inhaltlich",
    begruendung: "Das Geld wäre in Ordnung, § 4 ist es nicht. Wer bis zum Ende liest, findet den Fehler."
  },
  {
    id: 3,
    titel: "Gesetz über das Sondervermögen Infrastruktur",
    kurztitel: "Sondervermögen Infrastruktur",
    drucksache: "21/1233",
    worum: "500 Milliarden Euro außerhalb der Schuldenbremse, beschlossen mit einfacher Mehrheit.",
    umstaende: "Die Begründung nennt das Konstrukt „haushaltsneutral“. Der Haushaltsausschuss hat das protokolliert, ohne zu lachen.",
    hinweise: [
      "Eine Grundgesetzänderung braucht zwei Drittel im Bundestag und im Bundesrat (Art. 79 Abs. 2 GG).",
      "Ein einfaches Gesetz kann das Grundgesetz nicht umgehen, auch nicht kreativ.",
      "Ausnahmen von der Schuldenbremse stehen im Grundgesetz selbst und sind eng (Art. 109, Art. 115 GG)."
    ],
    loesung: "ablehnen",
    art: "inhaltlich",
    begruendung: "Das Gesetz wirkt wie eine Verfassungsänderung, hat aber nicht die Mehrheit dafür."
  },
  {
    id: 4,
    titel: "Steuerentlastungsgesetz",
    kurztitel: "Steuerentlastungsgesetz",
    drucksache: "21/1251",
    worum: "Der Grundfreibetrag wird angehoben, rückwirkend zum 1. Januar.",
    umstaende: "Im Entwurf steht groß „RÜCKWIRKEND“. Der Finanzminister hat das Wort fett setzen lassen, weil es gut aussieht.",
    hinweise: [
      "Rückwirkung ist problematisch, wenn sie Menschen belastet und ihr Vertrauen zerstört (Rechtsstaatsprinzip, Art. 20 Abs. 3 GG).",
      "Wer rückwirkend entlastet wird, hat nichts zu befürchten.",
      "Entscheidend ist die Richtung, nicht das Wort."
    ],
    loesung: "unterschreiben",
    art: null,
    begruendung: "Die Falle: „Rückwirkend“ klingt nach Ablehnen. Eine Rückwirkung, die Bürger begünstigt, ist aber zulässig."
  },
  {
    id: 5,
    titel: "Berufsqualifikationsanerkennungsgesetz",
    kurztitel: "Berufsanerkennung",
    drucksache: "21/1277",
    worum: "Regelt, wie ausländische Berufsabschlüsse anerkannt werden. Inhaltlich unauffällig.",
    umstaende: "Unter dem Gesetzestext fehlt die Gegenzeichnung der zuständigen Ministerin. Sie ist am Vorabend zurückgetreten. Der Staatssekretär sagt, das reiche man nach, die Pressemitteilung sei schon geschrieben.",
    hinweise: [
      "Der Bundespräsident fertigt Gesetze aus, nachdem das Verfahren abgeschlossen ist (Art. 82 Abs. 1 GG).",
      "Dafür braucht es die Gegenzeichnung des Kanzlers oder der zuständigen Ministerin (Art. 58 GG).",
      "Eine fehlende Unterschrift wird nicht durch eine Pressemitteilung ersetzt."
    ],
    loesung: "ablehnen",
    art: "formal",
    begruendung: "Ablehnen beziehungsweise zurückgeben. Ein reiner Formfehler: Die Gegenzeichnung fehlt."
  },
  {
    id: 6,
    titel: "Sicherheitsüberwachungsanpassungsgesetz",
    kurztitel: "Überwachungsanpassung",
    drucksache: "21/1302",
    worum: "Die Telekommunikationsüberwachung wird erweitert. Das schränkt das Fernmeldegeheimnis ein.",
    umstaende: "Im Referentenentwurf stand der Grundrechtsartikel noch drin. Beim Umformatieren ist die Zeile verrutscht.",
    hinweise: [
      "Wer ein Grundrecht einschränkt, muss es im Gesetz ausdrücklich nennen, mit Artikel (Art. 19 Abs. 1 Satz 2 GG).",
      "Das ist kein Schönheitsfehler, sondern eine Voraussetzung dafür, dass das Gesetz gilt.",
      "Ein Gesetz, das daran scheitert, ist nichtig, egal was drinsteht."
    ],
    loesung: "ablehnen",
    art: "formal",
    begruendung: "Das Fernmeldegeheimnis (Art. 10 GG) wird eingeschränkt, aber nicht genannt. Der unbekannteste Fall und der schönste, wenn man ihn findet."
  },
  {
    id: 7,
    titel: "Energienetzvergesellschaftungsgesetz",
    kurztitel: "Netzvergesellschaftung",
    drucksache: "21/1319",
    worum: "Die Übertragungsnetze gehen in Gemeineigentum über. Entschädigung zum Verkehrswert, die Höhe legt eine Kommission fest.",
    umstaende: "Die Anwaltskanzlei des Konzerns hat bereits drei Gutachten bestellt, eines davon bei sich selbst.",
    hinweise: [
      "Eigentum ist geschützt, aber Produktionsmittel dürfen gegen Entschädigung vergesellschaftet werden (Art. 15 GG).",
      "Das Grundgesetz sieht das ausdrücklich vor. Es wurde nur praktisch nie genutzt.",
      "Entscheidend ist, dass Art und Höhe der Entschädigung im Gesetz geregelt sind."
    ],
    loesung: "unterschreiben",
    art: null,
    begruendung: "Radikal, aber genau so im Grundgesetz vorgesehen. Die Gutachten ändern daran nichts."
  },
  {
    id: 8,
    titel: "Chemieanlagensicherheitsgesetz",
    kurztitel: "Chemieanlagensicherheit",
    drucksache: "21/1340",
    worum: "§ 1 entzieht einer namentlich genannten Firma die Betriebserlaubnis, inklusive Handelsregisternummer. Alle anderen Paragraphen regeln Allgemeines.",
    umstaende: "Der Umweltskandal, um den es geht, war echt.",
    hinweise: [
      "Gesetze müssen allgemein gelten und dürfen nicht für einen Einzelfall gemacht werden (Art. 19 Abs. 1 Satz 1 GG).",
      "Gegen Entscheidungen der Verwaltung muss man vor Gericht gehen können (Art. 19 Abs. 4 GG).",
      "Ein Gesetz, das eine Behördenentscheidung ersetzt, nimmt dem Betroffenen das Gericht."
    ],
    loesung: "ablehnen",
    art: "inhaltlich",
    begruendung: "Das Anliegen mag berechtigt sein, der Weg ist es nicht. Dafür gibt es Behörden."
  },
  {
    id: 9,
    titel: "Plattformregulierungsgesetz",
    kurztitel: "Plattformregulierung",
    drucksache: "21/1366",
    worum: "Plattformen müssen „offensichtlich rechtswidrige“ Inhalte binnen 24 Stunden löschen, sonst drohen hohe Bußgelder.",
    umstaende: "Der Begriff wird in einer Fußnote definiert, die auf eine andere Fußnote verweist. Die steht auf Seite 91 und verweist zurück.",
    hinweise: [
      "Die Meinungsfreiheit endet an den allgemeinen Gesetzen und am Persönlichkeitsschutz (Art. 5 Abs. 2 GG).",
      "Gesetze müssen bestimmt genug sein, sonst entscheidet am Ende die Plattform.",
      "Der Bundespräsident prüft nur offensichtliche Verstöße. Zweifel reichen nicht."
    ],
    loesung: "beides",
    art: null,
    begruendung: "Das ist der Streitfall. Strenger Maßstab: unterschreiben und Karlsruhe entscheiden lassen, weil die Verfassungswidrigkeit nicht offensichtlich ist. Wer ablehnt, hat die Fußnotenschleife auf seiner Seite."
  },
  {
    id: 10,
    titel: "Verwaltungsverfahrensbeschleunigungsgesetz",
    kurztitel: "Verfahrensbeschleunigung",
    drucksache: "21/1388",
    worum: "Regelt, wie Landesbehörden Genehmigungen bearbeiten müssen.",
    umstaende: "Die Bundesregierung hat es „aus Zeitgründen“ als Einspruchsgesetz behandelt. Der Bundesrat hat davon aus der Pressemitteilung erfahren und reagiert, wie man sich das vorstellt.",
    hinweise: [
      "Gesetze, die in die Verwaltung der Länder eingreifen, brauchen meist die Zustimmung des Bundesrats (Art. 84 Abs. 1 GG).",
      "Ob ein Gesetz zustimmungsbedürftig ist, entscheidet sein Inhalt, nicht der Terminkalender.",
      "Ohne die nötige Zustimmung ist das Gesetz nicht zustande gekommen (Art. 78 GG)."
    ],
    loesung: "ablehnen",
    art: "formal",
    begruendung: "Die Prüfung scheitert schon am Verfahren, der Inhalt kommt gar nicht erst dran."
  }
];
