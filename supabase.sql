-- Tabelle für die gemeinsame Bestenliste.
-- In Supabase unter "SQL Editor" einfügen und auf "Run" klicken.

create table scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 20),
  punkte int not null check (punkte between 0 and 900),
  richtige int not null check (richtige between 0 and 6),
  zeit int not null default 0 check (zeit >= 0),
  erstellt timestamptz not null default now()
);

alter table scores enable row level security;

-- Jeder darf die Bestenliste lesen und neue Ergebnisse eintragen,
-- aber niemand darf Einträge ändern oder löschen.
create policy "Bestenliste lesen" on scores for select using (true);
create policy "Ergebnis eintragen" on scores for insert with check (true);
