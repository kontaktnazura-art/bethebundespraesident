-- Erlaubt das Leeren der Bestenliste über das Menü auf der Scoreboard-Seite,
-- aber nur mit Passwort.
-- 1. Unten HIER-DEIN-PASSWORT durch ein eigenes Passwort ersetzen.
-- 2. In Supabase unter "SQL Editor" einfügen und auf "Run" klicken.

-- Das Passwort liegt in einer Tabelle ohne Zugriffsregeln:
-- über die öffentliche Schnittstelle kann sie niemand lesen.
create table if not exists admin (passwort text not null);
alter table admin enable row level security;
delete from admin;
insert into admin values ('HIER-DEIN-PASSWORT');

create or replace function bestenliste_leeren(passwort text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  anzahl integer;
begin
  if not exists (select 1 from admin a where a.passwort = bestenliste_leeren.passwort) then
    raise exception 'Falsches Passwort';
  end if;
  delete from scores where true;
  get diagnostics anzahl = row_count;
  return anzahl;
end;
$$;

revoke all on function bestenliste_leeren(text) from public;
grant execute on function bestenliste_leeren(text) to anon, authenticated;

-- Passwort später ändern: nur diese Zeile ausführen
-- update admin set passwort = 'NEUES-PASSWORT';
