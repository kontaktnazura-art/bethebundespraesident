# Be a President

Ein kleines Browserspiel für unsere Präsentation: Du bist Bundespräsident und musst entscheiden, ob du Gesetze ausfertigst (unterschreibst) oder ablehnst. Alle Fälle sind echte Gesetze oder Gesetzentwürfe aus den Amtszeiten von Merkel, Scholz und Merz.

## So spielt man

1. Nickname eingeben. Dann bringt Merkel, Scholz oder Merz eine Akte herein.
2. Klick auf die blaue Mappe: Worum geht es?
3. Klick auf das Grundgesetz: Prüfhinweise.
4. Grüner Stempel = ausfertigen, roter Stempel = ablehnen.
5. Danach siehst du, ob deine Entscheidung richtig war, warum, und was in echt passiert ist.
6. Am Ende gibt es Punkte (100 pro richtiger Antwort plus Tempo-Bonus) und die Bestenliste mit allen Spielern.

Jede Amtszeit hat 6 Akten, zufällig aus 14 Fällen gezogen, immer mit mindestens 2 zum Unterschreiben und 2 zum Ablehnen. Wer nebeneinander sitzt, bekommt also unterschiedliche Fälle in anderer Reihenfolge.

## Gemeinsame Bestenliste einrichten (einmalig, ca. 5 Minuten)

GitHub Pages kann nur Dateien ausliefern, aber nichts speichern. Damit alle Spieler in einer gemeinsamen Bestenliste landen, braucht es einen kleinen Online-Speicher. Dafür nutzen wir Supabase (kostenlos).

1. Auf https://supabase.com ein kostenloses Konto anlegen und ein neues Projekt erstellen (Region: Frankfurt).
2. Links **SQL Editor** öffnen, den Inhalt von `supabase.sql` einfügen und **Run** klicken.
3. Unter **Project Settings → API** die **Project URL** und den **anon public** Key kopieren.
4. Beides in `config.js` eintragen, committen und pushen.

Der „anon“ Key darf öffentlich sein: Mit ihm kann man nur Ergebnisse lesen und neue eintragen, aber nichts ändern oder löschen. Den „service_role“ Key dagegen niemals eintragen.

Solange `config.js` leer ist, speichert das Spiel die Ergebnisse nur auf dem jeweiligen Gerät.

## Dateien

- `index.html`: das Spiel
- `faelle.js`: alle 14 Fälle mit Hinweisen, Lösung und „Was wirklich geschah“ (hier kann man Texte ändern)
- `sound.js`: alle Soundeffekte (werden im Browser erzeugt, keine Audiodateien)
- `config.js`: Zugangsdaten für die gemeinsame Bestenliste
- `supabase.sql`: Tabelle für die Bestenliste
- `assets/`: Hintergrundbilder und die Einlauf-Videos für Merkel, Scholz und Merz

- `bethebundespraesident.html`: die ältere, einfachere Version

## Online spielen

https://kontaktnazura-art.github.io/bethebundespraesident/

(Dafür muss im Repository unter **Settings → Pages** die Quelle „Deploy from a branch“, Branch `main`, Ordner `/ (root)` eingestellt sein.)
