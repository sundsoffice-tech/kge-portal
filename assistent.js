/* KGE-Portal Assistent: einmaliger Rundgang + Frage-Assistent (S&S Connect) */
(function () {
  "use strict";
  var PAGE = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";

  /* ---------------- Wissensbasis (global) ---------------- */
  var QA_GLOBAL = [
    { k: ["kost", "preis", "honorar s", "was zahle", "gebuhr", "teuer"], chip: "Was kostet mich das?",
      a: "Unsere Preise sind in allen Varianten gleich: <b>490&nbsp;&euro; einmalig</b> f&uuml;r die komplette Einrichtung, optional <b>290&nbsp;&euro;</b> f&uuml;r die neue Landingpage und <b>190&nbsp;&euro;/Monat</b> f&uuml;r die laufende Betreuung &mdash; monatlich k&uuml;ndbar. Dazu kommt Ihr Werbebudget (1.000, 1.500 oder 3.000&nbsp;&euro;/Monat), das Google direkt mit Ihnen abrechnet. Darauf nehmen wir <b>keine Provision</b>." },
    { k: ["variante", "unterschied", "paket", "welches", "empfehl"], chip: "Welche Variante passt zu mir?",
      a: "Die drei Varianten unterscheiden sich <b>nur im Werbebudget</b> &mdash; unsere Leistung ist identisch. <b>Start</b> (1.000&nbsp;&euro;): vorsichtig testen, ca. 8&ndash;12 Auftr&auml;ge/Monat. <b>Wachstum</b> (1.500&nbsp;&euro;): unsere Empfehlung, ca. 12&ndash;18 Auftr&auml;ge, inkl. Umland. <b>Marktdominanz</b> (3.000&nbsp;&euro;): &uuml;berall ganz oben, 24&ndash;36 Auftr&auml;ge &mdash; braucht aber die Kapazit&auml;t daf&uuml;r. Sie k&ouml;nnen jederzeit wechseln, das ist keine Vertrags&auml;nderung." },
    { k: ["wer zahlt", "kostenlos", "versicherung zahlt", "249", "gegnerisch", "geschadigt"], chip: null,
      a: "Bei einem <b>unverschuldeten Unfall</b> zahlt die Versicherung des Unfallgegners das Gutachten &mdash; das steht so im Gesetz (&sect;&nbsp;249 BGB). Ihr Kunde zahlt also nichts, Sie rechnen direkt mit der Versicherung ab. Wichtig: Es gilt ab ca. 1.000&nbsp;&euro; Schadenh&ouml;he und bei Teilschuld nur anteilig &mdash; deshalb formulieren wir es in der Werbung mit Sternchen rechtssicher." },
    { k: ["kundig", "vertrag", "laufzeit", "binden", "aussteigen", "stoppen"], chip: "Kann ich jederzeit kündigen?",
      a: "Ja &mdash; <b>monatlich, formlos, ohne Begr&uuml;ndung</b>. Es gibt keine Mindestlaufzeit. Das Google-Ads-Konto samt allen Kampagnen l&auml;uft auf Ihren Namen und bleibt auch nach einer K&uuml;ndigung Ihr Eigentum. Das Werbebudget k&ouml;nnen Sie zus&auml;tzlich jederzeit am selben Tag pausieren lassen &mdash; zum Beispiel im Urlaub." },
    { k: ["ablauf", "wie lange", "wann", "erste anfrage", "erste lead", "los geht", "starten", "dauert", "weiter"], chip: "Wie geht es jetzt weiter?",
      a: "So l&auml;uft es: <b>1.</b> Sie w&auml;hlen Ihre Variante (formlos per Anruf oder WhatsApp). <b>2.</b> Woche 1&ndash;2: Wir bauen alles auf &mdash; Sie geben Anzeigen und Landingpage frei, bevor etwas live geht. <b>3.</b> Woche 3&ndash;6: Testphase, die ersten Anrufe kommen typischerweise in den ersten zwei Wochen nach Livegang. <b>4.</b> Ab Woche 7 wird mit echten Zahlen optimiert. Verl&auml;ssliche Kennzahlen haben wir nach ca. 6 Wochen." },
    { k: ["cpl", "pro anfrage", "pro lead", "lead kost"], chip: null,
      a: "<b>CPL</b> hei&szlig;t &bdquo;Cost per Lead&ldquo; &mdash; was eine Anfrage kostet (ein Anruf, eine WhatsApp oder ein ausgef&uuml;lltes Formular). Rechenbeispiel: Kostet ein Klick 5&nbsp;&euro; und ruft jeder zehnte Besucher an, kostet eine Anfrage 50&nbsp;&euro;. Unsere Erwartung f&uuml;r Sie: <b>42&ndash;63&nbsp;&euro; pro Anfrage</b>." },
    { k: ["cpa", "pro auftrag", "auftrag kost"], chip: null,
      a: "<b>CPA</b> hei&szlig;t &bdquo;Cost per Acquisition&ldquo; &mdash; was Sie ein gewonnener <b>Auftrag</b> insgesamt kostet (Werbebudget + unsere Betreuung, geteilt durch die Auftr&auml;ge). Unsere Erwartung: <b>ca. 90&ndash;150&nbsp;&euro; pro Auftrag</b>. Dem stehen laut BVSK-Tabelle 650&ndash;1.200&nbsp;&euro; Honorar gegen&uuml;ber &mdash; deshalb rechnet sich das so deutlich." },
    { k: ["roas", "umsatz pro", "rendite", "lohnt sich", "rechnet sich"], chip: null,
      a: "<b>ROAS</b> = &bdquo;Return on Ad Spend&ldquo; &mdash; wie viel Umsatz jeder eingesetzte Euro zur&uuml;ckbringt. Beispiel: 1.690&nbsp;&euro; Gesamtkosten (Budget + Betreuung), 16.200&nbsp;&euro; Honorarumsatz = ROAS von 9,6. Selbst im vorsichtigsten Szenario liegt er bei gut 3 &mdash; die Kampagne tr&auml;gt sich also auch, wenn vieles schlechter l&auml;uft als geplant." },
    { k: ["impression share", "sichtbarkeit", "einblendung"], chip: null,
      a: "Der <b>Impression Share</b> sagt: Bei wie viel Prozent aller passenden Suchen wurde Ihre Anzeige tats&auml;chlich gezeigt? 70&nbsp;% hei&szlig;t: 7 von 10 Menschen, die in M&ouml;nchengladbach nach einem Gutachter suchen, sehen Sie. Je mehr Budget, desto h&ouml;her dieser Wert &mdash; das ist der Haupt-Unterschied zwischen den drei Varianten." },
    { k: ["lead", "anfrage was"], chip: null,
      a: "Ein <b>Lead</b> ist eine echte Kontaktaufnahme: jemand ruft an, schreibt per WhatsApp oder f&uuml;llt das Formular aus. Noch kein Auftrag &mdash; aber bei Unfallgesch&auml;digten wird nach unserer Kalkulation etwa jeder zweite Lead zum Auftrag, weil die Menschen akut Hilfe brauchen." },
    { k: ["brauchen sie von mir", "brauchen von mir", "liefern", "zugang", "todo", "vorbereiten", "mitwirken", "brauchen"], chip: "Was brauchen Sie von mir?",
      a: "F&uuml;nf Dinge, zusammen ca. 20 Minuten: <b>1.</b> Ihre Varianten-Entscheidung. <b>2.</b> Den Link zu Ihrem Google-Unternehmensprofil (f&uuml;r die 4,9&#9733;-Bewertungen). <b>3.</b> Zugang zur Domain gutachten-es.de f&uuml;r die Landingpage. <b>4.</b> Ihr Google-Ads-Konto &mdash; oder wir erstellen es gemeinsam in 10 Minuten. <b>5.</b> Optional, aber stark: 3&ndash;5 echte Fotos aus Ihrem Betrieb." },
    { k: ["kontakt", "telefon", "erreich", "anrufen", "sprechen", "schippers", "singh", "mensch"], chip: null,
      a: "Sie erreichen uns direkt: <b>S&amp;S Connect GbR</b> (Schippers &amp; Singh), Nobelstra&szlig;e 3&ndash;5, 41189 M&ouml;nchengladbach. <a href='tel:+4915140322125'>+49 151 40322125</a> &mdash; anrufen oder WhatsApp. Wir gehen alles gerne pers&ouml;nlich mit Ihnen durch." },
    { k: ["landingpage", "warum neue seite", "eigene seite", "webseite"], chip: null,
      a: "Die <b>Landingpage</b> ist die Seite, auf der Besucher aus Ihrer Anzeige landen. Wir bauen daf&uuml;r eine eigene, aufs Anrufen optimierte Seite &mdash; Ihre normale Website hat zu viele Ausstiege (Men&uuml;, Unterseiten). Auf der Kampagnenseite gibt es genau ein Ziel: dass der Unfallgesch&auml;digte Sie sofort anruft oder Fotos per WhatsApp schickt. Den Entwurf k&ouml;nnen Sie hier im Portal ansehen." },
    { k: ["report", "tracking", "messen", "zahlen sehe", "kontrolle", "transparen"], chip: null,
      a: "Sie bekommen jeden Monat einen <b>Klartext-Report</b> mit den drei Zahlen, die z&auml;hlen: Wie viele Anfragen kamen, was hat eine Anfrage gekostet, was ein Auftrag. Dazu haben Sie jederzeit vollen Zugriff auf das Werbekonto &mdash; nichts l&auml;uft im Verborgenen." },
    { k: ["budget wechseln", "budget andern", "erhohen", "verringern", "pausier", "urlaub"], chip: null,
      a: "Das Werbebudget ist <b>jederzeit anpassbar</b> &mdash; erh&ouml;hen, senken oder pausieren, auch tagesgenau (z.&nbsp;B. im Urlaub). Ein Wechsel zwischen den Varianten ist keine Vertrags&auml;nderung, sondern ein Anruf bei uns." },
    { k: ["risiko", "garantie", "sicher", "was wenn nicht", "funktioniert nicht", "verlust"], chip: null,
      a: "Ehrliche Antwort: Die Zahlen sind <b>Modellrechnungen</b>, keine Garantie &mdash; jede Annahme steht offen in den Datenbl&auml;ttern. Ihre Absicherung: kleines Testbudget zum Start, monatlich k&uuml;ndbar, Budget-Stopp am selben Tag, und nach 6 Wochen echte Zahlen statt Prognosen. Die Analyse zeigt zudem: Selbst wenn Klickpreise oder Anrufquote 50&nbsp;% schlechter ausfallen, bleibt die Rechnung positiv." },
    { k: ["bvsk", "honorartabelle", "honorarbefragung"], chip: null,
      a: "Die <b>BVSK-Honorarbefragung</b> ist die offizielle Honorar-&Uuml;bersicht des Bundesverbands der KFZ-Sachverst&auml;ndigen &mdash; von Gerichten als Rechengrundlage anerkannt. Danach bringt ein Gutachten bei einem typischen 3.000-&euro;-Schaden ca. 650&ndash;750&nbsp;&euro; netto, bei gr&ouml;&szlig;eren Sch&auml;den bis 1.200&nbsp;&euro; und mehr. Das ist die Basis unserer gesamten Wirtschaftlichkeitsrechnung &mdash; gepr&uuml;ft gegen das Original-Dokument." },
    { k: ["konkurrenz", "wettbewerber", "petermann", "karpro", "unfallexpert", "kuban", "andere gutachter"], chip: null,
      a: "Vier Wettbewerber sind in M&ouml;nchengladbach aktiv: <b>Petermann</b> (stark bei Google-Treffern, 18 Stadt-Seiten), <b>KarPro</b> (gro&szlig;er Radius, verspricht 1&ndash;2&nbsp;h Reaktionszeit), <b>UnfallExpert24</b> (&uuml;berregional, wirbt mit Tankgutscheinen &mdash; zielt genau auf Rheydt) und <b>Kuban</b> (klassisches B&uuml;ro, ~3&nbsp;km von Ihnen). Ehrlich gesagt: Abschleppen, Mietwagen und Abwicklung <b>bewerben</b> auch Petermann und UnfallExpert24 &mdash; laut deren Websites aber organisiert bzw. vermittelt. Ihr haltbares Argument: Bei Ihnen kommt alles aus dem <b>eigenen Haus</b> (eigene Flotte, eigene Werkstatt, Meisterbetrieb). Details im Datenblatt 4." },
    { k: ["google ads", "wie funktioniert werbung", "anzeige funktion", "adwords"], chip: null,
      a: "<b>Google Ads</b> funktioniert so: Wenn jemand nach einem KFZ-Gutachter in M&ouml;nchengladbach googelt, erscheint Ihre Anzeige ganz oben &mdash; noch &uuml;ber den normalen Treffern. Sie zahlen nur, wenn jemand tats&auml;chlich klickt (ca. 3&ndash;6&nbsp;&euro;). Da nach einem Unfall fast jeder sofort anruft statt lange zu vergleichen, ist das der direkteste Weg zu neuen Auftr&auml;gen." },
    { k: ["keyword", "suchbegriff"], chip: null,
      a: "<b>Keywords</b> sind die Suchbegriffe, bei denen Ihre Anzeige erscheinen soll &mdash; z.&nbsp;B. &bdquo;kfz gutachter m&ouml;nchengladbach&ldquo; oder &bdquo;unfallgutachten kosten&ldquo;. Wir haben &uuml;ber 80 passende Begriffe recherchiert und in Gruppen sortiert, inklusive einer Ausschlussliste, damit Ihr Budget nicht f&uuml;r Jobsuchende draufgeht." },
    { k: ["pdf", "download", "herunterladen", "ausdrucken", "dokument"], chip: null,
      a: "Alle Unterlagen gibt es doppelt: als Webseite hier im Portal (Startseite &rarr; &bdquo;Ihre Unterlagen&ldquo;) und als <b>PDF zum Herunterladen</b> &mdash; der Download-Link steht bei jeder Dokument-Karte. Das Angebots-PDF k&ouml;nnen Sie direkt ausdrucken, ankreuzen und unterschreiben." },
    { k: ["datenschutz", "dsgvo"], chip: null,
      a: "Beim Livegang richten wir das Tracking datenschutzkonform ein (Einwilligung, Datenschutzerkl&auml;rung auf der Landingpage, keine Weitergabe von Kundendaten). Das Formular auf dem Entwurf enth&auml;lt bereits den n&ouml;tigen Einwilligungshinweis." },
    { k: ["smart bidding", "ziel-cpa", "automatisch biet", "algorithmus"], chip: null,
      a: "<b>Smart Bidding</b> hei&szlig;t: Nach der Testphase &uuml;bernimmt Googles Automatik das Bieten &mdash; mit einem von uns gesetzten Kosten-Limit pro Auftrag. Die Automatik lernt aus Ihren echten Anrufen und wird dadurch mit der Zeit g&uuml;nstiger. Daf&uuml;r braucht sie erst ca. 30&ndash;50 gemessene Anfragen." },
    { k: ["seiten", "navigation", "wo finde", "ubersicht", "portal"], chip: null,
      a: "Das Portal hat f&uuml;nf Seiten: <a href='index.html'>Startseite</a> (&Uuml;berblick &amp; n&auml;chste Schritte), <a href='marktanalyse.html'>Marktanalyse</a> (komplette Recherche mit Rechner), <a href='angebot.html'>Angebot</a> (3 Varianten mit Vergleichstabelle), <a href='datenblaetter.html'>Datenbl&auml;tter</a> (Details pro Variante + Konkurrenz) und der <a href='landingpage.html'>Landingpage-Entwurf</a>." }
  ];

  /* ---------------- Seiten-Konfiguration ---------------- */
  var CFG = {
    index: {
      intro: "Willkommen! Ich zeige Ihnen in 2 Minuten, wo hier alles ist &mdash; oder Sie fragen mich direkt. Womit starten wir?",
      chips: ["Was kostet mich das?", "Welche Variante passt zu mir?", "Wie geht es jetzt weiter?", "Was brauchen Sie von mir?"],
      qa: [],
      tour: [
        { sel: ".kpis", t: "Die vier wichtigsten Zahlen", x: "Ganz kurz: Ein Gutachten bringt Ihnen 650&ndash;1.200&nbsp;&euro; Honorar. Ein &uuml;ber die Kampagne gewonnener Auftrag kostet Sie voraussichtlich nur 90&ndash;150&nbsp;&euro;. Das ist der ganze Kern des Projekts." },
        { sel: "#idee", t: "Worum es geht", x: "Hier steht die Idee in 60 Sekunden &mdash; falls Sie nur einen Absatz lesen wollen, dann diesen." },
        { sel: "#ablauf .timeline", t: "Ihr Fahrplan", x: "So l&auml;uft die Zusammenarbeit. Der orange Punkt zeigt: Sie sind gerade beim ersten Schritt &mdash; Unterlagen ansehen und Variante w&auml;hlen. Wichtig: Nichts geht live, bevor Sie es freigegeben haben." },
        { sel: "#dokumente .docs", t: "Ihre Unterlagen", x: "Vier Dokumente, jede Karte erkl&auml;rt kurz den Inhalt. Der gr&uuml;ne Kasten sagt Ihnen jeweils, was Sie lesen sollten, wenn Sie wenig Zeit haben. Die Buttons &ouml;ffnen die Online-Version, der Link darunter das PDF." },
        { sel: "#varianten .plans", t: "Ihre einzige Entscheidung", x: "Drei Varianten &mdash; der Unterschied ist nur, wie viel Werbebudget in den Markt geht. Die mittlere ist unsere Empfehlung. Wechseln geht sp&auml;ter jederzeit." },
        { sel: "#brauchen .need", t: "Was wir von Ihnen brauchen", x: "F&uuml;nf Punkte, zusammen etwa 20 Minuten. Punkt 1 ist der wichtigste: Ihre Varianten-Wahl &mdash; formlos per Anruf oder WhatsApp gen&uuml;gt." },
        { sel: ".contact-card", t: "Direkter Draht", x: "Bei jeder Frage: einfach durchrufen. Und rechts unten finden Sie mich &mdash; ich beantworte Fragen zu allem, was Sie hier sehen." }
      ]
    },
    marktanalyse: {
      intro: "Das ist die komplette Markt-Recherche. Ich f&uuml;hre Sie zu den wichtigsten Stellen &mdash; oder beantworte direkt Ihre Fragen.",
      chips: ["Was ist das Wichtigste?", "Wie sicher sind die Zahlen?", "Was kostet mich das?", "Welche Variante passt zu mir?"],
      qa: [
        { k: ["wichtigste", "kurzfassung", "zusammenfassung", "tldr"], chip: null,
          a: "Das Wichtigste in drei S&auml;tzen: <b>1.</b> Ein Gutachten bringt Ihnen 650&ndash;1.200&nbsp;&euro;, ein Klick auf Ihre Anzeige kostet nur 3&ndash;6&nbsp;&euro; &mdash; deshalb rechnet sich die Kampagne selbst im schlechten Fall. <b>2.</b> Vier Wettbewerber sind aktiv &mdash; Ihr haltbarer Trumpf: Rundum-Service aus dem <b>eigenen Haus</b> (eigene Flotte, eigene Werkstatt), w&auml;hrend die anderen so etwas laut Website organisieren oder vermitteln. <b>3.</b> Empfehlung: Start mit 1.500&nbsp;&euro;/Monat Werbebudget. Details: Kapitel 01 und 03." },
        { k: ["sicher sind die zahlen", "zahlen sicher", "verlasslich", "gepruft", "quellen", "stimmt das"], chip: null,
          a: "Jede tragende Aussage wurde von drei unabh&auml;ngigen Pr&uuml;finstanzen <b>gegengepr&uuml;ft</b> &mdash; mit dem Auftrag, sie zu widerlegen. Ergebnis: 22 best&auml;tigt, 3 widerlegt (die widerlegten Branchenzahlen sind im Dokument als Warnung markiert). Alles ist mit Quellen belegt &mdash; Kapitel 12. Kennzeichnung: gr&uuml;n = verifiziert, gelb = Sch&auml;tzung mit offenen Annahmen." },
        { k: ["rechner", "regler", "ausprobieren", "simulation"], chip: null,
          a: "In Kapitel 06 gibt es einen <b>Was-w&auml;re-wenn-Rechner</b>: Bewegen Sie die Regler f&uuml;r Budget, Klickpreis und Anrufquote &mdash; alle Kennzahlen rechnen live mit. So sehen Sie selbst, wie robust die Rechnung ist." }
      ],
      tour: [
        { s: 1, sel: ".kpis", t: "Die Kernzahlen", x: "Honorar pro Gutachten, erwarteter Klickpreis, Ziel-Kosten pro Anfrage und das empfohlene Startbudget &mdash; alles Weitere im Dokument begr&uuml;ndet diese vier Zahlen." },
        { s: 1, sel: "#summary .verdict", t: "Das Urteil", x: "Falls Sie nur eine Stelle lesen: diese. Das Gesamtergebnis der Analyse in zwei S&auml;tzen." },
        { sel: "#wettbewerb", t: "Ihre Konkurrenz", x: "Alle vier aktiven Wettbewerber &mdash; und zu jedem die passende Gegenstrategie mit Ihren vorhandenen St&auml;rken. Die Tabelle darunter zeigt ehrlich, wo Sie sich abheben und wo Wettbewerber &Auml;hnliches bewerben." },
        { sel: "#honorare", t: "Was ein Gutachten bringt", x: "Die offizielle Honorartabelle (BVSK 2024) &mdash; gerichtlich anerkannt und von uns gegen das Original gepr&uuml;ft. Vorsicht: Viele Internetseiten zeigen hier falsche, zu niedrige Werte &mdash; der rote Kasten erkl&auml;rt das." },
        { s: 1, sel: "#economics .calc", t: "Selbst ausprobieren", x: "Der Was-w&auml;re-wenn-Rechner: Regler bewegen und live sehen, was bei anderem Budget oder schlechterer Anrufquote passiert. Probieren Sie ruhig das Schlimmste aus &mdash; die Rechnung h&auml;lt es aus." },
        { sel: "#gebote .scenarios", t: "Drei Budget-Setups", x: "Dieselben drei Varianten wie im Angebot, hier mit der strategischen Begr&uuml;ndung dahinter." },
        { sel: "#quellen", t: "Alles belegt", x: "Methodik und Quellen &mdash; jede Zahl ist nachvollziehbar. Gr&uuml;ne Markierung = gegen Prim&auml;rquelle verifiziert." }
      ]
    },
    angebot: {
      intro: "Das ist Ihr Angebot. Ich erkl&auml;re Ihnen gern jede Position &mdash; oder f&uuml;hre Sie einmal durch.",
      chips: ["Welche Variante passt zu mir?", "Wie beauftrage ich?", "Kann ich jederzeit kündigen?", "Was heißt CPL und CPA?"],
      qa: [
        { k: ["beauftrag", "bestell", "unterschreib", "annehmen", "zusage"], chip: null,
          a: "Ganz unkompliziert: Im PDF die gew&uuml;nschte Variante <b>ankreuzen und zur&uuml;cksenden</b> &mdash; oder einfach formlos per WhatsApp/Anruf best&auml;tigen. Das gen&uuml;gt. Danach melden wir uns am selben Tag mit den ersten Schritten." },
        { k: ["cpl und cpa", "cpl cpa", "abkurzung", "begriffe", "heisst cpl"], chip: null,
          a: "<b>CPL</b> = Kosten pro Anfrage (ein Anruf oder eine WhatsApp): erwartet 42&ndash;63&nbsp;&euro;. <b>CPA</b> = Kosten pro gewonnenem Auftrag inklusive unserer Betreuung: erwartet 90&ndash;150&nbsp;&euro;. Zum Vergleich: Ein Auftrag bringt Ihnen laut BVSK 650&ndash;1.200&nbsp;&euro; Honorar." },
        { k: ["matrix", "tabelle", "vergleich", "detail"], chip: null,
          a: "Die gro&szlig;e Vergleichstabelle (&bdquo;Varianten im Detail&ldquo;) zeigt Zeile f&uuml;r Zeile, was in jeder Variante steckt: welche Kampagnen mit wie viel Budget, welche Ergebnisse zu erwarten sind und was es kostet. Die eingef&auml;rbte mittlere Spalte ist unsere Empfehlung. Auf dem Handy k&ouml;nnen Sie die Tabelle seitlich wischen." }
      ],
      tour: [
        { sel: ".addr-row", t: "Ihr Angebot", x: "Angebots-Nummer und G&uuml;ltigkeit stehen hier &mdash; das Angebot gilt 30 Tage. Alle Preise verstehen sich zzgl. USt." },
        { s: 1, sel: ".plans", t: "Drei Varianten auf einen Blick", x: "Der schnelle &Uuml;berblick: Budget, erwartete Auftr&auml;ge, Gesamtkosten. Der Unterschied zwischen den Varianten ist nur das Werbebudget &mdash; unsere Honorare sind &uuml;berall gleich." },
        { s: 1, sel: ".matrix", t: "Der Detail-Vergleich", x: "Hier steht Zeile f&uuml;r Zeile, was genau enthalten ist. Die farbige Spalte ist unsere Empfehlung. Tipp am Handy: Die Tabelle l&auml;sst sich seitlich wischen." },
        { sel: ".highlight", t: "Die Kernrechnung", x: "Warum sich das tr&auml;gt: rund 90&ndash;150&nbsp;&euro; Kosten pro Auftrag gegen 650&ndash;1.200&nbsp;&euro; Honorar. Die Kampagne refinanziert sich rechnerisch ab dem zweiten Auftrag im Monat." },
        { sel: ".fair", t: "Ihre Absicherung", x: "Monatlich k&uuml;ndbar, das Werbekonto geh&ouml;rt Ihnen, keine Provision auf Ihr Budget, Stopp jederzeit am selben Tag. Das sind Vertragsbestandteile, keine Floskeln." },
        { s: 1, sel: ".sign", t: "Beauftragen", x: "Variante ankreuzen und zur&uuml;cksenden &mdash; oder einfach formlos per WhatsApp best&auml;tigen. Mehr braucht es nicht." }
      ]
    },
    datenblaetter: {
      intro: "Vier Bl&auml;tter: eins pro Variante plus die Konkurrenz-Einsch&auml;tzung. Ich erkl&auml;re Ihnen gern jedes Detail.",
      chips: ["Wie lese ich die Blätter?", "Welche Variante passt zu mir?", "Was macht die Konkurrenz?", "Was heißt Impression Share?"],
      qa: [
        { k: ["wie lese", "lesen", "aufbau", "blatter"], chip: null,
          a: "Jedes Varianten-Blatt hat denselben Aufbau: oben die <b>vier Kennzahlen</b>, dann die <b>Budget-Verteilung</b> (wohin jeder Euro flie&szlig;t), die <b>Erwartung</b> in zwei Szenarien und &mdash; der ehrlichste Teil &mdash; <b>was dieses Budget kann und was nicht</b>. Legen Sie die Bl&auml;tter nebeneinander: Dieser Vergleich macht die Entscheidung meist von selbst." },
        { k: ["konkurrenz macht", "blatt 4", "budget taktik", "was macht die konkurrenz"], chip: null,
          a: "Blatt 4 sch&auml;tzt f&uuml;r jeden der vier Wettbewerber ein: seine Taktik, sein vermutetes Werbebudget und wie wir dagegen antreten. Ehrlich gekennzeichnet: Die Budget-Angaben sind <b>begr&uuml;ndete Einsch&auml;tzungen</b> (echte Werbeausgaben sind nicht &ouml;ffentlich) &mdash; in den ersten vier Wochen ersetzen wir sie durch echte Auktionsdaten von Google." }
      ],
      tour: [
        { s: 1, sel: ".sheet:nth-of-type(1) .s-title-row", t: "Ein Blatt pro Variante", x: "Blatt 1 = Start, Blatt 2 = Wachstum (Empfehlung), Blatt 3 = Marktdominanz, Blatt 4 = Konkurrenz. Alle Varianten-Bl&auml;tter sind gleich aufgebaut &mdash; perfekt zum Nebeneinanderlegen." },
        { sel: ".sheet:nth-of-type(1) .kpis", t: "Kennzahlen oben", x: "Klicks, Anfragen, Auftr&auml;ge und der erwartete Umsatz &mdash; immer als ehrliche Spanne von vorsichtig bis realistisch." },
        { sel: ".sheet:nth-of-type(1) table", t: "Wohin das Geld flie&szlig;t", x: "Die Budget-Verteilung zeigt auf den Euro genau, welche Kampagne wie viel bekommt und was ein Klick dort maximal kosten darf." },
        { s: 1, sel: ".sheet:nth-of-type(1) .twocol", t: "Der ehrlichste Teil", x: "Was dieses Budget kann &mdash; und was nicht: Wir schreiben Ihnen auch die Grenzen hin. Vergleichen Sie diesen Kasten &uuml;ber die drei Bl&auml;tter, dann wissen Sie, welche Variante passt." },
        { s: 1, sel: ".sheet:nth-of-type(4) .comp-card", t: "Die Konkurrenz", x: "Blatt 4: pro Wettbewerber eine Karte mit Einstufung, Taktik und unserer Antwort. Darunter sechs konkrete Regeln, wie wir Ihr Budget gegen dieses Feld einsetzen." }
      ]
    },
    landingpage: {
      intro: "Das ist der Entwurf Ihrer neuen Kampagnen-Seite &mdash; so sehen sie Unfallgesch&auml;digte nach dem Klick auf Ihre Anzeige. Ich zeige Ihnen, was wo ist und warum.",
      chips: ["Warum diese Seite?", "Warum steht da kostenlos*?", "Was wird noch angepasst?", "Wie geht es jetzt weiter?"],
      qa: [
        { k: ["warum diese seite", "warum landingpage", "zweck"], chip: null,
          a: "Diese Seite hat genau <b>einen Job</b>: dass ein Unfallgesch&auml;digter Sie sofort anruft. Deshalb: Telefonnummer immer sichtbar, WhatsApp als zweiter Weg, keine ablenkende Navigation. Ihre normale Website bleibt unver&auml;ndert &mdash; das hier ist eine zus&auml;tzliche Seite nur f&uuml;r die Anzeigen-Besucher." },
        { k: ["sternchen", "warum kostenlos", "rechtssicher", "abmahn"], chip: null,
          a: "Das Sternchen ist Absicht und sch&uuml;tzt Sie: &bdquo;Kostenlos&ldquo; gilt rechtlich nur bei <b>unverschuldetem Unfall ab ca. 1.000&nbsp;&euro; Schaden</b>. Ohne diese Einschr&auml;nkung w&auml;re die Aussage abmahnbar (&sect;&nbsp;5 UWG &mdash; es gab 2026 bereits ein Urteil in der Branche). Der Kasten &bdquo;Ehrlich gesagt&ldquo; erkl&auml;rt es dem Besucher transparent &mdash; das schafft nebenbei Vertrauen." },
        { k: ["angepasst", "geandert", "fotos", "noch offen", "platzhalter"], chip: null,
          a: "Drei Dinge ersetzen wir vor dem Livegang: <b>1.</b> Die Beispiel-Fotos durch echte Bilder aus Ihrem Betrieb. <b>2.</b> Die Beispiel-Bewertungen durch Ihre echten Google-Rezensionen. <b>3.</b> Das Formular wird an Ihre E-Mail angeschlossen. Ihre Telefonnummern und &Ouml;ffnungszeiten sind bereits echt &mdash; bitte einmal pr&uuml;fen." },
        { k: ["checkliste", "5 schritte", "unfall schritte"], chip: null,
          a: "Die 5-Schritte-Checkliste macht die Seite auch f&uuml;r Menschen n&uuml;tzlich, die noch vergleichen &mdash; und Schritt 5 f&uuml;hrt nat&uuml;rlich zu Ihnen. Nebeneffekt: Google stuft n&uuml;tzliche Seiten besser ein, das senkt Ihre Klickpreise." }
      ],
      tour: [
        { sel: ".top-call", t: "Anruf &mdash; immer erreichbar", x: "Die Nummer klebt oben und scrollt mit. Der gr&uuml;ne Punkt signalisiert: jetzt erreichbar &mdash; Ihr 24/7-Vorteil, prominent verpackt." },
        { s: 1, sel: ".h-cta", t: "Die zwei Wege zu Ihnen", x: "Anrufen oder Fotos per WhatsApp &mdash; mehr Auswahl gibt es bewusst nicht. Auf dem Handy klebt zus&auml;tzlich eine Leiste mit beiden Buttons am unteren Rand." },
        { sel: ".usp", t: "Ihr st&auml;rkstes Argument", x: "Abschleppen, Gutachten in 24h, Mietwagen, komplette Abwicklung &mdash; und zwar aus Ihrem <b>eigenen Haus</b>, nicht &uuml;ber Vermittler wie bei den Wettbewerbern. Genau so formulieren wir es: ehrlich und abmahnsicher." },
        { s: 1, sel: "#kosten .pay-card", t: "Rechtssicher statt abmahnbar", x: "Der Kasten &bdquo;Ehrlich gesagt&ldquo;: Bagatellgrenze und Teilschuld werden offen erkl&auml;rt. Das sch&uuml;tzt Sie vor Abmahnungen &mdash; und wirkt auf Kunden vertrauensw&uuml;rdiger als ein plattes Gratis-Versprechen." },
        { sel: "#checkliste .cl-grid", t: "N&uuml;tzlich sein gewinnt", x: "Die Unfall-Checkliste hilft dem Besucher sofort &mdash; und Schritt 5 ist der Anruf bei Ihnen. Google belohnt so etwas mit g&uuml;nstigeren Klickpreisen." },
        { sel: "#bewertungen .g-badge", t: "Ihre 4,9 Sterne", x: "Die Beispiel-Bewertungen ersetzen wir durch Ihre echten Google-Rezensionen &mdash; daf&uuml;r brauchen wir nur den Link zu Ihrem Google-Profil." },
        { s: 1, sel: ".form", t: "Der dritte Weg", x: "F&uuml;r die, die nicht telefonieren wollen: nur vier Felder, mehr kostet nachweislich Anfragen. Wird vor Livegang an Ihre E-Mail angeschlossen." }
      ]
    }
  };

  var cfg = CFG[PAGE] || CFG.index;
  var QA = (cfg.qa || []).concat(QA_GLOBAL);

  /* ---------------- Styles ---------------- */
  var css = ""
    + ".kga-btn{position:fixed;right:18px;bottom:18px;z-index:99990;display:flex;align-items:center;gap:9px;background:#0F1720;color:#EDF1F4;border:1px solid #2A3947;border-radius:100px;padding:11px 18px 11px 13px;font:600 14px/1 'Segoe UI',system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,.35);transition:transform .15s ease}"
    + ".kga-btn:hover{transform:translateY(-2px)}"
    + ".kga-btn .kga-dot{width:26px;height:26px;border-radius:50%;background:#6FC4CC;color:#0F1720;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px}"
    + "body.kga-lp .kga-btn{bottom:88px}@media(min-width:761px){body.kga-lp .kga-btn{bottom:18px}}"
    + ".kga-panel{position:fixed;right:18px;bottom:76px;z-index:99991;width:min(380px,calc(100vw - 24px));max-height:min(560px,calc(100vh - 100px));background:#fff;border:1px solid #DFE5EA;border-radius:16px;box-shadow:0 24px 70px rgba(15,23,32,.35);display:none;flex-direction:column;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif}"
    + "body.kga-lp .kga-panel{bottom:146px}@media(min-width:761px){body.kga-lp .kga-panel{bottom:76px}}"
    + ".kga-panel.open{display:flex}"
    + "@media(max-width:520px){.kga-panel{right:12px;left:12px;width:auto}}"
    + ".kga-head{background:#0F1720;color:#EDF1F4;padding:14px 16px;display:flex;align-items:center;gap:10px}"
    + ".kga-head .kga-dot{width:30px;height:30px;border-radius:8px;background:#6FC4CC;color:#0F1720;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex:none}"
    + ".kga-head b{font-size:14px;display:block}.kga-head small{font-size:11px;color:#93A3B1;display:block}"
    + ".kga-close{margin-left:auto;background:none;border:0;color:#93A3B1;font-size:20px;cursor:pointer;padding:2px 6px;line-height:1}"
    + ".kga-msgs{padding:14px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:10px;background:#F6F8F9}"
    + ".kga-m{max-width:88%;padding:10px 13px;border-radius:13px;font-size:13.5px;line-height:1.55;color:#1A222C}"
    + ".kga-m.bot{background:#fff;border:1px solid #E1E7EB;border-bottom-left-radius:4px;align-self:flex-start;box-shadow:0 1px 3px rgba(15,23,32,.05)}"
    + ".kga-m.user{background:#0C6570;color:#fff;border-bottom-right-radius:4px;align-self:flex-end}"
    + ".kga-m a{color:#0C6570;font-weight:650}.kga-m.user a{color:#fff}"
    + ".kga-chips{display:flex;flex-wrap:wrap;gap:7px;padding:2px 14px 10px;background:#F6F8F9}"
    + ".kga-chip{background:#fff;border:1.5px solid #C9E0E2;color:#0A5560;border-radius:100px;padding:6px 13px;font:600 12px 'Segoe UI',system-ui,sans-serif;cursor:pointer;transition:background .12s}"
    + ".kga-chip:hover{background:#E1EFF0}"
    + ".kga-chip.tour{border-color:#E8C98F;color:#7A5202;background:#FBF4E4}"
    + ".kga-in{display:flex;gap:8px;padding:11px 12px;border-top:1px solid #E1E7EB;background:#fff}"
    + ".kga-in input{flex:1;border:1.5px solid #DFE5EA;border-radius:10px;padding:10px 12px;font:400 14px 'Segoe UI',system-ui,sans-serif;outline:none;min-width:0}"
    + ".kga-in input:focus{border-color:#0C6570}"
    + ".kga-in button{background:#0C6570;color:#fff;border:0;border-radius:10px;padding:0 16px;font:700 14px 'Segoe UI',system-ui,sans-serif;cursor:pointer}"
    + ".kga-in button:hover{background:#0A5560}"
    + ".kga-ring{position:absolute;z-index:99980;border:3px solid #6FC4CC;border-radius:14px;box-shadow:0 0 0 9999px rgba(10,18,26,.62);pointer-events:none;transition:top .3s ease,left .3s ease,width .3s ease,height .3s ease}"
    + ".kga-card{position:fixed;z-index:99992;width:min(340px,calc(100vw - 28px));background:#fff;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.4);padding:16px 18px 14px;font-family:'Segoe UI',system-ui,sans-serif}"
    + "@media(max-width:600px){.kga-card{left:14px!important;right:14px;width:auto;bottom:14px;top:auto!important}}"
    + ".kga-card .kga-step{font:700 10.5px 'Segoe UI',system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#0A5560;margin-bottom:5px}"
    + ".kga-card b.kga-t{font-size:15.5px;display:block;margin-bottom:5px;color:#1A222C}"
    + ".kga-card p{margin:0 0 13px;font-size:13.5px;line-height:1.55;color:#4E5B67}"
    + ".kga-card .kga-nav{display:flex;align-items:center;gap:8px}"
    + ".kga-card .kga-nav button{font:700 13px 'Segoe UI',system-ui,sans-serif;border-radius:9px;padding:8px 15px;cursor:pointer;border:1.5px solid #DFE5EA;background:#fff;color:#4E5B67}"
    + ".kga-card .kga-nav button.kga-next{background:#0C6570;border-color:#0C6570;color:#fff;margin-left:auto}"
    + ".kga-card .kga-skip{background:none!important;border:none!important;color:#7F8B97!important;padding:8px 4px!important;font-weight:600!important}"
    + ".kga-card.kga-center{top:50%!important;left:50%!important;bottom:auto!important;right:auto;transform:translate(-50%,-50%)}"
    + "@media(max-width:600px){.kga-card.kga-center{left:50%!important;right:auto;width:min(340px,calc(100vw - 28px))}}"
    + ".kga-card .kga-choice{display:flex;flex-direction:column;gap:9px;margin-bottom:4px}"
    + ".kga-card .kga-choice button,.kga-card .kga-choice a{display:block;width:100%;text-align:left;font:700 13.5px 'Segoe UI',system-ui,sans-serif;border-radius:10px;padding:11px 15px;cursor:pointer;border:1.5px solid #DFE5EA;background:#fff;color:#1A222C;text-decoration:none}"
    + ".kga-card .kga-choice button small,.kga-card .kga-choice a small{display:block;font-weight:500;font-size:11.5px;color:#7F8B97;margin-top:1px}"
    + ".kga-card .kga-choice .kga-prim{background:#0C6570;border-color:#0C6570;color:#fff}"
    + ".kga-card .kga-choice .kga-prim small{color:#B8DCDF}"
    + ".kga-dim{position:fixed;inset:0;z-index:99978;background:rgba(10,18,26,.6)}"
    + ".kga-home{position:fixed;top:14px;left:14px;z-index:99970;display:inline-flex;align-items:center;gap:7px;background:rgba(15,23,32,.88);color:#EDF1F4;border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:8px 16px;font:650 12.5px 'Segoe UI',system-ui,sans-serif;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.3);transition:transform .15s ease}"
    + ".kga-home:hover{transform:translateY(-1px);background:rgba(15,23,32,.98)}"
    + "body.kga-lp .kga-home{top:72px}"
    + "@media(prefers-reduced-motion:reduce){.kga-ring,.kga-btn,.kga-home{transition:none}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
  if (PAGE === "landingpage") document.body.classList.add("kga-lp");

  /* Zurück zur Übersicht — auf allen Unterseiten, jederzeit sichtbar */
  if (PAGE !== "index") {
    var home = document.createElement("a");
    home.className = "kga-home";
    home.href = "index.html#dokumente";
    home.innerHTML = "&larr; Zur &Uuml;bersicht";
    home.setAttribute("aria-label", "Zurück zur Portal-Startseite, Abschnitt Unterlagen");
    document.body.appendChild(home);
  }

  /* ---------------- Assistent-Widget ---------------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  var btn = el("button", "kga-btn", "<span class='kga-dot'>?</span><span>Assistent</span>");
  btn.setAttribute("aria-label", "Assistent öffnen");
  var panel = el("div", "kga-panel");
  panel.innerHTML =
    "<div class='kga-head'><span class='kga-dot'>S</span><span><b>Ihr Projekt-Assistent</b><small>S&amp;S Connect &middot; antwortet sofort</small></span><button class='kga-close' aria-label='Schließen'>&times;</button></div>" +
    "<div class='kga-msgs'></div><div class='kga-chips'></div>" +
    "<div class='kga-in'><input type='text' placeholder='Frage eingeben …' aria-label='Frage eingeben'><button>Senden</button></div>";
  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var msgs = panel.querySelector(".kga-msgs"),
      chipsBox = panel.querySelector(".kga-chips"),
      input = panel.querySelector("input"),
      send = panel.querySelector(".kga-in button");

  function addMsg(html, who) {
    var m = el("div", "kga-m " + who, html);
    msgs.appendChild(m);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function renderChips() {
    chipsBox.innerHTML = "";
    var tc = el("button", "kga-chip tour", "▶ Rundgang " + (tourDone() ? "wiederholen" : "starten"));
    tc.onclick = function () { closePanel(); startTour(true); };
    chipsBox.appendChild(tc);
    (cfg.chips || []).forEach(function (c) {
      var b = el("button", "kga-chip", c);
      b.onclick = function () { ask(c); };
      chipsBox.appendChild(b);
    });
  }
  function norm(s) {
    return s.toLowerCase()
      .replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss")
      .replace(/[^a-z0-9 %€]/g, " ").replace(/\s+/g, " ").trim();
  }
  function answer(q) {
    var t = norm(q), best = null, bs = 0;
    if (t.indexOf("rundgang") !== -1 || t.indexOf("tour") !== -1 || t.indexOf("zeig mir") !== -1) {
      closePanel(); startTour(true); return null;
    }
    QA.forEach(function (e) {
      var s = 0;
      e.k.forEach(function (kw) { if (t.indexOf(norm(kw)) !== -1) s += kw.length > 6 ? 2 : 1; });
      if (e.chip && norm(e.chip) === t) s += 10;
      if (s > bs) { bs = s; best = e; }
    });
    if (best && bs > 0) return best.a;
    return "Gute Frage &mdash; die beantworten wir Ihnen am liebsten pers&ouml;nlich: <a href='tel:+4915140322125'>+49&nbsp;151&nbsp;40322125</a> (Anruf oder WhatsApp, S&amp;S Connect). Oder probieren Sie eine der Fragen unten &mdash; zu Kosten, Varianten, Ablauf und allen Begriffen habe ich die Antworten parat.";
  }
  function ask(q) {
    addMsg(q.replace(/</g, "&lt;"), "user");
    var a = answer(q);
    if (a) setTimeout(function () { addMsg(a, "bot"); }, 250);
  }
  send.onclick = function () { var v = input.value.trim(); if (v) { input.value = ""; ask(v); } };
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") send.onclick(); });

  var opened = false;
  function openPanel() {
    panel.classList.add("open"); opened = true;
    if (!msgs.children.length) { addMsg(cfg.intro, "bot"); renderChips(); }
  }
  function closePanel() { panel.classList.remove("open"); opened = false; }
  btn.onclick = function () { if (opened) { closePanel(); } else { openPanel(); } };
  panel.querySelector(".kga-close").onclick = closePanel;

  /* ---------------- Tour-Engine ---------------- */
  var TKEY = "kgaTour:" + PAGE;
  function tourDone() { try { return localStorage.getItem(TKEY) === "1"; } catch (e) { return true; } }
  function setDone() { try { localStorage.setItem(TKEY, "1"); } catch (e) {} }

  var ring = null, card = null, dim = null, steps = [], idx = 0;

  function visible(e) {
    if (!e) return false;
    var r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }
  function cleanup() {
    if (ring) { ring.remove(); ring = null; }
    if (card) { card.remove(); card = null; }
    if (dim) { dim.remove(); dim = null; }
  }
  function endTour() { setDone(); cleanup(); }
  function finishTour() {
    setDone();
    if (ring) { ring.remove(); ring = null; }
    if (PAGE === "index") { cleanup(); openPanel(); return; }
    /* Unterseiten: End-Karte mit Rücksprung zur Übersicht */
    if (!dim) { dim = el("div", "kga-dim"); document.body.appendChild(dim); }
    card.classList.add("kga-center");
    card.innerHTML =
      "<div class='kga-step'>Rundgang beendet</div>" +
      "<b class='kga-t'>Das war's auf dieser Seite.</b>" +
      "<p>Fragen beantworte ich Ihnen jederzeit &uuml;ber den Assistent-Button unten rechts.</p>" +
      "<div class='kga-choice'>" +
      "<a class='kga-prim' href='index.html#dokumente'>&larr; Zur&uuml;ck zur &Uuml;bersicht<small>zu Ihren Unterlagen auf der Startseite</small></a>" +
      "<button class='kga-stay'>Auf dieser Seite bleiben<small>in Ruhe weiterlesen</small></button>" +
      "</div>";
    card.querySelector(".kga-stay").onclick = cleanup;
  }
  function place() {
    if (!ring || !card) return;
    var s = steps[idx], t = document.querySelector(s.sel);
    if (!visible(t)) { next(1); return; }
    var r = t.getBoundingClientRect(), pad = 8;
    ring.style.top = (r.top + window.scrollY - pad) + "px";
    ring.style.left = (r.left + window.scrollX - pad) + "px";
    ring.style.width = (r.width + pad * 2) + "px";
    ring.style.height = (r.height + pad * 2) + "px";
    card.querySelector(".kga-step").textContent = "Schritt " + (idx + 1) + " von " + steps.length;
    card.querySelector(".kga-t").innerHTML = s.t;
    card.querySelector("p").innerHTML = s.x;
    card.querySelector(".kga-back").style.visibility = idx === 0 ? "hidden" : "visible";
    card.querySelector(".kga-next").textContent = idx === steps.length - 1 ? "Fertig ✓" : "Weiter →";
    if (window.innerWidth > 600) {
      var ch = card.offsetHeight || 180, below = r.bottom + 14, top;
      top = (below + ch < window.innerHeight - 16) ? below : Math.max(16, r.top - ch - 14);
      card.style.top = top + "px";
      card.style.left = Math.min(Math.max(16, r.left), window.innerWidth - (card.offsetWidth || 340) - 16) + "px";
    }
  }
  function show() {
    var s = steps[idx], t = document.querySelector(s.sel);
    if (!visible(t)) { next(1); return; }
    try { t.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { t.scrollIntoView(); }
    setTimeout(place, 420);
  }
  function next(d) {
    idx += d;
    if (idx < 0) idx = 0;
    if (idx >= steps.length) { finishTour(); return; }
    show();
  }
  function buildTourUi() {
    ring = el("div", "kga-ring");
    card = el("div", "kga-card");
    document.body.appendChild(ring); document.body.appendChild(card);
    window.addEventListener("resize", function () { if (ring && steps.length) place(); });
  }
  function stepUi() {
    card.classList.remove("kga-center");
    card.innerHTML = "<div class='kga-step'></div><b class='kga-t'></b><p></p>" +
      "<div class='kga-nav'><button class='kga-back'>← Zurück</button><button class='kga-skip'>Überspringen</button><button class='kga-next'>Weiter →</button></div>";
    card.querySelector(".kga-back").onclick = function () { next(-1); };
    card.querySelector(".kga-next").onclick = function () { next(1); };
    card.querySelector(".kga-skip").onclick = endTour;
  }
  function beginTour(mode) {
    var all = (cfg.tour || []).filter(function (s) { return visible(document.querySelector(s.sel)); });
    steps = (mode === "short") ? all.filter(function (s) { return s.s === 1; }) : all;
    if (!steps.length) steps = all;
    if (!steps.length) { cleanup(); return; }
    idx = 0;
    if (dim) { dim.remove(); dim = null; }
    stepUi();
    show();
  }
  function startTour(force) {
    if (!force && tourDone()) return;
    if (!ring) buildTourUi();
    /* Unterseiten: erst fragen, wie viel Zeit da ist */
    if (PAGE !== "index") {
      var full = (cfg.tour || []).filter(function (s) { return visible(document.querySelector(s.sel)); }).length;
      var kurz = (cfg.tour || []).filter(function (s) { return s.s === 1 && visible(document.querySelector(s.sel)); }).length;
      if (!dim) { dim = el("div", "kga-dim"); document.body.appendChild(dim); }
      card.classList.add("kga-center");
      card.innerHTML =
        "<div class='kga-step'>Kurzer Rundgang?</div>" +
        "<b class='kga-t'>Wie viel Zeit haben Sie gerade?</b>" +
        "<p>Ich zeige Ihnen, was auf dieser Seite wichtig ist &mdash; Sie entscheiden das Tempo.</p>" +
        "<div class='kga-choice'>" +
        "<button class='kga-prim kga-c-short'>&#9201; Wenig Zeit &mdash; nur das Wichtigste<small>" + kurz + " Stopps, ca. 30 Sekunden</small></button>" +
        "<button class='kga-c-full'>In Ruhe ansehen &mdash; kompletter Rundgang<small>" + full + " Stopps, ca. 2 Minuten</small></button>" +
        "</div>" +
        "<div class='kga-nav'><button class='kga-skip'>Jetzt nicht</button></div>";
      card.querySelector(".kga-c-short").onclick = function () { beginTour("short"); };
      card.querySelector(".kga-c-full").onclick = function () { beginTour("full"); };
      card.querySelector(".kga-skip").onclick = endTour;
      return;
    }
    beginTour("full");
  }

  /* Autostart: einmalig pro Seite */
  if (!tourDone()) setTimeout(function () { startTour(false); }, 900);
})();
