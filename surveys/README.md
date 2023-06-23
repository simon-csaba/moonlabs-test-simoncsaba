# Kérdőívek

_Kliensoldali webprogramozás 2. beadandó_

A megoldás nem teljes (azaz nem maximum pontos), a kérdőívek csak létrehozhatók nem kitölthetők.

## A feladat

A beadandóban olyan webes alkalmazást kell írnod, amelyben egy felhasználónak lehetősége van többlépéses kérdőíveket összeállítania. Az elkészített kérdőíveket egy táblázatban át lehet tekinteni, ahol lehetőség van ezek módosítására, törlésére, valamint azok megosztására egy linken keresztül. Ezen a linken keresztül aztán a kérdőívet ki lehet tölteni. A kérdőívekhez tartozó válaszokat ezt követően egy külön felületen meg lehet tekinteni. 

A feladatot _React_ és _Redux_ kombinációjával kell megoldanod, Redux esetében ajánlott a _redux toolkit_ és akár az _RTK Query_ használata. Mivel az alkalmazás több oldalból áll, a _react-router_ használata javasolt.
A feladatban adott a szerveroldali REST API, leírását lentebb olvashatjátok, ehhez kell igazodnia a kliensnek.

## Oldalak

### Navigáció

Minden oldal tetején megjelenik egy navigációs sáv, ahol az alkalmazás neve és az elérhető funkciók vannak menüpontokban megjelenítve:

- Kérdőívek (ez az alkalmazás neve, rákattintva főoldalra visz)
- Ha nincs bejelentkezve
  - Regisztráció
  - Bejelentkezés
- Bejelentkezve
  - Kérdőíveim
  - Válaszok
  - Profil
  - Kijelentkezés

### Főoldal

Statikus információkat tartalmazó oldal, az alkalmazás címével és egy rövid leírással.

### Regisztráció

Az alábbi adatok megadása szükséges:

- teljes név (kötelező)
- email cím (email, kötelező)
- jelszó (kötelező)

Validáció elegendő HTML5 attribútumokkal!

### Bejelentkezés

Az alábbi kötelező adatokkal történik:

- email (email. kötelező)
- jelszó (kötelező)

Validáció elegendő HTML5 attribútumokkal!

### Új kérdőív

Csak bejelentkezve érhető el.
Egy darab textarea-t tartalmaz, amin keresztül újabb kérdőívet készíthetünk.
A kérdőív egy "kód" formájában készül, aminek szabályai a következőek:

- első sor tartalmazza a kérdőív megnevezését
- minden kérdőíven belüli lap egy üres sorral kezdődik
- a lapok első sora tartalmazza annak a megnevezését, majd alatta külön sorokban az egyes kérdések

A bevitt adatot ellenőrizni kell. A formátum ellenőrzésekor elég a következőket figyelni:
- nem üres,
- van címe,
- legalább 1 lapja,
- laponként legalább 1 kérdéssel.

A kérdések minden esetben egyszerű szöveges választ várnak. 

A kérdőív mentésekor a REST API automatikusan a bejelentezettt felhasználóhoz rendeli a kérdőívet, generál neki egy egyedi azonosítót (`hash`), amit majd a hivatkozáshoz lehet használni.

![Válaszok](./images/new.png)

### Kérdőíveim

Csak bejelentkezve érhető el.
A bejelentkezett felhasználóhoz tartozó kérdőívek jelennek itt meg, minden feladatsornál azok nevei, létrehozási dátumai és a hozzá tartozó funkciógombok. A nevek linkek, amik a  kérdőívhez tartozó linkre (`hash`) mutatnak (ezen keresztül van lehetőség annak kitöltésére). Minden kérdőívnél lehetőség van:

- annak törlésére,
- módosítására (az "Új kérdőív" felületen jelenik meg a jelenlegi kérdőív "kódja"),
- hozzá tartozó link vágólapra másolására,
- valamint a hozzá tartozó válaszok megtekintésére.

![Válaszok](./images/list.png)

### Kérdőív

Az előző részben tárgyalt hivatkozás ismeretében bárki elérheti. Pl. `http://localhost:3000/survey/<hash>`.

A kérdőív különböző lépésekként jeleníti meg az egyes lapokon található kérdéseket. A következő lapra csak abban az esetben léphetünk, ha a felhasználó már minden aktuális mezőt kitöltött. Navigálni az előre-hátra gombokkal, illetve a lapok neveire kattintva lehet. Lapra csak akkor lehet lépni, ha már ki van töltve, vagy éppen az az aktuális.

A legvégén a beküldés gomb hatására a válaszokat felküldjük. Csak úgy küldhető be a kérdőív, ha minden adat ki van töltve.

![Válaszok](./images/query.png)

### Válaszok

Csak bejelentkezve érhető el.
A "Kérdőíveim" oldalon kiválasztott kérdőív válaszai tekinthetőek itt meg listaszerűen. Megjelenik a kérdőív címe, a kérdések és a kérdések alatt a kitöltők által adott válaszok.

![Válaszok](./images/answers.png)

### Profil

Csak bejelentkezve érhető el.
A bejelentkezett felhasználó adatai jelennek meg.

- Név
- Email
- Kérdőívek száma
- Kijelentkezés gomb

## A kliens

```
cd client
npm install
npm run dev
```

## REST API

A szerver forráskódja a `rest-api` mappában található. Telepíteni és indítani kell lokálisan:

```
cd rest-api
npm install
npm start
```

Három szolgáltatás van kivezetve:

- `users`
- `surveys`
- `results`

A `surveys` és `results` végpontok eléréséhez hitelesítés szükséges. Ehhez egy `Authorization` HTTP fejlécet kell küldeni `Bearer token` tartalommal. A tokent a login végpont adja vissza. Az authentikációhoz tartozó JWT token a `surveys` és `results` gyűjtemény `Authorization` fülén van elmentve, ott igény szerint cserélhető. Az itt megadott token is használható próbaképpen, de az alkalmazásban dinamikusan kell generáltatni.

